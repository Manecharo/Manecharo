import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function ContentManagePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <Link
            href="/update"
            className="text-charcoal hover:text-gold mb-4 inline-block"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-display mb-2">Edit Page Content</h1>
        </header>

        <div className="bg-pure-white p-12 shadow-sm text-center">
          <h2 className="text-2xl font-display mb-4">Use Sanity Studio</h2>
          <p className="text-charcoal/70 mb-6 max-w-2xl mx-auto">
            Page content editing (landing page text, about page, capabilities,
            etc.) is managed through Sanity Studio for easy updates without
            touching code.
          </p>
          <a
            href={`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.sanity.studio`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-gold text-charcoal font-display uppercase tracking-wider hover:scale-105 transition-transform"
          >
            Open Sanity Studio
          </a>
          <p className="mt-6 text-sm text-charcoal/50">
            Alternatively, visit:{" "}
            <code className="bg-charcoal/10 px-2 py-1">
              https://{process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.sanity.studio
            </code>
          </p>
        </div>
      </div>
    </div>
  );
}
