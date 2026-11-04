import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE } from "@/data/site";
import { buildMetadata, webPageLd } from "@/lib/seo";

const DESC = "Join After Layoff — a remote-first IT company that gives talented engineers and designers a second launch. See open roles.";
export const metadata: Metadata = buildMetadata({ title: "Careers — Join a Remote-First Team", description: DESC, path: "/careers/" });

const ROLES: [string, string, string][] = [
  ["Full-Stack Developer", "React · Node.js · PostgreSQL", "Remote · Full-time"],
  ["Mobile Developer (Flutter)", "Flutter · Firebase · REST APIs", "Remote · Full-time"],
  ["UI / UX Designer", "Figma · Design Systems · Research", "Remote · Contract"],
  ["Graphic & Social Media Designer", "Photoshop · Illustrator · Canva · Figma", "Remote · Full-time"],
  ["DevOps Engineer", "AWS · Docker · CI/CD · Terraform", "Remote · Part-time"],
];

export default function Careers() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Careers", path: "/careers/" }]} />
          <span className="eyebrow">Careers</span>
          <h1>
            Been laid off? <span className="grad">Build with us.</span>
          </h1>
          <p>We&apos;re a remote-first team that knows exactly what it feels like to start over. Let&apos;s build what&apos;s next, together.</p>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <div className="head reveal">
            <span className="eyebrow">Why join us</span>
            <h2>
              A place to <span className="grad">rise again</span>
            </h2>
          </div>
          <div className="cards">
            <article className="card reveal"><div className="ico" aria-hidden="true">🏠</div><h3>Remote-first</h3><p>Work from anywhere. We care about output, not office hours.</p></article>
            <article className="card reveal"><div className="ico" aria-hidden="true">📈</div><h3>Real growth</h3><p>Own projects early, learn modern stacks and grow into leadership.</p></article>
            <article className="card reveal"><div className="ico" aria-hidden="true">💬</div><h3>Open culture</h3><p>No politics. Ideas are judged on merit, and everyone&apos;s voice counts.</p></article>
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="wrap narrow">
          <div className="head reveal">
            <span className="eyebrow">Open roles</span>
            <h2>
              Current <span className="grad">openings</span>
            </h2>
          </div>
          <div className="roles">
            {ROLES.map(([t, s, m]) => (
              <a key={t} className="role reveal" href={`mailto:${SITE.email}?subject=${encodeURIComponent("Application: " + t)}`}>
                <div>
                  <h3>{t}</h3>
                  <p>{s}</p>
                </div>
                <span>{m} →</span>
              </a>
            ))}
          </div>
          <p className="center muted reveal">
            Don&apos;t see your role? Email{" "}
            <a href={`mailto:${SITE.email}`} className="lnk">
              {SITE.email}
            </a>{" "}
            with your résumé and what you&apos;d love to build.
          </p>
        </div>
      </section>

      <JsonLd data={webPageLd({ name: "Careers at After Layoff", description: DESC, path: "/careers/", modified: "2026-11-04" })} />
    </>
  );
}
