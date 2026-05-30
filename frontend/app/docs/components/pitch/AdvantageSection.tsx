import DocsSection from "../DocsSection";

const advantages = [
  {
    title: "Purpose-built RAG pipeline",
    desc: "Our AI pipeline (Claude for parsing + OpenAI embeddings + pgvector HNSW) is tuned specifically for market intelligence briefs — not a generic LLM wrapper. The briefing-to-embedding flow produces contextually accurate vectors that improve match quality with every submission.",
    mono: "text-embedding-3-small → 1536-dim → HNSW cosine",
  },
  {
    title: "Network flywheel",
    desc: "More analysts produce better reports → better reports attract more founders → more founders create richer briefs → richer briefs improve AI training signal. Unlike SaaS tools, this effect compounds with every transaction.",
    mono: "Analysts × Reports × Briefs → better matching",
  },
  {
    title: "Explainable matching",
    desc: "Every analyst or report recommendation comes with a generated explanation tied to specific brief fields. Founders understand why they're seeing each result — building trust and increasing conversion.",
    mono: "Rationale: audience segment + channel alignment",
  },
  {
    title: "Multi-modal outputs",
    desc: "A single brief generates: audience segments with psychographics & demographics, channel recommendations, analyst matches, and report suggestions — all from one submission. No parallel workflows needed.",
    mono: "Brief → 4 output types in parallel",
  },
];

export default function AdvantageSection() {
  return (
    <DocsSection
      id="advantage"
      number="08"
      type="pitch"
      eyebrow="Unique Advantage"
      title="Our unfair edge is in the architecture"
      subtitle="Marketrix's moat isn't a feature — it's the combination of a purpose-built AI pipeline, a compounding data flywheel, and a marketplace that gets smarter with every transaction."
    >
      <div className="advantage-list">
        {advantages.map((a, i) => (
          <div key={i} className="advantage-item">
            <div className="advantage-num">{String(i + 1).padStart(2, "0")}</div>
            <div className="advantage-content">
              <h3 className="advantage-title">{a.title}</h3>
              <p className="advantage-desc">{a.desc}</p>
              <code className="advantage-mono">{a.mono}</code>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .advantage-list { display: flex; flex-direction: column; gap: 0; }
        .advantage-item {
          display: grid;
          grid-template-columns: 48px 1fr;
          gap: 20px;
          padding: 28px 0;
          border-bottom: 1px solid var(--line);
        }
        .advantage-item:last-child { border-bottom: none; }
        .advantage-num {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--emerald);
          padding-top: 4px;
          text-align: right;
        }
        .advantage-content { display: flex; flex-direction: column; gap: 10px; }
        .advantage-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--ink);
          margin: 0;
          font-family: var(--font-dm-sans), system-ui, sans-serif;
        }
        .advantage-desc {
          font-size: 0.9rem;
          color: var(--ink-soft);
          line-height: 1.65;
          margin: 0;
          max-width: 620px;
        }
        .advantage-mono {
          display: inline-flex;
          padding: 5px 10px;
          border-radius: 6px;
          border: 1px solid var(--emerald-border);
          background: var(--emerald-surface);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.72rem;
          color: var(--emerald);
          align-self: flex-start;
        }
      `}</style>
    </DocsSection>
  );
}
