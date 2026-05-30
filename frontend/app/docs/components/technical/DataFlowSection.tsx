"use client";

import { useEffect, useRef } from "react";
import DocsSection from "../DocsSection";

const FLOW_DIAGRAM = `
flowchart LR
  subgraph Input["📥 Input"]
    Brief["Startup Brief\nName · Industry · Stage\nGoals · Problems · Competitors"]
  end

  subgraph Parse["🔍 Stage 1: Parse"]
    BP["BriefParserService\nClaude Sonnet 4\nbrief-extraction.txt prompt"]
    Meta["Extracted Metadata\nJSON: industry tags,\ntarget audience,\nkey themes"]
  end

  subgraph Segment["👥 Stage 2: Segment"]
    SG["SegmentGeneratorService\nClaude Sonnet 4\nsegment-generation.txt prompt"]
    Segs["AudienceSegments\nName · Tagline · Demographics\nPsychographics · Channels\nViability Score · Rationale"]
  end

  subgraph Embed["🔢 Stage 3: Embed"]
    EC["OpenAiEmbeddingClient\ntext-embedding-3-small\n1536-dim float[]"]
    Vec["BriefEmbedding\nvector(1536) stored\nin PostgreSQL+pgvector"]
  end

  subgraph Retrieve["🎯 Stage 4: Match & Recommend"]
    HNSW["HNSW Index\nCosine Similarity Search\nvector_cosine_ops"]
    Recs["Recommendations\nCHANNEL · STRATEGIST\nSorted by score DESC"]
  end

  subgraph Output["📤 Output"]
    API["REST API Response\n/api/recommendations/{id}"]
    UI["Founder Dashboard\nRanked recommendations\n+ explanations"]
  end

  Brief --> BP
  BP --> Meta
  Meta --> SG
  SG --> Segs
  Brief --> EC
  EC --> Vec
  Vec --> HNSW
  Segs --> Recs
  HNSW --> Recs
  Recs --> API
  API --> UI
`;

const stages = [
  {
    stage: "Stage 1",
    name: "Brief Parsing",
    service: "BriefParserService",
    model: "Claude Sonnet 4",
    input: "Raw brief text (name, industry, stage, goals, problems, competitors)",
    output: "Structured JSON with extracted features (industry tags, audience type, themes)",
    prompt: "classpath:prompts/brief-extraction.txt",
  },
  {
    stage: "Stage 2",
    name: "Segment Generation",
    service: "SegmentGeneratorService",
    model: "Claude Sonnet 4",
    input: "Extracted features JSON from Stage 1",
    output: "3–5 AudienceSegment objects with demographics, psychographics, behavioral signals, channels, viability score",
    prompt: "classpath:prompts/segment-generation.txt",
  },
  {
    stage: "Stage 3",
    name: "Embedding Generation",
    service: "OpenAiEmbeddingClient",
    model: "text-embedding-3-small (1536 dims)",
    input: "Structured brief text (buildBriefText method — single chunk)",
    output: "float[1536] converted to PostgreSQL vector string '[x1,x2,...,x1536]'",
    prompt: "POST /embeddings — OpenAI API",
  },
  {
    stage: "Stage 4",
    name: "Matching & Recommendation",
    service: "RecommendationService",
    model: "pgvector HNSW (cosine)",
    input: "Stored brief embedding + audience segments",
    output: "Recommendations: CHANNEL (from segments), STRATEGIST (from vector match)",
    prompt: "SQL: embedding <=> target_vector ORDER BY cosine distance ASC",
  },
];

export default function DataFlowSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const tryRender = () => {
      // @ts-ignore
      if (!window.mermaid) return;
      // @ts-ignore
      window.mermaid.render("flow-diagram", FLOW_DIAGRAM).then(({ svg }: { svg: string }) => {
        if (containerRef.current) containerRef.current.innerHTML = svg;
      }).catch(() => {
        if (containerRef.current) containerRef.current.innerHTML = `<pre class="flow-fallback">${FLOW_DIAGRAM.trim()}</pre>`;
      });
    };
    // @ts-ignore
    if (window.mermaid) { tryRender(); } else {
      const interval = setInterval(() => {
        // @ts-ignore
        if (window.mermaid) { clearInterval(interval); tryRender(); }
      }, 200);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <DocsSection
      id="data-flow"
      number="T04"
      type="technical"
      eyebrow="Data Flow"
      title="AI pipeline end-to-end"
      subtitle="Every submitted brief triggers a 4-stage async pipeline: parse → segment → embed → match. All stages run on a dedicated aiTaskExecutor thread pool."
    >
      <div className="flow-diagram-wrap">
        <div ref={containerRef} className="flow-diagram-container">
          <div className="flow-loading">Loading data flow diagram…</div>
        </div>
      </div>

      <div className="flow-stages">
        {stages.map((s, i) => (
          <div key={i} className="flow-stage">
            <div className="flow-stage-header">
              <span className="flow-stage-num">{s.stage}</span>
              <span className="flow-stage-name">{s.name}</span>
              <span className="flow-stage-service">{s.service}</span>
            </div>
            <div className="flow-stage-detail">
              <div className="flow-detail-row">
                <span className="flow-detail-key">Model</span>
                <code className="flow-detail-val">{s.model}</code>
              </div>
              <div className="flow-detail-row">
                <span className="flow-detail-key">Input</span>
                <span className="flow-detail-text">{s.input}</span>
              </div>
              <div className="flow-detail-row">
                <span className="flow-detail-key">Output</span>
                <span className="flow-detail-text">{s.output}</span>
              </div>
              <div className="flow-detail-row">
                <span className="flow-detail-key">Prompt/API</span>
                <code className="flow-detail-val">{s.prompt}</code>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .flow-diagram-wrap {
          border: 1px solid var(--line-medium);
          border-radius: 14px;
          background: var(--bg-raised);
          overflow: hidden;
          margin-bottom: 32px;
        }
        .flow-diagram-container {
          padding: 20px;
          overflow-x: auto;
          min-height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .flow-diagram-container svg { max-width: 100%; height: auto; }
        .flow-loading {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.78rem;
          color: var(--ink-muted);
        }
        .flow-fallback {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.7rem;
          color: var(--ink-soft);
          white-space: pre-wrap;
          word-break: break-word;
          padding: 16px;
          margin: 0;
          line-height: 1.5;
        }
        .flow-stages { display: flex; flex-direction: column; gap: 12px; }
        .flow-stage {
          border: 1px solid var(--line-medium);
          border-radius: 12px;
          overflow: hidden;
          background: var(--bg-surface);
        }
        .flow-stage-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: var(--bg-raised);
          border-bottom: 1px solid var(--line);
          flex-wrap: wrap;
        }
        .flow-stage-num {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.65rem;
          color: var(--gold);
          background: var(--gold-surface);
          border: 1px solid var(--gold-border);
          padding: 2px 7px;
          border-radius: 4px;
          font-weight: 700;
        }
        .flow-stage-name {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--ink);
          flex: 1;
        }
        .flow-stage-service {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.72rem;
          color: var(--ink-muted);
        }
        .flow-stage-detail {
          padding: 12px 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .flow-detail-row {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 12px;
          align-items: start;
        }
        .flow-detail-key {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--ink-muted);
          padding-top: 1px;
        }
        .flow-detail-val {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.78rem;
          color: var(--emerald);
          background: var(--emerald-surface);
          border: 1px solid var(--emerald-border);
          padding: 2px 7px;
          border-radius: 4px;
          align-self: flex-start;
        }
        .flow-detail-text {
          font-size: 0.82rem;
          color: var(--ink-soft);
          line-height: 1.5;
        }
      `}</style>
    </DocsSection>
  );
}
