"use client";

import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Reveal } from "@/components/experience/Reveal";
import Magnetic from "@/components/experience/Magnetic";

/**
 * Las seis cifras del CV, en portada.
 *
 * Iban en el CV y no estaban en la web, que es donde el reclutador viene a
 * confirmarlas. Todas tienen fuente verificada; ninguna es una estimacion.
 * El texto vive en translations.ts -> proof, y el CV tambien: cada idioma
 * descarga su propio PDF (proof.cvFile), no el castellano para todos.
 */
export default function Proof() {
  const { t } = useLanguage();
  const { title, note, cv, cvFile, metrics } = t.proof;

  return (
    <section className="border-y border-bone/10 bg-charcoal px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto w-full max-w-[1800px]">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-gold md:w-16" aria-hidden />
            <h2 className="font-display text-label uppercase tracking-wide2 text-gold">
              {title}
            </h2>
          </div>
        </Reveal>

        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:mt-14 md:grid-cols-3 lg:grid-cols-5">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={0.06 * i}>
              <div className="border-t border-bone/15 pt-4">
                <dt className="font-display text-3xl font-bold leading-none tracking-tight text-bone md:text-4xl lg:text-5xl">
                  {m.value}
                </dt>
                <dd className="mt-3 text-xs leading-snug text-bone/55 lg:text-sm">
                  {m.label}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>

        <Reveal delay={0.4}>
          <div className="mt-12 flex flex-col items-start justify-between gap-6 md:mt-16 md:flex-row md:items-center">
            <p className="max-w-md text-sm leading-relaxed text-bone/55">
              {note}
            </p>
            <Magnetic>
              <Link
                href={cvFile}
                target="_blank"
                rel="noopener"
                data-cursor="view"
                className="group flex items-center gap-3 border border-bone/25 px-7 py-4 font-display text-sm font-bold uppercase tracking-wide2 text-bone transition-colors duration-300 hover:border-gold hover:text-gold"
              >
                {cv}
                <ArrowDown
                  size={16}
                  className="transition-transform duration-300 ease-out-expo group-hover:translate-y-1"
                />
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
