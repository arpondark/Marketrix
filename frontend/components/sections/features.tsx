"use client";

import { BadgeCheck, Bot, Database, PanelRight, ShieldCheck, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "Brief-to-signal matching",
    description:
      "Structured intake parses market, stage, geography, budget, and urgency into a ranked research map.",
    accent: "var(--emerald)",
    accentBg: "var(--emerald-surface)",
  },
  {
    icon: Database,
    title: "Curated research inventory",
    description:
      "Reports are normalized by category, price, evidence depth, outcomes, and analyst fit.",
    accent: "var(--gold)",
    accentBg: "var(--gold-surface)",
  },
  {
    icon: PanelRight,
    title: "Decision workspace",
    description:
      "Shortlist reports, compare match scores, and keep active briefs visible from the dashboard.",
    accent: "var(--coral)",
    accentBg: "var(--coral-surface)",
  },
  {
    icon: ShieldCheck,
    title: "Founder-safe workflow",
    description:
      "No hidden consulting retainer. Start small, preview outcomes, then commit when the signal is right.",
    accent: "var(--emerald)",
    accentBg: "var(--emerald-surface)",
  },
  {
    icon: TrendingUp,
    title: "Commercial context",
    description:
      "Every recommendation ties back to pricing, buyer urgency, route to market, or risk reduction.",
    accent: "var(--gold)",
    accentBg: "var(--gold-surface)",
  },
  {
    icon: BadgeCheck,
    title: "Verified analysts",
    description:
      "Expert profiles include specialty, response time, rating, and matching context for custom work.",
    accent: "var(--coral)",
    accentBg: "var(--coral-surface)",
  },
];

export default function FeaturesSection() {
  return (
    <section className="section-pad relative overflow-hidden" style={{ background: "var(--bg-base)" }}>
      {/* Subtle background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full blur-3xl opacity-5"
          style={{ background: "var(--emerald)" }}
        />
      </div>

      <div className="container relative z-10">
        {/* Section header */}
        <div className="mb-14 grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <span className="eyebrow">What changes</span>
            <h2 className="mt-5 text-[2.5rem] leading-[1.05] md:text-[3.4rem]">
              Research that behaves<br />like a{" "}
              <span className="gradient-text">workflow.</span>
            </h2>
          </div>
          <p className="text-[1.05rem] leading-relaxed text-[var(--ink-soft)] lg:max-w-xl">
            The redesign makes Marketrix feel like a working product: searchable reports,
            guided intake, persistent demo briefs, and a dashboard that reacts to what you do.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                className="glow-card quiet-surface p-6"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {/* Icon */}
                <div
                  className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl border"
                  style={{
                    background: feature.accentBg,
                    borderColor: "var(--line-medium)",
                    color: feature.accent,
                  }}
                >
                  <Icon size={20} />
                </div>

                {/* Number */}
                <div className="mono text-[0.62rem] font-medium uppercase tracking-widest text-[var(--ink-muted)] mb-3">
                  0{index + 1}
                </div>

                <h3
                  className="font-sans text-[1.05rem] font-semibold leading-snug text-[var(--ink)]"
                >
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
