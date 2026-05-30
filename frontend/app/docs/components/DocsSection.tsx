// Shared docs section wrapper — provides consistent layout for all sections
import { ReactNode } from "react";

interface DocsSectionProps {
  id: string;
  number: string;
  type: "pitch" | "technical";
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function DocsSection({
  id,
  number,
  type,
  eyebrow,
  title,
  subtitle,
  children,
}: DocsSectionProps) {
  return (
    <section id={id} className={`docs-section docs-section--${type}`}>
      {/* Section header */}
      <div className="docs-section-header">
        <div className="docs-section-meta">
          <span className="docs-section-number">{number}</span>
          {eyebrow && <span className="docs-section-eyebrow">{eyebrow}</span>}
          <span className={`docs-section-type-badge docs-section-type-badge--${type}`}>
            {type === "pitch" ? "Pitch Deck" : "Technical"}
          </span>
        </div>
        <h2 className="docs-section-title">{title}</h2>
        {subtitle && <p className="docs-section-subtitle">{subtitle}</p>}
      </div>

      {/* Content */}
      <div className="docs-section-body">{children}</div>

      <style>{`
        .docs-section {
          scroll-margin-top: 72px;
          padding: 64px 0 80px;
          border-bottom: 1px solid var(--line);
        }
        .docs-section:last-child { border-bottom: none; }
        .docs-section-header {
          margin-bottom: 40px;
        }
        .docs-section-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .docs-section-number {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.65rem;
          font-weight: 500;
          color: var(--ink-muted);
          letter-spacing: 0.08em;
        }
        .docs-section-eyebrow {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--emerald);
        }
        .docs-section-type-badge {
          padding: 2px 7px;
          border-radius: 3px;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .docs-section-type-badge--pitch {
          background: var(--emerald-surface);
          color: var(--emerald);
          border: 1px solid var(--emerald-border);
        }
        .docs-section-type-badge--technical {
          background: var(--gold-surface);
          color: var(--gold);
          border: 1px solid var(--gold-border);
        }
        .docs-section-title {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 500;
          color: var(--ink);
          line-height: 1.1;
          letter-spacing: -0.01em;
          margin: 0 0 12px;
        }
        .docs-section-subtitle {
          font-size: 1.05rem;
          color: var(--ink-soft);
          line-height: 1.65;
          max-width: 640px;
          margin: 0;
        }
        .docs-section-body {
          /* content rendered inline */
        }
      `}</style>
    </section>
  );
}
