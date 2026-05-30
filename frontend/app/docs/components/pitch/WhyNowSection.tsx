import DocsSection from "../DocsSection";

const tailwinds = [
  {
    tag: "AI MATURITY",
    title: "Embedding models hit enterprise-grade quality",
    desc: "OpenAI's text-embedding-3 series and Anthropic's Claude 3+ generation have unlocked semantic understanding at startup-accessible cost points — making AI-matching viable at $0.0001/1K tokens.",
  },
  {
    tag: "MARKET SHIFT",
    title: "Remote-first investor due diligence demands",
    desc: "Post-2020 shift to remote fundraising means founders need shareable, asynchronous research artifacts — not just live conversations with analysts.",
  },
  {
    tag: "DATA OVERLOAD",
    title: "The research gap is widening, not closing",
    desc: "While data sources have multiplied 10× in the last 5 years, the tools for distilling that data into actionable startup intelligence have barely evolved.",
  },
  {
    tag: "ECOSYSTEM TIMING",
    title: "Analyst marketplace is fragmented & inefficient",
    desc: "The $200B+ knowledge economy lacks a purpose-built marketplace connecting startup founders with independent market researchers. Now is the moment to build the infrastructure layer.",
  },
];

export default function WhyNowSection() {
  return (
    <DocsSection
      id="why-now"
      number="03"
      type="pitch"
      eyebrow="Why Now"
      title="Four converging forces make this the right moment"
      subtitle="The combination of AI model capabilities, remote work norms, and an exploding creator economy of independent analysts creates a unique founding window."
    >
      <div className="why-now-grid">
        {tailwinds.map((t, i) => (
          <div key={i} className="why-now-card">
            <span className="why-now-tag">{t.tag}</span>
            <h3 className="why-now-title">{t.title}</h3>
            <p className="why-now-desc">{t.desc}</p>
          </div>
        ))}
      </div>

      <style>{`
        .why-now-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        @media (max-width: 640px) { .why-now-grid { grid-template-columns: 1fr; } }
        .why-now-card {
          padding: 28px;
          border-radius: 14px;
          border: 1px solid var(--line-medium);
          background: var(--bg-surface);
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: border-color 200ms, transform 200ms;
        }
        .why-now-card:hover {
          border-color: var(--emerald-border);
          transform: translateY(-2px);
        }
        .why-now-tag {
          display: inline-flex;
          padding: 3px 8px;
          border-radius: 4px;
          border: 1px solid var(--gold-border);
          background: var(--gold-surface);
          color: var(--gold);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          align-self: flex-start;
        }
        .why-now-title {
          font-family: var(--font-dm-sans), system-ui, sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: var(--ink);
          margin: 0;
          line-height: 1.3;
        }
        .why-now-desc {
          font-size: 0.87rem;
          color: var(--ink-soft);
          line-height: 1.65;
          margin: 0;
        }
      `}</style>
    </DocsSection>
  );
}
