import { notFound } from "next/navigation";
import { client } from "@/lib/sanity/client";
import PageTransition from "@/components/layout/PageTransition";
import ProjectDetailClient from "@/components/sections/ProjectDetailClient";

interface Project {
  _id: string;
  title: string;
  title_es?: string;
  title_it?: string;
  slug: { current: string };
  excerpt?: string;
  excerpt_es?: string;
  excerpt_it?: string;
  mainImage?: any;
  gallery?: any[];
  client?: string;
  year?: number;
  services?: string[];
  description?: any[];
  link?: string;
}

async function getProject(slug: string): Promise<Project | null> {
  if (!client) {
    console.warn("Sanity client not configured");
    return null;
  }

  try {
    const project = await client.fetch(
      `*[_type == "project" && slug.current == $slug][0] {
        _id,
        title,
        title_es,
        title_it,
        slug,
        excerpt,
        excerpt_es,
        excerpt_it,
        mainImage,
        gallery,
        client,
        year,
        services,
        description,
        link
      }`,
      { slug }
    );
    return project;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

async function getAdjacentProjects(currentId: string) {
  if (!client) {
    console.warn("Sanity client not configured");
    return { prev: null, next: null };
  }

  try {
    const projects = await client.fetch(
      `*[_type == "project" && defined(publishedAt)] | order(order asc, year desc) {
        _id,
        title,
        title_es,
        title_it,
        slug
      }`
    );

    const currentIndex = projects.findIndex((p: any) => p._id === currentId);
    const prev = currentIndex > 0 ? projects[currentIndex - 1] : null;
    const next =
      currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

    return { prev, next };
  } catch (error) {
    console.error("Error fetching adjacent projects:", error);
    return { prev: null, next: null };
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProject(params.slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title}${project.year ? ` (${project.year})` : ''}`,
    description: project.excerpt || project.title,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  const { prev, next } = await getAdjacentProjects(project._id);

  return (
    <PageTransition>
      <ProjectDetailClient project={project} prev={prev} next={next} />
    </PageTransition>
  );
}
