import { Download, ExternalLink, FileText } from "lucide-react";
import { profile } from "@/data/profile";
import { GlassCard, Section } from "./primitives";

const RESUME_PATH = "/resume/Suriya-Prabha-Resume.pdf";

export function Resume() {
  return (
    <Section
      id="resume"
      eyebrow="Resume"
      title="TAKE MY JOURNEY WITH YOU"
      intro="Want to know more about my academic and technical journey? Download or preview my resume."
    >
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div className="scene flex justify-center">
          <div
            className="group relative h-72 w-56 transition-transform duration-500 ease-out hover:-translate-y-2 hover:[transform:rotateY(-14deg)_rotateX(6deg)_translateY(-8px)]"
            style={{ transformStyle: "preserve-3d" }}
            data-cursor="INTERACT"
          >
            <div
              className="absolute inset-0 rounded-2xl opacity-60 blur-xl"
              style={{ backgroundImage: "var(--gradient-hero)" }}
              aria-hidden="true"
            />
            <div className="glass relative flex h-full w-full flex-col justify-between rounded-2xl p-6">
              <div>
                <FileText className="text-primary h-8 w-8" aria-hidden="true" />
                <p className="font-display mt-5 text-xl leading-tight font-extrabold">
                  {profile.name.toUpperCase()}
                </p>
                <p className="text-muted-foreground mt-1 font-mono text-[10px] tracking-[0.24em]">
                  RESUME
                </p>
              </div>
              <div className="space-y-2" aria-hidden="true">
                {[92, 78, 86, 60].map((w, i) => (
                  <span
                    key={i}
                    className="bg-border/80 block h-1.5 rounded-full"
                    style={{ width: `${w}%` }}
                  />
                ))}
              </div>
              <p className="text-muted-foreground font-mono text-[10px] tracking-[0.18em]">
                PDF · MCA STUDENT
              </p>
            </div>
          </div>
        </div>

        <GlassCard className="p-7">
          <h3 className="text-xl font-bold">Everything in one document</h3>
          <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
            My resume covers education, technical skills, internships, projects, research interest
            and certifications. It opens in a new tab or downloads straight to your device.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={RESUME_PATH}
              download="Suriya-Prabha-Resume.pdf"
              data-cursor="OPEN"
              className="text-primary-foreground inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold shadow-[var(--shadow-glow)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
              style={{ backgroundImage: "var(--gradient-hero)" }}
            >
              <Download className="h-4 w-4" aria-hidden="true" /> DOWNLOAD MY RESUME
            </a>
            <a
              href={RESUME_PATH}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="OPEN"
              className="border-border bg-card/70 hover:border-primary/50 hover:text-primary inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" /> VIEW RESUME
            </a>
          </div>
        </GlassCard>
      </div>
    </Section>
  );
}
