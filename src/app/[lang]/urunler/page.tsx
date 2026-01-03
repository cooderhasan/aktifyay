import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Locale, pathMappings } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { generateSEOMetadata, generateBreadcrumbSchema } from "@/lib/seo";
import styles from "./page.module.css";

interface ProductsPageProps {
    params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({ params }: ProductsPageProps): Promise<Metadata> {
    const { lang } = await params;

    return generateSEOMetadata({
        title: lang === "tr"
            ? "Ürünlerimiz | Basma, Çekme, Kurma Yay, Tel Form - Aktif Yay"
            : "Our Products | Compression, Extension, Torsion Springs, Wire Forms - Aktif Yay",
        description: lang === "tr"
            ? "Aktif Yay ürün çeşitleri: Basma yaylar, çekme yaylar, kurma yaylar ve tel form ürünleri. Endüstriyel yay çözümleri."
            : "Aktif Yay product range: Compression springs, extension springs, torsion springs and wire form products.",
        locale: lang,
        path: `/${lang === "tr" ? "urunler" : "products"}`,
    });
}

export default async function ProductsPage({ params }: ProductsPageProps) {
    const { lang } = await params;
    const dict = getDictionary(lang);
    const paths = pathMappings[lang];

    const products = [
        {
            name: dict.products.compressionSprings,
            slug: lang === "tr" ? "basma-yaylar" : "compression-springs",
            description: lang === "tr"
                ? "Mekanik kuvvetlerin kontrolü ve enerji depolama için tasarlanmış yaylar. Silindirik, konik veya varil şeklinde üretilebilir."
                : "Springs designed for mechanical force control and energy storage. Can be manufactured in cylindrical, conical, or barrel shapes.",
        },
        {
            name: dict.products.extensionSprings,
            slug: lang === "tr" ? "cekme-yaylar" : "extension-springs",
            description: lang === "tr"
                ? "Çekme kuvveti yaratarak enerji depolayan kritik yay türü. Farklı kanca tiplerinde üretim yapılır."
                : "Critical spring type that stores energy by creating pulling force. Manufactured with different hook types.",
        },
        {
            name: dict.products.wireForms,
            slug: lang === "tr" ? "tel-form" : "wire-forms",
            description: lang === "tr"
                ? "Özel geometrik şekillere sahip endüstriyel tel bileşenleri. Klipsler, bağlantı elemanları ve özel tasarımlar."
                : "Industrial wire components with custom geometric shapes. Clips, connectors, and custom designs.",
        },
        {
            name: dict.products.torsionSprings,
            slug: lang === "tr" ? "kurma-yaylar" : "torsion-springs",
            description: lang === "tr"
                ? "Dönme kuvvetine dayanarak enerji depolayan yay türü. Menteşe, motor valfi ve mekanizma uygulamaları için."
                : "Spring type that stores energy by resisting rotational force. For hinge, engine valve, and mechanism applications.",
        },
    ];

    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aktifyay.com.tr";

    const breadcrumbItems = [
        { name: lang === "tr" ? "Ana Sayfa" : "Home", url: `${SITE_URL}/${lang}` },
        { name: dict.nav.products, url: `${SITE_URL}/${lang}/${paths.products}` },
    ];

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbItems)),
                }}
            />

            {/* Breadcrumb */}
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                <div className="container">
                    <ol>
                        <li><Link href={`/${lang}`}>{lang === "tr" ? "Ana Sayfa" : "Home"}</Link></li>
                        <li aria-current="page">{dict.nav.products}</li>
                    </ol>
                </div>
            </nav>

            {/* Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <h1>{dict.nav.products}</h1>
                    <p>
                        {lang === "tr"
                            ? "Endüstriyel ihtiyaçlarınız için geniş yay ürün yelpazemizi keşfedin"
                            : "Discover our wide range of spring products for your industrial needs"}
                    </p>
                </div>
            </section>

            {/* Products Grid */}
            <section className="section">
                <div className="container">
                    <div className={styles.grid}>
                        {products.map((product) => (
                            <Link
                                key={product.slug}
                                href={`/${lang}/${paths.products}/${product.slug}`}
                                className={styles.card}
                            >
                                <div className={styles.cardImage}>
                                    <span>{product.name}</span>
                                </div>
                                <div className={styles.cardContent}>
                                    <h2>{product.name}</h2>
                                    <p>{product.description}</p>
                                    <span className={styles.cardLink}>
                                        {dict.common.readMore}
                                        <ArrowRight size={18} />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
