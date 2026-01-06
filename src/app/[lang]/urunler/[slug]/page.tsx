import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProductGallery from "@/components/ui/ProductGallery";
import { Locale, pathMappings } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { generateSEOMetadata, generateProductSchema, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

interface ProductPageProps {
    params: Promise<{ lang: Locale; slug: string }>;
}

// Map English slugs to Turkish
const slugMapping: Record<string, string> = {
    "compression-springs": "basma-yaylar",
    "extension-springs": "cekme-yaylar",
    "wire-forms": "tel-form",
    "torsion-springs": "kurma-yaylar",
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const { lang, slug } = await params;
    const normalizedSlug = slugMapping[slug] || slug;

    const product = await prisma.productCategory.findUnique({
        where: { slug: normalizedSlug }
    });

    if (!product) {
        return { title: "Not Found" };
    }

    const name = lang === "tr" ? product.nameTr : product.nameEn;
    const description = lang === "tr" ? product.descriptionTr : product.descriptionEn;
    const metaTitle = lang === "tr" ? product.metaTitleTr : product.metaTitleEn;
    const metaDescription = lang === "tr" ? product.metaDescriptionTr : product.metaDescriptionEn;

    return generateSEOMetadata({
        title: metaTitle || (lang === "tr"
            ? `${name} | Endüstriyel Yay Üretimi - Aktif Yay`
            : `${name} | Industrial Spring Manufacturing - Aktif Yay`),
        description: metaDescription || description || "",
        locale: lang,
        path: `/${lang === "tr" ? "urunler" : "products"}/${slug}`,
        ogImage: product.ogImage || product.image || undefined
    });
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { lang, slug } = await params;
    const paths = pathMappings[lang];
    const normalizedSlug = slugMapping[slug] || slug;

    // Fetch product with FAQs
    const product = await prisma.productCategory.findUnique({
        where: { slug: normalizedSlug },
        include: { faqs: true }
    });

    if (!product) {
        notFound();
    }

    const name = lang === "tr" ? product.nameTr : product.nameEn;
    const description = lang === "tr" ? product.descriptionTr : product.descriptionEn;
    const longDesc = lang === "tr" ? product.longDescTr : product.longDescEn;

    // Parse usage areas (split by newline)
    const usageAreasRaw = lang === "tr" ? product.usageAreasTr : product.usageAreasEn;
    const usageAreas = usageAreasRaw
        ? usageAreasRaw.split('\n').filter(Boolean)
        : [];

    // Parse tech specs (JSON)
    let techSpecs: { label: string; valueTr: string; valueEn: string }[] = [];
    try {
        if (product.technicalSpecs) {
            techSpecs = JSON.parse(product.technicalSpecs);
        }
    } catch (e) {
        console.error("Failed to parse technicalSpecs", e);
    }

    const faqs = product.faqs.map(faq => ({
        question: lang === "tr" ? faq.questionTr : faq.questionEn,
        answer: lang === "tr" ? faq.answerTr : faq.answerEn,
    }));

    // Parse gallery
    let galleryImages: string[] = [];
    try {
        if (product.gallery) {
            galleryImages = JSON.parse(product.gallery);
        }
    } catch (e) {
        console.error("Failed to parse gallery", e);
    }

    // Combine main image and gallery
    const allImages = [product.image || "/defaults/product-default.png", ...galleryImages].filter(Boolean);

    // Fetch related products
    const relatedProducts = await prisma.productCategory.findMany({
        where: {
            NOT: { id: product.id },
            isActive: true
        },
        orderBy: { order: 'asc' }
    });

    // Fetch related Industries for sidebar
    let relatedIndustriesSlugs: string[] = [];
    try {
        if (product.relatedIndustries) {
            relatedIndustriesSlugs = JSON.parse(product.relatedIndustries);
        }
    } catch (e) {
        console.error("Failed to parse relatedIndustries", e);
    }

    const relatedIndustriesData = relatedIndustriesSlugs.length > 0
        ? await prisma.industry.findMany({
            where: { slug: { in: relatedIndustriesSlugs }, isActive: true },
            select: { slug: true, nameTr: true, nameEn: true }
        })
        : [];

    const relatedIndustries = relatedIndustriesData.map(ind => ({
        name: lang === "tr" ? ind.nameTr : ind.nameEn,
        slug: ind.slug
    }));

    return (
        <>
            <section className="py-12">
                <div className="container">
                    <div className={styles.content}>
                        <div className={styles.mainContent}>
                            <ProductGallery
                                images={allImages}
                                alt={lang === "tr" ? (product.imageAltTr || name) : (product.imageAltEn || name)}
                            />
                            <h2>{lang === "tr" ? `${name} Nedir?` : `What is ${name}?`}</h2>
                            <div className={styles.longDesc}>
                                {(longDesc || "").split("\n\n").map((paragraph, i) => (
                                    <p key={i}>{paragraph}</p>
                                ))}
                            </div>

                            {/* Usage Areas */}
                            {usageAreas.length > 0 && (
                                <>
                                    <h2>{lang === "tr" ? "Kullanım Alanları" : "Usage Areas"}</h2>
                                    <ul className={styles.usageList}>
                                        {usageAreas.map((area, i) => (
                                            <li key={i}>{area}</li>
                                        ))}
                                    </ul>
                                </>
                            )}

                            {/* Technical Specs */}
                            {techSpecs.length > 0 && (
                                <>
                                    <h2>{lang === "tr" ? "Teknik Özellikler" : "Technical Specifications"}</h2>
                                    <table className={styles.specsTable}>
                                        <tbody>
                                            {techSpecs.map((spec, i) => (
                                                <tr key={i}>
                                                    <th>{spec.label}</th>
                                                    <td>{lang === "tr" ? spec.valueTr : spec.valueEn}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </>
                            )}

                            {/* FAQ */}
                            {faqs.length > 0 && (
                                <>
                                    <h2>{lang === "tr" ? "Sıkça Sorulan Sorular" : "Frequently Asked Questions"}</h2>
                                    <div className={styles.faqList}>
                                        {faqs.map((faq, i) => (
                                            <details key={i} className={styles.faqItem}>
                                                <summary>{faq.question}</summary>
                                                <p>{faq.answer}</p>
                                            </details>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Sidebar */}
                        <aside className={styles.sidebar}>
                            <div className={styles.ctaCard}>
                                <h3>{lang === "tr" ? "Teklif Alın" : "Get a Quote"}</h3>
                                <p>
                                    {lang === "tr"
                                        ? "Özel üretim ihtiyaçlarınız için bugün bizimle iletişime geçin."
                                        : "Contact us today for your custom production needs."}
                                </p>
                                <Link href={`/${lang}/${paths.quote}`} className="btn btn-secondary">
                                    {lang === "tr" ? "Teklif İste" : "Request Quote"}
                                    <ArrowRight size={18} />
                                </Link>
                            </div>

                            <div className={styles.contactCard}>
                                <h3>{lang === "tr" ? "İletişim" : "Contact"}</h3>
                                <p><strong>{lang === "tr" ? "Telefon" : "Phone"}:</strong> +90 532 676 34 88</p>
                                <p><strong>Email:</strong> info@aktifyay.com.tr</p>
                            </div>

                            {/* Related Industries Sidebar */}
                            {relatedIndustries.length > 0 && (
                                <div className={styles.ctaCard} style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                                    <h3 style={{ color: '#1a202c' }}>{lang === "tr" ? "Kullanım Alanları" : "Used In Industries"}</h3>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                        {relatedIndustries.map((ind, i) => (
                                            <li key={i} style={{ marginBottom: '0.75rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
                                                <Link href={`/${lang}/${paths.industries}/${ind.slug}`} style={{ color: '#2d3748', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontWeight: 500 }}>
                                                    {ind.name}
                                                    <ArrowRight size={16} color="#ed8936" />
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </aside>
                    </div >
                </div >
            </section >

            {/* Related Products Section */}
            {relatedProducts.length > 0 && (
                <section className={styles.relatedSection}>
                    <div className="container">
                        <div className="section-title">
                            <h2>{lang === "tr" ? "Diğer Ürünlerimiz" : "Other Products"}</h2>
                            <p>
                                {lang === "tr"
                                    ? "İlginizi çekebilecek diğer endüstriyel yay çözümlerimiz"
                                    : "Other industrial spring solutions you might be interested in"}
                            </p>
                        </div>
                        <div className={styles.relatedGrid}>
                            {relatedProducts.map((p) => (
                                <Link
                                    key={p.slug}
                                    href={`/${lang}/${lang === "tr" ? "urunler" : "products"}/${p.slug}`}
                                    className={styles.relatedCard}
                                >
                                    <div className={styles.relatedImage}>
                                        <Image
                                            src={p.image || "/defaults/product-default.png"}
                                            alt={lang === "tr" ? (p.imageAltTr || p.nameTr) : (p.imageAltEn || p.nameEn)}
                                            fill
                                            className={styles.relatedImg}
                                        />
                                    </div>
                                    <div className={styles.relatedContent}>
                                        <h3>{lang === "tr" ? p.nameTr : p.nameEn}</h3>
                                        <p>{lang === "tr" ? p.descriptionTr : p.descriptionEn}</p>
                                        <span className={styles.relatedLink}>
                                            {lang === "tr" ? "Detayları Gör" : "View Details"}
                                            <ArrowRight size={16} />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
