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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
