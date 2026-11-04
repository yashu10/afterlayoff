import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BlogGrid } from "@/components/Filtered";
import { POSTS, unsplash } from "@/data/posts";
import { fmtDate } from "@/lib/paths";
import { buildMetadata, collectionLd } from "@/lib/seo";

const DESC = "Practical guides on AI and LLMs, AI agents, RAG, web development, DevOps, UI/UX design, social media, branding and building a startup — from the After Layoff team.";
const base = buildMetadata({ title: "Blog — AI, LLM, Web, DevOps & Design Guides", description: DESC, path: "/blog/" });
export const metadata: Metadata = { ...base, alternates: { ...base.alternates, types: { "application/rss+xml": "/feed.xml" } } };

export default function Blog() {
  const [first, ...rest] = POSTS;
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog/" }]} />
          <span className="eyebrow">Blog</span>
          <h1>
            Ideas, guides &amp; <span className="grad">stories</span>
          </h1>
          <p>Practical insights on tech, design and building a business — from the After Layoff team.</p>
        </div>
      </section>
      <section className="section tight">
        <div className="wrap">
          <Link
            className="bfeat"
            href={`/blog/${first.slug}/`}
            style={{ background: `linear-gradient(90deg,rgba(7,12,28,.92) 25%,rgba(7,12,28,.35)),url('${unsplash(first.imgId, 1600)}') center/cover,${first.grad}` }}
          >
            <span className="badge">Latest · {first.cat}</span>
            <h2>{first.title}</h2>
            <p>{first.excerpt}</p>
            <small>
              <time dateTime={first.date}>{fmtDate(first.date)}</time> · {first.read} min read
            </small>
          </Link>
          <BlogGrid posts={rest} />
        </div>
      </section>
      <JsonLd data={collectionLd("After Layoff blog", "/blog/", POSTS.map((p) => ({ name: p.title, path: `/blog/${p.slug}/` })))} />
    </>
  );
}
