import Link from "next/link";

export default function ThoughtsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      {/* Unique Blog Logo - Top Left */}
      <Link
        href="/thoughts"
        className="fixed top-6 left-6 z-50 group"
        aria-label="Go to thoughts home"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 border-4 border-charcoal bg-white flex items-center justify-center rotate-45 group-hover:bg-charcoal transition-colors duration-200">
            <span className="text-2xl font-mono font-bold -rotate-45 group-hover:text-white">
              M
            </span>
          </div>
          <div className="font-mono text-xs uppercase tracking-wider border-2 border-charcoal px-2 py-1 bg-white group-hover:bg-charcoal group-hover:text-white transition-colors duration-200">
            Field Notes
          </div>
        </div>
      </Link>

      {/* Exit to Main Site - Top Right */}
      <Link
        href="/"
        className="fixed top-6 right-6 z-50 font-mono text-sm uppercase tracking-wider border-2 border-charcoal px-4 py-2 bg-white hover:bg-charcoal hover:text-white transition-colors duration-200"
        aria-label="Return to main site"
      >
        ← Exit
      </Link>

      {/* Content */}
      {children}
    </div>
  );
}
