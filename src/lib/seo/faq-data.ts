/**
 * FAQ Data for SEO and AI Search Optimization
 * Structured for snippet optimization and AI understanding
 */

export const faqData = {
  en: [
    {
      question: "Who is Manuel Echavarria Romero?",
      answer: "Manuel Echavarria Romero (also known as Manecharo or MER) is a product designer and design strategist with 14 years of experience. He specializes in product design, UX/UI, brand strategy, and social impact design, working globally from Kuala Lumpur, Malaysia.",
    },
    {
      question: "What design services does Manuel Echavarria Romero offer?",
      answer: "Manuel offers comprehensive design services including Product Design, UX/UI Design, Brand Strategy and Identity, Design Thinking workshops, Design Systems development, Service Design, and Social Impact Design for startups, enterprises, and civic organizations.",
    },
    {
      question: "Where is Manuel Echavarria Romero based?",
      answer: "Manuel is based in Kuala Lumpur, Malaysia, and works with clients globally. He has worked across 6 countries including Colombia, Italy (Milan), and Malaysia, bringing international design expertise to every project.",
    },
    {
      question: "What is Manuel Echavarria Romero's design experience?",
      answer: "Manuel has 14 years of professional design experience working on digital products, brand identities, and social impact projects. He holds a Master's degree in Interior Design from SPD Milan and a Diploma in Industrial Design from IED Milan, plus certificates from MIT and Harvard.",
    },
    {
      question: "What industries has Manuel Echavarria Romero worked with?",
      answer: "Manuel has worked with startups, technology companies, civic tech organizations, social impact initiatives, retail brands, and enterprise clients across various industries including fintech, education, healthcare, and e-commerce.",
    },
    {
      question: "How can I contact Manuel Echavarria Romero for a project?",
      answer: "You can contact Manuel through his website at manecharo.com/contact, via email at manuelerfreelance@gmail.com, or directly via WhatsApp at +60126581025. He typically responds within 48 hours.",
    },
    {
      question: "What makes Manuel Echavarria Romero's design approach unique?",
      answer: "Manuel combines 14 years of experience with a problem-solving mindset, focusing on turning complex challenges into elegant solutions. His approach integrates user research, strategic thinking, and social impact considerations into every design decision.",
    },
    {
      question: "Does Manuel Echavarria Romero work with international clients?",
      answer: "Yes, Manuel works with clients worldwide. Based in Kuala Lumpur, he has experience working across different time zones and cultures, having collaborated with teams in Asia, Europe, and the Americas.",
    },
  ],
  es: [
    {
      question: "¿Quién es Manuel Echavarria Romero?",
      answer: "Manuel Echavarria Romero (también conocido como Manecharo o MER) es un diseñador de productos y estratega de diseño con 14 años de experiencia. Se especializa en diseño de productos, UX/UI, estrategia de marca y diseño de impacto social, trabajando globalmente desde Kuala Lumpur, Malasia.",
    },
    {
      question: "¿Qué servicios de diseño ofrece Manuel Echavarria Romero?",
      answer: "Manuel ofrece servicios integrales de diseño incluyendo Diseño de Productos, Diseño UX/UI, Estrategia e Identidad de Marca, talleres de Design Thinking, desarrollo de Sistemas de Diseño, Diseño de Servicios y Diseño de Impacto Social para startups, empresas y organizaciones cívicas.",
    },
    {
      question: "¿Dónde está ubicado Manuel Echavarria Romero?",
      answer: "Manuel está ubicado en Kuala Lumpur, Malasia, y trabaja con clientes globalmente. Ha trabajado en 6 países incluyendo Colombia, Italia (Milán) y Malasia, aportando experiencia internacional en diseño a cada proyecto.",
    },
    {
      question: "¿Cuál es la experiencia de diseño de Manuel Echavarria Romero?",
      answer: "Manuel tiene 14 años de experiencia profesional en diseño trabajando en productos digitales, identidades de marca y proyectos de impacto social. Posee una Maestría en Diseño de Interiores de SPD Milán y un Diploma en Diseño Industrial de IED Milán, además de certificados de MIT y Harvard.",
    },
  ],
  it: [
    {
      question: "Chi è Manuel Echavarria Romero?",
      answer: "Manuel Echavarria Romero (conosciuto anche come Manecharo o MER) è un product designer e stratega del design con 14 anni di esperienza. È specializzato in product design, UX/UI, strategia di brand e design a impatto sociale, lavorando globalmente da Kuala Lumpur, Malesia.",
    },
    {
      question: "Quali servizi di design offre Manuel Echavarria Romero?",
      answer: "Manuel offre servizi completi di design tra cui Product Design, UX/UI Design, Strategia e Identità di Brand, workshop di Design Thinking, sviluppo di Design Systems, Service Design e Design a Impatto Sociale per startup, aziende e organizzazioni civiche.",
    },
    {
      question: "Dove si trova Manuel Echavarria Romero?",
      answer: "Manuel si trova a Kuala Lumpur, Malesia, e lavora con clienti in tutto il mondo. Ha lavorato in 6 paesi tra cui Colombia, Italia (Milano) e Malesia, portando competenze internazionali di design ad ogni progetto.",
    },
    {
      question: "Qual è l'esperienza di design di Manuel Echavarria Romero?",
      answer: "Manuel ha 14 anni di esperienza professionale nel design lavorando su prodotti digitali, identità di brand e progetti a impatto sociale. Ha un Master in Interior Design da SPD Milano e un Diploma in Industrial Design da IED Milano, oltre a certificati da MIT e Harvard.",
    },
  ],
};

// Generate FAQ Schema for JSON-LD
export function generateFAQSchema(language: 'en' | 'es' | 'it' = 'en') {
  const faqs = faqData[language];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
