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
    '@id': 'https://manecharo.com/#person',
    name: 'Manuel Echavarria Romero',
    alternateName: ['Manuel Echavarria', 'MER', 'Manecharo'],
    jobTitle: 'Senior Product & Brand Innovation Designer',
    description: 'Senior product and brand innovation designer with 15 years of experience across 6 countries. Consumer products, retail and point of sale, brand experience, physical and digital. Co-founded three companies, one sold. Relocating to Spain, available from 1 November 2026.',

    url: 'https://manecharo.com',
    image: 'https://manecharo.com/images/about/manuel2.jpeg',

    // Occupation (for AI / answer engines)
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Senior Product & Brand Innovation Designer',
      occupationLocation: {
        '@type': 'Country',
        name: 'Spain',
      },
      skills:
        'Consumer Product Design, Retail and Point of Sale, Shopper and POP Systems, Brand Identity and Experience, Industrial Design, Design for Manufacturing, CMF, Prototyping, Cost Engineering, UX/UI Design, Design Systems, Design Leadership',
      responsibilities:
        'Designs consumer products, retail and point-of-sale systems, brand identities and digital products, from insight and concept through to manufacturing, distribution and launch. Leads design teams and in-house R&D.',
    },

    // Hint speech-enabled assistants which parts of the page to read aloud
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '[data-speakable]'],
    },

    // Contact information
    email: 'manuel_echavarria@hotmail.com',
    telephone: '+60126581025',

    // Location
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kuala Lumpur',
      addressCountry: 'MY',
    },

    // Donde va a trabajar. El domicilio de arriba sigue siendo Kuala Lumpur
    // porque hoy es verdad; esto es lo que el CV imprime como "Kuala Lumpur ->
    // Espana, disponible desde el 1 de noviembre de 2026".
    workLocation: {
      '@type': 'Country',
      name: 'Spain',
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
    // Encabeza el vocabulario del sector al que apunta: es lo que se teclea en
    // una busqueda y lo que mastican los buscadores con IA. Todo sale de la
    // seccion de capacidades del CV; nada inventado (en particular, packaging no).
    knowsAbout: [
      // consumo, retail y marca
      'Consumer Products',
      'Retail Design',
      'Point of Sale',
      'Shopper Marketing',
      'POP Systems',
      'Brand Identity',
      'Brand Experience',
      'Brand Strategy',
      'Consumer Research',
      // producto fisico
      'Industrial Design',
      'Product Design',
      'Design for Manufacturing',
      'CMF Design',
      'Prototyping',
      'Cost Engineering',
      // digital
      'UX Design',
      'UI Design',
      'Design Systems',
      'Digital Product Design',
      'AI-Assisted Workflows',
      // direccion y contexto
      'Design Leadership',
      'Design Strategy',
      'Service Design',
      'Design Thinking',
      'Social Impact Design',
      'Civic Technology',
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
    default: 'es',
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
      title: 'Manuel Echavarria Romero | Senior Product & Brand Innovation Designer',
      description: 'Senior product and brand innovation designer, 15 years across 6 countries. Consumer products, retail and point of sale, brand experience, physical and digital. Relocating to Spain, available from 1 November 2026.',
      keywords: [
        'Manuel Echavarria Romero',
        'Manecharo',
        'Senior Product Designer',
        'Brand Innovation Designer',
        'Industrial Designer',
        'Consumer Product Design',
        'Retail Design',
        'Point of Sale Design',
        'Shopper Marketing',
        'POP Systems',
        'Brand Identity',
        'Brand Experience',
        'Design for Manufacturing',
        'CMF Design',
        'UX/UI Design',
        'Design Systems',
        'Design Leadership',
        'Product Designer Spain',
        'Product Designer Madrid',
        'Product Designer Barcelona',
      ],
    },
    es: {
      title: 'Manuel Echavarria Romero | Diseñador Sénior de Producto e Innovación de Marca',
      description: 'Diseñador sénior de producto e innovación de marca, quince años en seis países. Productos de consumo, retail y punto de venta, experiencia de marca, físico y digital. Se traslada a España, disponible desde el 1 de noviembre de 2026.',
      keywords: [
        'Manuel Echavarria Romero',
        'Manecharo',
        'Diseñador de producto',
        'Diseñador industrial',
        'Diseñador sénior de producto',
        'Innovación de marca',
        'Productos de consumo',
        'Diseño de retail',
        'Punto de venta',
        'Shopper',
        'Gran consumo',
        'Sistemas POP',
        'Identidad de marca',
        'Experiencia de marca',
        'Diseño para fabricación',
        'Investigación de consumidor',
        'Diseño UX/UI',
        'Dirección de diseño',
        'Diseñador de producto Madrid',
        'Diseñador de producto Barcelona',
      ],
    },
    it: {
      title: 'Manuel Echavarria Romero | Senior Designer di Prodotto e Innovazione di Marca',
      description: 'Senior designer di prodotto e innovazione di marca, quindici anni in sei paesi. Prodotti di consumo, retail e punto vendita, brand experience, fisico e digitale. Si trasferisce in Spagna, disponibile dal 1 novembre 2026.',
      keywords: [
        'Manuel Echavarria Romero',
        'Manecharo',
        'Designer di prodotto',
        'Designer industriale',
        'Senior product designer',
        'Innovazione di marca',
        'Prodotti di consumo',
        'Design per il retail',
        'Punto vendita',
        'Shopper',
        'Grande consumo',
        'Sistemi POP',
        'Identità di marca',
        'Brand experience',
        'Design per la produzione',
        'Ricerca sul consumatore',
        'Design UX/UI',
        'Direzione del design',
        'Designer di prodotto Spagna',
        'Designer di prodotto Milano',
      ],
    },
  },

  // Structured data for different page types
  structuredData: {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': 'https://manecharo.com/#organization',
      name: 'Manuel Echavarria Romero Design',
      alternateName: ['Manecharo Design', 'MER Design'],
      url: 'https://manecharo.com',
      logo: 'https://manecharo.com/images/logo.png',
      image: 'https://manecharo.com/images/about/manuel2.jpeg',
      description: 'Product and brand design for consumer goods, retail and point of sale: from insight and concept through to manufacturing, distribution and launch. Physical and digital.',
      founder: {
        '@type': 'Person',
        '@id': 'https://manecharo.com/#person',
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
      areaServed: ['Spain', 'European Union'],
      priceRange: '$$$$',
      telephone: '+60126581025',
      email: 'manuel_echavarria@hotmail.com',
      sameAs: [
        'https://www.linkedin.com/in/mer101',
        'https://www.instagram.com/Manecharo',
      ],
    },
  },
};

// El trilingue es de cliente, no de ruta: /en, /es e /it devuelven 404 y el
// idioma lo decide LanguageContext. Aqui vivia un getHrefLangLinks() que
// generaba enlaces a esas tres rutas inexistentes; no lo usaba nadie y habria
// mandado a Google a tres 404, asi que fuera.

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
