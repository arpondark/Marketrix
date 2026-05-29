"use client";

import Link from "next/link";
import { ArrowRight, BadgeCheck, Database, ShieldCheck, Users } from "lucide-react";

const principles = [
  {
    icon: Database,
    title: "Evidence before opinion",
    detail:
      "Every report preview is framed around outcomes, assumptions, and where the evidence is strongest.",
    color: "var(--emerald)",
  },
  {
    icon: Users,
    title: "Analysts are operators",
    detail:
      "Market experts should sell focused intelligence, not disappear inside slow consulting procurement.",
    color: "var(--gold)",
  },
  {
    icon: ShieldCheck,
    title: "Accessible by design",
    detail:
      "Founders can start with a specific question, a report preview, and a sane budget before custom work.",
    color: "var(--coral)",
  },
];

const team = [
  { name: "Alex Chen", role: "Founder & research operations", initials: "AC" },
  { name: "Sarah Rodriguez", role: "Product & marketplace systems", initials: "SR" },
  { name: "James Park", role: "Matching infrastructure", initials: "JP" },
  { name: "Emma Watson", role: "Analyst network strategy", initials: "EW" },
];

const stats = [
  { value: "2,400+", label: "Research assets" },
  { value: "850+", label: "Expert analysts" },
  { value: "18", label: "Market categories" },
  { value: "4.9★", label: "Average rating" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pb-20" style={{ background: "var(--bg-base)" }}>

      {/* Hero */}
      <section className="border-b border-[var(--line)] relative overflow-hidden" style={{ background: "var(--bg-raised)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-0 top-0 h-96 w-96 rounded-full blur-3xl opacity-[0.05]"
            style={{ background: "var(--emerald)", transform: "translate(-30%, -30%)" }} />
          <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full blur-3xl opacity-[0.04]"
            style={{ background: "var(--coral)", transform: "translate(20%, 20%)" }} />
        </div>
        <div className="container relative z-10 py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_400px] lg:items-center">
            <div>
              <span className="eyebrow">About Marketrix</span>
              <h1 className="mt-5 text-[2.8rem] leading-[1.04] md:text-[4rem]">
                We make research
                <br />
                <span className="gradient-text">easier to trust.</span>
              </h1>
              <p className="mt-6 max-w-xl text-[1rem] leading-relaxed text-[var(--ink-soft)]">
                Marketrix exists for teams that need market clarity without waiting months
                for a consulting cycle. It connects structured founder briefs with vetted
                reports and analysts.
              </p>
            </div>
            <div className="rounded-xl border border-[var(--emerald-border)] bg-[var(--bg-surface)] p-7"
              style={{ boxShadow: "0 0 30px rgba(26,255,156,0.05)" }}>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ background: "var(--emerald-surface)", color: "var(--emerald)" }}>
                  <BadgeCheck size={20} />
                </div>
                <span className="font-semibold text-[var(--ink)]">Our mission</span>
              </div>
              <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
                The product is intentionally practical: a marketplace, a guided brief intake,
                and a dashboard that keeps active research visible and actionable.
              </p>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map(({ value, label }) => (
              <div key={label} className="rounded-xl border border-[var(--line)] bg-[var(--bg-surface)] p-5 text-center">
                <div className="display text-3xl font-bold" style={{ color: "var(--emerald)" }}>{value}</div>
                <p className="mt-1 text-xs text-[var(--ink-muted)]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Origin */}
      <section className="section-pad">
        <div className="container grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <span className="eyebrow">Origin</span>
            <h2 className="mt-5 text-[2.2rem] leading-[1.05] md:text-[3rem]">
              The old way wastes<br />both sides.
            </h2>
          </div>
          <div className="grid gap-5">
            <p className="text-[1rem] leading-[1.9] text-[var(--ink-soft)]">
              A founder spends five figures on a broad market study and uses one chart.
              A great researcher has valuable category work sitting in private folders.
              Both sides are losing time because the buying workflow is too blunt.
            </p>
            <p className="text-[1rem] leading-[1.9] text-[var(--ink-soft)]">
              Marketrix turns that gap into a focused exchange: founders describe the
              decision they need to make, the platform ranks relevant research, and analysts
              can step in where custom context matters.
            </p>
            <div className="mt-2 rounded-xl border border-[var(--line)] bg-[var(--bg-raised)] p-5">
              <div className="flex items-start gap-4">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full" style={{ background: "var(--emerald)" }} />
                <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
                  <strong className="text-[var(--ink)]">The result:</strong>{" "}
                  Faster decisions, better-matched analysts, and evidence that actually gets used.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="section-pad border-y border-[var(--line)]" style={{ background: "var(--bg-raised)" }}>
        <div className="container">
          <div className="mb-12">
            <span className="eyebrow">Principles</span>
            <h2 className="mt-5 text-[2.2rem] leading-[1.05] md:text-[3rem]">
              Professional, not performative.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {principles.map((principle) => {
              const Icon = principle.icon;
              return (
                <article
                  key={principle.title}
                  className="glow-card rounded-xl border border-[var(--line)] bg-[var(--bg-surface)] p-7"
                >
                  <div
                    className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl border"
                    style={{
                      background: `${principle.color}10`,
                      borderColor: `${principle.color}25`,
                      color: principle.color,
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <h3 className="font-sans text-base font-semibold text-[var(--ink)]">{principle.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">{principle.detail}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-pad">
        <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="eyebrow">Team</span>
            <h2 className="mt-5 text-[2.2rem] leading-[1.05] md:text-[3rem]">
              Built by people who read the footnotes.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {team.map(({ name, role, initials }) => (
              <article
                key={name}
                className="glow-card rounded-xl border border-[var(--line)] bg-[var(--bg-raised)] p-5"
              >
                <div
                  className="mono mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold"
                  style={{
                    background: "var(--emerald-surface)",
                    color: "var(--emerald)",
                    border: "1px solid var(--emerald-border)",
                  }}
                >
                  {initials}
                </div>
                <h3 className="font-sans text-base font-semibold text-[var(--ink)]">{name}</h3>
                <p className="mt-1.5 text-sm text-[var(--ink-muted)]">{role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="container">
        <div
          className="relative overflow-hidden rounded-2xl border border-[var(--emerald-border)] p-10 md:p-14"
          style={{
            background: "var(--bg-raised)",
            boxShadow: "0 0 60px rgba(26,255,156,0.06), inset 0 1px 0 rgba(26,255,156,0.1)",
          }}
        >
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full blur-3xl opacity-10 pointer-events-none"
            style={{ background: "var(--emerald)", transform: "translate(25%, -25%)" }} />
          <div className="relative z-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <span className="eyebrow">Next step</span>
              <h2 className="mt-4 text-[2rem] leading-[1.05] text-[var(--ink)] md:text-[2.8rem]">
                Bring us the market question.
              </h2>
            </div>
            <Link href="/submit-brief" className="btn-primary shrink-0">
              Start a brief
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
