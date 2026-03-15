import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteConfig = {
  name: "Repo Roast",
  description: "Brutally honest AI-powered GitHub repository roasting. Get your code judged by a heartless AI.",
  url: "https://repo-roast-wdp.vercel.app", // Update this with your actual URL
  ogImage: "https://repo-roast-wdp.vercel.app/og-image.png",
  links: {
    github: "https://github.com/webdevpraveen/repo-roast-web",
  },
};

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "GitHub Roast",
    "Code Review AI",
    "Repo Roast",
    "Developer Humiliation",
    "AI Code Analysis",
    "GitHub Stats",
    "Open Source Judge",
    "Brutal AI",
  ],
  authors: [
    {
      name: "Praveen Kumar Singh",
      url: "https://github.com/webdevpraveen",
    },
  ],
  creator: "Praveen Kumar Singh",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@wdp_tweets", // Assuming a handle or leave blank
  },
  icons: {
    icon: "/favicon.ico",
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

// JSON-LD Structured Data for SEO
export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Repo Roast",
    "description": "Brutally honest AI-powered GitHub repository roasting.",
    "url": "https://repo-roast-wdp.vercel.app",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web",
    "author": {
      "@type": "Person",
      "name": "Praveen Kumar Singh"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
