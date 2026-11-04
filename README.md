# After Layoff — website

Next.js (App Router, TypeScript) static site for **After Layoff**, with SEO, AEO (answer engines) and GEO (generative engines) built in.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export -> dist/
```

## Where to edit things

| What | File |
|---|---|
| Domain, email, hours, founders, nav | `src/data/site.ts` |
| Services (each gets its own page + FAQs + schema) | `src/data/services.ts` |
| Portfolio / case studies (`hidden: true` hides one) | `src/data/projects.ts` |
| Blog posts (add an object to publish) | `src/data/posts.ts` |
| Home / About / Contact FAQs | `src/data/faqs.ts` |
| Privacy policy | `src/data/privacy.ts` |
| Styles | `src/app/globals.css` |

## SEO / AEO / GEO — what is included

**SEO:** per-page title, description, canonical, Open Graph and Twitter cards; `sitemap.xml`; `robots.txt`; breadcrumbs; one `h1` per page; self-hosted fonts (no render-blocking requests); descriptive alt text; clean URLs; RSS feed (`/feed.xml`).

**Structured data (JSON-LD):** Organization + ProfessionalService, WebSite, Person (founders), BreadcrumbList, Service, FAQPage, BlogPosting, CollectionPage, CreativeWork, AboutPage, ContactPage.

**AEO (answer engines):** every service and article starts with a concise "answer-first" summary; question-style FAQs with short direct answers (visible on the page and in FAQPage schema); `speakable` markup on article summaries.

**GEO (generative engines):** `/llms.txt` and `/llms-full.txt` give AI assistants a clean map and the full text of the site; `robots.txt` explicitly allows search and AI crawlers (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, …); consistent entity data (name, founders, services, contact) across schema, `llms.txt` and the About page; dated, updated articles.

Add real profile URLs (LinkedIn company page, Instagram, X, Google Business Profile…) to `SITE.sameAs` in `src/data/site.ts` — this strengthens the brand entity for both search and AI answers.

## Hosting / deployment

The site is a static export (`dist/`), so it runs on GitHub Pages, Hostinger, Netlify, etc.

- **GitHub Pages:** Settings → Pages → Source: **GitHub Actions**. `.github/workflows/deploy.yml` builds and deploys on every push to `main`.
  - Served from `https://<user>.github.io/afterlayoff` → nothing else to set (base path `/afterlayoff` is applied).
  - Custom domain (e.g. `afterlayoff.in`) → add a repository **variable** `CUSTOM_DOMAIN=afterlayoff.in`, add `public/CNAME` with the domain, and point DNS at GitHub Pages.
- **Contact form:** set the repository variable `WEB3FORMS_KEY` (free key from https://web3forms.com, sent to contact@afterlayoff.in). Without it the form falls back to FormSubmit, then to the visitor's email app.
- `NEXT_PUBLIC_SITE_URL` overrides the canonical domain (default `https://afterlayoff.in`).
