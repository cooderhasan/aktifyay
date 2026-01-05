import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Locale, pathMappings } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { generateSEOMetadata, generateBreadcrumbSchema } from "@/lib/seo";
import { prisma } from "@/lib/prisma";
import styles from "./page.module.css";

interface IndustriesPageProps {
    params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({ params }: IndustriesPageProps): Promise<Metadata> {
    const { lang } = await params;

    return generateSEOMetadata({
        title: lang === "tr"
            ? "Sektörler | Otomotiv, Savunma, Medikal Yay Çözümleri - Aktif Yay"
            : "Industries | Automotive, Defense, Medical Spring Solutions - Aktif Yay",
        description: lang === "tr"
            ? "Aktif Yay olarak otomotiv, savunma sanayi, medikal, beyaz eşya ve daha fazla sektöre yay çözümleri sunuyoruz."
            : "At Aktif Yay, we provide spring solutions for automotive, defense, medical, appliances, and more industries.",
        locale: lang,
        path: `/${lang === "tr" ? "sektorler" : "industries"}`,
    });
}

export default async function IndustriesPage({ params }: IndustriesPageProps) {
    const { lang } = await params;
    const dict = getDictionary(lang);
    const paths = pathMappings[lang];

    const industriesData = await prisma.industry.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" }
    });

    const industries = industriesData.map(industry => ({
        name: lang === "tr" ? industry.nameTr : industry.nameEn,
        slug: industry.slug,
        image: industry.image || "/defaults/industry-default.png",
        imageAlt: lang === "tr" ? (industry.imageAltTr || industry.nameTr) : (industry.imageAltEn || industry.nameEn),
    }));

    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aktifyay.com.tr";

    const breadcrumbItems = [
        { name: lang === "tr" ? "Ana Sayfa" : "Home", url: `${SITE_URL}/${lang}` },
        { name: dict.nav.industries, url: `${SITE_URL}/${lang}/${paths.industries}` },
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
                        <li aria-current="page">{dict.nav.industries}</li>
                    </ol>
                </div>
            </nav>

            {/* Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <h1>{dict.nav.industries}</h1>
                    <p>
                        {lang === "tr"
                            ? "Farklı sektörlere özel yay çözümleri sunuyoruz"
                            : "We provide custom spring solutions for different industries"}
                    </p>
                </div>
            </section>

            {/* Industries Grid */}
            <section className="section">
                <div className="container">
                    <div className={styles.grid}>
                        {industries.length > 0 ? (
                            industries.map((industry) => (
                                <Link
                                    key={industry.slug}
                                    href={`/${lang}/${paths.industries}/${industry.slug}`}
                                    className={styles.card}
                                >
                                    <div className={styles.cardImage}>
                                        <img
                                            src={industry.image}
                                            alt={industry.imageAlt}
                                            className={styles.image}
                                        />
                                    </div>
                                    <div className={styles.cardContent}>
                                        <h2>{industry.name}</h2>
                                        <ArrowRight size={24} />
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-10 text-gray-500">
                                {lang === "tr" ? "Henüz sektör eklenmemiş." : "No industries added yet."}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
