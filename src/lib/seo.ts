import { Metadata } from "next";
import { Locale, defaultLocale } from "./i18n";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aktifyay.com.tr";

interface SEOParams {
    title: string;
    description: string;
    locale: Locale;
    path: string;
    ogImage?: string;
    noIndex?: boolean;
}

export function generateSEOMetadata({
    title,
    description,
    locale,
    path,
    ogImage,
    noIndex = false,
}: SEOParams): Metadata {
    const url = `${SITE_URL}/${locale}${path}`;
    const alternateLocale = locale === "tr" ? "en" : "tr";
    const alternateUrl = `${SITE_URL}/${alternateLocale}${path}`;

    return {
        title,
        description,
        metadataBase: new URL(SITE_URL),
        alternates: {
            canonical: url,
            languages: {
                "tr-TR": `${SITE_URL}/tr${path}`,
                "en-US": `${SITE_URL}/en${path}`,
                "x-default": `${SITE_URL}/${defaultLocale}${path}`,
            },
        },
        openGraph: {
            title,
            description,
            url,
            siteName: "Aktif Yay",
            locale: locale === "tr" ? "tr_TR" : "en_US",
            alternateLocale: locale === "tr" ? "en_US" : "tr_TR",
            type: "website",
            images: ogImage
                ? [{ url: ogImage, width: 1200, height: 630, alt: title }]
                : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ogImage ? [ogImage] : undefined,
        },
        robots: noIndex
            ? { index: false, follow: false }
            : { index: true, follow: true },
    };
}

// Organization Schema
export function generateOrganizationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Aktif Yay",
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        contactPoint: {
            "@type": "ContactPoint",
            telephone: "+90-532-676-3488",
            contactType: "customer service",
            availableLanguage: ["Turkish", "English"],
        },
        address: {
            "@type": "PostalAddress",
            streetAddress: "Horozluhan Mahallesi, Yazırhan Sokak No:14",
            addressLocality: "Selçuklu",
            addressRegion: "Konya",
            postalCode: "42110",
            addressCountry: "TR",
        },
        sameAs: [],
    };
}

// LocalBusiness Schema
export function generateLocalBusinessSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#localbusiness`,
        name: "Aktif Yay",
        description: "Endüstriyel yay üretimi - Basma, çekme, kurma ve tel form yaylar",
        url: SITE_URL,
        telephone: "+90-532-676-3488",
        email: "info@aktifyay.com.tr",
        address: {
            "@type": "PostalAddress",
            streetAddress: "Horozluhan Mahallesi, Yazırhan Sokak No:14",
            addressLocality: "Selçuklu",
            addressRegion: "Konya",
            postalCode: "42110",
            addressCountry: "TR",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: 37.9337,
            longitude: 32.4943,
        },
        openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:00",
            closes: "18:00",
        },
        priceRange: "$$",
    };
}

// Product Schema
export function generateProductSchema(
    name: string,
    description: string,
    image: string,
    locale: Locale
) {
    return {
        "@context": "https://schema.org",
        "@type": "Product",
        name,
        description,
        image,
        brand: {
            "@type": "Brand",
            name: "Aktif Yay",
        },
        manufacturer: {
            "@type": "Organization",
            name: "Aktif Yay",
        },
        offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            priceCurrency: "TRY",
            priceValidUntil: new Date(
                Date.now() + 365 * 24 * 60 * 60 * 1000
            ).toISOString(),
            seller: {
                "@type": "Organization",
                name: "Aktif Yay",
            },
        },
    };
}

// FAQ Schema
export function generateFAQSchema(
    faqs: Array<{ question: string; answer: string }>
) {
    return {
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
}

// Breadcrumb Schema
export function generateBreadcrumbSchema(
    items: Array<{ name: string; url: string }>
) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

// Industry Schema
export function generateIndustrySchema(
    name: string,
    description: string,
    url: string
) {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        url,
        provider: {
            "@type": "Organization",
            name: "Aktif Yay",
        },
        areaServed: {
            "@type": "Country",
            name: "Turkey",
        },
    };
}
