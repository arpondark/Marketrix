"use client";

import Link from "next/link";
import { ArrowRight, Search, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section className="section-pad relative overflow-hidden" style={{ background: "var(--bg-raised)" }}>
      {/* Dramatic glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-1/2 top-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-10"
          style={{ background: "var(--emerald)" }}
        />
      </div>

      <div className="container relative z-10">
        <div
          className="rounded-2xl border border-[var(--emerald-border)] bg-[var(--bg-surface)] p-10 md:p-14 relative overflow-hidden"
          style={{
            boxShadow: "0 0 60px rgba(26,255,156,0.06), inset 0 1px 0 rgba(26,255,156,0.1)",
          }}
        >
          {/* Corner accent */}
          <div
            className="absolute right-0 top-0 h-64 w-64 rounded-full blur-3xl opacity-[0.08] pointer-events-none"
            style={{ background: "var(--emerald)", transform: "translate(30%, -30%)" }}
          />

          <div className="relative z-10 grid gap-10 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--emerald-border)] bg-[var(--emerald-surface)] px-3 py-1.5 mb-6">
                <Sparkles size={13} style={{ color: "var(--emerald)" }} />
                <span className="mono text-[0.65rem] font-medium uppercase tracking-widest" style={{ color: "var(--emerald)" }}>
                  Ready desk
                </span>
              </div>

              <h2 className="text-[2.5rem] leading-[1.05] text-[var(--ink)] md:text-[3rem]">
                Turn the next question
                <br />
                <span className="gradient-text">into a brief.</span>
              </h2>
              <p className="mt-5 max-w-lg text-[1rem] leading-relaxed text-[var(--ink-soft)]">
                Start with a structured intake, browse the report inventory, or open the
                dashboard to see how active research work is organized.
              </p>

              {/* Trust badges */}
              <div className="mt-7 flex flex-wrap gap-3">
                {["No consulting retainer", "10 min to first match", "Local-first demo"].map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--line-medium)] bg-[var(--bg-elevated)] px-3 py-1.5 text-xs font-medium text-[var(--ink-soft)]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--emerald)] flex-shrink-0" />
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <Link href="/submit-brief" className="btn-primary">
                Start a brief
                <ArrowRight size={16} />
              </Link>
              <Link href="/marketplace" className="btn-secondary">
                <Search size={16} />
                Browse research
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
