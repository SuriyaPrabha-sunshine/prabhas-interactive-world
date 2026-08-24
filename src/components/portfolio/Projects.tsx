import { useState } from "react";
import { ArrowRight, Database, FileText, Folder, Server, Users, Workflow } from "lucide-react";
import { Chip, GlassCard, Modal, OutlineButton, PrimaryButton, Section } from "./primitives";
import { cn } from "@/lib/utils";

const flow = [
  "Business Owner",
  "Advertisement Request",
  "System",
  "Customer Request Management",
  "Advertisement Processing",
];

const folderItems = [
  { label: "Advertisement Request", icon: FileText },
  { label: "Customer", icon: Users },
  { label: "Backend", icon: Server },
  { label: "Database", icon: Database },
  { label: "Management", icon: Workflow },
];

const portalCards = [
  "Java Fundamentals",
  "Object-Oriented Programming",
  "Collections",
  "Database Connectivity",
  "Projects",
];

export function Projects() {
  const [newsOpen, setNewsOpen] = useState(false);
  const [folderOpen, setFolderOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="THINGS I'VE BUILT"
      intro="Two projects from my academic and practical work."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Project 1 */}
        <GlassCard as="article" className="flex flex-col p-6 sm:p-8">
          <p className="text-primary font-mono text-[10px] tracking-[0.2em]">PROJECT 01</p>
          <h3 className="mt-3 text-2xl font-extrabold">NEWSPAPER ADVERTISING SYSTEM</h3>
          <p className="mt-2 font-mono text-xs tracking-[0.16em]">ROLE — BACKEND DEVELOPER</p>

          {/* browser mockup */}
          <div className="mt-6 overflow-hidden rounded-2xl border shadow-[var(--shadow-soft)]">
            <div className="bg-secondary/80 flex items-center gap-1.5 border-b px-3 py-2">
              <span className="bg-blush h-2 w-2 rounded-full" aria-hidden="true" />
              <span className="bg-peach h-2 w-2 rounded-full" aria-hidden="true" />
              <span className="bg-mint h-2 w-2 rounded-full" aria-hidden="true" />
              <span className="text-muted-foreground ml-2 font-mono text-[10px]">
                newspaper-advertising-system
              </span>
            </div>
            <ol className="bg-card/70 space-y-2 p-4">
              {flow.map((step, i) => (
                <li key={step} className="flex items-center gap-3">
                  <span
                    className="text-primary-foreground flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[10px]"
                    style={{ backgroundImage: "var(--gradient-hero)" }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
            Developed a web-based Newspaper Advertising System that enables business owners to submit
            advertisement requests through an online platform. The system streamlines the
            advertisement booking process, manages customer requests efficiently, and provides a
            digital solution for handling newspaper advertisements.
          </p>

          {/* 3D folder */}
          <div className="scene mt-6">
            <button
              onClick={() => setFolderOpen((v) => !v)}
              aria-expanded={folderOpen}
              data-cursor="EXPLORE"
              className="group flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition-transform duration-500 hover:-translate-y-1 hover:[transform:rotateX(8deg)_translateY(-4px)]"
            >
              <span
                className="text-primary-foreground inline-flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ backgroundImage: "var(--gradient-hero)" }}
              >
                <Folder className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-mono text-xs tracking-[0.18em]">NEWSPAPER ADS</span>
                <span className="text-muted-foreground block text-xs">
                  {folderOpen ? "Click to close the folder" : "Click to open the folder"}
                </span>
              </span>
            </button>
            {folderOpen ? (
              <ul className="animate-fade-in mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {folderItems.map((f) => (
                  <li
                    key={f.label}
                    className="glass flex items-center gap-2 rounded-xl px-3 py-2 text-xs"
                  >
                    <f.icon className="text-primary h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    {f.label}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="mt-6">
            <PrimaryButton onClick={() => setNewsOpen(true)}>
              VIEW PROJECT DETAILS <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </PrimaryButton>
          </div>
        </GlassCard>

        {/* Project 2 */}
        <GlassCard as="article" className="flex flex-col p-6 sm:p-8">
          <p className="text-primary font-mono text-[10px] tracking-[0.2em]">PROJECT 02</p>
          <h3 className="mt-3 text-2xl font-extrabold">JAVA LEARNING PORTAL</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Java", "HTML", "CSS", "JavaScript"].map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
          <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
            A web-based learning portal developed to support Java learning through structured
            educational content and an interactive web interface.
          </p>

          <div className="mt-6 overflow-hidden rounded-2xl border shadow-[var(--shadow-soft)]">
            <div className="bg-secondary/80 border-b px-4 py-2 font-mono text-[10px] tracking-[0.16em]">
              PORTAL STRUCTURE
            </div>
            <ul className="bg-card/70 grid gap-2 p-4 sm:grid-cols-2">
              {portalCards.map((c) => (
                <li
                  key={c}
                  className={cn(
                    "rounded-xl border px-3 py-3 text-sm transition-colors",
                    "hover:border-primary/50 hover:text-primary",
                  )}
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <PrimaryButton onClick={() => setPortalOpen(true)}>
              EXPLORE PORTAL <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </PrimaryButton>
          </div>
        </GlassCard>
      </div>

      <Modal
        open={newsOpen}
        onClose={() => setNewsOpen(false)}
        title="Newspaper Advertising System"
        footer={
          <OutlineButton
            onClick={() => {
              setNewsOpen(false);
              setFolderOpen(true);
            }}
          >
            BACK TO FOLDER
          </OutlineButton>
        }
      >
        <p className="text-primary font-mono text-xs tracking-[0.18em]">ROLE — BACKEND DEVELOPER</p>
        <p>
          Developed a web-based Newspaper Advertising System that enables business owners to submit
          advertisement requests through an online platform. The system streamlines the advertisement
          booking process, manages customer requests efficiently, and provides a digital solution for
          handling newspaper advertisements.
        </p>
        <ol className="text-muted-foreground space-y-1 text-sm">
          {flow.map((s, i) => (
            <li key={s}>
              {i + 1}. {s}
            </li>
          ))}
        </ol>
      </Modal>

      <Modal
        open={portalOpen}
        onClose={() => setPortalOpen(false)}
        title="Java Learning Portal — preview"
      >
        <p>
          A web-based learning portal developed to support Java learning through structured
          educational content and an interactive web interface.
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {portalCards.map((c) => (
            <div key={c} className="glass rounded-xl px-3 py-3 text-sm">
              {c}
            </div>
          ))}
        </div>
        <p className="text-muted-foreground text-xs">
          This is a simulated preview of the portal structure.
        </p>
      </Modal>
    </Section>
  );
}
