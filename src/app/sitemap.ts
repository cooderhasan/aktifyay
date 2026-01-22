import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.aktifyay.com.tr";

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const locales = ["tr", "en"];
    const now = new Date();

    // Static pages
    const staticPages = [
        { path: "", priority: 1.0, changeFrequency: "weekly" as const },
        { path: "/hakkimizda", altPath: "/about-us", priority: 0.8, changeFrequency: "monthly" as const },
        { path: "/iletisim", altPath: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
        { path: "/teklif-al", altPath: "/request-quote", priority: 0.8, changeFrequency: "monthly" as const },
        { path: "/kariyer", altPath: "/careers", priority: 0.6, changeFrequency: "monthly" as const },
        { path: "/e-katalog", altPath: "/e-catalog", priority: 0.7, changeFrequency: "monthly" as const },
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

    // Fetch dynamic data from database
    const [products, industries, blogPosts, blogCategories] = await Promise.all([
        prisma.productCategory.findMany({
            where: { isActive: true },
            select: { slug: true, updatedAt: true },
        }),
        prisma.industry.findMany({
            where: { isActive: true },
            select: { slug: true, updatedAt: true },
        }),
        prisma.blogPost.findMany({
            where: { isPublished: true },
            select: { slug: true, updatedAt: true },
        }),
        prisma.blogCategory.findMany({
            select: { slug: true, updatedAt: true },
        }),
    ]);

    // Generate product URLs
    products.forEach((product) => {
        locales.forEach((locale) => {
            const pathSegment = locale === "tr" ? "urunler" : "products";
            urls.push({
                url: `${SITE_URL}/${locale}/${pathSegment}/${product.slug}`,
                lastModified: product.updatedAt,
                changeFrequency: "weekly",
                priority: 0.9,
            });
        });
    });

    // Generate industry URLs
    industries.forEach((industry) => {
        locales.forEach((locale) => {
            const pathSegment = locale === "tr" ? "sektorler" : "industries";
            urls.push({
                url: `${SITE_URL}/${locale}/${pathSegment}/${industry.slug}`,
                lastModified: industry.updatedAt,
                changeFrequency: "monthly",
                priority: 0.8,
            });
        });
    });

    // Generate blog post URLs
    blogPosts.forEach((post) => {
        locales.forEach((locale) => {
            urls.push({
                url: `${SITE_URL}/${locale}/blog/${post.slug}`,
                lastModified: post.updatedAt,
                changeFrequency: "weekly",
                priority: 0.7,
            });
        });
    });

    // Generate blog category URLs
    blogCategories.forEach((category) => {
        locales.forEach((locale) => {
            urls.push({
                url: `${SITE_URL}/${locale}/blog/kategori/${category.slug}`,
                lastModified: category.updatedAt,
                changeFrequency: "weekly",
                priority: 0.6,
            });
        });
    });

    // Blog listing page
    locales.forEach((locale) => {
        urls.push({
            url: `${SITE_URL}/${locale}/blog`,
            lastModified: now,
            changeFrequency: "daily",
            priority: 0.8,
        });
    });

    return urls;
}
