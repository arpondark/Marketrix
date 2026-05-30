import DocsSection from "../DocsSection";

export default function AiLayerSection() {
  return (
    <DocsSection
      id="ai-layer"
      number="T08"
      type="technical"
      eyebrow="AI Layer"
      title="RAG architecture & AI pipeline"
      subtitle="Marketrix uses a structured RAG (Retrieval-Augmented Generation) architecture with two external AI providers, a custom vector index, and a 4-stage async pipeline."
    >
      {/* Overview table */}
      <div className="ai-overview-grid">
        <div className="ai-overview-card">
          <span className="ai-overview-label">Retrieval Model</span>
          <span className="ai-overview-value">OpenAI text-embedding-3-small</span>
          <span className="ai-overview-sub">1536-dimensional dense vectors</span>
        </div>
        <div className="ai-overview-card">
          <span className="ai-overview-label">Generation Model</span>
          <span className="ai-overview-value">Anthropic Claude Sonnet 4</span>
          <span className="ai-overview-sub">claude-sonnet-4-20250514</span>
        </div>
        <div className="ai-overview-card">
          <span className="ai-overview-label">Vector Store</span>
          <span className="ai-overview-value">PostgreSQL + pgvector</span>
          <span className="ai-overview-sub">vector(1536) native type</span>
        </div>
        <div className="ai-overview-card">
          <span className="ai-overview-label">Index Type</span>
          <span className="ai-overview-value">HNSW</span>
          <span className="ai-overview-sub">Cosine similarity (vector_cosine_ops)</span>
        </div>
      </div>

      {/* Chunking strategy */}
      <div className="ai-block">
        <h3 className="ai-block-heading">Chunking Strategy</h3>
        <div className="ai-content-box">
          <p className="ai-desc">
            Unlike document-based RAG systems, Marketrix does not use sliding-window or recursive character chunking.
            Because the input is always a <strong>structured brief</strong> (not a long document), each brief is treated as
            a <strong>single semantic chunk</strong>.
          </p>
          <p className="ai-desc">
            The <code>buildBriefText()</code> method in <code>AiOrchestratorService</code> compiles all brief fields into
            a structured plaintext block before embedding:
          </p>
          <pre className="ai-code-block">{`Startup: {name}
Industry: {industry}
Stage: {stage}
Geography: {geography}      // optional
Budget: {budget}            // optional
Goals: {goal1}, {goal2}...  // comma-joined list
Problems: {prob1}...        // comma-joined list
Competitors: {comp1}...     // comma-joined list`}
          </pre>
          <p className="ai-desc">
            This structure ensures the embedding captures <strong>startup context holistically</strong> rather than fragmented field-by-field embeddings, producing higher-quality cosine similarity matches.
          </p>
        </div>
      </div>

      {/* Embedding pipeline */}
      <div className="ai-block">
        <h3 className="ai-block-heading">Embedding Pipeline Detail</h3>
        <div className="ai-pipeline-steps">
          {[
            { step: "1", action: "Brief submitted → BriefSubmittedEvent published (Spring ApplicationEventPublisher)" },
            { step: "2", action: "AiOrchestratorService.handleBriefSubmitted() triggered @Async on aiTaskExecutor thread pool" },
            { step: "3", action: "buildBriefText() serializes all structured fields into a single text block" },
            { step: "4", action: "OpenAiEmbeddingClient.generateEmbedding(text) → POST /embeddings → OpenAI API" },
            { step: "5", action: "float[1536] returned → arrayToVectorString() formats as '[x1,x2,...,x1536]'" },
            { step: "6", action: "BriefEmbedding entity saved: cast(:embedding as vector) — pgvector native type" },
            { step: "7", action: "HNSW index (idx_brief_embeddings_vector) updated automatically by PostgreSQL" },
            { step: "8", action: "RecommendationService uses embedding <=> target_vector cosine distance for matching" },
          ].map((s, i) => (
            <div key={i} className="ai-pipeline-step">
              <span className="ai-step-num">{s.step}</span>
              <span className="ai-step-action">{s.action}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Index specification */}
      <div className="ai-block">
        <h3 className="ai-block-heading">Vector Index Specification</h3>
        <div className="ai-index-table">
          {[
            { key: "Extension", val: "pgvector (CREATE EXTENSION IF NOT EXISTS vector)" },
            { key: "Brief index", val: "CREATE INDEX idx_brief_embeddings_vector ON brief_embeddings USING hnsw (embedding vector_cosine_ops)" },
            { key: "Strategist index", val: "CREATE INDEX idx_strategist_embeddings_vector ON strategist_embeddings USING hnsw (embedding vector_cosine_ops)" },
            { key: "Dimension", val: "vector(1536) — matching text-embedding-3-small output size" },
            { key: "Distance metric", val: "Cosine similarity — appropriate for semantic text representations" },
            { key: "Algorithm", val: "HNSW (Hierarchical Navigable Small World) — sub-linear ANN search" },
          ].map((r, i) => (
            <div key={i} className="ai-index-row">
              <span className="ai-index-key">{r.key}</span>
              <code className="ai-index-val">{r.val}</code>
            </div>
          ))}
        </div>
      </div>

      {/* Explainability */}
      <div className="ai-block">
        <h3 className="ai-block-heading">Explainability</h3>
        <div className="ai-content-box">
          <p className="ai-desc">
            Every recommendation includes a human-readable <code>explanation</code> field generated by Claude during segment creation.
            Channel recommendations reference the specific segment name and rationale, making it clear <em>why</em> each channel was recommended.
          </p>
          <p className="ai-desc">
            Example explanation:<br />
            <em>&ldquo;Recommended channel &apos;LinkedIn Ads&apos; for segment: B2B SaaS Decision Makers.
            This segment shows strong LinkedIn engagement patterns based on the startup&apos;s enterprise SaaS targeting.&rdquo;</em>
          </p>
        </div>
      </div>

      <style>{`
        .ai-overview-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 32px;
        }
        @media (max-width: 768px) { .ai-overview-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 420px) { .ai-overview-grid { grid-template-columns: 1fr; } }
        .ai-overview-card {
          padding: 18px;
          border-radius: 12px;
          border: 1px solid var(--emerald-border);
          background: var(--emerald-surface);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .ai-overview-label {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--emerald);
          opacity: 0.8;
        }
        .ai-overview-value {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--ink);
          line-height: 1.3;
        }
        .ai-overview-sub {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.68rem;
          color: var(--ink-muted);
        }
        .ai-block { margin-bottom: 28px; }
        .ai-block-heading {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--ink-muted);
          margin: 0 0 12px;
        }
        .ai-content-box {
          border: 1px solid var(--line-medium);
          border-radius: 12px;
          background: var(--bg-surface);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .ai-desc {
          font-size: 0.88rem;
          color: var(--ink-soft);
          line-height: 1.7;
          margin: 0;
        }
        .ai-desc code {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.78rem;
          color: var(--emerald);
          background: var(--emerald-surface);
          border: 1px solid var(--emerald-border);
          padding: 1px 5px;
          border-radius: 3px;
        }
        .ai-desc strong { color: var(--ink); font-weight: 700; }
        .ai-desc em { font-style: italic; color: var(--ink-soft); }
        .ai-code-block {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.78rem;
          color: var(--emerald);
          background: var(--bg-raised);
          border: 1px solid var(--emerald-border);
          border-radius: 8px;
          padding: 16px;
          line-height: 1.7;
          overflow-x: auto;
          white-space: pre;
          margin: 0;
        }
        .ai-pipeline-steps { display: flex; flex-direction: column; gap: 0; }
        .ai-pipeline-step {
          display: grid;
          grid-template-columns: 28px 1fr;
          gap: 14px;
          padding: 10px 0;
          border-bottom: 1px solid var(--line-soft);
          align-items: flex-start;
        }
        .ai-pipeline-step:last-child { border-bottom: none; }
        .ai-step-num {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--emerald);
          text-align: right;
          padding-top: 2px;
        }
        .ai-step-action {
          font-size: 0.85rem;
          color: var(--ink-soft);
          line-height: 1.55;
        }
        .ai-index-table { display: flex; flex-direction: column; gap: 0; }
        .ai-index-row {
          display: grid;
          grid-template-columns: 150px 1fr;
          gap: 16px;
          padding: 10px 0;
          border-bottom: 1px solid var(--line-soft);
          align-items: start;
        }
        .ai-index-row:last-child { border-bottom: none; }
        @media (max-width: 540px) { .ai-index-row { grid-template-columns: 1fr; gap: 4px; } }
        .ai-index-key {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.7rem;
          color: var(--ink-muted);
          font-weight: 600;
          padding-top: 2px;
        }
        .ai-index-val {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.78rem;
          color: var(--ink-soft);
          word-break: break-word;
          line-height: 1.5;
        }
      `}</style>
    </DocsSection>
  );
}
