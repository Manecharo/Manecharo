import Link from "next/link";
import Image from "next/image";
import { client, urlFor } from "@/lib/sanity/client";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  postType: "writing" | "video" | "audio";
  featuredImage?: any;
  publishedAt: string;
  content?: any[];
}

async function getPosts(): Promise<Post[]> {
  if (!client) {
    console.warn("Sanity client not configured");
    return [];
  }

  try {
    const posts = await client.fetch(
      `*[_type == "post" && published == true] | order(publishedAt desc) {
        _id,
        title,
        slug,
        postType,
        featuredImage,
        publishedAt,
        content
      }`
    );
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

function getDefaultImage(index: number) {
  const images = [
    "/images/blog-default-1.jpg",
    "/images/blog-default-2.jpg",
    "/images/blog-default-3.jpg",
    "/images/blog-default-4.jpg",
    "/images/blog-default-5.jpg",
  ];
  return images[index % images.length];
}

function getExcerpt(content: any[]): string {
  if (!content || content.length === 0) return "";

  const firstTextBlock = content.find((block) => block._type === "block");
  if (!firstTextBlock) return "";

  const text = firstTextBlock.children
    ?.map((child: any) => child.text)
    .join(" ");
  return text ? text.slice(0, 100) + "..." : "";
}

export const metadata = {
  title: "Notes from the Field",
  description: "Thoughts on design, systems, and solving hard problems.",
};

export default async function ThoughtsPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Page Title */}
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <h1 className="font-mono text-5xl md:text-7xl font-bold uppercase mb-4 leading-none">
          NOTES
          <br />
          FROM THE
          <br />
          FIELD
        </h1>
        <p className="font-mono text-sm uppercase tracking-wider border-l-4 border-charcoal pl-4 mt-6">
          Thoughts on design, systems, and solving hard problems.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-16">
        {posts.length === 0 ? (
          <div className="text-center border-4 border-charcoal p-12 bg-white">
            <p className="font-mono text-charcoal mb-6 text-xl">
              NO POSTS YET. CHECK BACK SOON.
            </p>
          </div>
        ) : (
          <div className="grid gap-12">
            {posts.map((post, index) => (
              <Link
                key={post._id}
                href={`/thoughts/${post.slug.current}`}
                className="block group"
              >
                <article
                  className="border-4 border-charcoal p-8 bg-white hover:shadow-[8px_8px_0px_0px_rgba(10,10,10,1)] transition-all duration-200"
                  style={{
                    transform: `rotate(${index % 2 === 0 ? "-0.5deg" : "0.5deg"})`,
                  }}
                >
                  {/* Badge */}
                  <div className="mb-6">
                    <span className="inline-block border-2 border-charcoal px-4 py-2 font-mono text-xs font-bold uppercase bg-white">
                      [{post.postType}]
                    </span>
                  </div>

                  {/* Thumbnail */}
                  <div className="relative aspect-[2/1] mb-6 border-4 border-charcoal overflow-hidden">
                    {post.featuredImage ? (
                      <Image
                        src={urlFor(post.featuredImage).width(800).url()}
                        alt={post.title}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                        sizes="(max-width: 1280px) 100vw, 1280px"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-light flex items-center justify-center">
                        <span className="font-mono text-charcoal/30 text-4xl font-bold">
                          [{post.postType.toUpperCase()}]
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <h2 className="font-mono text-3xl font-bold mb-4 group-hover:underline decoration-4 underline-offset-4">
                    {post.title}
                  </h2>

                  <time className="block font-mono text-sm uppercase mb-4 text-charcoal/60 tracking-wider">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>

                  {post.content && (
                    <p className="font-mono text-base mb-6 text-charcoal/80 leading-relaxed">
                      {getExcerpt(post.content)}
                    </p>
                  )}

                  <div className="font-mono text-sm font-bold uppercase group-hover:translate-x-2 transition-transform inline-block">
                    READ →
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
