import { Metadata } from "next";
import { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { prisma } from "@/lib/prisma";
import styles from "./page.module.css";
import { Printer } from "lucide-react";
import PrintButton from "./PrintButton"; // We'll create this small client component

interface CatalogPageProps {
    params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({ params }: CatalogPageProps): Promise<Metadata> {
    const { lang } = await params;
    const dict = getDictionary(lang);
    return {
        title: `${dict.catalog.title} | Aktif Yay`,
        robots: { index: false, follow: false },
    };
}

export default async function CatalogPage({ params }: CatalogPageProps) {
    const { lang } = await params;
    const dict = getDictionary(lang);

    // Fetch Data
    const settings = await prisma.siteSettings.findFirst();
    const aboutPage = await prisma.page.findUnique({ where: { slug: "hakkimizda" } });
    const products = await prisma.productCategory.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" }
    });

    const currentDate = new Date().toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', {
        year: 'numeric',
        month: 'long'
    });

    // Strip HTML tags for clean text
    const stripHtml = (html: string | null) => {
        if (!html) return "";
        return html.replace(/<[^>]*>?/gm, '');
    };

    const aboutText = stripHtml((lang === "tr" ? aboutPage?.contentTr : aboutPage?.contentEn) ?? null);
    const shortAbout = aboutText.length > 800 ? aboutText.substring(0, 800) + "..." : aboutText;

    return (
        <div className={styles.container}>
            {/* Print Button (Client Component) */}
            <PrintButton label={dict.catalog.print} className={styles.printControl} />

            {/* COVER PAGE */}
            <div className={`${styles.page} ${styles.coverPage}`}>
                {settings?.logo && (
                    <img src={settings.logo} alt="Aktif Yay" className={styles.coverLogo} />
                )}

                <h1 className={styles.coverTitle}>{dict.catalog.title}</h1>
                <div className={styles.coverYear}>2026</div>

                <div className={styles.coverFooter}>
                    <p>{settings?.siteName || "AKTİF YAY SAN. ve TİC. LTD. ŞTİ."}</p>
                    <p>{currentDate}</p>
                </div>
            </div>

            {/* INTRO PAGE */}
            <div className={`${styles.page} ${styles.introPage}`}>
                <div className={styles.pageHeader}>
                    <span className={styles.headerTitle}>{dict.nav.about}</span>
                    <span className={styles.headerLogo}>AKTİF YAY</span>
                </div>

                <div className={styles.introContent}>
                    <h2>{lang === "tr" ? "Hakkımızda" : "About Us"}</h2>
                    <p>{shortAbout}</p>

                    <div style={{ marginTop: '4rem' }}>
                        <h2>{lang === "tr" ? "Kalite Politikamız" : "Quality Policy"}</h2>
                        <p>
                            {lang === "tr"
                                ? "Müşteri memnuniyetini en üst düzeyde tutmak, teknolojik gelişmeleri takip etmek ve ISO standartlarında üretim yaparak sektörde öncü olmak temel politikamızdır."
                                : "Our basic policy is to keep customer satisfaction at the highest level, to follow technological developments and to be a pioneer in the sector by producing in ISO standards."}
                        </p>
                    </div>
                </div>
            </div>

            {/* PRODUCT PAGES */}
            {products.map((product) => (
                <div key={product.id} className={`${styles.page} ${styles.productPage}`}>
                    <div className={styles.pageHeader}>
                        <span className={styles.headerTitle}>{lang === "tr" ? product.nameTr : product.nameEn}</span>
                        <span className={styles.headerLogo}>AKTİF YAY</span>
                    </div>

                    {product.image && (
                        <div className="image-container" style={{ width: '100%', height: '300px', overflow: 'hidden', borderRadius: '8px', marginBottom: '2rem' }}>
                            <img
                                src={product.image}
                                alt={lang === "tr" ? product.nameTr : product.nameEn}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    )}

                    <div className={styles.productDescription}>
                        <p>{lang === "tr" ? product.descriptionTr : product.descriptionEn}</p>
                    </div>

                    {/* If we had technical specs JSON, we would render it here */}
                    {/* For now, we simulate a standard table if needed or just leave description */}
                    <div style={{ marginTop: 'auto', borderTop: '1px solid #eee', paddingTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
                        {lang === "tr" ? "Detaylı teknik bilgi ve özel üretim talepleriniz için bizimle iletişime geçiniz." : "Please contact us for detailed technical information and custom production requests."}
                    </div>
                </div>
            ))}

            {/* BACK COVER */}
            <div className={`${styles.page} ${styles.backCover}`}>
                <h2 style={{ fontSize: '2rem', marginBottom: '3rem' }}>{dict.catalog.contactInfo}</h2>

                <div className={styles.contactInfo}>
                    <div className={styles.contactItem}>
                        <span className={styles.contactLabel}>{dict.common.phone}</span>
                        {settings?.phone || "+90 332 345 67 89"}
                    </div>

                    <div className={styles.contactItem}>
                        <span className={styles.contactLabel}>{dict.common.email}</span>
                        {settings?.email || "info@aktifyay.com.tr"}
                    </div>

                    <div className={styles.contactItem}>
                        <span className={styles.contactLabel}>{dict.common.address}</span>
                        <div style={{ maxWidth: '400px', margin: '0 auto', lineHeight: '1.4' }}>
                            {settings?.address || "Konya, Türkiye"}
                        </div>
                    </div>

                    <div style={{ marginTop: '4rem', opacity: 0.8 }}>
                        www.aktifyay.com.tr
                    </div>
                </div>
            </div>
        </div>
    );
}
