import { useEffect, useRef, useState } from "react";
import { GraduationCap, Sparkles, Star } from "lucide-react";
import { education } from "@/data/profile";
import { GlassCard, Modal, Section } from "./primitives";
import { useReveal } from "@/lib/portfolio";
import { cn } from "@/lib/utils";
import graduateScene from "@/assets/scene-graduate.png";

type Edu = (typeof education)[number];

export function Education() {
  const [openBook, setOpenBook] = useState<Edu | null>(null);
  const [unlocked, setUnlocked] = useState<string[]>([]);

  const markUnlocked = (id: string) => {
    setUnlocked((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  return (
    <Section
      id="education"
      eyebrow="Education"
      title="MY LEARNING JOURNEY"
      intro="Every stage of study that brought me to my current MCA programme at Holy Cross College. Flip a card to reveal the result."
    >
      <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-start">
        <div>
          <p className="text-muted-foreground font-mono text-[10px] tracking-[0.22em]">
            {unlocked.length} / {education.length} ACADEMIC MILESTONES UNLOCKED
          </p>
          <ul className="scene mt-5 grid gap-5 sm:grid-cols-2">
            {education.map((e, i) => (
              <FlipCard key={e.id} item={e} index={i} onFlip={() => markUnlocked(e.id)} />
            ))}
          </ul>
          <button
            onClick={() => setOpenBook(education[education.length - 1] as Edu)}
            data-cursor="OPEN"
            className="text-primary hover:bg-primary/10 mt-6 inline-flex min-h-11 items-center gap-2 rounded-full px-4 font-mono text-[11px] tracking-[0.2em] transition-colors"
          >
            <GraduationCap className="h-4 w-4" aria-hidden="true" /> VIEW CURRENT STAGE
          </button>
        </div>

        <GraduationScene onCertificate={() => setOpenBook(education[education.length - 1] as Edu)} />
      </div>

      <Modal
        open={Boolean(openBook)}
        onClose={() => setOpenBook(null)}
        title={openBook ? openBook.title : ""}
      >
        {openBook ? (
          <div className="space-y-2">
            <p className="text-primary font-mono text-xs tracking-[0.18em]">{openBook.year}</p>
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

function FlipCard({ item, index, onFlip }: { item: Edu; index: number; onFlip: () => void }) {
  const { ref, visible } = useReveal<HTMLLIElement>();
  const [flipped, setFlipped] = useState(false);
  const [toast, setToast] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => (timer.current ? clearTimeout(timer.current) : undefined), []);

  const toggle = () => {
    const next = !flipped;
    setFlipped(next);
    if (next) {
      onFlip();
      setToast(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setToast(false), 2000);
    }
  };

  return (
    <li
      ref={ref}
      data-visible={visible}
      className="reveal relative"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <button
        type="button"
        onClick={toggle}
        aria-pressed={flipped}
        data-cursor="INTERACT"
        aria-label={`${item.title} — click to reveal result`}
        className="relative block h-56 w-full text-left [perspective:1200px]"
      >
        <span
          className="relative block h-full w-full transition-transform duration-700"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* front */}
          <span
            className="glass grad-border absolute inset-0 flex flex-col justify-between rounded-2xl p-5"
            style={{ backfaceVisibility: "hidden" }}
          >
            <span>
              <span className="text-primary block font-mono text-[10px] tracking-[0.2em]">
                {item.year}
              </span>
              <span className="font-display mt-2 block text-lg leading-tight font-extrabold">
                {item.title}
              </span>
              <span className="text-muted-foreground mt-1 block text-sm">{item.place}</span>
            </span>
            <span className="text-muted-foreground flex items-center gap-2 font-mono text-[10px] tracking-[0.2em]">
              <Sparkles className="h-3 w-3" aria-hidden="true" /> TAP / CLICK TO REVEAL
            </span>
          </span>

          {/* back */}
          <span
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl p-5 text-center text-white shadow-[var(--shadow-glow)]"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              backgroundImage: "var(--gradient-hero)",
            }}
          >
            <span className="font-mono text-[10px] tracking-[0.24em] opacity-85">
              {item.metricLabel.toUpperCase()}
            </span>
            <span className="font-display text-4xl font-extrabold">
              {item.metricLabel === "Percentage" ? `${item.metric}%` : item.metric.toFixed(2)}
            </span>
            <span className="font-mono text-[10px] tracking-[0.18em] opacity-85">{item.title}</span>
            {item.current ? (
              <span className="mt-1 font-mono text-[10px] tracking-[0.2em] opacity-90">
                CURRENT STAGE
              </span>
            ) : null}
          </span>
        </span>
      </button>

      {toast ? (
        <span className="glass animate-scale-in text-primary pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 font-mono text-[10px] tracking-[0.18em]">
          ACADEMIC MILESTONE UNLOCKED
        </span>
      ) : null}
    </li>
  );
}

function GraduationScene({ onCertificate }: { onCertificate: () => void }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [capNote, setCapNote] = useState(false);

  return (
    <GlassCard
      className="relative overflow-hidden p-6"
      onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => {
        const r = e.currentTarget.getBoundingClientRect();
        setTilt({
          x: ((e.clientX - r.left) / r.width - 0.5) * 16,
          y: ((e.clientY - r.top) / r.height - 0.5) * 16,
        });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <div
        className="absolute inset-0 opacity-70"
        style={{ backgroundImage: "var(--gradient-soft)" }}
        aria-hidden="true"
      />
      <div className="relative">
        <p className="text-primary font-mono text-[10px] tracking-[0.22em]">ACADEMIC TIMELINE</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {education.map((e) => (
            <span
              key={e.id}
              className="border-border/70 bg-card/70 rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.14em]"
            >
              {e.title.split(" ")[0]} · {e.year.split(" ")[0]}
            </span>
          ))}
        </div>

        <div className="relative mt-4 flex justify-center">
          <img
            src={graduateScene}
            alt="Illustration of a graduate student holding a certificate"
            loading="lazy"
            width={1024}
            height={1024}
            className="h-64 w-auto transition-transform duration-300 ease-out sm:h-72"
            style={{ transform: `translate3d(${tilt.x}px, ${tilt.y}px, 0)` }}
          />
          <Star
            className="text-primary/70 animate-pulse absolute top-4 left-4 h-4 w-4"
            aria-hidden="true"
            style={{ transform: `translate3d(${tilt.x * -1.6}px, ${tilt.y * -1.6}px, 0)` }}
          />
          <Star
            className="text-accent/70 animate-pulse absolute right-6 bottom-16 h-3 w-3"
            aria-hidden="true"
            style={{ transform: `translate3d(${tilt.x * 1.8}px, ${tilt.y * 1.4}px, 0)` }}
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={() => {
              setCapNote(true);
              setTimeout(() => setCapNote(false), 2200);
            }}
            data-cursor="INTERACT"
            className="glass hover:border-primary/50 inline-flex min-h-11 items-center gap-2 rounded-full px-4 font-mono text-[10px] tracking-[0.18em] transition-transform hover:-translate-y-0.5"
          >
            <GraduationCap className="h-4 w-4" aria-hidden="true" /> GRADUATION CAP
          </button>
          <button
            onClick={onCertificate}
            data-cursor="OPEN"
            className="glass hover:border-primary/50 inline-flex min-h-11 items-center gap-2 rounded-full px-4 font-mono text-[10px] tracking-[0.18em] transition-transform hover:-translate-y-0.5"
          >
            CERTIFICATE
          </button>
        </div>
        {capNote ? (
          <p className="text-primary animate-scale-in mt-3 font-mono text-[11px] tracking-[0.16em]">
            “Learning is a journey.”
          </p>
        ) : null}
      </div>
    </GlassCard>
  );
}
