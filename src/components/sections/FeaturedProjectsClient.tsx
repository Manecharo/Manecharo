"use client";

import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/client";
import { useLanguage } from "@/lib/i18n/LanguageContext";

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

interface FeaturedProjectsClientProps {
  projects: Project[];
}

export default function FeaturedProjectsClient({ projects }: FeaturedProjectsClientProps) {
  const { language } = useLanguage();

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

        <div key={language} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project) => {
            const localizedTitle = language === 'es' ? (project.title_es || project.title)
              : language === 'it' ? (project.title_it || project.title)
              : project.title;
            const localizedExcerpt = language === 'es' ? (project.excerpt_es || project.excerpt)
              : language === 'it' ? (project.excerpt_it || project.excerpt)
              : project.excerpt;

            return (
              <Link
                key={project._id}
                href={`/work/${project.slug.current}`}
                className="group"
              >
                <article className="bg-pure-white shadow-sm hover:shadow-xl transition-all duration-300">
                  {/* Project Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {project.mainImage ? (
                      <Image
                        src={urlFor(project.mainImage).width(800).height(600).fit('crop').url()}
                        alt={project.mainImage.alt || localizedTitle}
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
                      <h3 className="text-h2 font-display">{localizedTitle}</h3>
                      {project.year && (
                        <span className="text-sm text-charcoal/60 ml-4">
                          {project.year}
                        </span>
                      )}
                    </div>

                    {localizedExcerpt && (
                      <p className="text-sm text-charcoal/70 mb-4 line-clamp-2">
                        {localizedExcerpt}
                      </p>
                    )}

                    {project.services && project.services.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.services.slice(0, 3).map((service: string) => (
                          <span
                            key={service}
                            className="text-xs uppercase tracking-wider text-charcoal/60 px-3 py-1 border border-charcoal/20"
                          >
                            {service.replace(/-/g, " ")}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              </Link>
            );
          })}
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
