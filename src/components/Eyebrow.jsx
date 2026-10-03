/** Section label: a short rule and a small caption in sentence case. */
export default function Eyebrow({ children, dark = false }) {
  return (
    <span
      className={`inline-flex items-center gap-3 text-sm font-medium tracking-wide ${
        dark ? "text-amber" : "text-azure"
      }`}
    >
      <span className="h-px w-8 bg-current opacity-60" />
      {children}
    </span>
  );
}
