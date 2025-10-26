"use client";

import { useState } from "react";
import { Twitter, Linkedin, Copy, Check } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const url = `https://manecharo.com/thoughts/${slug}`;

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      title
    )}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, "_blank", "width=550,height=420");
  };

  const shareToLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`;
    window.open(linkedInUrl, "_blank", "width=550,height=420");
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={shareToTwitter}
        className="border-[3px] border-brutal-border px-4 py-3 font-mono text-sm uppercase bg-brutal-bg hover:bg-brutal-border hover:text-brutal-bg transition-colors flex items-center gap-2"
        aria-label="Share on Twitter"
      >
        <Twitter size={18} />
        TWITTER
      </button>

      <button
        onClick={shareToLinkedIn}
        className="border-[3px] border-brutal-border px-4 py-3 font-mono text-sm uppercase bg-brutal-bg hover:bg-brutal-border hover:text-brutal-bg transition-colors flex items-center gap-2"
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={18} />
        LINKEDIN
      </button>

      <button
        onClick={copyLink}
        className="border-[3px] border-brutal-border px-4 py-3 font-mono text-sm uppercase bg-brutal-bg hover:bg-brutal-border hover:text-brutal-bg transition-colors flex items-center gap-2"
        aria-label="Copy link"
      >
        {copied ? (
          <>
            <Check size={18} />
            COPIED!
          </>
        ) : (
          <>
            <Copy size={18} />
            COPY LINK
          </>
        )}
      </button>
    </div>
  );
}
