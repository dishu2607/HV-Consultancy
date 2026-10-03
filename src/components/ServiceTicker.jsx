import { PRACTICE_GROUPS } from "../data/services";

const ALL = PRACTICE_GROUPS.flatMap((g) =>
  g.services.map((s) => ({ name: s.name, color: g.color }))
);
const LOOP = [...ALL, ...ALL];

/**
 * A continuous left-moving ticker of every service name — reads like a
 * market tape, reinforces the "ledger" identity, and gives the page a
 * moment of pure motion between the heavier content sections.
 */
export default function ServiceTicker() {
  return (
    <div className="relative border-y border-rule-dark bg-ink py-4 overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-ink to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-ink to-transparent z-10" />

      <div className="flex w-max animate-[ticker_38s_linear_infinite] hover:[animation-play-state:paused]">
        {LOOP.map((s, i) => (
          <span key={i} className="flex items-center gap-2 px-6 shrink-0">
            <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: s.color }} />
            <span className="font-mono text-xs uppercase tracking-wide text-paper/75">
              {s.name}
            </span>
            <span className="text-paper/60 ml-6">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
