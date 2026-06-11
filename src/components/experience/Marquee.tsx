import { CSSProperties, ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full loop. */
  duration?: number;
  reverse?: boolean;
  className?: string;
}

/** Infinite horizontal marquee. Content is duplicated for a seamless loop. */
export default function Marquee({
  children,
  duration = 28,
  reverse = false,
  className = "",
}: MarqueeProps) {
  return (
    <div
      className={`overflow-hidden ${reverse ? "marquee-reverse" : ""} ${className}`}
    >
      <div
        className="marquee-track"
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
