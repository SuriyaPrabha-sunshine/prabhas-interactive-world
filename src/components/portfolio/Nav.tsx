import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "@/data/profile";
import { scrollToId, useActiveSection } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

const ids = navItems.map((n) => n.id);

export function Nav() {
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header
      className={cn(
        "no-print fixed inset-x-0 top-0 z-90 transition-all duration-300",
        solid ? "glass border-b" : "border-b border-transparent",
      )}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8"
      >
        <button
          onClick={() => go("home")}
          className="text-left font-display text-sm font-extrabold tracking-[0.2em]"
        >
          <span className="gradient-text">SURIYA PRABHA</span>
          <span className="text-muted-foreground block font-mono text-[10px] tracking-[0.18em]">
            MCA • DEV • DESIGN • RESEARCH
          </span>
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => go(item.id)}
                aria-current={active === item.id ? "true" : undefined}
                className={cn(
                  "relative rounded-full px-3 py-2 font-mono text-[11px] tracking-[0.14em] transition-colors",
                  active === item.id
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-primary",
                )}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="glass inline-flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
        >
          {open ? (
            <X className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Menu className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </nav>

      {open ? (
        <div id="mobile-nav" className="glass border-t px-5 pt-2 pb-5 lg:hidden">
          <ul className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => go(item.id)}
                  className={cn(
                    "min-h-11 w-full rounded-xl border px-3 py-2 text-left font-mono text-[11px] tracking-[0.14em]",
                    active === item.id
                      ? "border-primary/50 text-primary bg-primary/10"
                      : "border-border text-muted-foreground",
                  )}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
