import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { generateOrganizationSchema } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Aktif Yay | Endüstriyel Yay Üretimi",
    template: "%s | Aktif Yay",
  },
  description: "Konya'da 30 yıllık tecrübe ile endüstriyel yay üretimi. Basma yaylar, çekme yaylar, kurma yaylar ve tel form yaylar.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://aktifyay.com.tr"),
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
  // Google Search Console verification - replace with actual code
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || "",
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION || "",
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    alternateLocale: "en_US",
    siteName: "Aktif Yay",
  },
  twitter: {
    card: "summary_large_image",
  },
};

import WhatsAppButton from "@/components/layout/WhatsAppButton";

import { getSettings } from "@/actions/settings";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <html lang="tr" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationSchema()),
          }}
        />
      </head>
      <body className="antialiased">
        {children}
        {/* @ts-expect-error - Component type mismatch */}
        <WhatsAppButton phone={settings?.whatsapp} />
      </body>
    </html>
  );
}
