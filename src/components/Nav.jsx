import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { buttonVariants } from "./ui/button";
import logo from "../assets/logo.png";

// Site structure: Home · About · Services · Resources ▾ · Contact us
const LINKS_BEFORE = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
];

// Items under the "Resources" dropdown. Add Process here once that section
// exists (give the section a matching id):
//   { label: "Process", href: "#process" },
const RESOURCES = [
  { label: "FAQs", href: "#faqs" },
  { label: "Testimonials", href: "#testimonials" },
];

const linkCls = "text-sm text-graphite/85 hover:text-graphite transition-colors";

function ResourcesMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className={`${linkCls} inline-flex items-center gap-1`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        Resources
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3">
          <div
            role="menu"
            className="min-w-44 rounded-xl border border-rule bg-paper shadow-[0_16px_40px_-16px_rgba(18,16,14,0.25)] p-1.5"
          >
            {RESOURCES.map((r) => (
              <a
                key={r.href}
                href={r.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm text-graphite/85 hover:bg-paper-2 hover:text-graphite transition-colors"
              >
                {r.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur border-b border-rule">
      <div className="max-w-content mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <img src={logo} alt="HV Consultancy" className="h-8 w-8" />
          <span className="font-display text-lg tracking-tight text-ink">
            HV Consultancy
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS_BEFORE.map((link) => (
            <a key={link.href} href={link.href} className={linkCls}>
              {link.label}
            </a>
          ))}
          <ResourcesMenu />
          <a
            href="#contact"
            className={buttonVariants({ variant: "outline", size: "sm", className: "text-ink border-ink hover:!bg-ink hover:!text-paper" })}
          >
            Contact us <ArrowUpRight size={14} />
          </a>
        </nav>

        <button
          className="md:hidden text-graphite"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-rule bg-paper px-6 py-4 flex flex-col gap-4">
          {LINKS_BEFORE.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-graphite/90"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wide text-graphite/70 mb-2">Resources</p>
            <div className="flex flex-col gap-3 pl-3 border-l border-rule">
              {RESOURCES.map((r) => (
                <a key={r.href} href={r.href} className="text-sm text-graphite/90" onClick={() => setOpen(false)}>
                  {r.label}
                </a>
              ))}
            </div>
          </div>
          <a href="#contact" className="text-sm font-medium text-ink" onClick={() => setOpen(false)}>
            Contact us →
          </a>
        </nav>
      )}
    </header>
  );
}
