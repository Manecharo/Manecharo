import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { client, urlFor } from "@/lib/sanity/client";
import PageTransition from "@/components/layout/PageTransition";

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
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
        slug,
        excerpt,
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

const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="relative aspect-video my-8 shadow-lg">
        <Image
          src={urlFor(value).width(1200).url()}
          alt={value.alt || "Project image"}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
      </div>
    ),
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-display font-bold mt-12 mb-6">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-display font-bold mt-8 mb-4">{children}</h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-lg leading-relaxed mb-6 text-charcoal/80">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-6 space-y-2">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-6 space-y-2">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ value, children }: any) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gold underline hover:text-gold/80 transition-colors"
      >
        {children}
      </a>
    ),
  },
};

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
      <article className="min-h-screen py-16 md:py-24 px-4 md:px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
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

          {/* Hero Section */}
          <header className="mb-12 md:mb-16">
            <div className="grid md:grid-cols-3 gap-8 md:gap-12 items-start">
              {/* Left: Project Info */}
              <div className="md:col-span-1 md:sticky md:top-24">
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
                  {project.title}
                </h1>

                {/* Meta Info */}
                <div className="space-y-4 mb-8 text-sm">
                  {project.client && (
                    <div>
                      <div className="uppercase tracking-wider text-charcoal/60 font-display mb-1">
                        Client
                      </div>
                      <div className="text-charcoal font-medium">{project.client}</div>
                    </div>
                  )}

                  {project.year && (
                    <div>
                      <div className="uppercase tracking-wider text-charcoal/60 font-display mb-1">
                        Year
                      </div>
                      <div className="text-charcoal font-medium">{project.year}</div>
                    </div>
                  )}

                  {project.services && project.services.length > 0 && (
                    <div>
                      <div className="uppercase tracking-wider text-charcoal/60 font-display mb-2">
                        Services
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.services.map((service) => (
                          <span
                            key={service}
                            className="px-3 py-1 text-xs uppercase tracking-wider bg-pure-white border border-charcoal/20"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.link && (
                    <div>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors font-display"
                      >
                        <ExternalLink size={16} />
                        <span>Visit Project</span>
                      </a>
                    </div>
                  )}
                </div>

                {/* Excerpt */}
                {project.excerpt && (
                  <p className="text-base leading-relaxed text-charcoal/70 mb-6">
                    {project.excerpt}
                  </p>
                )}
              </div>

              {/* Right: Main Image */}
              <div className="md:col-span-2">
                {project.mainImage && (
                  <div className="relative aspect-[4/3] shadow-xl overflow-hidden">
                    <Image
                      src={urlFor(project.mainImage).width(1200).url()}
                      alt={project.mainImage.alt || project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 66vw"
                      priority
                    />
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Description Content */}
          {project.description && project.description.length > 0 && (
            <section className="mb-16 max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <PortableText
                  value={project.description}
                  components={portableTextComponents}
                />
              </div>
            </section>
          )}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <section className="mb-16">
              <h2 className="text-3xl font-display font-bold mb-8 text-center">Project Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.gallery.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-[4/3] shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                  >
                    <Image
                      src={urlFor(image).width(800).url()}
                      alt={image.alt || `${project.title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {image.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-charcoal/80 text-white p-3 text-sm">
                        {image.caption}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Navigation */}
          <nav className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-12 border-t border-charcoal/20">
            {prev ? (
              <Link
                href={`/work/${prev.slug.current}`}
                className="flex items-center gap-3 text-charcoal hover:text-gold transition-colors group"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-charcoal/60 mb-1">
                    Previous Project
                  </div>
                  <div className="font-display text-lg">{prev.title}</div>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {next ? (
              <Link
                href={`/work/${next.slug.current}`}
                className="flex items-center gap-3 text-charcoal hover:text-gold transition-colors text-right group"
              >
                <div>
                  <div className="text-xs uppercase tracking-wider text-charcoal/60 mb-1">
                    Next Project
                  </div>
                  <div className="font-display text-lg">{next.title}</div>
                </div>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
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
