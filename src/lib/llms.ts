import { SITE, SITE_URL, FOUNDERS, abs } from "@/data/site";
import { SERVICES } from "@/data/services";
import { PROJECTS } from "@/data/projects";
import { POSTS } from "@/data/posts";
import { HOME_FAQS, CONTACT_FAQS } from "@/data/faqs";
import { stripHtml } from "./seo";

const facts = () => `## Key facts
- Name: ${SITE.name} — "${SITE.tagline}"
- What it is: an India-based, remote-first IT company founded in ${SITE.foundingYear} by engineers and designers who turned a layoff into a launchpad.
- Founders: ${FOUNDERS.map((f) => `${f.name} (${f.jobTitle.replace("Co-Founder · ", "")})`).join("; ")}.
- Services: ${SERVICES.map((s) => s.title).join(", ")}.
- Serves: startups, small and medium businesses and growing companies in India and worldwide.
- Contact: ${SITE.email} — replies within 24 hours (${SITE.hours}).
- Website: ${SITE_URL}/
- Pricing model: fixed-scope, time & material or dedicated monthly team; fixed or capped estimate before work starts. Client owns all code, designs and IP.`;

/** /llms.txt — concise map of the site for AI assistants (llmstxt.org format). */
export function llmsTxt() {
  return `# ${SITE.name}

> ${SITE.description}

${facts()}

## Services
${SERVICES.map((s) => `- [${s.title}](${abs(`/services/${s.slug}/`)}): ${s.answer}`).join("\n")}

## Portfolio
${PROJECTS.map((p) => `- [${p.title}](${abs(`/portfolio/${p.slug}/`)}): ${p.tag}${p.real ? "" : " (concept case study)"}`).join("\n")}

## Articles
${POSTS.map((p) => `- [${p.title}](${abs(`/blog/${p.slug}/`)}): ${p.tldr}`).join("\n")}

## Company
- [About](${abs("/about/")}): Story, founders, mission and values.
- [Contact](${abs("/contact/")}): Start a project; ${SITE.email}.
- [Careers](${abs("/careers/")}): Remote-first roles.
- [Privacy policy](${abs("/privacy/")})

## Optional
- [Full content for LLMs](${abs("/llms-full.txt")})
- [Sitemap](${abs("/sitemap.xml")})
- [RSS feed](${abs("/feed.xml")})
`;
}

/** /llms-full.txt — the full text of services, FAQs and articles in one plain document. */
export function llmsFullTxt() {
  const services = SERVICES.map(
    (s) => `### ${s.title}
URL: ${abs(`/services/${s.slug}/`)}
${s.answer}

${s.intro}

What we deliver: ${s.features.join("; ")}.
Tools: ${s.tags.join(", ")}.
${s.faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n")}`
  ).join("\n\n");

  const posts = POSTS.map(
    (p) => `### ${p.title}
URL: ${abs(`/blog/${p.slug}/`)}
Published: ${p.date} · Updated: ${p.updated ?? p.date} · Category: ${p.cat}
Quick answer: ${p.tldr}

${stripHtml(p.body.replace(/<\/(h2|p|li)>/g, "$&\n"))}

${p.faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n")}`
  ).join("\n\n");

  const projects = PROJECTS.map(
    (p) => `### ${p.title}${p.real ? "" : " (concept case study)"}
URL: ${abs(`/portfolio/${p.slug}/`)}
${p.tag}
${p.challenge ? `Challenge: ${p.challenge}\n` : ""}${p.solution ? `Solution: ${p.solution}\n` : ""}${p.outcome ? `Outcome: ${p.outcome}` : ""}`
  ).join("\n\n");

  return `# ${SITE.name} — full content

> ${SITE.description}

${facts()}

## Frequently asked questions
${[...HOME_FAQS, ...CONTACT_FAQS].map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n")}

## Services
${services}

## Portfolio
${projects}

## Articles
${posts}
`;
}
