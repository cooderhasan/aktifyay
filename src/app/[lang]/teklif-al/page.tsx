import { Metadata } from "next";
import Link from "next/link";
import { Locale, pathMappings } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { generateSEOMetadata, generateBreadcrumbSchema } from "@/lib/seo";
import QuoteForm from "@/components/forms/QuoteForm";
import styles from "./page.module.css";

interface QuotePageProps {
    params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({ params }: QuotePageProps): Promise<Metadata> {
    const { lang } = await params;

    return generateSEOMetadata({
        title: lang === "tr"
            ? "Teklif Al | Aktif Yay - Yay Üretimi Konya"
            : "Request Quote | Aktif Yay - Spring Manufacturing Turkey",
        description: lang === "tr"
            ? "Yay üretimi için hızlı teklif alın. Basma yay, çekme yay, kurma yay ve tel form ürünleri için fiyat teklifi."
            : "Get a quick quote for spring manufacturing. Price quotes for compression, extension, torsion springs and wire forms.",
        locale: lang,
        path: `/${lang === "tr" ? "teklif-al" : "request-quote"}`,
    });
}

export default async function QuotePage({ params }: QuotePageProps) {
    const { lang } = await params;
    const dict = getDictionary(lang);
    const paths = pathMappings[lang];

    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aktifyay.com.tr";

    const breadcrumbItems = [
        { name: lang === "tr" ? "Ana Sayfa" : "Home", url: `${SITE_URL}/${lang}` },
        { name: dict.nav.quote, url: `${SITE_URL}/${lang}/${paths.quote}` },
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
                        <li aria-current="page">{dict.nav.quote}</li>
                    </ol>
                </div>
            </nav>

            {/* Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <h1>{dict.nav.quote}</h1>
                    <p>
                        {lang === "tr"
                            ? "Yay ihtiyaçlarınız için hızlı teklif alın. Uzman ekibimiz size en uygun çözümü sunacaktır."
                            : "Get a quick quote for your spring needs. Our expert team will provide you with the best solution."}
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="section">
                <div className="container">
                    <div className={styles.grid}>
                        {/* Form */}
                        <div className={styles.formSection}>
                            <h2>{lang === "tr" ? "Teklif Formu" : "Quote Form"}</h2>
                            <QuoteForm lang={lang} dict={dict} />
                        </div>

                        {/* Info */}
                        <div className={styles.info}>
                            <div className={styles.infoCard}>
                                <h3>{lang === "tr" ? "Neden Bizi Seçmelisiniz?" : "Why Choose Us?"}</h3>
                                <ul>
                                    <li>{lang === "tr" ? "30+ yıllık tecrübe" : "30+ years of experience"}</li>
                                    <li>{lang === "tr" ? "Hızlı teslimat" : "Fast delivery"}</li>
                                    <li>{lang === "tr" ? "Rekabetçi fiyatlar" : "Competitive prices"}</li>
                                    <li>{lang === "tr" ? "Özel üretim imkanı" : "Custom manufacturing"}</li>
                                    <li>{lang === "tr" ? "Kalite garantisi" : "Quality guarantee"}</li>
                                </ul>
                            </div>

                            <div className={styles.contactCard}>
                                <h3>{lang === "tr" ? "Hızlı İletişim" : "Quick Contact"}</h3>
                                <p><strong>{dict.common.phone}:</strong> +90 532 676 34 88</p>
                                <p><strong>{dict.common.email}:</strong> info@aktifyay.com.tr</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
