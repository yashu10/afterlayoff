// Central site configuration. Change the domain/email here and everything (metadata, sitemap, schema, llms.txt) follows.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://afterlayoff.in").replace(/\/$/, "");
// Only needed when hosting under a sub-path (GitHub Pages: /afterlayoff). Empty for the custom domain.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const SITE = {
  name: "After Layoff",
  legalName: "After Layoff",
  tagline: "We Build What's Next.",
  title: "After Layoff — IT Company for Web, Mobile, AI & Cloud",
  description:
    "After Layoff is an India-based IT company building websites, mobile apps, AI & automation, cloud & DevOps solutions, UI/UX design, social media and branding for startups and growing businesses.",
  email: "contact@afterlayoff.in",
  locale: "en_IN",
  country: "IN",
  areaServed: "Worldwide",
  foundingYear: 2026,
  hours: "Mon–Sat, 10am–7pm IST",
  // Add real profile URLs here (LinkedIn company page, Instagram, X, Behance...) to strengthen entity signals.
  sameAs: [] as string[],
  // Paste a Web3Forms access key (free, sent to contact@afterlayoff.in via https://web3forms.com) to enable the contact form.
  web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "",
};

export const FOUNDERS = [
  { name: "Sagar Shah", role: "Co-Founder", jobTitle: "Co-Founder · AI & Python Backend Developer", photo: "/team/sagar-shah.webp" },
  { name: "Yash Patel", role: "Co-Founder", jobTitle: "Co-Founder · UI/UX & Brand Designer", photo: "/team/yash-patel.webp" },
];

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About" },
  { href: "/services/", label: "Services" },
  { href: "/portfolio/", label: "Portfolio" },
  { href: "/blog/", label: "Blog" },
  { href: "/careers/", label: "Careers" },
];

export const abs = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
