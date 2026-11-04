import type { MetadataRoute } from "next";
import { abs } from "@/data/site";
import { SERVICES } from "@/data/services";
import { PROJECTS } from "@/data/projects";
import { POSTS } from "@/data/posts";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-11-04");
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly", lastModified = now) => ({ url: abs(path), lastModified, changeFrequency, priority });
  return [
    page("/", 1, "weekly"),
    page("/services/", 0.9, "monthly"),
    ...SERVICES.map((s) => page(`/services/${s.slug}/`, 0.9, "monthly")),
    page("/portfolio/", 0.8, "monthly"),
    ...PROJECTS.map((p) => page(`/portfolio/${p.slug}/`, 0.6, "yearly")),
    page("/blog/", 0.8, "weekly"),
    ...POSTS.map((p) => page(`/blog/${p.slug}/`, 0.7, "monthly", new Date(p.updated ?? p.date))),
    page("/about/", 0.7, "monthly"),
    page("/contact/", 0.8, "yearly"),
    page("/careers/", 0.5, "monthly"),
    page("/privacy/", 0.3, "yearly"),
  ];
}
