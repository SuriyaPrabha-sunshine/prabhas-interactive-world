import { useState } from "react";
import { Building2, CalendarDays } from "lucide-react";
import { internships } from "@/data/profile";
import { GlassCard, Modal, Section } from "./primitives";
import { useReveal } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

type Item = (typeof internships)[number];

export function Experience() {
  const [active, setActive] = useState<Item | null>(null);
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <Section
      id="experience"
      eyebrow="Internships"
      title="LEARNING BY EXPERIENCE"
      intro="Seven internships — each one an opportunity to explore a new technology or topic."
    >
      <div ref={ref} className="relative">
        <div
          aria-hidden="true"
          className="bg-border absolute top-8 right-0 left-0 hidden h-px lg:block"
        >
          <span
            className="block h-px origin-left transition-transform duration-[2200ms] ease-out"
            style={{
              backgroundImage: "var(--gradient-hero)",
              transform: visible ? "scaleX(1)" : "scaleX(0)",
            }}
          />
        </div>

        <ol className="grid gap-4 lg:grid-cols-7">
          {internships.map((it, i) => (
            <li key={`${it.org}-${it.date}`} className="lg:pt-0">
              <button
                onClick={() => setActive(it)}
                data-cursor="VIEW"
                className="group w-full text-left"
                aria-label={`${it.org}, ${it.date}, ${it.topic}`}
              >
                <span className="hidden justify-center lg:flex">
                  <span
                    className={cn(
                      "bg-card relative z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors duration-500",
                      visible ? "border-primary" : "border-border",
                    )}
                    style={{ transitionDelay: `${i * 180}ms` }}
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundImage: "var(--gradient-hero)" }}
                    />
                  </span>
                </span>
                <GlassCard className="lift mt-0 h-full p-4 lg:mt-4">
                  <span className="text-primary flex items-center gap-1.5 font-mono text-[10px] tracking-[0.14em]">
                    <CalendarDays className="h-3 w-3" aria-hidden="true" />
                    {it.date}
                  </span>
                  <span className="mt-2 flex items-center gap-1.5 text-sm font-bold">
                    <Building2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    {it.org}
                  </span>
                  <span className="text-muted-foreground mt-1.5 block text-sm">{it.topic}</span>
                </GlassCard>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <Modal open={Boolean(active)} onClose={() => setActive(null)} title={active?.org ?? ""}>
        {active ? (
          <div className="space-y-2">
            <p className="text-primary font-mono text-xs tracking-[0.18em]">{active.date}</p>
            <p className="font-semibold">{active.topic}</p>
            <p className="text-muted-foreground">
              A learning experience in {active.topic} — an opportunity to explore the technology and
              understand how it is applied.
            </p>
          </div>
        ) : null}
      </Modal>
    </Section>
  );
}
