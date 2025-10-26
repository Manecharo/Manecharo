import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { FileText, Image, Edit, Settings } from "lucide-react";

export default async function UpdateDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  const cards = [
    {
      title: "Manage Projects",
      description: "Add, edit, or remove portfolio projects",
      href: "/update/projects",
      icon: FileText,
      color: "bg-gold",
    },
    {
      title: "Manage Blog Posts",
      description: "Create and publish blog content",
      href: "/update/blog",
      icon: Edit,
      color: "bg-terracotta",
    },
    {
      title: "Edit Page Content",
      description: "Update text on landing, about, and other pages",
      href: "/update/content",
      icon: Settings,
      color: "bg-sage",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-display mb-2">Admin Dashboard</h1>
          <p className="text-charcoal/60">
            Welcome back, {session.user?.name || "Manuel"}
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Link
                key={index}
                href={card.href}
                className="block bg-pure-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div
                  className={`w-16 h-16 ${card.color} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-display mb-3">{card.title}</h2>
                <p className="text-charcoal/70">{card.description}</p>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 bg-pure-white p-6 shadow-sm">
          <h2 className="text-xl font-display mb-4">Quick Links</h2>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/"
              className="px-4 py-2 border-2 border-charcoal/20 hover:border-gold hover:text-gold transition-colors"
            >
              View Site
            </Link>
            <Link
              href="/api/auth/signout"
              className="px-4 py-2 border-2 border-charcoal/20 hover:border-terracotta hover:text-terracotta transition-colors"
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
