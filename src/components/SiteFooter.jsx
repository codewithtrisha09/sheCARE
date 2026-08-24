import { Link } from "react-router-dom";
import "./SiteFooter.css";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-brand">
          <strong>SheCARE</strong>
          <p>Warm, evidence-based wellness for teens.</p>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <Link to="/mental-health">Mind & mood</Link>
          <Link to="/care-space">Care Space</Link>
          <Link to="/feedback">Share feedback</Link>
        </nav>
        <p className="footer-note">
          SheCARE supports education — not diagnosis or emergency care.
          If you are in crisis, contact local emergency services or a trusted adult.
        </p>
      </div>
    </footer>
  );
}
