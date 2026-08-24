import { useEffect, useState } from "react";
import { GraduationCap, Sparkles } from "lucide-react";
import { education } from "@/data/profile";
import { GlassCard, Modal, Section } from "./primitives";
import { useReveal } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

type Edu = (typeof education)[number];

export function Education() {
  const [openBook, setOpenBook] = useState<Edu | null>(null);

  return (
    <Section
      id="education"
      eyebrow="Education"
      title="MY LEARNING JOURNEY"
      intro="Every stage of study that brought me to my current MCA programme at Holy Cross College."
    >
      <ol className="relative space-y-6 border-l pl-6 sm:pl-10">
        {education.map((e, i) => (
          <TimelineItem key={e.id} item={e} index={i} />
        ))}
      </ol>

      <div className="mt-14">
        <h3 className="font-mono text-xs tracking-[0.2em] text-primary">
          THE SHELF — OPEN A BOOK
        </h3>
        <p className="text-muted-foreground mt-2 text-sm">
          Each book holds the same information as the timeline above, in case you prefer to browse.
        </p>
        <ul className="scene mt-6 grid grid-cols-2 gap-5 sm:grid-cols-4">
          {education.map((e) => (
            <li key={e.id}>
              <button
                onClick={() => setOpenBook(e)}
                data-cursor="OPEN"
                aria-label={`Open ${e.title} details`}
                className="group relative block h-44 w-full rounded-r-2xl rounded-l-md text-left transition-transform duration-500 hover:-translate-y-2 hover:[transform:rotateY(-16deg)_translateY(-8px)]"
                style={{ transformStyle: "preserve-3d" }}
              >
                <span
                  className="absolute inset-0 rounded-r-2xl rounded-l-md p-4 shadow-[var(--shadow-soft)]"
                  style={{ backgroundImage: "var(--gradient-hero)" }}
                >
                  <span className="block h-full rounded-r-xl rounded-l-sm border border-white/25 p-3 text-white">
                    <span className="font-display block text-lg font-extrabold">{e.title.split(" ")[0]}</span>
                    <span className="mt-2 block font-mono text-[10px] tracking-[0.16em] opacity-85">
                      {e.year}
                    </span>
                    <span className="mt-6 block font-mono text-[10px] tracking-[0.16em] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      OPEN →
                    </span>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Modal
        open={Boolean(openBook)}
        onClose={() => setOpenBook(null)}
        title={openBook ? openBook.title : ""}
      >
        {openBook ? (
          <div className="space-y-2">
            <p className="font-mono text-xs tracking-[0.18em] text-primary">{openBook.year}</p>
            <p className="font-semibold">{openBook.place}</p>
            <p className="text-muted-foreground">{openBook.score}</p>
            {openBook.id === "mca" ? (
              <p className="text-muted-foreground">Current stage of my learning journey.</p>
            ) : null}
          </div>
        ) : null}
      </Modal>
    </Section>
  );
}

function TimelineItem({ item, index }: { item: Edu; index: number }) {
  const { ref, visible } = useReveal<HTMLLIElement>();
  return (
    <li
      ref={ref}
      data-visible={visible}
      className="reveal relative"
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-6 -left-[1.85rem] flex h-5 w-5 items-center justify-center rounded-full border-2 bg-card transition-all duration-700 sm:-left-[3.1rem]",
          visible ? "border-primary scale-100" : "scale-50 border-border",
        )}
      >
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundImage: "var(--gradient-hero)" }}
        />
      </span>
      <GlassCard
        as="article"
        className={cn("lift p-6", item.current && "shadow-[var(--shadow-glow)]")}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-mono text-xs tracking-[0.18em] text-primary">{item.year}</p>
            <h3 className="mt-2 text-lg font-bold sm:text-xl">{item.title}</h3>
            <p className="text-muted-foreground mt-1 text-sm">{item.place}</p>
          </div>
          <div className="text-right">
            <p className="font-display text-2xl font-extrabold">
              <CountUp to={item.metric} run={visible} />
              {item.metricLabel === "Percentage" ? "%" : ""}
            </p>
            <p className="text-muted-foreground font-mono text-[10px] tracking-[0.18em]">
              {item.metricLabel}
            </p>
          </div>
        </div>
        {item.current ? (
          <p className="text-primary mt-4 inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em]">
            <Sparkles className="h-3 w-3" aria-hidden="true" /> CURRENT STAGE
          </p>
        ) : (
          <p className="text-muted-foreground mt-4 inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em]">
            <GraduationCap className="h-3 w-3" aria-hidden="true" /> COMPLETED
          </p>
        )}
      </GlassCard>
    </li>
  );
}

function CountUp({ to, run }: { to: number; run: boolean }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(to);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 900);
      setN(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [run, to]);

  return <>{n.toFixed(2)}</>;
}
