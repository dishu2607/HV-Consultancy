import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin amber bar pinned to the very top of the viewport that fills as the
 * page scrolls — a persistent, unmissable "this page moves" signal.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-amber origin-left z-[60]"
    />
  );
}
