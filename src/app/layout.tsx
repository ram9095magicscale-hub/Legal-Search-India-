import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/theme-provider";
import DashboardPaddingWrapper from "@/components/layout/DashboardPaddingWrapper";

import { SITE_CONFIG } from "@/lib/constants";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | Premium Legal & Business Solutions`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "Legal Search India",
    "GST Registration",
    "FSSAI License",
    "Trademark Registration India",
    "GST Filing",
    "Company Registration",
    "MSME Registration",
    "Import Export Code",
    "Business Compliance India",
  ],
  authors: [{ name: "Legal Search India Team" }],
  creator: "Legal Search India",
  publisher: "Legal Search India",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: ["/og-image.png"],
    creator: "@legalsearchindia",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "i6ch-FYVyHzFm2kBUEZmvG6rFvV4-YrOJna6ByA-Llk",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased min-h-screen flex flex-col overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": SITE_CONFIG.name,
                "url": SITE_CONFIG.url,
                "logo": `${SITE_CONFIG.url}/logo.png`,
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+91-88260-73117",
                  "contactType": "customer service",
                  "email": "info@legalsearchindia.com",
                  "areaServed": "IN",
                  "availableLanguage": ["en", "hi"]
                },
                "sameAs": [
                  "https://x.com/legalsearchindia",
                  "https://linkedin.com/company/legalsearchindia",
                  "https://facebook.com/legalsearchindia",
                  "https://instagram.com/legalsearchindia"
                ]
              })
            }}
          />
          <Navbar />
          <DashboardPaddingWrapper>
            {children}
          </DashboardPaddingWrapper>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
