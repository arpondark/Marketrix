import DocsSection from "../DocsSection";

const endpoints = [
  {
    group: "Authentication",
    color: "emerald",
    apis: [
      { method: "POST", path: "/api/auth/register", auth: "None", desc: "Register a new user (FOUNDER or ANALYST role)" },
      { method: "POST", path: "/api/auth/login", auth: "None", desc: "Authenticate and receive access + refresh tokens" },
      { method: "POST", path: "/api/auth/refresh", auth: "Refresh Token", desc: "Obtain a new access token using refresh token" },
      { method: "POST", path: "/api/auth/logout", auth: "JWT", desc: "Invalidate refresh token" },
    ],
  },
  {
    group: "Intake / Briefs",
    color: "gold",
    apis: [
      { method: "POST", path: "/api/intake/requirements", auth: "JWT (FOUNDER)", desc: "Submit a new startup brief — triggers AI pipeline" },
      { method: "GET", path: "/api/intake/requirements", auth: "JWT (FOUNDER)", desc: "List all briefs submitted by the authenticated founder" },
      { method: "GET", path: "/api/intake/requirements/{id}", auth: "JWT", desc: "Get a specific brief with status and metadata" },
    ],
  },
  {
    group: "Recommendations",
    color: "coral",
    apis: [
      { method: "GET", path: "/api/recommendations/{requirementId}", auth: "JWT (FOUNDER)", desc: "Retrieve ranked recommendations (CHANNEL, STRATEGIST, REPORT) for a brief" },
    ],
  },
  {
    group: "Marketplace",
    color: "gold",
    apis: [
      { method: "GET", path: "/api/marketplace/reports", auth: "JWT", desc: "List all active reports with filtering (category, price, tags)" },
      { method: "POST", path: "/api/marketplace/reports", auth: "JWT (ANALYST)", desc: "Create a new report listing" },
      { method: "POST", path: "/api/marketplace/reports/{id}/purchase", auth: "JWT (FOUNDER)", desc: "Initiate Stripe payment for a report" },
      { method: "GET", path: "/api/marketplace/listings", auth: "JWT", desc: "List service listings from analysts" },
      { method: "GET", path: "/api/marketplace/gigs", auth: "JWT", desc: "List open founder gig posts" },
      { method: "POST", path: "/api/marketplace/gigs", auth: "JWT (FOUNDER)", desc: "Create a new gig post" },
      { method: "POST", path: "/api/marketplace/proposals", auth: "JWT (ANALYST)", desc: "Submit a proposal for a gig" },
    ],
  },
  {
    group: "Admin",
    color: "emerald",
    apis: [
      { method: "GET", path: "/api/admin/users", auth: "JWT (ADMIN)", desc: "List all platform users" },
      { method: "PATCH", path: "/api/admin/reports/{id}/approve", auth: "JWT (ADMIN)", desc: "Approve a pending report listing" },
    ],
  },
];

const methodColor: Record<string, string> = {
  GET: "var(--emerald)",
  POST: "var(--gold)",
  PATCH: "var(--coral)",
  DELETE: "#f87171",
  PUT: "#a78bfa",
};

const methodBg: Record<string, string> = {
  GET: "var(--emerald-surface)",
  POST: "var(--gold-surface)",
  PATCH: "var(--coral-surface)",
  DELETE: "rgba(248,113,113,0.1)",
  PUT: "rgba(167,139,250,0.1)",
};

export default function ApiDocsSection() {
  return (
    <DocsSection
      id="api-docs"
      number="T06"
      type="technical"
      eyebrow="API Documentation"
      title="REST API reference"
      subtitle="Spring Boot REST API running on port 8080. All authenticated endpoints require a Bearer JWT in the Authorization header. Base URL: http://localhost:8080 (dev) / https://api.marketrix.io (prod)."
    >
      {/* Auth model */}
      <div className="api-auth-model">
        <h3 className="api-section-label">Authentication Model</h3>
        <div className="api-auth-detail">
          <div className="api-auth-item">
            <span className="api-auth-key">Type</span>
            <code className="api-auth-val">Bearer JWT (Authorization: Bearer &lt;access_token&gt;)</code>
          </div>
          <div className="api-auth-item">
            <span className="api-auth-key">Access Token TTL</span>
            <code className="api-auth-val">15 minutes (900,000ms)</code>
          </div>
          <div className="api-auth-item">
            <span className="api-auth-key">Refresh Token TTL</span>
            <code className="api-auth-val">7 days (604,800,000ms)</code>
          </div>
          <div className="api-auth-item">
            <span className="api-auth-key">Algorithm</span>
            <code className="api-auth-val">HMAC-SHA256 (configurable secret)</code>
          </div>
        </div>
      </div>

      {/* Endpoint groups */}
      {endpoints.map((g, i) => (
        <div key={i} className="api-group">
          <h3 className="api-group-name">{g.group}</h3>
          <div className="api-endpoints">
            {g.apis.map((a, j) => (
              <div key={j} className="api-endpoint">
                <div className="api-endpoint-line">
                  <span
                    className="api-method"
                    style={{ color: methodColor[a.method], background: methodBg[a.method] }}
                  >
                    {a.method}
                  </span>
                  <code className="api-path">{a.path}</code>
                  <span className="api-auth-badge">{a.auth}</span>
                </div>
                <p className="api-desc">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      <style>{`
        .api-auth-model {
          margin-bottom: 32px;
          border: 1px solid var(--line-medium);
          border-radius: 12px;
          overflow: hidden;
          background: var(--bg-surface);
        }
        .api-section-label {
          padding: 10px 16px;
          border-bottom: 1px solid var(--line);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--ink-muted);
          margin: 0;
          background: var(--bg-raised);
        }
        .api-auth-detail {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .api-auth-item {
          display: grid;
          grid-template-columns: 140px 1fr;
          gap: 12px;
          padding: 10px 16px;
          border-bottom: 1px solid var(--line-soft);
          align-items: center;
        }
        .api-auth-item:last-child { border-bottom: none; }
        .api-auth-key {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.7rem;
          color: var(--ink-muted);
        }
        .api-auth-val {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.78rem;
          color: var(--emerald);
        }
        .api-group { margin-bottom: 24px; }
        .api-group-name {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--ink-muted);
          margin: 0 0 10px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--line);
        }
        .api-endpoints { display: flex; flex-direction: column; gap: 2px; }
        .api-endpoint {
          border: 1px solid var(--line);
          border-radius: 8px;
          overflow: hidden;
          background: var(--bg-surface);
        }
        .api-endpoint-line {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-bottom: 1px solid var(--line-soft);
          flex-wrap: wrap;
        }
        .api-method {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.68rem;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 4px;
          flex-shrink: 0;
          min-width: 48px;
          text-align: center;
        }
        .api-path {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.82rem;
          color: var(--ink);
          flex: 1;
        }
        .api-auth-badge {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.65rem;
          color: var(--ink-muted);
          background: var(--bg-elevated);
          border: 1px solid var(--line);
          padding: 2px 7px;
          border-radius: 4px;
          flex-shrink: 0;
          white-space: nowrap;
        }
        .api-desc {
          padding: 8px 14px;
          font-size: 0.82rem;
          color: var(--ink-muted);
          margin: 0;
          line-height: 1.5;
        }
      `}</style>
    </DocsSection>
  );
}
