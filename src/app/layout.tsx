import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Chatbot } from "@/components/ui/Chatbot";
import { OrganizationSchema, WebsiteSchema } from "@/components/seo/JsonLd";

// Use local fonts with fallback
const geistSans = localFont({
  src: [
    {
      path: "../../public/fonts/GeistVF.woff",
      weight: "100 900",
    },
  ],
  variable: "--font-geist-sans",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const geistMono = localFont({
  src: [
    {
      path: "../../public/fonts/GeistMonoVF.woff",
      weight: "100 900",
    },
  ],
  variable: "--font-geist-mono",
  display: "swap",
  fallback: ["monospace"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://webxexpert.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "WebXExpert | Premium Web Design & Development Agency",
    template: "%s | WebXExpert",
  },
  description:
    "We build award-worthy digital experiences. Web design, development, CRMs, and custom software solutions crafted with obsession. Transform your business with cutting-edge technology.",
  keywords: [
    "web design agency",
    "web development company",
    "custom software development",
    "CRM development",
    "GSAP animations",
    "WebGL development",
    "Next.js agency",
    "React development",
    "full-stack development",
    "UI/UX design",
    "e-commerce development",
    "SaaS development",
    "API integrations",
    "digital transformation",
  ],
  authors: [{ name: "WebXExpert", url: siteUrl }],
  creator: "WebXExpert",
  publisher: "WebXExpert",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "WebXExpert",
    title: "WebXExpert | Premium Web Design & Development Agency",
    description:
      "We build award-worthy digital experiences. Web design, development, CRMs, and custom software solutions crafted with obsession.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "WebXExpert - Premium Web Solutions",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WebXExpert | Premium Web Design & Development Agency",
    description:
      "We build award-worthy digital experiences. Web design, development, CRMs, and custom software solutions.",
    images: ["/og-image.png"],
    creator: "@webxexpert",
    site: "@webxexpert",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#000000" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS prefetch for analytics (if used) */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Schema.org JSON-LD */}
        <OrganizationSchema />
        <WebsiteSchema />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
        <Chatbot />
      </body>
    </html>
  );
}
