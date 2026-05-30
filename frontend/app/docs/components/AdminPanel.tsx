"use client";

import { useState, useEffect } from "react";
import {
  DocsConfig,
  getDocsConfig,
  saveDocsConfig,
  evaluateAccess,
  formatDateForInput,
  formatDisplayDate,
  verifyAdminPassword,
} from "../lib/docsConfig";
import { Shield, Check, X, Clock, Power, AlertTriangle, Eye } from "lucide-react";

export default function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState(false);
  const [config, setConfig] = useState<DocsConfig | null>(null);
  const [saved, setSaved] = useState(false);

  // Load config after auth
  const handleLogin = () => {
    if (verifyAdminPassword(pwInput)) {
      setAuthed(true);
      setConfig(getDocsConfig());
    } else {
      setPwError(true);
      setTimeout(() => setPwError(false), 2000);
    }
  };

  const handleSave = () => {
    if (!config) return;
    saveDocsConfig(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addDuration = (days: number) => {
    if (!config) return;
    const start = new Date();
    const end = new Date(start.getTime() + days * 24 * 60 * 60 * 1000);
    setConfig({
      ...config,
      startDate: start.toISOString().slice(0, 19),
      endDate: end.toISOString().slice(0, 19),
      isEnabled: true,
    });
  };

  const resetToDefault = () => {
    setConfig({
      isEnabled: true,
      startDate: "2026-06-10T00:00:00",
      endDate: "2026-06-14T23:59:59",
      adminPassword: config?.adminPassword ?? "marketrix2026",
      lastModified: new Date().toISOString(),
    });
  };

  const currentStatus = config ? evaluateAccess(config) : "unknown";

  if (!authed) {
    return (
      <div className="admin-auth">
        <div className="admin-auth-card">
          <div className="admin-auth-icon">
            <Shield size={24} />
          </div>
          <h2 className="admin-auth-title">Admin Access</h2>
          <p className="admin-auth-desc">Enter admin password to manage documentation visibility</p>
          <div className="admin-auth-input-wrap">
            <input
              type="password"
              className={`admin-auth-input ${pwError ? "admin-auth-input--error" : ""}`}
              placeholder="Admin password"
              value={pwInput}
              onChange={(e) => setPwInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleLogin(); }}
              autoFocus
            />
            {pwError && (
              <div className="admin-auth-error">
                <AlertTriangle size={13} /> Incorrect password
              </div>
            )}
          </div>
          <button className="admin-auth-btn" onClick={handleLogin}>
            Unlock Panel
          </button>
        </div>
        <style>{STYLES}</style>
      </div>
    );
  }

  if (!config) return null;

  return (
    <div className="admin-panel">
      {/* Status */}
      <div className="admin-status-bar">
        <div className={`admin-status-indicator ${currentStatus === "accessible" ? "admin-status--live" : "admin-status--off"}`}>
          <span className="admin-status-dot" />
          {currentStatus === "accessible" && "LIVE — Publicly Accessible"}
          {currentStatus === "disabled" && "DISABLED — Hidden from public"}
          {currentStatus === "before_window" && "SCHEDULED — Not yet open"}
          {currentStatus === "after_window" && "CLOSED — Window ended"}
          {currentStatus === "unknown" && "UNKNOWN"}
        </div>
        <a href="/docs" target="_blank" className="admin-preview-link">
          <Eye size={13} /> Preview /docs
        </a>
      </div>

      {/* Master toggle */}
      <div className="admin-section">
        <label className="admin-section-label">
          <Power size={14} /> Master Visibility
        </label>
        <div className="admin-toggle-row">
          <button
            className={`admin-toggle-btn ${config.isEnabled ? "admin-toggle-btn--on" : ""}`}
            onClick={() => setConfig({ ...config, isEnabled: !config.isEnabled })}
          >
            <span className="admin-toggle-thumb" />
          </button>
          <span className="admin-toggle-label">
            {config.isEnabled ? "Enabled — schedule will apply" : "Disabled — always hidden"}
          </span>
        </div>
      </div>

      {/* Schedule */}
      <div className="admin-section">
        <label className="admin-section-label">
          <Clock size={14} /> Schedule Window
        </label>
        <div className="admin-date-grid">
          <div className="admin-date-field">
            <span className="admin-date-sublabel">Start</span>
            <input
              type="datetime-local"
              className="admin-date-input"
              value={formatDateForInput(config.startDate)}
              onChange={(e) =>
                setConfig({ ...config, startDate: e.target.value + ":00" })
              }
            />
          </div>
          <div className="admin-date-field">
            <span className="admin-date-sublabel">End</span>
            <input
              type="datetime-local"
              className="admin-date-input"
              value={formatDateForInput(config.endDate)}
              onChange={(e) =>
                setConfig({ ...config, endDate: e.target.value + ":00" })
              }
            />
          </div>
        </div>

        {/* Quick duration */}
        <div className="admin-duration-row">
          <span className="admin-duration-label">Quick set from now:</span>
          {[1, 3, 5, 7].map((d) => (
            <button key={d} className="admin-duration-btn" onClick={() => addDuration(d)}>
              +{d}d
            </button>
          ))}
        </div>
      </div>

      {/* Info row */}
      <div className="admin-info-row">
        <span className="admin-info-item">
          Start: <strong>{formatDisplayDate(config.startDate)}</strong>
        </span>
        <span className="admin-info-item">
          End: <strong>{formatDisplayDate(config.endDate)}</strong>
        </span>
      </div>

      {/* Actions */}
      <div className="admin-actions">
        <button className="admin-reset-btn" onClick={resetToDefault}>
          Reset to default (Jun 10–14)
        </button>
        <button className="admin-save-btn" onClick={handleSave}>
          {saved ? <><Check size={14} /> Saved!</> : "Save Changes"}
        </button>
      </div>

      {config.lastModified && (
        <p className="admin-last-saved">
          Last saved: {formatDisplayDate(config.lastModified)}
        </p>
      )}

      <style>{STYLES}</style>
    </div>
  );
}

const STYLES = `
  .admin-auth {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: var(--bg-base);
    padding: 24px;
  }
  .admin-auth-card {
    width: 100%;
    max-width: 400px;
    border: 1px solid var(--line-medium);
    border-radius: 20px;
    background: var(--bg-surface);
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    text-align: center;
  }
  .admin-auth-icon {
    width: 60px; height: 60px;
    border-radius: 16px;
    background: var(--emerald-surface);
    border: 1px solid var(--emerald-border);
    color: var(--emerald);
    display: flex; align-items: center; justify-content: center;
  }
  .admin-auth-title {
    font-family: var(--font-playfair), Georgia, serif;
    font-size: 1.5rem;
    font-weight: 500;
    color: var(--ink);
    margin: 0;
  }
  .admin-auth-desc {
    color: var(--ink-muted);
    font-size: 0.88rem;
    margin: 0;
  }
  .admin-auth-input-wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .admin-auth-input {
    width: 100%;
    padding: 12px 16px;
    border-radius: 10px;
    border: 1px solid var(--line-medium);
    background: var(--bg-raised);
    color: var(--ink);
    font-size: 0.9rem;
    outline: none;
    transition: border-color 180ms;
  }
  .admin-auth-input:focus { border-color: var(--emerald); }
  .admin-auth-input--error { border-color: var(--coral) !important; }
  .admin-auth-error {
    display: flex;
    align-items: center;
    gap: 5px;
    color: var(--coral);
    font-size: 0.78rem;
  }
  .admin-auth-btn {
    width: 100%;
    padding: 12px;
    border-radius: 10px;
    border: 1px solid var(--emerald);
    background: var(--emerald);
    color: var(--bg-base);
    font-weight: 700;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 200ms;
  }
  .admin-auth-btn:hover { background: var(--emerald-dim); }

  /* Panel */
  .admin-panel {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .admin-status-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    border-radius: 10px;
    border: 1px solid var(--line);
    background: var(--bg-raised);
    gap: 12px;
  }
  .admin-status-indicator {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.75rem;
    font-weight: 700;
    font-family: var(--font-jetbrains), monospace;
    letter-spacing: 0.06em;
  }
  .admin-status--live { color: var(--emerald); }
  .admin-status--off { color: var(--coral); }
  .admin-status-dot {
    width: 7px; height: 7px;
    border-radius: 999px;
    background: currentColor;
    animation: pulse-dot 2s ease-in-out infinite;
  }
  .admin-preview-link {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.75rem;
    color: var(--ink-muted);
    text-decoration: none;
    padding: 4px 8px;
    border-radius: 6px;
    border: 1px solid var(--line);
    transition: all 180ms;
  }
  .admin-preview-link:hover { color: var(--ink); border-color: var(--line-medium); }

  .admin-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .admin-section-label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--ink-muted);
  }

  /* Toggle */
  .admin-toggle-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .admin-toggle-btn {
    position: relative;
    width: 44px; height: 24px;
    border-radius: 999px;
    border: 1px solid var(--line-medium);
    background: var(--bg-elevated);
    cursor: pointer;
    transition: all 200ms;
    flex-shrink: 0;
  }
  .admin-toggle-btn--on {
    background: var(--emerald);
    border-color: var(--emerald);
  }
  .admin-toggle-thumb {
    position: absolute;
    top: 2px; left: 2px;
    width: 18px; height: 18px;
    border-radius: 999px;
    background: white;
    transition: transform 200ms;
  }
  .admin-toggle-btn--on .admin-toggle-thumb {
    transform: translateX(20px);
  }
  .admin-toggle-label {
    font-size: 0.83rem;
    color: var(--ink-soft);
  }

  /* Date grid */
  .admin-date-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .admin-date-field {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .admin-date-sublabel {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--ink-muted);
  }
  .admin-date-input {
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid var(--line-medium);
    background: var(--bg-raised);
    color: var(--ink);
    font-size: 0.82rem;
    outline: none;
    transition: border-color 180ms;
    color-scheme: dark;
  }
  .admin-date-input:focus { border-color: var(--emerald); }

  /* Duration */
  .admin-duration-row {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
  .admin-duration-label {
    font-size: 0.75rem;
    color: var(--ink-muted);
  }
  .admin-duration-btn {
    padding: 4px 10px;
    border-radius: 6px;
    border: 1px solid var(--line-medium);
    background: var(--bg-elevated);
    color: var(--ink-soft);
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 160ms;
  }
  .admin-duration-btn:hover {
    border-color: var(--emerald-border);
    color: var(--emerald);
    background: var(--emerald-surface);
  }

  /* Info row */
  .admin-info-row {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    padding: 10px 14px;
    border-radius: 8px;
    background: var(--bg-raised);
    border: 1px solid var(--line);
  }
  .admin-info-item {
    font-size: 0.78rem;
    color: var(--ink-muted);
  }
  .admin-info-item strong {
    color: var(--ink-soft);
    font-weight: 600;
  }

  /* Actions */
  .admin-actions {
    display: flex;
    gap: 10px;
  }
  .admin-reset-btn {
    flex: 1;
    padding: 10px 16px;
    border-radius: 10px;
    border: 1px solid var(--line-medium);
    background: var(--bg-elevated);
    color: var(--ink-soft);
    font-size: 0.83rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 180ms;
  }
  .admin-reset-btn:hover { border-color: var(--line-strong); color: var(--ink); }
  .admin-save-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 10px 16px;
    border-radius: 10px;
    border: 1px solid var(--emerald);
    background: var(--emerald);
    color: var(--bg-base);
    font-size: 0.83rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 180ms;
  }
  .admin-save-btn:hover { background: var(--emerald-dim); }

  .admin-last-saved {
    font-size: 0.72rem;
    color: var(--ink-muted);
    text-align: center;
    margin: 0;
  }
`;
