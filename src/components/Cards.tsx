import Link from "next/link";
import type { Project } from "@/data/projects";
import { unsplash, type Post } from "@/data/posts";
import { fmtDate } from "@/lib/paths";

export function ProjectCard({ p, reveal = true }: { p: Project; reveal?: boolean }) {
  return (
    <Link className={`pcard${reveal ? " reveal" : ""}`} href={`/portfolio/${p.slug}/`}>
      <div className="pimg" style={{ background: p.grad }}>
        {p.img ? <img src={p.img} alt={`${p.title} — ${p.cat} project by After Layoff`} width={900} height={560} loading="lazy" decoding="async" /> : <span aria-hidden="true">{p.icon}</span>}
        <em>
          {p.cat}
          {p.real ? "" : " · Concept"}
        </em>
      </div>
      <div className="pbody">
        <h3>{p.title}</h3>
        <p>{p.tag}</p>
        <span className="link">View case study →</span>
      </div>
    </Link>
  );
}

export function PostCard({ p, reveal = true }: { p: Post; reveal?: boolean }) {
  return (
    <Link className={`pcard${reveal ? " reveal" : ""}`} href={`/blog/${p.slug}/`}>
      <div className="pimg" style={{ background: p.grad }}>
        <img src={unsplash(p.imgId)} alt={p.title} width={900} height={560} loading="lazy" decoding="async" />
        <em>{p.cat}</em>
      </div>
      <div className="pbody">
        <small className="meta">
          <time dateTime={p.date}>{fmtDate(p.date)}</time> · {p.read} min read
        </small>
        <h3>{p.title}</h3>
        <p>{p.excerpt}</p>
        <span className="link">Read article →</span>
      </div>
    </Link>
  );
}
