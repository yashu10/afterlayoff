import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import Faq from "@/components/Faq";
import { HeroCanvas, Tilt, Typewriter } from "@/components/HeroEffects";
import { ProjectCard } from "@/components/Cards";
import { SERVICES } from "@/data/services";
import { getProject } from "@/data/projects";
import { HOME_FAQS } from "@/data/faqs";
import { SITE } from "@/data/site";
import { asset } from "@/lib/paths";
import { buildMetadata, webPageLd } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({ title: SITE.title, description: SITE.description, path: "/" }),
  title: { absolute: SITE.title },
};

const TECH = ["React", "Next.js", "Node.js", "Python", "TypeScript", "AWS", "Azure", "Flutter", "Kubernetes", "PostgreSQL", "OpenAI", "Figma"];

export default function Home() {
  const featured = ["prage", "teamsync", "darshan-dye-chem"].map((s) => getProject(s)!).filter(Boolean);
  return (
    <>
      <section className="hero">
        <HeroCanvas />
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <span className="pill">
              <i /> Now taking on projects
            </span>
            <h1>
              Laid off?
              <br />
              <span className="grad">Level up.</span>
              <br />
              We build what&apos;s <Typewriter />
            </h1>
            <p className="lead">
              After Layoff is an IT company founded by engineers who turned a setback into a launchpad. We design, build and ship websites, mobile apps, AI solutions and cloud infrastructure that help businesses grow — fast, honest and built to last.
            </p>
            <div className="cta">
              <Link href="/contact/" className="btn">
                Start a project{" "}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <Link href="/portfolio/" className="btn ghost">
                View our work
              </Link>
            </div>
            <ul className="trust">
              <li>
                <b>Remote-first</b> team
              </li>
              <li>
                <b>Senior</b> engineers only
              </li>
              <li>
                <b>Fixed-scope</b> pricing
              </li>
            </ul>
          </div>
          <Tilt>
            <img src={asset("/logo.png")} alt="After Layoff logo — We Build What's Next" width={440} height={440} fetchPriority="high" />
          </Tilt>
        </div>
      </section>

      <section className="marquee" aria-hidden="true">
        <div className="track">
          {[...TECH, ...TECH].map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="head reveal">
            <span className="eyebrow">What we do</span>
            <h2>
              Everything you need to <span className="grad">ship &amp; scale</span>
            </h2>
            <p>From the first idea to the millionth user — one team, end to end.</p>
          </div>
          <div className="cards four">
            {SERVICES.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}/`} className="card reveal">
                <div className="ico" aria-hidden="true">
                  {s.icon}
                </div>
                <h3>{s.title}</h3>
                <p>{s.short}</p>
                <span className="more">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="wrap story">
          <div className="reveal">
            <span className="eyebrow light">Our story</span>
            <h2>
              A layoff isn&apos;t the end of the story.
              <br />
              <span className="grad2">It&apos;s the plot twist.</span>
            </h2>
            <p>
              We started After Layoff after our own jobs were cut. Instead of waiting for the next offer, we built the company we always wanted to work for — one that values craft, transparency and people.
            </p>
            <Link href="/about/" className="btn light">
              Read our story →
            </Link>
          </div>
          <div className="stats reveal">
            <div className="stat"><b data-count="100" data-suffix="%">100%</b><span>Remote-first</span></div>
            <div className="stat"><b data-count="24" data-suffix="h">24h</b><span>Reply time</span></div>
            <div className="stat"><b data-count="0">0</b><span>Hidden fees</span></div>
            <div className="stat"><b data-count="1">1</b><span>Goal: your growth</span></div>
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="wrap">
          <div className="head reveal">
            <span className="eyebrow">Portfolio</span>
            <h2>
              Ideas we love <span className="grad">bringing to life</span>
            </h2>
            <p>A look at the kind of products we design and engineer.</p>
          </div>
          <div className="pgrid">
            {featured.map((p) => (
              <ProjectCard key={p.slug} p={p} />
            ))}
          </div>
          <p className="center" style={{ marginTop: 40 }}>
            <Link href="/portfolio/" className="btn">
              See full portfolio →
            </Link>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow">
          <Faq items={HOME_FAQS} heading="About After Layoff — quick answers" />
        </div>
      </section>

      <JsonLd data={webPageLd({ type: "WebPage", name: SITE.title, description: SITE.description, path: "/", modified: "2026-11-04" })} />
    </>
  );
}
