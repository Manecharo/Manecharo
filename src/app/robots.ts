import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/update", "/studio", "/api"],
      },
      // Specific rules for AI crawlers
      {
        userAgent: "GPTBot", // OpenAI's web crawler
        allow: "/",
        disallow: ["/update", "/studio", "/api"],
      },
      {
        userAgent: "ChatGPT-User", // ChatGPT user agent
        allow: "/",
      },
      {
        userAgent: "CCBot", // Common Crawl (used by many AI models)
        allow: "/",
      },
      {
        userAgent: "anthropic-ai", // Claude crawler
        allow: "/",
      },
      {
        userAgent: "Claude-Web", // Claude web crawler
        allow: "/",
      },
      {
        userAgent: "PerplexityBot", // Perplexity AI
        allow: "/",
      },
      {
        userAgent: "Bingbot", // Microsoft Bing (includes Bing Chat)
        allow: "/",
      },
      {
        userAgent: "Googlebot", // Google (includes SGE)
        allow: "/",
      },
    ],
    sitemap: "https://manecharo.com/sitemap.xml",
    host: "https://manecharo.com",
  };
}
