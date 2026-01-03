import { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aktifyay.com.tr";

export default function sitemap(): MetadataRoute.Sitemap {
    const locales = ["tr", "en"];
    const now = new Date();

    // Static pages
    const staticPages = [
        { path: "", priority: 1.0, changeFrequency: "weekly" as const },
        { path: "/hakkimizda", altPath: "/about-us", priority: 0.8, changeFrequency: "monthly" as const },
        { path: "/iletisim", altPath: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
        { path: "/teklif-al", altPath: "/request-quote", priority: 0.8, changeFrequency: "monthly" as const },
        { path: "/kariyer", altPath: "/careers", priority: 0.6, changeFrequency: "monthly" as const },
    ];

    // Product categories
    const products = [
        { slugTr: "basma-yaylar", slugEn: "compression-springs" },
        { slugTr: "cekme-yaylar", slugEn: "extension-springs" },
        { slugTr: "tel-form", slugEn: "wire-forms" },
        { slugTr: "kurma-yaylar", slugEn: "torsion-springs" },
    ];

    // Industries
    const industries = [
        { slugTr: "otomotiv", slugEn: "automotive" },
        { slugTr: "savunma-sanayi", slugEn: "defense-industry" },
        { slugTr: "tarim-ziraat", slugEn: "agriculture" },
        { slugTr: "mobilya", slugEn: "furniture" },
        { slugTr: "beyaz-esya", slugEn: "home-appliances" },
        { slugTr: "medikal", slugEn: "medical" },
        { slugTr: "havacilik", slugEn: "aviation" },
        { slugTr: "elektrik-elektronik", slugEn: "electronics" },
    ];

    const urls: MetadataRoute.Sitemap = [];

    // Generate static page URLs for each locale
    staticPages.forEach((page) => {
        locales.forEach((locale) => {
            const path = locale === "tr" ? page.path : (page.altPath || page.path);
            urls.push({
                url: `${SITE_URL}/${locale}${path}`,
                lastModified: now,
                changeFrequency: page.changeFrequency,
                priority: page.priority,
                alternates: {
                    languages: {
                        tr: `${SITE_URL}/tr${page.path}`,
                        en: `${SITE_URL}/en${page.altPath || page.path}`,
                    },
                },
            });
        });
    });

    // Generate product URLs
    products.forEach((product) => {
        urls.push({
            url: `${SITE_URL}/tr/urunler/${product.slugTr}`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.9,
            alternates: {
                languages: {
                    tr: `${SITE_URL}/tr/urunler/${product.slugTr}`,
                    en: `${SITE_URL}/en/products/${product.slugEn}`,
                },
            },
        });
        urls.push({
            url: `${SITE_URL}/en/products/${product.slugEn}`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.9,
            alternates: {
                languages: {
                    tr: `${SITE_URL}/tr/urunler/${product.slugTr}`,
                    en: `${SITE_URL}/en/products/${product.slugEn}`,
                },
            },
        });
    });

    // Generate industry URLs
    industries.forEach((industry) => {
        urls.push({
            url: `${SITE_URL}/tr/sektorler/${industry.slugTr}`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
            alternates: {
                languages: {
                    tr: `${SITE_URL}/tr/sektorler/${industry.slugTr}`,
                    en: `${SITE_URL}/en/industries/${industry.slugEn}`,
                },
            },
        });
        urls.push({
            url: `${SITE_URL}/en/industries/${industry.slugEn}`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
            alternates: {
                languages: {
                    tr: `${SITE_URL}/tr/sektorler/${industry.slugTr}`,
                    en: `${SITE_URL}/en/industries/${industry.slugEn}`,
                },
            },
        });
    });

    return urls;
}
