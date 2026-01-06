import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Locale, pathMappings } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { generateSEOMetadata, generateIndustrySchema, generateBreadcrumbSchema } from "@/lib/seo";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

interface IndustryPageProps {
    params: Promise<{ lang: Locale; slug: string }>;
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
    const { lang, slug } = await params;

    const industry = await prisma.industry.findUnique({
        where: { slug }
    });

    if (!industry) {
        return { title: "Not Found" };
    }

    const name = lang === "tr" ? industry.nameTr : industry.nameEn;
    const description = lang === "tr" ? industry.descriptionTr : industry.descriptionEn;
    const metaTitle = lang === "tr" ? industry.metaTitleTr : industry.metaTitleEn;
    const metaDescription = lang === "tr" ? industry.metaDescriptionTr : industry.metaDescriptionEn;

    return generateSEOMetadata({
        title: metaTitle || (lang === "tr"
            ? `${name} için Yay Çözümleri | Aktif Yay`
            : `Spring Solutions for ${name} | Aktif Yay`),
        description: metaDescription || description || "",
        locale: lang,
        path: `/${lang === "tr" ? "sektorler" : "industries"}/${slug}`,
        ogImage: industry.ogImage || industry.image || undefined
    });
}

export default async function IndustryPage({ params }: IndustryPageProps) {
    const { lang, slug } = await params;
    const paths = pathMappings[lang];

    // Fetch industry
    const industry = await prisma.industry.findUnique({
        where: { slug }
    });

    if (!industry || !industry.isActive) {
        notFound();
    }

    // Parse localized fields
    const name = lang === "tr" ? industry.nameTr : industry.nameEn;
    const description = lang === "tr" ? industry.descriptionTr : industry.descriptionEn;
    const content = lang === "tr" ? industry.contentTr : industry.contentEn;
    // Solutions are newline separated in DB
    const solutionsRaw = lang === "tr" ? industry.solutionsTr : industry.solutionsEn;
    const solutions = solutionsRaw ? solutionsRaw.split('\n').filter(Boolean) : [];

    // Image fallback
    const image = industry.image || "/defaults/industry-default.png";
    const imageAlt = lang === "tr" ? (industry.imageAltTr || name) : (industry.imageAltEn || name);

    // 1. Manually added related products (from Industry side)
    let manualRelatedSlugs: string[] = [];
    try {
        if (industry.relatedProducts) {
            manualRelatedSlugs = JSON.parse(industry.relatedProducts);
        }
    } catch (e) {
        console.error("Failed to parse relatedProducts", e);
    }

    // 2. Reverse lookup: Products that selected this Industry (from Product side)
    // We fetch all active products to safely check the JSON string in memory
    // (Prisma contains filter on JSON arrays stored as strings is risky for substrings)
    const allProducts = await prisma.productCategory.findMany({
        where: { isActive: true },
        select: {
            slug: true,
            nameTr: true,
            nameEn: true,
            image: true,
            relatedIndustries: true
        }
    });

    const reverseRelatedProducts = allProducts.filter(p => {
        if (!p.relatedIndustries) return false;
        try {
            const industries = JSON.parse(p.relatedIndustries);
            return Array.isArray(industries) && industries.includes(slug);
        } catch {
            return false;
        }
    });

    // 3. Combine and Deduplicate
    const combinedProductsMap = new Map();

    // Add manual ones first (maintaining order if possible, though we fetch fresh data for them)
    // We need to find the product details for manual slugs since we only have slugs initially
    const manualProductsDetails = allProducts.filter(p => manualRelatedSlugs.includes(p.slug));

    [...manualProductsDetails, ...reverseRelatedProducts].forEach(p => {
        combinedProductsMap.set(p.slug, {
            name: lang === "tr" ? p.nameTr : p.nameEn,
            slug: p.slug,
            // You can add image here if needed for sidebar
        });
    });

    const relatedProducts = Array.from(combinedProductsMap.values());

    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aktifyay.com.tr";

    const breadcrumbItems = [
        { name: lang === "tr" ? "Ana Sayfa" : "Home", url: `${SITE_URL}/${lang}` },
        { name: lang === "tr" ? "Sektörler" : "Industries", url: `${SITE_URL}/${lang}/${paths.industries}` },
        { name, url: `${SITE_URL}/${lang}/${paths.industries}/${slug}` },
    ];

    return (
        <>
            {/* Schema.org JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbItems)),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateIndustrySchema(
                        name,
                        description || "",
                        `${SITE_URL}/${lang}/${paths.industries}/${slug}`
                    )),
                }}
            />

            {/* Breadcrumb */}
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                <div className="container">
                    <ol>
                        <li><Link href={`/${lang}`}>{lang === "tr" ? "Ana Sayfa" : "Home"}</Link></li>
                        <li><Link href={`/${lang}/${paths.industries}`}>{lang === "tr" ? "Sektörler" : "Industries"}</Link></li>
                        <li aria-current="page">{name}</li>
                    </ol>
                </div>
            </nav>

            {/* Hero */}
            <section className={styles.hero} style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <div className="container">
                    <Link href={`/${lang}/${paths.industries}`} className={styles.backLink}>
                        <ArrowLeft size={20} />
                        {lang === "tr" ? "Tüm Sektörler" : "All Industries"}
                    </Link>
                    <h1>
                        {lang === "tr" ? `${name} için Yay Çözümleri` : `Spring Solutions for ${name}`}
                    </h1>
                    <p className={styles.heroDescription}>{description}</p>
                </div>
            </section>

            {/* Content */}
            <section className="section">
                <div className="container">
                    <div className={styles.content}>
                        {/* Main Content */}
                        <div className={styles.mainContent}>
                            <h2>{lang === "tr" ? `${name} Yay İhtiyaçları` : `${name} Spring Needs`}</h2>
                            <div className={styles.contentText}>
                                {(content || "").split("\n\n").map((paragraph, i) => (
                                    <p key={i}>{paragraph}</p>
                                ))}
                            </div>

                            {/* Solutions */}
                            {solutions.length > 0 && (
                                <>
                                    <h2>{lang === "tr" ? "Sunduğumuz Çözümler" : "Our Solutions"}</h2>
                                    <ul className={styles.solutionsList}>
                                        {solutions.map((solution, i) => (
                                            <li key={i}>
                                                <CheckCircle size={20} />
                                                <span>{solution}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}

                            {/* Why Aktif Yay / Static Content */}
                            <h2>{lang === "tr" ? "Neden Aktif Yay?" : "Why Aktif Yay?"}</h2>
                            <div className={styles.whyUs}>
                                <div className={styles.whyUsItem}>
                                    <h3>{lang === "tr" ? "30+ Yıllık Tecrübe" : "30+ Years Experience"}</h3>
                                    <p>
                                        {lang === "tr"
                                            ? "1994'ten bu yana endüstriyel yay üretiminde uzmanlık"
                                            : "Expertise in industrial spring manufacturing since 1994"}
                                    </p>
                                </div>
                                <div className={styles.whyUsItem}>
                                    <h3>{lang === "tr" ? "Özel Üretim" : "Custom Production"}</h3>
                                    <p>
                                        {lang === "tr"
                                            ? "Sektörünüze özel yay tasarımı ve imalatı"
                                            : "Custom spring design and manufacturing for your industry"}
                                    </p>
                                </div>
                                <div className={styles.whyUsItem}>
                                    <h3>{lang === "tr" ? "Kalite Güvencesi" : "Quality Assurance"}</h3>
                                    <p>
                                        {lang === "tr"
                                            ? "ISO sertifikalı üretim süreçleri"
                                            : "ISO certified production processes"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className={styles.sidebar}>
                            {/* Related Products */}
                            {relatedProducts.length > 0 && (
                                <div className={styles.productsCard}>
                                    <h3>{lang === "tr" ? "İlgili Ürünler" : "Related Products"}</h3>
                                    <ul>
                                        {relatedProducts.map((product, i) => (
                                            <li key={i}>
                                                <Link href={`/${lang}/${paths.products}/${product.slug}`}>
                                                    {product.name}
                                                    <ArrowRight size={16} />
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* CTA */}
                            <div className={styles.ctaCard}>
                                <h3>{lang === "tr" ? "Teklif Alın" : "Get a Quote"}</h3>
                                <p>
                                    {lang === "tr"
                                        ? `${name} için özel yay çözümlerimiz hakkında bilgi alın.`
                                        : `Get information about our custom spring solutions for ${name}.`}
                                </p>
                                <Link href={`/${lang}/${paths.quote}`} className="btn btn-secondary">
                                    {lang === "tr" ? "Teklif İste" : "Request Quote"}
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </>
    );
}
