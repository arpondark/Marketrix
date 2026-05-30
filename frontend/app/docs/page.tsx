"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  getDocsConfig,
  evaluateAccess,
  DocsConfig,
  AccessStatus,
} from "./lib/docsConfig";
import { ALL_SECTIONS } from "./lib/sections";

// Components
import DocsAccessGate from "./components/DocsAccessGate";
import DocsSidebar from "./components/DocsSidebar";
import DocsHeader from "./components/DocsHeader";

// Pitch sections
import ProblemSection from "./components/pitch/ProblemSection";
import SolutionSection from "./components/pitch/SolutionSection";
import WhyNowSection from "./components/pitch/WhyNowSection";
import MarketSection from "./components/pitch/MarketSection";
import BusinessModelSection from "./components/pitch/BusinessModelSection";
import TractionSection from "./components/pitch/TractionSection";
import CompetitionSection from "./components/pitch/CompetitionSection";
import AdvantageSection from "./components/pitch/AdvantageSection";
import GoToMarketSection from "./components/pitch/GoToMarketSection";
import TeamSection from "./components/pitch/TeamSection";
import VisionSection from "./components/pitch/VisionSection";

// Technical sections
import ProductOverviewSection from "./components/technical/ProductOverviewSection";
import FeatureMatrixSection from "./components/technical/FeatureMatrixSection";
import ArchitectureSection from "./components/technical/ArchitectureSection";
import DataFlowSection from "./components/technical/DataFlowSection";
import TechStackSection from "./components/technical/TechStackSection";
import ApiDocsSection from "./components/technical/ApiDocsSection";
import DataLayerSection from "./components/technical/DataLayerSection";
import AiLayerSection from "./components/technical/AiLayerSection";
import RoadmapSection from "./components/technical/RoadmapSection";
import PerformanceSection from "./components/technical/PerformanceSection";
import SecuritySection from "./components/technical/SecuritySection";
import AnalyticsSection from "./components/technical/AnalyticsSection";
import ChangelogSection from "./components/technical/ChangelogSection";

export default function DocsPage() {
  const [config, setConfig] = useState<DocsConfig | null>(null);
  const [status, setStatus] = useState<AccessStatus>("unknown");
  const [activeSection, setActiveSection] = useState("problem");
  const mainRef = useRef<HTMLDivElement>(null);

  // Load config client-side
  useEffect(() => {
    const cfg = getDocsConfig();
    setConfig(cfg);
    setStatus(evaluateAccess(cfg));
  }, []);

  // Scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      const main = mainRef.current;
      if (!main) return;
      const fill = document.getElementById("docs-progress-fill");
      if (!fill) return;
      const scrollTop = main.scrollTop;
      const scrollHeight = main.scrollHeight - main.clientHeight;
      const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      fill.style.width = `${pct}%`;
    };
    const main = mainRef.current;
    main?.addEventListener("scroll", handleScroll, { passive: true });
    return () => main?.removeEventListener("scroll", handleScroll);
  }, [status]);

  // Active section tracker via IntersectionObserver
  useEffect(() => {
    if (status !== "accessible") return;
    const observers: IntersectionObserver[] = [];
    const sectionIds = ALL_SECTIONS.map((s) => s.id);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.15, rootMargin: "-80px 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [status]);

  // Scroll to section
  const handleSectionClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
  }, []);

  // SSR / loading state
  if (!config) {
    return (
      <div className="docs-loading">
        <div className="docs-loading-spinner" />
        <style>{`
          .docs-loading {
            min-height: 100vh;
            background: var(--bg-base);
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .docs-loading-spinner {
            width: 32px;
            height: 32px;
            border: 2px solid var(--line-medium);
            border-top-color: var(--emerald);
            border-radius: 999px;
            animation: spin-slow 0.8s linear infinite;
          }
        `}</style>
      </div>
    );
  }

  // Access gate
  if (status !== "accessible") {
    return <DocsAccessGate status={status} config={config} />;
  }

  // Full docs page
  return (
    <div className="docs-root">
      <DocsSidebar activeSection={activeSection} onSectionClick={handleSectionClick} />
      <DocsHeader onSectionClick={handleSectionClick} />

      {/* Main content area */}
      <div className="docs-main" ref={mainRef}>
        <div className="docs-content">
          {/* Pitch Deck Header Banner */}
          <div className="docs-hero-banner">
            <span className="docs-hero-eyebrow">PITCH DECK + TECHNICAL DOCS</span>
            <h1 className="docs-hero-title">
              Marketrix
            </h1>
            <p className="docs-hero-tagline">
              The AI-powered market intelligence OS for startup founders — from brief to boardroom-ready insight in 10 minutes.
            </p>
            <div className="docs-hero-meta">
              <span>Version 0.5.0</span>
              <span className="docs-hero-sep">·</span>
              <span>May 2026</span>
              <span className="docs-hero-sep">·</span>
              <span>24 sections</span>
            </div>
          </div>

          {/* ── PITCH DECK ── */}
          <div className="docs-section-group-label docs-section-group-label--pitch">
            PITCH DECK
          </div>
          <ProblemSection />
          <SolutionSection />
          <WhyNowSection />
          <MarketSection />
          <BusinessModelSection />
          <TractionSection />
          <CompetitionSection />
          <AdvantageSection />
          <GoToMarketSection />
          <TeamSection />
          <VisionSection />

          {/* ── TECHNICAL DOCS ── */}
          <div className="docs-section-group-label docs-section-group-label--tech">
            TECHNICAL DOCUMENTATION
          </div>
          <ProductOverviewSection />
          <FeatureMatrixSection />
          <ArchitectureSection />
          <DataFlowSection />
          <TechStackSection />
          <ApiDocsSection />
          <DataLayerSection />
          <AiLayerSection />
          <RoadmapSection />
          <PerformanceSection />
          <SecuritySection />
          <AnalyticsSection />
          <ChangelogSection />

          {/* Footer */}
          <footer className="docs-footer">
            <div className="docs-footer-inner">
              <span className="docs-footer-brand">Marketrix Docs</span>
              <span className="docs-footer-copy">© 2026 Marketrix. All rights reserved.</span>
              <a href="/" className="docs-footer-link">← Back to app</a>
            </div>
          </footer>
        </div>
      </div>

      <style>{`
        /* ── Root layout ──────────────────────────────── */
        .docs-root {
          display: flex;
          min-height: 100vh;
          background: var(--bg-base);
        }

        /* ── Main content ─────────────────────────────── */
        .docs-main {
          flex: 1;
          margin-left: 240px;
          padding-top: 58px;   /* header height */
          min-height: 100vh;
          overflow-y: auto;
          overflow-x: hidden;
        }
        @media (max-width: 1023px) {
          .docs-main { margin-left: 0; }
        }

        .docs-content {
          max-width: 860px;
          margin: 0 auto;
          padding: 0 40px 80px;
        }
        @media (max-width: 768px) {
          .docs-content { padding: 0 20px 60px; }
        }

        /* ── Hero banner ──────────────────────────────── */
        .docs-hero-banner {
          padding: 64px 0 48px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          border-bottom: 1px solid var(--line);
          margin-bottom: 0;
        }
        .docs-hero-eyebrow {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: var(--emerald);
          text-transform: uppercase;
        }
        .docs-hero-title {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: clamp(3rem, 8vw, 5rem);
          font-weight: 700;
          color: var(--ink);
          line-height: 1;
          margin: 0;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, var(--ink) 0%, var(--emerald) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .docs-hero-tagline {
          font-size: 1.1rem;
          color: var(--ink-soft);
          line-height: 1.65;
          max-width: 600px;
          margin: 0;
        }
        .docs-hero-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.72rem;
          color: var(--ink-muted);
        }
        .docs-hero-sep { opacity: 0.4; }

        /* ── Section group labels ─────────────────────── */
        .docs-section-group-label {
          position: sticky;
          top: 58px;
          z-index: 10;
          padding: 10px 0;
          margin: 0;
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          background: var(--bg-base);
          backdrop-filter: blur(8px);
        }
        .docs-section-group-label--pitch {
          color: var(--emerald);
          border-bottom: 1px solid var(--emerald-border);
        }
        .docs-section-group-label--tech {
          color: var(--gold);
          border-bottom: 1px solid var(--gold-border);
          margin-top: 40px;
        }

        /* ── Footer ───────────────────────────────────── */
        .docs-footer {
          padding: 32px 0;
          border-top: 1px solid var(--line);
          margin-top: 40px;
        }
        .docs-footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .docs-footer-brand {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--emerald);
        }
        .docs-footer-copy {
          font-size: 0.78rem;
          color: var(--ink-muted);
        }
        .docs-footer-link {
          font-size: 0.8rem;
          color: var(--ink-muted);
          text-decoration: none;
          transition: color 180ms;
        }
        .docs-footer-link:hover { color: var(--emerald); }
      `}</style>
    </div>
  );
}
