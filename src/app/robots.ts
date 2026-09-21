import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/notice/edit/",
    },
    sitemap: "https://raondonghaeng.org/sitemap.xml",
    host: "https://raondonghaeng.org",
  };
}
