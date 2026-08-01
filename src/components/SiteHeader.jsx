import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./SiteHeader.css";

const navItems = [
  ["/menstrual-health", "Cycle health"],
  ["/mental-health", "Mind & mood"],
  ["/nutrition-wellness", "Nutrition"],
  ["/physical-health", "Physical health"],
  ["/personal-hygiene", "Hygiene"],
  ["/myth-vs-fact", "Myths vs facts"],
  ["/care-space", "My Care Space"],
];

export default function SiteHeader() {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <Link className="site-brand" to="/" aria-label="SheCARE home">
        SheCARE<span aria-hidden="true">✦</span>
      </Link>

      <nav className="site-nav-desktop" aria-label="Main navigation">
        {navItems.map(([path, label]) => (
          <Link
            key={path}
            className={location.pathname === path ? "nav-current" : ""}
            to={path}
            aria-current={location.pathname === path ? "page" : undefined}
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className="site-header-actions">
        {isAuthenticated ? (
          <>
            <span className="site-user" aria-label={`Signed in as ${user?.name}`}>
              Hi, {user?.name?.split(" ")[0] || "there"}
            </span>
            <button type="button" className="site-logout" onClick={logout}>
              Sign out
            </button>
          </>
        ) : (
          <Link className="site-login" to="/auth">Sign in</Link>
        )}

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span /><span />
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`mobile-nav ${menuOpen ? "open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          {navItems.map(([path, label]) => (
            <Link
              key={path}
              className={location.pathname === path ? "nav-current" : ""}
              to={path}
              aria-current={location.pathname === path ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
          {!isAuthenticated && <Link to="/auth">Sign in</Link>}
          {isAuthenticated && (
            <button type="button" className="mobile-logout" onClick={logout}>
              Sign out
            </button>
          )}
        </nav>
      </div>

      {menuOpen && (
        <button
          type="button"
          className="nav-backdrop"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
}
