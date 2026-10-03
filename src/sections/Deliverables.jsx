import { FileOutput } from "lucide-react";
import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";
import Marquee from "../components/Marquee";
import { PRACTICE_GROUPS } from "../data/services";

const ALL_SERVICES = PRACTICE_GROUPS.flatMap((g) =>
  g.services.map((s) => ({ ...s, group: g.short, color: g.color }))
);

function DeliverableCard({ s }) {
  return (
    <div className="w-[20rem] md:w-[24rem] shrink-0 rounded-xl border border-rule-dark bg-ink-2 p-6">
      <p className="flex items-center gap-2 text-xs text-paper/75 mb-3">
        <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
        {s.group}
      </p>
      <h3 className="font-display text-xl text-paper mb-3 leading-snug">{s.name}</h3>
      <p className="flex items-start gap-2 text-sm text-paper/85 leading-relaxed">
        <FileOutput size={15} className="mt-0.5 shrink-0 text-amber" />
        <span>{s.deliverable}</span>
      </p>
    </div>
  );
}

/**
 * What the client takes away from each service. A single row that keeps
 * drifting and pauses under the cursor.
 */
export default function Deliverables() {
  return (
    <section id="deliverables" className="bg-ink text-paper pt-8 md:pt-10 pb-12 md:pb-16 overflow-hidden">
      <div className="max-w-content mx-auto px-6 md:px-10 mb-12">
        <Reveal>
          <Eyebrow dark>What you actually get</Eyebrow>
          <h2 className="font-display text-3xl md:text-5xl max-w-2xl mt-4 mb-3">
            Every service ends in a named, tangible deliverable.
          </h2>
          <p className="text-paper/80 max-w-2xl leading-relaxed">
            Not a promise of &ldquo;support&rdquo; &mdash; a specific document,
            model or dashboard that you can put in front of your board,
            investors or lenders.
          </p>
        </Reveal>
      </div>

      <Marquee duration={110}>
        {ALL_SERVICES.map((s) => (
          <DeliverableCard key={s.name} s={s} />
        ))}
      </Marquee>
    </section>
  );
}
