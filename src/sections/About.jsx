import { motion } from "framer-motion";
import Eyebrow from "../components/Eyebrow";

const FOUNDERS = [
  {
    name: "Harsh",
    role: "Co-Founder",
    // photo: "/harsh.jpg",   <- put a portrait in /public and uncomment
    accent: "var(--color-amber-2)",
    tags: ["Chartered Accountant", "CFA Level II", "Investment Banking & Valuation"],
    bio: "Harsh has executed IPOs, convertible note issuances, M&A and private placements across APAC and the US, and has led fixed-income and bank valuation mandates covering portfolios in excess of €1.6bn in the UK and Middle East. His sector depth spans TMT, data centres, telecom and financial services. He began his career in statutory audit, with IFRS and Ind-AS transition work across financial services, manufacturing and consulting clients.",
  },
  {
    name: "Vatsal",
    role: "Co-Founder",
    // photo: "/vatsal.jpg",
    accent: "var(--color-azure)",
    tags: ["Chartered Accountant", "CFA Level II", "Investment Banking & Management Consulting"],
    bio: "Vatsal has experience across investment banking, strategy consulting and business advisory, with a focus on M&A, financial modelling, valuation and growth strategy. He has worked on large cross-border transactions, sell-side processes and client pitches across India and the US. Prior to investment banking, he was a Strategy Consultant, advising clients across sectors such as food services, retail, pharmaceuticals and logistics on growth strategy, cost transformation and market entry.",
  },
];

const ease = [0.22, 1, 0.36, 1];

function FounderCard({ f, index }) {
  const fromX = index === 0 ? -70 : 70;
  return (
    <motion.article
      initial={{ opacity: 0, x: fromX }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay: 0.25 + index * 0.15, ease }}
      whileHover={{ y: -6 }}
      className="group relative h-full rounded-2xl border border-rule bg-paper p-[clamp(1rem,2.6vh,1.75rem)] overflow-hidden transition-shadow duration-300 hover:shadow-[0_18px_44px_-20px_rgba(15,26,40,0.35)]"
    >
      {/* accent bar draws itself in, then widens on hover */}
      <motion.span
        aria-hidden="true"
        className="absolute left-0 top-0 h-1 w-full origin-left"
        style={{ background: f.accent }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, delay: 0.7 + index * 0.15, ease }}
      />

      <div className="flex items-center gap-4 mb-[clamp(0.6rem,1.8vh,1rem)]">
        {f.photo ? (
          <img f={f.photo} alt={f.name} className="h-16 w-16 rounded-full object-cover shrink-0" />
        ) : (
          <div
            className="relative flex items-center justify-center h-14 w-14 rounded-full shrink-0 font-display text-2xl text-white font-bold"
            style={{ background: f.accent }}
          >
            {f.name[0]}

            {/* slowly turning dashed ring */}
            <motion.span
              aria-hidden="true"
              className="absolute -inset-1.5 rounded-full border border-dashed"
              style={{ borderColor: f.accent, opacity: 0.55 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            />
          </div>
        )}

        <div>
          <h3 className="font-display font-bold text-2xl text-graphite leading-tight tracking-[0.005em]">
            {f.name}
          </h3>

          <span className="text-sm text-graphite/90 font-semibold">
            {f.role}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-[clamp(0.6rem,1.8vh,1rem)]">
        {f.tags.map((tag, i) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.4,
              delay: 0.9 + index * 0.15 + i * 0.1,
              ease,
            }}
            className="text-xs px-2.5 py-1 rounded-full border border-rule text-graphite font-semibold bg-white"
          >
            {tag}
          </motion.span>
        ))}
      </div>

      <p className="text-[clamp(14px,1.9vh,16px)] text-graphite leading-[1.42] md:leading-[1.5] font-medium tracking-[0.002em]">
        {f.bio}
      </p>
    </motion.article>
  );
}

/**
 * Sized to sit inside one screen under the sticky nav, so jumping here from
 * the menu shows the whole section at once.
 */
export default function About() {
  return (
    <section
      id="about"
      className="bg-white min-h-[calc(100svh-4rem)] flex items-center"
    >
      <div className="max-w-content mx-auto w-full px-6 md:px-10 py-[clamp(1.25rem,4vh,2.5rem)]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
          className="mb-[clamp(1rem,3.4vh,2.25rem)]"
        >
          <Eyebrow>About us</Eyebrow>

          <h2 className="font-display font-bold text-3xl md:text-[clamp(1.6rem,4.6vh,2.6rem)] leading-[1.05] tracking-[0.005em] mt-[clamp(0.4rem,1.2vh,0.75rem)] mb-[clamp(0.5rem,1.6vh,1rem)] max-w-3xl">
            Two Chartered Accountants, ten-plus years across global finance,
            in one firm.
          </h2>

          <p className="text-graphite leading-[1.45] font-medium max-w-[52rem] text-[clamp(14px,1.9vh,16px)] tracking-[0.002em]">
            HV Consultancy is founded by two Chartered Accountants with CFA
            candidacy and a combined 10+ years across global investment
            banking, valuation and consulting experience. Between them they
            have executed transactions across APAC, the US and EMEA regions
            &amp; led statutory audits and IFRS transition engagements for
            financial services, manufacturing and consulting clients.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {FOUNDERS.map((f, i) => (
            <FounderCard key={f.name} f={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}