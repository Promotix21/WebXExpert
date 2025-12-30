const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://webxexpert.com";

// Organization Schema - Shows in Google Knowledge Panel
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "WebXExpert",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/webxexpert-logo-light.png`,
      width: 200,
      height: 50,
    },
    image: `${siteUrl}/og-image.png`,
    description:
      "Premium web design and development agency specializing in custom software, CRMs, and cutting-edge digital experiences.",
    email: "hello@webxexpert.com",
    telephone: "+1-555-123-4567",
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      addressCountry: "US",
    },
    sameAs: [
      "https://twitter.com/webxexpert",
      "https://linkedin.com/company/webxexpert",
      "https://github.com/webxexpert",
      "https://instagram.com/webxexpert",
    ],
    foundingDate: "2020",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 10,
      maxValue: 50,
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 37.7749,
        longitude: -122.4194,
      },
      geoRadius: "10000",
    },
    serviceArea: {
      "@type": "Place",
      name: "Worldwide",
    },
    priceRange: "$$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "48",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Website Schema - Helps with sitelinks search box
export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: "WebXExpert",
    description: "Premium Web Design & Development Agency",
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: "en-US",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Service Schema - For individual service pages
interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  image?: string;
  provider?: string;
}

export function ServiceSchema({
  name,
  description,
  url,
  image,
  provider = "WebXExpert",
}: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}${url}#service`,
    name,
    description,
    url: `${siteUrl}${url}`,
    image: image || `${siteUrl}/og-image.png`,
    provider: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: provider,
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    serviceType: name,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Professional Service Schema - For the main services page
export function ProfessionalServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/services#professionalservice`,
    name: "WebXExpert - Web Development Services",
    url: `${siteUrl}/services`,
    image: `${siteUrl}/og-image.png`,
    telephone: "+1-555-123-4567",
    email: "hello@webxexpert.com",
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 37.7749,
      longitude: -122.4194,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Design",
            description:
              "Award-worthy designs with GSAP animations, WebGL experiences, and interactions that captivate.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Development",
            description:
              "Full-stack expertise in Next.js, NestJS, React, and beyond. Scalable, performant applications.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom Software",
            description:
              "CRMs, ERPs, dashboards, and internal tools built from scratch.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "API Integrations",
            description:
              "Connect any system to anything. APIs, webhooks, automation workflows.",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// FAQ Schema - For FAQ sections
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Breadcrumb Schema
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Local Business Schema - Alternative to Organization for local SEO
export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#localbusiness`,
    name: "WebXExpert",
    image: `${siteUrl}/og-image.png`,
    url: siteUrl,
    telephone: "+1-555-123-4567",
    email: "hello@webxexpert.com",
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Tech Street",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      postalCode: "94102",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 37.7749,
      longitude: -122.4194,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    sameAs: [
      "https://twitter.com/webxexpert",
      "https://linkedin.com/company/webxexpert",
      "https://github.com/webxexpert",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Portfolio/Creative Work Schema
interface PortfolioItemSchemaProps {
  name: string;
  description: string;
  url: string;
  image?: string;
  dateCreated?: string;
  technologies?: string[];
}

export function PortfolioItemSchema({
  name,
  description,
  url,
  image,
  dateCreated,
  technologies = [],
}: PortfolioItemSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name,
    description,
    url: `${siteUrl}${url}`,
    image: image || `${siteUrl}/og-image.png`,
    dateCreated: dateCreated || new Date().toISOString().split("T")[0],
    creator: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "WebXExpert",
    },
    keywords: technologies.join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Contact Page Schema
export function ContactPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact WebXExpert",
    description:
      "Get in touch with WebXExpert for your web design and development needs.",
    url: `${siteUrl}/contact`,
    mainEntity: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// About Page Schema
export function AboutPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About WebXExpert",
    description:
      "Learn about WebXExpert - a premium web design and development agency.",
    url: `${siteUrl}/about`,
    mainEntity: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Review/Testimonial Schema
interface ReviewSchemaProps {
  reviews: {
    author: string;
    reviewBody: string;
    ratingValue: number;
    datePublished?: string;
  }[];
}

export function ReviewSchema({ reviews }: ReviewSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "WebXExpert",
    review: reviews.map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.author,
      },
      reviewBody: review.reviewBody,
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.ratingValue,
        bestRating: 5,
        worstRating: 1,
      },
      datePublished:
        review.datePublished || new Date().toISOString().split("T")[0],
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue:
        reviews.reduce((acc, r) => acc + r.ratingValue, 0) / reviews.length,
      reviewCount: reviews.length,
      bestRating: 5,
      worstRating: 1,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
