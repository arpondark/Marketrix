"use client";

import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Marketrix replaced three scattered spreadsheets with one clear research queue. We knew what to buy, what to ignore, and who to call next.",
    author: "Sarah Chen",
    role: "Founder, TechFlow",
    metric: "42 days saved",
    metricColor: "var(--emerald)",
    initials: "SC",
  },
  {
    quote:
      "As an analyst, the marketplace gave my work a commercial home. The briefs are specific, which means the projects are better from day one.",
    author: "James Rodriguez",
    role: "Independent researcher",
    metric: "$40K annualized",
    metricColor: "var(--gold)",
    initials: "JR",
  },
  {
    quote:
      "The preview format helped our board understand the evidence behind every recommendation before we spent a dollar.",
    author: "Emily Watson",
    role: "CEO, GrowthCo",
    metric: "3 markets ranked",
    metricColor: "var(--coral)",
    initials: "EW",
  },
];

export default function Testimonials() {
  return (
    <section className="section-pad relative overflow-hidden" style={{ background: "var(--bg-base)" }}>
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full blur-3xl opacity-[0.05]"
          style={{ background: "var(--emerald)" }} />
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">Proof points</span>
            <h2 className="mt-5 max-w-xl text-[2.5rem] leading-[1.05] md:text-[3.4rem]">
              A sharper way to buy<br />
              <span className="gradient-text">market clarity.</span>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} fill="var(--gold)" className="text-[var(--gold)]" />
              ))}
            </div>
            <span className="text-sm text-[var(--ink-muted)]">4.9 / 5 from 340 reviews</span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((t) => (
            <article
              key={t.author}
              className="glow-card quiet-surface flex flex-col p-7"
            >
              {/* Top: quote icon + stars */}
              <div className="mb-6 flex items-center justify-between">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ background: "var(--emerald-surface)", color: "var(--emerald)" }}
                >
                  <Quote size={16} />
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} fill="var(--gold)" className="text-[var(--gold)]" />
                  ))}
                </div>
              </div>

              {/* Quote */}
              <blockquote className="flex-1 text-[0.95rem] leading-[1.8] text-[var(--ink-soft)]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Footer */}
              <div className="mt-7 flex items-center justify-between gap-4 border-t border-[var(--line)] pt-5">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div
                    className="mono flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[0.68rem] font-bold"
                    style={{
                      background: `${t.metricColor}18`,
                      color: t.metricColor,
                      border: `1px solid ${t.metricColor}30`,
                    }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[var(--ink)]">{t.author}</div>
                    <div className="text-xs text-[var(--ink-muted)]">{t.role}</div>
                  </div>
                </div>
                <div
                  className="mono rounded-full border px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-wider shrink-0"
                  style={{
                    background: `${t.metricColor}10`,
                    borderColor: `${t.metricColor}25`,
                    color: t.metricColor,
                  }}
                >
                  {t.metric}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
