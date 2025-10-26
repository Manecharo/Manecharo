import Link from "next/link";
import Image from "next/image";
import { client, urlFor } from "@/lib/sanity/client";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  postType?: "writing" | "video" | "audio";
  mainImage?: any;
  publishedAt: string;
  body?: any[];
}

async function getPosts(): Promise<Post[]> {
  if (!client) {
    console.warn("Sanity client not configured");
    return [];
  }

  try {
    const posts = await client.fetch(
      `*[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {
        _id,
        title,
        slug,
        mainImage,
        publishedAt,
        body
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

      <div className="max-w-full mx-auto px-4 md:px-8 pb-16">
        {posts.length === 0 ? (
          <div className="text-center border-4 border-charcoal p-12 bg-white max-w-2xl mx-auto">
            <p className="font-mono text-charcoal mb-6 text-xl">
              NO POSTS YET. CHECK BACK SOON.
            </p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
            {posts.map((post, index) => {
              // Random rotations and sizes for brutalist effect
              const rotations = ['-2deg', '-1deg', '0deg', '1deg', '2deg', '-1.5deg', '1.5deg'];
              const rotation = rotations[index % rotations.length];
              const sizes = ['aspect-square', 'aspect-[4/5]', 'aspect-[3/4]', 'aspect-[5/6]'];
              const sizeClass = sizes[index % sizes.length];

              return (
                <Link
                  key={post._id}
                  href={`/thoughts/${post.slug.current}`}
                  className="block group break-inside-avoid"
                  style={{
                    transform: `rotate(${rotation})`,
                  }}
                >
                  <article className="border-4 border-charcoal bg-white hover:shadow-[6px_6px_0px_0px_rgba(10,10,10,1)] hover:scale-[1.02] transition-all duration-200 overflow-hidden">
                    {/* Image */}
                    <div className={`relative ${sizeClass} overflow-hidden border-b-4 border-charcoal`}>
                      {post.mainImage ? (
                        <Image
                          src={urlFor(post.mainImage).width(600).url()}
                          alt={post.title}
                          fill
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-light flex items-center justify-center">
                          <span className="font-mono text-charcoal/20 text-3xl md:text-5xl font-bold rotate-12">
                            [?]
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4 md:p-6">
                      {/* Badge */}
                      <div className="mb-3">
                        <span className="inline-block border-2 border-charcoal px-3 py-1 font-mono text-[10px] font-bold uppercase bg-white">
                          [WRITING]
                        </span>
                      </div>

                      <h2 className="font-mono text-lg md:text-xl font-bold mb-2 leading-tight group-hover:underline decoration-2 underline-offset-2">
                        {post.title}
                      </h2>

                      <time className="block font-mono text-[10px] uppercase mb-3 text-charcoal/60 tracking-wider">
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>

                      {post.body && (
                        <p className="font-mono text-xs leading-relaxed text-charcoal/80 line-clamp-3">
                          {getExcerpt(post.body)}
                        </p>
                      )}
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
