export function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--gradient-soft)" }} />
      <div
        className="animate-blob absolute -top-32 -left-24 h-[38rem] w-[38rem] rounded-full opacity-55 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--lavender), transparent 68%)" }}
      />
      <div
        className="animate-blob absolute top-1/4 -right-32 h-[34rem] w-[34rem] rounded-full opacity-50 blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--sky), transparent 68%)",
          animationDelay: "-6s",
        }}
      />
      <div
        className="animate-blob absolute bottom-10 left-1/5 h-[30rem] w-[30rem] rounded-full opacity-45 blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--mint), transparent 68%)",
          animationDelay: "-12s",
        }}
      />
      <div
        className="animate-blob absolute right-1/4 bottom-1/3 h-[26rem] w-[26rem] rounded-full opacity-40 blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--peach), transparent 68%)",
          animationDelay: "-3s",
        }}
      />
      <div
        className="animate-blob absolute top-2/3 left-1/2 h-[24rem] w-[24rem] rounded-full opacity-35 blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--blush), transparent 68%)",
          animationDelay: "-16s",
        }}
      />
      <div className="absolute inset-0 hidden lg:block">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="animate-float absolute rounded-full bg-white/70"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.s,
              height: p.s,
              animationDelay: `${p.d}s`,
              animationDuration: `${p.t}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

const PARTICLES = Array.from({ length: 26 }, (_, i) => ({
  x: (i * 37) % 100,
  y: (i * 61) % 100,
  s: 3 + (i % 4),
  d: (i % 7) * 0.6,
  t: 5 + (i % 5),
}));
