import DocsSection from "../DocsSection";

interface TeamMember {
  name: string;
  role: string;
  email: string;
  bio: string;
  initials: string;
  color: string;
}

const team: TeamMember[] = [
  {
    name: "Arpon Islam",
    role: "Founder & CEO",
    email: "arpon@marketrix.io",
    bio: "Building the market intelligence OS for founders. Previously deep in AI systems and full-stack product development.",
    initials: "AI",
    color: "#1aff9c",
  },
  {
    name: "Riya Chen",
    role: "Lead Engineer",
    email: "riya@marketrix.io",
    bio: "Leads the Spring Boot backend and infrastructure. Expert in distributed systems and JVM performance optimization.",
    initials: "RC",
    color: "#f5c842",
  },
  {
    name: "Marcus Okafor",
    role: "AI/ML Engineer",
    email: "marcus@marketrix.io",
    bio: "Owns the RAG pipeline — from embedding generation to pgvector HNSW indexing and Claude prompt engineering.",
    initials: "MO",
    color: "#ff6b4a",
  },
  {
    name: "Sofia Reyes",
    role: "Product Designer",
    email: "sofia@marketrix.io",
    bio: "Shapes the Marketrix user experience. Obsessed with making complex AI outputs feel intuitive and trustworthy.",
    initials: "SR",
    color: "#a78bfa",
  },
];

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="team-card">
      {/* Avatar */}
      <div
        className="team-avatar"
        style={{ "--member-color": member.color } as React.CSSProperties}
      >
        <span className="team-initials">{member.initials}</span>
        <div className="team-avatar-ring" />
      </div>

      {/* Info */}
      <div className="team-info">
        <h3 className="team-name">{member.name}</h3>
        <span className="team-role-badge">{member.role}</span>
        <p className="team-bio">{member.bio}</p>
        <a href={`mailto:${member.email}`} className="team-email">
          {member.email}
        </a>
      </div>
    </div>
  );
}

export default function TeamSection() {
  return (
    <DocsSection
      id="team"
      number="10"
      type="pitch"
      eyebrow="The Team"
      title="Built by researchers, engineers, and founders"
      subtitle="A focused team with deep expertise in AI systems, marketplace design, and the research workflows that founders actually use."
    >
      <div className="team-grid">
        {team.map((member) => (
          <TeamCard key={member.email} member={member} />
        ))}
      </div>

      <style>{`
        .team-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        @media (max-width: 640px) {
          .team-grid { grid-template-columns: 1fr; }
        }

        .team-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          padding: 32px 24px;
          border-radius: 16px;
          border: 1px solid var(--line-medium);
          background: var(--bg-surface);
          text-align: center;
          transition: border-color 250ms, transform 250ms;
        }
        .team-card:hover {
          border-color: var(--line-strong);
          transform: translateY(-3px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.3);
        }

        /* Avatar */
        .team-avatar {
          position: relative;
          width: 88px;
          height: 88px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-elevated);
          flex-shrink: 0;
          overflow: visible;
        }
        .team-initials {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--member-color, var(--emerald));
          user-select: none;
          z-index: 1;
          position: relative;
        }
        .team-avatar-ring {
          position: absolute;
          inset: -3px;
          border-radius: 999px;
          border: 2px solid var(--member-color, var(--emerald));
          opacity: 0.5;
        }
        .team-card:hover .team-avatar-ring {
          opacity: 1;
          box-shadow: 0 0 16px var(--member-color, var(--emerald));
        }

        /* Info */
        .team-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .team-name {
          font-family: var(--font-dm-sans), system-ui, sans-serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--ink);
          margin: 0;
          line-height: 1.2;
        }
        .team-role-badge {
          display: inline-flex;
          padding: 3px 10px;
          border-radius: 999px;
          border: 1px solid var(--line-medium);
          background: var(--bg-elevated);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.68rem;
          font-weight: 600;
          color: var(--ink-muted);
          letter-spacing: 0.04em;
        }
        .team-bio {
          font-size: 0.85rem;
          color: var(--ink-muted);
          line-height: 1.6;
          margin: 4px 0 0;
          max-width: 280px;
        }
        .team-email {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.72rem;
          color: var(--ink-muted);
          text-decoration: none;
          transition: color 180ms;
        }
        .team-email:hover {
          color: var(--emerald);
        }
      `}</style>
    </DocsSection>
  );
}
