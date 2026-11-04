import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import Faq from "@/components/Faq";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import { SITE } from "@/data/site";
import { CONTACT_FAQS } from "@/data/faqs";
import { buildMetadata, webPageLd } from "@/lib/seo";

const DESC = "Tell us about your project. After Layoff replies within 24 hours with honest feedback, a free discovery call and a clear proposal.";
export const metadata: Metadata = buildMetadata({ title: "Contact Us — Start a Project", description: DESC, path: "/contact/" });

export default function Contact() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact/" }]} />
          <span className="eyebrow">Contact</span>
          <h1>
            Have an idea? <span className="grad">Let&apos;s build it.</span>
          </h1>
          <p>Tell us what you&apos;re working on. We&apos;ll reply within 24 hours with honest feedback and a clear next step.</p>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap contact">
          <div className="reveal">
            <div className="infocards">
              <div className="ic"><span aria-hidden="true">📧</span><div><b>Email</b><a href={`mailto:${SITE.email}`}>{SITE.email}</a></div></div>
              <div className="ic"><span aria-hidden="true">🌍</span><div><b>Location</b>Remote — working worldwide</div></div>
              <div className="ic"><span aria-hidden="true">⏱</span><div><b>Hours</b>{SITE.hours}</div></div>
              <div className="ic"><span aria-hidden="true">💼</span><div><b>Careers</b><a href={`mailto:${SITE.email}?subject=Career enquiry`}>{SITE.email}</a></div></div>
            </div>
            <h2 className="faq-h">What happens next?</h2>
            <ol className="next">
              <li><b>We review</b> your message within 24 hours.</li>
              <li><b>Free discovery call</b> to understand goals and scope.</li>
              <li><b>Proposal</b> with timeline, team and fixed pricing.</li>
            </ol>
          </div>
          <div className="reveal">
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="wrap narrow">
          <Faq items={CONTACT_FAQS} heading="Common questions" />
        </div>
      </section>

      <JsonLd data={webPageLd({ type: "ContactPage", name: "Contact After Layoff", description: DESC, path: "/contact/", modified: "2026-11-04" })} />
    </>
  );
}
