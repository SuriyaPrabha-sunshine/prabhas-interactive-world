import { createFileRoute } from "@tanstack/react-router";
import { Background } from "@/components/portfolio/Background";
import { LoadingScreen } from "@/components/portfolio/LoadingScreen";
import { GradientCursor } from "@/components/portfolio/GradientCursor";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Education } from "@/components/portfolio/Education";
import { Skills } from "@/components/portfolio/Skills";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Research } from "@/components/portfolio/Research";
import { Achievements } from "@/components/portfolio/Achievements";
import { Contact } from "@/components/portfolio/Contact";
import { profile } from "@/data/profile";

const title = "Suriya Prabha — MCA Student | Web Development, Design & Research";
const description =
  "Portfolio of Suriya Prabha, MCA student at Holy Cross College exploring web development, backend development, UI design, databases, analytics and research.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <LoadingScreen />
      <Background />
      <GradientCursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Experience />
        <Projects />
        <Research />
        <Achievements />
        <Contact />
      </main>
      <footer className="border-t px-5 py-8 text-center sm:px-8">
        <p className="text-muted-foreground font-mono text-[10px] tracking-[0.22em]">
          {profile.name.toUpperCase()} • I LEARN → I BUILD → I DESIGN → I RESEARCH → I CONTRIBUTE →
          I KEEP GROWING
        </p>
      </footer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: profile.name,
            email: `mailto:${profile.email}`,
            jobTitle: "MCA Student",
            alumniOf: { "@type": "CollegeOrUniversity", name: profile.college },
            sameAs: [profile.github, profile.linkedin],
          }),
        }}
      />
    </>
  );
}
