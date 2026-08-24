import { useEffect, useState } from "react";
import { useIsDesktop, useReducedMotion } from "@/lib/portfolio";

/** Subtle gradient cursor. Desktop + fine pointer only, disabled for reduced motion. */
export function GradientCursor() {
  const desktop = useIsDesktop();
  const reduce = useReducedMotion();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [label, setLabel] = useState("");
  const [big, setBig] = useState(false);

  useEffect(() => {
    if (!desktop || reduce) return;
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const target = (e.target as HTMLElement)?.closest<HTMLElement>("[data-cursor]");
      const hoverable = (e.target as HTMLElement)?.closest("button, a, [role='button']");
      setLabel(target?.dataset["cursor"] ?? "");
      setBig(Boolean(target || hoverable));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [desktop, reduce]);

  if (!desktop || reduce) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed z-200 -translate-x-1/2 -translate-y-1/2 transition-[width,height] duration-200"
      style={{ left: pos.x, top: pos.y }}
    >
      <div
        className="flex items-center justify-center rounded-full font-mono text-[9px] font-bold tracking-widest text-white transition-all duration-200"
        style={{
          width: label ? 62 : big ? 34 : 16,
          height: label ? 62 : big ? 34 : 16,
          background: "var(--gradient-hero)",
          opacity: label ? 0.92 : 0.5,
        }}
      >
        {label}
      </div>
    </div>
  );
}
