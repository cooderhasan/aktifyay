export const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "tr";

export const localeNames: Record<Locale, string> = {
    tr: "Türkçe",
    en: "English",
};

// URL path mappings for each locale
export const pathMappings: Record<Locale, Record<string, string>> = {
    tr: {
        products: "urunler",
        industries: "sektorler",
        about: "hakkimizda",
        contact: "iletisim",
        quote: "teklif-al",
        careers: "kariyer",
        corporate: "kurumsal",
    },
    en: {
        products: "products",
        industries: "industries",
        about: "about-us",
        contact: "contact",
        quote: "request-quote",
        careers: "careers",
        corporate: "corporate",
    },
};

// Product category slugs
export const productSlugs: Record<Locale, Record<string, string>> = {
    tr: {
        "compression-springs": "basma-yaylar",
        "extension-springs": "cekme-yaylar",
        "wire-forms": "tel-form",
        "torsion-springs": "kurma-yaylar",
    },
    en: {
        "compression-springs": "compression-springs",
        "extension-springs": "extension-springs",
        "wire-forms": "wire-forms",
        "torsion-springs": "torsion-springs",
    },
};

// Industry slugs
export const industrySlugs: Record<Locale, Record<string, string>> = {
    tr: {
        automotive: "otomotiv",
        defense: "savunma-sanayi",
        agriculture: "tarim-ziraat",
        furniture: "mobilya",
        appliances: "beyaz-esya",
        medical: "medikal",
        aviation: "havacilik",
        electronics: "elektrik-elektronik",
    },
    en: {
        automotive: "automotive",
        defense: "defense-industry",
        agriculture: "agriculture",
        furniture: "furniture",
        appliances: "home-appliances",
        medical: "medical",
        aviation: "aviation",
        electronics: "electronics",
    },
};

// Get locale from pathname
export function getLocaleFromPathname(pathname: string): Locale {
    const segments = pathname.split("/").filter(Boolean);
    const firstSegment = segments[0];
    if (firstSegment && locales.includes(firstSegment as Locale)) {
        return firstSegment as Locale;
    }
    return defaultLocale;
}

// Get translated path
export function getLocalizedPath(path: string, locale: Locale): string {
    return `/${locale}${path}`;
}
