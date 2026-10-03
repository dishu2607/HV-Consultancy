import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { FileOutput, Plus } from "lucide-react";

import Eyebrow from "../components/Eyebrow";

import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";

import Reveal from "../components/Reveal";

import { PRACTICE_GROUPS, SERVICE_COUNT } from "../data/services";

/* ====================================================================== */
/* VISUAL CONFIGURATION                                                   */
/* ====================================================================== */

/* ====================================================================== */
/* VISUAL CONFIGURATION                                                   */
/* ====================================================================== */

const VISUALS = {
  finance: {
    type: "finance",

    color: "#173F73",
    secondary: "#4C719D",
    glow: "#7899BE",

    // Very subtle cool blue background
    background: "#F3F7FB",
  },

  valuation: {
    type: "valuation",

    color: "#654B70",
    secondary: "#92749B",
    glow: "#B49DBA",

    // Very subtle lavender background
    background: "#F7F3F8",
  },

  intelligence: {
    type: "intelligence",

    color: "#176866",
    secondary: "#4B918C",
    glow: "#82B5B0",

    // Very subtle teal background
    background: "#F1F8F7",
  },

  strategy: {
    type: "strategy",

    color: "#9A6A32",
    secondary: "#C0955C",
    glow: "#D5B17B",

    // Very subtle warm background
    background: "#FAF6F0",
  },
};

/* ====================================================================== */
/* FINANCE VISUAL                                                         */
/* Ledger + columns + rising/falling bars                                 */
/* ====================================================================== */

function FinanceVisual({ visual }) {
  const horizontalLines = [55, 105, 155, 205, 255, 305, 355];

  const verticalLines = [90, 235, 385, 535, 690, 845, 1000];

  const bars = [
    { x: 105, height: 82, direction: "up" },
    { x: 155, height: 48, direction: "down" },
    { x: 270, height: 120, direction: "up" },
    { x: 320, height: 65, direction: "down" },
    { x: 420, height: 145, direction: "up" },
    { x: 470, height: 90, direction: "down" },
    { x: 570, height: 105, direction: "up" },
    { x: 620, height: 58, direction: "down" },
    { x: 725, height: 160, direction: "up" },
    { x: 775, height: 95, direction: "down" },
    { x: 875, height: 130, direction: "up" },
    { x: 925, height: 70, direction: "down" },
    { x: 1030, height: 175, direction: "up" },
    { x: 1070, height: 100, direction: "down" },
  ];

  return (
    <g>
      {/* ============================================================ */}
      {/* Finance readability gradient                                 */}
      {/* Keeps the bars visible while protecting the text area        */}
      {/* ============================================================ */}

      <defs>
        <linearGradient
          id="finance-text-veil"
          x1="0"
          y1="0"
          x2="1"
          y2="0"
        >
          <stop
            offset="0%"
            stopColor="#F3F7FB"
            stopOpacity="0.82"
          />

          <stop
            offset="40%"
            stopColor="#F3F7FB"
            stopOpacity="0.66"
          />

          <stop
            offset="68%"
            stopColor="#F3F7FB"
            stopOpacity="0.28"
          />

          <stop
            offset="100%"
            stopColor="#F3F7FB"
            stopOpacity="0"
          />
        </linearGradient>
      </defs>

      {/* ------------------------------------------------------------ */}
      {/* Horizontal reporting / ledger lines                          */}
      {/* ------------------------------------------------------------ */}

      <g opacity="0.32">
        {horizontalLines.map((y, i) => (
          <motion.line
            key={`finance-h-${i}`}
            x1="15"
            y1={y}
            x2="1125"
            y2={y}
            stroke={visual.color}
            strokeWidth={i === 3 ? "1.4" : "0.9"}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 1.4,
              delay: i * 0.07,
              ease: "easeOut",
            }}
          />
        ))}
      </g>

      {/* ------------------------------------------------------------ */}
      {/* Vertical reporting columns                                    */}
      {/* ------------------------------------------------------------ */}

      <g opacity="0.0">
        {verticalLines.map((x, i) => (
          <motion.line
            key={`finance-v-${i}`}
            x1={x}
            y1="25"
            x2={x}
            y2="380"
            stroke={visual.secondary}
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: 0.2 + i * 0.08,
            }}
          />
        ))}
      </g>

      {/* ------------------------------------------------------------ */}
      {/* Financial bars                                                */}
      {/* ------------------------------------------------------------ */}

      <g>
        {bars.map((bar, i) => {
          const baseline = 300;

          const y =
            bar.direction === "up"
              ? baseline - bar.height
              : baseline;

          return (
            <motion.g
              key={`bar-${i}`}
              initial={{
                opacity: 0,
                scaleY: 0,
              }}
              animate={{
                opacity:
                  bar.direction === "up"
                    ? 0.22
                    : 0.14,
                scaleY: 1,
              }}
              transition={{
                duration: 0.9,
                delay: 0.3 + i * 0.055,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                transformOrigin: `${bar.x}px ${baseline}px`,
              }}
            >
              <rect
                x={bar.x}
                y={y}
                width="20"
                height={bar.height}
                rx="2"
                fill={
                  bar.direction === "up"
                    ? visual.color
                    : visual.secondary
                }
              />

              {/* small bar cap */}
              <line
                x1={bar.x - 3}
                y1={y}
                x2={bar.x + 23}
                y2={y}
                stroke={visual.glow}
                strokeWidth="1.5"
                opacity="0.5"
              />
            </motion.g>
          );
        })}
      </g>

      {/* ------------------------------------------------------------ */}
      {/* Soft readability veil                                         */}
      {/* Stronger on the text side, gradually disappearing rightward */}
      {/* ------------------------------------------------------------ */}

      <rect
        x="0"
        y="0"
        width="1140"
        height="420"
        fill="url(#finance-text-veil)"
      />

      {/* ------------------------------------------------------------ */}
      {/* Reference line                                                */}
      {/* ------------------------------------------------------------ */}

      <motion.line
        x1="15"
        y1="300"
        x2="1125"
        y2="300"
        stroke={visual.color}
        strokeWidth="1.5"
        strokeDasharray="4 8"
        opacity="0.25"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 1.8,
          delay: 0.5,
        }}
      />

      {/* ------------------------------------------------------------ */}
      {/* Subtle reporting blocks                                       */}
      {/* ------------------------------------------------------------ */}

      {[
        { x: 25, y: 55, w: 210, h: 100 },
        { x: 385, y: 155, w: 305, h: 100 },
        { x: 845, y: 55, w: 255, h: 100 },
      ].map((box, i) => (
        <motion.rect
          key={`finance-box-${i}`}
          x={box.x}
          y={box.y}
          width={box.w}
          height={box.h}
          rx="2"
          fill={visual.color}
          stroke={visual.color}
          strokeWidth="0.7"
          opacity="0.025"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.025 }}
          transition={{
            duration: 1.2,
            delay: 0.7 + i * 0.15,
          }}
        />
      ))}

      {/* ------------------------------------------------------------ */}
      {/* Small data points                                             */}
      {/* ------------------------------------------------------------ */}

      {[235, 535, 845, 1000].map((x, i) => (
        <motion.circle
          key={`finance-dot-${i}`}
          cx={x}
          cy={105 + (i % 2) * 100}
          r="3"
          fill={visual.color}
          animate={{
            opacity: [0.15, 0.55, 0.15],
          }}
          transition={{
            duration: 3.5,
            delay: i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* ------------------------------------------------------------ */}
      {/* Moving horizontal scan                                       */}
      {/* ------------------------------------------------------------ */}

      <motion.line
        x1="15"
        y1="205"
        x2="1125"
        y2="205"
        stroke={visual.glow}
        strokeWidth="2"
        opacity="0.08"
        animate={{
          opacity: [0.03, 0.15, 0.03],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </g>
  );
}

/* ====================================================================== */
/* VALUATION VISUAL                                                       */
/* Valuation bands + scenario rings + central valuation point             */
/* ====================================================================== */

function ValuationVisual({ visual }) {
  const bands = [
    {
      path: "M-20 355 C120 350 210 325 315 270 C415 218 470 125 570 88 C680 48 760 125 850 165 C950 208 1035 160 1160 55",
      opacity: 0.22,
    },
    {
      path: "M-20 395 C130 390 220 360 325 305 C430 250 495 165 600 120 C705 77 785 150 875 192 C970 232 1050 190 1160 100",
      opacity: 0.16,
    },
    {
      path: "M-20 315 C100 310 190 285 290 225 C385 165 445 82 550 52 C660 22 745 105 830 140 C925 180 1010 130 1160 25",
      opacity: 0.18,
    },
  ];

  return (
    <g fill="none" strokeLinecap="round">
      {/* -------------------------------------------------------------- */}
      {/* Main valuation bands                                            */}
      {/* -------------------------------------------------------------- */}

      {bands.map((band, i) => (
        <motion.path
          key={`valuation-band-${i}`}
          d={band.path}
          stroke={i === 1 ? visual.secondary : visual.color}
          strokeWidth={i === 1 ? "2" : "1.2"}
          opacity={band.opacity}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2.5,
            delay: i * 0.18,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* -------------------------------------------------------------- */}
      {/* Horizontal valuation ranges                                    */}
      {/* -------------------------------------------------------------- */}

      <g stroke={visual.secondary}>
        <motion.line
          x1="180"
          y1="225"
          x2="1010"
          y2="225"
          strokeWidth="1"
          strokeDasharray="5 9"
          opacity="0.14"
        />

        <motion.line
          x1="240"
          y1="260"
          x2="950"
          y2="260"
          strokeWidth="1"
          strokeDasharray="3 8"
          opacity="0.10"
        />

        <motion.line
          x1="320"
          y1="185"
          x2="900"
          y2="185"
          strokeWidth="1"
          strokeDasharray="3 8"
          opacity="0.10"
        />
      </g>

      {/* -------------------------------------------------------------- */}
      {/* Scenario / valuation rings                                     */}
      {/* -------------------------------------------------------------- */}

      <g stroke={visual.secondary}>
        <motion.ellipse
          cx="700"
          cy="215"
          rx="80"
          ry="48"
          strokeWidth="1.4"
          opacity="0.18"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 1.2,
            delay: 0.5,
          }}
        />

        <motion.ellipse
          cx="700"
          cy="215"
          rx="135"
          ry="78"
          strokeWidth="1"
          opacity="0.13"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 1.4,
            delay: 0.6,
          }}
        />

        <motion.ellipse
          cx="700"
          cy="215"
          rx="195"
          ry="112"
          strokeWidth="0.8"
          opacity="0.09"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 1.6,
            delay: 0.7,
          }}
        />
      </g>

      {/* -------------------------------------------------------------- */}
      {/* Scenario points                                                */}
      {/* -------------------------------------------------------------- */}

      {[
        [540, 175],
        [700, 215],
        [865, 180],
      ].map(([cx, cy], i) => (
        <motion.circle
          key={`valuation-point-${i}`}
          cx={cx}
          cy={cy}
          r={i === 1 ? 5 : 3}
          fill={i === 1 ? visual.color : visual.secondary}
          animate={{
            opacity:
              i === 1
                ? [0.25, 0.65, 0.25]
                : [0.15, 0.45, 0.15],
          }}
          transition={{
            duration: 3.5,
            delay: i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Central valuation pulse */}
      <motion.circle
        cx="700"
        cy="215"
        r="35"
        fill="none"
        stroke={visual.color}
        strokeWidth="1"
        animate={{
          r: [30, 105],
          opacity: [0.18, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />

      {/* Small moving marker */}
      <motion.circle
        r="3"
        fill={visual.glow}
        animate={{
          cx: [300, 430, 570, 700, 850, 1000],
          cy: [280, 230, 155, 215, 180, 130],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </g>
  );
}

/* ====================================================================== */
/* MARKET INTELLIGENCE VISUAL                                             */
/* Network — intentionally the strongest / most visible visual            */
/* ====================================================================== */

function IntelligenceVisual({ visual }) {
  const nodes = [
    [65, 90],
    [210, 175],
    [365, 80],
    [515, 225],
    [670, 105],
    [820, 190],
    [970, 85],
    [1110, 170],

    [140, 310],
    [325, 335],
    [495, 315],
    [675, 345],
    [850, 305],
    [1015, 345],
  ];

  const connections = [
    [0, 1],
    [0, 2],
    [1, 2],
    [1, 8],
    [1, 9],
    [2, 3],
    [2, 4],
    [3, 4],
    [3, 9],
    [3, 10],
    [4, 5],
    [4, 6],
    [5, 6],
    [5, 10],
    [5, 11],
    [6, 7],
    [6, 12],
    [7, 13],
    [8, 9],
    [9, 10],
    [10, 11],
    [11, 12],
    [12, 13],
  ];

  return (
    <g>
      {/* -------------------------------------------------------------- */}
      {/* Network connections                                             */}
      {/* -------------------------------------------------------------- */}

      <g
        stroke={visual.color}
        strokeWidth="1.2"
        opacity="0.25"
      >
        {connections.map(([a, b], i) => (
          <motion.line
            key={`intelligence-line-${i}`}
            x1={nodes[a][0]}
            y1={nodes[a][1]}
            x2={nodes[b][0]}
            y2={nodes[b][1]}
            initial={{
              pathLength: 0,
              opacity: 0,
            }}
            animate={{
              pathLength: 1,
              opacity: 0.25,
            }}
            transition={{
              duration: 1.25,
              delay: i * 0.05,
              ease: "easeOut",
            }}
          />
        ))}
      </g>

      {/* -------------------------------------------------------------- */}
      {/* Network nodes                                                   */}
      {/* -------------------------------------------------------------- */}

      {nodes.map(([cx, cy], i) => (
        <motion.g key={`intelligence-node-${i}`}>
          <circle
            cx={cx}
            cy={cy}
            r={i % 4 === 0 ? 5 : 3.5}
            fill={visual.color}
            opacity="0.42"
          />

          <circle
            cx={cx}
            cy={cy}
            r="11"
            fill="none"
            stroke={visual.secondary}
            strokeWidth="0.8"
            opacity="0.20"
          />

          <motion.circle
            cx={cx}
            cy={cy}
            r="17"
            fill="none"
            stroke={visual.secondary}
            strokeWidth="0.7"
            animate={{
              r: [12, 24],
              opacity: [0.12, 0],
            }}
            transition={{
              duration: 4,
              delay: i * 0.16,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        </motion.g>
      ))}

      {/* Moving intelligence signal */}
      <motion.circle
        r="3.5"
        fill={visual.glow}
        animate={{
          cx: [
            65,
            210,
            365,
            515,
            670,
            820,
            970,
            1110,
          ],
          cy: [
            90,
            175,
            80,
            225,
            105,
            190,
            85,
            170,
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </g>
  );
}

/* ====================================================================== */
/* STRATEGY VISUAL                                                        */
/* Branching options → decisions → strategic destination                  */
/* ====================================================================== */

function StrategyVisual({ visual }) {
  const paths = [
    "M-30 90 C120 90 205 110 310 155 C420 200 510 245 625 240 C760 235 865 170 970 115 C1040 80 1100 65 1170 60",

    "M-30 175 C120 175 215 165 320 190 C430 215 505 265 625 275 C760 287 875 205 975 150 C1050 110 1110 90 1170 85",

    "M-30 260 C115 260 220 225 330 220 C450 215 530 275 650 300 C775 325 885 245 990 190 C1060 155 1115 125 1170 115",

    "M-30 350 C120 350 220 310 350 270 C470 232 555 295 675 320 C795 345 900 275 1000 220 C1070 180 1120 150 1170 145",

    "M-30 390 C130 390 260 355 380 315 C500 275 600 330 710 345 C825 360 930 300 1025 245 C1090 210 1130 185 1170 175",
  ];

  return (
    <g fill="none" strokeLinecap="round">
      {/* -------------------------------------------------------------- */}
      {/* Strategic option paths                                          */}
      {/* -------------------------------------------------------------- */}

      {paths.map((path, i) => (
        <motion.path
          key={`strategy-path-${i}`}
          d={path}
          stroke={
            i === 1
              ? visual.secondary
              : visual.color
          }
          strokeWidth={i === 1 ? "2" : "1.2"}
          opacity={i === 1 ? "0.30" : "0.19"}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2.8,
            delay: i * 0.12,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* -------------------------------------------------------------- */}
      {/* Decision points                                                 */}
      {/* -------------------------------------------------------------- */}

      {[
        [310, 155],
        [430, 215],
        [625, 240],
        [760, 287],
        [900, 170],
        [1020, 115],
      ].map(([cx, cy], i) => (
        <motion.g key={`strategy-decision-${i}`}>
          <circle
            cx={cx}
            cy={cy}
            r="3.5"
            fill={visual.color}
            opacity="0.45"
          />

          <motion.circle
            cx={cx}
            cy={cy}
            r="14"
            fill="none"
            stroke={visual.secondary}
            strokeWidth="0.7"
            animate={{
              r: [10, 20],
              opacity: [0.12, 0],
            }}
            transition={{
              duration: 3.5,
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        </motion.g>
      ))}

      {/* -------------------------------------------------------------- */}
      {/* Strategic destination                                           */}
      {/* -------------------------------------------------------------- */}

      <motion.circle
        cx="1080"
        cy="100"
        r="6"
        fill={visual.secondary}
        animate={{
          r: [5, 7, 5],
          opacity: [0.25, 0.65, 0.25],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.circle
        cx="1080"
        cy="100"
        r="30"
        fill="none"
        stroke={visual.color}
        strokeWidth="1"
        animate={{
          r: [20, 65],
          opacity: [0.16, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />

      {/* Moving strategic signal */}
      <motion.circle
        r="3.5"
        fill={visual.glow}
        animate={{
          cx: [70, 250, 430, 625, 760, 900, 1080],
          cy: [90, 110, 215, 240, 287, 170, 100],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </g>
  );
}

/* ====================================================================== */
/* ANALYTICAL BACKGROUND                                                  */
/* ====================================================================== */

function AnalyticalBackground({ group }) {
  const visual = VISUALS[group.id] ?? VISUALS.finance;

  return (
    <motion.div
      key={group.id}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      initial={{
        backgroundColor: visual.background,
      }}
      animate={{
        backgroundColor: visual.background,
      }}
      transition={{
        duration: 0.7,
      }}
    >
      {/* ============================================================ */}
      {/* Slight group-specific ambient glow                             */}
      {/* ============================================================ */}

      <motion.div
        key={`${group.id}-glow`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7 }}
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 80% 95% at 55% 50%,
              ${visual.color}12 0%,
              ${visual.color}08 42%,
              transparent 78%
            )
          `,
        }}
      />

      {/* ============================================================ */}
      {/* FULL SECTION ARTWORK                                           */}
      {/* ============================================================ */}

      <AnimatePresence mode="wait">
        <motion.div
          key={`${group.id}-visual`}
          initial={{
            opacity: 0,
            scale: 0.985,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 1.015,
          }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0"
        >
          <svg
            viewBox="0 0 1140 420"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* ------------------------------------------------------ */}
            {/* Architectural grid                                      */}
            {/* ------------------------------------------------------ */}

            <g opacity="0.045">
              {Array.from({ length: 24 }).map((_, i) => (
                <line
                  key={`grid-v-${i}`}
                  x1={i * 50}
                  y1="0"
                  x2={i * 50}
                  y2="420"
                  stroke={visual.color}
                  strokeWidth="1"
                />
              ))}

              {Array.from({ length: 9 }).map((_, i) => (
                <line
                  key={`grid-h-${i}`}
                  x1="0"
                  y1={i * 52}
                  x2="1140"
                  y2={i * 52}
                  stroke={visual.color}
                  strokeWidth="1"
                />
              ))}
            </g>

            {/* ------------------------------------------------------ */}
            {/* Group-specific artwork                                  */}
            {/* ------------------------------------------------------ */}

            {visual.type === "finance" && (
              <FinanceVisual visual={visual} />
            )}

            {visual.type === "valuation" && (
              <ValuationVisual visual={visual} />
            )}

            {visual.type === "intelligence" && (
              <IntelligenceVisual visual={visual} />
            )}

            {visual.type === "strategy" && (
              <StrategyVisual visual={visual} />
            )}
          </svg>
        </motion.div>
      </AnimatePresence>

      {/* ============================================================ */}
      {/* CONTENT READABILITY VEIL                                      */}
      {/* ============================================================ */}

      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              90deg,
              rgba(247,248,250,0.78) 0%,
              rgba(247,248,250,0.68) 24%,
              rgba(247,248,250,0.52) 46%,
              rgba(247,248,250,0.28) 70%,
              rgba(247,248,250,0.08) 100%
            )
          `,
        }}
      />

      {/* ============================================================ */}
      {/* Soft paper wash                                               */}
      {/* ============================================================ */}

      <div className="absolute inset-0 bg-paper/10" />

      {/* ============================================================ */}
      {/* Bottom fade                                                   */}
      {/* ============================================================ */}

      <div
        className="absolute inset-x-0 bottom-0 h-28"
        style={{
          background:
            "linear-gradient(to top, rgba(247,248,250,0.92), transparent)",
        }}
      />
    </motion.div>
  );
}

/* ====================================================================== */
/* SERVICES SECTION                                                       */
/* ====================================================================== */

export default function Services() {
  const [activeGroup, setActiveGroup] = useState(0);
  const [openService, setOpenService] = useState(0);

  const group = PRACTICE_GROUPS[activeGroup];

  function selectGroup(id) {
    const i = PRACTICE_GROUPS.findIndex(
      (g) => g.id === id
    );

    setActiveGroup(i);
    setOpenService(0);
  }

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-paper"
    >
      {/* ============================================================ */}
      {/* Dynamic background                                             */}
      {/* ============================================================ */}

      <AnalyticalBackground group={group} />

      {/* ============================================================ */}
      {/* Main content                                                   */}
      {/* ============================================================ */}

      <div className="relative max-w-content mx-auto px-6 md:px-10 pt-8 md:pt-10 pb-12 md:pb-16">
        <Reveal>
          <Eyebrow className="font-semibold">
            What we do
          </Eyebrow>

          <h2 className="font-display font-bold text-3xl md:text-5xl max-w-2xl mt-4 mb-3 tracking-[-0.02em]">
            {SERVICE_COUNT} services, four practice groups, one firm.
          </h2>

          <p className="text-graphite/90 max-w-2xl mb-10 leading-relaxed font-semibold">
            Organised the way the Big Four and every established KPO organise
            — by the discipline being practised. Pick a group, then a service,
            to see exactly what you get back.
          </p>
        </Reveal>

        {/* ========================================================== */}
        {/* Practice group tabs                                         */}
        {/* ========================================================== */}

        <Reveal delay={0.05}>
          <div className="relative">
            <div className="relative">
              <Tabs
                value={group.id}
                onValueChange={selectGroup}
                className="mb-5"
              >
                <TabsList>
                  {PRACTICE_GROUPS.map((g) => {
                    const isActive = g.id === group.id;

                    return (
                      <TabsTrigger
                        key={g.id}
                        value={g.id}
                        className={
                          "isolate font-semibold " +
                          (isActive
                            ? "border-transparent text-paper"
                            : "border-rule bg-white/90 text-graphite/85 hover:text-graphite hover:border-graphite/40")
                        }
                      >
                        {isActive && (
                          <motion.span
                            layoutId="service-pill-bg"
                            className="absolute inset-0 rounded-full -z-10"
                            style={{
                              background: g.color,
                            }}
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
                              : g.color,
                          }}
                        />

                        {g.short}

                        <span
                          className={`font-mono font-semibold text-[11px] ${
                            isActive
                              ? "text-paper/90"
                              : "text-graphite/75"
                          }`}
                        >
                          {String(
                            g.services.length
                          ).padStart(2, "0")}
                        </span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              </Tabs>

              {/* ====================================================== */}
              {/* Group description                                       */}
              {/* ====================================================== */}

              <AnimatePresence mode="wait">
                <motion.p
                  key={group.id + "-blurb"}
                  initial={{
                    opacity: 0,
                    y: 4,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -4,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="text-sm text-graphite leading-relaxed mb-5 max-w-2xl font-semibold"
                >
                  {group.blurb}
                </motion.p>
              </AnimatePresence>

              {/* ====================================================== */}
              {/* Service accordion card                                 */}
              {/* ====================================================== */}

              <div className="rounded-2xl border border-rule bg-white/95 backdrop-blur-sm overflow-hidden shadow-[0_18px_44px_-28px_rgba(15,26,40,0.35)]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={group.id}
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.15,
                    }}
                  >
                    {group.services.map((s, i) => {
                      const isOpen = i === openService;

                      return (
                        <div
                          key={s.name}
                          className={
                            i !==
                            group.services.length - 1
                              ? "border-b border-rule"
                              : ""
                          }
                        >
                          <button
                            onClick={() =>
                              setOpenService(
                                isOpen ? -1 : i
                              )
                            }
                            aria-expanded={isOpen}
                            className={`group w-full flex items-center gap-4 px-5 md:px-7 py-4 text-left transition-colors duration-200 ${
                              isOpen
                                ? "bg-paper-2/70"
                                : "hover:bg-paper/80"
                            }`}
                          >
                            {/* Service indicator */}
                            <span
                              className="h-2 w-2 rounded-full shrink-0"
                              style={{
                                background:
                                  group.color,
                                opacity: isOpen
                                  ? 1
                                  : 0.6,
                              }}
                            />

                            {/* Service name */}
                            <span
                              className={`flex-1 font-display font-bold text-base md:text-lg tracking-[0.01em] transition-colors ${
                                isOpen
                                  ? "text-graphite"
                                  : "text-graphite/95"
                              }`}
                            >
                              {s.name}
                            </span>

                            {/* View details */}
                            {!isOpen && (
                              <span className="hidden md:inline text-xs font-semibold text-graphite/85 group-hover:text-amber-2 shrink-0">
                                View details
                              </span>
                            )}

                            {/* Plus / close */}
                            <motion.span
                              animate={{
                                rotate: isOpen
                                  ? 45
                                  : 0,
                              }}
                              transition={{
                                duration: 0.25,
                              }}
                              className={`shrink-0 rounded-full p-1 transition-colors ${
                                isOpen
                                  ? "text-ink bg-amber"
                                  : "text-graphite/80 group-hover:bg-paper-2"
                              }`}
                            >
                              <Plus size={16} />
                            </motion.span>
                          </button>

                          {/* ================================================= */}
                          {/* Expanded service information                    */}
                          {/* ================================================= */}

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
                                <div className="px-5 md:px-7 pb-6 pt-1 grid md:grid-cols-[1.4fr_1fr] gap-6">
                                  <p className="text-[15px] text-graphite leading-relaxed font-medium">
                                    {s.what}
                                  </p>

                                  <div className="md:border-l md:border-rule md:pl-6">
                                    <div className="flex items-start gap-2 text-sm text-graphite leading-relaxed font-medium">
                                      <FileOutput
                                        size={13}
                                        className="mt-0.5 shrink-0"
                                        style={{
                                          color:
                                            group.color,
                                        }}
                                      />

                                      <span>
                                        {s.deliverable}
                                      </span>
                                    </div>
                                  </div>
                                </div>
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}