import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { useReducedMotion } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

/** Minimal, fast intro screen. Fades out in well under a second of "work". */
export function LoadingScreen() {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (reduce) {
      setDone(true);
      setGone(true);
      return;
    }
    const int = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(int);
          setDone(true);
          return 100;
        }
        return Math.min(100, p + 20);
      });
    }, 110);
    return () => clearInterval(int);
  }, [reduce]);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setGone(true), 420);
    return () => clearTimeout(t);
  }, [done]);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "bg-background fixed inset-0 z-300 flex flex-col items-center justify-center gap-5 transition-opacity duration-400",
        done && "pointer-events-none opacity-0",
      )}
    >
      <p className="font-display text-xl font-extrabold tracking-[0.22em] sm:text-2xl">
        {profile.name.toUpperCase()}
      </p>
      <p className="text-muted-foreground font-mono text-[10px] tracking-[0.28em]">
        INITIALIZING PORTFOLIO<span className="animate-caret">_</span>
      </p>
      <div className="bg-border h-[3px] w-40 overflow-hidden rounded-full sm:w-56">
        <div
          className="h-full rounded-full transition-[width] duration-200 ease-out"
          style={{ width: `${progress}%`, backgroundImage: "var(--gradient-hero)" }}
        />
      </div>
    </div>
  );
}
