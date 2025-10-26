import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { client, urlFor } from "@/lib/sanity/client";
import { Twitter, Linkedin, Copy, Check } from "lucide-react";
import ShareButtons from "@/components/ui/ShareButtons";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  postType: "writing" | "video" | "audio";
  featuredImage?: any;
  content?: any[];
  videoUrl?: string;
  audioFile?: any;
  tags?: string[];
  publishedAt: string;
}

async function getPost(slug: string): Promise<Post | null> {
  if (!client) {
    console.warn("Sanity client not configured");
    return null;
  }

  try {
    const post = await client.fetch(
      `*[_type == "post" && slug.current == $slug && published == true][0] {
        _id,
        title,
        slug,
        postType,
        featuredImage,
        content,
        videoUrl,
        audioFile,
        tags,
        publishedAt
      }`,
      { slug }
    );
    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: `${post.postType.toUpperCase()} post by Manuel Echavarria Romero`,
  };
}

const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="relative aspect-video my-8 border-4 border-charcoal">
        <Image
          src={urlFor(value).width(1200).url()}
          alt={value.alt || "Post image"}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
      </div>
    ),
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="font-mono text-3xl font-bold mt-12 mb-4 leading-tight">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-mono text-2xl font-bold mt-8 mb-3 leading-tight">{children}</h3>
    ),
    normal: ({ children }: any) => (
      <p className="font-mono text-lg leading-relaxed mb-6">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-charcoal pl-6 my-8 italic text-charcoal/80">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-6 space-y-2 font-mono">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-6 space-y-2 font-mono">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="bg-gray-light border border-charcoal px-2 py-1 font-mono text-sm">
        {children}
      </code>
    ),
    link: ({ value, children }: any) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-2 underline-offset-2 hover:text-gold transition-colors"
      >
        {children}
      </a>
    ),
  },
};

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white pt-24">
      <article className="max-w-4xl mx-auto px-6 pb-16">
        {/* Badge */}
        <div className="mb-6">
          <span className="inline-block border-2 border-charcoal px-4 py-2 font-mono text-xs font-bold uppercase bg-white">
            [{post.postType}]
          </span>
        </div>

        {/* Title */}
        <h1 className="font-mono text-4xl md:text-6xl font-bold mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Date */}
        <time className="block font-mono text-sm uppercase mb-8 text-charcoal/60 tracking-wider">
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="relative aspect-[2/1] mb-12 border-4 border-charcoal">
            <Image
              src={urlFor(post.featuredImage).width(1200).url()}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </div>
        )}

        {/* Content based on type */}
        {post.postType === "writing" && post.content && (
          <div className="prose-brutal">
            <PortableText
              value={post.content}
              components={portableTextComponents}
            />
          </div>
        )}

        {post.postType === "video" && post.videoUrl && (
          <div className="mb-12">
            <div className="relative aspect-video border-4 border-charcoal">
              <iframe
                src={post.videoUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {post.postType === "audio" && post.audioFile && (
          <div className="mb-12 border-4 border-charcoal p-6">
            <audio controls className="w-full">
              <source src={post.audioFile.asset.url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-3 my-12 pt-12 border-t-4 border-charcoal">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="border-2 border-charcoal px-4 py-2 font-mono text-xs uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Share Buttons */}
        <div className="pt-12 border-t-4 border-charcoal">
          <h3 className="font-mono text-sm uppercase mb-4 tracking-wider">SHARE THIS:</h3>
          <ShareButtons title={post.title} slug={post.slug.current} />
        </div>
      </article>
    </div>
  );
}
