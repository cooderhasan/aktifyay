import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Settings, Shield, Truck, Award, BookOpen } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { generateSEOMetadata, generateLocalBusinessSchema } from "@/lib/seo";
import { prisma } from "@/lib/prisma";
import styles from "./page.module.css";
import HeroSlider from "@/components/sections/HeroSlider";
import VideoSection from "@/components/home/VideoSection";
import { getSliders } from "@/actions/slider";
import { getSettings } from "@/actions/settings";

// Force dynamic rendering to prevent build-time database queries
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface HomePageProps {
    params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
    const { lang } = await params;
    const dict = getDictionary(lang);
    const settings = await getSettings();

    const title = lang === "tr"
        ? (settings?.homeTitleTr || dict.seo.homeTitle)
        : (settings?.homeTitleEn || dict.seo.homeTitle);

    const description = lang === "tr"
        ? (settings?.homeDescTr || dict.seo.homeDescription)
        : (settings?.homeDescEn || dict.seo.homeDescription);

    return generateSEOMetadata({
        title: title,
        description: description,
        locale: lang,
        path: "",
    });
}

export default async function HomePage({ params }: HomePageProps) {
    const { lang } = await params;
    const dict = getDictionary(lang);
    const settings = await getSettings();

    // Fetch dynamic content
    // @ts-ignore - Prisma client outdated for Reference model
    const [slides, dbProducts, dbIndustries, latestBlogs, catalogs, references] = await Promise.all([
        getSliders(),
        prisma.productCategory.findMany({
            where: { isActive: true },
            orderBy: { order: 'asc' }
        }),
        prisma.industry.findMany({
            where: { isActive: true },
            orderBy: { order: 'asc' }
        }),
        prisma.blogPost.findMany({
            where: { isPublished: true },
            orderBy: { createdAt: 'desc' },
            take: 3,
            select: {
                id: true,
                slug: true,
                titleTr: true,
                titleEn: true,
                descriptionTr: true,
                descriptionEn: true,
                publishedAt: true,
                createdAt: true,
                image: true,
            }
        }),
        prisma.catalog.findMany({
            where: { isActive: true },
            orderBy: { order: 'asc' },
            take: 4
        }),
        prisma.reference.findMany({
            where: { isActive: true },
            orderBy: { order: 'asc' }
        })
    ]);

    const activeSlides = slides.filter((s: any) => s.isActive);

    // Map DB products to UI format
    const products = dbProducts.map(p => ({
        name: lang === "tr" ? p.nameTr : p.nameEn,
        slug: p.slug,
        description: lang === "tr" ? p.descriptionTr : p.descriptionEn,
        image: p.image || "/defaults/product-default.png",
        imageAlt: lang === "tr" ? (p.imageAltTr || p.nameTr) : (p.imageAltEn || p.nameEn)
    }));

    // Map DB industries to UI format
    const industries = dbIndustries.map(i => ({
        name: lang === "tr" ? i.nameTr : i.nameEn,
        slug: i.slug,
        image: i.image || "/defaults/industry-default.png",
        imageAlt: lang === "tr" ? (i.imageAltTr || i.nameTr) : (i.imageAltEn || i.nameEn)
    }));

    const features = [
        {
            icon: Settings,
            title: lang === "tr" ? "30+ Yıllık Tecrübe" : "30+ Years Experience",
            description: lang === "tr"
                ? "1994'ten bu yana endüstriyel yay üretiminde uzmanlık"
                : "Expertise in industrial spring manufacturing since 1994",
        },
        {
            icon: Shield,
            title: lang === "tr" ? "Kalite Güvencesi" : "Quality Assurance",
            description: lang === "tr"
                ? "ISO sertifikalı üretim süreçleri ve kalite kontrol"
                : "ISO certified production processes and quality control",
        },
        {
            icon: Truck,
            title: lang === "tr" ? "Hızlı Teslimat" : "Fast Delivery",
            description: lang === "tr"
                ? "Özel üretim ve standart ürünlerde hızlı teslimat"
                : "Fast delivery for custom and standard products",
        },
        {
            icon: Award,
            title: lang === "tr" ? "Özel Üretim" : "Custom Production",
            description: lang === "tr"
                ? "İhtiyaçlarınıza özel yay tasarımı ve imalatı"
                : "Custom spring design and manufacturing for your needs",
        },
    ];

    const jsonLd = generateLocalBusinessSchema();

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Hero Section */}
            {activeSlides.length > 0 ? (
                <HeroSlider slides={activeSlides} lang={lang} />
            ) : (
                <section className={styles.hero}>
                    <div className="container">
                        <div className={styles.heroContent}>
                            <h1 className={styles.heroTitle}>
                                {lang === "tr" ? (
                                    <>
                                        Endüstriyel <span>Yay Üretiminde</span> 30 Yıllık Tecrübe
                                    </>
                                ) : (
                                    <>
                                        30 Years of Experience in <span>Industrial Spring</span> Manufacturing
                                    </>
                                )}
                            </h1>
                            <p className={styles.heroDescription}>
                                {dict.siteDescription}
                            </p>
                            <div className={styles.heroButtons}>
                                <Link
                                    href={`/${lang}/${lang === "tr" ? "teklif-al" : "request-quote"}`}
                                    className={styles.heroPrimaryBtn}
                                >
                                    {dict.nav.quote}
                                </Link>
                                <Link
                                    href={`/${lang}/${lang === "tr" ? "urunler" : "products"}`}
                                    className="btn btn-outline"
                                >
                                    {dict.products.viewAll}
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={styles.heroOverlay}></div>
                </section>
            )}

            {/* Features Section */}
            <section className={`section ${styles.features}`}>
                <div className="container">
                    <div className={styles.featuresGrid}>
                        {features.map((feature, index) => (
                            <div key={index} className={styles.featureCard}>
                                <div className={styles.featureIcon}>
                                    <feature.icon size={32} />
                                </div>
                                <h2>{feature.title}</h2>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="section bg-industrial-light">
                <div className="container">
                    <div className="section-title">
                        <h2>{dict.nav.products}</h2>
                        <p>
                            {lang === "tr"
                                ? "Endüstriyel ihtiyaçlarınız için geniş ürün yelpazemizi keşfedin"
                                : "Discover our wide range of products for your industrial needs"}
                        </p>
                    </div>
                    <div className={styles.productsGrid}>
                        {products.map((product) => (
                            <Link
                                key={product.slug}
                                href={`/${lang}/${lang === "tr" ? "urunler" : "products"}/${product.slug}`}
                                className={styles.productCard}
                            >
                                <div className={styles.productImageWrapper}>
                                    <Image
                                        src={product.image}
                                        alt={product.imageAlt}
                                        fill
                                        className={styles.productImage}
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    />
                                </div>
                                <div className={styles.productContent}>
                                    <h3>{product.name}</h3>
                                    <p>{product.description}</p>
                                    <span className={styles.productLink}>
                                        {dict.common.readMore}
                                        <ArrowRight size={16} />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Industries Section */}
            <section className="section">
                <div className="container">
                    <div className="section-title">
                        <h2>{dict.nav.industries}</h2>
                        <p>
                            {lang === "tr"
                                ? "Farklı sektörlere özel yay çözümleri sunuyoruz"
                                : "We provide custom spring solutions for different industries"}
                        </p>
                    </div>
                    <div className={styles.industriesGrid}>
                        {industries.map((industry) => (
                            <Link
                                key={industry.slug}
                                href={`/${lang}/${lang === "tr" ? "sektorler" : "industries"}/${industry.slug}`}
                                className={styles.industryCard}
                            >
                                <div className={styles.industryImageWrapper}>
                                    <Image
                                        src={industry.image}
                                        alt={industry.imageAlt}
                                        fill
                                        className={styles.industryImage}
                                        sizes="(max-width: 768px) 100vw, 25vw"
                                    />
                                    <div className={styles.industryOverlay}></div>
                                </div>
                                <div className={styles.industryContent}>
                                    <h3>{industry.name}</h3>
                                    <ArrowRight size={18} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Split Section: Video (Left) & Latest Blogs (Right) */}
            <section className={styles.splitSection}>
                <div className="container">
                    <div className={styles.splitGrid}>

                        {/* Left: Video */}
                        <div className={styles.splitColumn}>
                            <h2>{lang === "tr" ? "Tanıtım Filmi" : "Intro Video"}</h2>
                            <VideoSection videoUrl={settings?.introVideoUrl || null} embedded={true} />
                            {!settings?.introVideoUrl && (
                                <p style={{ color: '#666', fontStyle: 'italic' }}>
                                    {lang === "tr" ? "Video şuan mevcut değil." : "Video not available at the moment."}
                                </p>
                            )}
                        </div>

                        {/* Right: Latest Blogs */}
                        <div className={styles.splitColumn}>
                            <h2>{lang === "tr" ? "Son Blog Yazıları" : "Latest Blog Posts"}</h2>
                            <div className={styles.blogList}>
                                {latestBlogs.map((post) => {
                                    const date = new Date(post.publishedAt || post.createdAt);
                                    const day = date.getDate();
                                    const month = date.toLocaleString(lang === 'tr' ? 'tr-TR' : 'en-US', { month: 'short' });

                                    return (
                                        <Link
                                            key={post.id}
                                            href={`/${lang}/blog/${post.slug}`}
                                            className={styles.blogItem}
                                        >
                                            <div className={styles.blogImageWrapper}>
                                                <Image
                                                    src={post.image || "/defaults/blog-default.jpg"}
                                                    alt={lang === "tr" ? post.titleTr : post.titleEn}
                                                    fill
                                                    className={styles.blogImage}
                                                />
                                                <div className={styles.blogDateOverlay}>
                                                    <span className={styles.blogDateDay}>{day}</span>
                                                    <span className={styles.blogDateMonth}>{month}</span>
                                                </div>
                                            </div>
                                            <div className={styles.blogContent}>
                                                <h3>{lang === "tr" ? post.titleTr : post.titleEn}</h3>
                                                <p className={styles.blogExcerpt}>
                                                    {lang === "tr" ? post.descriptionTr : post.descriptionEn}
                                                </p>
                                                <span className={styles.readMoreLink}>
                                                    {lang === "tr" ? "Devamını Oku" : "Read More"}
                                                    <ArrowRight size={14} />
                                                </span>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* References Section */}
            {references.length > 0 && (
                <section className={styles.referencesSection}>
                    <div className="container">
                        <div className={styles.sectionTitleCenter}>
                            <h2>{lang === "tr" ? "Referanslarımız" : "Our References"}</h2>
                        </div>
                        <div className={styles.referencesGrid}>
                            {references.map((ref: any) => (
                                <div key={ref.id} className={styles.referenceItem}>
                                    <Image
                                        src={ref.image}
                                        alt={ref.name}
                                        width={160}
                                        height={90}
                                        className={styles.referenceImage}
                                        style={{ objectFit: 'contain' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA & Catalogs Section */}
            <section className={styles.cta}>
                <div className="container">
                    <div className={styles.ctaGrid}>
                        {/* Left: CTA Text & Button */}
                        <div className={styles.ctaContent}>
                            <h2>
                                {lang === "tr"
                                    ? "Projeniz İçin Teklif Alın"
                                    : "Get a Quote for Your Project"}
                            </h2>
                            <p>
                                {lang === "tr"
                                    ? "Uzman ekibimiz size en uygun yay çözümünü sunmak için hazır"
                                    : "Our expert team is ready to provide you with the best spring solution"}
                            </p>
                            <Link
                                href={`/${lang}/${lang === "tr" ? "teklif-al" : "request-quote"}`}
                                className="btn btn-secondary"
                            >
                                {dict.nav.quote}
                            </Link>
                        </div>

                        {/* Right: E-Catalogs */}
                        <div className={styles.ctaCatalogs}>
                            <div className={styles.catalogGrid}>
                                {catalogs.map((catalog) => (
                                    <a
                                        key={catalog.id}
                                        href={catalog.pdfUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.catalogCard}
                                    >
                                        <div className={styles.catalogImageWrapper}>
                                            <Image
                                                src={catalog.coverImage || "/defaults/catalog-default.jpg"}
                                                alt={lang === "tr" ? catalog.nameTr : catalog.nameEn}
                                                fill
                                                className={styles.catalogImage}
                                            />
                                        </div>
                                        <span className={styles.catalogTitle}>
                                            {lang === "tr" ? catalog.nameTr : catalog.nameEn}
                                        </span>
                                        <span className={styles.catalogLink}>
                                            <BookOpen size={16} />
                                            {lang === "tr" ? "İncele" : "View"}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
