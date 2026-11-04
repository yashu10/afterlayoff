import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import Faq from "@/components/Faq";
import Breadcrumbs from "@/components/Breadcrumbs";
import { FOUNDERS } from "@/data/site";
import { ABOUT_FAQS } from "@/data/faqs";
import { asset } from "@/lib/paths";
import { buildMetadata, webPageLd } from "@/lib/seo";

const DESC = "After Layoff was founded by engineers and designers who turned a layoff into a launchpad. Meet the founders, our mission, values and how we work.";
export const metadata: Metadata = buildMetadata({ title: "About Us — Our Story, Founders & Values", description: DESC, path: "/about/" });

const VALUES: [string, string, string][] = [
  ["🤝", "Radically honest", "Clear scope, clear pricing, clear communication. If something is a bad idea, we'll say so."],
  ["🛠️", "Craft over speed", "We ship fast, but never at the cost of clean, maintainable, secure code."],
  ["🌱", "Grow together", "Your success is our portfolio. We invest in long-term partnerships, not one-off projects."],
  ["🔍", "Transparency", "Weekly demos, shared boards and direct access to the engineers building your product."],
  ["⚡", "Bias for action", "We prototype early, test with real users and iterate instead of over-planning."],
  ["🔒", "Security first", "Secure defaults, least-privilege access and your IP stays 100% yours."],
];
const STEPS: [string, string, string][] = [
  ["01", "Discover", "We listen, ask the hard questions and map your goals, users and constraints."],
  ["02", "Design", "Wireframes, prototypes and an architecture plan — approved before a line of code."],
  ["03", "Build", "Weekly demos, clean code and transparent progress. No black boxes."],
  ["04", "Launch & Grow", "We deploy, monitor and keep improving — so you keep climbing."],
];

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "About", path: "/about/" }]} />
          <span className="eyebrow">About us</span>
          <h1>
            We turned a setback into <span className="grad">a launchpad</span>
          </h1>
          <p>After Layoff is an IT company built by engineers who believe the best response to bad news is to build something better.</p>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap split">
          <div className="reveal">
            <span className="eyebrow">Our story</span>
            <h2>Why &quot;After Layoff&quot;?</h2>
            <p className="body">Layoffs hit our industry hard. Talented people lost their jobs overnight, through no fault of their own. We were among them.</p>
            <p className="body">Instead of waiting for the next offer, we decided to build the company we always wanted to work for — one that values craft over hype, transparency over jargon, and people over process.</p>
            <p className="body">
              The upward arrow in our logo rises out of the letter <b>A</b>, just like we rose from a setback. That energy goes into every project we deliver.
            </p>
          </div>
          <div className="quote reveal">
            <div className="mark" style={{ ["--s" as string]: 0.3 }} aria-hidden="true" />
            <blockquote>“A layoff isn&apos;t the end of the story. It&apos;s the plot twist.”</blockquote>
            <span>— The After Layoff team</span>
          </div>
        </div>
      </section>

      <section className="section soft" id="team">
        <div className="wrap">
          <div className="head reveal">
            <span className="eyebrow">Our team</span>
            <h2>
              Meet the <span className="grad">founders</span>
            </h2>
            <p>The people behind After Layoff.</p>
          </div>
          <div className="founders">
            {FOUNDERS.map((f) => (
              <article className="founder reveal" key={f.name}>
                <div className="photo">
                  <img src={asset(f.photo)} alt={`${f.name}, Co-Founder of After Layoff`} width={1086} height={1448} loading="lazy" decoding="async" />
                </div>
                <h3>{f.name}</h3>
                <span className="role-tag">{f.role}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="wrap">
          <div className="head reveal">
            <span className="eyebrow light">Mission &amp; vision</span>
            <h2>What drives us</h2>
          </div>
          <div className="mv">
            <div className="glass reveal">
              <h3>🎯 Mission</h3>
              <p>To help businesses grow with reliable, well-crafted software — delivered honestly, on time and at fair prices.</p>
            </div>
            <div className="glass reveal">
              <h3>🔭 Vision</h3>
              <p>To become a trusted technology partner for startups and growing companies, and a launchpad for great engineers.</p>
            </div>
          </div>
          <div className="stats four reveal">
            <div className="stat"><b data-count="100" data-suffix="%">100%</b><span>Remote-first</span></div>
            <div className="stat"><b data-count="24" data-suffix="h">24h</b><span>Reply time</span></div>
            <div className="stat"><b data-count="0">0</b><span>Hidden fees</span></div>
            <div className="stat"><b data-count="1">1</b><span>Goal: your growth</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="head reveal">
            <span className="eyebrow">Our values</span>
            <h2>
              How we <span className="grad">show up</span>
            </h2>
          </div>
          <div className="cards">
            {VALUES.map(([i, t, d]) => (
              <article className="card reveal" key={t}>
                <div className="ico" aria-hidden="true">{i}</div>
                <h3>{t}</h3>
                <p>{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="wrap">
          <div className="head reveal">
            <span className="eyebrow">How we work</span>
            <h2>
              From idea to launch in <span className="grad">4 steps</span>
            </h2>
          </div>
          <ol className="steps">
            {STEPS.map(([n, t, d]) => (
              <li className="reveal" key={n}>
                <span className="num">{n}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow">
          <Faq items={ABOUT_FAQS} heading="About After Layoff — quick answers" />
        </div>
      </section>

      <JsonLd data={webPageLd({ type: "AboutPage", name: "About After Layoff", description: DESC, path: "/about/", modified: "2026-11-04" })} />
    </>
  );
}
