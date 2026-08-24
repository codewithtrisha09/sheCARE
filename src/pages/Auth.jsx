import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CharacterBuilder, { CharacterAvatar, DEFAULT_CHARACTER } from "../components/CharacterBuilder";
import "./Auth.css";

const readCharacter = () => {
  try {
    const stored = localStorage.getItem("shecare-character");
    return stored ? JSON.parse(stored) : DEFAULT_CHARACTER;
  } catch {
    return DEFAULT_CHARACTER;
  }
};

export default function Auth() {
  const [mode, setMode] = useState("login");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [character, setCharacter] = useState(readCharacter);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/care-space";

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, navigate, from]);

  const submitLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await login(form.email, form.password);
    } catch (error) {
      setMessage(error.message || "We couldn't connect to SheCARE. Make sure the API server is running.");
    } finally {
      setLoading(false);
    }
  };

  const submitRegister = async (event) => {
    event.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      localStorage.setItem("shecare-character", JSON.stringify(character));
      await register(form.name, form.email, form.password, character);
    } catch (error) {
      setMessage(error.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (next) => {
    setMode(next);
    setStep(1);
    setMessage("");
  };

  if (isAuthenticated) return null;

  return (
    <main className="auth-page">
      <section className="auth-intro">
        <Link to="/" className="auth-logo">SheCARE</Link>
        <p>YOUR WELLNESS SPACE</p>
        {mode === "register" && step === 2 ? (
          <>
            <div className="auth-character-preview">
              <CharacterAvatar character={character} size="lg" />
            </div>
            <h1>Make it<br />uniquely yours.</h1>
            <span>Build a little wellness companion that shows up in your Care Space dashboard.</span>
          </>
        ) : (
          <>
            <h1>Care, saved<br />just for you.</h1>
            <span>Sign in to keep your cycle notes, reminders, and wellness reflections in one private place.</span>
          </>
        )}
      </section>

      <section className="auth-panel" aria-labelledby="auth-heading">
        <div className="auth-tabs" role="tablist" aria-label="Authentication mode">
          <button
            type="button"
            role="tab"
            aria-selected={mode === "login"}
            className={mode === "login" ? "chosen" : ""}
            onClick={() => switchMode("login")}
          >
            Sign in
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "register"}
            className={mode === "register" ? "chosen" : ""}
            onClick={() => switchMode("register")}
          >
            Create account
          </button>
        </div>

        {mode === "login" ? (
          <>
            <h2 id="auth-heading">Welcome back</h2>
            <form onSubmit={submitLogin} noValidate>
              <label htmlFor="auth-email">Email
                <input id="auth-email" required type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </label>
              <label htmlFor="auth-password">Password
                <input id="auth-password" required minLength={8} type="password" autoComplete="current-password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              </label>
              {message && <p className="auth-message" role="alert">{message}</p>}
              <button disabled={loading} type="submit">{loading ? "One moment…" : "Sign in"}</button>
            </form>
          </>
        ) : (
          <>
            <h2 id="auth-heading">
              {step === 1 ? "Let's get you started" : "Build your character"}
            </h2>
            <p className="auth-step-label">Step {step} of 2</p>
            <form onSubmit={submitRegister} noValidate>
              {step === 1 ? (
                <>
                  <label htmlFor="auth-name">Name
                    <input id="auth-name" required autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </label>
                  <label htmlFor="reg-email">Email
                    <input id="reg-email" required type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </label>
                  <label htmlFor="reg-password">Password
                    <input id="reg-password" required minLength={8} type="password" autoComplete="new-password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                  </label>
                </>
              ) : (
                <CharacterBuilder value={character} onChange={setCharacter} />
              )}
              {message && <p className="auth-message" role="alert">{message}</p>}
              <div className="auth-actions">
                {step === 2 && (
                  <button type="button" className="auth-secondary" onClick={() => setStep(1)}>Back</button>
                )}
                <button disabled={loading} type="submit">
                  {loading ? "One moment…" : step === 1 ? "Next: build character →" : "Create my account"}
                </button>
              </div>
            </form>
          </>
        )}
      </section>
    </main>
  );
}
