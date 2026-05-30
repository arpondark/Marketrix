import DocsSection from "../DocsSection";
import { AlertTriangle, TrendingDown, Clock, DollarSign } from "lucide-react";

const pains = [
  {
    icon: <Clock size={20} />,
    title: "Research is time-consuming",
    desc: "Founders spend 40–60 hours per quarter searching for market data across scattered sources with no guarantee of relevance.",
  },
  {
    icon: <DollarSign size={20} />,
    title: "Expensive & opaque",
    desc: "Traditional market research firms charge $15,000–$50,000 per engagement, pricing out early-stage founders who need it most.",
  },
  {
    icon: <TrendingDown size={20} />,
    title: "Generic, not startup-specific",
    desc: "Reports from Gartner or Forrester are broad market overviews — not calibrated to a specific startup's stage, geography, or competitive context.",
  },
  {
    icon: <AlertTriangle size={20} />,
    title: "No actionable match",
    desc: "Even when founders find useful data, there's no system to connect insights to the right analysts, channels, or strategic moves.",
  },
];

export default function ProblemSection() {
  return (
    <DocsSection
      id="problem"
      number="01"
      type="pitch"
      eyebrow="The Problem"
      title="Founders are flying blind on market intelligence"
      subtitle="The tools that exist today are built for enterprise procurement teams, not early-stage founders making bet-the-company decisions on thin information."
    >
      <div className="problem-grid">
        {pains.map((p, i) => (
          <div key={i} className="problem-card">
            <div className="problem-icon">{p.icon}</div>
            <div>
              <h3 className="problem-card-title">{p.title}</h3>
              <p className="problem-card-desc">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Stat callout */}
      <div className="problem-stat-row">
        <div className="problem-stat">
          <span className="problem-stat-value">67%</span>
          <span className="problem-stat-label">of Series A founders cite insufficient market research as their #1 pitch gap</span>
        </div>
        <div className="problem-stat-divider" />
        <div className="problem-stat">
          <span className="problem-stat-value">$48K</span>
          <span className="problem-stat-label">average cost of a traditional market research engagement at Forrester or Gartner</span>
        </div>
        <div className="problem-stat-divider" />
        <div className="problem-stat">
          <span className="problem-stat-value">3 wks</span>
          <span className="problem-stat-label">typical turnaround time for a traditional research brief — too slow for pre-seed decisions</span>
        </div>
      </div>

      <style>{`
        .problem-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 40px;
        }
        @media (max-width: 640px) { .problem-grid { grid-template-columns: 1fr; } }
        .problem-card {
          display: flex;
          gap: 16px;
          padding: 24px;
          border-radius: 14px;
          border: 1px solid var(--coral-border);
          background: var(--coral-surface);
        }
        .problem-icon {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(255,107,74,0.15);
          color: var(--coral);
          flex-shrink: 0;
          padding-top: 10px;
        }
        .problem-card-title {
          font-family: var(--font-dm-sans), system-ui, sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--ink);
          margin: 0 0 6px;
        }
        .problem-card-desc {
          font-size: 0.88rem;
          color: var(--ink-soft);
          line-height: 1.6;
          margin: 0;
        }
        .problem-stat-row {
          display: flex;
          gap: 0;
          border: 1px solid var(--line-medium);
          border-radius: 14px;
          overflow: hidden;
          background: var(--bg-surface);
        }
        .problem-stat {
          flex: 1;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .problem-stat-divider {
          width: 1px;
          background: var(--line);
          flex-shrink: 0;
        }
        .problem-stat-value {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: 2.2rem;
          font-weight: 700;
          color: var(--coral);
          line-height: 1;
        }
        .problem-stat-label {
          font-size: 0.8rem;
          color: var(--ink-muted);
          line-height: 1.5;
        }
        @media (max-width: 640px) {
          .problem-stat-row { flex-direction: column; }
          .problem-stat-divider { width: auto; height: 1px; }
        }
      `}</style>
    </DocsSection>
  );
}
