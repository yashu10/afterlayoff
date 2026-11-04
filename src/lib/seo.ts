import type { Metadata } from "next";
import { SITE, SITE_URL, FOUNDERS, abs } from "@/data/site";
import { SERVICES } from "@/data/services";
import type { Faq } from "@/data/posts";

type MetaInput = {
  title: string;
  description: string;
  path: string; // e.g. "/services/" (with trailing slash)
  image?: string; // absolute URL or site path
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
  noindex?: boolean;
};

/** Trim to ~155 chars at a word boundary so search snippets are not cut mid-sentence. */
export const clip = (t: string, max = 155) => {
  const x = t.replace(/\s+/g, " ").trim();
  if (x.length <= max) return x;
  const cut = x.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.\-–—]+$/, "") + "…";
};

/** Per-page metadata: title, description, canonical, Open Graph and Twitter cards. */
export function buildMetadata(m: MetaInput): Metadata {
  const url = abs(m.path);
  const description = clip(m.description);
  const image = m.image ? (m.image.startsWith("http") ? m.image : abs(m.image)) : abs("/og-image.png");
  return {
    title: m.title,
    description,
    keywords: m.keywords,
    alternates: { canonical: url },
    robots: m.noindex ? { index: false, follow: false } : { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    openGraph: {
      type: m.type ?? "website",
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      title: m.title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: m.title }],
      ...(m.type === "article" ? { publishedTime: m.publishedTime, modifiedTime: m.modifiedTime, authors: [SITE.name] } : {}),
    },
    twitter: { card: "summary_large_image", title: m.title, description, images: [image] },
  };
}

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

/** Site-wide entity graph: Organization, WebSite and the founders (Person). */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": ORG_ID,
        name: SITE.name,
        legalName: SITE.legalName,
        url: SITE_URL + "/",
        slogan: SITE.tagline,
        description: SITE.description,
        logo: { "@type": "ImageObject", url: abs("/logo.png"), width: 1250, height: 1250 },
        image: abs("/logo.png"),
        email: SITE.email,
        foundingDate: String(SITE.foundingYear),
        areaServed: SITE.areaServed,
        address: { "@type": "PostalAddress", addressCountry: SITE.country },
        priceRange: "$$",
        founder: FOUNDERS.map((f) => ({ "@id": `${SITE_URL}/#${f.name.toLowerCase().replace(/\s+/g, "-")}` })),
        knowsAbout: ["Web development", "Mobile app development", "Artificial intelligence", "Large language models", "Retrieval-augmented generation", "AI agents", "Workflow automation", "Cloud computing", "DevOps", "UI/UX design", "Social media design", "Branding"],
        contactPoint: [{ "@type": "ContactPoint", contactType: "customer support", email: SITE.email, availableLanguage: ["English", "Hindi", "Gujarati"], areaServed: SITE.areaServed, hoursAvailable: SITE.hours }],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "After Layoff services",
          itemListElement: SERVICES.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, url: abs(`/services/${s.slug}/`) } })),
        },
        ...(SITE.sameAs.length ? { sameAs: SITE.sameAs } : {}),
      },
      {
        "@type": "WebSite",
        "@id": SITE_ID,
        url: SITE_URL + "/",
        name: SITE.name,
        description: SITE.description,
        inLanguage: "en-IN",
        publisher: { "@id": ORG_ID },
      },
      ...FOUNDERS.map((f) => ({
        "@type": "Person",
        "@id": `${SITE_URL}/#${f.name.toLowerCase().replace(/\s+/g, "-")}`,
        name: f.name,
        jobTitle: f.jobTitle,
        image: abs(f.photo),
        worksFor: { "@id": ORG_ID },
        url: abs("/about/"),
      })),
    ],
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: abs(c.path) })),
  };
}

export function faqLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function webPageLd(opts: { type?: string; name: string; description: string; path: string; modified?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": opts.type ?? "WebPage",
    "@id": abs(opts.path) + "#webpage",
    url: abs(opts.path),
    name: opts.name,
    description: opts.description,
    inLanguage: "en-IN",
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
    ...(opts.modified ? { dateModified: opts.modified } : {}),
  };
}

export function serviceLd(s: { title: string; slug: string; answer: string; features: string[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": abs(`/services/${s.slug}/`) + "#service",
    name: s.title,
    serviceType: s.title,
    description: s.answer,
    url: abs(`/services/${s.slug}/`),
    provider: { "@id": ORG_ID },
    areaServed: SITE.areaServed,
    availableChannel: { "@type": "ServiceChannel", serviceUrl: abs("/contact/") },
    hasOfferCatalog: { "@type": "OfferCatalog", name: `${s.title} offerings`, itemListElement: s.features.map((f) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: f } })) },
  };
}

export function articleLd(p: { title: string; slug: string; tldr: string; date: string; updated?: string; cat: string; image: string; wordCount: number }) {
  const url = abs(`/blog/${p.slug}/`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": url + "#article",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: p.title,
    description: p.tldr,
    image: [p.image],
    datePublished: p.date,
    dateModified: p.updated ?? p.date,
    articleSection: p.cat,
    wordCount: p.wordCount,
    inLanguage: "en-IN",
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": SITE_ID },
    speakable: { "@type": "SpeakableSpecification", cssSelector: [".tldr", "h1"] },
  };
}

export function creativeWorkLd(p: { title: string; slug: string; tag: string; image?: string; cat: string; real: boolean }) {
  const url = abs(`/portfolio/${p.slug}/`);
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": url + "#work",
    name: p.title,
    headline: p.title,
    description: p.tag,
    url,
    genre: p.cat,
    creator: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    inLanguage: "en-IN",
    ...(p.image ? { image: p.image } : {}),
    ...(p.real ? {} : { additionalType: "https://schema.org/CreativeWork", disambiguatingDescription: "Concept case study" }),
  };
}

export function collectionLd(name: string, path: string, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    url: abs(path),
    isPartOf: { "@id": SITE_ID },
    mainEntity: { "@type": "ItemList", itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, url: abs(it.path), name: it.name })) },
  };
}

export const stripHtml = (html: string) => html.replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
