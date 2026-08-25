import { useEffect, useRef, useState } from "react";
import { ArrowRight, Code2, Database, FolderOpen, BarChart3, Laptop } from "lucide-react";
import { profile, rotatingWords } from "@/data/profile";
import profileAsset from "@/assets/suriya-photo.jpg";
import { scrollToId, useReducedMotion } from "@/lib/portfolio";
import { OutlineButton, PrimaryButton } from "./primitives";
import { LaptopOS } from "./LaptopOS";

const workspaceWindows = [
  {
    id: "code",
    label: "CODE",
    icon: Code2,
    items: ["Java", "JavaScript", "PHP", "HTML", "CSS"],
    target: "skills",
  },
  { id: "database", label: "DATABASE", icon: Database, items: ["SQL", "DBMS"], target: "skills" },
  { id: "analytics", label: "ANALYTICS", icon: BarChart3, items: ["Power BI"], target: "skills" },
  {
    id: "projects",
    label: "PROJECTS",
    icon: FolderOpen,
    items: ["Newspaper Advertising System", "Java Learning Portal"],
    target: "projects",
  },
] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const [word, setWord] = useState(0);
  const [workspace, setWorkspace] = useState(false);
  const workspaceRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    if (reduce) return;
    const int = setInterval(() => setWord((w) => (w + 1) % rotatingWords.length), 2000);
    return () => clearInterval(int);
  }, [reduce]);

  const openWorkspace = () => {
    setWorkspace(true);
    requestAnimationFrame(() =>
      workspaceRef.current?.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "center",
      }),
    );
  };

  return (
    <section id="home" aria-labelledby="hero-heading" className="relative px-5 pt-28 pb-16 sm:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <span
                aria-hidden="true"
                className="absolute -inset-1 rounded-full opacity-60 blur-md"
                style={{ background: "var(--gradient-hero)" }}
              />
              <img
                src={profileAsset}
                alt={`${profile.name} — ${profile.role}`}
                className="relative h-20 w-20 rounded-full border-2 border-white/70 object-cover shadow-[var(--shadow-lift)] sm:h-24 sm:w-24"
                style={{ objectPosition: "center 28%" }}
                loading="eager"
              />
            </div>
            <p className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[10px] tracking-[0.22em]">
              MCA STUDENT • HOLY CROSS COLLEGE • {profile.period}
            </p>
          </div>
          <h1
            id="hero-heading"
            className="mt-6 text-4xl leading-[1.05] font-extrabold sm:text-5xl lg:text-6xl"
          >
            <span className="gradient-text">LEARN. BUILD.</span>
            <br />
            <span className="gradient-text">DESIGN. CONTRIBUTE.</span>
          </h1>
          <p className="text-foreground/85 mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
            I&apos;m {profile.name} — an MCA student exploring web development, backend technologies,
            UI design, research, and creative digital experiences.
          </p>
          <p className="text-muted-foreground mt-3 max-w-xl text-sm leading-relaxed sm:text-base">
            I enjoy turning ideas into practical digital experiences while continuously learning,
            experimenting, and contributing.
          </p>

          <p className="mt-6 font-mono text-xs tracking-[0.24em] sm:text-sm" aria-live="polite">
            <span className="text-muted-foreground">CURRENTLY EXPLORING → </span>
            <span className="text-primary font-bold">{rotatingWords[word]}</span>
            <span className="animate-caret text-primary">_</span>
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <PrimaryButton onClick={() => scrollToId("education")}>
              EXPLORE MY JOURNEY <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </PrimaryButton>
            <OutlineButton onClick={() => scrollToId("projects")}>
              VIEW MY PROJECTS <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </OutlineButton>
            <OutlineButton onClick={() => scrollToId("contact")}>
              LET&apos;S CONNECT <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </OutlineButton>
            <OutlineButton onClick={openWorkspace} aria-expanded={workspace}>
              <Laptop className="h-4 w-4" aria-hidden="true" /> OPEN WORKSPACE
            </OutlineButton>
          </div>
        </div>

        <div className="scene relative overflow-hidden">
          <LaptopOS />
        </div>

      </div>

      {/* Interactive laptop workspace */}
      <div ref={workspaceRef} className="mx-auto mt-14 max-w-6xl">
        {workspace ? (
          <div className="glass animate-scale-in rounded-3xl p-5 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold sm:text-2xl">MY WORKSPACE</h2>
                <p className="text-muted-foreground mt-1 text-sm">
                  Four windows from my actual technical profile — open one to jump to that section.
                </p>
              </div>
              <OutlineButton onClick={() => setWorkspace(false)}>CLOSE WORKSPACE</OutlineButton>
            </div>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {workspaceWindows.map((w) => (
                <li key={w.id}>
                  <button
                    onClick={() => scrollToId(w.target)}
                    data-cursor="OPEN"
                    className="glass lift grad-border h-full w-full rounded-2xl p-5 text-left"
                  >
                    <span
                      className="text-primary-foreground inline-flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ backgroundImage: "var(--gradient-hero)" }}
                    >
                      <w.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="mt-4 block font-mono text-xs tracking-[0.2em]">{w.label}</span>
                    <span className="text-muted-foreground mt-2 block space-y-1 text-sm">
                      {w.items.map((i) => (
                        <span key={i} className="block">
                          {i}
                        </span>
                      ))}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
