import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { generateOrganizationSchema } from "@/lib/seo";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = host ? `${protocol}://${host}` : (process.env.NEXT_PUBLIC_SITE_URL || "https://aktifyay.com.tr");

  return {
    title: {
      default: settings?.homeTitleTr || settings?.siteName || "Aktif Yay | Endüstriyel Yay Üretimi",
      template: `%s | ${settings?.siteName || "Aktif Yay"}`,
    },
    description: settings?.homeDescTr || "Konya'da 30 yıllık tecrübe ile endüstriyel yay üretimi. Basma yaylar, çekme yaylar, kurma yaylar ve tel form yaylar.",
    metadataBase: new URL(baseUrl),
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: settings?.favicon || "/favicon.ico",
    },
    verification: {
      google: settings?.googleVerification || process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
      yandex: settings?.yandexVerification || process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || "",
      other: {
        "msvalidate.01": settings?.bingVerification || process.env.NEXT_PUBLIC_BING_VERIFICATION || "",
      },
    },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      alternateLocale: "en_US",
      siteName: settings?.siteName || "Aktif Yay",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

import WhatsAppButton from "@/components/layout/WhatsAppButton";

import { getSettings } from "@/actions/settings";

import Script from "next/script";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <html lang="tr" className={inter.variable}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ERL583CNLN"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-ERL583CNLN');
          `}
        </Script>
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
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
