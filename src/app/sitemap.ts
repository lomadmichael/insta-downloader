import type { MetadataRoute } from "next";

const baseUrl = "https://instadownload.me";

const toolSlugs = [
  "tools",
  "tools/line-break",
  "tools/blank-space",
  "tools/fonts",
  "tools/character-counter",
  "tools/image-resizer",
  "tools/reels-thumbnail",
];

const howToSlugs = [
  "how-to",
  "how-to/download",
  "how-to/line-break",
  "how-to/blank-space",
  "how-to/fonts",
  "how-to/character-counter",
  "how-to/image-resizer",
  "how-to/reels-thumbnail",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
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

  const toolPages: MetadataRoute.Sitemap = toolSlugs.flatMap((slug) => [
    {
      url: `${baseUrl}/ko/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: slug === "tools" ? 0.8 : 0.7,
      alternates: {
        languages: {
          ko: `${baseUrl}/ko/${slug}`,
          en: `${baseUrl}/en/${slug}`,
        },
      },
    },
    {
      url: `${baseUrl}/en/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: slug === "tools" ? 0.8 : 0.7,
      alternates: {
        languages: {
          ko: `${baseUrl}/ko/${slug}`,
          en: `${baseUrl}/en/${slug}`,
        },
      },
    },
  ]);

  const howToPages: MetadataRoute.Sitemap = howToSlugs.flatMap((slug) => [
    {
      url: `${baseUrl}/ko/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: slug === "how-to" ? 0.8 : 0.6,
      alternates: {
        languages: {
          ko: `${baseUrl}/ko/${slug}`,
          en: `${baseUrl}/en/${slug}`,
        },
      },
    },
    {
      url: `${baseUrl}/en/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: slug === "how-to" ? 0.8 : 0.6,
      alternates: {
        languages: {
          ko: `${baseUrl}/ko/${slug}`,
          en: `${baseUrl}/en/${slug}`,
        },
      },
    },
  ]);

  return [...staticPages, ...toolPages, ...howToPages];
}
