import { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { generateSEOMetadata } from "@/lib/seo";
import styles from "./page.module.css";
import { Metadata } from "next";

interface DynamicPageProps {
    params: Promise<{
        lang: Locale;
        slug: string;
    }>;
}

export async function generateMetadata({ params }: DynamicPageProps): Promise<Metadata> {
    const { lang, slug } = await params;

    // Check standard pages first (DB pages)
    const page = await prisma.page.findUnique({
        where: { slug },
    });

    if (page) {
        return generateSEOMetadata({
            title: lang === "tr"
                ? (page.metaTitleTr || page.titleTr || "")
                : (page.metaTitleEn || page.titleEn || ""),
            description: lang === "tr"
                ? (page.metaDescriptionTr || page.descriptionTr || "")
                : (page.metaDescriptionEn || page.descriptionEn || ""),
            locale: lang,
            path: `/${slug}`,
        });
    }

    return {
        title: "Page Not Found"
    };
}

export default async function DynamicPage({ params }: DynamicPageProps) {
    const { lang, slug } = await params;

    const page = await prisma.page.findUnique({
        where: { slug },
    });

    if (!page || !page.isActive) {
        notFound();
    }

    const title = lang === "tr" ? (page.titleTr || "") : (page.titleEn || "");
    const content = lang === "tr" ? (page.contentTr || "") : (page.contentEn || "");

    return (
        <main className={styles.main}>
            <div className="container">
                <article className={styles.article}>
                    <h1 className={styles.title}>{title}</h1>
                    <div
                        className={styles.content}
                        dangerouslySetInnerHTML={{ __html: content || "" }}
                    />
                </article>
            </div>
        </main>
    );
}
