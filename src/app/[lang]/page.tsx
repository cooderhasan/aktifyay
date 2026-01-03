import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Settings, Shield, Truck, Award } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { generateSEOMetadata } from "@/lib/seo";
import styles from "./page.module.css";

interface HomePageProps {
    params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
    const { lang } = await params;
    const dict = getDictionary(lang);

    return generateSEOMetadata({
        title: dict.seo.homeTitle,
        description: dict.seo.homeDescription,
        locale: lang,
        path: "",
    });
}

export default async function HomePage({ params }: HomePageProps) {
    const { lang } = await params;
    const dict = getDictionary(lang);

    const products = [
        {
            name: dict.products.compressionSprings,
            slug: lang === "tr" ? "basma-yaylar" : "compression-springs",
            description: lang === "tr"
                ? "Mekanik kuvvetlerin kontrolü ve enerji depolama için tasarlanmış yaylar"
                : "Springs designed for mechanical force control and energy storage",
        },
        {
            name: dict.products.extensionSprings,
            slug: lang === "tr" ? "cekme-yaylar" : "extension-springs",
            description: lang === "tr"
                ? "Çekme kuvveti yaratarak enerji depolayan kritik yay türü"
                : "Critical spring type that stores energy by creating pulling force",
        },
        {
            name: dict.products.wireForms,
            slug: lang === "tr" ? "tel-form" : "wire-forms",
            description: lang === "tr"
                ? "Sabitleme ve bağlantı amaçlı özel geometrik tel ürünleri"
                : "Custom geometric wire products for fastening and connection",
        },
        {
            name: dict.products.torsionSprings,
            slug: lang === "tr" ? "kurma-yaylar" : "torsion-springs",
            description: lang === "tr"
                ? "Dönme kuvvetine dayanacak şekilde tasarlanmış yaylar"
                : "Springs designed to withstand rotational force",
        },
    ];

    const industries = [
        { name: dict.industries.automotive, slug: lang === "tr" ? "otomotiv" : "automotive" },
        { name: dict.industries.defense, slug: lang === "tr" ? "savunma-sanayi" : "defense-industry" },
        { name: dict.industries.agriculture, slug: lang === "tr" ? "tarim-ziraat" : "agriculture" },
        { name: dict.industries.furniture, slug: lang === "tr" ? "mobilya" : "furniture" },
        { name: dict.industries.appliances, slug: lang === "tr" ? "beyaz-esya" : "home-appliances" },
        { name: dict.industries.medical, slug: lang === "tr" ? "medikal" : "medical" },
        { name: dict.industries.aviation, slug: lang === "tr" ? "havacilik" : "aviation" },
        { name: dict.industries.electronics, slug: lang === "tr" ? "elektrik-elektronik" : "electronics" },
    ];

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

    return (
        <>
            {/* Hero Section */}
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
                                <span>{industry.name}</span>
                                <ArrowRight size={18} />
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
