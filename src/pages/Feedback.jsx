import { useState } from "react";
import { Link } from "react-router-dom";
import "./Feedback.css";

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("general");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    if (!rating || !message.trim()) {
      setStatus("Please add a rating and a short message.");
      return;
    }
    setLoading(true);
    setStatus("");
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ rating, message: message.trim(), category }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setStatus("Thank you! Your feedback helps us improve SheCARE.");
      setRating(0);
      setMessage("");
    } catch (error) {
      setStatus(error.message || "Could not send feedback. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="feedback-page">
      <section className="feedback-hero">
        <p className="eyebrow">YOUR VOICE MATTERS</p>
        <h1>Tell us how SheCARE feels for you</h1>
        <p>
          Honest feedback helps us build a safer, clearer, more helpful space for teens.
          This takes about a minute.
        </p>
      </section>

      <form className="feedback-card" onSubmit={submit}>
        <fieldset className="rating-field">
          <legend>Overall experience</legend>
          <div className="rating-row">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={rating >= star ? "star active" : "star"}
                aria-label={`Rate ${star} out of 5`}
                onClick={() => setRating(star)}
              >
                ★
              </button>
            ))}
          </div>
        </fieldset>

        <label htmlFor="feedback-category">What are you giving feedback on?</label>
        <select
          id="feedback-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="general">Overall site</option>
          <option value="design">Design & layout</option>
          <option value="content">Health content</option>
          <option value="chatbot">AI guide / chatbot</option>
          <option value="care-space">Care Space dashboard</option>
          <option value="auth">Sign up / login</option>
        </select>

        <label htmlFor="feedback-message">Your feedback</label>
        <textarea
          id="feedback-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What worked well? What felt confusing or missing?"
          maxLength={1000}
          rows={5}
          required
        />

        {status && <p className={`feedback-status ${status.startsWith("Thank") ? "ok" : "err"}`} role="status">{status}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Sending…" : "Submit feedback"}
        </button>
      </form>

      <p className="feedback-note">
        You can submit feedback without an account. <Link to="/auth">Sign in</Link> to also save your Care Space data.
      </p>
    </main>
  );
}
