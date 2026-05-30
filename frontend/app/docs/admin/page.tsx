"use client";

import AdminPanel from "../components/AdminPanel";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="admin-page">
      <div className="admin-page-bg" />
      <div className="admin-page-grid" />

      <div className="admin-page-wrap">
        {/* Top nav */}
        <div className="admin-page-topnav">
          <Link href="/docs" className="admin-page-back">
            <ArrowLeft size={14} />
            Back to /docs
          </Link>
          <div className="admin-page-title-row">
            <FileText size={16} className="admin-page-icon" />
            <span className="admin-page-title">Docs Admin Panel</span>
          </div>
        </div>

        {/* Panel card */}
        <div className="admin-page-card">
          <AdminPanel />
        </div>

        <p className="admin-page-hint">
          Changes are saved to your browser's localStorage and take effect immediately at{" "}
          <code>/docs</code>. To persist across devices, implement a backend config endpoint.
        </p>
      </div>

      <style>{`
        .admin-page {
          min-height: 100vh;
          background: var(--bg-base);
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 40px 20px;
          position: relative;
          overflow: hidden;
        }
        .admin-page-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(26,255,156,0.04), transparent 60%);
          pointer-events: none;
        }
        .admin-page-grid {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(238,241,236,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(238,241,236,0.02) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }
        .admin-page-wrap {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 520px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .admin-page-topnav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .admin-page-back {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          color: var(--ink-muted);
          text-decoration: none;
          transition: color 180ms;
        }
        .admin-page-back:hover { color: var(--emerald); }
        .admin-page-title-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .admin-page-icon { color: var(--emerald); }
        .admin-page-title {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--ink-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .admin-page-card {
          border: 1px solid var(--line-medium);
          border-radius: 20px;
          background: var(--bg-surface);
          padding: 28px;
          box-shadow: 0 24px 80px rgba(0,0,0,0.4);
        }
        .admin-page-hint {
          font-size: 0.75rem;
          color: var(--ink-muted);
          text-align: center;
          line-height: 1.6;
          margin: 0;
        }
        .admin-page-hint code {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.72rem;
          color: var(--emerald);
          background: var(--emerald-surface);
          padding: 1px 5px;
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
}
