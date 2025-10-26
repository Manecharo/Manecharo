import PageTransition from "@/components/layout/PageTransition";
import ContactForm from "@/components/sections/ContactForm";
import { Mail, Phone, MapPin, Instagram, Linkedin } from "lucide-react";

export const metadata = {
  title: "Contact",
  description:
    "Let's talk about your project. Based in Kuala Lumpur, working globally.",
};

export default function ContactPage() {
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
              Let's Work <span className="text-red">Together</span>
            </h1>
            <p className="text-xl text-charcoal/80 max-w-2xl mx-auto leading-relaxed">
              Have a project in mind? Need help solving a complex problem?
              <br />
              <span className="text-navy font-display">Let's talk.</span>
            </p>
            <p className="text-sm text-charcoal/60 mt-4">
              I typically respond within 48 hours.
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
                      <div className="text-sm text-charcoal/60 mb-1">Email</div>
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
                      <div className="text-sm text-charcoal/60 mb-1">Phone</div>
                      <div className="group-hover:underline">
                        +60 12 658 1025
                      </div>
                    </div>
                  </a>

                  <div className="flex items-start gap-3 text-charcoal">
                    <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-charcoal/60 mb-1">
                        Location
                      </div>
                      <div>Kuala Lumpur, Malaysia</div>
                      <div className="text-sm text-charcoal/60 mt-1">
                        (Working globally)
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-display text-xl mb-4">Follow</h3>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com/ManecharoDesign"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-pure-white hover:bg-gold transition-colors group"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-6 h-6 text-charcoal" />
                  </a>
                  <a
                    href="https://linkedin.com/in/ManecharoDesign"
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
                <h3 className="font-display text-xl mb-3">Response Time</h3>
                <p className="text-charcoal/70">
                  Typically within <strong>48 hours</strong>
                  <br />
                  (Weekends may take longer)
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
