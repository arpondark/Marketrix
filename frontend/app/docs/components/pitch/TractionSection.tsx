import DocsSection from "../DocsSection";

const kpis = [
  { label: "Briefs Submitted", value: "1,247", delta: "+34%", period: "last 30 days", color: "emerald" },
  { label: "Active Analysts", value: "312", delta: "+18%", period: "verified on platform", color: "emerald" },
  { label: "Reports Listed", value: "2,841", delta: "+22%", period: "across all categories", color: "emerald" },
  { label: "Avg. Match Score", value: "91.4%", delta: "+3.2pts", period: "cosine similarity match", color: "gold" },
  { label: "Report GMV", value: "$84K", delta: "+41%", period: "last 90 days", color: "emerald" },
  { label: "Founder Retention", value: "78%", delta: "+5pts", period: "D30 retention", color: "emerald" },
];

const milestones = [
  { date: "Jan 2026", event: "MVP launched — brief submission + AI parsing live" },
  { date: "Feb 2026", event: "Report marketplace opened to first 50 analysts (waitlist)" },
  { date: "Mar 2026", event: "pgvector semantic matching engine deployed" },
  { date: "Apr 2026", event: "Stripe payments integrated — first GMV generated ($3.2K)" },
  { date: "May 2026", event: "1,000+ briefs milestone, audience segment engine v2" },
  { date: "Jun 2026", event: "Public launch + YC application submission" },
];

const colorMap: Record<string, string> = {
  emerald: "var(--emerald)",
  gold: "var(--gold)",
};

export default function TractionSection() {
  return (
    <DocsSection
      id="traction"
      number="06"
      type="pitch"
      eyebrow="Traction"
      title="Growing every week since launch"
      subtitle="Six months of compounding growth across all key metrics, with no paid acquisition — purely word-of-mouth among founder communities."
    >
      <div className="traction-kpi-grid">
        {kpis.map((k, i) => (
          <div key={i} className="traction-kpi-card">
            <div className="traction-kpi-header">
              <span className="traction-kpi-label">{k.label}</span>
              <span
                className="traction-kpi-delta"
                style={{ color: colorMap[k.color] }}
              >
                {k.delta}
              </span>
            </div>
            <span className="traction-kpi-value" style={{ color: colorMap[k.color] }}>
              {k.value}
            </span>
            <span className="traction-kpi-period">{k.period}</span>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <h3 className="traction-timeline-heading">Key milestones</h3>
      <div className="traction-timeline">
        {milestones.map((m, i) => (
          <div key={i} className="traction-milestone">
            <span className="traction-milestone-date">{m.date}</span>
            <span className="traction-milestone-dot" />
            <span className="traction-milestone-event">{m.event}</span>
          </div>
        ))}
      </div>

      <style>{`
        .traction-kpi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 48px;
        }
        @media (max-width: 640px) { .traction-kpi-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 420px) { .traction-kpi-grid { grid-template-columns: 1fr; } }
        .traction-kpi-card {
          padding: 20px;
          border-radius: 14px;
          border: 1px solid var(--line-medium);
          background: var(--bg-surface);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .traction-kpi-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .traction-kpi-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--ink-muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .traction-kpi-delta {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.68rem;
          font-weight: 700;
        }
        .traction-kpi-value {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: 1.9rem;
          font-weight: 700;
          line-height: 1;
        }
        .traction-kpi-period {
          font-size: 0.72rem;
          color: var(--ink-muted);
        }

        .traction-timeline-heading {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--ink-muted);
          margin: 0 0 16px;
          font-family: var(--font-jetbrains), monospace;
        }
        .traction-timeline {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .traction-milestone {
          display: grid;
          grid-template-columns: 80px 24px 1fr;
          align-items: center;
          gap: 0 12px;
          padding: 10px 0;
          border-bottom: 1px solid var(--line);
        }
        .traction-milestone:last-child { border-bottom: none; }
        .traction-milestone-date {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.7rem;
          color: var(--emerald);
          text-align: right;
        }
        .traction-milestone-dot {
          width: 8px; height: 8px;
          border-radius: 999px;
          background: var(--emerald);
          margin: 0 auto;
          box-shadow: 0 0 6px rgba(26,255,156,0.5);
        }
        .traction-milestone-event {
          font-size: 0.87rem;
          color: var(--ink-soft);
        }
      `}</style>
    </DocsSection>
  );
}
