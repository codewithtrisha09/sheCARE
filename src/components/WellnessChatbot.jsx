import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./WellnessChatbot.css";

const STARTER = {
  role: "bot",
  text: "Hi! I'm SheCARE Guide. Ask me about periods, mood, nutrition, sleep, hygiene, or wellness — I'll stay on health topics only.",
};

export default function WellnessChatbot() {
  const { isAuthenticated, authFetch } = useAuth();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([STARTER]);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  if (!isAuthenticated) return null;

  const send = async (event) => {
    event.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    setLoading(true);

    try {
      const response = await authFetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, {
        role: "bot",
        text: error.message || "I couldn't respond right now. Try again in a moment.",
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`wellness-chatbot ${open ? "open" : ""}`}>
      {open && (
        <div className="chat-panel" role="dialog" aria-label="SheCARE wellness chat">
          <header className="chat-header">
            <div>
              <strong>SheCARE Guide</strong>
              <span>Health & wellness only</span>
            </div>
            <button type="button" aria-label="Close chat" onClick={() => setOpen(false)}>×</button>
          </header>

          <div className="chat-messages" aria-live="polite">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-bubble ${msg.role}`}>
                {msg.text}
              </div>
            ))}
            {loading && <div className="chat-bubble bot typing">Thinking…</div>}
            <div ref={endRef} />
          </div>

          <form className="chat-input-row" onSubmit={send}>
            <label htmlFor="chat-input" className="sr-only">Ask a wellness question</label>
            <input
              id="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about periods, mood, sleep…"
              maxLength={500}
              disabled={loading}
            />
            <button type="submit" disabled={loading || !input.trim()} aria-label="Send">
              →
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        className="chat-fab"
        aria-expanded={open}
        aria-label={open ? "Close wellness chat" : "Open wellness chat"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "×" : "✦"}
      </button>
    </div>
  );
}
