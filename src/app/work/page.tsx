import ProjectsGrid from "@/components/sections/ProjectsGrid";
import PageTransition from "@/components/layout/PageTransition";

export const metadata = {
  title: "Selected Work",
  description:
    "Product design. Brand identities. Civic tech. Urban agriculture. Political campaigns. Metaverse spaces.",
};

export default function WorkPage() {
  return (
    <PageTransition>
      <div className="min-h-screen py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-20 text-center max-w-4xl mx-auto">
            <div className="inline-block mb-4 px-4 py-2 bg-navy/10 text-navy text-sm font-display uppercase tracking-wider">
              Portfolio
            </div>
            <h1 className="text-h1 font-display mb-8 leading-tight">
              Selected <span className="text-navy">Projects</span>
            </h1>
            <p className="text-xl text-charcoal/80 leading-relaxed mb-6">
              Product design • Brand identities • Civic tech • Urban agriculture
              <br />
              Political campaigns • Metaverse spaces • System design
            </p>
            <p className="text-lg text-red font-display">
              I don&apos;t do one thing—I solve problems that matter.
            </p>
          </header>

          {/* Projects Grid with Filters */}
          <ProjectsGrid />
        </div>
      </div>
    </PageTransition>
  );
}
