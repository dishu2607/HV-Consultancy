import { cn } from "../../lib/utils";

/**
 * Floating-label field. Label sits inside the field until focused or
 * filled, then floats up. Pure CSS via the peer-* pattern — no JS state.
 */
export function FloatingField({ label, as = "input", className, ...props }) {
  const Tag = as;

  return (
    <div className="relative">
      <Tag
        {...props}
        placeholder=" "
        className={cn(
          "peer w-full bg-transparent border-b border-rule-dark pt-6 pb-2 text-paper outline-none transition-colors duration-300",
          "focus:border-amber",
          as === "textarea" && "resize-none",
          className
        )}
      />
      <label
        className={cn(
          "absolute left-0 top-0 text-xs text-paper/40 transition-all duration-300 pointer-events-none",
          "peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-paper/40",
          "peer-focus:top-0 peer-focus:text-xs peer-focus:text-amber"
        )}
      >
        {label}
      </label>
    </div>
  );
}

