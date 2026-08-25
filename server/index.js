import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

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
const feedbackSchema = new mongoose.Schema({
  rating: { type: Number, required: true, min: 1, max: 5 },
  message: { type: String, required: true, trim: true, maxlength: 1000 },
  category: { type: String, default: "general", maxlength: 40 },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });
const Feedback = mongoose.model("Feedback", feedbackSchema);
let databaseReady = false;
const memoryFeedback = [];

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
  character: user.wellness?.character || null,
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
    const { name, email, password, character } = req.body;
    const normalizedEmail = email.trim().toLowerCase();
    if (await findUserByEmail(normalizedEmail)) {
      return res.status(409).json({ message: "An account with that email already exists." });
    }
    const passwordHash = await bcrypt.hash(password, 12);
    const wellness = character && typeof character === "object" ? { character } : {};
    const user = databaseReady
      ? await User.create({ name: name.trim(), email: normalizedEmail, passwordHash, wellness })
      : { id: crypto.randomUUID(), name: name.trim(), email: normalizedEmail, passwordHash, wellness: wellness };
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
  const reply = await getWellnessReply(question);
  if (reply.offTopic) return res.status(400).json({ message: reply.text });
  if (reply.error) return res.status(reply.status || 502).json({ message: reply.text });
  res.json({ answer: reply.text });
});

const OFF_TOPIC_PATTERNS = [
  /\b(homework|essay|assignment|write code|python|javascript|java|c\+\+)\b/i,
  /\b(crypto|bitcoin|stock|invest|politics|election|celebrity|movie review)\b/i,
  /\b(tell me a joke|dating advice|relationship drama|who will win)\b/i,
  /\b(recipe for(?! healthy)|game cheat|hack account)\b/i,
];

const HEALTH_KEYWORDS = [
  "period", "menstrual", "cycle", "cramp", "pms", "ovulation", "tampon", "pad",
  "mood", "anxiety", "stress", "depression", "mental", "sleep", "insomnia",
  "nutrition", "food", "eat", "hygiene", "skin", "acne", "wellness", "health",
  "exercise", "workout", "bully", "self-esteem", "shecare", "symptom", "bloat",
  "headache", "energy", "tired", "sad", "worry", "panic", "breath", "mindful",
];

function assessRelevance(message) {
  const text = message.toLowerCase();
  if (OFF_TOPIC_PATTERNS.some((pattern) => pattern.test(text))) return false;
  if (HEALTH_KEYWORDS.some((word) => text.includes(word))) return true;
  return null;
}

function fallbackWellnessReply(message) {
  const text = message.toLowerCase();
  if (text.includes("cramp") || text.includes("pain")) {
    return "Gentle heat, hydration, light movement, and rest can help with common cramps. Seek medical care for sudden, severe, or worsening pain.";
  }
  if (text.includes("late") || text.includes("miss") || text.includes("period")) {
    return "Stress, routine changes, and illness can shift a period. If pregnancy is possible or cycles stay very irregular, speak with a qualified clinician.";
  }
  if (text.includes("mood") || text.includes("anx") || text.includes("stress")) {
    return "Mood shifts are common, especially around hormonal changes. Protect sleep, talk to someone you trust, and seek professional support if daily life feels hard.";
  }
  if (text.includes("sleep")) {
    return "Teens often need 8–10 hours of sleep (CDC). Try a consistent bedtime, less screen time before bed, and a cool, dark room.";
  }
  return "I can help with menstrual health, mood, nutrition, hygiene, sleep, and general teen wellness. For emergencies or severe symptoms, contact a clinician or local emergency services.";
}

async function callGemini(prompt) {
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
  return payload.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

async function getWellnessReply(message) {
  const relevance = assessRelevance(message);
  if (relevance === false) {
    return {
      offTopic: true,
      text: "I can only help with teen health and wellness topics — like periods, mood, sleep, nutrition, hygiene, and self-care. Try asking about something health-related!",
    };
  }

  if (!process.env.GEMINI_API_KEY) {
    return { text: fallbackWellnessReply(message) };
  }

  const prompt = `You are SheCARE Guide, a warm health-education assistant for teen girls.

STRICT RULES:
- ONLY answer questions about: menstrual/cycle health, mental wellness, nutrition, physical activity, hygiene, sleep, bullying/cyberbullying (coping), self-esteem, stress, and using SheCARE features.
- If the question is off-topic (homework, coding, politics, entertainment, relationships as gossip, etc.), reply with EXACTLY: OFF_TOPIC
- Never diagnose. Never claim certainty. Encourage professional care for emergencies or severe symptoms.
- Keep answers under 120 words, friendly, and age-appropriate.
- Cite general guidance (e.g. WHO, CDC) only when accurate; do not invent statistics.

User question: ${message}`;

  try {
    const answer = await callGemini(prompt);
    if (answer.trim() === "OFF_TOPIC" || answer.trim().startsWith("OFF_TOPIC")) {
      return {
        offTopic: true,
        text: "I can only help with teen health and wellness topics — like periods, mood, sleep, nutrition, hygiene, and self-care. Try asking about something health-related!",
      };
    }
    return { text: answer || fallbackWellnessReply(message) };
  } catch (error) {
    console.error("Gemini error:", error.message);
    return { text: fallbackWellnessReply(message) };
  }
}

app.post("/api/chat", requireAuth, async (req, res) => {
  const message = req.body.message?.trim();
  if (!message || message.length > 500) {
    return res.status(400).json({ message: "Please enter a message (max 500 characters)." });
  }
  const reply = await getWellnessReply(message);
  if (reply.offTopic) return res.status(400).json({ message: reply.text });
  res.json({ reply: reply.text });
});

app.post("/api/monthly-report", requireAuth, async (req, res) => {
  try {
    const wellness = req.body.wellness && typeof req.body.wellness === "object"
      ? req.body.wellness
      : req.user.wellness || {};
    const cycle = wellness.cycle || {};
    const checkIns = Array.isArray(wellness.checkIns) ? wellness.checkIns : [];
    const reminders = Array.isArray(wellness.reminders) ? wellness.reminders : [];
    const now = new Date();
    const monthLabel = now.toLocaleString("en-IN", { month: "long", year: "numeric" });

    const symptomCounts = {};
    checkIns.forEach((entry) => {
      (entry.symptoms || []).forEach((symptom) => {
        symptomCounts[symptom] = (symptomCounts[symptom] || 0) + 1;
      });
    });

    const topSymptoms = Object.entries(symptomCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name, count]) => `${name} (${count}×)`);

    const report = {
      month: monthLabel,
      cycleLength: cycle.length || 28,
      checkInsLogged: checkIns.length,
      activeReminders: reminders.filter((item) => item.enabled).length,
      topSymptoms,
      summary: "",
    };

    if (process.env.GEMINI_API_KEY) {
      const prompt = `Write a warm, brief monthly wellness summary (max 100 words) for a teen using SheCARE.
Data: ${JSON.stringify(report)}. Mention patterns gently, encourage self-care, no diagnosis.`;
      try {
        report.summary = await callGemini(prompt);
      } catch {
        report.summary = buildLocalReportSummary(report);
      }
    } else {
      report.summary = buildLocalReportSummary(report);
    }

    res.json({ report });
  } catch (error) {
    console.error("Monthly report error:", error.message);
    res.status(500).json({ message: "Could not generate your monthly report." });
  }
});

function buildLocalReportSummary(report) {
  const parts = [`Here's your ${report.month} snapshot.`];
  if (report.checkInsLogged) parts.push(`You logged ${report.checkInsLogged} check-in(s).`);
  if (report.topSymptoms.length) parts.push(`Most noted: ${report.topSymptoms.join(", ")}.`);
  parts.push("Patterns are information, not judgement — keep noticing what helps you feel better.");
  return parts.join(" ");
}

app.post("/api/feedback", async (req, res) => {
  try {
    const rating = Number(req.body.rating);
    const message = req.body.message?.trim();
    const category = req.body.category?.trim().slice(0, 40) || "general";
    if (!rating || rating < 1 || rating > 5 || !message || message.length > 1000) {
      return res.status(400).json({ message: "Please include a 1–5 rating and feedback message." });
    }
    const entry = { rating, message, category, createdAt: new Date() };
    if (databaseReady) {
      await Feedback.create(entry);
    } else {
      memoryFeedback.push(entry);
    }
    res.status(201).json({ ok: true, message: "Thank you for your feedback!" });
  } catch (error) {
    console.error("Feedback error:", error.message);
    res.status(500).json({ message: "Could not save feedback." });
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