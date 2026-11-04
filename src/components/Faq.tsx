import JsonLd from "./JsonLd";
import { faqLd } from "@/lib/seo";
import type { Faq as FaqType } from "@/data/posts";

/** Visible FAQ (accordion) + FAQPage structured data. Answers are kept short and direct for answer engines. */
export default function Faq({ items, heading = "Frequently asked questions" }: { items: FaqType[]; heading?: string }) {
  return (
    <section className="faq-block" aria-labelledby="faq-h">
      <h2 id="faq-h">{heading}</h2>
      {items.map((f) => (
        <details className="faq" key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
      <JsonLd data={faqLd(items)} />
    </section>
  );
}
