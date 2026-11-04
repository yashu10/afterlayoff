import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import Faq from "@/components/Faq";
import Breadcrumbs from "@/components/Breadcrumbs";
import { PostCard } from "@/components/Cards";
import { POSTS, getPost, unsplash } from "@/data/posts";
import { SITE, abs } from "@/data/site";
import { fmtDate, withBaseInHtml } from "@/lib/paths";
import { articleLd, buildMetadata, stripHtml } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return buildMetadata({
    title: p.title,
    description: p.tldr.length > 160 ? p.excerpt : p.tldr,
    path: `/blog/${p.slug}/`,
    image: unsplash(p.imgId, 1200),
    type: "article",
    publishedTime: p.date,
    modifiedTime: p.updated ?? p.date,
    keywords: [p.cat, ...p.title.toLowerCase().split(/\W+/).filter((w) => w.length > 4).slice(0, 5)],
  });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const path = `/blog/${p.slug}/`;
  const url = abs(path);
  const related = POSTS.filter((o) => o.slug !== p.slug && o.cat === p.cat).concat(POSTS.filter((o) => o.slug !== p.slug && o.cat !== p.cat)).slice(0, 3);
  const words = stripHtml(p.body).split(" ").length;

  return (
    <>
      <section className="case-hero" style={{ background: `linear-gradient(180deg,rgba(7,12,28,.78),rgba(7,12,28,.88)),url('${unsplash(p.imgId, 1600)}') center/cover,${p.grad}` }}>
        <div className="wrap narrow">
          <Breadcrumbs light items={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog/" }, { name: p.title, path }]} />
          <span className="badge">{p.cat}</span>
          <h1 style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)" }}>{p.title}</h1>
          <p>
            <time dateTime={p.date}>{fmtDate(p.date, true)}</time>
            {p.updated && p.updated !== p.date && (
              <>
                {" "}
                · Updated <time dateTime={p.updated}>{fmtDate(p.updated, true)}</time>
              </>
            )}{" "}
            · {p.read} min read · By the {SITE.name} team
          </p>
        </div>
      </section>

      <article className="section tight">
        <div className="wrap narrow prose">
          <img className="post-img" src={unsplash(p.imgId)} alt={p.title} width={900} height={450} fetchPriority="high" />
          <div className="tldr">
            <b>Quick answer</b>
            {p.tldr}
          </div>
          <div dangerouslySetInnerHTML={{ __html: withBaseInHtml(p.body) }} />
          <Faq items={p.faqs} heading="Frequently asked questions" />
          <div className="share">
            <b>Share:</b>
            <a target="_blank" rel="noopener" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}>LinkedIn</a>
            <a target="_blank" rel="noopener" href={`https://wa.me/?text=${encodeURIComponent(p.title + " " + url)}`}>WhatsApp</a>
          </div>
        </div>
      </article>

      <section className="section soft tight">
        <div className="wrap">
          <div className="head">
            <h2>Keep reading</h2>
          </div>
          <div className="pgrid">
            {related.map((o) => (
              <PostCard key={o.slug} p={o} reveal={false} />
            ))}
          </div>
          <p className="center" style={{ marginTop: 32 }}>
            <Link href="/contact/" className="btn">
              Talk to our team →
            </Link>
          </p>
        </div>
      </section>

      <JsonLd data={articleLd({ title: p.title, slug: p.slug, tldr: p.tldr, date: p.date, updated: p.updated, cat: p.cat, image: unsplash(p.imgId, 1200), wordCount: words })} />
    </>
  );
}
