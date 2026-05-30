import DocsSection from "../DocsSection";

export default function AnalyticsSection() {
  return (
    <DocsSection
      id="analytics"
      number="T12"
      type="technical"
      eyebrow="Analytics & KPIs"
      title="Key metrics we track"
    >
      <div className="ana-groups">
        {[
          {
            group: "Growth KPIs",
            metrics: [
              { name: "Weekly Active Founders (WAF)", target: ">500", current: "312", status: "trending" },
              { name: "Briefs Submitted (monthly)", target: ">500", current: "421", status: "on-track" },
              { name: "New Analyst Signups (weekly)", target: ">20", current: "18", status: "near" },
              { name: "Report Listings (total)", target: ">3,000", current: "2,841", status: "on-track" },
            ],
          },
          {
            group: "Engagement KPIs",
            metrics: [
              { name: "Brief → Recommendation Rate", target: "95%", current: "97%", status: "achieved" },
              { name: "Founder D30 Retention", target: "70%", current: "78%", status: "achieved" },
              { name: "Avg Recommendations per Brief", target: "5+", current: "6.2", status: "achieved" },
              { name: "Avg Match Cosine Score", target: ">0.85", current: "0.914", status: "achieved" },
            ],
          },
          {
            group: "Revenue KPIs",
            metrics: [
              { name: "Monthly GMV", target: "$40K", current: "$28K", status: "trending" },
              { name: "Avg Report Price", target: "$89", current: "$72", status: "near" },
              { name: "Platform Take Rate", target: "18%", current: "15%", status: "on-track" },
              { name: "MRR (subscription)", target: "$5K", current: "$0", status: "planned" },
            ],
          },
        ].map((g, i) => (
          <div key={i} className="ana-group">
            <h3 className="ana-group-name">{g.group}</h3>
            <div className="ana-metrics">
              {g.metrics.map((m, j) => {
                const statusClass = m.status === "achieved" ? "achieved" : m.status === "on-track" ? "on-track" : m.status === "trending" ? "trending" : m.status === "near" ? "near" : "planned";
                return (
                  <div key={j} className="ana-metric-row">
                    <span className="ana-metric-name">{m.name}</span>
                    <span className="ana-metric-current">{m.current}</span>
                    <span className="ana-metric-target">target: {m.target}</span>
                    <span className={`ana-status ana-status--${statusClass}`}>{m.status}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .ana-groups { display: flex; flex-direction: column; gap: 24px; }
        .ana-group-name {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--ink-muted);
          margin: 0 0 10px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--line);
        }
        .ana-metrics { display: flex; flex-direction: column; gap: 0; }
        .ana-metric-row {
          display: grid;
          grid-template-columns: 1fr auto auto auto;
          gap: 16px;
          padding: 10px 0;
          border-bottom: 1px solid var(--line-soft);
          align-items: center;
        }
        .ana-metric-row:last-child { border-bottom: none; }
        @media (max-width: 540px) { .ana-metric-row { grid-template-columns: 1fr auto; } }
        .ana-metric-name {
          font-size: 0.87rem;
          color: var(--ink-soft);
        }
        .ana-metric-current {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--ink);
        }
        .ana-metric-target {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.72rem;
          color: var(--ink-muted);
        }
        @media (max-width: 540px) { .ana-metric-target { display: none; } }
        .ana-status {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.65rem;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 4px;
          text-transform: uppercase;
        }
        .ana-status--achieved { background: var(--emerald-surface); color: var(--emerald); border: 1px solid var(--emerald-border); }
        .ana-status--on-track { background: var(--gold-surface); color: var(--gold); border: 1px solid var(--gold-border); }
        .ana-status--trending { background: var(--gold-surface); color: var(--gold); border: 1px solid var(--gold-border); }
        .ana-status--near { background: var(--coral-surface); color: var(--coral); border: 1px solid var(--coral-border); }
        .ana-status--planned { background: var(--bg-elevated); color: var(--ink-muted); border: 1px solid var(--line); }
      `}</style>
    </DocsSection>
  );
}
