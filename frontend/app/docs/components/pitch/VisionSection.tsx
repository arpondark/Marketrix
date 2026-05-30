import DocsSection from "../DocsSection";

export default function VisionSection() {
  return (
    <DocsSection
      id="vision"
      number="11"
      type="pitch"
      eyebrow="Vision"
      title="The market intelligence OS for every founder"
      subtitle="In 10 years, every founder making a strategic decision will turn to Marketrix first — not Google, not a consultant, not a VC. We are building the Bloomberg Terminal for startup market intelligence."
    >
      <div className="vision-pillars">
        <div className="vision-pillar vision-pillar--large">
          <h3 className="vision-pillar-title">The north star</h3>
          <p className="vision-pillar-body">
            Marketrix becomes the default operating layer for market intelligence decisions at every stage of the startup journey — from idea validation to Series C growth research to M&A due diligence.
          </p>
          <p className="vision-pillar-body">
            We build not just a product, but a <strong>data moat</strong>: millions of structured briefs, anonymized signals from analyst-founder interactions, and a continuously improving semantic index that makes every new query smarter than the last.
          </p>
        </div>

        <div className="vision-pillar-grid">
          <div className="vision-mini-pillar">
            <span className="vision-mini-year">2026</span>
            <h4 className="vision-mini-title">Market launch</h4>
            <p className="vision-mini-desc">5,000 founders, 1,000 analysts, $5M GMV. Category definition.</p>
          </div>
          <div className="vision-mini-pillar">
            <span className="vision-mini-year">2027</span>
            <h4 className="vision-mini-title">Research graph</h4>
            <p className="vision-mini-desc">Graph-based intelligence layer — interconnected industries, competitors, geographies.</p>
          </div>
          <div className="vision-mini-pillar">
            <span className="vision-mini-year">2028</span>
            <h4 className="vision-mini-title">Platform OS</h4>
            <p className="vision-mini-desc">Marketrix API powers third-party tools — pitch decks, investor portals, accelerator dashboards.</p>
          </div>
          <div className="vision-mini-pillar">
            <span className="vision-mini-year">2030</span>
            <h4 className="vision-mini-title">Global standard</h4>
            <p className="vision-mini-desc">100K+ startups. The Bloomberg Terminal for market intelligence. IPO readiness.</p>
          </div>
        </div>
      </div>

      {/* Closing statement */}
      <blockquote className="vision-quote">
        <span className="vision-quote-mark">"</span>
        Every great company is built on great market insight. We're building the infrastructure that makes that insight accessible to every founder, not just those who can afford McKinsey.
        <span className="vision-quote-attribution">— Marketrix Team</span>
      </blockquote>

      <style>{`
        .vision-pillars {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-bottom: 40px;
        }
        .vision-pillar--large {
          padding: 32px;
          border-radius: 16px;
          border: 1px solid var(--emerald-border);
          background: var(--emerald-surface);
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .vision-pillar-title {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--emerald);
          margin: 0;
        }
        .vision-pillar-body {
          font-size: 0.95rem;
          color: var(--ink-soft);
          line-height: 1.7;
          margin: 0;
        }
        .vision-pillar-body strong { color: var(--ink); font-weight: 700; }

        .vision-pillar-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        @media (max-width: 640px) { .vision-pillar-grid { grid-template-columns: repeat(2, 1fr); } }
        .vision-mini-pillar {
          padding: 20px;
          border-radius: 12px;
          border: 1px solid var(--line);
          background: var(--bg-surface);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .vision-mini-year {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--emerald);
        }
        .vision-mini-title {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--ink);
          margin: 0;
          font-family: var(--font-dm-sans), system-ui, sans-serif;
        }
        .vision-mini-desc {
          font-size: 0.78rem;
          color: var(--ink-muted);
          line-height: 1.5;
          margin: 0;
        }

        .vision-quote {
          position: relative;
          border: 1px solid var(--line-medium);
          border-left: 4px solid var(--emerald);
          border-radius: 0 12px 12px 0;
          background: var(--bg-surface);
          padding: 28px 28px 28px 32px;
          margin: 0;
          font-size: 1.05rem;
          font-style: italic;
          color: var(--ink-soft);
          line-height: 1.65;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .vision-quote-mark {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: 3rem;
          color: var(--emerald);
          line-height: 0.5;
          font-style: normal;
          opacity: 0.5;
          align-self: flex-start;
        }
        .vision-quote-attribution {
          font-size: 0.8rem;
          font-style: normal;
          font-weight: 700;
          color: var(--ink-muted);
        }
      `}</style>
    </DocsSection>
  );
}
