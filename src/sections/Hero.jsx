import { motion } from "framer-motion";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import TickingStat from "../components/TickingStat";

// ---------------------------------------------------------------------------
// Timing map — each phase waits for the previous one to *finish*, not just
// overlap slightly. This is what makes it read as "headline, THEN subtext,
// THEN buttons" rather than everything arriving in one soft blob.
// ---------------------------------------------------------------------------
const T_HEADLINE_START = 0.3;
const T_HEADLINE_WORD_STEP = 0.09;
const T_PARAGRAPH = 1.5; // starts once headline words have finished flipping in
const T_FRAGMENT = 1.9;
const T_BUTTONS = 2.15;
const T_CHEVRON = 2.7;

const HEADLINE_WORDS = [
  { text: "From", italic: false },
  { text: "insight", italic: false },
  { text: "to", italic: false },
  { text: "decisive", italic: true },
  { text: "action.", italic: false },
];

function HeadlineWord({ word, index }) {
  return (
    <span
      className="inline-block overflow-hidden pb-2 -mb-2"
      style={{ perspective: 400 }}
    >
      <motion.span
        className={`inline-block ${
          word.italic ? "italic text-amber font-normal" : ""
        }`}
        initial={{
          y: "100%",
          rotateX: 45,
          opacity: 0,
        }}
        animate={{
          y: "0%",
          rotateX: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.75,
          delay:
            T_HEADLINE_START +
            index * T_HEADLINE_WORD_STEP,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          transformOrigin: "bottom",
        }}
      >
        {word.text}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative bg-ink text-paper"
    >
      {/* ------------------------------------------------------------------ */}
      {/* Video block                                                        */}
      {/* ------------------------------------------------------------------ */}

      <div className="relative min-h-[92vh] md:min-h-screen overflow-hidden flex items-center">
        <motion.video
          className="absolute inset-0 h-full w-full object-cover"
          src="/hero-bg.mp4"
          poster="/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          initial={{
            scale: 1.12,
          }}
          animate={{
            scale: 1,
          }}
          transition={{
            duration: 6,
            ease: [0.16, 1, 0.3, 1],
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/25" />

        <div className="absolute inset-0 bg-ink/25" />

        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />

        <div className="relative max-w-content mx-auto px-6 md:px-10 w-full pt-8 md:pt-10 pb-12 md:pb-16">
          <div className="max-w-xl">
            {/* kicker */}

            <motion.span
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.5,
                delay: 0,
              }}
              className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.3em] uppercase text-amber/90"
            >
              <motion.span
                initial={{
                  width: 0,
                }}
                animate={{
                  width: 24,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                }}
                className="h-px bg-amber/60"
              />

              HV Consultancy
            </motion.span>

            {/* phase 1 — headline, word by word flip-up */}

            <h1 className="font-display text-[2.7rem] leading-[1.08] md:text-7xl md:leading-[1.03] mt-6 tracking-tight">
              {HEADLINE_WORDS.map((w, i) => (
                <span key={w.text}>
                  <HeadlineWord
                    word={w}
                    index={i}
                  />{" "}
                </span>
              ))}
            </h1>

            {/* phase 2 — subtext, blurred rise, only once headline has landed */}

            <motion.p
              initial={{
                opacity: 0,
                y: 14,
                filter: "blur(6px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 0.8,
                delay: T_PARAGRAPH,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6 text-paper/85 text-base md:text-lg leading-relaxed max-w-md"
            >
              We turn complex financial and market information into
              decisions you can act on — across reporting, valuation,
              market intelligence and corporate strategy.
            </motion.p>

            {/* phase 3 — mono fragment line */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.6,
                delay: T_FRAGMENT,
              }}
              className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-mono uppercase tracking-wider text-paper/70"
            >
              <span>Rigorous analysis</span>

              <span className="text-amber/50">
                ·
              </span>

              <span>
                Practical recommendations
              </span>

              <span className="text-amber/50">
                ·
              </span>

              <span>
                Measurable outcomes
              </span>
            </motion.div>

            {/* phase 4 — buttons, spring pop, distinctly last */}

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <motion.a
                href="#contact"
                initial={{
                  opacity: 0,
                  scale: 0.85,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  delay: T_BUTTONS,
                  duration: 0.55,
                  type: "spring",
                  stiffness: 260,
                  damping: 18,
                }}
                whileHover={{
                  scale: 1.035,
                  boxShadow:
                    "0 10px 30px -8px rgba(212,163,74,0.55)",
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="group relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-full bg-amber px-6 text-sm font-medium text-ink"
              >
                <span className="relative z-10">
                  Start a conversation
                </span>

                <motion.span
                  className="relative z-10 inline-flex"
                  whileHover={{
                    x: 3,
                    y: -3,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 15,
                  }}
                >
                  <ArrowUpRight size={16} />
                </motion.span>

                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  initial={{
                    x: "-120%",
                  }}
                  whileHover={{
                    x: "120%",
                  }}
                  transition={{
                    duration: 0.7,
                    ease: "easeInOut",
                  }}
                />
              </motion.a>

              <motion.a
                href="#services"
                initial={{
                  opacity: 0,
                  scale: 0.85,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  delay: T_BUTTONS + 0.08,
                  duration: 0.55,
                  type: "spring",
                  stiffness: 260,
                  damping: 18,
                }}
                className="group relative inline-flex items-center gap-1.5 text-sm text-paper/90 hover:text-paper transition-colors"
              >
                See our services

                <motion.span
                  className="inline-flex"
                  whileHover={{
                    x: 3,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 15,
                  }}
                >
                  →
                </motion.span>

                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-paper/50 transition-transform duration-300 group-hover:scale-x-100" />
              </motion.a>
            </div>
          </div>
        </div>

        <motion.a
          href="#services"
          aria-label="Scroll to services"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            y: [0, 6, 0],
          }}
          transition={{
            opacity: {
              delay: T_CHEVRON,
              duration: 0.6,
            },
            y: {
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: T_CHEVRON,
            },
          }}
          className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 text-paper/70 hover:text-paper/85 transition-colors"
        >
          <ChevronDown size={22} />
        </motion.a>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Ledger strip                                                       */}
      {/* ------------------------------------------------------------------ */}

      <div className="relative max-w-content mx-auto px-6 md:px-10 border-t border-rule-dark">
        {[
          {
            label: "Years of combined leadership experience",
            to: 10,
            suffix: "+",
          },
          {
            label: "Chartered Accountants, both CFA Level II candidates",
            to: 2,
          },
          {
            label: "Integrated practice groups, one firm",
            to: 4,
          },
        ].map((row, i) => (
          <motion.div
            key={row.label}
            initial={{
              opacity: 0,
              x: -12,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
              delay: i * 0.08,
            }}
            className="ledger-row-dark flex items-baseline justify-between py-5"
          >
            <span className="text-paper/75 text-sm font-mono">
              {String(i + 1).padStart(2, "0")}
            </span>

            <span className="text-paper/85 text-sm flex-1 ml-6">
              {row.label}
            </span>

            <span className="figure text-2xl md:text-3xl text-paper">
              <TickingStat
                to={row.to}
                prefix={row.prefix ?? ""}
                suffix={row.suffix ?? ""}
              />
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}