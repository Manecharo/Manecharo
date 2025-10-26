import { client } from "@/lib/sanity/client";
import FeaturedProjectsClient from "./FeaturedProjectsClient";

interface Project {
  _id: string;
  title: string;
  title_es?: string;
  title_it?: string;
  slug: { current: string };
  year?: number;
  excerpt?: string;
  excerpt_es?: string;
  excerpt_it?: string;
  services?: string[];
  mainImage?: any;
}

async function getFeaturedProjects(): Promise<Project[]> {
  // Return empty array if Sanity not configured
  if (!client) {
    return [];
  }

  try {
    const projects = await client.fetch(
      `*[_type == "project" && featured == true && defined(publishedAt)] | order(order asc) [0...4] {
        _id,
        title,
        title_es,
        title_it,
        slug,
        year,
        excerpt,
        excerpt_es,
        excerpt_it,
        services,
        mainImage
      }`
    );
    return projects;
  } catch (error) {
    // Suppress dataset not found error - this is expected until Sanity is fully set up
    // console.error("Error fetching featured projects:", error);
    return [];
  }
}

export default async function FeaturedProjects() {
  const projects = await getFeaturedProjects();

  return <FeaturedProjectsClient projects={projects} />;
}
