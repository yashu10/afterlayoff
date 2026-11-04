import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { PROJECTS, getProject, type Pair } from "@/data/projects";
import { buildMetadata, creativeWorkLd } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return buildMetadata({ title: `${p.title} — ${p.real ? "Case Study" : "Concept Case Study"}`, description: `${p.tag} ${p.challenge ?? p.outcome ?? ""}`.trim().slice(0, 300), path: `/portfolio/${p.slug}/`, image: p.img });
}

const metaOf = (meta: Pair[] | undefined, key: string) => meta?.find(([k]) => k.toLowerCase() === key.toLowerCase())?.[1];

const Pairs = ({ items }: { items?: Pair[] }) =>
  items ? (
    <div className="decisions">
      {items.map(([t, d]) => (
        <div key={t}>
          <h3>{t}</h3>
          <p>{d}</p>
        </div>
      ))}
    </div>
  ) : null;

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const i = PROJECTS.indexOf(p);
  const prev = PROJECTS[(i + PROJECTS.length - 1) % PROJECTS.length];
  const next = PROJECTS[(i + 1) % PROJECTS.length];
  const path = `/portfolio/${p.slug}/`;
  const tools = (metaOf(p.meta, "Tools") ?? metaOf(p.meta, "Stack") ?? "").split(/[·,]/).map((t) => t.trim()).filter(Boolean);

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="case-hero" style={{ background: p.grad }}>
        <div className="wrap case-hero-grid">
          <div>
            <Breadcrumbs light items={[{ name: "Home", path: "/" }, { name: "Portfolio", path: "/portfolio/" }, { name: p.title, path }]} />
            <span className="badge">
              {p.cat} · {p.real ? "Case study" : "Concept case study"}
            </span>
            <h1>{p.title}</h1>
            <p>{p.tag}</p>
            {tools.length > 0 && (
              <div className="cs-chips">
                {tools.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            )}
          </div>
          {p.img ? (
            <img className="case-img" src={p.img} alt={`${p.title} — ${p.cat} project by After Layoff`} width={900} height={560} fetchPriority="high" />
          ) : (
            <div className="cs-bigicon" aria-hidden="true">{p.icon}</div>
          )}
        </div>
      </section>


      <section className="section tight">
        <div className="wrap case">
          <div className="case-main">
            {p.challenge && (
              <div className="reveal">
                <h2>The challenge</h2>
                <p>{p.challenge}</p>
              </div>
            )}
            {p.solution && (
              <div className="reveal">
                <h2>Our solution</h2>
                <p>{p.solution}</p>
              </div>
            )}
            {p.process && (
              <div className="reveal">
                <h2>Research &amp; thinking</h2>
                <Pairs items={p.process} />
              </div>
            )}
            {p.decisions && (
              <div className="reveal">
                <h2>{p.challenge ? "Key design decisions" : "What we delivered"}</h2>
                <Pairs items={p.decisions} />
              </div>
            )}
            {p.outcome && (
              <div className="reveal">
                <h2>{p.real ? "Outcome" : "Outcomes we design for"}</h2>
                <div className="outs">
                  <div>{p.outcome}</div>
                </div>
              </div>
            )}
            {p.next && (
              <div className="reveal">
                <h2>What we would do next</h2>
                <p>{p.next}</p>
              </div>
            )}
          </div>
          <aside className="case-side reveal">
            <div className="box">
              {(p.meta || []).map(([k, v]) => (
                <div key={k}>
                  <h4>{k}</h4>
                  <p>{v}</p>
                </div>
              ))}
            </div>
            {(p.links || []).map(([t, u]) => (
              <a key={u} href={u} target="_blank" rel="noopener" className="btn ghost">
                {t} ↗
              </a>
            ))}
            <Link href="/contact/" className="btn">
              Build something similar →
            </Link>
          </aside>
        </div>
      </section>

      <section className="section soft tight">
        <div className="wrap pn">
          <Link href={`/portfolio/${prev.slug}/`} rel="prev">← {prev.title}</Link>
          <Link href={`/portfolio/${next.slug}/`} rel="next">{next.title} →</Link>
        </div>
      </section>

      <JsonLd data={creativeWorkLd(p)} />
    </>
  );
}
