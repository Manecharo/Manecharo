import { client } from "@/lib/sanity/client";
import PageTransition from "@/components/layout/PageTransition";
import WorkExperience, { WorkProject } from "@/components/work/WorkExperience";

// Match the freshness of the old client-side fetch: render on demand
// so newly published projects appear immediately.
export const dynamic = "force-dynamic";

async function getProjects(): Promise<WorkProject[]> {
  if (!client) {
    return [];
  }
  try {
    return await client.fetch(
      `*[_type == "project" && defined(publishedAt)] | order(order asc, year desc) {
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
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <PageTransition>
      <WorkExperience initialProjects={projects} />
    </PageTransition>
  );
}
