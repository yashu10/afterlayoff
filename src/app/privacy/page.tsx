import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { PRIVACY_HTML, PRIVACY_UPDATED } from "@/data/privacy";
import { fmtDate, withBaseInHtml } from "@/lib/paths";
import { buildMetadata, webPageLd } from "@/lib/seo";

const DESC = "How After Layoff collects, uses, shares and protects your personal information.";
export const metadata: Metadata = buildMetadata({ title: "Privacy Policy", description: DESC, path: "/privacy/" });

export default function Privacy() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy/" }]} />
          <span className="eyebrow">Legal</span>
          <h1>
            Privacy <span className="grad">Policy</span>
          </h1>
          <p>
            Last updated: <time dateTime={PRIVACY_UPDATED}>{fmtDate(PRIVACY_UPDATED, true)}</time>
          </p>
        </div>
      </section>
      <article className="section tight">
        <div className="wrap narrow prose" dangerouslySetInnerHTML={{ __html: withBaseInHtml(PRIVACY_HTML) }} />
      </article>
      <JsonLd data={webPageLd({ name: "Privacy Policy", description: DESC, path: "/privacy/", modified: PRIVACY_UPDATED })} />
    </>
  );
}
