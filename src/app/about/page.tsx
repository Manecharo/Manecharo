"use client";

import Image from "next/image";
import PageTransition from "@/components/layout/PageTransition";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import FormattedText from "@/components/ui/FormattedText";
import {
  Lightbulb,
  Code,
  Palette,
  Users,
  Globe,
  Rocket,
} from "lucide-react";

const skills = [
  { icon: Lightbulb, title: "Strategic Thinking", description: "Systems-level problem solving" },
  { icon: Palette, title: "Design Excellence", description: "Pixel-perfect execution" },
  { icon: Code, title: "Technical Fluency", description: "Code-aware design" },
  { icon: Users, title: "User Research", description: "Deep empathy" },
  { icon: Globe, title: "Cross-Cultural", description: "6 countries, 4 languages" },
  { icon: Rocket, title: "Startup Mindset", description: "Scrappy & resourceful" },
];

export default function AboutPage() {
  const { t } = useLanguage();
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
                {t.about.title}
              </h1>
              <div className="space-y-4 text-body text-charcoal/80 whitespace-pre-line">
                <p><FormattedText text={t.about.bio} /></p>
              </div>
            </div>
          </div>

          {/* What I Do */}
          <section className="mb-24">
            <h2 className="text-h2 font-display mb-12 text-center">
              {t.about.whatIDo}
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
            <h2 className="text-h2 font-display mb-8 text-center">{t.about.languages}</h2>
            <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { lang: "Spanish", level: "Native" },
                { lang: "English", level: "C1" },
                { lang: "Italian", level: "B2" },
                { lang: "French", level: "A2" },
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
              {t.about.education}
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  degree: "Master's Degree — Dual specialization interior industrial-design",
                  school: "Scuola Politecnica di Design (SPD)",
                  year: "2009-2010",
                  link: "https://www.scuoladesign.com/courses/product-design/",
                },
                {
                  degree: "Bachelor in Industrial Design",
                  school: "Istituto Europeo di Design (IED)",
                  year: "2006-2009",
                  link: "https://www.ied.edu/courses/milan/three-years-diploma/product-design",
                },
                {
                  degree: "No Code AI and Machine Learning: Building Data Science Solutions",
                  school: "MIT Professional Education",
                  year: "2024",
                  link: "https://mit-online.getsmarter.com/presentations/lp/mit-sloan-making-ai-work-online-course/",
                },
                {
                  degree: "Higher Education Teaching Certificate",
                  school: "Harvard Derek Bok Center",
                  year: "2020",
                  link: "https://harvardonline.harvard.edu/course/higher-education-teaching",
                },
              ].map((edu, index) => (
                <a
                  key={index}
                  href={edu.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pure-white p-6 shadow-sm border-l-4 border-gold hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                >
                  <h3 className="font-display text-lg mb-2">{edu.degree}</h3>
                  <p className="text-charcoal/70 mb-1">{edu.school}</p>
                  <p className="text-sm text-charcoal/50">{edu.year}</p>
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
}
