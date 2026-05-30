import DocsSection from "../DocsSection";

const stack = [
  {
    layer: "Frontend",
    color: "emerald",
    technologies: [
      { name: "Next.js 16.2", role: "React framework with App Router", version: "16.2.6" },
      { name: "React 19", role: "UI library with concurrent rendering", version: "19.2.4" },
      { name: "Tailwind CSS v4", role: "Utility-first CSS with @theme", version: "4.x" },
      { name: "Framer Motion", role: "Animation library", version: "11.x" },
      { name: "Lucide React", role: "Icon library", version: "1.17.0" },
      { name: "Radix UI", role: "Headless accessible components", version: "latest" },
      { name: "TypeScript 5", role: "Type safety", version: "5.x" },
    ],
  },
  {
    layer: "Backend",
    color: "gold",
    technologies: [
      { name: "Spring Boot 3", role: "Java application framework", version: "3.x" },
      { name: "Java 21", role: "Runtime with virtual threads", version: "21 LTS" },
      { name: "Spring Security", role: "JWT auth + RBAC filter chain", version: "bundled" },
      { name: "Spring Data JPA", role: "ORM + repository layer", version: "bundled" },
      { name: "Flyway", role: "Database schema migrations (V1, V2)", version: "bundled" },
      { name: "Lombok", role: "Boilerplate reduction (@Builder, @Slf4j)", version: "bundled" },
      { name: "Maven", role: "Build tool", version: "3.x" },
    ],
  },
  {
    layer: "Database",
    color: "coral",
    technologies: [
      { name: "PostgreSQL 15+", role: "Primary relational database", version: "15+" },
      { name: "pgvector", role: "Vector similarity extension (1536-dim)", version: "0.7.x" },
      { name: "HNSW index", role: "Approximate nearest neighbor index", version: "pgvector built-in" },
    ],
  },
  {
    layer: "AI / ML",
    color: "emerald",
    technologies: [
      { name: "Anthropic Claude Sonnet 4", role: "LLM for brief parsing + segment generation", version: "claude-sonnet-4-20250514" },
      { name: "OpenAI Embeddings", role: "Semantic embedding model", version: "text-embedding-3-small" },
    ],
  },
  {
    layer: "Infrastructure",
    color: "gold",
    technologies: [
      { name: "AWS S3", role: "Report file storage + presigned URL delivery", version: "—" },
      { name: "Stripe", role: "Payment processing + webhook handling", version: "2024 API" },
      { name: "JWT (JJWT)", role: "Stateless auth tokens (15min access + 7d refresh)", version: "0.12.x" },
    ],
  },
];

const colorBorder: Record<string, string> = {
  emerald: "var(--emerald-border)",
  gold: "var(--gold-border)",
  coral: "var(--coral-border)",
};

export default function TechStackSection() {
  return (
    <DocsSection
      id="tech-stack"
      number="T05"
      type="technical"
      eyebrow="Technology Stack"
      title="Full stack at a glance"
      subtitle="Next.js 16 frontend, Spring Boot 3 backend, PostgreSQL + pgvector storage, Anthropic Claude + OpenAI AI layer, AWS + Stripe infrastructure."
    >
      <div className="ts-layers">
        {stack.map((s, i) => (
          <div key={i} className="ts-layer" style={{ borderLeftColor: colorBorder[s.color] }}>
            <h3 className="ts-layer-name">{s.layer}</h3>
            <div className="ts-tech-rows">
              {s.technologies.map((t, j) => (
                <div key={j} className="ts-tech-row">
                  <div className="ts-tech-info">
                    <span className="ts-tech-name">{t.name}</span>
                    <span className="ts-tech-role">{t.role}</span>
                  </div>
                  <code className="ts-tech-version">{t.version}</code>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .ts-layers { display: flex; flex-direction: column; gap: 20px; }
        .ts-layer {
          border: 1px solid var(--line-medium);
          border-left: 3px solid;
          border-radius: 12px;
          background: var(--bg-surface);
          overflow: hidden;
        }
        .ts-layer-name {
          padding: 10px 16px;
          border-bottom: 1px solid var(--line);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--ink-muted);
          margin: 0;
          background: var(--bg-raised);
        }
        .ts-tech-rows { display: flex; flex-direction: column; }
        .ts-tech-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 10px 16px;
          border-bottom: 1px solid var(--line-soft);
        }
        .ts-tech-row:last-child { border-bottom: none; }
        .ts-tech-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }
        .ts-tech-name {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--ink);
        }
        .ts-tech-role {
          font-size: 0.77rem;
          color: var(--ink-muted);
        }
        .ts-tech-version {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.7rem;
          color: var(--ink-muted);
          background: var(--bg-elevated);
          border: 1px solid var(--line);
          padding: 2px 7px;
          border-radius: 4px;
          flex-shrink: 0;
          white-space: nowrap;
        }
      `}</style>
    </DocsSection>
  );
}
