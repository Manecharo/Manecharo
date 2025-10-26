"use client";

import PageTransition from "@/components/layout/PageTransition";
import ContactForm from "@/components/sections/ContactForm";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import FormattedText from "@/components/ui/FormattedText";
import { Mail, Phone, MapPin, Instagram, Linkedin } from "lucide-react";

export default function ContactPage() {
  const { t } = useLanguage();
  return (
    <PageTransition>
      <div className="min-h-screen py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <header className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-navy/10 text-navy text-sm font-display uppercase tracking-wider">
              Get in Touch
            </div>
            <h1 className="text-h1 font-display mb-6 leading-tight">
              {t.contact.title}
            </h1>
            <p className="text-xl text-charcoal/80 max-w-2xl mx-auto leading-relaxed whitespace-pre-line">
              <FormattedText text={t.contact.intro} />
            </p>
          </header>

          <div className="grid md:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="md:col-span-2 space-y-8">
              <div>
                <h2 className="font-display text-xl mb-6">Get in Touch</h2>

                <div className="space-y-4">
                  <a
                    href="mailto:manuelerfreelance@gmail.com"
                    className="flex items-start gap-3 text-charcoal hover:text-gold transition-colors group"
                  >
                    <Mail className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-charcoal/60 mb-1">{t.contact.email}</div>
                      <div className="group-hover:underline">
                        manuelerfreelance@gmail.com
                      </div>
                    </div>
                  </a>

                  <a
                    href="tel:+60126581025"
                    className="flex items-start gap-3 text-charcoal hover:text-gold transition-colors group"
                  >
                    <Phone className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-charcoal/60 mb-1">{t.contact.phone}</div>
                      <div className="group-hover:underline">
                        +60 12 658 1025
                      </div>
                    </div>
                  </a>

                  <div className="flex items-start gap-3 text-charcoal">
                    <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-charcoal/60 mb-1">
                        {t.contact.location}
                      </div>
                      <div>{t.contact.locationValue}</div>
                      <div className="text-sm text-charcoal/60 mt-1">
                        {t.contact.workingGlobally}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-display text-xl mb-4">Follow</h3>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com/Manecharo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-pure-white hover:bg-gold transition-colors group"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-6 h-6 text-charcoal" />
                  </a>
                  <a
                    href="https://linkedin.com/in/mer101"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-pure-white hover:bg-gold transition-colors group"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-6 h-6 text-charcoal" />
                  </a>
                </div>
              </div>

              <div className="pt-8 border-t border-charcoal/20">
                <h3 className="font-display text-xl mb-3">{t.contact.responseTime}</h3>
                <p className="text-charcoal/70">
                  <FormattedText text={t.contact.responseTimeValue} />
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
