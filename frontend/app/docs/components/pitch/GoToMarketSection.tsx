import DocsSection from "../DocsSection";

const phases = [
  {
    phase: "Phase 1",
    label: "Bootstrapped Community",
    timing: "Now → Q3 2026",
    status: "active",
    channels: ["Founder communities (Slack, Discord)", "YC alumni network outreach", "Content marketing (research teardowns)", "Founder Twitter / LinkedIn"],
    target: "Pre-seed & seed stage founders",
    goal: "2,000 active founders, 500 verified analysts",
  },
  {
    phase: "Phase 2",
    label: "Product-Led Growth",
    timing: "Q4 2026 → Q2 2027",
    status: "planned",
    channels: ["Report embed sharing (viral loop)", "Analyst referral program", "Integration with YC portal, Notion, Pitch.com", "SEO — industry + geography research queries"],
    target: "Series A startups + VC-backed teams",
    goal: "15,000 founders, $2M ARR",
  },
  {
    phase: "Phase 3",
    label: "Enterprise & Partnerships",
    timing: "Q3 2027+",
    status: "future",
    channels: ["VC firm partnerships (portfolio research)", "Accelerator program integrations", "Corporate innovation teams", "API access for 3rd-party platforms"],
    target: "VCs, accelerators, enterprise innovation",
    goal: "Category leadership, $10M ARR",
  },
];

const statusColors: Record<string, string> = {
  active: "tag-emerald",
  planned: "tag-gold",
  future: "tag",
};

export default function GoToMarketSection() {
  return (
    <DocsSection
      id="go-to-market"
      number="09"
      type="pitch"
      eyebrow="Go-To-Market"
      title="Community → Product-Led → Enterprise"
      subtitle="We grow bottom-up: earn trust in founder communities first, then let product virality (shared research, referrals) compound the growth before pursuing top-down enterprise partnerships."
    >
      <div className="gtm-phases">
        {phases.map((p, i) => (
          <div key={i} className="gtm-phase">
            <div className="gtm-phase-meta">
              <div className="gtm-phase-header">
                <span className="gtm-phase-num">{p.phase}</span>
                <h3 className="gtm-phase-label">{p.label}</h3>
                <span className={`tag ${statusColors[p.status]}`}>{p.status.toUpperCase()}</span>
              </div>
              <span className="gtm-timing">{p.timing}</span>
            </div>
            <div className="gtm-channels">
              {p.channels.map((c, j) => (
                <div key={j} className="gtm-channel">
                  <span className="gtm-channel-dot" />
                  {c}
                </div>
              ))}
            </div>
            <div className="gtm-goal-row">
              <div className="gtm-goal-item">
                <span className="gtm-goal-key">Target</span>
                <span className="gtm-goal-val">{p.target}</span>
              </div>
              <div className="gtm-goal-item">
                <span className="gtm-goal-key">Goal</span>
                <span className="gtm-goal-val">{p.goal}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .gtm-phases { display: flex; flex-direction: column; gap: 16px; }
        .gtm-phase {
          padding: 24px;
          border-radius: 14px;
          border: 1px solid var(--line-medium);
          background: var(--bg-surface);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .gtm-phase-meta { display: flex; flex-direction: column; gap: 6px; }
        .gtm-phase-header {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .gtm-phase-num {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.65rem;
          color: var(--ink-muted);
          font-weight: 600;
        }
        .gtm-phase-label {
          font-size: 1rem;
          font-weight: 700;
          color: var(--ink);
          margin: 0;
          font-family: var(--font-dm-sans), system-ui, sans-serif;
          flex: 1;
        }
        .gtm-timing {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.7rem;
          color: var(--ink-muted);
        }
        .gtm-channels { display: flex; flex-direction: column; gap: 6px; }
        .gtm-channel {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.87rem;
          color: var(--ink-soft);
        }
        .gtm-channel-dot {
          width: 5px; height: 5px;
          border-radius: 999px;
          background: var(--emerald);
          flex-shrink: 0;
        }
        .gtm-goal-row {
          display: flex;
          gap: 24px;
          padding-top: 12px;
          border-top: 1px solid var(--line);
          flex-wrap: wrap;
        }
        .gtm-goal-item { display: flex; flex-direction: column; gap: 3px; }
        .gtm-goal-key {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--ink-muted);
          font-family: var(--font-jetbrains), monospace;
        }
        .gtm-goal-val {
          font-size: 0.87rem;
          font-weight: 600;
          color: var(--ink);
        }
      `}</style>
    </DocsSection>
  );
}
