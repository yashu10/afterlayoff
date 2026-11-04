import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SERVICES } from "@/data/services";
import { buildMetadata, collectionLd } from "@/lib/seo";

const DESC = "Web development, mobile apps, AI & automation, cloud & DevOps, UI/UX design, social media design, graphic design & branding and tech consulting — one team, end to end.";
export const metadata: Metadata = buildMetadata({
  title: "IT Services — Web, Mobile, AI, Cloud & Design",
  description: DESC,
  path: "/services/",
  keywords: ["IT services India", "web development", "mobile app development", "AI development", "DevOps", "UI UX design", "branding"],
});

export default function Services() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Services", path: "/services/" }]} />
          <span className="eyebrow">Services</span>
          <h1>
            Everything you need to <span className="grad">ship &amp; scale</span>
          </h1>
          <p>After Layoff is a full-service IT company: strategy, design, engineering and support from one team.</p>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          {SERVICES.map((s) => (
            <article className="svc reveal" id={s.slug} key={s.slug}>
              <div className="svc-ico" aria-hidden="true">{s.icon}</div>
              <div>
                <h2>
                  <Link href={`/services/${s.slug}/`}>{s.title}</Link>
                </h2>
                <p>{s.answer}</p>
                <ul className="ticks two">
                  {s.features.slice(0, 6).map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <div className="tags">
                  {s.tags.map((t) => (
                    <i key={t}>{t}</i>
                  ))}
                </div>
                <Link href={`/services/${s.slug}/`} className="lnk">
                  Explore {s.title.toLowerCase()} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section soft">
        <div className="wrap">
          <div className="head reveal">
            <span className="eyebrow">Engagement models</span>
            <h2>
              Work with us <span className="grad">your way</span>
            </h2>
          </div>
          <div className="cards">
            <article className="card reveal"><div className="ico" aria-hidden="true">📦</div><h3>Fixed scope</h3><p>Defined deliverables, defined price. Best for MVPs and well-understood projects.</p></article>
            <article className="card reveal"><div className="ico" aria-hidden="true">⏳</div><h3>Time &amp; material</h3><p>Flexible scope, billed on actual effort. Best when requirements will evolve.</p></article>
            <article className="card reveal"><div className="ico" aria-hidden="true">👥</div><h3>Dedicated team</h3><p>A monthly team that works as an extension of yours. Best for long-term products.</p></article>
          </div>
        </div>
      </section>

      <JsonLd data={collectionLd("After Layoff services", "/services/", SERVICES.map((s) => ({ name: s.title, path: `/services/${s.slug}/` })))} />
    </>
  );
}
