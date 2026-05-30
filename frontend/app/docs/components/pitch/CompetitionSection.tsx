import DocsSection from "../DocsSection";

const competitors = [
  { name: "Gartner / Forrester", ai: false, match: false, startup: false, speed: "3–6 weeks", price: "$15K–$50K" },
  { name: "Statista", ai: false, match: false, startup: false, speed: "Self-serve", price: "$199/mo" },
  { name: "Athenian / Klue", ai: "partial", match: false, startup: "partial", speed: "Days–weeks", price: "$800+/mo" },
  { name: "Upwork / Fiverr", ai: false, match: "partial", startup: true, speed: "Days", price: "Variable" },
  { name: "Marketrix ✦", ai: true, match: true, startup: true, speed: "10 minutes", price: "$0–$99" },
];

type CellValue = boolean | "partial";

function Cell({ val }: { val: CellValue | string }) {
  if (val === true) return <span className="comp-cell comp-cell--yes">✓</span>;
  if (val === false) return <span className="comp-cell comp-cell--no">✗</span>;
  if (val === "partial") return <span className="comp-cell comp-cell--partial">~</span>;
  return <span className="comp-cell-text">{val as string}</span>;
}

export default function CompetitionSection() {
  return (
    <DocsSection
      id="competition"
      number="07"
      type="pitch"
      eyebrow="Competitive Landscape"
      title="No one is doing what we're doing"
      subtitle="Every existing solution fails on at least two of the four critical dimensions for startup market intelligence: AI-matching, startup-specific context, speed, and affordability."
    >
      <div className="comp-table-wrap">
        <table className="comp-table">
          <thead>
            <tr>
              <th className="comp-th comp-th--name">Platform</th>
              <th className="comp-th">AI Matching</th>
              <th className="comp-th">Analyst Match</th>
              <th className="comp-th">Startup-First</th>
              <th className="comp-th">Speed</th>
              <th className="comp-th">Founder Price</th>
            </tr>
          </thead>
          <tbody>
            {competitors.map((c, i) => {
              const isUs = c.name.includes("Marketrix");
              return (
                <tr key={i} className={`comp-tr ${isUs ? "comp-tr--us" : ""}`}>
                  <td className="comp-td comp-td--name">{c.name}</td>
                  <td className="comp-td"><Cell val={c.ai as CellValue} /></td>
                  <td className="comp-td"><Cell val={c.match as CellValue} /></td>
                  <td className="comp-td"><Cell val={c.startup as CellValue} /></td>
                  <td className="comp-td comp-td--text">{c.speed}</td>
                  <td className="comp-td comp-td--text">{c.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <style>{`
        .comp-table-wrap {
          overflow-x: auto;
          border-radius: 14px;
          border: 1px solid var(--line-medium);
        }
        .comp-table {
          width: 100%;
          border-collapse: collapse;
        }
        .comp-th {
          padding: 12px 16px;
          border-bottom: 1px solid var(--line-medium);
          background: var(--bg-raised);
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--ink-muted);
          text-align: center;
          white-space: nowrap;
        }
        .comp-th--name { text-align: left; }
        .comp-tr { border-bottom: 1px solid var(--line); }
        .comp-tr:last-child { border-bottom: none; }
        .comp-tr--us {
          background: var(--emerald-surface);
        }
        .comp-td {
          padding: 14px 16px;
          text-align: center;
          vertical-align: middle;
        }
        .comp-td--name {
          text-align: left;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--ink);
          white-space: nowrap;
        }
        .comp-tr--us .comp-td--name { color: var(--emerald); }
        .comp-td--text {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.75rem;
          color: var(--ink-soft);
          white-space: nowrap;
        }
        .comp-cell {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px; height: 22px;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 700;
        }
        .comp-cell--yes { background: var(--emerald-surface); color: var(--emerald); }
        .comp-cell--no { background: var(--coral-surface); color: var(--coral); }
        .comp-cell--partial { background: var(--gold-surface); color: var(--gold); }
        .comp-cell-text {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.75rem;
          color: var(--ink-soft);
        }
      `}</style>
    </DocsSection>
  );
}
