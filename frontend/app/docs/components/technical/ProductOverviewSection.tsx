import DocsSection from "../DocsSection";

const useCases = [
  {
    user: "Pre-Seed Founder",
    goal: "Validate market assumptions before product build",
    flow: "Submit brief → Get audience segments → Identify relevant research reports → Book analyst call",
  },
  {
    user: "Seed-Stage Startup",
    goal: "Build investor data room with credible market data",
    flow: "Submit brief → AI-matched reports → Share curated research bundle with investors",
  },
  {
    user: "Series A Growth Team",
    goal: "Identify next geo to expand into",
    flow: "Multi-brief comparison → Geography-specific analyst recommendations → Channel recommendations by region",
  },
  {
    user: "Independent Analyst",
    goal: "Sell specialized research to targeted buyers",
    flow: "List reports → AI surfaces reports to semantically matched founders → Earn on each purchase",
  },
];

const coreFeatures = [
  "Guided multi-field brief submission (startup info, goals, problems, competitors)",
  "AI-powered brief parsing via Anthropic Claude Sonnet 4",
  "Audience segment generation (demographics, psychographics, behavioral signals, preferred channels)",
  "Semantic embedding via OpenAI text-embedding-3-small (1536 dims)",
  "HNSW vector index on PostgreSQL + pgvector for cosine similarity matching",
  "Report marketplace: search, filter by category, rating, price",
  "Analyst directory with verified profiles and expertise tags",
  "Recommendation engine: CHANNEL, STRATEGIST, REPORT types",
  "Stripe-integrated payments (reports + gig proposals)",
  "JWT auth with refresh token rotation",
  "RBAC: FOUNDER, ANALYST, ADMIN, SUPER_ADMIN roles",
  "Real-time messaging via WebSocket-ready conversation model",
  "AWS S3 report file storage with presigned download URLs",
];

export default function ProductOverviewSection() {
  return (
    <DocsSection
      id="product-overview"
      number="T01"
      type="technical"
      eyebrow="Product Overview"
      title="What Marketrix does"
      subtitle="An AI-powered market intelligence marketplace connecting startup founders with curated research reports, verified analysts, and AI-generated audience insights."
    >
      {/* Who it's for */}
      <h3 className="po-subheading">Target Users</h3>
      <div className="po-user-grid">
        {["Pre-Seed Founders", "Seed-Stage Startups", "Series A Teams", "Independent Analysts", "VC Firms", "Accelerators"].map((u) => (
          <div key={u} className="po-user-chip">{u}</div>
        ))}
      </div>

      {/* Use cases */}
      <h3 className="po-subheading" style={{ marginTop: 32 }}>Core Use Cases</h3>
      <div className="po-use-cases">
        {useCases.map((uc, i) => (
          <div key={i} className="po-use-case">
            <div className="po-use-case-header">
              <span className="po-use-case-user">{uc.user}</span>
              <span className="po-use-case-goal">{uc.goal}</span>
            </div>
            <div className="po-use-case-flow">{uc.flow}</div>
          </div>
        ))}
      </div>

      {/* Feature list */}
      <h3 className="po-subheading" style={{ marginTop: 32 }}>Implemented Features</h3>
      <div className="po-features">
        {coreFeatures.map((f, i) => (
          <div key={i} className="po-feature-item">
            <span className="po-feature-check">✓</span>
            <span className="po-feature-text">{f}</span>
          </div>
        ))}
      </div>

      <style>{`
        .po-subheading {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--ink-muted);
          margin: 0 0 12px;
        }
        .po-user-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .po-user-chip {
          padding: 5px 12px;
          border-radius: 999px;
          border: 1px solid var(--line-medium);
          background: var(--bg-surface);
          font-size: 0.82rem;
          color: var(--ink-soft);
          font-weight: 500;
        }
        .po-use-cases { display: flex; flex-direction: column; gap: 10px; }
        .po-use-case {
          padding: 16px 20px;
          border-radius: 12px;
          border: 1px solid var(--line);
          background: var(--bg-surface);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .po-use-case-header {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .po-use-case-user {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--gold);
          background: var(--gold-surface);
          border: 1px solid var(--gold-border);
          padding: 2px 8px;
          border-radius: 4px;
        }
        .po-use-case-goal {
          font-size: 0.87rem;
          font-weight: 600;
          color: var(--ink);
        }
        .po-use-case-flow {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.75rem;
          color: var(--ink-muted);
          line-height: 1.5;
        }
        .po-features { display: flex; flex-direction: column; gap: 6px; }
        .po-feature-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 8px 0;
          border-bottom: 1px solid var(--line);
        }
        .po-feature-item:last-child { border-bottom: none; }
        .po-feature-check {
          color: var(--emerald);
          font-size: 0.8rem;
          font-weight: 700;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .po-feature-text {
          font-size: 0.87rem;
          color: var(--ink-soft);
          line-height: 1.5;
        }
      `}</style>
    </DocsSection>
  );
}
