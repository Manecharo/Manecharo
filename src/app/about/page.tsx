import Image from "next/image";
import PageTransition from "@/components/layout/PageTransition";
import {
  Lightbulb,
  Code,
  Palette,
  Users,
  Globe,
  Rocket,
} from "lucide-react";

export const metadata = {
  title: "About",
  description:
    "14 years solving complex problems through design. From Milan to Kuala Lumpur, from hydroponic gardens to digital democracies.",
};

const skills = [
  { icon: Lightbulb, title: "Strategic Thinking", description: "Systems-level problem solving" },
  { icon: Palette, title: "Design Excellence", description: "Pixel-perfect execution" },
  { icon: Code, title: "Technical Fluency", description: "Code-aware design" },
  { icon: Users, title: "User Research", description: "Deep empathy" },
  { icon: Globe, title: "Cross-Cultural", description: "8 countries, 4 languages" },
  { icon: Rocket, title: "Startup Mindset", description: "Scrappy & resourceful" },
];

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="min-h-screen py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="grid md:grid-cols-2 gap-12 mb-24 items-center">
            {/* Portrait */}
            <div className="relative aspect-[3/4] md:order-2 overflow-hidden shadow-xl">
              <Image
                src="/images/about/portrait.jpg"
                alt="Manuel Echavarria Romero"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Intro */}
            <div className="md:order-1">
              <div className="inline-block mb-4 px-4 py-2 bg-red/10 text-red text-sm font-display uppercase tracking-wider">
                About
              </div>
              <h1 className="text-h1 font-display mb-6 leading-tight">
                The Short <span className="text-navy">Version</span>
              </h1>
              <div className="space-y-4 text-body text-charcoal/80">
                <p>
                  I'm an industrial designer who stopped designing chairs and
                  started designing systems.
                </p>
                <p>
                  14 years ago, I left Colombia for Milan. Studied at IED and
                  Politecnico. Worked on furniture, yachts, appliances—the
                  classic industrial design path.
                </p>
                <p>
                  Then I realized the most interesting problems weren't
                  product-shaped. They were system-shaped. Service-shaped.
                  Software-shaped.
                </p>
                <p>
                  So I pivoted. Hard. Learned UX, UI, code, strategy. Built
                  hydroponic gardens for urban farmers. Designed voting systems
                  for local governments. Helped political campaigns connect with
                  young voters. Created 3D spaces for the metaverse.
                </p>
                <p>
                  Now I'm based in Kuala Lumpur, solving problems that don't fit
                  in neat categories. That's where I do my best work.
                </p>
              </div>
            </div>
          </div>

          {/* What I Do */}
          <section className="mb-24">
            <h2 className="text-h2 font-display mb-12 text-center">
              What I Actually Do
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={index}
                    className="bg-pure-white p-6 shadow-sm hover:shadow-lg transition-shadow"
                  >
                    <Icon className="w-10 h-10 text-gold mb-4" />
                    <h3 className="font-display text-xl mb-2">{skill.title}</h3>
                    <p className="text-charcoal/70">{skill.description}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Languages */}
          <section className="mb-24">
            <h2 className="text-h2 font-display mb-8 text-center">Languages</h2>
            <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { lang: "Spanish", level: "Native" },
                { lang: "English", level: "C1" },
                { lang: "Italian", level: "B2" },
                { lang: "French", level: "A1" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-display mb-2">{item.lang}</div>
                  <div className="text-sm text-charcoal/60">{item.level}</div>
                </div>
              ))}
            </div>
            <p className="text-center text-charcoal/60 mt-6 text-sm">
              + Turkish (beginner)
            </p>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-h2 font-display mb-12 text-center">
              Education & Learning
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  degree: "Master in Strategic Product Design",
                  school: "Politecnico di Milano",
                  year: "2009-2011",
                },
                {
                  degree: "Bachelor in Industrial Design",
                  school: "IED Milano",
                  year: "2006-2009",
                },
                {
                  degree: "AI & Machine Learning",
                  school: "MIT Online",
                  year: "2024",
                },
                {
                  degree: "Teaching & Learning",
                  school: "Harvard Online",
                  year: "2020",
                },
              ].map((edu, index) => (
                <div
                  key={index}
                  className="bg-pure-white p-6 shadow-sm border-l-4 border-gold"
                >
                  <h3 className="font-display text-lg mb-2">{edu.degree}</h3>
                  <p className="text-charcoal/70 mb-1">{edu.school}</p>
                  <p className="text-sm text-charcoal/50">{edu.year}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
}
