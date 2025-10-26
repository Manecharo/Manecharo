import { MetadataRoute } from "next";
import { client } from "@/lib/sanity/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://manecharo.com";

  let projects: any[] = [];
  let posts: any[] = [];

  // Only fetch if Sanity is configured
  if (client) {
    try {
      // Fetch all projects
      projects = await client.fetch(
        `*[_type == "project"] { slug, _updatedAt }`
      );

      // Fetch all published posts
      posts = await client.fetch(
        `*[_type == "post" && published == true] { slug, publishedAt }`
      );
    } catch (error) {
      console.error("Error fetching content for sitemap:", error);
    }
  }

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/capabilities`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/thoughts`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
  ];

  // Project pages
  const projectPages = projects.map((project: any) => ({
    url: `${baseUrl}/work/${project.slug.current}`,
    lastModified: new Date(project._updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Blog posts
  const postPages = posts.map((post: any) => ({
    url: `${baseUrl}/thoughts/${post.slug.current}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...projectPages, ...postPages];
}
