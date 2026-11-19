import { CONTENT_SIGNALS, SITE_URL } from "@/data/site";

export const dynamic = "force-static";

// Crawlers that fetch pages to power search or to answer a user's question right now.
const SEARCH_AND_ANSWER_BOTS = [
  "Googlebot", "Bingbot", "Applebot", "DuckAssistBot", "Amazonbot", "YouBot",
  "OAI-SearchBot", "ChatGPT-User", // OpenAI search + user-initiated browsing
  "Claude-SearchBot", "Claude-User", // Anthropic search + user-initiated browsing
  "PerplexityBot", "Perplexity-User", "MistralAI-User",
];

// Crawlers whose purpose is collecting training data / the opt-out tokens for model training.
// Blocking them does NOT affect Google Search, AI Overviews, ChatGPT search or Claude search.
const TRAINING_BOTS = ["GPTBot", "ClaudeBot", "anthropic-ai", "Google-Extended", "Applebot-Extended", "CCBot", "Meta-ExternalAgent", "Bytespider"];

const yn = (v: boolean) => (v ? "yes" : "no");

export function GET() {
  const { search, aiInput, aiTrain } = CONTENT_SIGNALS;
  const group = (ua: string, rules: string[]) => [`User-Agent: ${ua}`, ...rules, ""].join("\n");

  const body = [
    "# Content Signals (https://contentsignals.org/) — how AI systems may use this site's content",
    "#   search   = build a search index and show links / snippets",
    "#   ai-input = use pages as live context to answer questions (RAG, grounding, citations)",
    "#   ai-train = train or fine-tune AI models on the content",
    group("*", [`Content-Signal: search=${yn(search)}, ai-input=${yn(aiInput)}, ai-train=${yn(aiTrain)}`, "Allow: /", "Disallow: /tools/"]),
    ...SEARCH_AND_ANSWER_BOTS.map((ua) => group(ua, ["Allow: /", "Disallow: /tools/"])),
    ...TRAINING_BOTS.map((ua) => group(ua, aiTrain ? ["Allow: /", "Disallow: /tools/"] : ["Disallow: /"])),
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
