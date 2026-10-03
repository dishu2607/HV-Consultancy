/**
 * Endless horizontal marquee. Items are rendered twice so the loop is
 * seamless. It keeps moving on its own and pauses while the cursor is over
 * it (or something inside has keyboard focus). With "reduce motion" on, it
 * becomes a normal horizontally scrollable row.
 */
export default function Marquee({ children, reverse = false, duration = 60, className = "" }) {
  return (
    <div
      className={`group/marquee overflow-hidden motion-reduce:overflow-x-auto ${className}`}
      style={{
        maskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
      }}
    >
      <div
        className="flex w-max gap-5 motion-reduce:animate-none group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused]"
        style={{
          animation: `${reverse ? "marquee-reverse" : "marquee"} ${duration}s linear infinite`,
        }}
      >
        {children}
        <div className="contents" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
