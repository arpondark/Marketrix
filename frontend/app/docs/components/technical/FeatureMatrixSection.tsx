import DocsSection from "../DocsSection";

type FeatureStatus = "live" | "beta" | "upcoming" | "planned";

interface Feature {
  name: string;
  status: FeatureStatus;
  category: string;
  description: string;
}

const features: Feature[] = [
  // LIVE
  { name: "Brief submission (multi-field)", status: "live", category: "Core", description: "Guided intake form capturing startup context" },
  { name: "AI brief parsing (Claude Sonnet 4)", status: "live", category: "AI", description: "Structured feature extraction from brief text" },
  { name: "Audience segment generation", status: "live", category: "AI", description: "3–5 segments with demographics, psychographics, channels" },
  { name: "Semantic embedding (OpenAI)", status: "live", category: "AI", description: "1536-dim vectors via text-embedding-3-small" },
  { name: "Vector similarity search (pgvector HNSW)", status: "live", category: "AI", description: "Cosine similarity matching against brief & strategist embeddings" },
  { name: "Report marketplace", status: "live", category: "Marketplace", description: "Browse, filter, and purchase research reports" },
  { name: "Analyst directory", status: "live", category: "Marketplace", description: "Verified analyst profiles with expertise tags" },
  { name: "JWT authentication + refresh tokens", status: "live", category: "Auth", description: "Secure token-based auth with rotation" },
  { name: "Stripe payment processing", status: "live", category: "Payments", description: "Report purchases and gig proposal payments" },
  { name: "AWS S3 file storage", status: "live", category: "Infra", description: "Report file uploads with presigned URLs" },
  { name: "RBAC (Founder/Analyst/Admin/Super Admin)", status: "live", category: "Auth", description: "4-tier role-based access control" },
  { name: "Recommendation engine (CHANNEL, STRATEGIST)", status: "live", category: "AI", description: "Multi-type recommendations from segment data" },
  { name: "Gig board (founder job posts)", status: "live", category: "Marketplace", description: "Founders post projects; analysts submit proposals" },
  { name: "Direct messaging", status: "live", category: "Core", description: "Conversation-based messaging between users" },
  // UPCOMING
  { name: "Founder subscription (Pro tier)", status: "upcoming", category: "Monetization", description: "Unlimited briefs + priority AI + team seats" },
  { name: "Report preview + watermarked samples", status: "upcoming", category: "Marketplace", description: "Free preview before purchase" },
  { name: "Brief version history", status: "upcoming", category: "Core", description: "Edit and track changes to submitted briefs" },
  { name: "Analyst listing boost (paid)", status: "upcoming", category: "Monetization", description: "Analysts pay to rank higher in recommendations" },
  // PLANNED
  { name: "GraphRAG knowledge graph", status: "planned", category: "AI", description: "Industry/competitor interconnection graph for multi-hop retrieval" },
  { name: "Custom embedding fine-tuning", status: "planned", category: "AI", description: "Domain-specific embedding model trained on platform data" },
  { name: "VC portfolio research bundles", status: "planned", category: "Enterprise", description: "White-glove service for VC firm portfolios" },
  { name: "API access for 3rd-party integrations", status: "planned", category: "Platform", description: "Public API with rate limits and API key management" },
  { name: "Mobile app (React Native)", status: "planned", category: "Platform", description: "Native iOS/Android experience" },
];

const statusConfig: Record<FeatureStatus, { label: string; className: string }> = {
  live: { label: "LIVE", className: "tag-emerald" },
  beta: { label: "BETA", className: "tag-gold" },
  upcoming: { label: "UPCOMING", className: "tag-coral" },
  planned: { label: "PLANNED", className: "tag" },
};

const categories = Array.from(new Set(features.map((f) => f.category)));

export default function FeatureMatrixSection() {
  return (
    <DocsSection
      id="feature-matrix"
      number="T02"
      type="technical"
      eyebrow="Feature Matrix"
      title="Complete feature inventory"
      subtitle="All implemented and planned features, organized by category with current status indicators."
    >
      {categories.map((cat) => {
        const catFeatures = features.filter((f) => f.category === cat);
        return (
          <div key={cat} className="fm-category">
            <h3 className="fm-category-label">{cat}</h3>
            <div className="fm-rows">
              {catFeatures.map((f, i) => {
                const cfg = statusConfig[f.status];
                return (
                  <div key={i} className="fm-row">
                    <span className={`tag ${cfg.className} fm-status`}>{cfg.label}</span>
                    <div className="fm-row-info">
                      <span className="fm-feature-name">{f.name}</span>
                      <span className="fm-feature-desc">{f.description}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <style>{`
        .fm-category { margin-bottom: 28px; }
        .fm-category-label {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--ink-muted);
          margin: 0 0 10px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--line);
        }
        .fm-rows { display: flex; flex-direction: column; gap: 0; }
        .fm-row {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 10px 0;
          border-bottom: 1px solid var(--line-soft);
        }
        .fm-row:last-child { border-bottom: none; }
        .fm-status { flex-shrink: 0; margin-top: 1px; }
        .fm-row-info {
          display: flex;
          flex-direction: column;
          gap: 3px;
          min-width: 0;
        }
        .fm-feature-name {
          font-size: 0.87rem;
          font-weight: 600;
          color: var(--ink);
        }
        .fm-feature-desc {
          font-size: 0.78rem;
          color: var(--ink-muted);
        }
      `}</style>
    </DocsSection>
  );
}
