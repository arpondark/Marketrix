"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Check, Clock, FileText, ShieldCheck, Sparkles } from "lucide-react";
import { submitStartupBrief } from "@/lib/api";
import type { Brief } from "@/lib/market-data";

const STORAGE_KEY = "marketrix_briefs";

const stages = ["Idea", "Pre-seed", "Seed", "Series A", "Series B+", "Corporate"];
const industries = ["SaaS", "Healthcare", "FinTech", "Consumer", "EdTech", "AI", "Other"];
const budgets = ["Under $500", "$500 - $1,000", "$1,000 - $5,000", "$5,000+"];
const timelines = ["48 hours", "This week", "This month", "Flexible"];

function listFromText(value: string) {
  return value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function saveBrief(brief: Brief) {
  if (typeof window === "undefined") return;
  const existing = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]") as Brief[];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([brief, ...existing].slice(0, 8)));
  window.dispatchEvent(new Event("marketrix:briefs"));
}

const STEPS = [
  { number: "01", label: "Company context" },
  { number: "02", label: "Research goals" },
  { number: "03", label: "Budget & timing" },
];

export default function SubmitBriefPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [notice, setNotice] = useState("");
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    stage: "",
    targetMarket: "",
    budget: "",
    timeline: "",
    goals: "",
    challenges: "",
  });

  const goals = useMemo(() => listFromText(formData.goals), [formData.goals]);
  const challenges = useMemo(() => listFromText(formData.challenges), [formData.challenges]);

  const stepReady =
    (step === 1 && formData.companyName && formData.industry && formData.stage && formData.targetMarket) ||
    (step === 2 && goals.length > 0 && challenges.length > 0) ||
    (step === 3 && formData.budget && formData.timeline);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setNotice("");
  };

  const persistDemoBrief = (status: string) => {
    const brief: Brief = {
      id: `MX-${Date.now().toString().slice(-5)}`,
      name: formData.companyName,
      industry: formData.industry,
      stage: formData.stage,
      budget: formData.budget,
      status,
      createdAt: "Just now",
      goals,
    };
    saveBrief(brief);
    return brief;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stepReady) {
      setNotice("Complete the required fields in this step to continue.");
      return;
    }

    if (step < 3) {
      setStep((value) => value + 1);
      return;
    }

    setIsSubmitting(true);
    setNotice("");

    try {
      await submitStartupBrief({
        name: formData.companyName,
        industry: formData.industry,
        stage: formData.stage,
        geography: formData.targetMarket,
        budget: formData.budget,
        goals,
        problems: challenges,
      });
      persistDemoBrief("Submitted");
      setSubmitted(true);
    } catch {
      persistDemoBrief("Saved locally");
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--bg-base)" }}>
        <div className="w-full max-w-lg text-center">
          <div
            className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full"
            style={{ background: "var(--emerald-surface)", border: "2px solid var(--emerald-border)" }}
          >
            <Check size={28} style={{ color: "var(--emerald)" }} />
          </div>
          <h1 className="text-[2.5rem] leading-[1.05] text-[var(--ink)]">Brief submitted!</h1>
          <p className="mt-4 text-[var(--ink-soft)]">
            Your research brief has been saved. Head to the dashboard to track progress.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a href="/dashboard" className="btn-primary">
              View dashboard
              <ArrowRight size={16} />
            </a>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => { setSubmitted(false); setStep(1); setFormData({ companyName: "", industry: "", stage: "", targetMarket: "", budget: "", timeline: "", goals: "", challenges: "" }); }}
            >
              Submit another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20" style={{ background: "var(--bg-base)" }}>

      {/* Page header */}
      <section className="border-b border-[var(--line)] relative overflow-hidden" style={{ background: "var(--bg-raised)" }}>
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full blur-3xl opacity-[0.05] pointer-events-none"
          style={{ background: "var(--emerald)", transform: "translate(25%, -25%)" }} />
        <div className="container relative z-10 py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <span className="eyebrow">Research brief</span>
              <h1 className="mt-5 text-[2.8rem] leading-[1.04] md:text-[4rem]">
                Give the research desk
                <br />
                <span className="gradient-text">a clean signal.</span>
              </h1>
              <p className="mt-5 max-w-xl text-[1rem] leading-relaxed text-[var(--ink-soft)]">
                A guided intake keeps the marketplace useful: fewer vague requests, better
                analyst matches, and clearer report recommendations.
              </p>
            </div>
            <div className="rounded-xl border border-[var(--line)] bg-[var(--bg-surface)] p-6">
              <div className="grid gap-4">
                {[
                  { icon: FileText, label: "Structured 3-step intake", color: "var(--emerald)" },
                  { icon: Sparkles, label: "AI-ready matching data", color: "var(--gold)" },
                  { icon: ShieldCheck, label: "Local demo fallback", color: "var(--coral)" },
                ].map(({ icon: Icon, label, color }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                      style={{ background: `${color}10`, color }}
                    >
                      <Icon size={16} />
                    </div>
                    <span className="text-sm font-medium text-[var(--ink-soft)]">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form area */}
      <section className="container grid gap-6 py-10 lg:grid-cols-[260px_1fr]">

        {/* Step sidebar */}
        <aside className="h-fit lg:sticky lg:top-24">
          <div className="rounded-xl border border-[var(--line)] bg-[var(--bg-raised)] p-4 grid gap-2">
            {STEPS.map(({ number, label }, index) => {
              const current = index + 1;
              const isPast = step > current;
              const isActive = step === current;
              return (
                <button
                  key={number}
                  type="button"
                  className="flex items-center gap-4 rounded-lg px-4 py-3 text-left transition-all"
                  style={{
                    border: `1px solid ${isActive ? "var(--emerald-border)" : "var(--line)"}`,
                    background: isActive ? "var(--emerald-surface)" : "transparent",
                  }}
                  onClick={() => setStep(current)}
                >
                  <div
                    className="mono flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[0.65rem] font-bold"
                    style={{
                      background: isPast ? "var(--emerald)" : isActive ? "var(--emerald-surface)" : "var(--bg-elevated)",
                      color: isPast ? "var(--bg-base)" : isActive ? "var(--emerald)" : "var(--ink-muted)",
                      border: `1px solid ${isActive ? "var(--emerald-border)" : "var(--line)"}`,
                    }}
                  >
                    {isPast ? <Check size={12} /> : number}
                  </div>
                  <span
                    className="text-sm font-medium"
                    style={{ color: isActive ? "var(--emerald)" : "var(--ink-soft)" }}
                  >
                    {label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Progress */}
          <div className="mt-4 rounded-xl border border-[var(--line)] bg-[var(--bg-raised)] p-4">
            <div className="mono mb-2 flex justify-between text-[0.62rem] font-medium uppercase tracking-wider text-[var(--ink-muted)]">
              <span>Progress</span>
              <span style={{ color: "var(--emerald)" }}>{Math.round((step / 3) * 100)}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }} />
            </div>
          </div>
        </aside>

        {/* Main form */}
        <form onSubmit={handleSubmit} className="rounded-xl border border-[var(--line)] bg-[var(--bg-raised)] p-6 md:p-8">

          {/* Step 1: Company context */}
          {step === 1 && (
            <div className="grid gap-6">
              <div>
                <span className="eyebrow">Step 01</span>
                <h2 className="mt-4 text-[2rem] leading-[1.05]">Company context</h2>
                <p className="mt-2 text-sm text-[var(--ink-soft)]">
                  Tell us about your company and where you operate.
                </p>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-[var(--ink)]">
                    Company name <span style={{ color: "var(--coral)" }}>*</span>
                  </span>
                  <input
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="input-base"
                    placeholder="Northstar AI"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-[var(--ink)]">
                    Target market <span style={{ color: "var(--coral)" }}>*</span>
                  </span>
                  <input
                    name="targetMarket"
                    value={formData.targetMarket}
                    onChange={handleInputChange}
                    className="input-base"
                    placeholder="US enterprise finance teams"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-[var(--ink)]">
                    Industry <span style={{ color: "var(--coral)" }}>*</span>
                  </span>
                  <div className="relative">
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="select-base appearance-none"
                    >
                      <option value="">Select industry</option>
                      {industries.map((industry) => (
                        <option key={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-[var(--ink)]">
                    Stage <span style={{ color: "var(--coral)" }}>*</span>
                  </span>
                  <div className="relative">
                    <select
                      name="stage"
                      value={formData.stage}
                      onChange={handleInputChange}
                      className="select-base appearance-none"
                    >
                      <option value="">Select stage</option>
                      {stages.map((stage) => (
                        <option key={stage}>{stage}</option>
                      ))}
                    </select>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Step 2: Research goals */}
          {step === 2 && (
            <div className="grid gap-6">
              <div>
                <span className="eyebrow">Step 02</span>
                <h2 className="mt-4 text-[2rem] leading-[1.05]">Research goals</h2>
                <p className="mt-2 text-sm text-[var(--ink-soft)]">
                  What should this research answer? Separate items with commas or new lines.
                </p>
              </div>
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-[var(--ink)]">
                  What should this research answer? <span style={{ color: "var(--coral)" }}>*</span>
                </span>
                <textarea
                  name="goals"
                  value={formData.goals}
                  onChange={handleInputChange}
                  className="textarea-base"
                  placeholder="Rank the best wedge markets, benchmark pricing, validate budget owner"
                />
                {goals.length > 0 && (
                  <p className="mono text-xs" style={{ color: "var(--emerald)" }}>
                    {goals.length} goal{goals.length > 1 ? "s" : ""} detected
                  </p>
                )}
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-[var(--ink)]">
                  Known risks or open questions <span style={{ color: "var(--coral)" }}>*</span>
                </span>
                <textarea
                  name="challenges"
                  value={formData.challenges}
                  onChange={handleInputChange}
                  className="textarea-base"
                  placeholder="Competitor noise, uncertain buyer urgency, unclear procurement path"
                />
                {challenges.length > 0 && (
                  <p className="mono text-xs" style={{ color: "var(--gold)" }}>
                    {challenges.length} risk{challenges.length > 1 ? "s" : ""} flagged
                  </p>
                )}
              </label>
            </div>
          )}

          {/* Step 3: Budget & timing */}
          {step === 3 && (
            <div className="grid gap-6">
              <div>
                <span className="eyebrow">Step 03</span>
                <h2 className="mt-4 text-[2rem] leading-[1.05]">Budget & timing</h2>
                <p className="mt-2 text-sm text-[var(--ink-soft)]">
                  Help us match you with appropriately priced research options.
                </p>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-[var(--ink)]">
                    Budget <span style={{ color: "var(--coral)" }}>*</span>
                  </span>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="select-base appearance-none"
                  >
                    <option value="">Select budget</option>
                    {budgets.map((budgetOption) => (
                      <option key={budgetOption}>{budgetOption}</option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-[var(--ink)]">
                    Timeline <span style={{ color: "var(--coral)" }}>*</span>
                  </span>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="select-base appearance-none"
                  >
                    <option value="">Select timeline</option>
                    {timelines.map((timeline) => (
                      <option key={timeline}>{timeline}</option>
                    ))}
                  </select>
                </label>
              </div>

              {/* Brief summary */}
              <div className="rounded-xl border border-[var(--line)] bg-[var(--bg-surface)] p-5">
                <h3 className="mono mb-4 text-[0.65rem] font-medium uppercase tracking-widest text-[var(--ink-muted)]">
                  Brief summary
                </h3>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { label: "Company", value: formData.companyName || "—" },
                    { label: "Goals", value: goals.length > 0 ? `${goals.length} items` : "—" },
                    { label: "Risks", value: challenges.length > 0 ? `${challenges.length} items` : "—" },
                    { label: "Industry", value: formData.industry || "—" },
                    { label: "Budget", value: formData.budget || "—" },
                    { label: "Timeline", value: formData.timeline || "—" },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="mono text-[0.6rem] font-medium uppercase tracking-wider text-[var(--ink-muted)]">{label}</p>
                      <p className="mt-1 text-sm font-medium text-[var(--ink)]">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Notice */}
          {notice && (
            <div
              className="mt-6 flex items-start gap-3 rounded-lg border p-4 text-sm font-medium"
              style={{
                borderColor: "var(--emerald-border)",
                background: "var(--emerald-surface)",
                color: "var(--emerald)",
              }}
            >
              <Clock size={16} className="mt-0.5 shrink-0" />
              {notice}
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex flex-col gap-3 border-t border-[var(--line)] pt-6 sm:flex-row">
            {step > 1 && (
              <button
                type="button"
                className="btn-secondary flex-1"
                onClick={() => setStep((v) => v - 1)}
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className="btn-primary flex-1"
              disabled={isSubmitting || !stepReady}
            >
              {step === 3
                ? isSubmitting
                  ? "Submitting..."
                  : "Submit brief"
                : "Continue"}
              {step === 3 ? <Check size={16} /> : <ArrowRight size={16} />}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
