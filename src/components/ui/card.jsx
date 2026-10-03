import { cn } from "../../lib/utils";

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-rule bg-paper/60 backdrop-blur-sm p-6 transition-all duration-300",
        className
      )}
      {...props}
    />
  );
}

export function CardDark({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-rule-dark bg-ink-2/60 backdrop-blur-sm p-6 transition-all duration-300",
        className
      )}
      {...props}
    />
  );
}
