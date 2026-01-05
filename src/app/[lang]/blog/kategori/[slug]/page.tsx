import { Locale, locales } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import styles from "./page.module.css";
import BlogSidebar from "@/components/blog/BlogSidebar";

interface BlogCategoryPageProps {
    params: Promise<{ lang: Locale; slug: string }>;
}

export async function generateMetadata({ params }: BlogCategoryPageProps): Promise<Metadata> {
    const { lang, slug } = await params;

    // Fallback type for prisma
    const category: any = await prisma.blogCategory.findUnique({
        where: { slug },
    });

    if (!category) return { title: "Kategori Bulunamadı" };

    const name = lang === "tr" ? category.nameTr : category.nameEn;
    const title = lang === "tr"
        ? (category.metaTitleTr || `${name} - Blog - Aktif Yay`)
        : (category.metaTitleEn || `${name} - Blog - Aktif Yay`);

    const description = lang === "tr" ? category.metaDescriptionTr : category.metaDescriptionEn;

    return {
        title,
        description,
    };
}

type BlogPost = any;

export default async function BlogCategoryPage({ params }: BlogCategoryPageProps) {
    const { lang, slug } = await params;

    const category: any = await prisma.blogCategory.findUnique({
        where: { slug },
        include: {
            posts: {
                where: { isPublished: true },
                orderBy: { createdAt: "desc" },
            }
        },
    });

    if (!category) {
        notFound();
    }

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat(lang === "tr" ? "tr-TR" : "en-US", {
            day: "numeric",
            month: "long",
            year: "numeric"
        }).format(date);
    };

    const catName = lang === "tr" ? category.nameTr : category.nameEn;
    const catDesc = lang === "tr" ? category.descriptionTr : category.descriptionEn;

    return (
        <main className={styles.page}>
            <div className="container">
                <header className={styles.header}>
                    <h1>{catName}</h1>
                    {catDesc && <p>{catDesc}</p>}
                </header>

                <div className={styles.layoutGrid}>
                    {/* Main Content */}
                    <div className={styles.grid}>
                        {category.posts.length === 0 ? (
                            <div className={styles.empty}>
                                <p>{lang === "tr" ? "Bu kategoride henüz yazı yok." : "No posts in this category."}</p>
                            </div>
                        ) : (
                            category.posts.map((post: BlogPost) => {
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

export function generateStaticParams() {
    return locales.map((lang) => ({ lang }));
}
