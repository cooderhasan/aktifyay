import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Locale, pathMappings } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { generateSEOMetadata, generateProductSchema, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

interface ProductPageProps {
    params: Promise<{ lang: Locale; slug: string }>;
}

// Static product data for initial setup
const staticProducts: Record<string, {
    nameTr: string;
    nameEn: string;
    descriptionTr: string;
    descriptionEn: string;
    longDescTr: string;
    longDescEn: string;
    usageAreasTr: string[];
    usageAreasEn: string[];
    techSpecs: { label: string; valueTr: string; valueEn: string }[];
    faqs: { questionTr: string; questionEn: string; answerTr: string; answerEn: string }[];
}> = {
    "basma-yaylar": {
        nameTr: "Basma Yaylar",
        nameEn: "Compression Springs",
        descriptionTr: "Basma yaylar, mekanik kuvvetlerin kontrolü, enerji depolama ve titreşimlerin sönümlenmesi için tasarlanmış endüstriyel yay türleridir.",
        descriptionEn: "Compression springs are industrial spring types designed for mechanical force control, energy storage, and vibration damping.",
        longDescTr: `Basma yaylar, endüstriyel uygulamalarda en yaygın kullanılan yay türlerinden biridir. Silindirik, konik veya varil şeklinde üretilebilen bu yaylar, üzerlerine uygulanan basınç kuvvetine karşı direnç göstererek enerji depolar ve bu enerjiyi kontrollü bir şekilde geri verir.

Aktif Yay olarak 30 yılı aşkın tecrübemizle, farklı sektörlerin ihtiyaçlarına uygun özel basma yay çözümleri sunuyoruz. CNC teknolojisi ile hassas üretim yaparak, müşterilerimizin teknik gereksinimlerini tam olarak karşılıyoruz.

Basma yaylarımız yüksek kaliteli çelik tellerden üretilmekte olup, ısıl işlem ve yüzey kaplama süreçlerinden geçirilerek uzun ömürlü performans sağlamaktadır.`,
        longDescEn: `Compression springs are one of the most commonly used spring types in industrial applications. These springs, which can be manufactured in cylindrical, conical, or barrel shapes, store energy by resisting the compression force applied to them and release this energy in a controlled manner.

At Aktif Yay, with over 30 years of experience, we offer custom compression spring solutions tailored to the needs of different industries. We meet our customers' technical requirements precisely through CNC technology and precision manufacturing.

Our compression springs are manufactured from high-quality steel wires and undergo heat treatment and surface coating processes to ensure long-lasting performance.`,
        usageAreasTr: ["Otomotiv süspansiyon sistemleri", "Beyaz eşya mekanizmaları", "Endüstriyel makineler", "Medikal cihazlar", "Elektronik ekipmanlar", "Mobilya mekanizmaları"],
        usageAreasEn: ["Automotive suspension systems", "Home appliance mechanisms", "Industrial machinery", "Medical devices", "Electronic equipment", "Furniture mechanisms"],
        techSpecs: [
            { label: "Tel Çapı / Wire Diameter", valueTr: "0.2mm - 25mm", valueEn: "0.2mm - 25mm" },
            { label: "Dış Çap / Outer Diameter", valueTr: "2mm - 200mm", valueEn: "2mm - 200mm" },
            { label: "Malzeme / Material", valueTr: "Çelik, Paslanmaz Çelik, Özel Alaşımlar", valueEn: "Steel, Stainless Steel, Special Alloys" },
            { label: "Yüzey İşlem / Surface Treatment", valueTr: "Galvaniz, Fosfat, Boyama", valueEn: "Galvanizing, Phosphate, Painting" },
        ],
        faqs: [
            {
                questionTr: "Basma yay nedir ve nasıl çalışır?",
                questionEn: "What is a compression spring and how does it work?",
                answerTr: "Basma yay, üzerine uygulanan basınç kuvvetine karşı direnç göstererek enerji depolayan ve bu enerjiyi kuvvet kaldırıldığında geri veren mekanik bir elemandır. Helisel yapısı sayesinde sıkıştırıldığında potansiyel enerji depolar.",
                answerEn: "A compression spring is a mechanical element that stores energy by resisting compression force and releases this energy when the force is removed. Its helical structure stores potential energy when compressed.",
            },
            {
                questionTr: "Basma yay üretiminde hangi malzemeler kullanılır?",
                questionEn: "What materials are used in compression spring manufacturing?",
                answerTr: "Basma yay üretiminde genellikle yüksek karbonlu çelik, paslanmaz çelik (304, 316), müzik teli, krom-vanadyum ve krom-silikon alaşımları kullanılır. Malzeme seçimi uygulamaya ve çevresel koşullara bağlıdır.",
                answerEn: "High carbon steel, stainless steel (304, 316), music wire, chrome-vanadium, and chrome-silicon alloys are commonly used in compression spring manufacturing. Material selection depends on the application and environmental conditions.",
            },
            {
                questionTr: "Özel ölçülerde basma yay üretebilir misiniz?",
                questionEn: "Can you manufacture compression springs in custom sizes?",
                answerTr: "Evet, Aktif Yay olarak CNC teknolojisi ile müşterilerimizin özel teknik gereksinimlerine uygun basma yay üretimi yapıyoruz. Tel çapı, dış çap, serbest boy ve yay sabiti gibi parametreler tamamen özelleştirilebilir.",
                answerEn: "Yes, at Aktif Yay, we manufacture compression springs with CNC technology according to our customers' specific technical requirements. Parameters such as wire diameter, outer diameter, free length, and spring rate can be fully customized.",
            },
            {
                questionTr: "Basma yayların ömrü ne kadardır?",
                questionEn: "What is the lifespan of compression springs?",
                answerTr: "Basma yayların ömrü kullanım koşullarına, malzeme kalitesine ve tasarım parametrelerine bağlıdır. Doğru tasarlanmış ve kaliteli malzemeden üretilmiş yaylar milyonlarca çevrim dayanabilir.",
                answerEn: "The lifespan of compression springs depends on usage conditions, material quality, and design parameters. Properly designed springs made from quality materials can withstand millions of cycles.",
            },
        ],
    },
    "cekme-yaylar": {
        nameTr: "Çekme Yaylar",
        nameEn: "Extension Springs",
        descriptionTr: "Çekme yaylar, iki uç arasında çekme kuvveti yaratarak enerji depolayan ve bu enerjiyi kontrollü şekilde serbest bırakan endüstriyel yay türüdür.",
        descriptionEn: "Extension springs are industrial springs that store energy by creating pulling force between two ends and release this energy in a controlled manner.",
        longDescTr: `Çekme yaylar, sıkıştırılmak yerine gerilme kuvvetine maruz kalarak çalışan yay türleridir. Uçlarında bulunan kancalar veya halkalar sayesinde parçalar arasında bağlantı kurarak çekme kuvveti oluştururlar.

Aktif Yay olarak, farklı kanca tiplerinde (İngiliz kanca, Alman kanca, makine kanca, halka uç) çekme yay üretimi yapıyoruz. CNC teknolojimiz sayesinde hassas toleranslarla yüksek kaliteli ürünler sunuyoruz.

Çekme yaylarımız otomotiv, beyaz eşya, tarım makineleri ve birçok endüstriyel uygulamada güvenle kullanılmaktadır.`,
        longDescEn: `Extension springs work by being subjected to tension force rather than compression. They create pulling force between parts through hooks or loops at their ends.

At Aktif Yay, we manufacture extension springs with different hook types (English hook, German hook, machine hook, loop end). Our CNC technology enables us to deliver high-quality products with precise tolerances.

Our extension springs are reliably used in automotive, home appliances, agricultural machinery, and many industrial applications.`,
        usageAreasTr: ["Garaj kapı sistemleri", "Trambolinler", "Oyuncaklar", "Tarım makineleri", "Otomotiv parçaları", "Kapı ve pencere mekanizmaları"],
        usageAreasEn: ["Garage door systems", "Trampolines", "Toys", "Agricultural machinery", "Automotive parts", "Door and window mechanisms"],
        techSpecs: [
            { label: "Tel Çapı / Wire Diameter", valueTr: "0.3mm - 16mm", valueEn: "0.3mm - 16mm" },
            { label: "Dış Çap / Outer Diameter", valueTr: "3mm - 150mm", valueEn: "3mm - 150mm" },
            { label: "Kanca Tipi / Hook Type", valueTr: "İngiliz, Alman, Makine, Halka", valueEn: "English, German, Machine, Loop" },
            { label: "Malzeme / Material", valueTr: "Çelik, Paslanmaz Çelik", valueEn: "Steel, Stainless Steel" },
        ],
        faqs: [
            {
                questionTr: "Çekme yay ile basma yay arasındaki fark nedir?",
                questionEn: "What is the difference between extension and compression springs?",
                answerTr: "Basma yaylar sıkıştırma kuvvetine karşı çalışırken, çekme yaylar gerilme kuvvetine karşı çalışır. Çekme yayların uçlarında kanca veya halka bulunur ve parçaları birbirine doğru çekerek çalışır.",
                answerEn: "While compression springs work against compressive force, extension springs work against tensile force. Extension springs have hooks or loops at their ends and work by pulling parts towards each other.",
            },
            {
                questionTr: "Çekme yaylarda hangi kanca tipleri mevcuttur?",
                questionEn: "What hook types are available for extension springs?",
                answerTr: "İngiliz kanca (açık kanca), Alman kanca (kapalı kanca), makine kanca, çift kanca ve halka uç gibi farklı kanca tipleri mevcuttur. Uygulama gereksinimlerine göre uygun tip seçilir.",
                answerEn: "Different hook types include English hook (open hook), German hook (closed hook), machine hook, double hook, and loop end. The appropriate type is selected based on application requirements.",
            },
            {
                questionTr: "Çekme yayların ön gerilimi nedir?",
                questionEn: "What is the initial tension of extension springs?",
                answerTr: "Ön gerilim, çekme yayın bobinlerini bir arada tutan ve yayın uzamaya başlaması için aşılması gereken başlangıç kuvvetidir. Bu değer yay tasarımına göre ayarlanabilir.",
                answerEn: "Initial tension is the starting force that holds the coils of an extension spring together and must be overcome for the spring to start extending. This value can be adjusted according to spring design.",
            },
        ],
    },
    "tel-form": {
        nameTr: "Tel Form Yaylar",
        nameEn: "Wire Form Springs",
        descriptionTr: "Tel form ürünleri, özel geometrik şekillere sahip, sabitleme, bağlantı ve destek amaçlı kullanılan endüstriyel tel bileşenleridir.",
        descriptionEn: "Wire form products are industrial wire components with custom geometric shapes used for fastening, connection, and support purposes.",
        longDescTr: `Tel form yaylar, standart yay formlarının ötesinde özel tasarımlara sahip tel ürünlerdir. Müşteri ihtiyaçlarına göre çeşitli şekil ve boyutlarda üretilebilirler.

Aktif Yay olarak, CNC tel bükme makinelerimiz ile karmaşık geometrilere sahip tel form ürünleri üretiyoruz. Klipsler, toka yayları, mandal yayları, emniyet pimi telleri ve daha birçok özel ürün çeşidimiz mevcuttur.

Tel form ürünlerimiz otomotiv, mobilya, beyaz eşya ve elektrik-elektronik sektörlerinde yaygın olarak kullanılmaktadır.`,
        longDescEn: `Wire form springs are wire products with custom designs beyond standard spring forms. They can be manufactured in various shapes and sizes according to customer needs.

At Aktif Yay, we produce wire form products with complex geometries using our CNC wire bending machines. We have a wide range of products including clips, clasp springs, latch springs, safety pin wires, and many more custom products.

Our wire form products are widely used in automotive, furniture, home appliances, and electrical-electronics industries.`,
        usageAreasTr: ["Otomotiv klipsleri", "Mobilya mekanizmaları", "Elektrik bağlantı elemanları", "Emniyet pimi telleri", "Mandal sistemleri", "Özel bağlantı parçaları"],
        usageAreasEn: ["Automotive clips", "Furniture mechanisms", "Electrical connectors", "Safety pin wires", "Latch systems", "Custom connecting parts"],
        techSpecs: [
            { label: "Tel Çapı / Wire Diameter", valueTr: "0.5mm - 12mm", valueEn: "0.5mm - 12mm" },
            { label: "Malzeme / Material", valueTr: "Çelik, Paslanmaz Çelik, Pirinç", valueEn: "Steel, Stainless Steel, Brass" },
            { label: "Şekil / Shape", valueTr: "Müşteri tasarımına göre özel", valueEn: "Custom according to customer design" },
            { label: "Tolerans / Tolerance", valueTr: "±0.1mm", valueEn: "±0.1mm" },
        ],
        faqs: [
            {
                questionTr: "Tel form ürünleri hangi şekillerde üretilebilir?",
                questionEn: "What shapes can wire form products be manufactured in?",
                answerTr: "Tel form ürünleri müşteri tasarımına göre sınırsız şekilde üretilebilir. Klipsler, halkalar, kancalar, zigzag formlar ve karmaşık 3D geometriler CNC makinelerimizle şekillendirilebilir.",
                answerEn: "Wire form products can be manufactured in unlimited shapes according to customer design. Clips, rings, hooks, zigzag forms, and complex 3D geometries can be shaped with our CNC machines.",
            },
            {
                questionTr: "Tel form üretimi için minimum sipariş miktarı nedir?",
                questionEn: "What is the minimum order quantity for wire form production?",
                answerTr: "Minimum sipariş miktarı ürün karmaşıklığına ve üretim sürecine bağlı olarak değişir. Prototip üretimi de dahil olmak üzere farklı miktarlarda üretim yapabiliyoruz.",
                answerEn: "The minimum order quantity varies depending on product complexity and production process. We can produce different quantities including prototype production.",
            },
        ],
    },
    "kurma-yaylar": {
        nameTr: "Kurma Yaylar",
        nameEn: "Torsion Springs",
        descriptionTr: "Kurma yaylar, dönme kuvvetine dayanarak enerji depolayan ve bu enerjiyi dönel hareket olarak geri veren endüstriyel yay türleridir.",
        descriptionEn: "Torsion springs are industrial springs that store energy by resisting rotational force and release this energy as rotational motion.",
        longDescTr: `Kurma yaylar (torsion yaylar), burulma momentine karşı çalışan ve dönel enerji depolayan yay türleridir. Uçlarındaki bacaklar sayesinde bağlı oldukları parçalara tork uygularlar.

Aktif Yay olarak, tek bacaklı, çift bacaklı ve özel bacak açılarına sahip kurma yay üretimi yapıyoruz. Otomotiv motor valflerinden ev eşyası menteşelerine kadar geniş bir uygulama yelpazesinde ürünlerimiz kullanılmaktadır.

Kurma yaylarımız yüksek yorulma dayanımına sahip malzemelerden üretilmekte ve hassas ısıl işlem süreçlerinden geçmektedir.`,
        longDescEn: `Torsion springs work against torsional moment and store rotational energy. They apply torque to connected parts through legs at their ends.

At Aktif Yay, we manufacture torsion springs with single leg, double leg, and custom leg angles. Our products are used in a wide range of applications from automotive engine valves to household hinges.

Our torsion springs are manufactured from materials with high fatigue resistance and undergo precise heat treatment processes.`,
        usageAreasTr: ["Kapı ve pencere menteşeleri", "Otomotiv motor valfları", "Geri çekme mekanizmaları", "Kollu mekanizmalar", "Tıbbi cihazlar", "Saat mekanizmaları"],
        usageAreasEn: ["Door and window hinges", "Automotive engine valves", "Retraction mechanisms", "Lever mechanisms", "Medical devices", "Clock mechanisms"],
        techSpecs: [
            { label: "Tel Çapı / Wire Diameter", valueTr: "0.2mm - 16mm", valueEn: "0.2mm - 16mm" },
            { label: "Dış Çap / Outer Diameter", valueTr: "3mm - 150mm", valueEn: "3mm - 150mm" },
            { label: "Bacak Tipi / Leg Type", valueTr: "Düz, Açılı, Kıvrımlı", valueEn: "Straight, Angled, Curved" },
            { label: "Sarım Yönü / Wind Direction", valueTr: "Sol veya Sağ", valueEn: "Left or Right" },
        ],
        faqs: [
            {
                questionTr: "Kurma yay nasıl çalışır?",
                questionEn: "How does a torsion spring work?",
                answerTr: "Kurma yay, uçlarındaki bacaklara uygulanan döndürme kuvvetine karşı direnç göstererek enerji depolar. Kuvvet kaldırıldığında, depolanan enerji dönel hareket olarak geri verilir.",
                answerEn: "A torsion spring stores energy by resisting the rotational force applied to its legs. When the force is removed, the stored energy is released as rotational motion.",
            },
            {
                questionTr: "Kurma yaylarda sarım yönü neden önemlidir?",
                questionEn: "Why is the wind direction important in torsion springs?",
                answerTr: "Sarım yönü, yayın hangi yönde dönme kuvveti uygulayacağını belirler. Yanlış sarım yönü seçimi yayın ters yönde çalışmasına ve erken arızalanmasına neden olabilir.",
                answerEn: "The wind direction determines which direction the spring will apply rotational force. Wrong wind direction selection can cause the spring to work in the opposite direction and fail prematurely.",
            },
            {
                questionTr: "Kurma yayların tork değeri nasıl hesaplanır?",
                questionEn: "How is the torque value of torsion springs calculated?",
                answerTr: "Tork değeri; tel çapı, ortalama çap, aktif sarım sayısı ve malzeme özelliklerine bağlı olarak hesaplanır. İstenen tork ve açı değerlerine göre yay parametreleri optimize edilir.",
                answerEn: "Torque value is calculated based on wire diameter, mean diameter, number of active coils, and material properties. Spring parameters are optimized according to desired torque and angle values.",
            },
        ],
    },
};

// Map English slugs to Turkish
const slugMapping: Record<string, string> = {
    "compression-springs": "basma-yaylar",
    "extension-springs": "cekme-yaylar",
    "wire-forms": "tel-form",
    "torsion-springs": "kurma-yaylar",
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const { lang, slug } = await params;
    const normalizedSlug = slugMapping[slug] || slug;
    const product = staticProducts[normalizedSlug];

    if (!product) {
        return { title: "Not Found" };
    }

    const name = lang === "tr" ? product.nameTr : product.nameEn;
    const description = lang === "tr" ? product.descriptionTr : product.descriptionEn;

    return generateSEOMetadata({
        title: lang === "tr"
            ? `${name} | Endüstriyel Yay Üretimi - Aktif Yay`
            : `${name} | Industrial Spring Manufacturing - Aktif Yay`,
        description,
        locale: lang,
        path: `/${lang === "tr" ? "urunler" : "products"}/${slug}`,
    });
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { lang, slug } = await params;
    const paths = pathMappings[lang];
    const normalizedSlug = slugMapping[slug] || slug;
    const product = staticProducts[normalizedSlug];

    if (!product) {
        notFound();
    }

    const name = lang === "tr" ? product.nameTr : product.nameEn;
    const description = lang === "tr" ? product.descriptionTr : product.descriptionEn;
    const longDesc = lang === "tr" ? product.longDescTr : product.longDescEn;
    const usageAreas = lang === "tr" ? product.usageAreasTr : product.usageAreasEn;
    const faqs = product.faqs.map(faq => ({
        question: lang === "tr" ? faq.questionTr : faq.questionEn,
        answer: lang === "tr" ? faq.answerTr : faq.answerEn,
    }));

    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aktifyay.com.tr";

    const breadcrumbItems = [
        { name: lang === "tr" ? "Ana Sayfa" : "Home", url: `${SITE_URL}/${lang}` },
        { name: lang === "tr" ? "Ürünler" : "Products", url: `${SITE_URL}/${lang}/${paths.products}` },
        { name, url: `${SITE_URL}/${lang}/${paths.products}/${slug}` },
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
                    __html: JSON.stringify(generateProductSchema(name, description, "", lang)),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateFAQSchema(faqs)),
                }}
            />

            {/* Breadcrumb */}
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                <div className="container">
                    <ol>
                        <li><Link href={`/${lang}`}>{lang === "tr" ? "Ana Sayfa" : "Home"}</Link></li>
                        <li><Link href={`/${lang}/${paths.products}`}>{lang === "tr" ? "Ürünler" : "Products"}</Link></li>
                        <li aria-current="page">{name}</li>
                    </ol>
                </div>
            </nav>

            {/* Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <Link href={`/${lang}/${paths.products}`} className={styles.backLink}>
                        <ArrowLeft size={20} />
                        {lang === "tr" ? "Tüm Ürünler" : "All Products"}
                    </Link>
                    <h1>{name}</h1>
                    <p className={styles.heroDescription}>{description}</p>
                </div>
            </section>

            {/* Content */}
            <section className="section">
                <div className="container">
                    <div className={styles.content}>
                        {/* Long Description */}
                        <div className={styles.mainContent}>
                            <h2>{lang === "tr" ? `${name} Nedir?` : `What is ${name}?`}</h2>
                            <div className={styles.longDesc}>
                                {longDesc.split("\n\n").map((paragraph, i) => (
                                    <p key={i}>{paragraph}</p>
                                ))}
                            </div>

                            {/* Usage Areas */}
                            <h2>{lang === "tr" ? "Kullanım Alanları" : "Usage Areas"}</h2>
                            <ul className={styles.usageList}>
                                {usageAreas.map((area, i) => (
                                    <li key={i}>{area}</li>
                                ))}
                            </ul>

                            {/* Technical Specs */}
                            <h2>{lang === "tr" ? "Teknik Özellikler" : "Technical Specifications"}</h2>
                            <table className={styles.specsTable}>
                                <tbody>
                                    {product.techSpecs.map((spec, i) => (
                                        <tr key={i}>
                                            <th>{spec.label}</th>
                                            <td>{lang === "tr" ? spec.valueTr : spec.valueEn}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* FAQ */}
                            <h2>{lang === "tr" ? "Sıkça Sorulan Sorular" : "Frequently Asked Questions"}</h2>
                            <div className={styles.faqList}>
                                {faqs.map((faq, i) => (
                                    <details key={i} className={styles.faqItem}>
                                        <summary>{faq.question}</summary>
                                        <p>{faq.answer}</p>
                                    </details>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className={styles.sidebar}>
                            <div className={styles.ctaCard}>
                                <h3>{lang === "tr" ? "Teklif Alın" : "Get a Quote"}</h3>
                                <p>
                                    {lang === "tr"
                                        ? "Özel üretim ihtiyaçlarınız için bugün bizimle iletişime geçin."
                                        : "Contact us today for your custom production needs."}
                                </p>
                                <Link href={`/${lang}/${paths.quote}`} className="btn btn-secondary">
                                    {lang === "tr" ? "Teklif İste" : "Request Quote"}
                                    <ArrowRight size={18} />
                                </Link>
                            </div>

                            <div className={styles.contactCard}>
                                <h3>{lang === "tr" ? "İletişim" : "Contact"}</h3>
                                <p><strong>{lang === "tr" ? "Telefon" : "Phone"}:</strong> +90 532 676 34 88</p>
                                <p><strong>Email:</strong> info@aktifyay.com.tr</p>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </>
    );
}
