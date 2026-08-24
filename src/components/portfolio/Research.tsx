import { useEffect, useRef, useState } from "react";
import { Award, CalendarDays, Presentation, Trophy, Users } from "lucide-react";
import { research } from "@/data/profile";
import { GlassCard, Modal, PrimaryButton, Section } from "./primitives";
import { useReducedMotion } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

export function Research() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [trophyOpen, setTrophyOpen] = useState(false);
  const [clubOpen, setClubOpen] = useState(false);
  const areaRef = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = areaRef.current;
    if (!el || reduce) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setTilt({
        x: ((e.clientX - r.left) / r.width - 0.5) * 14,
        y: ((e.clientY - r.top) / r.height - 0.5) * 14,
      });
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", () => setTilt({ x: 0, y: 0 }));
    return () => el.removeEventListener("mousemove", onMove);
  }, [reduce]);

  return (
    <Section
      id="research"
      eyebrow="Research & exploration"
      title="CURIOUS BEYOND THE CODE"
      intro="Research • Exploration • Emerging Technology"
    >
      <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
        <GlassCard className="p-6 sm:p-8">
          <h3 className="text-lg leading-snug font-bold sm:text-xl">{research.title}</h3>
          <div ref={areaRef} className="scene mt-8">
            <div
              className="relative mx-auto aspect-square w-full max-w-sm transition-transform duration-300"
              style={{ transform: `rotateY(${tilt.x}deg) rotateX(${-tilt.y}deg)` }}
            >
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
                {research.nodes.map((_, i) => {
                  const a = (i / research.nodes.length) * Math.PI * 2 - Math.PI / 2;
                  return (
                    <line
                      key={i}
                      x1="50"
                      y1="50"
                      x2={50 + Math.cos(a) * 36}
                      y2={50 + Math.sin(a) * 36}
                      className="text-accent opacity-40"
                      stroke="currentColor"
                      strokeWidth="0.3"
                      strokeDasharray="2 2"
                    />
                  );
                })}
              </svg>
              <span
                className="text-primary-foreground absolute top-1/2 left-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-center font-mono text-[9px] font-bold tracking-[0.14em] shadow-[var(--shadow-glow)]"
                style={{ backgroundImage: "var(--gradient-hero)" }}
              >
                RESEARCH
              </span>
              {research.nodes.map((n, i) => {
                const a = (i / research.nodes.length) * Math.PI * 2 - Math.PI / 2;
                return (
                  <span
                    key={n}
                    className="glass animate-float absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1.5 text-center font-mono text-[10px] tracking-[0.1em]"
                    style={{
                      left: `${50 + Math.cos(a) * 36}%`,
                      top: `${50 + Math.sin(a) * 36}%`,
                      animationDelay: `${i * 0.4}s`,
                    }}
                  >
                    {n}
                  </span>
                );
              })}
            </div>
          </div>
          <ul className="text-muted-foreground mt-6 flex flex-wrap gap-2 font-mono text-[10px] tracking-[0.16em]">
            {research.nodes.map((n) => (
              <li key={n} className="rounded-full border px-3 py-1">
                {n}
              </li>
            ))}
          </ul>
        </GlassCard>

        <div className="space-y-6">
          {/* Trophy */}
          <GlassCard className="scene p-6 sm:p-8">
            <h3 className="font-mono text-xs tracking-[0.2em] text-primary">RESEARCH RECOGNITION</h3>
            <button
              onClick={() => setTrophyOpen(true)}
              data-cursor="OPEN"
              aria-label="Open Best Paper Award details"
              className="group relative mt-6 flex w-full flex-col items-center rounded-2xl border p-6 transition-transform duration-500 hover:-translate-y-1 hover:[transform:translateZ(30px)_rotateX(6deg)]"
            >
              <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl" aria-hidden="true">
                {[12, 34, 58, 76, 88].map((l, i) => (
                  <span
                    key={l}
                    className="animate-float absolute h-1.5 w-1.5 rounded-full bg-[var(--peach)] opacity-0 transition-opacity duration-500 group-hover:opacity-90"
                    style={{ left: `${l}%`, top: `${20 + i * 12}%`, animationDelay: `${i * 0.3}s` }}
                  />
                ))}
              </span>
              <span
                className="inline-flex h-16 w-16 items-center justify-center rounded-2xl text-[var(--ink)] transition-transform duration-700 group-hover:rotate-12"
                style={{ backgroundImage: "var(--gradient-warm)" }}
              >
                <Trophy className="h-8 w-8" aria-hidden="true" />
              </span>
              <span className="font-display mt-4 text-xl font-extrabold">Best Paper Award</span>
              <span className="text-muted-foreground mt-2 text-center text-xs leading-relaxed">
                International Conference on Next-Gen AI and Emerging Technologies for Sustainable
                Development
              </span>
              <span className="text-primary mt-2 font-mono text-[10px] tracking-[0.2em]">2026</span>
            </button>
          </GlassCard>

          {/* Research club */}
          <GlassCard className="p-6 sm:p-8">
            <h3 className="text-primary font-mono text-xs tracking-[0.2em]">
              CONTRIBUTING BEYOND MY PROJECTS
            </h3>
            <p className="mt-3 text-lg font-bold">Secretary — Research Club</p>
            <p className="text-muted-foreground text-sm">Holy Cross College</p>
            <button
              onClick={() => setClubOpen(true)}
              data-cursor="OPEN"
              className="mt-5 grid w-full grid-cols-4 gap-2 rounded-2xl border p-4 transition-colors hover:border-primary/50"
              aria-label="Open Research Club contribution details"
            >
              {[Award, CalendarDays, Users, Presentation].map((Icon, i) => (
                <span
                  key={i}
                  className={cn(
                    "flex h-12 items-center justify-center rounded-xl border transition-transform duration-500",
                    "hover:-translate-y-1",
                  )}
                >
                  <Icon className="text-primary h-5 w-5" aria-hidden="true" />
                </span>
              ))}
            </button>
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
              I am willing to participate, contribute, organize, collaborate, and learn with others.
            </p>
          </GlassCard>
        </div>
      </div>

      <Modal
        open={trophyOpen}
        onClose={() => setTrophyOpen(false)}
        title="Best Paper Award"
        footer={<PrimaryButton onClick={() => setTrophyOpen(false)}>BACK</PrimaryButton>}
      >
        <p className="text-primary font-mono text-xs tracking-[0.18em]">2026</p>
        <p>
          International Conference on Next-Gen AI and Emerging Technologies for Sustainable
          Development.
        </p>
        <p className="text-muted-foreground text-sm">
          Recognition connected to my research interest: {research.title}.
        </p>
      </Modal>

      <Modal open={clubOpen} onClose={() => setClubOpen(false)} title="Secretary — Research Club">
        <p className="text-muted-foreground text-sm">Holy Cross College</p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {["Leadership", "Research", "Collaboration", "Contribution"].map((t) => (
            <li key={t} className="glass rounded-xl px-4 py-3 font-mono text-xs tracking-[0.16em]">
              {t}
            </li>
          ))}
        </ul>
      </Modal>
    </Section>
  );
}
