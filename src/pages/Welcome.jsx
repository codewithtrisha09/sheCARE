import { Link } from "react-router-dom";
import "./Welcome.css";

const blooms = ["✦", "●", "✦", "●", "✦"];

export default function Welcome() {
  return <main className="welcome-page">
    <div className="welcome-orb orb-one" /><div className="welcome-orb orb-two" />
    <div className="sparkles" aria-hidden="true">{blooms.map((bloom, index) => <span key={index}>{bloom}</span>)}</div>
    <section className="welcome-copy">
      <p className="welcome-label">SHECARE · WELLNESS, MADE WARMER</p>
      <h1>Grow into<br /><em>your healthiest</em><br />self.</h1>
      <p className="welcome-text">A kind corner for periods, wellbeing, and all the questions that deserve a real answer. Learn, track patterns, and take care of yourself—one small step at a time.</p>
      <div className="welcome-actions"><Link to="/care-space" className="welcome-primary">Start your care journey <span>→</span></Link><Link to="/menstrual-health" className="welcome-secondary">Explore health topics</Link></div>
      <div className="welcome-trust"><span>Private by design</span><span>Judgement-free</span><span>Made for teens</span></div>
    </section>
    <aside className="welcome-visual" aria-label="Illustration of a wellness journal">
      <div className="journal-card"><span className="journal-pin" /><p>today's gentle reminder</p><strong>Take a breath.<br />You’re doing enough.</strong><div className="journal-line" /><div className="journal-petal">✿</div></div>
      <div className="floating-note note-one">cycle<br /><b>in tune</b></div><div className="floating-note note-two">you’ve got this ✦</div>
    </aside>
  </main>;
}
