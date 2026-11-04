import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import RevealInit from "@/components/RevealInit";
import { BASE_PATH, SITE, SITE_URL } from "@/data/site";
import { siteGraph } from "@/lib/seo";

// Self-hosted at build time (no render-blocking Google Fonts request, no layout shift, no header blink).
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", display: "swap", weight: ["500", "600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE.title, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE_URL }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "technology",
  alternates: { canonical: "/", types: { "application/rss+xml": `${SITE_URL}/feed.xml` } },
  openGraph: { type: "website", siteName: SITE.name, locale: SITE.locale, url: SITE_URL, title: SITE.title, description: SITE.description, images: [{ url: "/og-image.png", width: 1200, height: 630, alt: SITE.title }] },
  twitter: { card: "summary_large_image", title: SITE.title, description: SITE.description, images: ["/og-image.png"] },
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = { themeColor: "#0a5cff", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${grotesk.variable}`} style={{ ["--logo-url" as string]: `url(${BASE_PATH}/logo.png)` }}>
      <body>
        <a href="#main" className="skip">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <RevealInit />
        <JsonLd data={siteGraph()} />
      </body>
    </html>
  );
}
