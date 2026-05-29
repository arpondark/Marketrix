"use client";

import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";


const Twitter = ({ size = 24 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const sections = [
  {
    title: "Product",
    links: [
      { label: "Marketplace", href: "/marketplace" },
      { label: "Submit a brief", href: "/submit-brief" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Analyst network", href: "/marketplace" },
      { label: "Research desk", href: "/dashboard" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/" },
      { label: "Terms of service", href: "/" },
      { label: "Cookie settings", href: "/" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--bg-raised)] relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[var(--emerald)] opacity-[0.03] blur-3xl pointer-events-none rounded-full" />

      <div className="container py-16 relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div>
            <Link href="/" className="mb-6 inline-flex items-center gap-3 group">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--emerald)] text-[var(--bg-base)] shadow-[0_0_16px_rgba(26,255,156,0.25)] transition-all group-hover:shadow-[0_0_24px_rgba(26,255,156,0.4)]">
                <Zap size={17} strokeWidth={2.5} />
              </span>
              <span>
                <span className="block font-bold text-[var(--ink)]">Marketrix</span>
                <span className="mono text-[0.6rem] font-medium uppercase text-[var(--ink-muted)] tracking-widest">
                  Signal desk
                </span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-[var(--ink-muted)]">
              Marketrix gives founders a focused path from messy research questions to ranked reports,
              analyst matches, and board-ready evidence.
            </p>
            <Link
              href="/submit-brief"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--emerald)] hover:text-[var(--emerald-dim)] transition-colors"
            >
              Start a research brief
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Link sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 font-sans text-[0.78rem] font-bold uppercase tracking-widest text-[var(--ink-muted)]">
                {section.title}
              </h3>
              <div className="grid gap-3">
                {section.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-4 border-t border-[var(--line)] pt-7 text-sm text-[var(--ink-muted)] md:flex-row md:items-center md:justify-between">
          <span>© 2026 Marketrix. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--bg-surface)] text-[var(--ink-muted)] transition-all hover:border-[var(--line-medium)] hover:text-[var(--ink)]"
              aria-label="Twitter"
            >
              <Twitter size={14} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--bg-surface)] text-[var(--ink-muted)] transition-all hover:border-[var(--line-medium)] hover:text-[var(--ink)]"
              aria-label="GitHub"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
