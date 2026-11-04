import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";

export const dynamic = "force-static";

// Search engines AND generative/answer engines are explicitly welcome (GEO): being cited by AI assistants is a goal.
const AI_AND_SEARCH_BOTS = [
  "Googlebot", "Bingbot", "Applebot",
  "GPTBot", "OAI-SearchBot", "ChatGPT-User", // OpenAI
  "ClaudeBot", "Claude-SearchBot", "Claude-User", "anthropic-ai", // Anthropic
  "PerplexityBot", "Perplexity-User", // Perplexity
  "Google-Extended", "Applebot-Extended", // Gemini / Apple Intelligence training controls
  "Meta-ExternalAgent", "Amazonbot", "DuckAssistBot", "MistralAI-User", "YouBot", "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/tools/"] },
      ...AI_AND_SEARCH_BOTS.map((userAgent) => ({ userAgent, allow: "/", disallow: ["/tools/"] })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
