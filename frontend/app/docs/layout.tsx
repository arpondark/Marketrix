// Docs layout — does NOT include the global Navigation/Footer
// The /docs route has its own full-page layout with sidebar navigation
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketrix Docs — Pitch Deck & Technical Documentation",
  description:
    "Comprehensive documentation for Marketrix: YC-style pitch deck, technical architecture, AI/RAG pipeline, API reference, and product roadmap.",
  keywords:
    "Marketrix documentation, pitch deck, market intelligence, RAG, AI, pgvector, Spring Boot",
  openGraph: {
    title: "Marketrix — Live Documentation",
    description:
      "YC-style pitch deck + full technical documentation for Marketrix, the AI-powered market intelligence platform.",
    type: "website",
  },
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
