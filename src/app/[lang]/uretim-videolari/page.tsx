
import { Metadata } from "next";
import Link from "next/link";
import { Locale, pathMappings } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";
import { generateBreadcrumbSchema } from "@/lib/seo";
import styles from "./page.module.css";
import VideoGrid from "./VideoGrid";

interface PageProps {
    params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { lang } = await params;

    return {
        title: lang === "tr"
            ? "Üretim Videoları | Aktif Yay"
            : "Production Videos | Aktif Yay",
        description: lang === "tr"
            ? "Aktif Yay üretim tesisimizden kareler ve ürün tanıtım videoları."
            : "Videos from our production facility and product showcases.",
        alternates: {
            languages: {
                "tr": "/tr/uretim-videolari",
                "en": "/en/production-videos",
            }
        }
    };
}

export default async function VideoGalleryPage({ params }: PageProps) {
    const { lang } = await params;
    const paths = pathMappings[lang];

    const videosData = await prisma.video.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" }
    });

    const videos = videosData.map(v => ({
        id: v.id,
        youtubeUrl: v.youtubeUrl,
        title: lang === "tr" ? v.titleTr : v.titleEn,
        description: lang === "tr" ? v.descTr : v.descEn,
    }));

    const breadcrumbItems = [
        { name: lang === "tr" ? "Ana Sayfa" : "Home", url: `/${lang}` },
        { name: lang === "tr" ? "Üretim Videoları" : "Production Videos", url: `/${lang}/${paths.videos}` },
    ];

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbItems)),
                }}
            />

            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                <div className="container">
                    <ol>
                        <li><Link href={`/${lang}`}>{lang === "tr" ? "Ana Sayfa" : "Home"}</Link></li>
                        <li aria-current="page">{lang === "tr" ? "Üretim Videoları" : "Production Videos"}</li>
                    </ol>
                </div>
            </nav>

            <section className={styles.hero}>
                <div className="container">
                    <h1>{lang === "tr" ? "Üretim Videoları" : "Production Videos"}</h1>
                    <p>
                        {lang === "tr"
                            ? "Modern üretim tesisimizden ve ürünlerimizden görüntüler"
                            : "Scenes from our modern production facility and products"}
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    {videos.length > 0 ? (
                        <VideoGrid videos={videos} />
                    ) : (
                        <div className="text-center py-10 text-gray-500">
                            {lang === "tr" ? "Henüz video eklenmemiş." : "No videos added yet."}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
