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
    {
      url: `${baseUrl}/ko/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: {
          ko: `${baseUrl}/ko/privacy`,
          en: `${baseUrl}/en/privacy`,
        },
      },
    },
    {
      url: `${baseUrl}/en/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: {
          ko: `${baseUrl}/ko/privacy`,
          en: `${baseUrl}/en/privacy`,
        },
      },
    },
    {
      url: `${baseUrl}/ko/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: {
          ko: `${baseUrl}/ko/terms`,
          en: `${baseUrl}/en/terms`,
        },
      },
    },
    {
      url: `${baseUrl}/en/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: {
          ko: `${baseUrl}/ko/terms`,
          en: `${baseUrl}/en/terms`,
        },
      },
    },
  ];
}
