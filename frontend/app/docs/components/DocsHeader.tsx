"use client";

import { useState } from "react";
import { Search, Download, Share2, ExternalLink, X } from "lucide-react";
import Link from "next/link";
import { ALL_SECTIONS } from "../lib/sections";

interface DocsHeaderProps {
  onSectionClick: (id: string) => void;
}

export default function DocsHeader({ onSectionClick }: DocsHeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const results = query.length > 1
    ? ALL_SECTIONS.filter(
        (s) =>
          s.label.toLowerCase().includes(query.toLowerCase()) ||
          (s.description ?? "").toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleResultClick = (id: string) => {
    onSectionClick(id);
    setSearchOpen(false);
    setQuery("");
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <>
      <header className="docs-header">
        <div className="docs-header-inner">
          {/* Left: Title */}
          <div className="docs-header-title-group">
            <span className="docs-header-badge">LIVE DOCS</span>
            <h1 className="docs-header-title">Marketrix Documentation</h1>
          </div>

          {/* Right: Actions */}
          <div className="docs-header-actions">
            <button
              className="docs-header-btn docs-header-search-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="Search sections"
            >
              <Search size={15} />
              <span className="docs-header-search-label">Search sections</span>
              <kbd className="docs-header-kbd">⌘K</kbd>
            </button>

            <button
              className="docs-header-icon-btn"
              onClick={handleShare}
              aria-label="Copy link"
              title="Copy link"
            >
              <Share2 size={15} />
            </button>

            <Link
              href="/docs/admin"
              className="docs-header-icon-btn"
              aria-label="Admin panel"
              title="Admin panel"
            >
              <ExternalLink size={15} />
            </Link>
          </div>
        </div>

        {/* Progress bar */}
        <div className="docs-header-progress-track">
          <div id="docs-progress-fill" className="docs-header-progress-fill" />
        </div>
      </header>

      {/* Search modal */}
      {searchOpen && (
        <div className="docs-search-overlay" onClick={() => setSearchOpen(false)}>
          <div className="docs-search-modal" onClick={(e) => e.stopPropagation()}>
            <div className="docs-search-input-wrap">
              <Search size={16} className="docs-search-icon" />
              <input
                autoFocus
                className="docs-search-input"
                placeholder="Search sections, topics..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") { setSearchOpen(false); setQuery(""); }
                  if (e.key === "Enter" && results.length > 0) {
                    handleResultClick(results[0].id);
                  }
                }}
              />
              <button
                className="docs-search-close"
                onClick={() => { setSearchOpen(false); setQuery(""); }}
              >
                <X size={14} />
              </button>
            </div>

            {results.length > 0 && (
              <div className="docs-search-results">
                {results.map((r) => (
                  <button
                    key={r.id}
                    className="docs-search-result"
                    onClick={() => handleResultClick(r.id)}
                  >
                    <span className="docs-search-result-num">{r.number}</span>
                    <div className="docs-search-result-info">
                      <span className="docs-search-result-label">{r.label}</span>
                      {r.description && (
                        <span className="docs-search-result-desc">{r.description}</span>
                      )}
                    </div>
                    <span
                      className={`docs-search-result-type ${
                        r.type === "pitch" ? "docs-search-result-type--pitch" : "docs-search-result-type--tech"
                      }`}
                    >
                      {r.type === "pitch" ? "Pitch" : "Tech"}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {query.length > 1 && results.length === 0 && (
              <div className="docs-search-empty">
                No sections match &ldquo;{query}&rdquo;
              </div>
            )}

            {query.length === 0 && (
              <div className="docs-search-hint">
                Type to search sections and topics
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        /* ── Header ──────────────────────────────────── */
        .docs-header {
          position: fixed;
          top: 0;
          left: 240px;
          right: 0;
          z-index: 200;
          background: rgba(8,12,10,0.88);
          border-bottom: 1px solid var(--line);
          backdrop-filter: blur(16px);
        }
        @media (max-width: 1023px) {
          .docs-header { left: 0; }
        }
        .docs-header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 0 28px;
          min-height: 56px;
        }
        .docs-header-title-group {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }
        .docs-header-badge {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          padding: 3px 8px;
          border-radius: 4px;
          border: 1px solid var(--emerald-border);
          background: var(--emerald-surface);
          color: var(--emerald);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.12em;
        }
        .docs-header-title {
          font-family: var(--font-dm-sans), system-ui, sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--ink);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1;
        }
        @media (max-width: 600px) {
          .docs-header-title { display: none; }
        }

        /* Actions */
        .docs-header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .docs-header-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          border-radius: 8px;
          border: 1px solid var(--line-medium);
          background: var(--bg-surface);
          color: var(--ink-muted);
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 180ms ease;
        }
        .docs-header-btn:hover {
          border-color: var(--line-strong);
          color: var(--ink);
        }
        .docs-header-search-label {
          color: var(--ink-muted);
        }
        @media (max-width: 700px) {
          .docs-header-search-label { display: none; }
        }
        .docs-header-kbd {
          padding: 2px 5px;
          border-radius: 4px;
          border: 1px solid var(--line);
          background: var(--bg-base);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.65rem;
          color: var(--ink-muted);
        }
        @media (max-width: 700px) {
          .docs-header-kbd { display: none; }
        }
        .docs-header-icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 8px;
          border: 1px solid var(--line);
          background: transparent;
          color: var(--ink-muted);
          cursor: pointer;
          text-decoration: none;
          transition: all 180ms ease;
        }
        .docs-header-icon-btn:hover {
          border-color: var(--line-medium);
          color: var(--ink);
          background: var(--bg-surface);
        }

        /* Progress bar */
        .docs-header-progress-track {
          height: 2px;
          background: var(--line);
          overflow: hidden;
        }
        .docs-header-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--emerald), var(--emerald-dim));
          width: 0%;
          transition: width 100ms linear;
          box-shadow: 0 0 8px rgba(26,255,156,0.5);
        }

        /* ── Search Modal ────────────────────────────── */
        .docs-search-overlay {
          position: fixed;
          inset: 0;
          background: rgba(8,12,10,0.7);
          backdrop-filter: blur(6px);
          z-index: 1000;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 100px;
        }
        .docs-search-modal {
          width: 100%;
          max-width: 560px;
          border: 1px solid var(--line-medium);
          border-radius: 16px;
          background: var(--bg-surface);
          box-shadow: 0 32px 80px rgba(0,0,0,0.6);
          overflow: hidden;
          animation: rise-in 200ms cubic-bezier(0.16,1,0.3,1) both;
        }
        .docs-search-input-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 16px;
          border-bottom: 1px solid var(--line);
        }
        .docs-search-icon { color: var(--ink-muted); flex-shrink: 0; }
        .docs-search-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--ink);
          font-size: 0.95rem;
          font-family: var(--font-dm-sans), system-ui, sans-serif;
        }
        .docs-search-input::placeholder { color: var(--ink-muted); }
        .docs-search-close {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 6px;
          border: 1px solid var(--line);
          background: transparent;
          color: var(--ink-muted);
          cursor: pointer;
          flex-shrink: 0;
        }
        .docs-search-results {
          max-height: 360px;
          overflow-y: auto;
          padding: 8px;
        }
        .docs-search-result {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 10px 12px;
          border-radius: 8px;
          border: none;
          background: transparent;
          cursor: pointer;
          text-align: left;
          transition: background 160ms ease;
        }
        .docs-search-result:hover { background: var(--bg-elevated); }
        .docs-search-result-num {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.65rem;
          color: var(--ink-muted);
          min-width: 32px;
          flex-shrink: 0;
        }
        .docs-search-result-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }
        .docs-search-result-label {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--ink);
        }
        .docs-search-result-desc {
          font-size: 0.75rem;
          color: var(--ink-muted);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .docs-search-result-type {
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          flex-shrink: 0;
        }
        .docs-search-result-type--pitch {
          background: var(--emerald-surface);
          color: var(--emerald);
          border: 1px solid var(--emerald-border);
        }
        .docs-search-result-type--tech {
          background: var(--gold-surface);
          color: var(--gold);
          border: 1px solid var(--gold-border);
        }
        .docs-search-empty, .docs-search-hint {
          padding: 24px;
          text-align: center;
          color: var(--ink-muted);
          font-size: 0.85rem;
        }
      `}</style>
    </>
  );
}
