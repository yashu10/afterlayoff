import Link from "next/link";
import JsonLd from "./JsonLd";
import { breadcrumbLd, type Crumb } from "@/lib/seo";

/** Visible breadcrumb trail + BreadcrumbList structured data. */
export default function Breadcrumbs({ items, light = false }: { items: Crumb[]; light?: boolean }) {
  return (
    <>
      <nav className={`crumbs${light ? " light" : ""}`} aria-label="Breadcrumb">
        <ol>
          {items.map((c, i) => (
            <li key={c.path}>
              {i < items.length - 1 ? <Link href={c.path}>{c.name}</Link> : <span aria-current="page">{c.name}</span>}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbLd(items)} />
    </>
  );
}
