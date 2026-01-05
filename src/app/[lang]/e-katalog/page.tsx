import { Locale, locales } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { Download, FileText } from "lucide-react";
import styles from "./page.module.css";

interface CatalogPageProps {
    params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({ params }: CatalogPageProps): Promise<Metadata> {
    const { lang } = await params;
    const title = lang === "tr" ? "E-Kataloglar - Aktif Yay" : "E-Catalogs - Aktif Yay";
    const description = lang === "tr"
        ? "Aktif Yay ürün kataloglarını inceleyin ve indirin."
        : "View and download Aktif Yay product catalogs.";

    return {
        title,
        description,
    };
}

export default async function CatalogPage({ params }: CatalogPageProps) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    const catalogs = await prisma.catalog.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" },
    });

    return (
        <main className={styles.page}>
            <div className="container">
                <header className={styles.header}>
                    <h1>{lang === "tr" ? "E-Kataloglar" : "E-Catalogs"}</h1>
                    <p>
                        {lang === "tr"
                            ? "Ürünlerimizi ve teknik özelliklerini detaylı incelemek için kataloglarımızı indirebilirsiniz."
                            : "Download our catalogs to explore our products and technical specifications in detail."}
                    </p>
                </header>

                {catalogs.length === 0 ? (
                    <div className={styles.empty}>
                        <p>{lang === "tr" ? "Henüz katalog eklenmemiş." : "No catalogs yet."}</p>
                    </div>
                ) : (
                    <div className={styles.grid}>
                        {catalogs.map((catalog) => {
                            const title = lang === "tr" ? catalog.nameTr : catalog.nameEn;

                            return (
                                <div key={catalog.id} className={styles.card}>
                                    <div className={styles.coverWrapper}>
                                        {catalog.coverImage ? (
                                            <img
                                                src={catalog.coverImage}
                                                alt={title}
                                                className={styles.cover}
                                            />
                                        ) : (
                                            <div className={styles.placeholder}>
                                                <FileText size={48} />
                                            </div>
                                        )}
                                    </div>
                                    <div className={styles.content}>
                                        <h2 className={styles.title}>{title}</h2>
                                        {catalog.pdfUrl ? (
                                            <a
                                                href={catalog.pdfUrl}
                                                target="_blank"
                                                className={styles.downloadBtn}
                                                download // This hints the browser to download
                                            >
                                                <Download size={18} />
                                                {lang === "tr" ? "İndir / Görüntüle" : "Download / View"}
                                            </a>
                                        ) : (
                                            <button className={`${styles.downloadBtn} ${styles.disabled}`} disabled>
                                                {lang === "tr" ? "Dosya Yok" : "No File"}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
}

export function generateStaticParams() {
    return locales.map((lang) => ({ lang }));
}
