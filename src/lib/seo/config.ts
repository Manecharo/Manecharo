/**
 * SEO Configuration for Manuel Echavarria Romero Portfolio
 * Optimized for traditional search engines and AI-powered search (Google SGE, Bing Chat, Perplexity, etc.)
 */

export const seoConfig = {
  // Base site information
  siteUrl: 'https://manecharo.com',
  siteName: 'Manuel Echavarria Romero',

  // Person information for Schema.org
  person: {
    '@type': 'Person',
    name: 'Manuel Echavarria Romero',
    alternateName: ['Manuel Echavarria', 'MER', 'Manecharo'],
    jobTitle: 'Product Designer & Design Strategist',
    description: 'Designer and problem solver with 14 years of experience turning complex problems into elegant solutions. Specialized in product design, UX/UI, brand strategy, and social impact design.',

    url: 'https://manecharo.com',
    image: 'https://manecharo.com/images/manuel-echavarria-romero.jpg',

    // Contact information
    email: 'manuelerfreelance@gmail.com',
    telephone: '+60126581025',

    // Location
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kuala Lumpur',
      addressCountry: 'MY',
    },

    // Work location
    workLocation: {
      '@type': 'Place',
      name: 'Kuala Lumpur',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kuala Lumpur',
        addressCountry: 'Malaysia',
      },
    },

    // Languages spoken
    knowsLanguage: [
      {
        '@type': 'Language',
        name: 'English',
        alternateName: 'en',
      },
      {
        '@type': 'Language',
        name: 'Spanish',
        alternateName: 'es',
      },
      {
        '@type': 'Language',
        name: 'Italian',
        alternateName: 'it',
      },
    ],

    // Skills and expertise
    knowsAbout: [
      'Product Design',
      'UX Design',
      'UI Design',
      'User Experience',
      'User Interface',
      'Design Strategy',
      'Brand Design',
      'Brand Identity',
      'Brand Strategy',
      'Design Thinking',
      'Design Systems',
      'Interaction Design',
      'Service Design',
      'Social Impact Design',
      'Civic Technology',
      'Design for Good',
      'Startup Design',
      'Digital Product Design',
      'Mobile Design',
      'Web Design',
      'Design Leadership',
    ],

    // Social profiles
    sameAs: [
      'https://www.linkedin.com/in/mer101',
      'https://www.instagram.com/Manecharo',
    ],

    // Education
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'Scuola Politecnica di Design (SPD)',
        location: 'Milan, Italy',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'Istituto Europeo di Design (IED)',
        location: 'Milan, Italy',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'MIT Professional Education',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'Harvard Derek Bok Center',
      },
    ],

    // Professional credentials
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: "Master's Degree — Specialization Interior Design",
        credentialCategory: "Master's Degree",
        educationalLevel: 'Graduate',
        recognizedBy: {
          '@type': 'EducationalOrganization',
          name: 'Scuola Politecnica di Design (SPD)',
        },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Diploma in Industrial Design',
        credentialCategory: 'Diploma',
        recognizedBy: {
          '@type': 'EducationalOrganization',
          name: 'Istituto Europeo di Design (IED)',
        },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'No Code AI and Machine Learning: Building Data Science Solutions',
        credentialCategory: 'Certificate',
        recognizedBy: {
          '@type': 'EducationalOrganization',
          name: 'MIT Professional Education',
        },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Higher Education Teaching Certificate',
        credentialCategory: 'Certificate',
        recognizedBy: {
          '@type': 'EducationalOrganization',
          name: 'Harvard Derek Bok Center',
        },
      },
    ],
  },

  // Multilingual content
  languages: {
    default: 'en',
    supported: ['en', 'es', 'it'],
    locales: {
      en: 'en_US',
      es: 'es_ES',
      it: 'it_IT',
    },
  },

  // SEO metadata by language
  metadata: {
    en: {
      title: 'Manuel Echavarria Romero | Product Designer & Design Strategist',
      description: 'Designer and problem solver based in Kuala Lumpur with 14 years of experience. Specialized in product design, UX/UI, brand strategy, and social impact design. Working globally across 6 countries.',
      keywords: [
        'Manuel Echavarria Romero',
        'Manecharo',
        'Product Designer',
        'UX Designer',
        'UI Designer',
        'Design Strategist',
        'Brand Designer',
        'Kuala Lumpur Designer',
        'Product Design',
        'User Experience Design',
        'User Interface Design',
        'UX/UI Design',
        'Brand Strategy',
        'Brand Identity',
        'Design Thinking',
        'Social Impact Design',
        'Civic Tech Design',
        'Startup Design',
        'Design Leadership',
        'Digital Product Design',
      ],
    },
    es: {
      title: 'Manuel Echavarria Romero | Diseñador de Productos y Estratega de Diseño',
      description: 'Diseñador y solucionador de problemas con sede en Kuala Lumpur con 14 años de experiencia. Especializado en diseño de productos, UX/UI, estrategia de marca y diseño de impacto social. Trabajando globalmente en 6 países.',
      keywords: [
        'Manuel Echavarria Romero',
        'Manecharo',
        'Diseñador de Productos',
        'Diseñador UX',
        'Diseñador UI',
        'Estratega de Diseño',
        'Diseñador de Marca',
        'Diseñador Kuala Lumpur',
        'Diseño de Productos',
        'Diseño de Experiencia de Usuario',
        'Diseño de Interfaz de Usuario',
        'Diseño UX/UI',
        'Estrategia de Marca',
        'Identidad de Marca',
        'Design Thinking',
        'Diseño de Impacto Social',
        'Diseño Cívico',
        'Diseño para Startups',
        'Liderazgo en Diseño',
        'Diseño de Productos Digitales',
      ],
    },
    it: {
      title: 'Manuel Echavarria Romero | Product Designer e Stratega del Design',
      description: 'Designer e risolutore di problemi con sede a Kuala Lumpur con 14 anni di esperienza. Specializzato in product design, UX/UI, strategia di brand e design a impatto sociale. Lavoro globale in 6 paesi.',
      keywords: [
        'Manuel Echavarria Romero',
        'Manecharo',
        'Product Designer',
        'UX Designer',
        'UI Designer',
        'Stratega del Design',
        'Brand Designer',
        'Designer Kuala Lumpur',
        'Product Design',
        'User Experience Design',
        'User Interface Design',
        'Design UX/UI',
        'Strategia di Brand',
        'Identità di Brand',
        'Design Thinking',
        'Design a Impatto Sociale',
        'Design Civico',
        'Design per Startup',
        'Leadership nel Design',
        'Design di Prodotti Digitali',
      ],
    },
  },

  // Structured data for different page types
  structuredData: {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Manuel Echavarria Romero Design',
      alternateName: ['Manecharo Design', 'MER Design'],
      url: 'https://manecharo.com',
      logo: 'https://manecharo.com/images/logo.png',
      image: 'https://manecharo.com/images/manuel-echavarria-romero.jpg',
      description: 'Professional design services specializing in product design, UX/UI, and brand strategy.',
      founder: {
        '@type': 'Person',
        name: 'Manuel Echavarria Romero',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kuala Lumpur',
        addressCountry: 'MY',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '3.139',
        longitude: '101.687',
      },
      areaServed: 'Worldwide',
      priceRange: '$$$$',
      telephone: '+60126581025',
      email: 'manuelerfreelance@gmail.com',
      sameAs: [
        'https://www.linkedin.com/in/mer101',
        'https://www.instagram.com/Manecharo',
      ],
    },
  },
};

// Helper function to generate hreflang links
export function getHrefLangLinks(pathname: string) {
  const baseUrl = seoConfig.siteUrl;

  return [
    { rel: 'alternate', hreflang: 'en', href: `${baseUrl}/en${pathname}` },
    { rel: 'alternate', hreflang: 'es', href: `${baseUrl}/es${pathname}` },
    { rel: 'alternate', hreflang: 'it', href: `${baseUrl}/it${pathname}` },
    { rel: 'alternate', hreflang: 'x-default', href: `${baseUrl}${pathname}` },
  ];
}

// Helper function to generate structured data JSON-LD
export function generateStructuredData(type: string, data?: any) {
  switch (type) {
    case 'person':
      return {
        '@context': 'https://schema.org',
        ...seoConfig.person,
      };

    case 'website':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: seoConfig.siteName,
        url: seoConfig.siteUrl,
        description: seoConfig.metadata.en.description,
        author: {
          '@type': 'Person',
          name: seoConfig.person.name,
        },
        inLanguage: ['en', 'es', 'it'],
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${seoConfig.siteUrl}/work?search={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      };

    case 'portfolio':
      return {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Portfolio - Manuel Echavarria Romero',
        url: `${seoConfig.siteUrl}/work`,
        description: 'Portfolio of design projects by Manuel Echavarria Romero',
        author: {
          '@type': 'Person',
          name: seoConfig.person.name,
        },
      };

    case 'project':
      if (!data) return null;
      return {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: data.title,
        description: data.excerpt,
        image: data.image,
        url: data.url,
        dateCreated: data.year,
        creator: {
          '@type': 'Person',
          name: seoConfig.person.name,
        },
        about: data.services,
      };

    case 'breadcrumb':
      if (!data) return null;
      return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: data.map((item: any, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      };

    default:
      return null;
  }
}
