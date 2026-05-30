"use client";

import { AccessStatus, formatDisplayDate, DocsConfig } from "../lib/docsConfig";
import { Lock, Calendar, Clock, Zap, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface DocsAccessGateProps {
  status: AccessStatus;
  config: DocsConfig;
}

export default function DocsAccessGate({ status, config }: DocsAccessGateProps) {
  const isDisabled = status === "disabled";
  const isBefore = status === "before_window";
  const isAfter = status === "after_window";

  return (
    <div className="docs-gate-page">
      {/* Background */}
      <div className="docs-gate-bg" />
      <div className="docs-gate-grid" />

      <div className="docs-gate-content">
        {/* Logo */}
        <Link href="/" className="docs-gate-logo">
          <span className="docs-gate-logo-icon">
            <Zap size={16} strokeWidth={2.5} />
          </span>
          <span className="docs-gate-logo-name">Marketrix</span>
        </Link>

        <div className="docs-gate-card">
          {/* Status icon */}
          <div
            className={`docs-gate-icon ${
              isDisabled ? "docs-gate-icon--disabled" : "docs-gate-icon--scheduled"
            }`}
          >
            {isDisabled ? <Lock size={28} /> : <Calendar size={28} />}
          </div>

          <h1 className="docs-gate-title">
            {isDisabled && "Documentation Unavailable"}
            {isBefore && "Documentation Not Yet Available"}
            {isAfter && "Documentation Period Has Ended"}
          </h1>

          <p className="docs-gate-desc">
            {isDisabled &&
              "The Marketrix documentation is currently not publicly accessible. Please check back later or contact the team directly."}
            {isBefore &&
              "The documentation will be publicly available during the scheduled window."}
            {isAfter &&
              "The scheduled documentation period has concluded. Thank you for your interest in Marketrix."}
          </p>

          {(isBefore || isAfter) && (
            <div className="docs-gate-schedule">
              <div className="docs-gate-schedule-row">
                <Clock size={14} />
                <span className="docs-gate-schedule-label">Available window</span>
              </div>
              <div className="docs-gate-schedule-window">
                <span className="docs-gate-time">{formatDisplayDate(config.startDate)}</span>
                <span className="docs-gate-sep">→</span>
                <span className="docs-gate-time">{formatDisplayDate(config.endDate)}</span>
              </div>
            </div>
          )}

          <div className="docs-gate-actions">
            <Link href="/" className="docs-gate-back">
              <ArrowLeft size={15} />
              Back to Marketrix
            </Link>
          </div>
        </div>

        <p className="docs-gate-footer">
          Admin?{" "}
          <Link href="/docs/admin" className="docs-gate-admin-link">
            Access admin panel
          </Link>
        </p>
      </div>

      <style>{`
        .docs-gate-page {
          min-height: 100vh;
          background: var(--bg-base);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          position: relative;
          overflow: hidden;
        }
        .docs-gate-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 70% 60% at 50% 40%, rgba(26,255,156,0.05), transparent 70%);
          pointer-events: none;
        }
        .docs-gate-grid {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(238,241,236,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(238,241,236,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }
        .docs-gate-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 32px;
          max-width: 480px;
          width: 100%;
        }
        .docs-gate-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .docs-gate-logo-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: var(--emerald);
          color: var(--bg-base);
        }
        .docs-gate-logo-name {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--ink);
        }
        .docs-gate-card {
          width: 100%;
          border: 1px solid var(--line-medium);
          border-radius: 20px;
          background: var(--bg-surface);
          padding: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          text-align: center;
          box-shadow: 0 24px 80px rgba(0,0,0,0.5);
        }
        .docs-gate-icon {
          width: 72px;
          height: 72px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
        }
        .docs-gate-icon--disabled {
          background: rgba(255,107,74,0.1);
          border: 1px solid rgba(255,107,74,0.2);
          color: var(--coral);
        }
        .docs-gate-icon--scheduled {
          background: var(--emerald-surface);
          border: 1px solid var(--emerald-border);
          color: var(--emerald);
        }
        .docs-gate-title {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: 1.6rem;
          font-weight: 500;
          color: var(--ink);
          line-height: 1.2;
          margin: 0;
        }
        .docs-gate-desc {
          color: var(--ink-soft);
          font-size: 0.95rem;
          line-height: 1.6;
          max-width: 360px;
          margin: 0;
        }
        .docs-gate-schedule {
          width: 100%;
          border: 1px solid var(--line);
          border-radius: 12px;
          background: var(--bg-raised);
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .docs-gate-schedule-row {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--ink-muted);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .docs-gate-schedule-window {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .docs-gate-time {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.85rem;
          color: var(--emerald);
        }
        .docs-gate-sep {
          color: var(--ink-muted);
          font-size: 0.8rem;
        }
        .docs-gate-actions {
          margin-top: 8px;
        }
        .docs-gate-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 10px;
          border: 1px solid var(--line-medium);
          background: var(--bg-elevated);
          color: var(--ink-soft);
          font-size: 0.88rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 200ms ease;
        }
        .docs-gate-back:hover {
          border-color: var(--line-strong);
          color: var(--ink);
          transform: translateY(-1px);
        }
        .docs-gate-footer {
          font-size: 0.82rem;
          color: var(--ink-muted);
          margin: 0;
        }
        .docs-gate-admin-link {
          color: var(--emerald);
          text-decoration: none;
          font-weight: 600;
        }
        .docs-gate-admin-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
