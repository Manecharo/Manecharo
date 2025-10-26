import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { client, urlFor } from "@/lib/sanity/client";
import PageTransition from "@/components/layout/PageTransition";
import Lightbox from "@/components/ui/Lightbox";

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  year: number;
  role?: string;
  challenge?: string;
  approach?: string;
  results?: string[];
  tags: string[];
  images: any[];
}

async function getProject(slug: string): Promise<Project | null> {
  try {
    const project = await client.fetch(
      `*[_type == "project" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        year,
        role,
        challenge,
        approach,
        results,
        tags,
        images
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
  try {
    const projects = await client.fetch(
      `*[_type == "project"] | order(order asc, year desc) {
        _id,
        title,
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
    title: `${project.title} (${project.year})`,
    description: project.challenge || `${project.title} - ${project.role}`,
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
      <article className="min-h-screen py-24 px-6 bg-cream">
        <div className="max-w-5xl mx-auto">
          {/* Back to Work */}
          <Link
            href="/work"
            className="inline-flex items-center gap-2 mb-8 text-charcoal hover:text-gold transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-display uppercase tracking-wider text-sm">
              Back to Work
            </span>
          </Link>

          {/* Hero Image */}
          {project.images && project.images[0] && (
            <div className="relative aspect-[16/9] mb-12 overflow-hidden shadow-xl">
              <Image
                src={urlFor(project.images[0]).width(1920).url()}
                alt={project.images[0].alt || project.title}
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />
            </div>
          )}

          {/* Title & Meta */}
          <header className="mb-16">
            <div className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
              <h1 className="text-h1 font-display">{project.title}</h1>
              <span className="text-xl text-charcoal/60">{project.year}</span>
            </div>
            {project.role && (
              <p className="text-body text-charcoal/80 font-display">
                Role: {project.role}
              </p>
            )}
          </header>

          {/* Content Sections */}
          <div className="space-y-12 mb-16">
            {project.challenge && (
              <section>
                <h2 className="text-h2 font-display mb-4">The Challenge</h2>
                <p className="text-body text-charcoal/80 whitespace-pre-line">
                  {project.challenge}
                </p>
              </section>
            )}

            {project.approach && (
              <section>
                <h2 className="text-h2 font-display mb-4">What I Did</h2>
                <p className="text-body text-charcoal/80 whitespace-pre-line">
                  {project.approach}
                </p>
              </section>
            )}

            {project.results && project.results.length > 0 && (
              <section>
                <h2 className="text-h2 font-display mb-4">The Result</h2>
                <ul className="space-y-2">
                  {project.results.map((result, index) => (
                    <li
                      key={index}
                      className="text-body text-charcoal/80 flex items-start gap-3"
                    >
                      <span className="text-gold mt-1">→</span>
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-16">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 text-sm uppercase tracking-wider bg-pure-white border border-charcoal/20 text-charcoal"
                >
                  {tag.replace(/-/g, " ")}
                </span>
              ))}
            </div>
          )}

          {/* Gallery */}
          {project.images && project.images.length > 1 && (
            <section className="mb-16">
              <h2 className="text-h2 font-display mb-8">Gallery</h2>
              <Lightbox images={project.images} />
            </section>
          )}

          {/* Navigation */}
          <nav className="flex justify-between items-center pt-12 border-t border-charcoal/20">
            {prev ? (
              <Link
                href={`/work/${prev.slug.current}`}
                className="flex items-center gap-2 text-charcoal hover:text-gold transition-colors"
              >
                <ArrowLeft size={20} />
                <div>
                  <div className="text-xs uppercase tracking-wider text-charcoal/60">
                    Previous
                  </div>
                  <div className="font-display">{prev.title}</div>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {next ? (
              <Link
                href={`/work/${next.slug.current}`}
                className="flex items-center gap-2 text-charcoal hover:text-gold transition-colors text-right"
              >
                <div>
                  <div className="text-xs uppercase tracking-wider text-charcoal/60">
                    Next
                  </div>
                  <div className="font-display">{next.title}</div>
                </div>
                <ArrowRight size={20} />
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </div>
      </article>
    </PageTransition>
  );
}
