"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X, Zap } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/submit-brief", label: "Submit Brief" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/about", label: "About" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[var(--line)] bg-[rgba(8,12,10,0.92)] backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="container flex min-h-[72px] items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group" onClick={() => setIsOpen(false)}>
          <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--emerald)] text-[var(--bg-base)] shadow-[0_0_20px_rgba(26,255,156,0.3)] transition-all duration-200 group-hover:shadow-[0_0_30px_rgba(26,255,156,0.5)]">
            <Zap size={18} strokeWidth={2.5} />
          </span>
          <span className="leading-none">
            <span className="block text-[1.05rem] font-bold tracking-tight text-[var(--ink)]">
              Marketrix
            </span>
            <span className="mono text-[0.6rem] font-medium uppercase text-[var(--ink-muted)] tracking-widest">
              Signal desk
            </span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-1 rounded-full border border-[var(--line)] bg-[var(--bg-raised)] p-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={isActive(link.href) ? "nav-pill-active" : "nav-pill"}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA buttons */}
        <div className="hidden items-center gap-2 md:flex">
          <Link href="/dashboard" className="btn-ghost text-sm">
            Log in
          </Link>
          <Link href="/submit-brief" className="btn-primary text-sm">
            Start brief
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--line-medium)] bg-[var(--bg-surface)] text-[var(--ink)] transition-colors hover:border-[var(--line-strong)] md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="border-t border-[var(--line)] bg-[rgba(8,12,10,0.98)] backdrop-blur-xl md:hidden mobile-menu-enter">
          <div className="container py-5">
            <div className="grid gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                    isActive(link.href)
                      ? "bg-[var(--emerald-surface)] border border-[var(--emerald-border)] text-[var(--emerald)]"
                      : "text-[var(--ink-soft)] hover:bg-[var(--bg-elevated)] hover:text-[var(--ink)]"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex gap-2 border-t border-[var(--line)] pt-4">
              <Link href="/dashboard" className="btn-secondary flex-1 text-sm" onClick={() => setIsOpen(false)}>
                Log in
              </Link>
              <Link href="/submit-brief" className="btn-primary flex-1 text-sm" onClick={() => setIsOpen(false)}>
                Start brief
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
