import DocsSection from "../DocsSection";
import { Zap, Brain, Users, BarChart3, ArrowRight } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: <Brain size={18} />,
    title: "Submit a structured brief",
    desc: "Founders fill a guided brief: startup stage, industry, geography, goals, key problems, competitors.",
  },
  {
    num: "02",
    icon: <Zap size={18} />,
    title: "AI parses & segments",
    desc: "Claude Sonnet extracts structured features and generates 3–5 weighted audience segments with viability scores.",
  },
  {
    num: "03",
    icon: <BarChart3 size={18} />,
    title: "Semantic matching",
    desc: "Brief is embedded via OpenAI (text-embedding-3-small) and matched against the report & analyst index using HNSW cosine similarity.",
  },
  {
    num: "04",
    icon: <Users size={18} />,
    title: "Ranked results",
    desc: "Founders receive ranked expert analyst matches, relevant research reports, and channel recommendations — all explainable.",
  },
];

export default function SolutionSection() {
  return (
    <DocsSection
      id="solution"
      number="02"
      type="pitch"
      eyebrow="The Solution"
      title="Market intelligence matched to your exact context"
      subtitle="Marketrix turns a 10-minute brief into ranked expert matches, curated reports, and audience insights — powered by a purpose-built AI pipeline."
    >
      {/* Steps */}
      <div className="solution-steps">
        {steps.map((s, i) => (
          <div key={i} className="solution-step">
            <div className="solution-step-num">{s.num}</div>
            <div className="solution-step-connector">
              {i < steps.length - 1 && <span className="solution-step-line" />}
            </div>
            <div className="solution-step-content">
              <div className="solution-step-icon">{s.icon}</div>
              <div>
                <h3 className="solution-step-title">{s.title}</h3>
                <p className="solution-step-desc">{s.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Value props */}
      <div className="solution-value-row">
        <div className="solution-value-card">
          <span className="solution-value-num">10 min</span>
          <span className="solution-value-desc">From brief submission to AI-ranked results</span>
        </div>
        <div className="solution-value-card">
          <span className="solution-value-num">95%+</span>
          <span className="solution-value-desc">Founder-reported relevance of top analyst match</span>
        </div>
        <div className="solution-value-card">
          <span className="solution-value-num">90%</span>
          <span className="solution-value-desc">Cost reduction vs. traditional research firms</span>
        </div>
      </div>

      <style>{`
        .solution-steps {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-bottom: 40px;
        }
        .solution-step {
          display: grid;
          grid-template-columns: 40px 24px 1fr;
          gap: 0 12px;
          align-items: stretch;
        }
        .solution-step-num {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.65rem;
          color: var(--emerald);
          font-weight: 700;
          padding-top: 20px;
          text-align: right;
        }
        .solution-step-connector {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }
        .solution-step-connector::before {
          content: '';
          width: 10px;
          height: 10px;
          border-radius: 999px;
          border: 2px solid var(--emerald);
          background: var(--bg-base);
          margin-top: 20px;
          flex-shrink: 0;
          z-index: 1;
        }
        .solution-step-line {
          position: absolute;
          top: 30px;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 1px;
          background: linear-gradient(to bottom, var(--emerald-border), var(--line));
        }
        .solution-step-content {
          display: flex;
          gap: 14px;
          padding: 16px 16px 24px;
          align-items: flex-start;
        }
        .solution-step-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 10px;
          border: 1px solid var(--emerald-border);
          background: var(--emerald-surface);
          color: var(--emerald);
          flex-shrink: 0;
        }
        .solution-step-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--ink);
          margin: 0 0 4px;
          font-family: var(--font-dm-sans), system-ui, sans-serif;
        }
        .solution-step-desc {
          font-size: 0.87rem;
          color: var(--ink-soft);
          line-height: 1.6;
          margin: 0;
        }

        .solution-value-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (max-width: 640px) {
          .solution-value-row { grid-template-columns: 1fr; }
        }
        .solution-value-card {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 24px;
          border-radius: 14px;
          border: 1px solid var(--emerald-border);
          background: var(--emerald-surface);
        }
        .solution-value-num {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: 2rem;
          font-weight: 700;
          color: var(--emerald);
          line-height: 1;
        }
        .solution-value-desc {
          font-size: 0.82rem;
          color: var(--ink-muted);
          line-height: 1.5;
        }
      `}</style>
    </DocsSection>
  );
}
