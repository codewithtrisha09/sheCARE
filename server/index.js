import "dotenv/config";
import crypto from "crypto";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { body, validationResult } from "express-validator";

const app = express();
const port = process.env.PORT || 5000;
const jwtSecret = process.env.JWT_SECRET;
const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";
const isProduction = process.env.NODE_ENV === "production";
const memoryUsers = new Map();
const memoryRefreshTokens = new Map();

if (!jwtSecret || jwtSecret === "replace-this-in-production") {
  if (isProduction) {
    console.error("FATAL: Set a strong JWT_SECRET in production.");
    process.exit(1);
  }
  console.warn("Warning: using development JWT secret. Set JWT_SECRET in server/.env.");
}

const effectiveSecret = jwtSecret || "dev-only-secret-change-me";

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors({ origin: clientOrigin, credentials: true }));
app.use(cookieParser());
app.use(express.json({ limit: "100kb" }));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many attempts. Please wait and try again." },
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/", apiLimiter);

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 60 },
  email: { type: String, required: true, lowercase: true, unique: true, trim: true },
  passwordHash: { type: String, required: true },
  refreshTokenHash: { type: String, default: null },
  wellness: { type: Object, default: {} },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
let databaseReady = false;

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => { databaseReady = true; console.log("Connected to MongoDB"); })
    .catch((error) => console.warn("MongoDB unavailable; using temporary local server storage.", error.message));
} else {
  console.warn("No MONGODB_URI set; using temporary local server storage.");
}

const publicUser = (user) => ({
  id: user._id?.toString() || user.id,
  name: user.name,
  email: user.email,
});

const signAccessToken = (user) =>
  jwt.sign({ sub: user._id?.toString() || user.id }, effectiveSecret, { expiresIn: "15m" });

const hashToken = (token) => crypto.createHash("sha256").update(token).digest("hex");

const createRefreshToken = () => crypto.randomBytes(48).toString("hex");

const setRefreshCookie = (res, token) => {
  res.cookie("shecare_refresh", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "strict" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/api/auth",
  });
};

const clearRefreshCookie = (res) => {
  res.clearCookie("shecare_refresh", { path: "/api/auth" });
};

async function saveRefreshToken(user, refreshToken) {
  const refreshTokenHash = hashToken(refreshToken);
  if (databaseReady) {
    user.refreshTokenHash = refreshTokenHash;
    await user.save();
  } else {
    user.refreshTokenHash = refreshTokenHash;
    memoryUsers.set(user.email, user);
    memoryRefreshTokens.set(refreshTokenHash, user.email);
  }
}

async function findUserByEmail(email) {
  return databaseReady ? User.findOne({ email }) : memoryUsers.get(email);
}

async function findUserById(id) {
  return databaseReady ? User.findById(id) : [...memoryUsers.values()].find((user) => user.id === id);
}

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0]?.msg || "Invalid request." });
  }
  next();
};

const registerValidators = [
  body("name").trim().isLength({ min: 1, max: 60 }).withMessage("Enter a name up to 60 characters."),
  body("email").trim().isEmail().normalizeEmail().withMessage("Enter a valid email address."),
  body("password").isLength({ min: 8, max: 128 }).withMessage("Password must be 8–128 characters."),
];

const loginValidators = [
  body("email").trim().isEmail().normalizeEmail().withMessage("Enter a valid email address."),
  body("password").notEmpty().withMessage("Enter your password."),
];

const issueSession = async (res, user) => {
  const refreshToken = createRefreshToken();
  await saveRefreshToken(user, refreshToken);
  setRefreshCookie(res, refreshToken);
  return { token: signAccessToken(user), user: publicUser(user) };
};

app.post("/api/auth/register", authLimiter, registerValidators, handleValidation, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const normalizedEmail = email.trim().toLowerCase();
    if (await findUserByEmail(normalizedEmail)) {
      return res.status(409).json({ message: "An account with that email already exists." });
    }
    const passwordHash = await bcrypt.hash(password, 12);
    const user = databaseReady
      ? await User.create({ name: name.trim(), email: normalizedEmail, passwordHash })
      : { id: crypto.randomUUID(), name: name.trim(), email: normalizedEmail, passwordHash, wellness: {} };
    if (!databaseReady) memoryUsers.set(normalizedEmail, user);
    const session = await issueSession(res, user);
    res.status(201).json({ ...session, storage: databaseReady ? "database" : "temporary" });
  } catch (error) {
    console.error("Register error:", error.message);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
});

app.post("/api/auth/login", authLimiter, loginValidators, handleValidation, async (req, res) => {
  try {
    const user = await findUserByEmail(req.body.email?.trim().toLowerCase());
    if (!user || !(await bcrypt.compare(req.body.password || "", user.passwordHash))) {
      return res.status(401).json({ message: "That email or password doesn't match." });
    }
    const session = await issueSession(res, user);
    res.json({ ...session, storage: databaseReady ? "database" : "temporary" });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
});

app.post("/api/auth/refresh", authLimiter, async (req, res) => {
  try {
    const refreshToken = req.cookies.shecare_refresh;
    if (!refreshToken) return res.status(401).json({ message: "Please sign in again." });

    const tokenHash = hashToken(refreshToken);
    let user;
    if (databaseReady) {
      user = await User.findOne({ refreshTokenHash: tokenHash });
    } else {
      const email = memoryRefreshTokens.get(tokenHash);
      user = email ? memoryUsers.get(email) : null;
    }
    if (!user) {
      clearRefreshCookie(res);
      return res.status(401).json({ message: "Please sign in again." });
    }

    const session = await issueSession(res, user);
    res.json(session);
  } catch (error) {
    console.error("Refresh error:", error.message);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
});

app.post("/api/auth/logout", async (req, res) => {
  try {
    const refreshToken = req.cookies.shecare_refresh;
    if (refreshToken) {
      const tokenHash = hashToken(refreshToken);
      if (databaseReady) {
        await User.updateOne({ refreshTokenHash: tokenHash }, { refreshTokenHash: null });
      } else {
        memoryRefreshTokens.delete(tokenHash);
      }
    }
    clearRefreshCookie(res);
    res.json({ ok: true });
  } catch (error) {
    clearRefreshCookie(res);
    res.json({ ok: true });
  }
});

const requireAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) throw new Error("No token");
    const payload = jwt.verify(token, effectiveSecret);
    req.user = await findUserById(payload.sub);
    if (!req.user) throw new Error("Unknown user");
    next();
  } catch {
    res.status(401).json({ message: "Please sign in again." });
  }
};

app.get("/api/wellness", requireAuth, (req, res) => {
  res.json({ wellness: req.user.wellness || {} });
});

app.put("/api/wellness", requireAuth, async (req, res) => {
  try {
    const wellness = req.body.wellness && typeof req.body.wellness === "object" ? req.body.wellness : {};
    if (databaseReady) {
      req.user.wellness = wellness;
      await req.user.save();
    } else {
      req.user.wellness = wellness;
      memoryUsers.set(req.user.email, req.user);
    }
    res.json({ wellness });
  } catch (error) {
    res.status(500).json({ message: "Could not save wellness data." });
  }
});

app.post("/api/guide", requireAuth, async (req, res) => {
  const question = req.body.question?.trim();
  if (!question || question.length > 2000) {
    return res.status(400).json({ message: "Write a question first (max 2000 characters)." });
  }
  if (!process.env.GEMINI_API_KEY) {
    return res.status(503).json({
      message: "The AI guide is not connected yet. Add GEMINI_API_KEY to server/.env and restart the server.",
    });
  }
  const prompt = `You are SheCARE, a warm health-education guide for teen girls. Give short, practical, age-appropriate health education. Never diagnose, never present certainty, and always advise urgent local care for emergency symptoms. User question: ${question}`;
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${process.env.GEMINI_MODEL || "gemini-2.5-flash"}:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    );
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error?.message || "Gemini request failed");
    res.json({ answer: payload.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't create a response right now." });
  } catch (error) {
    res.status(502).json({ message: "The guide is temporarily unavailable." });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, database: databaseReady });
});

app.use((_req, res) => {
  res.status(404).json({ message: "Not found." });
});

app.use((error, _req, res, _next) => {
  console.error("Unhandled error:", error.message);
  res.status(500).json({ message: "Something went wrong." });
});

app.listen(port, () => console.log(`SheCARE API running on http://localhost:${port}`));
