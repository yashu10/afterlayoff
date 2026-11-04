"use client";

import { useState } from "react";
import { ProjectCard, PostCard } from "./Cards";
import type { Project } from "@/data/projects";
import type { Post } from "@/data/posts";

function Filters({ cats, value, onChange }: { cats: string[]; value: string; onChange: (c: string) => void }) {
  return (
    <div className="filters" role="group" aria-label="Filter by category">
      {["All", ...cats].map((c) => (
        <button key={c} type="button" aria-pressed={value === c} className={value === c ? "on" : ""} onClick={() => onChange(c)}>
          {c}
        </button>
      ))}
    </div>
  );
}

/** All cards are in the server-rendered HTML; filtering only toggles visibility on the client. */
export function PortfolioGrid({ projects }: { projects: Project[] }) {
  const [cat, setCat] = useState("All");
  const cats = [...new Set(projects.map((p) => p.cat))];
  return (
    <>
      <Filters cats={cats} value={cat} onChange={setCat} />
      <div className="pgrid">
        {projects.map((p) => (
          <div key={p.slug} style={{ display: cat !== "All" && p.cat !== cat ? "none" : "contents" }}>
            <ProjectCard p={p} reveal={false} />
          </div>
        ))}
      </div>
    </>
  );
}

export function BlogGrid({ posts }: { posts: Post[] }) {
  const [cat, setCat] = useState("All");
  const cats = [...new Set(posts.map((p) => p.cat))];
  return (
    <>
      <Filters cats={cats} value={cat} onChange={setCat} />
      <div className="pgrid">
        {posts.map((p) => (
          <div key={p.slug} style={{ display: cat !== "All" && p.cat !== cat ? "none" : "contents" }}>
            <PostCard p={p} reveal={false} />
          </div>
        ))}
      </div>
    </>
  );
}
