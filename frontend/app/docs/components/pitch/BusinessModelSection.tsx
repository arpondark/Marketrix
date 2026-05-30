import DocsSection from "../DocsSection";

const streams = [
  {
    name: "Report Marketplace Commission",
    tag: "LIVE",
    tagColor: "emerald",
    desc: "Marketrix takes a 15–20% commission on every research report purchase made through the platform. Analysts set their own prices; Marketrix handles payments via Stripe.",
    metrics: ["15–20% take rate", "Stripe-powered", "Instant payout to analysts"],
  },
  {
    name: "Founder Subscription (Pro)",
    tag: "PLANNED",
    tagColor: "gold",
    desc: "Monthly/annual subscription tier giving founders unlimited brief submissions, priority AI processing, saved research libraries, and advanced analytics.",
    metrics: ["$49/mo per seat", "Annual discount 20%", "Team plans available"],
  },
  {
    name: "Analyst Verification & Listing",
    tag: "LIVE",
    tagColor: "emerald",
    desc: "Analysts pay a one-time verification fee ($99) and an optional monthly listing boost to appear higher in AI-matched recommendations for relevant briefs.",
    metrics: ["$99 verification", "Boost from $29/mo", "Demand-based pricing"],
  },
  {
    name: "Enterprise Briefing Packages",
    tag: "UPCOMING",
    tagColor: "coral",
    desc: "White-glove brief processing for VCs, accelerators, and corporate innovation teams — bundled AI analysis + human analyst curation at flat monthly rates.",
    metrics: ["$2,500+/mo", "Custom SLA", "Dedicated account manager"],
  },
];

const tagColors: Record<string, string> = {
  emerald: "tag-emerald",
  gold: "tag-gold",
  coral: "tag-coral",
};

export default function BusinessModelSection() {
  return (
    <DocsSection
      id="business-model"
      number="05"
      type="pitch"
      eyebrow="Business Model"
      title="Four compounding revenue streams"
      subtitle="Marketrix is a marketplace business with platform network effects — more analysts attract better reports, which attract more founders, which attract more analysts."
    >
      <div className="biz-grid">
        {streams.map((s, i) => (
          <div key={i} className="biz-card">
            <div className="biz-card-header">
              <h3 className="biz-card-name">{s.name}</h3>
              <span className={`tag ${tagColors[s.tagColor]}`}>{s.tag}</span>
            </div>
            <p className="biz-card-desc">{s.desc}</p>
            <div className="biz-metrics">
              {s.metrics.map((m, j) => (
                <span key={j} className="biz-metric">{m}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .biz-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        @media (max-width: 640px) { .biz-grid { grid-template-columns: 1fr; } }
        .biz-card {
          padding: 24px;
          border-radius: 14px;
          border: 1px solid var(--line-medium);
          background: var(--bg-surface);
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: border-color 200ms;
        }
        .biz-card:hover { border-color: var(--line-strong); }
        .biz-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 10px;
        }
        .biz-card-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--ink);
          margin: 0;
          font-family: var(--font-dm-sans), system-ui, sans-serif;
          line-height: 1.3;
        }
        .biz-card-desc {
          font-size: 0.85rem;
          color: var(--ink-soft);
          line-height: 1.6;
          margin: 0;
          flex: 1;
        }
        .biz-metrics {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .biz-metric {
          padding: 3px 9px;
          border-radius: 6px;
          border: 1px solid var(--line);
          background: var(--bg-elevated);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.7rem;
          color: var(--ink-muted);
        }
      `}</style>
    </DocsSection>
  );
}
