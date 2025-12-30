import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

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

export const metadata: Metadata = {
  title: {
    default: "WebXExpert | Premium Web Solutions",
    template: "%s | WebXExpert",
  },
  description:
    "We build award-worthy digital experiences. Web design, development, CRMs, and custom software solutions crafted with obsession.",
  keywords: [
    "web design",
    "web development",
    "custom software",
    "CRM development",
    "GSAP animations",
    "WebGL",
    "Next.js",
    "React",
    "full-stack development",
  ],
  authors: [{ name: "WebXExpert" }],
  creator: "WebXExpert",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://webxexpert.com",
    siteName: "WebXExpert",
    title: "WebXExpert | Premium Web Solutions",
    description:
      "We build award-worthy digital experiences. Web design, development, CRMs, and custom software solutions.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "WebXExpert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WebXExpert | Premium Web Solutions",
    description:
      "We build award-worthy digital experiences. Web design, development, CRMs, and custom software solutions.",
    images: ["/og-image.png"],
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
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
