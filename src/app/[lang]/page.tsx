import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Settings, Shield, Truck, Award } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { generateSEOMetadata, generateLocalBusinessSchema } from "@/lib/seo";
import { prisma } from "@/lib/prisma";
import styles from "./page.module.css";
import HeroSlider from "@/components/sections/HeroSlider";
import { getSliders } from "@/actions/slider";

interface HomePageProps {
    params: Promise<{ lang: Locale }>;
}

import { getSettings } from "@/actions/settings";

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
    const { lang } = await params;
    const dict = getDictionary(lang);
    const settings = await getSettings();

    const title = lang === "tr"
        ? (settings?.homeTitleTr || dict.seo.homeTitle)
        : (settings?.homeTitleEn || dict.seo.homeTitle); // Fallback to TR/Default if EN missing but ideally dict has EN

    const description = lang === "tr"
        ? (settings?.homeDescTr || dict.seo.homeDescription)
        : (settings?.homeDescEn || dict.seo.homeDescription);

    return generateSEOMetadata({
        title: title,
        description: description,
        locale: lang,
        path: "",
    });
}

export default async function HomePage({ params }: HomePageProps) {
    const { lang } = await params;
    const dict = getDictionary(lang);
    const settings = await getSettings();

    // Fetch dynamic content
    const [slides, dbProducts, dbIndustries] = await Promise.all([
        getSliders(),
        prisma.productCategory.findMany({
            where: { isActive: true },
            orderBy: { order: 'asc' }
        }),
        prisma.industry.findMany({
            where: { isActive: true },
            orderBy: { order: 'asc' }
        })
    ]);

    const activeSlides = slides.filter((s: any) => s.isActive);

    // Map DB products to UI format
    const products = dbProducts.map(p => ({
        name: lang === "tr" ? p.nameTr : p.nameEn,
        slug: p.slug,
        description: lang === "tr" ? p.descriptionTr : p.descriptionEn,
        image: p.image || "/defaults/product-default.png",
        imageAlt: lang === "tr" ? (p.imageAltTr || p.nameTr) : (p.imageAltEn || p.nameEn)
    }));

    // Map DB industries to UI format
    const industries = dbIndustries.map(i => ({
        name: lang === "tr" ? i.nameTr : i.nameEn,
        slug: i.slug,
        image: i.image || "/defaults/industry-default.png",
        imageAlt: lang === "tr" ? (i.imageAltTr || i.nameTr) : (i.imageAltEn || i.nameEn)
    }));

    const features = [
        {
            icon: Settings,
            title: lang === "tr" ? "30+ Yıllık Tecrübe" : "30+ Years Experience",
            description: lang === "tr"
                ? "1994'ten bu yana endüstriyel yay üretiminde uzmanlık"
                : "Expertise in industrial spring manufacturing since 1994",
        },
        {
            icon: Shield,
            title: lang === "tr" ? "Kalite Güvencesi" : "Quality Assurance",
            description: lang === "tr"
                ? "ISO sertifikalı üretim süreçleri ve kalite kontrol"
                : "ISO certified production processes and quality control",
        },
        {
            icon: Truck,
            title: lang === "tr" ? "Hızlı Teslimat" : "Fast Delivery",
            description: lang === "tr"
                ? "Özel üretim ve standart ürünlerde hızlı teslimat"
                : "Fast delivery for custom and standard products",
        },
        {
            icon: Award,
            title: lang === "tr" ? "Özel Üretim" : "Custom Production",
            description: lang === "tr"
                ? "İhtiyaçlarınıza özel yay tasarımı ve imalatı"
                : "Custom spring design and manufacturing for your needs",
        },
    ];

    const jsonLd = generateLocalBusinessSchema();

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Hero Section */}
            {activeSlides.length > 0 ? (
                <HeroSlider slides={activeSlides} lang={lang} />
            ) : (
                <section className={styles.hero}>
                    <div className="container">
                        <div className={styles.heroContent}>
                            <h1 className={styles.heroTitle}>
                                {lang === "tr" ? (
                                    <>
                                        Endüstriyel <span>Yay Üretiminde</span> 30 Yıllık Tecrübe
                                    </>
                                ) : (
                                    <>
                                        30 Years of Experience in <span>Industrial Spring</span> Manufacturing
                                    </>
                                )}
                            </h1>
                            <p className={styles.heroDescription}>
                                {dict.siteDescription}
                            </p>
                            <div className={styles.heroButtons}>
                                <Link
                                    href={`/${lang}/${lang === "tr" ? "teklif-al" : "request-quote"}`}
                                    className="btn btn-secondary"
                                >
                                    {dict.nav.quote}
                                </Link>
                                <Link
                                    href={`/${lang}/${lang === "tr" ? "urunler" : "products"}`}
                                    className="btn btn-outline"
                                >
                                    {dict.products.viewAll}
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={styles.heroOverlay}></div>
                </section>
            )}

            {/* Features Section */}
            <section className={`section ${styles.features}`}>
                <div className="container">
                    <div className={styles.featuresGrid}>
                        {features.map((feature, index) => (
                            <div key={index} className={styles.featureCard}>
                                <div className={styles.featureIcon}>
                                    <feature.icon size={32} />
                                </div>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="section bg-industrial-light">
                <div className="container">
                    <div className="section-title">
                        <h2>{dict.nav.products}</h2>
                        <p>
                            {lang === "tr"
                                ? "Endüstriyel ihtiyaçlarınız için geniş ürün yelpazemizi keşfedin"
                                : "Discover our wide range of products for your industrial needs"}
                        </p>
                    </div>
                    <div className={styles.productsGrid}>
                        {products.map((product) => (
                            <Link
                                key={product.slug}
                                href={`/${lang}/${lang === "tr" ? "urunler" : "products"}/${product.slug}`}
                                className={styles.productCard}
                            >
                                <div className={styles.productImageWrapper}>
                                    <Image
                                        src={product.image}
                                        alt={product.imageAlt}
                                        fill
                                        className={styles.productImage}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                                <div className={styles.productContent}>
                                    <h3>{product.name}</h3>
                                    <p>{product.description}</p>
                                    <span className={styles.productLink}>
                                        {dict.common.readMore}
                                        <ArrowRight size={16} />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Industries Section */}
            <section className="section">
                <div className="container">
                    <div className="section-title">
                        <h2>{dict.nav.industries}</h2>
                        <p>
                            {lang === "tr"
                                ? "Farklı sektörlere özel yay çözümleri sunuyoruz"
                                : "We provide custom spring solutions for different industries"}
                        </p>
                    </div>
                    <div className={styles.industriesGrid}>
                        {industries.map((industry) => (
                            <Link
                                key={industry.slug}
                                href={`/${lang}/${lang === "tr" ? "sektorler" : "industries"}/${industry.slug}`}
                                className={styles.industryCard}
                            >
                                <div className={styles.industryImageWrapper}>
                                    <Image
                                        src={industry.image}
                                        alt={industry.imageAlt}
                                        fill
                                        className={styles.industryImage}
                                        sizes="(max-width: 768px) 100vw, 25vw"
                                    />
                                    <div className={styles.industryOverlay}></div>
                                </div>
                                <div className={styles.industryContent}>
                                    <span>{industry.name}</span>
                                    <ArrowRight size={18} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.cta}>
                <div className="container">
                    <div className={styles.ctaContent}>
                        <h2>
                            {lang === "tr"
                                ? "Projeniz İçin Teklif Alın"
                                : "Get a Quote for Your Project"}
                        </h2>
                        <p>
                            {lang === "tr"
                                ? "Uzman ekibimiz size en uygun yay çözümünü sunmak için hazır"
                                : "Our expert team is ready to provide you with the best spring solution"}
                        </p>
                        <Link
                            href={`/${lang}/${lang === "tr" ? "teklif-al" : "request-quote"}`}
                            className="btn btn-secondary"
                        >
                            {dict.nav.quote}
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
