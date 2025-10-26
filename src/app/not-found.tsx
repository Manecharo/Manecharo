"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ArrowLeft } from "lucide-react";

// Famous designer quotes about design
const designerQuotes = {
  en: [
    {
      quote: "Luxury is the manifestation of uncivil wealth that wants to impress those who have remained poor. It is the manifestation of the importance given to exteriority and reveals the lack of interest in everything that is cultural elevation. It is the triumph of appearance over substance.",
      author: "Bruno Munari",
      work: "Il Lusso"
    },
    {
      quote: "Good design is as little design as possible.",
      author: "Dieter Rams",
      work: "Ten Principles for Good Design"
    },
    {
      quote: "Design is not just what it looks like and feels like. Design is how it works.",
      author: "Steve Jobs",
      work: ""
    },
    {
      quote: "Simplicity is the ultimate sophistication.",
      author: "Leonardo da Vinci",
      work: ""
    },
    {
      quote: "Everything is designed. Few things are designed well.",
      author: "Brian Reed",
      work: ""
    },
    {
      quote: "Design creates culture. Culture shapes values. Values determine the future.",
      author: "Robert L. Peters",
      work: ""
    },
    {
      quote: "To design is much more than simply to assemble, to order, or even to edit; it is to add value and meaning, to illuminate, to simplify, to clarify, to modify, to dignify, to dramatize, to persuade, and perhaps even to amuse.",
      author: "Paul Rand",
      work: ""
    },
    {
      quote: "Design is a plan for arranging elements in such a way as best to accomplish a particular purpose.",
      author: "Charles Eames",
      work: ""
    },
    {
      quote: "The details are not the details. They make the design.",
      author: "Charles Eames",
      work: ""
    },
    {
      quote: "Design is thinking made visual.",
      author: "Saul Bass",
      work: ""
    }
  ],
  es: [
    {
      quote: "El lujo es la manifestación de la riqueza incivil que quiere impresionar a quien ha quedado pobre. Es la manifestación de la importancia que se da a la exterioridad y revela la falta de interés por todo lo que es elevación cultural. Es el triunfo de la apariencia sobre la sustancia.",
      author: "Bruno Munari",
      work: "Il Lusso"
    },
    {
      quote: "El buen diseño es tan poco diseño como sea posible.",
      author: "Dieter Rams",
      work: "Diez Principios del Buen Diseño"
    },
    {
      quote: "El diseño no es solo cómo se ve y cómo se siente. El diseño es cómo funciona.",
      author: "Steve Jobs",
      work: ""
    },
    {
      quote: "La simplicidad es la máxima sofisticación.",
      author: "Leonardo da Vinci",
      work: ""
    },
    {
      quote: "Todo está diseñado. Pocas cosas están bien diseñadas.",
      author: "Brian Reed",
      work: ""
    },
    {
      quote: "El diseño crea cultura. La cultura moldea valores. Los valores determinan el futuro.",
      author: "Robert L. Peters",
      work: ""
    },
    {
      quote: "Diseñar es mucho más que simplemente ensamblar, ordenar o incluso editar; es agregar valor y significado, iluminar, simplificar, aclarar, modificar, dignificar, dramatizar, persuadir y quizás incluso divertir.",
      author: "Paul Rand",
      work: ""
    },
    {
      quote: "El diseño es un plan para organizar elementos de tal manera que se logre mejor un propósito particular.",
      author: "Charles Eames",
      work: ""
    },
    {
      quote: "Los detalles no son los detalles. Ellos hacen el diseño.",
      author: "Charles Eames",
      work: ""
    },
    {
      quote: "El diseño es pensamiento hecho visual.",
      author: "Saul Bass",
      work: ""
    }
  ],
  it: [
    {
      quote: "Il lusso è la manifestazione della ricchezza incivile che vuole impressionare chi è rimasto povero. È la manifestazione dell'importanza che viene data all'esteriorità e rivela la mancanza di interesse per tutto ciò che è elevazione culturale. È il trionfo dell'apparenza sulla sostanza.",
      author: "Bruno Munari",
      work: "Il Lusso"
    },
    {
      quote: "Il buon design è il minor design possibile.",
      author: "Dieter Rams",
      work: "Dieci Principi del Buon Design"
    },
    {
      quote: "Il design non è solo come appare e come si sente. Il design è come funziona.",
      author: "Steve Jobs",
      work: ""
    },
    {
      quote: "La semplicità è la massima sofisticazione.",
      author: "Leonardo da Vinci",
      work: ""
    },
    {
      quote: "Tutto è progettato. Poche cose sono progettate bene.",
      author: "Brian Reed",
      work: ""
    },
    {
      quote: "Il design crea cultura. La cultura plasma i valori. I valori determinano il futuro.",
      author: "Robert L. Peters",
      work: ""
    },
    {
      quote: "Progettare è molto più che semplicemente assemblare, ordinare o persino modificare; è aggiungere valore e significato, illuminare, semplificare, chiarificare, modificare, dignificare, drammatizzare, persuadere e forse anche divertire.",
      author: "Paul Rand",
      work: ""
    },
    {
      quote: "Il design è un piano per organizzare elementi in modo tale da realizzare al meglio uno scopo particolare.",
      author: "Charles Eames",
      work: ""
    },
    {
      quote: "I dettagli non sono i dettagli. Sono loro a fare il design.",
      author: "Charles Eames",
      work: ""
    },
    {
      quote: "Il design è pensiero reso visivo.",
      author: "Saul Bass",
      work: ""
    }
  ]
};

const messages = {
  en: {
    title: "404",
    subtitle: "Page Not Found",
    message: "This page doesn't exist, got moved, or I haven't built it yet.",
    excuse: "My apologies for the inconvenience.",
    home: "Back to Home"
  },
  es: {
    title: "404",
    subtitle: "Página No Encontrada",
    message: "Esta página no existe, se movió, o aún no la he construido.",
    excuse: "Mis disculpas por el inconveniente.",
    home: "Volver al Inicio"
  },
  it: {
    title: "404",
    subtitle: "Pagina Non Trovata",
    message: "Questa pagina non esiste, è stata spostata, o non l'ho ancora costruita.",
    excuse: "Le mie scuse per l'inconveniente.",
    home: "Torna alla Home"
  }
};

export default function NotFound() {
  const { language } = useLanguage();
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    // Randomly select a quote on mount
    const randomIndex = Math.floor(Math.random() * designerQuotes[language as keyof typeof designerQuotes].length);
    setQuoteIndex(randomIndex);
  }, [language]);

  const currentMessages = messages[language as keyof typeof messages] || messages.en;
  const currentQuote = designerQuotes[language as keyof typeof designerQuotes][quoteIndex];

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-cream">
      <div className="max-w-4xl w-full">
        {/* 404 Section */}
        <div className="text-center mb-16">
          <h1 className="text-[200px] md:text-[300px] font-display font-bold text-charcoal/10 leading-none">
            {currentMessages.title}
          </h1>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-charcoal mb-6 -mt-20">
            {currentMessages.subtitle}
          </h2>
          <p className="text-xl text-charcoal/80 mb-4">
            {currentMessages.message}
          </p>
          <p className="text-lg text-charcoal/60 italic mb-12">
            {currentMessages.excuse}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-navy text-white font-display uppercase tracking-wider hover:bg-gold hover:text-charcoal transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft size={20} />
            {currentMessages.home}
          </Link>
        </div>

        {/* Designer Quote */}
        <div className="border-t-4 border-gold pt-12">
          <blockquote className="text-center">
            <p className="text-lg md:text-xl text-charcoal/90 leading-relaxed mb-6 font-serif italic">
              &ldquo;{currentQuote.quote}&rdquo;
            </p>
            <footer className="font-display text-charcoal">
              <cite className="not-italic font-bold text-navy">
                — {currentQuote.author}
              </cite>
              {currentQuote.work && (
                <div className="text-sm text-charcoal/60 mt-1">
                  {currentQuote.work}
                </div>
              )}
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
