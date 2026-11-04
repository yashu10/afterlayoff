import Link from "next/link";
import { SITE } from "@/data/site";
import { SERVICES } from "@/data/services";

export default function Footer() {
  return (
    <>
      <section className="cta-band">
        <div className="wrap">
          <h2>Ready to build what&apos;s next?</h2>
          <p>Tell us about your idea — we&apos;ll reply within 24 hours with honest feedback.</p>
          <Link href="/contact/" className="btn light">
            Start a project →
          </Link>
        </div>
      </section>
      <footer className="footer">
        <div className="wrap foot-grid">
          <div>
            <div className="fbrand">
              <span className="mark" style={{ ["--s" as string]: 0.08 }} aria-hidden="true" /> <b>{SITE.name}</b>
            </div>
            <p>
              {SITE.tagline}
              <br />
              An IT company by engineers who turned a setback into a launchpad.
            </p>
          </div>
          <div>
            <h4>Company</h4>
            <Link href="/about/">About us</Link>
            <Link href="/portfolio/">Portfolio</Link>
            <Link href="/blog/">Blog</Link>
            <Link href="/careers/">Careers</Link>
            <Link href="/contact/">Contact</Link>
          </div>
          <div>
            <h4>Services</h4>
            {SERVICES.slice(0, 6).map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}/`}>
                {s.title.replace(" & Management", "")}
              </Link>
            ))}
          </div>
          <div>
            <h4>Get in touch</h4>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <span>Remote — working worldwide</span>
            <span>{SITE.hours}</span>
          </div>
        </div>
        <div className="wrap foot-bottom">
          <small>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</small>
          <small>
            <Link href="/privacy/">Privacy</Link>
          </small>
        </div>
      </footer>
    </>
  );
}
