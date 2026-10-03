import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import Eyebrow from "../components/Eyebrow";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import Reveal from "../components/Reveal";
import { FAQ_GROUPS } from "../data/faqs";

// Same colour-coded pill treatment as the Services section.
const GROUP_COLOR = {
  start: "var(--color-sage)",
  pricing: "var(--color-amber-2)",
  delivery: "var(--color-azure)",
  confidentiality: "var(--color-rust)",
  working: "var(--color-ink-2)",
};

const GROUP_BLURB = {
  start: "Who we work with, and what the first conversation looks like.",
  pricing: "A fixed fee for a named deliverable, agreed before work begins.",
  delivery: "Who does the work, how it is checked, and what you receive.",
  confidentiality: "NDAs, data handling and who owns the finished work.",
  working: "Time zones, communication and ongoing support.",
};

/**
 * FAQs, laid out like the Services section: topic pills along the top,
 * and that topic's questions in an accordion underneath.
 */
export default function FAQs() {
  const [activeGroup, setActiveGroup] = useState(0);
  const [openItem, setOpenItem] = useState(0);
  const group = FAQ_GROUPS[activeGroup];
  const color = GROUP_COLOR[group.id];

  function selectGroup(id) {
    setActiveGroup(FAQ_GROUPS.findIndex((g) => g.id === id));
    setOpenItem(0);
  }

  return (
    <section id="faqs" className="bg-white">
      <div className="max-w-content mx-auto px-6 md:px-10 pt-8 md:pt-10 pb-12 md:pb-16">
        <Reveal>
          <Eyebrow>FAQs</Eyebrow>

          <h2 className="font-display font-bold text-3xl md:text-5xl max-w-2xl mt-4 mb-3 tracking-[-0.01em] leading-[1.05]">
            Questions we are asked most often.
          </h2>

          <p className="text-graphite max-w-2xl mb-10 leading-[1.45] font-semibold text-[clamp(14px,1.9vh,16px)] tracking-[0.002em]">
            Pick a topic to see its questions. If something is missing, write
            to us and we will answer it directly.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <Tabs
            value={group.id}
            onValueChange={selectGroup}
            className="mb-6"
          >
            <TabsList>
              {FAQ_GROUPS.map((g) => {
                const isActive = g.id === group.id;

                return (
                  <TabsTrigger
                    key={g.id}
                    value={g.id}
                    className={
                      "isolate font-semibold " +
                      (isActive
                        ? "border-transparent text-paper"
                        : "border-rule text-graphite/85 hover:text-graphite hover:border-graphite/30")
                    }
                  >
                    {isActive && (
                      <motion.span
                        layoutId="faq-pill-bg"
                        className="absolute inset-0 rounded-full -z-10"
                        style={{ background: color }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 32,
                        }}
                      />
                    )}

                    <span
                      className="h-1.5 w-1.5 rounded-full shrink-0"
                      style={{
                        background: isActive
                          ? "currentColor"
                          : GROUP_COLOR[g.id],
                      }}
                    />

                    {g.title}

                    <span
                      className={`font-mono font-semibold text-[11px] ${
                        isActive
                          ? "text-paper/90"
                          : "text-graphite/75"
                      }`}
                    >
                      {String(g.items.length).padStart(2, "0")}
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.p
            key={group.id + "-blurb"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-sm text-graphite leading-[1.45] mb-6 max-w-2xl font-semibold"
          >
            {GROUP_BLURB[group.id]}
          </motion.p>
        </AnimatePresence>

        <div className="rounded-2xl border border-rule bg-paper overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={group.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {group.items.map((item, i) => {
                const isOpen = i === openItem;

                return (
                  <div
                    key={item.q}
                    className={
                      i !== group.items.length - 1
                        ? "border-b border-rule"
                        : ""
                    }
                  >
                    <button
                      onClick={() =>
                        setOpenItem(isOpen ? -1 : i)
                      }
                      aria-expanded={isOpen}
                      className={`group w-full flex items-center gap-4 px-5 md:px-7 py-4 text-left transition-colors duration-200 ${
                        isOpen
                          ? "bg-paper-2/60"
                          : "hover:bg-paper-2/30"
                      }`}
                    >
                      <span
                        className="h-2 w-2 rounded-full shrink-0"
                        style={{
                          background: color,
                          opacity: isOpen ? 1 : 0.4,
                        }}
                      />

                      <span
                        className={`flex-1 font-display font-bold text-[17px] md:text-[19px] tracking-[0.005em] leading-tight transition-colors ${
                          isOpen
                            ? "text-graphite"
                            : "text-graphite/95"
                        }`}
                      >
                        {item.q}
                      </span>

                      <motion.span
                        animate={{
                          rotate: isOpen ? 45 : 0,
                        }}
                        transition={{
                          duration: 0.25,
                        }}
                        className={`shrink-0 rounded-full p-1 transition-colors ${
                          isOpen
                            ? "text-ink bg-amber"
                            : "text-graphite/85 group-hover:bg-paper-2"
                        }`}
                      >
                        <Plus size={16} />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          transition={{
                            duration: 0.3,
                            ease: [
                              0.22,
                              1,
                              0.36,
                              1,
                            ],
                          }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 md:px-7 pb-6 pt-1 pl-[3.25rem] md:pl-[4.25rem] pr-10 max-w-4xl text-[15px] md:text-[16px] text-graphite leading-[1.45] font-medium tracking-[0.002em]">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}