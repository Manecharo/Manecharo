"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { client, urlFor } from "@/lib/sanity/client";

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  year: number;
  role?: string;
  challenge?: string;
  tags: string[];
  images: any[];
}

const tagsList = [
  "All",
  "Product Design",
  "UX/UI Design",
  "Branding & Identity",
  "Social Impact",
  "Graphic Design",
  "3D Modeling & Rendering",
  "Strategy & Consulting",
  "Web Design",
  "Photography & Video",
  "Communication Strategy",
  "Technical Design",
  "Project Management",
];

export default function ProjectsGrid() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      // Return empty if Sanity not configured
      if (!client) {
        setProjects([]);
        setFilteredProjects([]);
        setLoading(false);
        return;
      }

      try {
        const data = await client.fetch(
          `*[_type == "project"] | order(order asc, year desc) {
            _id,
            title,
            slug,
            year,
            role,
            challenge,
            tags,
            images
          }`
        );
        setProjects(data);
        setFilteredProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter((project) => {
        const filterValue = activeFilter.toLowerCase().replace(/[&\s]/g, "-");
        return project.tags?.some((tag) =>
          tag.toLowerCase().includes(filterValue)
        );
      });
      setFilteredProjects(filtered);
    }
  }, [activeFilter, projects]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-body text-charcoal/60 mb-6">
          No projects yet. Add some via the admin panel.
        </p>
        <Link
          href="/update"
          className="inline-block px-6 py-3 bg-gold text-charcoal font-display uppercase tracking-wider transition-all duration-200 hover:scale-105"
        >
          Go to Admin Panel
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Filters */}
      <div className="mb-12 flex flex-wrap gap-3 justify-center">
        {tagsList.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveFilter(tag)}
            className={`px-4 py-2 text-sm font-display uppercase tracking-wider transition-all duration-200 ${
              activeFilter === tag
                ? "bg-gold text-charcoal"
                : "bg-pure-white text-charcoal hover:bg-charcoal hover:text-cream"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-body text-charcoal/60">
            No projects found for this filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Link
              key={project._id}
              href={`/work/${project.slug.current}`}
              className="group"
            >
              <article className="bg-pure-white shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                {/* Project Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  {project.images && project.images[0] ? (
                    <Image
                      src={urlFor(project.images[0]).width(600).url()}
                      alt={project.images[0].alt || project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-baseline justify-between mb-3">
                    <h3 className="text-xl font-display">{project.title}</h3>
                    <span className="text-sm text-charcoal/60 ml-4">
                      {project.year}
                    </span>
                  </div>

                  {project.challenge && (
                    <p className="text-sm text-charcoal/70 mb-4 line-clamp-2">
                      {project.challenge}
                    </p>
                  )}

                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.slice(0, 3).map((tag: string) => (
                        <span
                          key={tag}
                          className="text-xs uppercase tracking-wider text-charcoal/60 px-2 py-1 border border-charcoal/20"
                        >
                          {tag.replace(/-/g, " ")}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="text-xs text-charcoal/40">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
