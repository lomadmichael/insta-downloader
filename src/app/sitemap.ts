import type { MetadataRoute } from "next";

const baseUrl = "https://instadownload.me";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${baseUrl}/ko`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          ko: `${baseUrl}/ko`,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          ko: `${baseUrl}/ko`,
          en: `${baseUrl}/en`,
        },
      },
    },
  ];
}
