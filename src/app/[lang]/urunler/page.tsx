import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Locale, pathMappings } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { generateSEOMetadata, generateBreadcrumbSchema } from "@/lib/seo";
import { prisma } from "@/lib/prisma";
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

    const productsData = await prisma.productCategory.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" }
    });

    const products = productsData.map(product => ({
        name: lang === "tr" ? product.nameTr : product.nameEn,
        slug: product.slug,
        description: lang === "tr" ? product.descriptionTr : product.descriptionEn,
        image: product.image || "/defaults/product-default.png",
        imageAlt: lang === "tr" ? (product.imageAltTr || product.nameTr) : (product.imageAltEn || product.nameEn),
    }));

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
                        {products.length > 0 ? (
                            products.map((product) => (
                                <Link
                                    key={product.slug}
                                    href={`/${lang}/${paths.products}/${product.slug}`}
                                    className={styles.card}
                                >
                                    <div className={styles.cardImage}>
                                        <img
                                            src={product.image}
                                            alt={product.imageAlt}
                                            className={styles.image}
                                        />
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
                            ))
                        ) : (
                            <div className="col-span-full text-center py-10 text-gray-500">
                                {lang === "tr" ? "Henüz ürün eklenmemiş." : "No products added yet."}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
