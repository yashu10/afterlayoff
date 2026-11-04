import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { PROJECTS, getProject, screensFor, type Pair } from "@/data/projects";
import { buildMetadata, creativeWorkLd } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return buildMetadata({ title: `${p.title} — ${p.real ? "Case Study" : "Concept Case Study"}`, description: `${p.tag} ${p.challenge ?? p.outcome ?? ""}`.trim(), path: `/portfolio/${p.slug}/`, image: p.img });
}

const metaOf = (meta: Pair[] | undefined, key: string) => meta?.find(([k]) => k.toLowerCase() === key.toLowerCase())?.[1];

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const i = PROJECTS.indexOf(p);
  const prev = PROJECTS[(i + PROJECTS.length - 1) % PROJECTS.length];
  const next = PROJECTS[(i + 1) % PROJECTS.length];
  const path = `/portfolio/${p.slug}/`;
  const screens = screensFor(p.slug);
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

      {/* ---------- AT A GLANCE + CHALLENGE / SOLUTION ---------- */}
      <section className="section tight cs-intro">
        <div className="wrap">
          {p.meta && (
            <div className="cs-glance reveal">
              {p.meta.map(([k, v]) => (
                <div className="cs-fact" key={k}>
                  <span>{k}</span>
                  <b>{v}</b>
                </div>
              ))}
            </div>
          )}
          {(p.challenge || p.solution) && (
            <div className="cs-duo">
              {p.challenge && (
                <article className="cs-card reveal">
                  <span className="cs-tag red">The challenge</span>
                  <h2>Why it needed designing</h2>
                  <p>{p.challenge}</p>
                </article>
              )}
              {p.solution && (
                <article className="cs-card reveal">
                  <span className="cs-tag blue">Our solution</span>
                  <h2>What we built</h2>
                  <p>{p.solution}</p>
                </article>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ---------- RESEARCH ---------- */}
      {p.process && (
        <section className="section soft tight">
          <div className="wrap">
            <div className="head reveal">
              <span className="eyebrow">Research &amp; thinking</span>
              <h2>
                Who it&apos;s for &amp; <span className="grad">how we approached it</span>
              </h2>
            </div>
            <div className="cs-cards3">
              {p.process.map(([t, d], n) => (
                <article className="cs-mini reveal" key={t}>
                  <i>{String(n + 1).padStart(2, "0")}</i>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- KEY DECISIONS ---------- */}
      {p.decisions && (
        <section className="section tight">
          <div className="wrap">
            <div className="head reveal">
              <span className="eyebrow">{p.challenge ? "Key design decisions" : "What we delivered"}</span>
              <h2>
                {p.challenge ? (
                  <>
                    Decisions that shaped <span className="grad">the product</span>
                  </>
                ) : (
                  <>
                    The work, <span className="grad">in detail</span>
                  </>
                )}
              </h2>
            </div>
            <div className="cs-decisions">
              {p.decisions.map(([t, d], n) => (
                <article className="cs-dec reveal" key={t}>
                  <span className="num">{n + 1}</span>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- SCREENS ---------- */}
      {screens && (
        <section className="section dark cs-screens">
          <div className="wrap">
            <div className="head reveal">
              <span className="eyebrow light">Selected screens</span>
              <h2>
                See the <span className="grad2">final design</span>
              </h2>
              {screens.kind !== "masonry" && <p>Scroll inside each screen to see the full design.</p>}
            </div>
          </div>
          {screens.kind === "phone" && (
            <div className="cs-phones" tabIndex={0} aria-label="Screens, scroll sideways">
              {screens.items.map((s) => (
                <figure className="cs-phone" key={s.src}>
                  <div className="frame">
                    <img src={s.src} alt={`${p.title} — ${s.caption} screen`} loading="lazy" decoding="async" />
                  </div>
                  <figcaption>{s.caption}</figcaption>
                </figure>
              ))}
            </div>
          )}
          {screens.kind === "wide" && (
            <div className="wrap">
              <div className="cs-wide">
                {screens.items.map((s) => (
                  <figure className="cs-win" key={s.src}>
                    <div className="bar">
                      <i />
                      <i />
                      <i />
                    </div>
                    <div className="body">
                      <img src={s.src} alt={`${p.title} — ${s.caption}`} loading="lazy" decoding="async" />
                    </div>
                    <figcaption>{s.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          )}
          {screens.kind === "masonry" && (
            <div className="wrap">
              <div className="cs-masonry">
                {screens.items.map((s) => (
                  <figure key={s.src}>
                    <img src={s.src} alt={`${p.title} — ${s.caption}`} loading="lazy" decoding="async" />
                    <figcaption>{s.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* ---------- OUTCOME ---------- */}
      {(p.outcome || p.next) && (
        <section className="section tight">
          <div className="wrap">
            <div className="cs-outcome reveal">
              {p.outcome && (
                <div>
                  <span className="cs-tag green">{p.real ? "Outcome" : "Outcomes we design for"}</span>
                  <p className="big">{p.outcome}</p>
                </div>
              )}
              {p.next && (
                <div className="nextbox">
                  <span className="cs-tag">What we would do next</span>
                  <p>{p.next}</p>
                </div>
              )}
            </div>
            <p className="center cs-actions">
              {(p.links || []).map(([t, u]) => (
                <a key={u} href={u} target="_blank" rel="noopener" className="btn ghost">
                  {t} ↗
                </a>
              ))}
              <Link href="/contact/" className="btn">
                Build something similar →
              </Link>
            </p>
          </div>
        </section>
      )}

      {/* ---------- PREV / NEXT ---------- */}
      <section className="section soft tight">
        <div className="wrap cs-pn">
          <Link href={`/portfolio/${prev.slug}/`} rel="prev">
            <small>← Previous project</small>
            <b>{prev.title}</b>
          </Link>
          <Link href={`/portfolio/${next.slug}/`} rel="next">
            <small>Next project →</small>
            <b>{next.title}</b>
          </Link>
        </div>
      </section>

      <JsonLd data={creativeWorkLd(p)} />
    </>
  );
}
