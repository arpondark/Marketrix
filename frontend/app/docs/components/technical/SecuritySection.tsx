import DocsSection from "../DocsSection";

export default function SecuritySection() {
  return (
    <DocsSection
      id="security"
      number="T11"
      type="technical"
      eyebrow="Security"
      title="Defense-in-depth security model"
    >
      <div className="sec-categories">
        {[
          {
            category: "Authentication",
            icon: "🔐",
            items: [
              { title: "JWT (HMAC-SHA256)", desc: "Stateless access tokens (15-min TTL) issued on login — no session state stored server-side" },
              { title: "Refresh token rotation", desc: "7-day refresh tokens stored in DB; rotated on each use; immediately invalidated on logout" },
              { title: "bcrypt password hashing", desc: "All passwords stored as bcrypt hash with adaptive cost factor — no plaintext ever stored" },
            ],
          },
          {
            category: "Authorization (RBAC)",
            icon: "🛡️",
            items: [
              { title: "4-tier role system", desc: "FOUNDER, ANALYST, ADMIN, SUPER_ADMIN — enforced at Spring Security filter chain level" },
              { title: "Method-level security", desc: "Role checks at controller layer — ANALYST cannot access FOUNDER-only endpoints and vice versa" },
              { title: "Resource ownership", desc: "Founders can only access their own briefs; analysts can only edit their own reports" },
            ],
          },
          {
            category: "Data Protection",
            icon: "🔒",
            items: [
              { title: "S3 presigned URLs", desc: "Report files never served through backend — time-limited presigned URLs prevent unauthorized access" },
              { title: "Stripe PCI compliance", desc: "Zero card data touches Marketrix servers — all payment card handling via Stripe's PCI-DSS certified infrastructure" },
              { title: "AI data minimization", desc: "Only the structured brief text is sent to AI providers — raw PII (email, password) never leaves the backend" },
            ],
          },
          {
            category: "Transport & Input",
            icon: "🌐",
            items: [
              { title: "HTTPS enforcement", desc: "All API communication over TLS — HTTP connections should be redirected to HTTPS in production" },
              { title: "Request validation", desc: "Spring Validation annotations on all DTOs — malformed requests rejected before reaching service layer" },
              { title: "CORS configuration", desc: "Strict CORS policy — only configured frontend origin allowed in production" },
            ],
          },
        ].map((cat, i) => (
          <div key={i} className="sec-category">
            <h3 className="sec-cat-header">
              <span>{cat.icon}</span> {cat.category}
            </h3>
            <div className="sec-items">
              {cat.items.map((item, j) => (
                <div key={j} className="sec-item">
                  <span className="sec-item-title">{item.title}</span>
                  <span className="sec-item-desc">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .sec-categories { display: flex; flex-direction: column; gap: 20px; }
        .sec-category {
          border: 1px solid var(--line-medium);
          border-radius: 12px;
          overflow: hidden;
          background: var(--bg-surface);
        }
        .sec-cat-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          border-bottom: 1px solid var(--line);
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--ink);
          margin: 0;
          background: var(--bg-raised);
          font-family: var(--font-dm-sans), system-ui, sans-serif;
        }
        .sec-items { display: flex; flex-direction: column; }
        .sec-item {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 16px;
          padding: 12px 16px;
          border-bottom: 1px solid var(--line-soft);
          align-items: start;
        }
        .sec-item:last-child { border-bottom: none; }
        @media (max-width: 540px) { .sec-item { grid-template-columns: 1fr; gap: 4px; } }
        .sec-item-title {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--ink);
        }
        .sec-item-desc {
          font-size: 0.82rem;
          color: var(--ink-muted);
          line-height: 1.55;
        }
      `}</style>
    </DocsSection>
  );
}
