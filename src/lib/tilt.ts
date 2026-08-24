import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./portfolio";

/** Subtle pointer tilt for cards. Max ~6deg, disabled for reduced motion / touch. */
export function useTilt<T extends HTMLElement = HTMLDivElement>(max = 6) {
  const ref = useRef<T | null>(null);
  const reduce = useReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false });

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (reduce || e.pointerType !== "mouse" || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      setTilt({ x: -py * max * 2, y: px * max * 2, active: true });
    },
    [max, reduce],
  );

  const onPointerLeave = useCallback(() => setTilt({ x: 0, y: 0, active: false }), []);

  const style: React.CSSProperties = reduce
    ? {}
    : {
        transform: `perspective(900px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) translateZ(0)`,
        transition: tilt.active ? "transform 120ms ease-out" : "transform 500ms ease-out",
      };

  return { ref, style, tilt, handlers: { onPointerMove, onPointerLeave } };
}

/** Normalized (-0.5..0.5) pointer position for scene-level parallax. */
export function usePointerParallax() {
  const reduce = useReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reduce) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setPos({
          x: e.clientX / window.innerWidth - 0.5,
          y: e.clientY / window.innerHeight - 0.5,
        });
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduce]);

  return pos;
}
