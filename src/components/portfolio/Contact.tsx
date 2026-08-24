import { useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { OutlineButton, Section } from "./primitives";
import { useReducedMotion } from "@/lib/portfolio";
import { ContactForm } from "./ContactForm";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = profile.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <Section
      id="contact"
      eyebrow="Let's connect"
      title="LET'S BUILD SOMETHING MEANINGFUL"
      intro="Interested in learning, contributing, collaborating, and building meaningful digital experiences."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        <TiltCard>
          <Mail className="text-primary h-6 w-6" aria-hidden="true" />
          <h3 className="mt-4 font-mono text-xs tracking-[0.2em]">EMAIL</h3>
          <p className="mt-2 text-sm break-all">{profile.email}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href={`mailto:${profile.email}`}
              className="text-primary-foreground inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide"
              style={{ backgroundImage: "var(--gradient-hero)" }}
            >
              EMAIL ME <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <button
              onClick={copyEmail}
              className="border-border hover:border-primary/50 inline-flex min-h-11 items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-semibold tracking-wide"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              {copied ? "EMAIL COPIED!" : "COPY EMAIL"}
            </button>
          </div>
          <p aria-live="polite" className="text-primary mt-3 h-4 font-mono text-[10px]">
            {copied ? "Email copied!" : ""}
          </p>
        </TiltCard>

        <TiltCard>
          <Github className="text-primary h-6 w-6" aria-hidden="true" />
          <h3 className="mt-4 font-mono text-xs tracking-[0.2em]">GITHUB</h3>
          <p className="mt-2 text-sm">{profile.githubHandle}</p>
          <div className="mt-5">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide"
              style={{ backgroundImage: "var(--gradient-hero)" }}
            >
              OPEN GITHUB <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </TiltCard>

        <TiltCard>
          <Linkedin className="text-primary h-6 w-6" aria-hidden="true" />
          <h3 className="mt-4 font-mono text-xs tracking-[0.2em]">LINKEDIN</h3>
          <p className="mt-2 text-sm">{profile.name}</p>
          <div className="mt-5">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide"
              style={{ backgroundImage: "var(--gradient-hero)" }}
            >
              VIEW LINKEDIN <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </TiltCard>
      </div>

      <ContactForm />

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <OutlineButton onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          BACK TO TOP
        </OutlineButton>
        <p className="text-muted-foreground font-mono text-[10px] tracking-[0.2em]">
          {profile.role} • {profile.college} • {profile.period}
        </p>
      </div>
    </Section>
  );
}

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const [t, setT] = useState({ x: 0, y: 0 });

  return (
    <div className="scene" data-cursor="OPEN">
      <div
        ref={ref}
        onMouseMove={(e) => {
          if (reduce) return;
          const r = e.currentTarget.getBoundingClientRect();
          setT({
            x: ((e.clientX - r.left) / r.width - 0.5) * 12,
            y: ((e.clientY - r.top) / r.height - 0.5) * 12,
          });
        }}
        onMouseLeave={() => setT({ x: 0, y: 0 })}
        className="glass h-full rounded-3xl p-6 transition-transform duration-300 sm:p-7"
        style={{ transform: `rotateY(${t.x}deg) rotateX(${-t.y}deg)` }}
      >
        {children}
      </div>
    </div>
  );
}
