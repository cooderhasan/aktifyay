import { Locale, locales } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Eye, User, Clock } from "lucide-react";
import styles from "./page.module.css";
import BlogSidebar from "@/components/blog/BlogSidebar";

interface BlogPostPageProps {
    params: Promise<{ lang: Locale; slug: string }>;
}

// Fallback types
type BlogPost = any;

async function getPost(slug: string) {
    const post = await prisma.blogPost.findUnique({
        where: { slug },
        include: { category: true }
    });
    return post as BlogPost;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { lang, slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        return {
            title: "Yazı Bulunamadı",
        };
    }

    const title = lang === "tr" ? (post.metaTitleTr || post.titleTr) : (post.metaTitleEn || post.titleEn);
    const description = lang === "tr" ? (post.metaDescriptionTr || post.descriptionTr) : (post.metaDescriptionEn || post.descriptionEn);

    // OG Data
    const ogTitle = lang === "tr" ? (post.ogTitleTr || title) : (post.ogTitleEn || title);
    const ogDesc = lang === "tr" ? (post.ogDescriptionTr || description) : (post.ogDescriptionEn || description);
    const ogImage = post.ogImage || post.image;

    return {
        title: `${title} | Aktif Yay`,
        description,
        keywords: lang === "tr" ? post.keywordsTr : post.keywordsEn,
        alternates: {
            canonical: post.canonicalUrl,
        },
        robots: post.robots || "index, follow",
        openGraph: {
            title: ogTitle,
            description: ogDesc || undefined,
            images: ogImage ? [ogImage] : [],
            type: "article",
            publishedTime: post.publishedAt?.toISOString(),
            modifiedTime: post.updatedAt?.toISOString(),
            authors: [post.authorName || "Aktif Yay"],
        },
        twitter: {
            card: "summary_large_image",
            title: ogTitle,
            description: ogDesc || undefined,
            images: ogImage ? [ogImage] : [],
        }
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { lang, slug } = await params;
    const post = await getPost(slug);

    if (!post || (!post.isPublished && !post.publishedAt)) {
        notFound();
    }

    const title = lang === "tr" ? post.titleTr : post.titleEn;
    const content = (lang === "tr" ? post.contentTr : post.contentEn)?.replace(/&nbsp;/g, ' ');
    const imageAlt = lang === "tr" ? post.imageAltTr : post.imageAltEn;
    const categoryName = post.category ? (lang === "tr" ? post.category.nameTr : post.category.nameEn) : null;
    const author = post.authorName || "Aktif Yay";

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat(lang === "tr" ? "tr-TR" : "en-US", {
            day: "numeric",
            month: "long",
            year: "numeric"
        }).format(date);
    };

    // Schema.org Structured Data
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "image": post.image ? [post.image] : [],
        "datePublished": post.publishedAt?.toISOString(),
        "dateModified": post.updatedAt?.toISOString(),
        "author": {
            "@type": "Person",
            "name": author
        },
        "publisher": {
            "@type": "Organization",
            "name": "Aktif Yay",
            "logo": {
                "@type": "ImageObject",
                "url": "https://aktifyay.com/logo.png" // Replace with actual logo URL
            }
        },
        "description": lang === "tr" ? post.descriptionTr : post.descriptionEn,
        "articleBody": content?.replace(/<[^>]*>?/gm, "").substring(0, 150) + "..."
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": lang === "tr" ? "Ana Sayfa" : "Home",
                "item": `https://aktifyay.com/${lang}`
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": `https://aktifyay.com/${lang}/blog`
            },
            ...(post.category ? [{
                "@type": "ListItem",
                "position": 3,
                "name": categoryName,
                "item": `https://aktifyay.com/${lang}/blog/kategori/${post.category.slug}`
            }] : []),
            {
                "@type": "ListItem",
                "position": post.category ? 4 : 3,
                "name": title,
                "item": `https://aktifyay.com/${lang}/blog/${slug}`
            }
        ]
    };

    return (
        <main className={styles.page}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <div className="container">
                <div className={styles.breadcrumbs}>
                    <Link href={`/${lang}`}>
                        {lang === "tr" ? "Ana Sayfa" : "Home"}
                    </Link>
                    <span>/</span>
                    <Link href={`/${lang}/blog`}>
                        Blog
                    </Link>
                    {categoryName && (
                        <>
                            <span>/</span>
                            <Link href={`/${lang}/blog/kategori/${post.category.slug}`}>
                                {categoryName}
                            </Link>
                        </>
                    )}
                    <span>/</span>
                    <span>{title}</span>
                </div>

                <div className={styles.layoutGrid}>
                    <article className={styles.article}>
                        <header className={styles.header}>
                            <h1 className={styles.title}>{title}</h1>

                            <div className={styles.meta}>
                                <div className={styles.metaItem}>
                                    <Calendar size={16} />
                                    <span>{formatDate(post.createdAt)}</span>
                                </div>
                                <div className={styles.metaItem}>
                                    <User size={16} />
                                    <span>{author}</span>
                                </div>
                                {post.readingTime > 0 && (
                                    <div className={styles.metaItem}>
                                        <Clock size={16} />
                                        <span>{post.readingTime} {lang === "tr" ? "dk okuma" : "min read"}</span>
                                    </div>
                                )}
                                <div className={styles.metaItem}>
                                    <Eye size={16} />
                                    <span>{post.viewCount} {lang === "tr" ? "Görüntülenme" : "Views"}</span>
                                </div>
                            </div>
                        </header>

                        {post.image && (
                            <div className={styles.imageWrapper}>
                                <img
                                    src={post.image}
                                    alt={imageAlt || title}
                                    className={styles.image}
                                />
                            </div>
                        )}

                        <div
                            className={styles.content}
                            dangerouslySetInnerHTML={{ __html: content || "" }}
                        />
                    </article>

                    <BlogSidebar locale={lang} />
                </div>
            </div>
        </main>
    );
}

export function generateStaticParams(): { lang: Locale }[] {
    return locales.map((lang) => ({ lang }));
}
