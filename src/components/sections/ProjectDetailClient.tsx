"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/lib/sanity/client";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import ProjectGallery from "@/components/ui/ProjectGallery";
import TextReveal from "@/components/experience/TextReveal";
import { Parallax, Reveal, Stagger } from "@/components/experience/Reveal";

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
        <figure className="my-10">
          <div className="relative w-full overflow-hidden">
            <Image
              src={urlFor(value).width(1200).url()}
              alt={value.alt || "Project image"}
              width={1200}
              height={800}
              className="h-auto w-full object-contain"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-bone/50">
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
        if (url.includes("youtube.com") || url.includes("youtu.be")) {
          const videoId = url.includes("youtu.be")
            ? url.split("youtu.be/")[1]?.split("?")[0]
            : url.split("v=")[1]?.split("&")[0];
          return `https://www.youtube.com/embed/${videoId}`;
        }
        if (url.includes("vimeo.com")) {
          const videoId = url.split("vimeo.com/")[1]?.split("?")[0];
          return `https://player.vimeo.com/video/${videoId}`;
        }
        return url;
      };

      return (
        <figure className="my-10">
          <div className="relative aspect-video w-full">
            <iframe
              src={getEmbedUrl(value.url)}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-bone/50">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="mb-6 mt-14 font-display text-3xl font-bold tracking-tightest text-bone">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="mb-4 mt-10 font-display text-2xl font-bold tracking-tightest text-bone">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="mb-6 text-lg leading-relaxed text-bone/75">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="mb-6 list-inside list-disc space-y-2 text-bone/75 marker:text-gold">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="mb-6 list-inside list-decimal space-y-2 text-bone/75 marker:text-gold">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-bone">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ value, children }: any) => {
      const href = value.href || "";

      // Check if the link is a YouTube or Vimeo video
      const isYouTube = href.includes("youtube.com") || href.includes("youtu.be");
      const isVimeo = href.includes("vimeo.com");

      if (isYouTube || isVimeo) {
        let embedUrl = href;
        if (isYouTube) {
          const videoId = href.includes("youtu.be")
            ? href.split("youtu.be/")[1]?.split("?")[0]
            : href.split("v=")[1]?.split("&")[0];
          embedUrl = `https://www.youtube.com/embed/${videoId}`;
        } else if (isVimeo) {
          const videoId = href.split("vimeo.com/")[1]?.split("?")[0];
          embedUrl = `https://player.vimeo.com/video/${videoId}`;
        }

        return (
          <figure className="my-10">
            <div className="relative aspect-video w-full">
              <iframe
                src={embedUrl}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </figure>
        );
      }

      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold underline decoration-gold/40 underline-offset-4 transition-colors hover:text-bone"
        >
          {children}
        </a>
      );
    },
  },
};

export default function ProjectDetailClient({
  project,
  prev,
  next,
}: ProjectDetailClientProps) {
  const { t, language } = useLanguage();

  const localizedTitle =
    language === "es"
      ? project.title_es || project.title
      : language === "it"
        ? project.title_it || project.title
        : project.title;
  const localizedExcerpt =
    language === "es"
      ? project.excerpt_es || project.excerpt
      : language === "it"
        ? project.excerpt_it || project.excerpt
        : project.excerpt;
  const localizedDescription =
    language === "es"
      ? project.description_es || project.description
      : language === "it"
        ? project.description_it || project.description
        : project.description;

  const localizedPrevTitle = prev
    ? language === "es"
      ? prev.title_es || prev.title
      : language === "it"
        ? prev.title_it || prev.title
        : prev.title
    : null;

  const localizedNextTitle = next
    ? language === "es"
      ? next.title_es || next.title
      : language === "it"
        ? next.title_it || next.title
        : next.title
    : null;

  return (
    <article className="min-h-screen bg-charcoal pb-20 pt-28 text-bone md:pt-32">
      <div className="px-6 md:px-12">
        {/* Back to Work */}
        <Link
          href="/work"
          className="group mb-8 inline-flex items-center gap-2 text-bone/60 transition-colors hover:text-gold"
        >
          <ArrowLeft
            size={18}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          <span className="font-display text-xs font-bold uppercase tracking-wide2">
            {t.xp.back}
          </span>
        </Link>

        {/* Title */}
        <header className="mb-10 md:mb-14">
          <TextReveal
            text={localizedTitle}
            as="h1"
            className="max-w-6xl font-display text-display font-bold uppercase leading-[0.95] tracking-tightest text-bone"
          />
        </header>
      </div>

      {/* Cinematic hero image */}
      {project.mainImage && (
        <Parallax
          speed={9}
          className="relative mb-12 h-[52vh] w-full md:mb-16 md:h-[72vh]"
          innerClassName="absolute -inset-y-[12%] inset-x-0"
        >
          <Image
            src={urlFor(project.mainImage).width(2000).url()}
            alt={project.mainImage.alt || localizedTitle}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-charcoal/30"
          />
        </Parallax>
      )}

      <div className="px-6 md:px-12">
        {/* Meta strip */}
        <Stagger
          selector="[data-meta]"
          className="mb-14 grid grid-cols-2 gap-px border border-bone/10 bg-bone/10 md:mb-20 md:grid-cols-4"
        >
          {project.client && (
            <div data-meta className="bg-charcoal p-5 md:p-7">
              <div className="mb-2 font-display text-label uppercase tracking-wide2 text-bone/45">
                {t.xp.client}
              </div>
              <div className="font-display text-lg font-bold text-bone">
                {project.client}
              </div>
            </div>
          )}
          {project.year && (
            <div data-meta className="bg-charcoal p-5 md:p-7">
              <div className="mb-2 font-display text-label uppercase tracking-wide2 text-bone/45">
                {t.xp.year}
              </div>
              <div className="font-display text-lg font-bold text-bone">
                {project.year}
              </div>
            </div>
          )}
          {project.services && project.services.length > 0 && (
            <div data-meta className="bg-charcoal p-5 md:p-7">
              <div className="mb-2 font-display text-label uppercase tracking-wide2 text-bone/45">
                {t.xp.services}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.services.map((service) => (
                  <span
                    key={service}
                    className="border border-bone/15 px-2 py-1 text-[10px] uppercase tracking-wider text-bone/60"
                  >
                    {service.replace(/-/g, " ")}
                  </span>
                ))}
              </div>
            </div>
          )}
          {project.link && (
            <div data-meta className="bg-charcoal p-5 md:p-7">
              <div className="mb-2 font-display text-label uppercase tracking-wide2 text-bone/45">
                Link
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="open"
                className="group inline-flex items-center gap-2 font-display text-lg font-bold text-gold transition-colors hover:text-bone"
              >
                {t.xp.visit}
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          )}
        </Stagger>

        {/* Lede */}
        {localizedExcerpt && (
          <Reveal className="mb-16 md:mb-24">
            <p className="max-w-3xl font-display text-xl leading-snug text-bone/85 md:text-3xl">
              {localizedExcerpt}
            </p>
          </Reveal>
        )}

        {/* Description Content */}
        {localizedDescription && localizedDescription.length > 0 && (
          <section className="mx-auto mb-16 max-w-4xl md:mb-24">
            <PortableText
              value={localizedDescription}
              components={portableTextComponents}
            />
          </section>
        )}

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="mb-16 md:mb-24">
            <Reveal>
              <h2 className="mb-8 font-display text-h2 font-bold uppercase tracking-tightest text-bone md:mb-12">
                {t.xp.gallery}
              </h2>
            </Reveal>
            <ProjectGallery images={project.gallery} />
          </section>
        )}

        {/* Prev / Next */}
        <nav className="grid grid-cols-1 gap-px border border-bone/10 bg-bone/10 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/work/${prev.slug.current}`}
              data-cursor="view"
              className="group bg-charcoal p-7 transition-colors duration-300 hover:bg-coal-700 md:p-10"
            >
              <div className="mb-3 flex items-center gap-2 font-display text-label uppercase tracking-wide2 text-bone/45">
                <ArrowLeft
                  size={14}
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                />
                {t.xp.prevProject}
              </div>
              <div className="font-display text-2xl font-bold uppercase tracking-tightest text-bone transition-colors group-hover:text-gold md:text-3xl">
                {localizedPrevTitle}
              </div>
            </Link>
          ) : (
            <div className="bg-charcoal" />
          )}

          {next ? (
            <Link
              href={`/work/${next.slug.current}`}
              data-cursor="view"
              className="group bg-charcoal p-7 text-right transition-colors duration-300 hover:bg-coal-700 md:p-10"
            >
              <div className="mb-3 flex items-center justify-end gap-2 font-display text-label uppercase tracking-wide2 text-bone/45">
                {t.xp.nextProject}
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>
              <div className="font-display text-2xl font-bold uppercase tracking-tightest text-bone transition-colors group-hover:text-gold md:text-3xl">
                {localizedNextTitle}
              </div>
            </Link>
          ) : (
            <div className="bg-charcoal" />
          )}
        </nav>
      </div>
    </article>
  );
}
