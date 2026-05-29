"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Check, Search, SlidersHorizontal } from "lucide-react";

const steps = [
  {
    icon: SlidersHorizontal,
    number: "01",
    title: "Frame the question",
    detail: "Industry, stage, geography, budget, and goals become a structured intelligence brief.",
    color: "var(--emerald)",
  },
  {
    icon: Search,
    number: "02",
    title: "Match the signal",
    detail: "The marketplace filters reports and analysts by category, evidence, price, and fit.",
    color: "var(--gold)",
  },
  {
    icon: BookOpen,
    number: "03",
    title: "Review the evidence",
    detail: "Preview outcomes, expected delivery, match score, and analyst context before buying.",
    color: "var(--coral)",
  },
  {
    icon: Check,
    number: "04",
    title: "Move to action",
    detail: "Saved briefs appear in the dashboard with recommended research and next steps.",
    color: "var(--emerald)",
  },
];

export default function HowItWorks() {
  return (
    <section
      className="section-pad relative overflow-hidden"
      style={{ background: "var(--bg-raised)" }}
    >
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 h-[400px] w-[600px] rounded-full blur-3xl opacity-[0.04] pointer-events-none"
        style={{ background: "var(--emerald)" }} />

      <div className="container relative z-10">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow">Operating rhythm</span>
            <h2 className="mt-5 text-[2.5rem] leading-[1.05] text-[var(--ink)] md:text-[3.4rem]">
              From raw question<br />to ranked answer.
            </h2>
          </div>
          <Link href="/submit-brief" className="btn-primary shrink-0">
            Run the workflow
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Steps grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article
                key={step.title}
                className="step-card glow-card relative rounded-xl border border-[var(--line)] bg-[var(--bg-surface)] p-6 transition-all hover:border-[var(--line-medium)]"
              >
                {/* Connector line for large screens */}
                {index < steps.length - 1 && (
                  <div
                    className="absolute right-0 top-1/2 z-10 hidden h-px w-4 -translate-y-1/2 translate-x-full lg:block"
                    style={{ background: "var(--line-medium)" }}
                  />
                )}

                {/* Step number */}
                <div className="mono mb-6 flex items-center justify-between text-[0.65rem] font-medium uppercase tracking-widest text-[var(--ink-muted)]">
                  <span>Step {step.number}</span>
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-lg border"
                    style={{
                      borderColor: `${step.color}30`,
                      background: `${step.color}10`,
                      color: step.color,
                    }}
                  >
                    <Icon size={16} />
                  </div>
                </div>

                {/* Big number watermark */}
                <div
                  className="display mb-3 text-[3.5rem] font-bold leading-none"
                  style={{ color: `${step.color}18` }}
                >
                  {step.number}
                </div>

                <h3 className="font-sans text-base font-semibold leading-snug text-[var(--ink)]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                  {step.detail}
                </p>
              </article>
            );
          })}
        </div>

        {/* Bottom proof strip */}
        <div className="mt-12 grid gap-4 rounded-xl border border-[var(--line)] bg-[var(--bg-surface)] p-6 sm:grid-cols-3">
          {[
            { label: "Average time to first match", value: "< 10 min" },
            { label: "Reports indexed", value: "2,400+" },
            { label: "Analyst availability", value: "24/7" },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <div className="display text-3xl font-bold text-[var(--emerald)]">{value}</div>
              <p className="mt-1 text-sm text-[var(--ink-muted)]">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
