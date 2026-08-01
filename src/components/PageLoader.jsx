import "./PageLoader.css";

export default function PageLoader({ label = "Loading…" }) {
  return (
    <main className="page-loader" role="status" aria-live="polite">
      <div className="page-loader-shimmer" aria-hidden="true">
        <div className="shimmer-bar" />
        <div className="shimmer-bar short" />
        <div className="shimmer-card" />
      </div>
      <p>{label}</p>
    </main>
  );
}
