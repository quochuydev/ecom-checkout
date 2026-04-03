import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.APP_URL || "http://localhost:3333";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/*",
          "/api/*",
          "/login",
          "/register",
          "/account",
          "/checkout",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
