import DocsSection from "../DocsSection";

const roadmap = [
  {
    horizon: "Short Term",
    timing: "Q3 2026",
    color: "emerald",
    items: [
      { name: "Pro subscription tier", desc: "Unlimited briefs, priority AI, team seats at $49/mo" },
      { name: "Report preview & samples", desc: "Watermarked preview before purchase to reduce buyer friction" },
      { name: "Brief version history", desc: "Edit briefs, track changes, re-run AI analysis" },
      { name: "Analyst listing boost", desc: "Paid ranking placement in recommendation results" },
      { name: "Email notifications", desc: "Alert founders when recommendations are ready" },
    ],
  },
  {
    horizon: "Mid Term",
    timing: "Q4 2026 – Q2 2027",
    color: "gold",
    items: [
      { name: "Pitch.com / Notion integrations", desc: "Embed Marketrix research directly into pitch decks" },
      { name: "Multi-brief comparison", desc: "Compare two briefs side-by-side for pivot analysis" },
      { name: "VC portfolio research package", desc: "Bulk briefing + reporting for VC portfolio companies" },
      { name: "Public analyst profiles", desc: "SEO-indexed analyst pages to drive organic discovery" },
      { name: "Report rating & review system", desc: "Founder ratings to surface quality analyst work" },
    ],
  },
  {
    horizon: "Long Term",
    timing: "Q3 2027+",
    color: "coral",
    items: [
      { name: "GraphRAG knowledge graph", desc: "Multi-hop industry/competitor relationship graph for complex queries" },
      { name: "Custom embedding fine-tuning", desc: "Domain-specific model trained on Marketrix data" },
      { name: "Public API access", desc: "Third-party integrations with API key management + rate limiting" },
      { name: "Mobile app", desc: "React Native iOS + Android for on-the-go brief submission" },
      { name: "AI analyst agent", desc: "Autonomous research agent that conducts desk research from brief specs" },
    ],
  },
];

const colorMap: Record<string, string> = {
  emerald: "var(--emerald)",
  gold: "var(--gold)",
  coral: "var(--coral)",
};
const bgMap: Record<string, string> = {
  emerald: "var(--emerald-surface)",
  gold: "var(--gold-surface)",
  coral: "var(--coral-surface)",
};
const borderMap: Record<string, string> = {
  emerald: "var(--emerald-border)",
  gold: "var(--gold-border)",
  coral: "var(--coral-border)",
};

export default function RoadmapSection() {
  return (
    <DocsSection
      id="roadmap"
      number="T09"
      type="technical"
      eyebrow="Roadmap"
      title="Product evolution over three horizons"
      subtitle="Short-term focus on monetization and polish. Mid-term on distribution and integrations. Long-term on platform infrastructure and AI research agents."
    >
      <div className="rm-horizons">
        {roadmap.map((h, i) => (
          <div key={i} className="rm-horizon" style={{ borderLeftColor: borderMap[h.color] }}>
            <div className="rm-horizon-header">
              <span className="rm-horizon-name" style={{ color: colorMap[h.color], background: bgMap[h.color], borderColor: borderMap[h.color] }}>
                {h.horizon}
              </span>
              <span className="rm-timing">{h.timing}</span>
            </div>
            <div className="rm-items">
              {h.items.map((item, j) => (
                <div key={j} className="rm-item">
                  <div className="rm-item-dot" style={{ background: colorMap[h.color] }} />
                  <div className="rm-item-content">
                    <span className="rm-item-name">{item.name}</span>
                    <span className="rm-item-desc">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .rm-horizons { display: flex; flex-direction: column; gap: 20px; }
        .rm-horizon {
          border: 1px solid var(--line-medium);
          border-left: 3px solid;
          border-radius: 12px;
          overflow: hidden;
          background: var(--bg-surface);
        }
        .rm-horizon-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-bottom: 1px solid var(--line);
          background: var(--bg-raised);
        }
        .rm-horizon-name {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.68rem;
          font-weight: 700;
          padding: 3px 9px;
          border-radius: 4px;
          border: 1px solid;
        }
        .rm-timing {
          font-size: 0.82rem;
          color: var(--ink-muted);
          font-family: var(--font-jetbrains), monospace;
        }
        .rm-items { padding: 12px 16px; display: flex; flex-direction: column; gap: 0; }
        .rm-item {
          display: flex;
          gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid var(--line-soft);
          align-items: flex-start;
        }
        .rm-item:last-child { border-bottom: none; }
        .rm-item-dot {
          width: 7px; height: 7px;
          border-radius: 999px;
          flex-shrink: 0;
          margin-top: 6px;
        }
        .rm-item-content { display: flex; flex-direction: column; gap: 3px; }
        .rm-item-name {
          font-size: 0.87rem;
          font-weight: 600;
          color: var(--ink);
        }
        .rm-item-desc {
          font-size: 0.8rem;
          color: var(--ink-muted);
          line-height: 1.5;
        }
      `}</style>
    </DocsSection>
  );
}
