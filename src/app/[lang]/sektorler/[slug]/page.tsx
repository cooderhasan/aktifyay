import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Locale, pathMappings } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { generateSEOMetadata, generateIndustrySchema, generateBreadcrumbSchema } from "@/lib/seo";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

interface IndustryPageProps {
    params: Promise<{ lang: Locale; slug: string }>;
}

// Static industry data
const staticIndustries: Record<string, {
    nameTr: string;
    nameEn: string;
    descriptionTr: string;
    descriptionEn: string;
    contentTr: string;
    contentEn: string;
    solutionsTr: string[];
    solutionsEn: string[];
    productsTr: string[];
    productsEn: string[];
}> = {
    "otomotiv": {
        nameTr: "Otomotiv Sektörü",
        nameEn: "Automotive Industry",
        descriptionTr: "Otomotiv sektörü için yüksek performanslı ve dayanıklı yay çözümleri. Motor parçalarından süspansiyon sistemlerine kadar geniş ürün yelpazesi.",
        descriptionEn: "High-performance and durable spring solutions for the automotive industry. Wide product range from engine parts to suspension systems.",
        contentTr: `Otomotiv sektörü, en zorlu çalışma koşullarına sahip endüstrilerden biridir. Araçların güvenliği, performansı ve konforu için kullanılan yayların yüksek kalitede olması kritik önem taşır.

Aktif Yay olarak, otomotiv sektörünün ihtiyaç duyduğu hassas toleranslı ve yüksek dayanımlı yayları üretiyoruz. Motor valflerinden fren sistemlerine, süspansiyondan koltuk mekanizmalarına kadar geniş bir uygulama alanına hizmet veriyoruz.

30 yılı aşkın tecrübemizle, Türkiye'nin önde gelen otomotiv tedarikçilerine güvenilir yay çözümleri sunuyoruz.`,
        contentEn: `The automotive industry is one of the industries with the most demanding operating conditions. The high quality of springs used for vehicle safety, performance, and comfort is critically important.

At Aktif Yay, we manufacture precision-toleranced and high-strength springs required by the automotive industry. We serve a wide range of applications from engine valves to brake systems, from suspension to seat mechanisms.

With over 30 years of experience, we provide reliable spring solutions to Turkey's leading automotive suppliers.`,
        solutionsTr: [
            "Motor valf yayları - yüksek sıcaklık dayanımı",
            "Süspansiyon yayları - özel alaşım çelikler",
            "Fren sistemi yayları - güvenlik sertifikalı",
            "Koltuk mekanizma yayları - uzun ömürlü",
            "Kapı ve bagaj yayları - korozyon dirençli",
        ],
        solutionsEn: [
            "Engine valve springs - high temperature resistance",
            "Suspension springs - special alloy steels",
            "Brake system springs - safety certified",
            "Seat mechanism springs - long-lasting",
            "Door and trunk springs - corrosion resistant",
        ],
        productsTr: ["Basma Yaylar", "Çekme Yaylar", "Kurma Yaylar", "Tel Form"],
        productsEn: ["Compression Springs", "Extension Springs", "Torsion Springs", "Wire Forms"],
    },
    "savunma-sanayi": {
        nameTr: "Savunma Sanayi",
        nameEn: "Defense Industry",
        descriptionTr: "Savunma sanayi için kritik güvenlik standartlarında üretilen yüksek performanslı yay çözümleri.",
        descriptionEn: "High-performance spring solutions manufactured to critical safety standards for the defense industry.",
        contentTr: `Savunma sanayi, en yüksek kalite ve güvenilirlik standartlarını gerektiren sektörlerden biridir. Bu alanda kullanılan yayların olağanüstü koşullarda bile güvenilir çalışması zorunludur.

Aktif Yay, savunma sanayi projelerinde kullanılan kritik komponentler için özel yay çözümleri geliştirmektedir. Tüm ürünlerimiz sıkı kalite kontrol süreçlerinden geçmekte ve belgelenmektedir.

Gizlilik ilkelerine bağlı kalarak, savunma sanayi müşterilerimize güvenilir tedarik süreci sunuyoruz.`,
        contentEn: `The defense industry is one of the sectors that requires the highest quality and reliability standards. Springs used in this field must operate reliably even under extraordinary conditions.

Aktif Yay develops special spring solutions for critical components used in defense industry projects. All our products undergo strict quality control processes and are documented.

Adhering to confidentiality principles, we offer a reliable supply process to our defense industry customers.`,
        solutionsTr: [
            "Silah sistemleri yayları",
            "Askeri araç komponentleri",
            "Hassas mekanizma yayları",
            "Yüksek dayanımlı özel alaşımlar",
        ],
        solutionsEn: [
            "Weapon system springs",
            "Military vehicle components",
            "Precision mechanism springs",
            "High-strength special alloys",
        ],
        productsTr: ["Basma Yaylar", "Çekme Yaylar", "Kurma Yaylar"],
        productsEn: ["Compression Springs", "Extension Springs", "Torsion Springs"],
    },
    "tarim-ziraat": {
        nameTr: "Tarım & Ziraat",
        nameEn: "Agriculture",
        descriptionTr: "Tarım makineleri ve sulama sistemleri için dayanıklı ve güvenilir yay çözümleri.",
        descriptionEn: "Durable and reliable spring solutions for agricultural machinery and irrigation systems.",
        contentTr: `Tarım sektörü, zorlu arazi koşullarında çalışan makineler için dayanıklı ve güvenilir yay çözümleri gerektirir. Traktörlerden hasat makinelerine, sulama sistemlerinden seralara kadar geniş bir uygulama alanında yaylarımız kullanılmaktadır.

Aktif Yay, tarım makineleri üreticilerine ve tarım ekipmanları tedarikçilerine yüksek kaliteli yay çözümleri sunmaktadır. Ürünlerimiz korozyon direnci ve uzun ömür göz önünde bulundurularak tasarlanmaktadır.`,
        contentEn: `The agricultural sector requires durable and reliable spring solutions for machines operating in challenging terrain conditions. Our springs are used in a wide range of applications from tractors to harvesters, from irrigation systems to greenhouses.

Aktif Yay provides high-quality spring solutions to agricultural machinery manufacturers and agricultural equipment suppliers. Our products are designed with corrosion resistance and longevity in mind.`,
        solutionsTr: [
            "Traktör ve biçerdöver yayları",
            "Sulama sistemi yayları",
            "Ekipman mekanizma yayları",
            "Sera sistemleri yayları",
        ],
        solutionsEn: [
            "Tractor and harvester springs",
            "Irrigation system springs",
            "Equipment mechanism springs",
            "Greenhouse system springs",
        ],
        productsTr: ["Basma Yaylar", "Çekme Yaylar", "Tel Form"],
        productsEn: ["Compression Springs", "Extension Springs", "Wire Forms"],
    },
    "mobilya": {
        nameTr: "Mobilya Sektörü",
        nameEn: "Furniture Industry",
        descriptionTr: "Mobilya mekanizmaları için estetik ve fonksiyonel yay çözümleri.",
        descriptionEn: "Aesthetic and functional spring solutions for furniture mechanisms.",
        contentTr: `Mobilya sektörü, konfor ve fonksiyonelliği bir arada sunan yay çözümleri gerektirir. Koltuk mekanizmalarından yatak sistemlerine, çekmece raylarından kapı menteşelerine kadar birçok mobilya parçasında yaylar kritik rol oynar.

Aktif Yay, mobilya üreticilerine uzun ömürlü ve sessiz çalışan yay çözümleri sunmaktadır. Ürünlerimiz estetik ve fonksiyonellik dengesini gözetir.`,
        contentEn: `The furniture industry requires spring solutions that combine comfort and functionality. Springs play a critical role in many furniture parts, from seat mechanisms to bed systems, from drawer slides to door hinges.

Aktif Yay provides long-lasting and quiet-running spring solutions to furniture manufacturers. Our products balance aesthetics and functionality.`,
        solutionsTr: [
            "Koltuk ve kanepe yayları",
            "Yatak mekanizma yayları",
            "Çekmece rayı yayları",
            "Kapı ve dolap menteşe yayları",
        ],
        solutionsEn: [
            "Sofa and couch springs",
            "Bed mechanism springs",
            "Drawer slide springs",
            "Door and cabinet hinge springs",
        ],
        productsTr: ["Basma Yaylar", "Kurma Yaylar", "Tel Form"],
        productsEn: ["Compression Springs", "Torsion Springs", "Wire Forms"],
    },
    "beyaz-esya": {
        nameTr: "Beyaz Eşya",
        nameEn: "Home Appliances",
        descriptionTr: "Ev aletleri için güvenilir ve uzun ömürlü yay çözümleri.",
        descriptionEn: "Reliable and long-lasting spring solutions for home appliances.",
        contentTr: `Beyaz eşya sektörü, günlük kullanımda güvenilir performans gösteren yay çözümleri gerektirir. Çamaşır makinelerinden bulaşık makinelerine, buzdolaplarından fırınlara kadar birçok ev aletinde yaylarımız kullanılmaktadır.

Aktif Yay, Türkiye'nin önde gelen beyaz eşya üreticilerine yay tedarik etmektedir. Ürünlerimiz yüksek çevrim ömrü ve sessiz çalışma için optimize edilmiştir.`,
        contentEn: `The home appliance sector requires spring solutions that deliver reliable performance in daily use. Our springs are used in many home appliances from washing machines to dishwashers, from refrigerators to ovens.

Aktif Yay supplies springs to Turkey's leading home appliance manufacturers. Our products are optimized for high cycle life and quiet operation.`,
        solutionsTr: [
            "Çamaşır makinesi süspansiyon yayları",
            "Bulaşık makinesi kapı yayları",
            "Buzdolabı menteşe yayları",
            "Fırın kapak yayları",
        ],
        solutionsEn: [
            "Washing machine suspension springs",
            "Dishwasher door springs",
            "Refrigerator hinge springs",
            "Oven door springs",
        ],
        productsTr: ["Basma Yaylar", "Çekme Yaylar", "Kurma Yaylar"],
        productsEn: ["Compression Springs", "Extension Springs", "Torsion Springs"],
    },
    "medikal": {
        nameTr: "Medikal Sektörü",
        nameEn: "Medical Industry",
        descriptionTr: "Tıbbi cihazlar için hassas ve hijyenik yay çözümleri.",
        descriptionEn: "Precise and hygienic spring solutions for medical devices.",
        contentTr: `Medikal sektör, en yüksek hassasiyet ve hijyen standartlarını gerektiren alanlardan biridir. Tıbbi cihazlarda kullanılan yayların güvenilir ve sterilize edilebilir olması zorunludur.

Aktif Yay, medikal cihaz üreticilerine paslanmaz çelik ve özel alaşımlardan üretilmiş yay çözümleri sunmaktadır. Tüm ürünlerimiz sağlık sektörünün gereksinimlerine uygun olarak üretilmektedir.`,
        contentEn: `The medical sector is one of the areas that requires the highest precision and hygiene standards. Springs used in medical devices must be reliable and sterilizable.

Aktif Yay provides spring solutions made from stainless steel and special alloys to medical device manufacturers. All our products are manufactured to meet the requirements of the healthcare sector.`,
        solutionsTr: [
            "Cerrahi alet yayları",
            "Tıbbi cihaz mekanizma yayları",
            "Protez ve ortez yayları",
            "Laboratuvar ekipmanı yayları",
        ],
        solutionsEn: [
            "Surgical instrument springs",
            "Medical device mechanism springs",
            "Prosthetic and orthotic springs",
            "Laboratory equipment springs",
        ],
        productsTr: ["Basma Yaylar", "Çekme Yaylar", "Kurma Yaylar", "Tel Form"],
        productsEn: ["Compression Springs", "Extension Springs", "Torsion Springs", "Wire Forms"],
    },
    "havacilik": {
        nameTr: "Havacılık Sektörü",
        nameEn: "Aviation Industry",
        descriptionTr: "Havacılık ve uzay sanayi için yüksek performanslı özel yay çözümleri.",
        descriptionEn: "High-performance special spring solutions for aviation and aerospace industry.",
        contentTr: `Havacılık sektörü, en zorlu çalışma koşulları ve en yüksek güvenlik standartları gerektiren sektörlerden biridir. Bu alanda kullanılan yayların olağanüstü dayanıklılık ve güvenilirlik göstermesi zorunludur.

Aktif Yay, havacılık sektörünün ihtiyaç duyduğu özel alaşımlardan üretilen yayları sağlamaktadır. Isı direnci, yorulma dayanımı ve hafiflik gibi kritik parametreler göz önünde bulundurularak tasarlanan ürünlerimiz, sıkı kalite kontrol süreçlerinden geçmektedir.`,
        contentEn: `The aviation industry is one of the sectors that requires the most demanding operating conditions and highest safety standards. Springs used in this field must demonstrate extraordinary durability and reliability.

Aktif Yay provides springs manufactured from special alloys required by the aviation industry. Our products, designed with critical parameters such as heat resistance, fatigue strength, and lightness in mind, undergo strict quality control processes.`,
        solutionsTr: [
            "Uçak motor komponent yayları",
            "İniş takımı yayları",
            "Kabin mekanizma yayları",
            "Kontrol sistemi yayları",
        ],
        solutionsEn: [
            "Aircraft engine component springs",
            "Landing gear springs",
            "Cabin mechanism springs",
            "Control system springs",
        ],
        productsTr: ["Basma Yaylar", "Kurma Yaylar"],
        productsEn: ["Compression Springs", "Torsion Springs"],
    },
    "elektrik-elektronik": {
        nameTr: "Elektrik & Elektronik",
        nameEn: "Electronics Industry",
        descriptionTr: "Elektronik cihazlar ve elektrik sistemleri için hassas yay çözümleri.",
        descriptionEn: "Precision spring solutions for electronic devices and electrical systems.",
        contentTr: `Elektrik-elektronik sektörü, minyatür boyutlardan endüstriyel ölçeklere kadar geniş bir yay çeşitliliği gerektirir. Bağlantı elemanlarından şalterlere, sensörlerden güç kaynaklarına kadar birçok uygulamada yaylar kritik rol oynar.

Aktif Yay, elektronik sektörünün ihtiyaç duyduğu yüksek hassasiyetli ve iletken yay çözümleri sunmaktadır. Fosfor bronz, berilliyum bakır ve paslanmaz çelik gibi özel malzemelerden üretim yapıyoruz.`,
        contentEn: `The electrical-electronics sector requires a wide variety of springs from miniature sizes to industrial scales. Springs play a critical role in many applications from connectors to switches, from sensors to power supplies.

Aktif Yay provides high-precision and conductive spring solutions required by the electronics sector. We manufacture from special materials such as phosphor bronze, beryllium copper, and stainless steel.`,
        solutionsTr: [
            "Konektör ve terminal yayları",
            "Şalter ve anahtar yayları",
            "Pil kontakt yayları",
            "Sensör mekanizma yayları",
        ],
        solutionsEn: [
            "Connector and terminal springs",
            "Switch springs",
            "Battery contact springs",
            "Sensor mechanism springs",
        ],
        productsTr: ["Basma Yaylar", "Çekme Yaylar", "Tel Form"],
        productsEn: ["Compression Springs", "Extension Springs", "Wire Forms"],
    },
};

// English slug mapping
const slugMapping: Record<string, string> = {
    "automotive": "otomotiv",
    "defense-industry": "savunma-sanayi",
    "agriculture": "tarim-ziraat",
    "furniture": "mobilya",
    "home-appliances": "beyaz-esya",
    "medical": "medikal",
    "aviation": "havacilik",
    "electronics": "elektrik-elektronik",
};

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
    const { lang, slug } = await params;
    const normalizedSlug = slugMapping[slug] || slug;
    const industry = staticIndustries[normalizedSlug];

    if (!industry) {
        return { title: "Not Found" };
    }

    const name = lang === "tr" ? industry.nameTr : industry.nameEn;
    const description = lang === "tr" ? industry.descriptionTr : industry.descriptionEn;

    return generateSEOMetadata({
        title: lang === "tr"
            ? `${name} için Yay Çözümleri | Aktif Yay`
            : `Spring Solutions for ${name} | Aktif Yay`,
        description,
        locale: lang,
        path: `/${lang === "tr" ? "sektorler" : "industries"}/${slug}`,
    });
}

export default async function IndustryPage({ params }: IndustryPageProps) {
    const { lang, slug } = await params;
    const paths = pathMappings[lang];
    const normalizedSlug = slugMapping[slug] || slug;
    const industry = staticIndustries[normalizedSlug];

    if (!industry) {
        notFound();
    }

    const name = lang === "tr" ? industry.nameTr : industry.nameEn;
    const description = lang === "tr" ? industry.descriptionTr : industry.descriptionEn;
    const content = lang === "tr" ? industry.contentTr : industry.contentEn;
    const solutions = lang === "tr" ? industry.solutionsTr : industry.solutionsEn;
    const products = lang === "tr" ? industry.productsTr : industry.productsEn;

    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aktifyay.com.tr";

    const breadcrumbItems = [
        { name: lang === "tr" ? "Ana Sayfa" : "Home", url: `${SITE_URL}/${lang}` },
        { name: lang === "tr" ? "Sektörler" : "Industries", url: `${SITE_URL}/${lang}/${paths.industries}` },
        { name, url: `${SITE_URL}/${lang}/${paths.industries}/${slug}` },
    ];

    return (
        <>
            {/* Schema.org JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbItems)),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateIndustrySchema(
                        name,
                        description,
                        `${SITE_URL}/${lang}/${paths.industries}/${slug}`
                    )),
                }}
            />

            {/* Breadcrumb */}
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                <div className="container">
                    <ol>
                        <li><Link href={`/${lang}`}>{lang === "tr" ? "Ana Sayfa" : "Home"}</Link></li>
                        <li><Link href={`/${lang}/${paths.industries}`}>{lang === "tr" ? "Sektörler" : "Industries"}</Link></li>
                        <li aria-current="page">{name}</li>
                    </ol>
                </div>
            </nav>

            {/* Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <Link href={`/${lang}/${paths.industries}`} className={styles.backLink}>
                        <ArrowLeft size={20} />
                        {lang === "tr" ? "Tüm Sektörler" : "All Industries"}
                    </Link>
                    <h1>
                        {lang === "tr" ? `${name} için Yay Çözümleri` : `Spring Solutions for ${name}`}
                    </h1>
                    <p className={styles.heroDescription}>{description}</p>
                </div>
            </section>

            {/* Content */}
            <section className="section">
                <div className="container">
                    <div className={styles.content}>
                        {/* Main Content */}
                        <div className={styles.mainContent}>
                            <h2>{lang === "tr" ? `${name} Yay İhtiyaçları` : `${name} Spring Needs`}</h2>
                            <div className={styles.contentText}>
                                {content.split("\n\n").map((paragraph, i) => (
                                    <p key={i}>{paragraph}</p>
                                ))}
                            </div>

                            {/* Solutions */}
                            <h2>{lang === "tr" ? "Sunduğumuz Çözümler" : "Our Solutions"}</h2>
                            <ul className={styles.solutionsList}>
                                {solutions.map((solution, i) => (
                                    <li key={i}>
                                        <CheckCircle size={20} />
                                        <span>{solution}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Why Aktif Yay */}
                            <h2>{lang === "tr" ? "Neden Aktif Yay?" : "Why Aktif Yay?"}</h2>
                            <div className={styles.whyUs}>
                                <div className={styles.whyUsItem}>
                                    <h3>{lang === "tr" ? "30+ Yıllık Tecrübe" : "30+ Years Experience"}</h3>
                                    <p>
                                        {lang === "tr"
                                            ? "1994'ten bu yana endüstriyel yay üretiminde uzmanlık"
                                            : "Expertise in industrial spring manufacturing since 1994"}
                                    </p>
                                </div>
                                <div className={styles.whyUsItem}>
                                    <h3>{lang === "tr" ? "Özel Üretim" : "Custom Production"}</h3>
                                    <p>
                                        {lang === "tr"
                                            ? "Sektörünüze özel yay tasarımı ve imalatı"
                                            : "Custom spring design and manufacturing for your industry"}
                                    </p>
                                </div>
                                <div className={styles.whyUsItem}>
                                    <h3>{lang === "tr" ? "Kalite Güvencesi" : "Quality Assurance"}</h3>
                                    <p>
                                        {lang === "tr"
                                            ? "ISO sertifikalı üretim süreçleri"
                                            : "ISO certified production processes"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className={styles.sidebar}>
                            {/* Related Products */}
                            <div className={styles.productsCard}>
                                <h3>{lang === "tr" ? "İlgili Ürünler" : "Related Products"}</h3>
                                <ul>
                                    {products.map((product, i) => (
                                        <li key={i}>
                                            <Link href={`/${lang}/${paths.products}`}>
                                                {product}
                                                <ArrowRight size={16} />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CTA */}
                            <div className={styles.ctaCard}>
                                <h3>{lang === "tr" ? "Teklif Alın" : "Get a Quote"}</h3>
                                <p>
                                    {lang === "tr"
                                        ? `${name} için özel yay çözümlerimiz hakkında bilgi alın.`
                                        : `Get information about our custom spring solutions for ${name}.`}
                                </p>
                                <Link href={`/${lang}/${paths.quote}`} className="btn btn-secondary">
                                    {lang === "tr" ? "Teklif İste" : "Request Quote"}
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </>
    );
}
