// ============================================================
// Marketrix /docs — Access Control & Scheduling Engine
// ============================================================
// Admin settings are persisted in localStorage under
// STORAGE_KEY. This is appropriate for the judging/showcase
// scenario where no backend endpoint is wired up yet.
// ============================================================

export interface DocsConfig {
  isEnabled: boolean;      // Master toggle: false = always unavailable
  startDate: string;       // ISO 8601 local datetime string
  endDate: string;         // ISO 8601 local datetime string
  adminPassword: string;   // Simple password to access admin panel
  lastModified: string;    // ISO timestamp of last admin save
}

const STORAGE_KEY = "marketrix_docs_config";

// Default public window: June 10 00:00 → June 14 23:59 (2026)
const DEFAULT_CONFIG: DocsConfig = {
  isEnabled: true,
  startDate: "2026-06-10T00:00:00",
  endDate: "2026-06-14T23:59:59",
  adminPassword: "marketrix2026",
  lastModified: new Date().toISOString(),
};

// ── Getters ──────────────────────────────────────────────────

export function getDocsConfig(): DocsConfig {
  if (typeof window === "undefined") return DEFAULT_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONFIG;
    const parsed = JSON.parse(raw) as Partial<DocsConfig>;
    return { ...DEFAULT_CONFIG, ...parsed };
  } catch {
    return DEFAULT_CONFIG;
  }
}

export function saveDocsConfig(config: DocsConfig): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...config, lastModified: new Date().toISOString() })
    );
  } catch {
    console.error("[docsConfig] Failed to save config to localStorage");
  }
}

export function resetDocsConfig(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

// ── Access Evaluation ─────────────────────────────────────────

export type AccessStatus =
  | "accessible"       // Within window, enabled
  | "disabled"         // Master toggle is OFF
  | "before_window"    // Before start date
  | "after_window"     // After end date
  | "unknown";         // SSR/no config available

export function evaluateAccess(config?: DocsConfig): AccessStatus {
  const cfg = config ?? getDocsConfig();

  if (!cfg.isEnabled) return "disabled";

  const now = new Date();
  const start = new Date(cfg.startDate);
  const end = new Date(cfg.endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) return "accessible";

  if (now < start) return "before_window";
  if (now > end) return "after_window";

  return "accessible";
}

export function isDocsAccessible(config?: DocsConfig): boolean {
  return evaluateAccess(config) === "accessible";
}

// ── Auth ──────────────────────────────────────────────────────

export function verifyAdminPassword(input: string): boolean {
  const cfg = getDocsConfig();
  return input === cfg.adminPassword;
}

// ── Formatting helpers ────────────────────────────────────────

export function formatDateForInput(iso: string): string {
  // Converts "2026-06-10T00:00:00" → "2026-06-10T00:00" (datetime-local compatible)
  return iso.slice(0, 16);
}

export function formatDisplayDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}
