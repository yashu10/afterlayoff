// Post-build helper for the static export. Two modes (see "build" in package.json):
//
//   node scripts/postbuild.mjs md   -> after the 1st `next build`: write a Markdown twin of every page into public/
//                                      (about/ -> public/about.md, home -> public/index.md). The 2nd `next build` then
//                                      publishes them as normal static files. Hosts such as Hostinger and Vercel only
//                                      serve files Next knows about (public/ is known), not files added after the build.
//   node scripts/postbuild.mjs      -> after the 2nd `next build`: fix prefetch file names (below).
//
// Prefetch fix: Next writes segment-prefetch files as <route>/__next.<seg>/<name>.txt (and a deeper layout for dynamic
// routes) but the client requests <route>/__next.<seg>.<name>.txt . Plain static hosts 404 those requests, so each file
// is copied to the flat name.
import { readdirSync, statSync, copyFileSync, existsSync, readFileSync, writeFileSync, mkdirSync, unlinkSync } from "node:fs";
import { join, relative, dirname, sep } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = fileURLToPath(new URL("../" + (process.env.NEXT_DIST_DIR || "dist"), import.meta.url));
const PUBLIC = fileURLToPath(new URL("../public", import.meta.url));
const MODE = process.argv[2];

// ------------------------------------------------------------- prefetch file names
let copied = 0;
function flatten(routeDir, dir, prefix) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) flatten(routeDir, full, `${prefix}.${name}`);
    else {
      const dest = join(routeDir, `${prefix}.${name}`);
      if (!existsSync(dest)) { copyFileSync(full, dest); copied++; }
    }
  }
}
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (!statSync(full).isDirectory()) continue;
    if (name.startsWith("__next.")) flatten(dir, full, name);
    else walk(full);
  }
}

// ------------------------------------------------------------- Markdown twins
const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://afterlayoff.in").replace(/\/$/, "");
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

const decode = (s) =>
  s.replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, "&");
const strip = (h) => decode(h.replace(/<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
const absUrl = (href) => {
  href = decode(href);
  if (!href || href.startsWith("#")) return null;
  if (/^(https?:|mailto:|tel:)/.test(href)) return href;
  return SITE + (BASE && href.startsWith(BASE) ? href.slice(BASE.length) : href);
};
const attr = (tag, name) => (tag.match(new RegExp("\\b" + name + "=\"([^\"]*)\"")) || [])[1];

function inline(h) {
  h = h.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (m, a, t) => {
    const text = strip(t), u = absUrl(attr(a, "href") || "");
    return u && text ? `[${text}](${u})` : text;
  });
  h = h.replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, "**$2**").replace(/<(em|i)\b[^>]*>([\s\S]*?)<\/\1>/gi, "*$2*");
  return strip(h);
}

function htmlToMarkdown(html) {
  const title = strip((html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || "");
  const desc = decode((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "");
  const main = (html.match(/<main\b[^>]*>([\s\S]*)<\/main>/) || [])[1];
  if (!main) return null;

  let h = main.replace(/<(script|style|svg|canvas|noscript|form|nav|button)\b[\s\S]*?<\/\1>/gi, "").replace(/<!--[\s\S]*?-->/g, "");
  h = h.replace(/<section\b[^>]*class="marquee"[\s\S]*?<\/section>/gi, "").replace(/<span\b[^>]*class="chip[^"]*"[^>]*>[\s\S]*?<\/span>/gi, "");
  // cards (links wrapping a title + text) -> "- [Title](url) — text"
  h = h.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (m, a, body) => {
    if (!/\b(pcard|card|bfeat)\b/.test(attr(a, "class") || "")) return m;
    const t = (body.match(/<h[23]\b[^>]*>([\s\S]*?)<\/h[23]>/) || [])[1], d = (body.match(/<p\b[^>]*>([\s\S]*?)<\/p>/) || [])[1], u = absUrl(attr(a, "href") || "");
    return t && u ? `\n\n- [${strip(t)}](${u})${d ? " — " + strip(d) : ""}\n\n` : m;
  });
  // every remaining link (buttons, inline links) -> markdown
  h = h.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (m, a, t) => {
    const text = strip(t), u = absUrl(attr(a, "href") || "");
    return u && text ? `[${text}](${u})` : text;
  });
  h = h.replace(/<details\b[^>]*>\s*<summary\b[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/gi, (m, q, a) => `\n\n**${inline(q)}**\n\n${inline(a)}\n\n`);
  h = h.replace(/<h([1-4])\b[^>]*>([\s\S]*?)<\/h\1>/gi, (m, n, t) => `\n\n${"#".repeat(Number(n))} ${inline(t)}\n\n`);
  h = h.replace(/<li\b[^>]*>([\s\S]*?)<\/li>/gi, (m, t) => `\n- ${inline(t)}`);
  h = h.replace(/<\/?(ul|ol)\b[^>]*>/gi, "\n");
  h = h.replace(/<p\b[^>]*>([\s\S]*?)<\/p>/gi, (m, t) => `\n\n${inline(t)}\n\n`);
  h = h.replace(/<br\s*\/?>/gi, "\n").replace(/<\/(div|section|article|aside|figure|blockquote)>/gi, "\n\n");
  h = decode(h.replace(/<[^>]+>/g, " ")); // drop any remaining tags (text between them stays)
  const body = h.split("\n").map((l) => l.replace(/[ \t]+/g, " ").trimEnd()).join("\n").replace(/\n{3,}/g, "\n\n").trim();
  return `---\ntitle: ${title}\ndescription: ${desc}\n---\n\n${body}\n`;
}

function removeOldMarkdown(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) removeOldMarkdown(full);
    else if (name.endsWith(".md")) unlinkSync(full);
  }
}

let mdCount = 0;
function writeMarkdown(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      if (name === "_next" || name === "_not-found" || name === "404" || name === "tools" || name.startsWith("__next")) continue;
      writeMarkdown(full);
    } else if (name === "index.html") {
      const md = htmlToMarkdown(readFileSync(full, "utf8"));
      if (!md) continue;
      const rel = relative(OUT, dir).split(sep).join("/");
      const target = join(PUBLIC, rel === "" ? "index.md" : `${rel}.md`);
      mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, md);
      mdCount++;
    }
  }
}

if (MODE === "md") {
  removeOldMarkdown(PUBLIC);
  writeMarkdown(OUT);
  console.log(`postbuild: wrote ${mdCount} Markdown twins into public/`);
} else {
  walk(OUT);
  console.log(`postbuild: created ${copied} flat prefetch files`);
}
