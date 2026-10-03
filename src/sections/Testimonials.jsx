import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";
import Marquee from "../components/Marquee";
import { TESTIMONIALS } from "../data/testimonials";

const REGION_COLOR = {
  US: "var(--color-azure)",
  Europe: "var(--color-rust)",
};

function initials(role) {
  const parts = role.split(/[\s&-]+/).filter(Boolean);
  return parts.length > 1
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : role.slice(0, 2).toUpperCase();
}

function TestimonialCard({ t }) {
  const accent = REGION_COLOR[t.region] ?? "var(--color-azure)";

  return (
    <figure className="w-[22rem] md:w-[30rem] shrink-0 flex gap-5 rounded-xl bg-white border border-rule p-5 md:p-6">
      <span
        className="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
        style={{ background: accent }}
        aria-hidden="true"
      >
        {initials(t.role)}
      </span>

      <div className="flex flex-col min-w-0">
        <blockquote className="text-[16px] md:text-[16.5px] leading-[1.5] font-medium tracking-[0.002em] text-graphite">
          &ldquo;{t.quote}&rdquo;
        </blockquote>

        <figcaption className="mt-4 text-sm">
          <span className="font-bold text-graphite">
            {t.role}
          </span>

          <span className="text-graphite/90 font-medium">
            , {t.company}
          </span>
        </figcaption>
      </div>
    </figure>
  );
}

const MID = Math.ceil(TESTIMONIALS.length / 2);
const ROW_A = TESTIMONIALS.slice(0, MID);
const ROW_B = TESTIMONIALS.slice(MID);

/**
 * Two rows of testimonials drifting in opposite directions. They never stop
 * on their own; hovering over a row pauses it so a card can be read.
 */
export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="bg-paper-2 pt-8 md:pt-10 pb-12 md:pb-16 overflow-hidden"
    >
      <div className="max-w-content mx-auto px-6 md:px-10 mb-12">
        <Reveal>
          <Eyebrow>Testimonials</Eyebrow>

          <h2 className="font-display font-bold text-3xl md:text-5xl max-w-2xl mt-4 mb-3 tracking-[-0.01em] leading-[1.05]">
            What our clients say.
          </h2>

          <p className="text-graphite max-w-2xl leading-[1.45] font-semibold text-[clamp(14px,1.9vh,16px)] tracking-[0.002em]">
            Founders, CFOs and COOs across the US and Europe on working with
            HV Consultancy.
          </p>
        </Reveal>
      </div>

      <div className="space-y-5">
        <Marquee
          duration={55}
          aria-label="Client testimonials"
        >
          {ROW_A.map((t) => (
            <TestimonialCard
              key={t.quote}
              t={t}
            />
          ))}
        </Marquee>

        <Marquee reverse duration={60}>
          {ROW_B.map((t) => (
            <TestimonialCard
              key={t.quote}
              t={t}
            />
          ))}
        </Marquee>
      </div>
    </section>
  );
}