"use client";

import PageTransition from "@/components/layout/PageTransition";
import ContactForm from "@/components/sections/ContactForm";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import FormattedText from "@/components/ui/FormattedText";
import TextReveal from "@/components/experience/TextReveal";
import Marquee from "@/components/experience/Marquee";
import { Reveal, Stagger } from "@/components/experience/Reveal";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  MessageCircle,
} from "lucide-react";

export default function ContactPage() {
  const { t } = useLanguage();
  return (
    <PageTransition>
      <div className="min-h-screen overflow-hidden bg-charcoal pt-32 text-bone md:pt-40">
        <div className="px-6 md:px-12">
          {/* Header */}
          <header className="mb-16 md:mb-24">
            <Reveal>
              <p className="mb-5 font-display text-label uppercase tracking-wide2 text-gold">
                {t.contact.email} · WhatsApp · {t.contact.locationValue}
              </p>
            </Reveal>
            <TextReveal
              text={t.contact.title}
              as="h1"
              className="mb-8 max-w-5xl font-display text-display font-bold uppercase leading-[0.95] tracking-tightest text-bone"
            />
            <Reveal delay={0.25}>
              <p className="max-w-2xl whitespace-pre-line text-base leading-relaxed text-bone/65 [&_strong]:font-semibold [&_strong]:text-bone md:text-lg">
                <FormattedText text={t.contact.intro} />
              </p>
            </Reveal>
          </header>

          <div className="grid gap-14 pb-24 md:grid-cols-12 md:gap-12 md:pb-32">
            {/* Contact Info */}
            <Stagger
              selector="[data-info]"
              className="space-y-9 md:col-span-5 lg:col-span-4"
            >
              <a
                data-info
                href="mailto:manuelerfreelance@gmail.com"
                className="group flex items-start gap-4 border-t border-bone/10 pt-6 transition-colors"
              >
                <Mail className="mt-1 h-5 w-5 flex-shrink-0 text-gold" />
                <div>
                  <div className="mb-1 font-display text-label uppercase tracking-wide2 text-bone/45">
                    {t.contact.email}
                  </div>
                  <div className="u-sweep text-bone transition-colors group-hover:text-gold">
                    manuelerfreelance@gmail.com
                  </div>
                </div>
              </a>

              <a
                data-info
                href="tel:+60126581025"
                className="group flex items-start gap-4 border-t border-bone/10 pt-6"
              >
                <Phone className="mt-1 h-5 w-5 flex-shrink-0 text-gold" />
                <div>
                  <div className="mb-1 font-display text-label uppercase tracking-wide2 text-bone/45">
                    {t.contact.phone}
                  </div>
                  <div className="u-sweep text-bone transition-colors group-hover:text-gold">
                    +60 12 658 1025
                  </div>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                data-info
                href="https://wa.me/60126581025?text=Hi%20Manuel%2C%20I%27d%20like%20to%20discuss%20a%20project%20with%20you."
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="open"
                className="flex items-center gap-4 bg-gold px-6 py-5 text-charcoal transition-colors duration-300 hover:bg-bone"
              >
                <MessageCircle className="h-6 w-6 flex-shrink-0" />
                <div className="text-left">
                  <div className="font-display text-base font-bold uppercase tracking-wide2">
                    WhatsApp
                  </div>
                  <div className="text-sm text-charcoal/70">Message directly</div>
                </div>
              </a>

              <div data-info className="flex items-start gap-4 border-t border-bone/10 pt-6">
                <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-gold" />
                <div>
                  <div className="mb-1 font-display text-label uppercase tracking-wide2 text-bone/45">
                    {t.contact.location}
                  </div>
                  <div className="text-bone">{t.contact.locationValue}</div>
                  <div className="mt-1 text-sm text-bone/45">
                    {t.contact.workingGlobally}
                  </div>
                </div>
              </div>

              <div data-info className="border-t border-bone/10 pt-6">
                <div className="mb-3 font-display text-label uppercase tracking-wide2 text-bone/45">
                  Follow
                </div>
                <div className="flex gap-3">
                  <a
                    href="https://instagram.com/Manecharo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center border border-bone/15 text-bone/70 transition-colors duration-300 hover:border-gold hover:text-gold"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="https://linkedin.com/in/mer101"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center border border-bone/15 text-bone/70 transition-colors duration-300 hover:border-gold hover:text-gold"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>

              <div data-info className="border-t border-bone/10 pt-6">
                <h3 className="mb-2 font-display text-label uppercase tracking-wide2 text-bone/45">
                  {t.contact.responseTime}
                </h3>
                <p className="text-sm leading-relaxed text-bone/65 [&_strong]:font-semibold [&_strong]:text-gold">
                  <FormattedText text={t.contact.responseTimeValue} />
                </p>
              </div>
            </Stagger>

            {/* Contact Form */}
            <Reveal delay={0.2} className="md:col-span-7 lg:col-span-8">
              <ContactForm />
            </Reveal>
          </div>
        </div>

        {/* Giant email marquee */}
        <a
          href="mailto:manuelerfreelance@gmail.com"
          aria-label="Email Manuel"
          className="group block border-t border-bone/10 py-8 md:py-10"
          data-cursor="open"
        >
          <Marquee duration={24}>
            <span className="mx-6 flex items-center gap-12 font-display text-5xl font-bold uppercase tracking-tightest md:text-7xl">
              <span className="text-stroke transition-colors duration-300 group-hover:text-gold group-hover:[-webkit-text-fill-color:#eec84e]">
                manuelerfreelance@gmail.com
              </span>
              <span aria-hidden className="text-3xl text-gold md:text-4xl">
                ✦
              </span>
            </span>
          </Marquee>
        </a>
      </div>
    </PageTransition>
  );
}
