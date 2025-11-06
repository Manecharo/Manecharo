"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/lib/sanity/client";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import ProjectGallery from "@/components/ui/ProjectGallery";

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
  description_es?: any[];
  description_it?: any[];
  link?: string;
}

interface AdjacentProject {
  _id: string;
  title: string;
  title_es?: string;
  title_it?: string;
  slug: { current: string };
}

interface ProjectDetailClientProps {
  project: Project;
  prev: AdjacentProject | null;
  next: AdjacentProject | null;
}

const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <figure className="my-8">
          <div className="relative w-full shadow-lg">
            <Image
              src={urlFor(value).width(1200).url()}
              alt={value.alt || "Project image"}
              width={1200}
              height={800}
              className="w-full h-auto object-contain"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-sm text-charcoal/60 text-center">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    video: ({ value }: any) => {
      if (!value?.url) {
        return null;
      }

      const getEmbedUrl = (url: string) => {
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
          const videoId = url.includes('youtu.be')
            ? url.split('youtu.be/')[1]?.split('?')[0]
            : url.split('v=')[1]?.split('&')[0];
          return `https://www.youtube.com/embed/${videoId}`;
        }
        if (url.includes('vimeo.com')) {
          const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
          return `https://player.vimeo.com/video/${videoId}`;
        }
        return url;
      };

      return (
        <figure className="my-8">
          <div className="relative w-full aspect-video shadow-lg">
            <iframe
              src={getEmbedUrl(value.url)}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-sm text-charcoal/60 text-center">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
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

export default function ProjectDetailClient({ project, prev, next }: ProjectDetailClientProps) {
  const { language } = useLanguage();

  const localizedTitle = language === 'es' ? (project.title_es || project.title)
    : language === 'it' ? (project.title_it || project.title)
    : project.title;
  const localizedExcerpt = language === 'es' ? (project.excerpt_es || project.excerpt)
    : language === 'it' ? (project.excerpt_it || project.excerpt)
    : project.excerpt;
  const localizedDescription = language === 'es' ? (project.description_es || project.description)
    : language === 'it' ? (project.description_it || project.description)
    : project.description;

  const localizedPrevTitle = prev ? (
    language === 'es' ? (prev.title_es || prev.title)
      : language === 'it' ? (prev.title_it || prev.title)
      : prev.title
  ) : null;

  const localizedNextTitle = next ? (
    language === 'es' ? (next.title_es || next.title)
      : language === 'it' ? (next.title_it || next.title)
      : next.title
  ) : null;

  return (
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
                {localizedTitle}
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
              {localizedExcerpt && (
                <p className="text-base leading-relaxed text-charcoal/70 mb-6">
                  {localizedExcerpt}
                </p>
              )}
            </div>

            {/* Right: Main Image */}
            <div className="md:col-span-2">
              {project.mainImage && (
                <div className="relative aspect-[4/3] shadow-xl overflow-hidden">
                  <Image
                    src={urlFor(project.mainImage).width(1200).url()}
                    alt={project.mainImage.alt || localizedTitle}
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
        {localizedDescription && localizedDescription.length > 0 && (
          <section className="mb-16 max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <PortableText
                value={localizedDescription}
                components={portableTextComponents}
              />
            </div>
          </section>
        )}

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-display font-bold mb-8 text-center">Project Gallery</h2>
            <ProjectGallery images={project.gallery} />
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
                <div className="font-display text-lg">{localizedPrevTitle}</div>
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
                <div className="font-display text-lg">{localizedNextTitle}</div>
              </div>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </div>
    </article>
  );
}
