export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "PerplexityBot",
          "Google-Extended",
          "Bingbot",
          "Googlebot",
          "Applebot",
        ],
        allow: "/",
      },
    ],
    sitemap: "https://www.sauravksingh.in/sitemap.xml",
    host: "https://www.sauravksingh.in",
  };
}