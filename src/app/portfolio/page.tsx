import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { PortfolioGrid } from "@/components/Filtered";
import { PROJECTS } from "@/data/projects";
import { buildMetadata, collectionLd } from "@/lib/seo";

const DESC = "Case studies by After Layoff: mobile apps, web dashboards, websites, branding, social media design, AI and cloud projects — challenge, solution and tech stack for each.";
export const metadata: Metadata = buildMetadata({ title: "Portfolio — Case Studies & Projects", description: DESC, path: "/portfolio/" });

export default function Portfolio() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Portfolio", path: "/portfolio/" }]} />
          <span className="eyebrow">Portfolio</span>
          <h1>
            Products we <span className="grad">design &amp; engineer</span>
          </h1>
          <p>A closer look at how we approach real-world problems — from the challenge, to the solution, to the stack.</p>
        </div>
      </section>
      <section className="section tight">
        <div className="wrap">
          <div className="notice">
            Design, branding and social media work below is <b>real work</b> by our founder. Items tagged <b>Concept</b> are development case studies showing how we&apos;d solve typical client problems — real dev projects will be added as we ship them.
          </div>
          <PortfolioGrid projects={PROJECTS} />
        </div>
      </section>
      <JsonLd data={collectionLd("After Layoff portfolio", "/portfolio/", PROJECTS.map((p) => ({ name: p.title, path: `/portfolio/${p.slug}/` })))} />
    </>
  );
}
