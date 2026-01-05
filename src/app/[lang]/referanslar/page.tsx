import { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { generateSEOMetadata } from "@/lib/seo";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import styles from "./page.module.css";
import { getSettings } from "@/actions/settings";
import { Metadata } from "next";

interface ReferencesPageProps {
    params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({ params }: ReferencesPageProps): Promise<Metadata> {
    const { lang } = await params;
    const dict = getDictionary(lang);

    return generateSEOMetadata({
        title: `${dict.nav.references} | Aktif Yay`,
        description: lang === "tr"
            ? "Müşterilerimiz ve iş ortaklarımız. Sektörün öncü firmalarıyla çalışmaktan gurur duyuyoruz."
            : "Our customers and partners. We are proud to work with leading companies in the industry.",
        locale: lang,
        path: "/referanslar",
    });
}

export default async function ReferencesPage({ params }: ReferencesPageProps) {
    const { lang } = await params;
    const dict = getDictionary(lang);

    // @ts-ignore - Prisma Client issue
    const references = await prisma.reference.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" },
    });

    return (
        <main className={styles.main}>
            {/* Header */}
            <section className={styles.header}>
                <div className="container">
                    <h1 className={styles.title}>{dict.nav.references}</h1>
                    <p className={styles.description}>
                        {lang === "tr"
                            ? "Kalite ve güven odaklı üretim anlayışımızla sektörün önde gelen firmalarının çözüm ortağıyız."
                            : "We are the solution partner of the leading companies in the sector with our quality and trust-oriented production approach."}
                    </p>
                </div>
            </section>

            {/* References Grid */}
            <section className={styles.gridSection}>
                <div className="container">
                    {references.length === 0 ? (
                        <div className={styles.empty}>
                            <p>{lang === "tr" ? "Henüz referans eklenmemiş." : "No references added yet."}</p>
                        </div>
                    ) : (
                        <div className={styles.grid}>
                            {references.map((ref: any) => (
                                <div key={ref.id} className={styles.card}>
                                    <div className={styles.imageWrapper}>
                                        <Image
                                            src={ref.image}
                                            alt={ref.name}
                                            fill
                                            className={styles.image}
                                        />
                                    </div>
                                    <div className={styles.name}>{ref.name}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
