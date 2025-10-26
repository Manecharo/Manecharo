import Link from "next/link";
import Image from "next/image";
import { client, urlFor } from "@/lib/sanity/client";

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  year: number;
  tags: string[];
  images: any[];
}

async function getFeaturedProjects(): Promise<Project[]> {
  // Return empty array if Sanity not configured
  if (!client) {
    return [];
  }

  try {
    const projects = await client.fetch(
      `*[_type == "project" && featured == true] | order(order asc) [0...4] {
        _id,
        title,
        slug,
        year,
        tags,
        images
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

  if (projects.length === 0) {
    return (
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-h1 font-display mb-8">Featured Projects</h2>
          <p className="text-body text-charcoal/60">
            Projects will appear here once added via the admin panel.
          </p>
          <Link
            href="/update"
            className="inline-block mt-6 px-6 py-3 bg-gold text-charcoal font-display uppercase tracking-wider transition-all duration-200 hover:scale-105"
          >
            Go to Admin Panel
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-h1 font-display mb-4">Selected Projects</h2>
          <p className="text-body text-charcoal/80">
            A few highlights from 14 years of problem-solving
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <Link
              key={project._id}
              href={`/work/${project.slug.current}`}
              className="group"
            >
              <article className="bg-pure-white shadow-sm hover:shadow-xl transition-all duration-300">
                {/* Project Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  {project.images && project.images[0] ? (
                    <Image
                      src={urlFor(project.images[0]).width(800).url()}
                      alt={project.images[0].alt || project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-charcoal/10 flex items-center justify-center">
                      <span className="text-charcoal/40 font-display">
                        No Image
                      </span>
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="flex items-baseline justify-between mb-3">
                    <h3 className="text-h2 font-display">{project.title}</h3>
                    <span className="text-sm text-charcoal/60 ml-4">
                      {project.year}
                    </span>
                  </div>

                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag: string) => (
                        <span
                          key={tag}
                          className="text-xs uppercase tracking-wider text-charcoal/60 px-3 py-1 border border-charcoal/20"
                        >
                          {tag.replace(/-/g, " ")}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/work"
            className="inline-block px-8 py-4 bg-charcoal text-cream font-display uppercase tracking-wider transition-all duration-200 hover:bg-gold hover:text-charcoal"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
