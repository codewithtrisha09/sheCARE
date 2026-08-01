import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

export default function Auth() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/care-space";

  if (isAuthenticated) {
    navigate(from, { replace: true });
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      if (mode === "login") {
        await login(form.email, form.password);
      } else {
        await register(form.name, form.email, form.password);
      }
      navigate(from, { replace: true });
    } catch (error) {
      setMessage(error.message || "We couldn't connect to SheCARE. Make sure the API server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-intro">
        <Link to="/" className="auth-logo">SheCARE</Link>
        <p>YOUR WELLNESS SPACE</p>
        <h1>Care, saved<br />just for you.</h1>
        <span>
          Sign in to keep your cycle notes, reminders, and wellness reflections in one private place.
        </span>
      </section>

      <section className="auth-panel" aria-labelledby="auth-heading">
        <div className="auth-tabs" role="tablist" aria-label="Authentication mode">
          <button
            type="button"
            role="tab"
            aria-selected={mode === "login"}
            className={mode === "login" ? "chosen" : ""}
            onClick={() => { setMode("login"); setMessage(""); }}
          >
            Sign in
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "register"}
            className={mode === "register" ? "chosen" : ""}
            onClick={() => { setMode("register"); setMessage(""); }}
          >
            Create account
          </button>
        </div>

        <h2 id="auth-heading">{mode === "login" ? "Welcome back" : "Let's get you started"}</h2>

        <form onSubmit={submit} noValidate>
          {mode === "register" && (
            <label htmlFor="auth-name">
              Name
              <input
                id="auth-name"
                required
                autoComplete="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </label>
          )}
          <label htmlFor="auth-email">
            Email
            <input
              id="auth-email"
              required
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>
          <label htmlFor="auth-password">
            Password
            <input
              id="auth-password"
              required
              minLength={8}
              type="password"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </label>
          {message && (
            <p className="auth-message" role="alert">{message}</p>
          )}
          <button disabled={loading} type="submit">
            {loading ? "One moment…" : mode === "login" ? "Sign in" : "Create my account"}
          </button>
        </form>
      </section>
    </main>
  );
}
