import DocsSection from "../DocsSection";

const versions = [
  {
    version: "v0.5.0",
    date: "May 2026",
    status: "current",
    changes: [
      "Audience segment generation engine v2 with improved viability scoring",
      "Recommendation explainability — rationale field added to all recommendations",
      "Bug fix: Embedding pipeline race condition on concurrent brief submissions resolved",
      "Performance: HNSW index tuned (m=16, ef_construction=64) for better recall/latency tradeoff",
      "Admin user management endpoints added",
    ],
  },
  {
    version: "v0.4.0",
    date: "Apr 2026",
    status: "stable",
    changes: [
      "Stripe payment integration for report purchases and gig proposals",
      "AWS S3 integration for report file storage with presigned URL delivery",
      "Report purchase history and transaction tracking",
      "Stripe webhook handling for payment confirmation events",
    ],
  },
  {
    version: "v0.3.0",
    date: "Mar 2026",
    status: "stable",
    changes: [
      "pgvector extension added via V2 Flyway migration",
      "OpenAI embedding client (text-embedding-3-small, 1536 dims)",
      "BriefEmbedding entity and HNSW index for cosine similarity search",
      "StrategistEmbedding table and index for expert matching (pipeline TBD)",
      "RecommendationService v1 — CHANNEL type from audience segments",
    ],
  },
  {
    version: "v0.2.0",
    date: "Feb 2026",
    status: "stable",
    changes: [
      "Marketplace module: reports, listings, gigs, proposals",
      "Analyst directory with verified profiles and expertise tags",
      "Report browse with category/price/tag filtering",
      "Gig board for founder job posts and analyst proposals",
      "Direct messaging system (conversation + participants model)",
    ],
  },
  {
    version: "v0.1.0",
    date: "Jan 2026",
    status: "stable",
    changes: [
      "Initial project setup: Spring Boot 3, PostgreSQL, Flyway V1 schema",
      "JWT authentication with refresh token rotation",
      "4-tier RBAC: FOUNDER, ANALYST, ADMIN, SUPER_ADMIN",
      "Startup brief intake with multi-field submission form",
      "AI Orchestrator v1: BriefParserService (Claude) + SegmentGeneratorService",
      "Async aiTaskExecutor thread pool for AI pipeline",
      "Next.js 16 frontend with Tailwind CSS v4 design system",
    ],
  },
];

export default function ChangelogSection() {
  return (
    <DocsSection
      id="changelog"
      number="T13"
      type="technical"
      eyebrow="Changelog"
      title="Version history"
      subtitle="All notable changes to the Marketrix platform, ordered newest-first."
    >
      <div className="cl-versions">
        {versions.map((v, i) => (
          <div key={i} className="cl-version">
            <div className="cl-version-header">
              <code className="cl-version-num">{v.version}</code>
              <span className="cl-version-date">{v.date}</span>
              {v.status === "current" && <span className="tag tag-emerald">CURRENT</span>}
              {v.status === "stable" && <span className="tag">STABLE</span>}
            </div>
            <div className="cl-changes">
              {v.changes.map((c, j) => (
                <div key={j} className="cl-change">
                  <span className="cl-change-bullet">·</span>
                  <span className="cl-change-text">{c}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .cl-versions { display: flex; flex-direction: column; gap: 0; }
        .cl-version {
          border-bottom: 1px solid var(--line);
          padding: 24px 0;
        }
        .cl-version:last-child { border-bottom: none; }
        .cl-version-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
          flex-wrap: wrap;
        }
        .cl-version-num {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--ink);
          background: var(--bg-surface);
          border: 1px solid var(--line-medium);
          padding: 4px 10px;
          border-radius: 6px;
        }
        .cl-version-date {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.75rem;
          color: var(--ink-muted);
        }
        .cl-changes { display: flex; flex-direction: column; gap: 6px; }
        .cl-change {
          display: flex;
          gap: 10px;
          align-items: flex-start;
        }
        .cl-change-bullet {
          color: var(--emerald);
          font-size: 1rem;
          line-height: 1.5;
          flex-shrink: 0;
        }
        .cl-change-text {
          font-size: 0.87rem;
          color: var(--ink-soft);
          line-height: 1.55;
        }
      `}</style>
    </DocsSection>
  );
}
