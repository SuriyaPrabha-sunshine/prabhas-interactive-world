import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  Award,
  BatteryFull,
  BookOpen,
  Code2,
  FolderOpen,
  Mail,
  Microscope,
  Minus,
  Power,
  User,
  Wifi,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  achievements,
  education,
  profile,
  research,
  skillGroups,
  internships,
} from "@/data/profile";
import { scrollToId, useReducedMotion } from "@/lib/portfolio";
import { usePointerParallax } from "@/lib/tilt";
import { cn } from "@/lib/utils";

type AppId = "profile" | "education" | "skills" | "projects" | "research" | "achievements" | "contact";

const apps: { id: AppId; label: string; icon: LucideIcon; section: string }[] = [
  { id: "profile", label: "Profile", icon: User, section: "about" },
  { id: "education", label: "Education", icon: BookOpen, section: "education" },
  { id: "skills", label: "Skills", icon: Code2, section: "skills" },
  { id: "projects", label: "Projects", icon: FolderOpen, section: "projects" },
  { id: "research", label: "Research", icon: Microscope, section: "research" },
  { id: "achievements", label: "Achievements", icon: Award, section: "achievements" },
  { id: "contact", label: "Contact", icon: Mail, section: "contact" },
];

const projectWindows = [
  {
    name: "Newspaper Advertising System",
    role: "Developer",
    tech: ["PHP", "MySQL", "HTML", "CSS"],
  },
  { name: "Java Learning Website", role: "Developer", tech: ["Java", "JavaScript", "HTML", "CSS"] },
];

export function LaptopOS() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [app, setApp] = useState<AppId | null>(null);
  const [minimized, setMinimized] = useState(false);
  const [time, setTime] = useState("");
  const parallax = usePointerParallax();
  const screenRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }),
      );
    tick();
    const int = setInterval(tick, 30_000);
    return () => clearInterval(int);
  }, []);

  const lid = open ? -3 : -76;
  const tilt = useMemo(
    () =>
      reduce
        ? ""
        : `rotateY(${(parallax.x * 6).toFixed(2)}deg) rotateX(${(-parallax.y * 3).toFixed(2)}deg)`,
    [parallax, reduce],
  );

  const activeApp = app && !minimized ? app : null;

  return (
    <div className="scene relative mx-auto w-full max-w-lg">
      <div
        aria-hidden="true"
        className={cn(
          "absolute -inset-8 rounded-full opacity-0 blur-3xl transition-opacity duration-1000",
          open && "opacity-80",
        )}
        style={{ background: "radial-gradient(circle, var(--lavender), transparent 70%)" }}
      />

      <div
        className="relative transition-transform duration-[1200ms] ease-out"
        style={{
          transform: `${tilt} scale(${open && !reduce ? 1.04 : 1}) translateY(${open ? 0 : 14}px)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Lid + screen */}
        <div
          className="origin-bottom transition-transform duration-[1200ms] ease-out"
          style={{ transform: `rotateX(${lid}deg)`, transformStyle: "preserve-3d" }}
        >
          <div className="glass overflow-hidden rounded-t-2xl border-2 p-2 shadow-[var(--shadow-lift)]">
            <div
              ref={screenRef}
              className="relative aspect-16/10 overflow-hidden rounded-xl"
              style={{
                background:
                  "linear-gradient(160deg, oklch(0.22 0.05 285), oklch(0.32 0.08 272))",
              }}
            >
              {/* screen glow */}
              <div
                aria-hidden="true"
                className={cn(
                  "absolute inset-0 opacity-0 transition-opacity duration-1000",
                  open && "opacity-100",
                )}
                style={{
                  background:
                    "radial-gradient(120% 80% at 50% 0%, oklch(0.75 0.15 292 / 0.35), transparent 65%)",
                }}
              />

              {open ? (
                <div className="animate-fade-in relative flex h-full flex-col">
                  {/* Top bar */}
                  <div className="flex items-center justify-between border-b border-white/15 px-3 py-1.5 font-mono text-[8px] tracking-[0.2em] text-white/85 sm:text-[9px]">
                    <span className="font-bold">SURIYA OS</span>
                    <span className="flex items-center gap-2">
                      <Wifi className="h-2.5 w-2.5" aria-hidden="true" />
                      <BatteryFull className="h-2.5 w-2.5" aria-hidden="true" />
                      <span>{time}</span>
                    </span>
                  </div>

                  {/* Desktop / window area */}
                  <div className="relative flex-1 overflow-hidden p-3">
                    <p className="font-display text-[13px] font-extrabold tracking-[0.16em] text-white sm:text-base">
                      SURIYA PRABHA
                    </p>
                    <p className="mt-0.5 font-mono text-[8px] tracking-[0.18em] text-[oklch(0.87_0.06_300)] sm:text-[9px]">
                      BACKEND DEVELOPER • MCA STUDENT
                    </p>

                    <ul className="mt-3 grid grid-cols-4 gap-1.5 sm:gap-2">
                      {apps.map((a) => (
                        <li key={a.id}>
                          <button
                            onClick={() => {
                              setApp(a.id);
                              setMinimized(false);
                            }}
                            data-cursor="OPEN"
                            aria-label={`Open ${a.label} window`}
                            className="group flex w-full flex-col items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-1 py-1.5 text-white/85 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15 hover:shadow-[0_0_16px_oklch(0.8_0.12_300/0.45)]"
                          >
                            <a.icon
                              className="h-3 w-3 transition-transform duration-300 group-hover:scale-110 sm:h-3.5 sm:w-3.5"
                              aria-hidden="true"
                            />
                            <span className="font-mono text-[6.5px] tracking-[0.1em] sm:text-[7.5px]">
                              {a.label.toUpperCase()}
                            </span>
                          </button>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={() => {
                            setOpen(false);
                            setApp(null);
                          }}
                          data-cursor="CLOSE"
                          aria-label="Close the laptop"
                          className="flex w-full flex-col items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-1 py-1.5 text-white/85 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15"
                        >
                          <Power className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                          <span className="font-mono text-[6.5px] tracking-[0.1em] sm:text-[7.5px]">
                            CLOSE
                          </span>
                        </button>
                      </li>
                    </ul>

                    {minimized && app ? (
                      <button
                        onClick={() => setMinimized(false)}
                        className="animate-fade-in absolute bottom-2 left-3 rounded-md border border-white/15 bg-white/10 px-2 py-1 font-mono text-[7px] tracking-[0.16em] text-white/85"
                      >
                        RESTORE — {apps.find((a) => a.id === app)?.label.toUpperCase()}
                      </button>
                    ) : null}

                    {activeApp ? (
                      <AppWindow
                        id={activeApp}
                        onClose={() => setApp(null)}
                        onMinimize={() => setMinimized(true)}
                        onJump={() => {
                          const section = apps.find((a) => a.id === activeApp)?.section;
                          if (section) scrollToId(section);
                        }}
                      />
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Base */}
        <div
          className="h-3 rounded-b-xl border-x-2 border-b-2 bg-[linear-gradient(180deg,oklch(0.95_0.02_290),oklch(0.88_0.03_290))]"
          aria-hidden="true"
        />
        <div
          className="mx-auto h-2 w-2/3 rounded-b-full bg-[oklch(0.85_0.03_290)]"
          aria-hidden="true"
        />
      </div>

      <div className="mt-6 flex flex-col items-center gap-2">
        <button
          onClick={() => {
            setOpen((v) => !v);
            if (open) setApp(null);
          }}
          aria-expanded={open}
          data-cursor={open ? "CLOSE" : "OPEN"}
          className="glass lift grad-border rounded-full px-5 py-2 font-mono text-[10px] font-bold tracking-[0.22em]"
        >
          {open ? "CLOSE MY WORKSPACE" : "OPEN MY WORKSPACE"}
        </button>
        <p className="text-muted-foreground text-center font-mono text-[9px] tracking-[0.2em]">
          I LEARN → I BUILD → I DESIGN → I RESEARCH → I CONTRIBUTE
        </p>
      </div>
    </div>
  );
}

function AppWindow({
  id,
  onClose,
  onMinimize,
  onJump,
}: {
  id: AppId;
  onClose: () => void;
  onMinimize: () => void;
  onJump: () => void;
}) {
  const meta = apps.find((a) => a.id === id)!;
  return (
    <div
      role="dialog"
      aria-label={`${meta.label} window`}
      className="animate-scale-in absolute inset-x-2 bottom-2 top-8 flex flex-col overflow-hidden rounded-lg border border-white/20 bg-[oklch(0.24_0.05_285/0.96)] shadow-[0_10px_40px_oklch(0.2_0.05_285/0.6)] backdrop-blur-md"
    >
      <div className="flex items-center justify-between border-b border-white/15 px-2 py-1">
        <span className="flex items-center gap-1.5 font-mono text-[7.5px] tracking-[0.18em] text-white/85">
          <button onClick={onClose} aria-label="Back to desktop">
            <ArrowLeft className="h-2.5 w-2.5" aria-hidden="true" />
          </button>
          {meta.label.toUpperCase()}.APP
        </span>
        <span className="flex items-center gap-1.5">
          <button onClick={onMinimize} aria-label="Minimize window" className="text-white/70 hover:text-white">
            <Minus className="h-2.5 w-2.5" aria-hidden="true" />
          </button>
          <button onClick={onClose} aria-label="Close window" className="text-white/70 hover:text-white">
            <X className="h-2.5 w-2.5" aria-hidden="true" />
          </button>
        </span>
      </div>

      <div className="flex-1 space-y-1.5 overflow-y-auto px-2.5 py-2 text-[8px] leading-relaxed text-white/85 sm:text-[9.5px]">
        <WindowBody id={id} />
      </div>

      <button
        onClick={onJump}
        className="border-t border-white/15 px-2 py-1 font-mono text-[7.5px] tracking-[0.18em] text-[oklch(0.88_0.08_300)] hover:text-white"
      >
        VIEW FULL {meta.label.toUpperCase()} SECTION →
      </button>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="font-mono tracking-[0.14em] text-[oklch(0.85_0.07_300)]">{label}</span>{" "}
      {value}
    </p>
  );
}

function WindowBody({ id }: { id: AppId }) {
  switch (id) {
    case "profile":
      return (
        <>
          <Row label="NAME" value={profile.name} />
          <Row label="ROLE" value={`${profile.role} • ${profile.college}`} />
          <Row label="PERIOD" value={`${profile.period} • CGPA ${profile.cgpa}`} />
          <p className="pt-1">{profile.direction}</p>
        </>
      );
    case "education":
      return (
        <>
          {education.map((e) => (
            <Row key={e.id} label={e.year} value={`${e.title} — ${e.place} • ${e.score}`} />
          ))}
        </>
      );
    case "skills":
      return (
        <>
          {skillGroups.map((g) => (
            <Row key={g.title} label={g.title} value={g.items.join(", ")} />
          ))}
        </>
      );
    case "projects":
      return (
        <>
          {projectWindows.map((p) => (
            <div key={p.name} className="pb-1">
              <Row label="PROJECT" value={p.name} />
              <Row label="ROLE" value={p.role} />
              <span className="mt-1 flex flex-wrap gap-1">
                {p.tech.map((t, i) => (
                  <span
                    key={t}
                    className="animate-fade-in rounded border border-white/20 bg-white/10 px-1.5 py-0.5 font-mono text-[7px] tracking-[0.12em]"
                    style={{ animationDelay: `${i * 90}ms` }}
                  >
                    {t}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </>
      );
    case "research":
      return (
        <>
          <Row label="TITLE" value={research.title} />
          <Row label="CONCEPTS" value={research.nodes.join(" → ")} />
          <Row label="ROLE" value="Secretary, Research Club — Holy Cross College" />
        </>
      );
    case "achievements":
      return (
        <>
          {achievements.map((a) => (
            <Row key={a.title} label={a.year} value={`${a.title} — ${a.detail}`} />
          ))}
          <Row label="INTERNSHIPS" value={`${internships.length} completed`} />
        </>
      );
    case "contact":
      return (
        <>
          <a className="block underline-offset-2 hover:underline" href={`mailto:${profile.email}`}>
            <Row label="EMAIL" value={profile.email} />
          </a>
          <a
            className="block underline-offset-2 hover:underline"
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer noopener"
          >
            <Row label="LINKEDIN" value="linkedin.com/in/suriya-prabha" />
          </a>
          <a
            className="block underline-offset-2 hover:underline"
            href={profile.github}
            target="_blank"
            rel="noreferrer noopener"
          >
            <Row label="GITHUB" value={profile.githubHandle} />
          </a>
        </>
      );
  }
}
