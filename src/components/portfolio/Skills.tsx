import { useState } from "react";
import { skillGroups, skillNodes } from "@/data/profile";
import { GlassCard, Modal, Section } from "./primitives";
import { cn } from "@/lib/utils";
import { usePointerParallax } from "@/lib/tilt";

export function Skills() {
  const [active, setActive] = useState<(typeof skillNodes)[number] | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const parallax = usePointerParallax();

  const hoveredCategory = skillNodes.find((n) => n.name === hovered)?.category ?? null;

  return (
    <Section
      id="skills"
      eyebrow="Technical profile"
      title="WHAT I WORK WITH"
      intro="The technologies I have actually studied and worked with — no invented tools, no invented percentages."
    >
      {/* Constellation */}
      <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-10">
        <div className="relative mx-auto aspect-square w-full max-w-xl">
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            {skillNodes.map((n, i) => {
              const a = (i / skillNodes.length) * Math.PI * 2 - Math.PI / 2;
              const r = i % 2 === 0 ? 40 : 30;
              return (
                <line
                  key={n.name}
                  x1="50"
                  y1="50"
                  x2={50 + Math.cos(a) * r}
                  y2={50 + Math.sin(a) * r}
                  stroke="currentColor"
                  strokeWidth="0.25"
                  className={cn(
                    "text-primary transition-opacity duration-300",
                    hovered === n.name ? "opacity-90" : "opacity-25",
                  )}
                />
              );
            })}
          </svg>

          <div
            className="text-primary-foreground absolute top-1/2 left-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-center font-mono text-xs font-bold tracking-[0.16em] shadow-[var(--shadow-glow)]"
            style={{ backgroundImage: "var(--gradient-hero)" }}
          >
            SURIYA
          </div>

          {skillNodes.map((n, i) => {
            const a = (i / skillNodes.length) * Math.PI * 2 - Math.PI / 2;
            const r = i % 2 === 0 ? 40 : 30;
            const highlight = hoveredCategory === n.category;
            return (
              <button
                key={n.name}
                onMouseEnter={() => setHovered(n.name)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(n.name)}
                onBlur={() => setHovered(null)}
                onClick={() => setActive(n)}
                data-cursor="VIEW"
                aria-label={`${n.name} — ${n.category}`}
                className={cn(
                  "glass animate-float absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-2 font-mono text-[10px] tracking-[0.12em] transition-all duration-300 sm:text-xs",
                  highlight ? "border-primary/60 text-primary scale-110" : "text-foreground/80",
                  hovered === n.name && "shadow-[var(--shadow-glow)] scale-125",
                )}
                style={{
                  left: `${50 + Math.cos(a) * r}%`,
                  top: `${50 + Math.sin(a) * r}%`,
                  animationDelay: `${i * 0.3}s`,
                  translate: `${(parallax.x * (i % 3 === 0 ? 10 : 6)).toFixed(2)}px ${(parallax.y * (i % 2 === 0 ? 8 : 5)).toFixed(2)}px`,
                }}
              >
                {n.name}
              </button>
            );
          })}
        </div>
        <p className="text-muted-foreground mt-6 text-center font-mono text-[10px] tracking-[0.2em]">
          HOVER OR FOCUS A NODE • CLICK FOR DETAILS
        </p>
      </div>

      {/* Accessible grouped list — same info, never hover-only */}
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g) => (
          <li key={g.title}>
            <GlassCard as="article" className="lift h-full p-6">
              <h3 className="text-primary font-mono text-[11px] tracking-[0.18em]">{g.title}</h3>
              <ul className="mt-4 space-y-2">
                {g.items.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundImage: "var(--gradient-hero)" }}
                    />
                    {s}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </li>
        ))}
      </ul>

      <Modal open={Boolean(active)} onClose={() => setActive(null)} title={active?.name ?? ""}>
        {active ? (
          <div className="space-y-2">
            <p className="text-primary font-mono text-xs tracking-[0.18em]">
              CATEGORY — {active.category}
            </p>
            <p className="text-muted-foreground">
              Part of my technical profile as an MCA student. Studied through coursework, internships
              and practical project work.
            </p>
          </div>
        ) : null}
      </Modal>
    </Section>
  );
}
