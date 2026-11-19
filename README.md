# After Layoff — website

Next.js 16 (App Router, TypeScript) static site for **After Layoff**, with SEO, AEO (answer engines) and GEO (generative engines) built in.

## Scripts

```bash
npm install
npm run dev         # http://localhost:3000   (webpack)
npm run build       # static export -> dist/  (webpack, works on hosts without Turbopack bindings)
npm run typecheck   # strict TypeScript check
```

Requires Node >= 20.9. `NEXT_PUBLIC_*` variables are read at build time (see below).

## Where to edit things

| What | File |
|---|---|
| Domain, email, hours, founders, nav, social links (`sameAs`) | `src/data/site.ts` |
| Services (each gets its own page + FAQs + schema) | `src/data/services.ts` |
| Portfolio / case studies (`hidden: true` hides one) | `src/data/projects.ts` (images in `public/images/projects/`) |
| Blog posts (add an object to publish) | `src/data/posts.ts` |
| Home / About / Contact FAQs | `src/data/faqs.ts` |
| Privacy policy | `src/data/privacy.ts` |
| Styles | `src/app/globals.css` |
| Copy protection (select / copy / right-click) | `src/components/Protect.tsx` + end of `globals.css` |

## SEO / AEO / GEO

- **SEO:** per-page title, description, canonical, Open Graph and Twitter cards; `sitemap.xml`; `robots.txt`; breadcrumbs; one `h1` per page; self-hosted fonts; alt text; RSS (`/feed.xml`).
- **Structured data (JSON-LD):** Organization + ProfessionalService, WebSite, Person (founders), BreadcrumbList, Service, FAQPage, BlogPosting, CollectionPage, CreativeWork, AboutPage, ContactPage.
- **AEO:** every service and article starts with an answer-first summary; question-style FAQs (visible and in FAQPage schema).
- **GEO:** `/llms.txt` and `/llms-full.txt`; `robots.txt` explicitly allows search and AI crawlers; consistent entity data everywhere.

## Hosting

The site is a static export (`dist/`), so it runs anywhere.

| Host | How |
|---|---|
| **Hostinger (shared / Cloud)** | Upload the contents of `dist/` (built without a base path) to `public_html`. If you use hPanel's Node.js builder instead: Build command `npm run build`, **Output directory `dist`** (not `.next`). |
| **Vercel** | Import the GitHub repo; it detects Next.js and deploys on every push to `main`. |
| **GitHub Pages** | Settings → Pages → Source: **GitHub Actions**. `.github/workflows/deploy.yml` deploys on every push to `main` under `/afterlayoff` (set repo variable `CUSTOM_DOMAIN` to serve from a domain root). |
| **Docker / VPS** | `docker build -t afterlayoff .` then `docker run -d -p 80:80 afterlayoff` (Node build stage + nginx). Not available on shared hosting. |

Build-time variables: `NEXT_PUBLIC_SITE_URL` (default `https://afterlayoff.in`), `NEXT_PUBLIC_BASE_PATH` (only for sub-path hosting), `NEXT_PUBLIC_WEB3FORMS_KEY` (contact form key).

## Agent-readiness

- **Content-Signal** in `robots.txt` (`search=yes, ai-input=yes, ai-train=no`), set in `CONTENT_SIGNALS` in `src/data/site.ts`. With `aiTrain: false` the training-only crawlers (GPTBot, ClaudeBot, Google-Extended, CCBot ...) are disallowed; search and answer bots (Googlebot, OAI-SearchBot, Claude-SearchBot, PerplexityBot ...) stay allowed.
- **Markdown twin of every page** (`/index.md`, `/about.md`, `/services/web-development.md` ...). `npm run build` is a two-pass build: the first `next build` renders the HTML, `scripts/postbuild.mjs md` converts it to Markdown files in `public/` (git-ignored, regenerated every build), and the second `next build` publishes them like any static file, so they work on Hostinger, Vercel, GitHub Pages and Docker. Each page advertises its twin with `<link rel="alternate" type="text/markdown">`. `public/.htaccess` (Apache / LiteSpeed) also serves them for `Accept: text/markdown`; `vercel.json` adds the homepage `Link` header. Static hosts that ignore `.htaccess` cannot negotiate content types, so there the `.md` URLs are the discovery path.
- **WebMCP** (`src/components/WebMcp.tsx`): registers 6 read-only tools with `navigator.modelContext` (company info, services, portfolio, blog search, contact details); the contact form is annotated with `toolname` / `tooldescription` and never auto-submits.
- **Not included on purpose:** an MCP Server Card (`/.well-known/mcp/server-card.json`) needs a real MCP server endpoint, which a static site cannot host.

## Contact form

Enquiries are emailed to `contact@afterlayoff.in`: Web3Forms when `NEXT_PUBLIC_WEB3FORMS_KEY` is set (free key from https://web3forms.com), otherwise FormSubmit, otherwise the visitor's email app opens as a fallback.
