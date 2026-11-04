import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <section className="page-hero" style={{ minHeight: "70vh", display: "grid", alignItems: "center" }}>
      <div className="wrap">
        <span className="eyebrow">Error 404</span>
        <h1>
          This page took a <span className="grad">different path.</span>
        </h1>
        <p>The page you are looking for does not exist or has moved. Try one of these instead.</p>
        <p style={{ marginTop: 28, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn">Go home</Link>
          <Link href="/services/" className="btn ghost">Our services</Link>
          <Link href="/blog/" className="btn ghost">Read the blog</Link>
        </p>
      </div>
    </section>
  );
}
