"use client";

import { useState, useEffect } from "react";
import { PITCH_SECTIONS, TECHNICAL_SECTIONS, DocSection } from "../lib/sections";
import { Zap, ChevronRight, X, Menu } from "lucide-react";
import Link from "next/link";

interface DocsSidebarProps {
  activeSection: string;
  onSectionClick: (id: string) => void;
}

export default function DocsSidebar({ activeSection, onSectionClick }: DocsSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile sidebar on resize to desktop
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const handleClick = (id: string) => {
    onSectionClick(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile trigger */}
      <button
        className="docs-sidebar-mobile-trigger"
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation"
      >
        <Menu size={18} />
        <span>Sections</span>
      </button>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="docs-sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`docs-sidebar ${mobileOpen ? "docs-sidebar--open" : ""}`}>
        {/* Logo */}
        <div className="docs-sidebar-logo">
          <Link href="/" className="docs-sidebar-brand">
            <span className="docs-sidebar-brand-icon">
              <Zap size={14} strokeWidth={2.5} />
            </span>
            <span className="docs-sidebar-brand-name">Marketrix</span>
          </Link>
          <button
            className="docs-sidebar-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
          >
            <X size={16} />
          </button>
        </div>

        <nav className="docs-sidebar-nav">
          {/* Pitch Deck Group */}
          <SidebarGroup
            label="Pitch Deck"
            sections={PITCH_SECTIONS}
            activeSection={activeSection}
            onSectionClick={handleClick}
          />

          <div className="docs-sidebar-divider" />

          {/* Technical Docs Group */}
          <SidebarGroup
            label="Technical Docs"
            sections={TECHNICAL_SECTIONS}
            activeSection={activeSection}
            onSectionClick={handleClick}
          />
        </nav>

        {/* Footer */}
        <div className="docs-sidebar-footer">
          <Link href="/docs/admin" className="docs-sidebar-admin-link">
            Admin panel
            <ChevronRight size={13} />
          </Link>
        </div>
      </aside>

      <style>{`
        /* ── Mobile trigger ─────────────────────────── */
        .docs-sidebar-mobile-trigger {
          display: none;
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 300;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 999px;
          border: 1px solid var(--emerald-border);
          background: var(--bg-elevated);
          color: var(--emerald);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          backdrop-filter: blur(12px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
        }
        @media (max-width: 1023px) {
          .docs-sidebar-mobile-trigger { display: flex; }
        }

        /* ── Overlay ────────────────────────────────── */
        .docs-sidebar-overlay {
          position: fixed;
          inset: 0;
          background: rgba(8,12,10,0.7);
          backdrop-filter: blur(4px);
          z-index: 398;
        }

        /* ── Sidebar ────────────────────────────────── */
        .docs-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 240px;
          background: var(--bg-raised);
          border-right: 1px solid var(--line);
          display: flex;
          flex-direction: column;
          z-index: 399;
          overflow: hidden;
        }
        @media (max-width: 1023px) {
          .docs-sidebar {
            transform: translateX(-100%);
            transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
            z-index: 399;
          }
          .docs-sidebar--open {
            transform: translateX(0);
          }
        }

        /* ── Logo ───────────────────────────────────── */
        .docs-sidebar-logo {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 16px;
          border-bottom: 1px solid var(--line);
          flex-shrink: 0;
        }
        .docs-sidebar-brand {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
        }
        .docs-sidebar-brand-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 6px;
          background: var(--emerald);
          color: var(--bg-base);
          flex-shrink: 0;
        }
        .docs-sidebar-brand-name {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--ink);
        }
        .docs-sidebar-close {
          display: none;
          width: 28px;
          height: 28px;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          border: 1px solid var(--line);
          background: transparent;
          color: var(--ink-muted);
          cursor: pointer;
        }
        @media (max-width: 1023px) {
          .docs-sidebar-close { display: flex; }
        }

        /* ── Nav ────────────────────────────────────── */
        .docs-sidebar-nav {
          flex: 1;
          overflow-y: auto;
          padding: 12px 0;
          scrollbar-width: thin;
          scrollbar-color: var(--ink-faint) transparent;
        }

        .docs-sidebar-divider {
          height: 1px;
          background: var(--line);
          margin: 10px 16px;
        }

        /* ── Footer ─────────────────────────────────── */
        .docs-sidebar-footer {
          padding: 12px 16px;
          border-top: 1px solid var(--line);
          flex-shrink: 0;
        }
        .docs-sidebar-admin-link {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.75rem;
          color: var(--ink-muted);
          text-decoration: none;
          transition: color 200ms;
        }
        .docs-sidebar-admin-link:hover {
          color: var(--emerald);
        }
      `}</style>
    </>
  );
}

// ── SidebarGroup ──────────────────────────────────────────────

function SidebarGroup({
  label,
  sections,
  activeSection,
  onSectionClick,
}: {
  label: string;
  sections: DocSection[];
  activeSection: string;
  onSectionClick: (id: string) => void;
}) {
  return (
    <div className="sidebar-group">
      <div className="sidebar-group-label">{label}</div>
      {sections.map((s) => {
        const isActive = activeSection === s.id;
        return (
          <button
            key={s.id}
            className={`sidebar-item ${isActive ? "sidebar-item--active" : ""}`}
            onClick={() => onSectionClick(s.id)}
          >
            <span className="sidebar-item-number">{s.number}</span>
            <span className="sidebar-item-label">{s.shortLabel ?? s.label}</span>
            {isActive && <span className="sidebar-item-dot" />}
          </button>
        );
      })}
      <style>{`
        .sidebar-group { padding: 0 8px; }
        .sidebar-group-label {
          padding: 8px 8px 4px;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--ink-muted);
          font-family: var(--font-jetbrains), monospace;
        }
        .sidebar-item {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          padding: 7px 8px;
          border-radius: 8px;
          border: none;
          background: transparent;
          color: var(--ink-soft);
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 160ms ease;
          text-align: left;
          position: relative;
        }
        .sidebar-item:hover {
          background: var(--bg-elevated);
          color: var(--ink);
        }
        .sidebar-item--active {
          background: var(--emerald-surface) !important;
          color: var(--emerald) !important;
          font-weight: 700;
        }
        .sidebar-item-number {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.65rem;
          color: inherit;
          opacity: 0.6;
          flex-shrink: 0;
          min-width: 28px;
        }
        .sidebar-item--active .sidebar-item-number { opacity: 1; }
        .sidebar-item-label { flex: 1; }
        .sidebar-item-dot {
          width: 5px;
          height: 5px;
          border-radius: 999px;
          background: var(--emerald);
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
}
