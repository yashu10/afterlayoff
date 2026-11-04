import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import Faq from "@/components/Faq";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ProjectCard, PostCard } from "@/components/Cards";
import { SERVICES, getService } from "@/data/services";
import { getProject } from "@/data/projects";
import { getPost } from "@/data/posts";
import { buildMetadata, serviceLd, webPageLd } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return buildMetadata({ title: `${s.title} Services`, description: s.answer, path: `/services/${s.slug}/`, keywords: s.keywords });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const path = `/services/${s.slug}/`;
  const projects = s.projects.map(getProject).filter((p) => !!p);
  const posts = s.posts.map(getPost).filter((p) => !!p);
  const others = SERVICES.filter((o) => o.slug !== s.slug);

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Services", path: "/services/" }, { name: s.title, path }]} />
          <span className="eyebrow">{s.title}</span>
          <h1>{s.headline}</h1>
          <p className="answer-box">{s.answer}</p>
          <p style={{ marginTop: 24 }}>
            <Link href="/contact/" className="btn">
              Get a free quote →
            </Link>
          </p>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap svc-grid">
          <div className="svc-main">
            <h2>What we deliver</h2>
            <p>{s.intro}</p>
            <ul className="ticks two" style={{ marginTop: 18 }}>
              {s.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>

            <h2>What you get</h2>
            <ul className="ticks">
              {s.deliverables.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>

            <h2>How we work</h2>
            <div className="mini-steps">
              {s.process.map(([t, d], i) => (
                <div key={t}>
                  <b>
                    {i + 1}. {t}
                  </b>
                  <span>{d}</span>
                </div>
              ))}
            </div>

            <h2>Technologies &amp; tools</h2>
            <div className="tags" style={{ marginTop: 0 }}>
              {s.tags.map((t) => (
                <i key={t}>{t}</i>
              ))}
            </div>

            <Faq items={s.faqs} heading={`${s.title} — frequently asked questions`} />
          </div>

          <aside className="side-card">
            <h3>Other services</h3>
            <ul>
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/services/${o.slug}/`}>{o.title}</Link>
                </li>
              ))}
            </ul>
            <Link href="/contact/" className="btn">
              Start a project →
            </Link>
          </aside>
        </div>
      </section>

      {projects.length > 0 && (
        <section className="section soft tight">
          <div className="wrap">
            <div className="head">
              <span className="eyebrow">Related work</span>
              <h2>
                {s.title} <span className="grad">in action</span>
              </h2>
            </div>
            <div className="pgrid">
              {projects.map((p) => p && <ProjectCard key={p.slug} p={p} reveal={false} />)}
            </div>
          </div>
        </section>
      )}

      {posts.length > 0 && (
        <section className="section tight">
          <div className="wrap">
            <div className="head">
              <span className="eyebrow">Guides</span>
              <h2>
                Learn more about <span className="grad">{s.title}</span>
              </h2>
            </div>
            <div className="pgrid">
              {posts.slice(0, 3).map((p) => p && <PostCard key={p.slug} p={p} reveal={false} />)}
            </div>
          </div>
        </section>
      )}

      <JsonLd data={serviceLd(s)} />
      <JsonLd data={webPageLd({ name: `${s.title} — After Layoff`, description: s.answer, path, modified: "2026-11-04" })} />
    </>
  );
}
