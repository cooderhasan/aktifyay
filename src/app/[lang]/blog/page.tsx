import { Locale, locales } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import styles from "./page.module.css";
import BlogSidebar from "@/components/blog/BlogSidebar";
import { generateBreadcrumbSchema } from "@/lib/seo";

interface BlogPageProps {
    params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
    const { lang } = await params;
    const title = lang === "tr" ? "Blog - Aktif Yay" : "Blog - Aktif Yay";
    const description = lang === "tr"
        ? "Endüstriyel yay üretimi hakkında güncel bilgiler, sektörel haberler ve teknik makaleler."
        : "Latest updates, industry news and technical articles about industrial spring manufacturing.";

    return {
        title,
        description,
    };
}

// Fallback type until prisma generate works
type BlogPost = any;

export default async function BlogPage({ params }: BlogPageProps) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aktifyay.com.tr";

    const posts = await prisma.blogPost.findMany({
        where: { isPublished: true },
        orderBy: { createdAt: "desc" },
    });

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat(lang === "tr" ? "tr-TR" : "en-US", {
            day: "numeric",
            month: "long",
            year: "numeric"
        }).format(date);
    };

    const breadcrumbItems = [
        { name: lang === "tr" ? "Ana Sayfa" : "Home", url: `${SITE_URL}/${lang}` },
        { name: "Blog", url: `${SITE_URL}/${lang}/blog` },
    ];

    return (
        <main className={styles.page}>
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
                        <li aria-current="page">Blog</li>
                    </ol>
                </div>
            </nav>

            <div className={styles.hero}>
                <div className="container">
                    <h1>{lang === "tr" ? "Blog" : "Blog"}</h1>
                    <p>
                        {lang === "tr"
                            ? "Sektörden haberler, teknik bilgiler ve duyurular."
                            : "Industry news, technical information and announcements."}
                    </p>
                </div>
            </div>

            <div className="container">

                <div className={styles.layoutGrid}>
                    {/* Main Content */}
                    <div className={styles.grid}>
                        {posts.length === 0 ? (
                            <div className={styles.empty}>
                                <p>{lang === "tr" ? "Henüz yazı eklenmemiş." : "No posts yet."}</p>
                            </div>
                        ) : (
                            posts.map((post: BlogPost) => {
                                const title = lang === "tr" ? post.titleTr : post.titleEn;
                                const desc = lang === "tr" ? post.descriptionTr : post.descriptionEn;
                                const imageAlt = lang === "tr" ? post.imageAltTr : post.imageAltEn;

                                return (
                                    <article key={post.id} className={styles.card}>
                                        <div className={styles.imageWrapper}>
                                            {post.image ? (
                                                <img
                                                    src={post.image}
                                                    alt={imageAlt || title}
                                                    className={styles.image}
                                                />
                                            ) : (
                                                <div className={styles.image} style={{ background: '#f3f4f6' }} />
                                            )}
                                        </div>
                                        <div className={styles.content}>
                                            <div className={styles.date}>
                                                <Calendar size={14} style={{ display: 'inline', marginRight: 4 }} />
                                                {formatDate(post.createdAt)}
                                            </div>
                                            <h2 className={styles.title}>
                                                <Link href={`/${lang}/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                    {title}
                                                </Link>
                                            </h2>
                                            <p className={styles.description}>
                                                {desc}
                                            </p>
                                            <div className={styles.footer}>
                                                <Link href={`/${lang}/blog/${post.slug}`} className={styles.readMore}>
                                                    {lang === "tr" ? "Devamını Oku" : "Read More"} <ArrowRight size={14} style={{ display: 'inline', marginLeft: 4 }} />
                                                </Link>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })
                        )}
                    </div>

                    {/* Sidebar */}
                    <BlogSidebar locale={lang} />
                </div>
            </div>
        </main>
    );
}

export function generateStaticParams(): { lang: Locale }[] {
    return locales.map((lang) => ({ lang }));
}
