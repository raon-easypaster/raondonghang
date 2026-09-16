import type { MetadataRoute } from "next";

const SITE_URL = "https://raondonghaeng.kr";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/bulletin`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/notice`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/gallery`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/logo`, changeFrequency: "yearly", priority: 0.5 },
  ];
}
