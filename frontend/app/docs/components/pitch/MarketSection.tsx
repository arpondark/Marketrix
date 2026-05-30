import DocsSection from "../DocsSection";

export default function MarketSection() {
  return (
    <DocsSection
      id="market"
      number="04"
      type="pitch"
      eyebrow="Market Opportunity"
      title="A $280B+ addressable market, largely undigitized"
      subtitle="The global market research industry is massive, growing, and fundamentally broken for startups. Marketrix targets the underserved bottom of this pyramid."
    >
      {/* TAM/SAM/SOM funnel */}
      <div className="market-funnel">
        <div className="market-funnel-item market-funnel-item--tam">
          <div className="market-funnel-bar" style={{ width: "100%" }} />
          <div className="market-funnel-info">
            <div className="market-funnel-label-group">
              <span className="market-funnel-acronym">TAM</span>
              <span className="market-funnel-desc">Global Market Research & Intelligence Industry</span>
            </div>
            <span className="market-funnel-value">$280B</span>
          </div>
        </div>
        <div className="market-funnel-item market-funnel-item--sam">
          <div className="market-funnel-bar" style={{ width: "60%" }} />
          <div className="market-funnel-info">
            <div className="market-funnel-label-group">
              <span className="market-funnel-acronym">SAM</span>
              <span className="market-funnel-desc">Digital-first B2B startup market research platforms</span>
            </div>
            <span className="market-funnel-value">$42B</span>
          </div>
        </div>
        <div className="market-funnel-item market-funnel-item--som">
          <div className="market-funnel-bar" style={{ width: "25%" }} />
          <div className="market-funnel-info">
            <div className="market-funnel-label-group">
              <span className="market-funnel-acronym">SOM</span>
              <span className="market-funnel-desc">AI-matched research marketplace for early-stage startups</span>
            </div>
            <span className="market-funnel-value">$3.8B</span>
          </div>
        </div>
      </div>

      {/* Context */}
      <div className="market-context-grid">
        <div className="market-context-card">
          <span className="market-context-num">350K+</span>
          <span className="market-context-label">New startups funded globally per year (seed to Series A)</span>
        </div>
        <div className="market-context-card">
          <span className="market-context-num">$2,400</span>
          <span className="market-context-label">Average annual spend on market research per early-stage startup</span>
        </div>
        <div className="market-context-card">
          <span className="market-context-num">18%</span>
          <span className="market-context-label">Year-over-year growth in independent market analyst supply (creator economy tailwind)</span>
        </div>
      </div>

      <style>{`
        .market-funnel {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 40px;
        }
        .market-funnel-item {
          border-radius: 12px;
          border: 1px solid var(--line-medium);
          background: var(--bg-surface);
          overflow: hidden;
        }
        .market-funnel-bar {
          height: 4px;
        }
        .market-funnel-item--tam .market-funnel-bar { background: var(--emerald); box-shadow: 0 0 10px rgba(26,255,156,0.4); }
        .market-funnel-item--sam .market-funnel-bar { background: var(--gold); }
        .market-funnel-item--som .market-funnel-bar { background: var(--coral); }
        .market-funnel-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 20px;
          gap: 16px;
        }
        .market-funnel-label-group {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }
        .market-funnel-acronym {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--ink-muted);
          flex-shrink: 0;
          min-width: 32px;
        }
        .market-funnel-desc {
          font-size: 0.88rem;
          color: var(--ink-soft);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        @media (max-width: 500px) {
          .market-funnel-desc { display: none; }
        }
        .market-funnel-value {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--ink);
          flex-shrink: 0;
        }

        .market-context-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (max-width: 640px) { .market-context-grid { grid-template-columns: 1fr; } }
        .market-context-card {
          padding: 24px;
          border-radius: 14px;
          border: 1px solid var(--line);
          background: var(--bg-raised);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .market-context-num {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--emerald);
          line-height: 1;
        }
        .market-context-label {
          font-size: 0.8rem;
          color: var(--ink-muted);
          line-height: 1.5;
        }
      `}</style>
    </DocsSection>
  );
}
