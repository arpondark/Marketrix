"use client";

import { useEffect, useRef } from "react";
import DocsSection from "../DocsSection";

const MERMAID_DIAGRAM = `
flowchart TD
  subgraph Client["🖥️ Client Layer"]
    Browser["Next.js 16 / React 19<br/>Tailwind CSS + Framer Motion"]
  end

  subgraph API["⚙️ API Layer (Spring Boot 3)"]
    Gateway["HTTP Gateway :8080<br/>JWT Auth Filter → RBAC"]
    AuthAPI["Auth Module<br/>/api/auth/**"]
    IntakeAPI["Intake Module<br/>/api/intake/**"]
    MarketAPI["Marketplace Module<br/>/api/marketplace/**"]
    RecoAPI["Recommendation Module<br/>/api/recommendations/**"]
    AIOrch["AI Orchestrator<br/>@Async aiTaskExecutor"]
  end

  subgraph AI["🤖 AI Services"]
    Claude["Anthropic Claude<br/>claude-sonnet-4-20250514<br/>Brief Parsing + Segment Gen"]
    OAI["OpenAI Embeddings<br/>text-embedding-3-small<br/>1536-dim vectors"]
  end

  subgraph Storage["💾 Storage Layer"]
    PG[("PostgreSQL 15+<br/>+ pgvector extension<br/>HNSW indexes")]
    S3["AWS S3<br/>Report Files<br/>Presigned URLs"]
    Stripe["Stripe<br/>Payments &amp; Webhooks"]
  end

  Browser -->|"HTTPS REST + JWT"| Gateway
  Gateway --> AuthAPI
  Gateway --> IntakeAPI
  Gateway --> MarketAPI
  Gateway --> RecoAPI
  IntakeAPI -->|"BriefSubmittedEvent"| AIOrch
  AIOrch -->|"parseBrief(text)"| Claude
  AIOrch -->|"generateEmbedding(text)"| OAI
  AIOrch -->|"save vector"| PG
  MarketAPI --> PG
  MarketAPI --> S3
  MarketAPI --> Stripe
  RecoAPI --> PG
`;

export default function ArchitectureSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load mermaid from CDN
    if (typeof window === "undefined") return;
    const existing = document.getElementById("mermaid-script");
    if (existing) {
      renderDiagram();
      return;
    }
    const script = document.createElement("script");
    script.id = "mermaid-script";
    script.src = "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js";
    script.onload = () => {
      // @ts-ignore
      window.mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        themeVariables: {
          background: "#0e1410",
          primaryColor: "#131a14",
          primaryBorderColor: "#1aff9c",
          primaryTextColor: "#eef1ec",
          secondaryColor: "#1a2219",
          tertiaryColor: "#1f2b20",
          lineColor: "#2e3c2f",
          textColor: "#a8b5a3",
          nodeBorder: "#2e3c2f",
          clusterBkg: "#0e1410",
          clusterBorder: "#2e3c2f",
          fontFamily: "JetBrains Mono, monospace",
          fontSize: "12px",
        },
      });
      renderDiagram();
    };
    document.head.appendChild(script);
  }, []);

  const renderDiagram = () => {
    if (!containerRef.current) return;
    // @ts-ignore
    if (!window.mermaid) return;
    // @ts-ignore
    window.mermaid.render("arch-diagram", MERMAID_DIAGRAM).then(({ svg }: { svg: string }) => {
      if (containerRef.current) containerRef.current.innerHTML = svg;
    }).catch(() => {
      if (containerRef.current) {
        containerRef.current.innerHTML = `<pre class="arch-fallback">${MERMAID_DIAGRAM.trim()}</pre>`;
      }
    });
  };

  return (
    <DocsSection
      id="architecture"
      number="T03"
      type="technical"
      eyebrow="Architecture"
      title="System architecture"
      subtitle="Four-layer architecture: Next.js client → Spring Boot API → External AI services → PostgreSQL + pgvector storage. Event-driven AI pipeline with async processing."
    >
      {/* Diagram */}
      <div className="arch-diagram-wrap">
        <div ref={containerRef} className="arch-diagram-container">
          <div className="arch-loading">Loading architecture diagram…</div>
        </div>
      </div>

      {/* Layer summary */}
      <div className="arch-layers">
        {[
          { layer: "Client", tech: "Next.js 16 + React 19", notes: "App Router, Server/Client components, Tailwind CSS v4, Framer Motion animations" },
          { layer: "API Gateway", tech: "Spring Boot 3.x (Java 21)", notes: "Stateless JWT auth, RBAC filter chain, request validation, async event publishing" },
          { layer: "AI Services", tech: "Anthropic Claude + OpenAI", notes: "Brief parsing, segment generation, embedding generation — all via HTTP REST clients" },
          { layer: "Storage", tech: "PostgreSQL 15 + pgvector + S3", notes: "Relational data + 1536-dim vector index + S3 object storage + Stripe payments" },
        ].map((l, i) => (
          <div key={i} className="arch-layer-row">
            <span className="arch-layer-name">{l.layer}</span>
            <span className="arch-layer-tech">{l.tech}</span>
            <span className="arch-layer-notes">{l.notes}</span>
          </div>
        ))}
      </div>

      <style>{`
        .arch-diagram-wrap {
          margin-bottom: 32px;
          border: 1px solid var(--line-medium);
          border-radius: 14px;
          overflow: hidden;
          background: var(--bg-raised);
        }
        .arch-diagram-container {
          padding: 20px;
          overflow-x: auto;
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .arch-diagram-container svg {
          max-width: 100%;
          height: auto;
        }
        .arch-loading {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.78rem;
          color: var(--ink-muted);
        }
        .arch-fallback {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.7rem;
          color: var(--ink-soft);
          white-space: pre-wrap;
          word-break: break-word;
          padding: 16px;
          background: var(--bg-raised);
          border-radius: 8px;
          line-height: 1.5;
          margin: 0;
        }
        .arch-layers { display: flex; flex-direction: column; gap: 0; }
        .arch-layer-row {
          display: grid;
          grid-template-columns: 100px 200px 1fr;
          gap: 16px;
          padding: 14px 0;
          border-bottom: 1px solid var(--line);
          align-items: start;
        }
        .arch-layer-row:last-child { border-bottom: none; }
        @media (max-width: 640px) {
          .arch-layer-row { grid-template-columns: 1fr; gap: 4px; }
        }
        .arch-layer-name {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--emerald);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .arch-layer-tech {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--ink);
        }
        .arch-layer-notes {
          font-size: 0.82rem;
          color: var(--ink-muted);
          line-height: 1.5;
        }
      `}</style>
    </DocsSection>
  );
}
