"use client";

import Link from "next/link";
import { ArrowRight, Search, ShieldCheck, TrendingUp } from "lucide-react";

const TICKER_ITEMS = [
  "B2B SaaS Pricing Intelligence",
  "AI Workflow Adoption Studies",
  "FinTech Trust & Compliance",
  "EdTech Procurement Maps",
  "Series A Market Validation",
  "Go-to-Market Strategy Reports",
  "Competitive Landscape Analysis",
  "Consumer Behavior Signals",
];

export default function HeroSection() {
  return (
    <section className="signal-hero">
      {/* Floating dashboard cards */}
      <div className="signal-stage">
        {/* Card A: Live demand map */}
        <div className="signal-card signal-card-a p-6">
          <div className="mb-5 flex items-center justify-between">
            <span className="mono text-[0.65rem] font-medium uppercase tracking-widest text-[var(--ink-muted)]">
              Live demand map
            </span>
            <span className="flex items-center gap-2 text-sm font-semibold text-[var(--ink-soft)]">
              <span className="pulse-dot" />
              28 signals
            </span>
          </div>
          <div className="grid gap-4">
            {[
              ["B2B SaaS pricing", "92%", "bar-teal"],
              ["AI workflow adoption", "86%", "bar-rust"],
              ["FinTech trust levers", "74%", "bar-gold"],
              ["EdTech procurement", "68%", "bar-teal"],
            ].map(([label, width, tone]) => (
              <div key={label} className="grid gap-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--ink-soft)]">{label}</span>
                  <span className="font-semibold text-[var(--ink)]">{width}</span>
                </div>
                <span className="bar">
                  <span className={`bar ${tone} block`} style={{ width }} />
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Card B: Research queue */}
        <div className="signal-card signal-card-b p-5">
          <span className="mono text-[0.65rem] font-medium uppercase tracking-widest text-[var(--ink-muted)]">
            Research queue
          </span>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {[
              { label: "Intake", count: "3", color: "var(--ink-muted)" },
              { label: "Match", count: "7", color: "var(--gold)" },
              { label: "Ready", count: "2", color: "var(--emerald)" },
            ].map(({ label, count, color }) => (
              <div
                key={label}
                className="rounded-lg border border-[var(--line)] bg-[var(--bg-elevated)] p-3 text-center"
              >
                <div className="mono text-[0.6rem] text-[var(--ink-muted)] uppercase tracking-wider">{label}</div>
                <div className="mt-1 text-xl font-bold" style={{ color }}>{count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Card C: Analyst fit */}
        <div className="signal-card signal-card-c p-5 flex flex-col">
          <span className="mono text-[0.65rem] font-medium uppercase tracking-widest text-[var(--ink-muted)]">
            Analyst fit
          </span>
          <div className="mt-auto">
            <div className="display text-5xl font-bold" style={{ color: "var(--emerald)" }}>
              98<span className="text-2xl text-[var(--emerald-dark)]">%</span>
            </div>
            <p className="mt-2 text-xs text-[var(--ink-soft)] leading-relaxed">
              relevance score for your next brief
            </p>
          </div>
        </div>
      </div>

      {/* Hero content */}
      <div className="container relative z-10 flex min-h-[calc(100vh-72px)] flex-col justify-center py-24 lg:py-28">
        <div className="max-w-[680px]">
          {/* Eyebrow */}
          <div className="eyebrow animate-rise mb-7 flex items-center gap-3">
            <ShieldCheck size={13} />
            Market intelligence operating system
          </div>

          {/* Headline */}
          <h1
            className="animate-rise-2 font-display text-[3.4rem] leading-[1.02] tracking-[-0.02em] md:text-[5rem] lg:text-[6rem]"
            style={{ color: "var(--ink)" }}
          >
            Know the market
            <br />
            <span className="gradient-text">before it moves.</span>
          </h1>

          {/* Subhead */}
          <p className="animate-rise-3 mt-7 max-w-[520px] text-[1.05rem] leading-[1.8] text-[var(--ink-soft)]">
            Marketrix turns founder briefs into ranked research, analyst matches, and
            board-ready evidence — without the enterprise consulting drag.
          </p>

          {/* CTAs */}
          <div className="animate-rise-4 mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/submit-brief" className="btn-primary">
              Start a brief
              <ArrowRight size={16} />
            </Link>
            <Link href="/marketplace" className="btn-secondary">
              <Search size={16} />
              Browse reports
            </Link>
          </div>

          {/* Stats */}
          <div className="animate-rise-4 mt-12 flex flex-wrap gap-6">
            {[
              { value: "2,400+", label: "Research assets", icon: <TrendingUp size={14} /> },
              { value: "850+", label: "Expert analysts", icon: <ShieldCheck size={14} /> },
              { value: "10 min", label: "First match", icon: <ArrowRight size={14} /> },
            ].map(({ value, label, icon }) => (
              <div key={label} className="stat-divider">
                <div className="flex items-center gap-2">
                  <div className="text-[var(--emerald)]">{icon}</div>
                  <div className="display text-[1.9rem] font-bold text-[var(--ink)]">{value}</div>
                </div>
                <p className="mt-0.5 text-[0.72rem] font-semibold uppercase tracking-wider text-[var(--ink-muted)]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom ticker strip */}
      <div className="relative z-10 border-t border-[var(--line)] bg-[var(--bg-raised)] py-3">
        <div className="ticker-wrap">
          <div className="ticker-track">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span
                key={i}
                className="mono mx-8 inline-flex items-center gap-3 text-[0.68rem] font-medium uppercase tracking-widest text-[var(--ink-muted)]"
              >
                <span className="h-1 w-1 rounded-full bg-[var(--emerald)] flex-shrink-0" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
