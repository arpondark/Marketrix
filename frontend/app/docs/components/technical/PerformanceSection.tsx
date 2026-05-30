import DocsSection from "../DocsSection";

export default function PerformanceSection() {
  return (
    <DocsSection
      id="performance"
      number="T10"
      type="technical"
      eyebrow="Performance & Scalability"
      title="Built for growth from day one"
    >
      <div className="perf-grid">
        {[
          { metric: "AI Pipeline Latency", value: "~8–12s", desc: "Async — brief pipeline runs in background. Founders are notified on completion, not blocked.", color: "emerald" },
          { metric: "API Response Time", value: "<200ms", desc: "Standard REST endpoints; connection pooling via Spring JPA + HikariCP.", color: "emerald" },
          { metric: "Vector Search Latency", value: "<50ms", desc: "HNSW approximate nearest neighbor search on pgvector — sub-linear with index size.", color: "gold" },
          { metric: "Concurrent Brief Processing", value: "10 threads", desc: "aiTaskExecutor pool — configurable for horizontal scaling.", color: "gold" },
          { metric: "S3 File Delivery", value: "CDN-speed", desc: "Presigned URL delivery — files served directly from S3, no backend bottleneck.", color: "emerald" },
          { metric: "Database Scalability", value: "Read replicas", desc: "PostgreSQL read replica strategy for recommendation and report listing queries.", color: "coral" },
        ].map((p, i) => (
          <div key={i} className="perf-card">
            <div className="perf-card-top">
              <span className="perf-metric">{p.metric}</span>
              <span className="perf-value" style={{ color: p.color === "emerald" ? "var(--emerald)" : p.color === "gold" ? "var(--gold)" : "var(--coral)" }}>
                {p.value}
              </span>
            </div>
            <p className="perf-desc">{p.desc}</p>
          </div>
        ))}
      </div>

      <div className="perf-strategies">
        <h3 className="perf-strategies-heading">Optimization Strategies</h3>
        {[
          "Async AI pipeline — brief processing never blocks the HTTP request thread",
          "HNSW index pre-built at insert time — queries are always fast regardless of index size",
          "Hibernate 2nd-level cache (optional) for frequently accessed report metadata",
          "Next.js server components reduce client JS bundle size for fast initial page load",
          "S3 presigned URLs offload file transfer entirely — zero backend bandwidth cost",
          "Spring Boot virtual threads (Java 21) for efficient I/O-bound concurrent request handling",
          "Database connection pooling via HikariCP with tuned min/max pool sizes",
        ].map((s, i) => (
          <div key={i} className="perf-strategy-row">
            <span className="perf-strategy-bullet">→</span>
            <span className="perf-strategy-text">{s}</span>
          </div>
        ))}
      </div>

      <style>{`
        .perf-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-bottom: 32px;
        }
        @media (max-width: 768px) { .perf-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .perf-grid { grid-template-columns: 1fr; } }
        .perf-card {
          padding: 20px;
          border-radius: 12px;
          border: 1px solid var(--line-medium);
          background: var(--bg-surface);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .perf-card-top {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .perf-metric {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--ink-muted);
        }
        .perf-value {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: 1.6rem;
          font-weight: 700;
          line-height: 1;
        }
        .perf-desc {
          font-size: 0.8rem;
          color: var(--ink-muted);
          line-height: 1.55;
          margin: 0;
        }
        .perf-strategies-heading {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--ink-muted);
          margin: 0 0 12px;
        }
        .perf-strategies { display: flex; flex-direction: column; gap: 0; }
        .perf-strategy-row {
          display: flex;
          gap: 10px;
          padding: 9px 0;
          border-bottom: 1px solid var(--line-soft);
          align-items: flex-start;
        }
        .perf-strategy-row:last-child { border-bottom: none; }
        .perf-strategy-bullet {
          font-family: var(--font-jetbrains), monospace;
          color: var(--emerald);
          font-size: 0.8rem;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .perf-strategy-text {
          font-size: 0.87rem;
          color: var(--ink-soft);
          line-height: 1.5;
        }
      `}</style>
    </DocsSection>
  );
}
