import { Metadata } from "next";
import Link from "next/link";
import { Award, Users, Factory, Target, Eye, Lightbulb, CheckCircle, Shield, Clock, ThumbsUp } from "lucide-react";
import { Locale, pathMappings } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { generateSEOMetadata, generateBreadcrumbSchema } from "@/lib/seo";
import { prisma } from "@/lib/prisma"; // Import prisma
import styles from "./page.module.css";

interface AboutPageProps {
    params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
    const { lang } = await params;

    // Fetch page data for metadata
    const page = await prisma.page.findUnique({
        where: { slug: "hakkimizda" }
    });

    if (page) {
        return generateSEOMetadata({
            title: (lang === "tr" ? page.metaTitleTr : page.metaTitleEn) || "",
            description: (lang === "tr" ? page.metaDescriptionTr : page.metaDescriptionEn) || "",
            locale: lang,
            path: `/${lang === "tr" ? "hakkimizda" : "about-us"}`,
        });
    }

    return generateSEOMetadata({
        title: lang === "tr"
            ? "Hakkımızda | Aktif Yay - 30 Yıllık Yay Üretim Tecrübesi"
            : "About Us | Aktif Yay - 30 Years of Spring Manufacturing Experience",
        description: lang === "tr"
            ? "1994'ten bu yana Konya'da endüstriyel yay üretimi. Aktif Yay olarak otomotiv, savunma, beyaz eşya sektörlerine hizmet veriyoruz."
            : "Industrial spring manufacturing in Konya since 1994. At Aktif Yay, we serve automotive, defense, and appliance industries.",
        locale: lang,
        path: `/${lang === "tr" ? "hakkimizda" : "about-us"}`,
    });
}

export default async function AboutPage({ params }: AboutPageProps) {
    const { lang } = await params;
    const dict = getDictionary(lang);
    const paths = pathMappings[lang];

    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aktifyay.com.tr";

    // Fetch page data
    const page = await prisma.page.findUnique({
        where: { slug: "hakkimizda" }
    });

    const breadcrumbItems = [
        { name: lang === "tr" ? "Ana Sayfa" : "Home", url: `${SITE_URL}/${lang}` },
        { name: dict.nav.about, url: `${SITE_URL}/${lang}/${paths.about}` },
    ];

    const stats = [
        { value: "30+", label: lang === "tr" ? "Yıllık Tecrübe" : "Years Experience" },
        { value: "8", label: lang === "tr" ? "Sektör" : "Industries" },
        { value: "1000+", label: lang === "tr" ? "Müşteri" : "Customers" },
        { value: "4", label: lang === "tr" ? "Ürün Kategorisi" : "Product Categories" },
    ];

    const values = [
        {
            icon: Award,
            title: lang === "tr" ? "Kalite" : "Quality",
            desc: lang === "tr"
                ? "ISO standartlarında üretim süreçleri ve sıkı kalite kontrol"
                : "ISO standard production processes and strict quality control",
        },
        {
            icon: Users,
            title: lang === "tr" ? "Müşteri Odaklılık" : "Customer Focus",
            desc: lang === "tr"
                ? "Müşteri ihtiyaçlarına özel çözümler ve hızlı geri dönüş"
                : "Custom solutions for customer needs and fast response",
        },
        {
            icon: Factory,
            title: lang === "tr" ? "Teknoloji" : "Technology",
            desc: lang === "tr"
                ? "CNC makineleri ile hassas ve verimli üretim"
                : "Precise and efficient production with CNC machines",
        },
        {
            icon: Target,
            title: lang === "tr" ? "Güvenilirlik" : "Reliability",
            desc: lang === "tr"
                ? "Zamanında teslimat ve tutarlı ürün kalitesi"
                : "On-time delivery and consistent product quality",
        },
    ];

    // Use DB content if available, fallback to hardcoded
    const contentTitle = page ? (lang === "tr" ? page.h1Tr : page.h1En) : dict.nav.about;
    const contentDescription = page ? (lang === "tr" ? page.descriptionTr : page.descriptionEn) : (
        lang === "tr"
            ? "1994'ten bu yana Konya'da endüstriyel yay üretiminde öncü"
            : "Pioneer in industrial spring manufacturing in Konya since 1994"
    );
    const storyContent = page ? (lang === "tr" ? page.contentTr?.replace(/&nbsp;/g, ' ') : page.contentEn?.replace(/&nbsp;/g, ' ')) : null;

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
                        <li aria-current="page">{dict.nav.about}</li>
                    </ol>
                </div>
            </nav>

            {/* Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <h1>{contentTitle}</h1>
                    <p>{contentDescription}</p>
                </div>
            </section>

            {/* Story */}
            <section className="section">
                <div className="container">
                    <div className={styles.story}>
                        <div className={styles.storyContent}>
                            {storyContent ? (
                                <div dangerouslySetInnerHTML={{ __html: storyContent }} />
                            ) : (
                                <>
                                    <h2>{lang === "tr" ? "Hikayemiz" : "Our Story"}</h2>
                                    <p>
                                        {lang === "tr"
                                            ? "Aktif Yay, 1994 yılında Konya'da kurulmuş ve o günden bu yana Türkiye'nin önde gelen yay üreticilerinden biri haline gelmiştir. 30 yılı aşkın tecrübemizle, otomotiv, savunma sanayi, beyaz eşya, medikal ve daha birçok sektöre hizmet vermekteyiz."
                                            : "Aktif Yay was founded in Konya in 1994 and has since become one of Turkey's leading spring manufacturers. With over 30 years of experience, we serve the automotive, defense, appliances, medical, and many other industries."}
                                    </p>
                                    <p>
                                        {lang === "tr"
                                            ? "Modern CNC makineleri ve uzman kadromuzla, müşterilerimizin özel ihtiyaçlarına uygun yay çözümleri üretiyoruz. Kalite, güvenilirlik ve müşteri memnuniyeti her zaman önceliğimizdir."
                                            : "With our modern CNC machines and expert team, we produce spring solutions tailored to our customers' specific needs. Quality, reliability, and customer satisfaction are always our priority."}
                                    </p>
                                </>
                            )}
                        </div>
                        <div className={styles.storyImage}>
                            <div className={styles.imageWrapper}>
                                {page?.image ? (
                                    <img
                                        src={page.image}
                                        alt={lang === "tr" ? "Fabrika Görüntüsü" : "Factory Image"}
                                        className={styles.factoryImage}
                                    />
                                ) : (
                                    <div className={styles.imagePlaceholder}>
                                        {lang === "tr" ? "Fabrika Görüntüsü" : "Factory Image"}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className={styles.stats}>
                <div className="container">
                    <div className={styles.statsGrid}>
                        {stats.map((stat, i) => (
                            <div key={i} className={styles.statItem}>
                                <span className={styles.statValue}>{stat.value}</span>
                                <span className={styles.statLabel}>{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="section">
                <div className="container">
                    <div className={styles.visionMission}>
                        <div className={styles.vmCard}>
                            <div className={styles.vmIcon}>
                                <Eye size={40} />
                            </div>
                            <h2>{lang === "tr" ? "Vizyonumuz" : "Our Vision"}</h2>
                            <p>
                                {lang === "tr"
                                    ? "Yay üretiminde teknoloji ve yenilikçiliği öncü bir şekilde kullanarak, Türkiye'nin ve bölgenin en güvenilir, kaliteli ve çevre dostu yay üreticisi olmak. Müşterilerimize özel çözümler sunarak sektörde standartları belirleyen lider firma konumunu sürdürmek."
                                    : "To be Turkey's and the region's most reliable, high-quality, and environmentally friendly spring manufacturer by pioneering the use of technology and innovation in spring production. To maintain our position as the industry leader that sets standards by offering customized solutions to our customers."}
                            </p>
                        </div>
                        <div className={styles.vmCard}>
                            <div className={styles.vmIcon}>
                                <Lightbulb size={40} />
                            </div>
                            <h2>{lang === "tr" ? "Misyonumuz" : "Our Mission"}</h2>
                            <p>
                                {lang === "tr"
                                    ? "Otomotiv, savunma sanayi, beyaz eşya ve medikal gibi kritik sektörlere ISO standartlarında, yüksek kaliteli yay çözümleri sunmak. Modern CNC teknolojisi ve uzman ekibimizle, müşteri memnuniyetini ön planda tutarak zamanında teslimat ve sürekli gelişim ilkesiyle hareket etmek."
                                    : "To provide ISO-standard, high-quality spring solutions to critical sectors such as automotive, defense, appliances, and medical industries. To operate with modern CNC technology and our expert team, prioritizing customer satisfaction, on-time delivery, and continuous improvement."}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className={styles.whyChooseUs}>
                <div className="container">
                    <div className="section-title">
                        <h2>{lang === "tr" ? "Neden Aktif Yay?" : "Why Aktif Yay?"}</h2>
                        <p>
                            {lang === "tr"
                                ? "30 yılı aşkın tecrübemizle sektörde fark yaratan çözümler sunuyoruz"
                                : "We provide distinctive solutions in the industry with over 30 years of experience"}
                        </p>
                    </div>
                    <div className={styles.reasonsGrid}>
                        <div className={styles.reasonItem}>
                            <div className={styles.reasonIcon}>
                                <CheckCircle size={28} />
                            </div>
                            <h3>{lang === "tr" ? "Geniş Ürün Yelpazesi" : "Wide Product Range"}</h3>
                            <p>
                                {lang === "tr"
                                    ? "Basma, çekme, kurma ve tel form yaylar dahil her türlü yay çözümü"
                                    : "All types of spring solutions including compression, tension, torsion, and wire form springs"}
                            </p>
                        </div>
                        <div className={styles.reasonItem}>
                            <div className={styles.reasonIcon}>
                                <Shield size={28} />
                            </div>
                            <h3>{lang === "tr" ? "ISO Kalite Standartları" : "ISO Quality Standards"}</h3>
                            <p>
                                {lang === "tr"
                                    ? "Uluslararası kalite standartlarına uygun üretim ve sıkı kalite kontrol"
                                    : "Production compliant with international quality standards and strict quality control"}
                            </p>
                        </div>
                        <div className={styles.reasonItem}>
                            <div className={styles.reasonIcon}>
                                <Factory size={28} />
                            </div>
                            <h3>{lang === "tr" ? "Modern Teknoloji" : "Modern Technology"}</h3>
                            <p>
                                {lang === "tr"
                                    ? "Son teknoloji CNC makineleri ile hassas ve hızlı üretim kapasitesi"
                                    : "Precise and fast production capacity with state-of-the-art CNC machines"}
                            </p>
                        </div>
                        <div className={styles.reasonItem}>
                            <div className={styles.reasonIcon}>
                                <Clock size={28} />
                            </div>
                            <h3>{lang === "tr" ? "Zamanında Teslimat" : "On-Time Delivery"}</h3>
                            <p>
                                {lang === "tr"
                                    ? "Planlanmış üretim süreçleri ile güvenilir ve zamanında teslimat"
                                    : "Reliable and on-time delivery with planned production processes"}
                            </p>
                        </div>
                        <div className={styles.reasonItem}>
                            <div className={styles.reasonIcon}>
                                <Users size={28} />
                            </div>
                            <h3>{lang === "tr" ? "Uzman Kadro" : "Expert Team"}</h3>
                            <p>
                                {lang === "tr"
                                    ? "Alanında tecrübeli mühendis ve teknisyenlerden oluşan profesyonel ekip"
                                    : "Professional team of experienced engineers and technicians in their field"}
                            </p>
                        </div>
                        <div className={styles.reasonItem}>
                            <div className={styles.reasonIcon}>
                                <ThumbsUp size={28} />
                            </div>
                            <h3>{lang === "tr" ? "Müşteri Memnuniyeti" : "Customer Satisfaction"}</h3>
                            <p>
                                {lang === "tr"
                                    ? "Özel ihtiyaçlara uygun çözümler ve hızlı teknik destek hizmeti"
                                    : "Solutions tailored to specific needs and fast technical support service"}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Certifications */}
            <section className="section">
                <div className="container">
                    <div className="section-title">
                        <h2>{lang === "tr" ? "Sertifikalarımız ve Belgelerimiz" : "Our Certifications"}</h2>
                        <p>
                            {lang === "tr"
                                ? "Kalite ve güvenilirliğimizi belgeleyen uluslararası standartlar"
                                : "International standards certifying our quality and reliability"}
                        </p>
                    </div>
                    <div className={styles.certificationsGrid}>
                        <div className={styles.certCard}>
                            <div className={styles.certIcon}>
                                <Award size={32} />
                            </div>
                            <h3>ISO 9001</h3>
                            <p>{lang === "tr" ? "Kalite Yönetim Sistemi" : "Quality Management System"}</p>
                        </div>
                        <div className={styles.certCard}>
                            <div className={styles.certIcon}>
                                <Shield size={32} />
                            </div>
                            <h3>ISO 14001</h3>
                            <p>{lang === "tr" ? "Çevre Yönetim Sistemi" : "Environmental Management System"}</p>
                        </div>
                        <div className={styles.certCard}>
                            <div className={styles.certIcon}>
                                <CheckCircle size={32} />
                            </div>
                            <h3>CE</h3>
                            <p>{lang === "tr" ? "Avrupa Uygunluk Belgesi" : "European Conformity Certificate"}</p>
                        </div>
                        <div className={styles.certCard}>
                            <div className={styles.certIcon}>
                                <Target size={32} />
                            </div>
                            <h3>TSE</h3>
                            <p>{lang === "tr" ? "Türk Standartları Enstitüsü" : "Turkish Standards Institute"}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section">
                <div className="container">
                    <div className="section-title">
                        <h2>{lang === "tr" ? "Değerlerimiz" : "Our Values"}</h2>
                    </div>
                    <div className={styles.valuesGrid}>
                        {values.map((value, i) => (
                            <div key={i} className={styles.valueCard}>
                                <div className={styles.valueIcon}>
                                    <value.icon size={32} />
                                </div>
                                <h3>{value.title}</h3>
                                <p>{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className={styles.cta}>
                <div className="container">
                    <h2>{lang === "tr" ? "Birlikte Çalışalım" : "Let's Work Together"}</h2>
                    <p>
                        {lang === "tr"
                            ? "Yay ihtiyaçlarınız için bizimle iletişime geçin"
                            : "Contact us for your spring needs"}
                    </p>
                    <Link href={`/${lang}/${paths.contact}`} className="btn btn-secondary">
                        {dict.nav.contact}
                    </Link>
                </div>
            </section>
        </>
    );
}
