import { MetadataRoute } from "next";
import { client } from "@/lib/sanity/client";
import { LANGS, SITE_URL, alternatesFor, withLang } from "@/lib/i18n/routing";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  // One entry per language, each carrying the full hreflang cluster, so a
  // crawler that finds /es also learns /en and /it are the same page.
  const localized = (
    path: string,
    priority: number,
    changeFrequency: "weekly" | "monthly",
    lastModified = new Date()
  ) =>
    LANGS.map((lang) => ({
      url: `${SITE_URL}${withLang(lang, path)}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages: alternatesFor(lang, path).languages },
    }));

  const staticPages = [
    ...localized("/", 1, "monthly"),
    ...localized("/work", 0.9, "weekly"),
    ...localized("/about", 0.8, "monthly"),
    ...localized("/capabilities", 0.8, "monthly"),
    ...localized("/contact", 0.7, "monthly"),
    ...localized("/thoughts", 0.6, "weekly"),
  ];

  // Project pages: Sanity holds EN/ES/IT text for each
  const projectPages = projects.flatMap((project: any) =>
    localized(`/work/${project.slug.current}`, 0.7, "monthly", new Date(project._updatedAt))
  );

  // Blog posts are written in English only; /es and /it copies canonicalize here
  const postPages = posts.map((post: any) => ({
    url: `${SITE_URL}/en/thoughts/${post.slug.current}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...projectPages, ...postPages];
}
