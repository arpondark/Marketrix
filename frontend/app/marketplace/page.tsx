"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Bookmark,
  Check,
  ChevronDown,
  CircleDollarSign,
  Filter,
  Search,
  Star,
  X,
} from "lucide-react";
import { budgetOptions, categories, reports, type ResearchReport } from "@/lib/market-data";

const tierClass: Record<ResearchReport["tier"], string> = {
  Flagship: "tag-coral",
  Standard: "tag-emerald",
  Starter: "tag-gold",
};

function inBudget(report: ResearchReport, budget: string) {
  if (budget === "Under $200") return report.price < 200;
  if (budget === "$200 - $300") return report.price >= 200 && report.price <= 300;
  if (budget === "$300+") return report.price > 300;
  return true;
}

export default function Marketplace() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [budget, setBudget] = useState("Any budget");
  const [sort, setSort] = useState("Best match");
  const [visibleCount, setVisibleCount] = useState(6);
  const [previewId, setPreviewId] = useState(reports[0].id);
  const [shortlist, setShortlist] = useState<number[]>([]);

  const filteredReports = useMemo(() => {
    const value = query.trim().toLowerCase();
    const matches = reports.filter((report) => {
      const matchesQuery =
        !value ||
        [report.title, report.author, report.category, report.description, ...report.tags]
          .join(" ")
          .toLowerCase()
          .includes(value);
      const matchesCategory = selectedCategory === "All" || report.category === selectedCategory;
      return matchesQuery && matchesCategory && inBudget(report, budget);
    });

    return matches.sort((a, b) => {
      if (sort === "Lowest price") return a.price - b.price;
      if (sort === "Highest rating") return b.rating - a.rating;
      return b.match - a.match;
    });
  }, [budget, query, selectedCategory, sort]);

  const preview = filteredReports.find((r) => r.id === previewId) ?? filteredReports[0];

  const toggleShortlist = (id: number) => {
    setShortlist((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const resetFilters = () => {
    setQuery("");
    setSelectedCategory("All");
    setBudget("Any budget");
    setSort("Best match");
  };

  const hasFilters = query || selectedCategory !== "All" || budget !== "Any budget" || sort !== "Best match";

  return (
    <div className="min-h-screen pb-20" style={{ background: "var(--bg-base)" }}>

      {/* Page header */}
      <section className="border-b border-[var(--line)] relative overflow-hidden" style={{ background: "var(--bg-raised)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full blur-3xl opacity-[0.06]"
            style={{ background: "var(--emerald)", transform: "translate(20%, -20%)" }} />
        </div>
        <div className="container relative z-10 py-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <span className="eyebrow">Research marketplace</span>
              <h1 className="mt-5 text-[2.8rem] leading-[1.04] md:text-[4rem]">
                Buy signal,{" "}
                <span className="gradient-text">not shelfware.</span>
              </h1>
              <p className="mt-5 max-w-xl text-[1rem] leading-relaxed text-[var(--ink-soft)]">
                Search vetted research by category, price, delivery, and fit.
                Preview outcomes before you shortlist or buy.
              </p>
            </div>

            <div className="flex gap-4">
              <div className="rounded-xl border border-[var(--line)] bg-[var(--bg-surface)] p-5 text-center min-w-[110px]">
                <p className="mono text-[0.62rem] font-medium uppercase tracking-widest text-[var(--ink-muted)]">Reports</p>
                <div className="display mt-2 text-3xl font-bold text-[var(--ink)]">{reports.length}</div>
              </div>
              <div className="rounded-xl border border-[var(--emerald-border)] bg-[var(--emerald-surface)] p-5 text-center min-w-[110px]">
                <p className="mono text-[0.62rem] font-medium uppercase tracking-widest text-[var(--emerald)]">Shortlist</p>
                <div className="display mt-2 text-3xl font-bold text-[var(--emerald)]">{shortlist.length}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="container py-6">
        <div className="rounded-xl border border-[var(--line)] bg-[var(--bg-raised)] p-4">
          <div className="grid gap-3 lg:grid-cols-[1fr_200px_200px_auto]">
            {/* Search */}
            <label className="relative block">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2"
                size={16}
                style={{ color: "var(--ink-muted)" }}
              />
              <input
                id="marketplace-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search reports, analysts, tags..."
                className="input-base input-icon"
              />
              {query && (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[var(--ink-muted)] hover:text-[var(--ink)]"
                  onClick={() => setQuery("")}
                >
                  <X size={14} />
                </button>
              )}
            </label>

            {/* Budget filter */}
            <label className="relative block">
              <Filter
                className="absolute left-4 top-1/2 -translate-y-1/2"
                size={15}
                style={{ color: "var(--ink-muted)" }}
              />
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="select-base input-icon appearance-none"
              >
                {budgetOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                size={15}
                style={{ color: "var(--ink-muted)" }}
              />
            </label>

            {/* Sort */}
            <label className="relative block">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="select-base appearance-none"
              >
                {["Best match", "Highest rating", "Lowest price"].map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                size={15}
                style={{ color: "var(--ink-muted)" }}
              />
            </label>

            <button
              type="button"
              className={`btn-secondary ${hasFilters ? "border-[var(--emerald-border)] text-[var(--emerald)]" : ""}`}
              onClick={resetFilters}
              disabled={!hasFilters}
            >
              Reset
            </button>
          </div>

          {/* Category pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`tag transition-all hover:scale-105 ${selectedCategory === category ? "tag-emerald" : ""}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Reports + Preview */}
      <section className="container grid gap-6 lg:grid-cols-[1fr_380px]">
        {/* Reports list */}
        <div className="grid gap-4 h-fit">
          {/* Results count */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-[var(--ink-muted)]">
              <span className="font-semibold text-[var(--ink)]">{filteredReports.length}</span> reports found
            </p>
          </div>

          {filteredReports.slice(0, visibleCount).map((report) => {
            const isShortlisted = shortlist.includes(report.id);
            const isSelected = preview?.id === report.id;
            return (
              <article
                key={report.id}
                className={`rounded-xl border p-5 transition-all cursor-pointer hover:-translate-y-0.5 ${
                  isSelected
                    ? "border-[var(--emerald-border)] bg-[var(--emerald-surface)] shadow-[0_0_20px_rgba(26,255,156,0.08)]"
                    : "border-[var(--line)] bg-[var(--bg-raised)] hover:border-[var(--line-medium)]"
                }`}
                onClick={() => setPreviewId(report.id)}
              >
                <div className="grid gap-5 md:grid-cols-[1fr_auto]">
                  <div>
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      <span className={`tag ${tierClass[report.tier]}`}>{report.tier}</span>
                      <span className="tag">{report.category}</span>
                      <span className="tag">{report.delivery}</span>
                    </div>
                    <h2 className="font-sans text-[1.15rem] font-semibold leading-snug text-[var(--ink)]">
                      {report.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                      {report.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {report.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex min-w-[180px] flex-col justify-between gap-4 border-t border-[var(--line)] pt-4 md:border-l md:border-t-0 md:pl-5 md:pt-0">
                    <div>
                      <div className="flex items-center gap-2">
                        <Star size={14} fill="var(--gold)" className="text-[var(--gold)]" />
                        <span className="font-semibold text-[var(--ink)]">{report.rating}</span>
                        <span className="text-xs text-[var(--ink-muted)]">({report.reviews})</span>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <CircleDollarSign size={16} style={{ color: "var(--emerald)" }} />
                        <span className="text-2xl font-bold text-[var(--ink)]">${report.price}</span>
                      </div>
                      <p className="mt-1.5 text-xs text-[var(--ink-muted)]">{report.match}% match</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="btn-secondary flex-1 text-sm"
                        onClick={(e) => { e.stopPropagation(); setPreviewId(report.id); }}
                      >
                        Preview
                      </button>
                      <button
                        type="button"
                        className={`btn-secondary w-11 shrink-0 p-0 transition-all ${
                          isShortlisted ? "border-[var(--emerald-border)] bg-[var(--emerald-surface)] text-[var(--emerald)]" : ""
                        }`}
                        aria-label={isShortlisted ? "Remove from shortlist" : "Add to shortlist"}
                        onClick={(e) => { e.stopPropagation(); toggleShortlist(report.id); }}
                      >
                        {isShortlisted ? <Check size={16} /> : <Bookmark size={16} />}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}

          {filteredReports.length === 0 && (
            <div className="rounded-xl border border-[var(--line)] bg-[var(--bg-raised)] p-12 text-center">
              <Search size={32} className="mx-auto mb-4 text-[var(--ink-muted)]" />
              <h2 className="font-sans text-xl font-semibold text-[var(--ink)]">No reports match those filters.</h2>
              <p className="mt-3 text-sm text-[var(--ink-soft)]">Reset the filters or try a broader search term.</p>
              <button type="button" className="btn-primary mt-6" onClick={resetFilters}>Reset filters</button>
            </div>
          )}

          {visibleCount < filteredReports.length && (
            <button
              type="button"
              className="btn-secondary justify-self-center px-10"
              onClick={() => setVisibleCount((c) => c + 3)}
            >
              Load more reports
            </button>
          )}
        </div>

        {/* Preview panel */}
        <aside className="surface h-fit p-6 lg:sticky lg:top-24">
          {preview ? (
            <>
              <div className="mb-5">
                <span className="eyebrow text-xs">Preview</span>
                <h2 className="mt-4 font-sans text-xl font-semibold leading-snug text-[var(--ink)]">
                  {preview.title}
                </h2>
              </div>

              {/* Match score */}
              <div className="mb-5 flex items-center gap-3">
                <div className="flex-1">
                  <div className="mb-1 flex justify-between text-xs text-[var(--ink-muted)]">
                    <span>Match score</span>
                    <span className="font-semibold text-[var(--emerald)]">{preview.match}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${preview.match}%` }} />
                  </div>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-[var(--ink-soft)]">{preview.description}</p>

              <div className="my-6 h-px bg-[var(--line)]" />

              <h3 className="mono mb-4 text-[0.65rem] font-semibold uppercase tracking-widest text-[var(--ink-muted)]">
                Expected outcomes
              </h3>
              <div className="grid gap-3">
                {preview.outcomes.map((outcome) => (
                  <div key={outcome} className="flex items-start gap-3 text-sm">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{ background: "var(--emerald-surface)", color: "var(--emerald)" }}>
                      <Check size={12} />
                    </div>
                    <span className="text-[var(--ink-soft)]">{outcome}</span>
                  </div>
                ))}
              </div>

              <div className="my-6 h-px bg-[var(--line)]" />

              <div className="flex items-center justify-between text-sm">
                <div>
                  <p className="text-[var(--ink-muted)]">Analyst</p>
                  <p className="mt-1 font-semibold text-[var(--ink)]">{preview.author}</p>
                </div>
                <div className="text-right">
                  <p className="text-[var(--ink-muted)]">Price</p>
                  <p className="mt-1 text-xl font-bold text-[var(--ink)]">${preview.price}</p>
                </div>
              </div>

              <button
                type="button"
                className="btn-primary mt-6 w-full"
                onClick={() => toggleShortlist(preview.id)}
              >
                {shortlist.includes(preview.id) ? (
                  <>
                    <Check size={16} />
                    Shortlisted
                  </>
                ) : (
                  <>
                    Add to shortlist
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </>
          ) : (
            <div className="py-8 text-center">
              <p className="text-sm text-[var(--ink-muted)]">Select a report to preview outcomes.</p>
            </div>
          )}
        </aside>
      </section>
    </div>
  );
}
