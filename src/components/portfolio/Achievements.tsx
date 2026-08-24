import { useState } from "react";
import { Award, CalendarDays, FileBadge, Trophy } from "lucide-react";
import { achievements, beyond, certifications, processSteps, workshops } from "@/data/profile";
import { GlassCard, Modal, Section } from "./primitives";

export function Achievements() {
  const [cert, setCert] = useState<(typeof certifications)[number] | null>(null);
  const [event, setEvent] = useState<(typeof workshops)[number] | null>(null);

  return (
    <Section
      id="achievements"
      eyebrow="Recognition & learning"
      title="MILESTONES I'M PROUD OF"
      intro="Achievements, workshops, seminars and certifications from my academic journey."
    >
      <ul className="grid gap-5 sm:grid-cols-2">
        {achievements.map((a, i) => (
          <li key={a.title}>
            <GlassCard as="article" className="lift h-full p-6">
              <span
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-[var(--ink)]"
                style={{ backgroundImage: "var(--gradient-warm)" }}
              >
                {i === 0 ? (
                  <Trophy className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Award className="h-6 w-6" aria-hidden="true" />
                )}
              </span>
              <h3 className="mt-4 text-lg font-bold">{a.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{a.detail}</p>
              <p className="text-primary mt-3 font-mono text-[10px] tracking-[0.2em]">{a.year}</p>
            </GlassCard>
          </li>
        ))}
      </ul>

      <h3 className="mt-16 text-2xl font-extrabold">EXPLORING NEW IDEAS</h3>
      <p className="text-muted-foreground mt-2 text-sm">Workshops and seminars I attended.</p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {workshops.map((w) => (
          <li key={w.date}>
            <button
              onClick={() => setEvent(w)}
              data-cursor="VIEW"
              className="glass lift grad-border h-full w-full rounded-2xl p-5 text-left"
            >
              <span className="text-primary flex items-center gap-2 font-mono text-[10px] tracking-[0.18em]">
                <CalendarDays className="h-3.5 w-3.5 animate-float" aria-hidden="true" />
                {w.date}
              </span>
              <span className="mt-3 block text-sm leading-relaxed font-semibold">{w.title}</span>
            </button>
          </li>
        ))}
      </ul>

      <h3 className="mt-16 text-2xl font-extrabold">CONTINUOUS LEARNING</h3>
      <p className="text-muted-foreground mt-2 text-sm">Certifications completed.</p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-3">
        {certifications.map((c) => (
          <li key={c.title}>
            <button
              onClick={() => setCert(c)}
              data-cursor="VIEW"
              className="glass lift grad-border h-full w-full rounded-2xl p-5 text-left"
            >
              <FileBadge className="text-primary h-5 w-5" aria-hidden="true" />
              <span className="mt-3 block font-mono text-[10px] tracking-[0.18em]">
                {c.provider}
              </span>
              <span className="mt-2 block text-sm font-semibold">{c.title}</span>
              <span className="text-muted-foreground mt-2 block font-mono text-[10px]">
                {c.year}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* Process */}
      <h3 className="mt-16 text-2xl font-extrabold">HOW I APPROACH A PROBLEM</h3>
      <p className="text-muted-foreground mt-2 text-sm">
        My working mindset as a student and learner.
      </p>
      <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((s, i) => (
          <li key={s.title}>
            <GlassCard className="lift h-full p-5">
              <span className="text-primary font-mono text-[10px] tracking-[0.2em]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h4 className="mt-2 font-mono text-xs tracking-[0.18em]">{s.title}</h4>
              <p className="text-muted-foreground mt-2 text-sm">{s.text}</p>
            </GlassCard>
          </li>
        ))}
      </ol>

      {/* Beyond */}
      <h3 className="mt-16 text-2xl font-extrabold">BEYOND THE SCREEN</h3>
      <ul className="mt-6 grid gap-3 sm:grid-cols-4">
        {beyond.map((b) => (
          <li key={b.title}>
            <GlassCard className="h-full p-5">
              <h4 className="text-sm font-bold">{b.title}</h4>
              <p className="text-muted-foreground mt-1 text-xs">{b.text}</p>
            </GlassCard>
          </li>
        ))}
      </ul>

      <Modal open={Boolean(cert)} onClose={() => setCert(null)} title={cert?.title ?? ""}>
        {cert ? (
          <div className="space-y-2">
            <p className="text-primary font-mono text-xs tracking-[0.18em]">{cert.provider}</p>
            <p className="text-muted-foreground">Completed in {cert.year}.</p>
          </div>
        ) : null}
      </Modal>

      <Modal open={Boolean(event)} onClose={() => setEvent(null)} title={event?.title ?? ""}>
        {event ? <p className="text-primary font-mono text-xs tracking-[0.18em]">{event.date}</p> : null}
      </Modal>
    </Section>
  );
}
