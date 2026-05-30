// Shared section registry — single source of truth for all docs sections
export interface DocSection {
  id: string;
  label: string;
  shortLabel?: string;
  number: string;
  type: "pitch" | "technical";
  description?: string;
}

export const PITCH_SECTIONS: DocSection[] = [
  { id: "problem", label: "Problem", number: "01", type: "pitch", description: "The research gap founders face" },
  { id: "solution", label: "Solution", number: "02", type: "pitch", description: "How Marketrix solves it" },
  { id: "why-now", label: "Why Now", number: "03", type: "pitch", description: "Market timing & tailwinds" },
  { id: "market", label: "Market Opportunity", shortLabel: "Market", number: "04", type: "pitch", description: "TAM, SAM, SOM" },
  { id: "business-model", label: "Business Model", shortLabel: "Biz Model", number: "05", type: "pitch", description: "Revenue streams" },
  { id: "traction", label: "Traction", number: "06", type: "pitch", description: "Growth & validation" },
  { id: "competition", label: "Competition", number: "07", type: "pitch", description: "Competitive landscape" },
  { id: "advantage", label: "Unique Advantage", shortLabel: "Advantage", number: "08", type: "pitch", description: "Our unfair edge" },
  { id: "go-to-market", label: "Go-To-Market", shortLabel: "GTM", number: "09", type: "pitch", description: "Acquisition strategy" },
  { id: "team", label: "Team", number: "10", type: "pitch", description: "The builders" },
  { id: "vision", label: "Vision", number: "11", type: "pitch", description: "The 10-year view" },
];

export const TECHNICAL_SECTIONS: DocSection[] = [
  { id: "product-overview", label: "Product Overview", shortLabel: "Overview", number: "T01", type: "technical", description: "What it does & who uses it" },
  { id: "feature-matrix", label: "Feature Matrix", shortLabel: "Features", number: "T02", type: "technical", description: "Current & upcoming features" },
  { id: "architecture", label: "Architecture", number: "T03", type: "technical", description: "System architecture diagram" },
  { id: "data-flow", label: "Data Flow", number: "T04", type: "technical", description: "AI pipeline end-to-end" },
  { id: "tech-stack", label: "Technology Stack", shortLabel: "Tech Stack", number: "T05", type: "technical", description: "Frontend, backend, AI, infra" },
  { id: "api-docs", label: "API Documentation", shortLabel: "API Docs", number: "T06", type: "technical", description: "Endpoints & auth model" },
  { id: "data-layer", label: "Data Layer", number: "T07", type: "technical", description: "Sources, storage, privacy" },
  { id: "ai-layer", label: "AI Layer", number: "T08", type: "technical", description: "RAG pipeline & models" },
  { id: "roadmap", label: "Roadmap", number: "T09", type: "technical", description: "Short / mid / long term" },
  { id: "performance", label: "Performance & Scale", shortLabel: "Performance", number: "T10", type: "technical", description: "Load & optimization" },
  { id: "security", label: "Security", number: "T11", type: "technical", description: "Auth, RBAC, encryption" },
  { id: "analytics", label: "Analytics & KPIs", shortLabel: "Analytics", number: "T12", type: "technical", description: "Metrics & monitoring" },
  { id: "changelog", label: "Changelog", number: "T13", type: "technical", description: "Version history" },
];

export const ALL_SECTIONS: DocSection[] = [...PITCH_SECTIONS, ...TECHNICAL_SECTIONS];

export function getSectionById(id: string): DocSection | undefined {
  return ALL_SECTIONS.find((s) => s.id === id);
}
