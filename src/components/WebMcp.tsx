"use client";

import { useEffect } from "react";

/**
 * WebMCP (https://webmachinelearning.github.io/webmcp/): registers read-only tools with in-browser AI agents
 * through navigator.modelContext. Browsers without WebMCP simply skip this (nothing is loaded or run).
 * The contact form is annotated separately (toolname / tooldescription) and never auto-submits: the visitor
 * always reviews and presses Send.
 */

type ToolResult = { content: { type: "text"; text: string }[] };
type Tool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations?: { readOnlyHint?: boolean };
  execute: (args: Record<string, unknown>) => Promise<ToolResult>;
};
type ModelContext = {
  registerTool?: (tool: Tool) => unknown;
  unregisterTool?: (name: string) => void;
  provideContext?: (ctx: { tools: Tool[] }) => void;
};

const ok = (data: unknown): ToolResult => ({ content: [{ type: "text", text: typeof data === "string" ? data : JSON.stringify(data, null, 2) }] });
const noArgs = { type: "object", properties: {}, additionalProperties: false };

async function buildTools(): Promise<Tool[]> {
  const [{ SITE, SITE_URL, FOUNDERS, abs }, { SERVICES, getService }, { PROJECTS }, { POSTS }] = await Promise.all([
    import("@/data/site"),
    import("@/data/services"),
    import("@/data/projects"),
    import("@/data/posts"),
  ]);

  return [
    {
      name: "get_company_info",
      description: "Basic facts about After Layoff: what it is, founders, services, how to contact it and where the website lives.",
      inputSchema: noArgs,
      annotations: { readOnlyHint: true },
      execute: async () =>
        ok({
          name: SITE.name, tagline: SITE.tagline, description: SITE.description, website: SITE_URL + "/",
          email: SITE.email, hours: SITE.hours, areaServed: SITE.areaServed, founded: SITE.foundingYear,
          founders: FOUNDERS.map((f) => ({ name: f.name, role: f.jobTitle })),
          services: SERVICES.map((s) => s.title),
        }),
    },
    {
      name: "list_services",
      description: "List every service After Layoff offers, with a one-line summary and the page URL.",
      inputSchema: noArgs,
      annotations: { readOnlyHint: true },
      execute: async () => ok(SERVICES.map((s) => ({ slug: s.slug, name: s.title, summary: s.short, url: abs(`/services/${s.slug}/`) }))),
    },
    {
      name: "get_service",
      description: "Details of one service: definition, what is delivered, tools used and frequently asked questions.",
      inputSchema: { type: "object", properties: { slug: { type: "string", description: "Service slug, e.g. ai-automation, web-development, cloud-devops" } }, required: ["slug"], additionalProperties: false },
      annotations: { readOnlyHint: true },
      execute: async (args) => {
        const s = getService(String(args.slug ?? ""));
        if (!s) return ok(`Unknown service. Valid slugs: ${SERVICES.map((x) => x.slug).join(", ")}`);
        return ok({ name: s.title, definition: s.answer, features: s.features, tools: s.tags, faqs: s.faqs, url: abs(`/services/${s.slug}/`) });
      },
    },
    {
      name: "list_portfolio",
      description: "List case studies / projects, optionally filtered by category (e.g. Mobile App, Website, AI, Cloud, Branding, Social Media).",
      inputSchema: { type: "object", properties: { category: { type: "string", description: "Optional category filter" } }, additionalProperties: false },
      annotations: { readOnlyHint: true },
      execute: async (args) => {
        const c = String(args.category ?? "").toLowerCase();
        const list = PROJECTS.filter((p) => !c || p.cat.toLowerCase().includes(c));
        return ok(list.map((p) => ({ title: p.title, category: p.cat, summary: p.tag, concept: !p.real, url: abs(`/portfolio/${p.slug}/`) })));
      },
    },
    {
      name: "search_blog",
      description: "Search After Layoff's articles (AI, LLMs, web, DevOps, design) by keyword; returns titles, quick answers and URLs.",
      inputSchema: { type: "object", properties: { query: { type: "string", description: "Keywords, e.g. 'RAG', 'chatbot cost'" } }, required: ["query"], additionalProperties: false },
      annotations: { readOnlyHint: true },
      execute: async (args) => {
        const words = String(args.query ?? "").toLowerCase().split(/\s+/).filter(Boolean);
        const hits = POSTS.filter((p) => words.every((w) => `${p.title} ${p.tldr} ${p.cat}`.toLowerCase().includes(w)));
        return ok(hits.map((p) => ({ title: p.title, quickAnswer: p.tldr, published: p.date, url: abs(`/blog/${p.slug}/`) })));
      },
    },
    {
      name: "get_contact_details",
      description: "How to contact After Layoff or start a project. This tool does not send anything; the visitor uses the contact form themselves.",
      inputSchema: noArgs,
      annotations: { readOnlyHint: true },
      execute: async () => ok({ email: SITE.email, hours: SITE.hours, replyTime: "within 24 hours", contactFormUrl: abs("/contact/") }),
    },
  ];
}

export default function WebMcp() {
  useEffect(() => {
    const mc = (navigator as Navigator & { modelContext?: ModelContext }).modelContext;
    if (!mc || (!mc.registerTool && !mc.provideContext)) return; // browser has no WebMCP: do nothing

    let cancelled = false;
    const names: string[] = [];
    buildTools()
      .then((tools) => {
        if (cancelled) return;
        if (mc.registerTool) {
          for (const t of tools) {
            try { mc.registerTool(t); names.push(t.name); } catch { /* already registered */ }
          }
        } else {
          mc.provideContext?.({ tools });
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      names.forEach((n) => { try { mc.unregisterTool?.(n); } catch { /* ignore */ } });
    };
  }, []);
  return null;
}
