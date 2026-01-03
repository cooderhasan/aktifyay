import { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Locale, pathMappings } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { generateSEOMetadata, generateBreadcrumbSchema } from "@/lib/seo";
import ContactForm from "@/components/forms/ContactForm";
import styles from "./page.module.css";

interface ContactPageProps {
    params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
    const { lang } = await params;

    return generateSEOMetadata({
        title: lang === "tr"
            ? "İletişim | Aktif Yay - Yay Üretimi Konya"
            : "Contact | Aktif Yay - Spring Manufacturing Turkey",
        description: lang === "tr"
            ? "Aktif Yay ile iletişime geçin. Konya'da endüstriyel yay üretimi. Telefon, e-posta ve adres bilgilerimiz."
            : "Contact Aktif Yay. Industrial spring manufacturing in Konya, Turkey. Phone, email and address information.",
        locale: lang,
        path: `/${lang === "tr" ? "iletisim" : "contact"}`,
    });
}

export default async function ContactPage({ params }: ContactPageProps) {
    const { lang } = await params;
    const dict = getDictionary(lang);
    const paths = pathMappings[lang];

    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aktifyay.com.tr";

    const breadcrumbItems = [
        { name: lang === "tr" ? "Ana Sayfa" : "Home", url: `${SITE_URL}/${lang}` },
        { name: dict.nav.contact, url: `${SITE_URL}/${lang}/${paths.contact}` },
    ];

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
                        <li aria-current="page">{dict.nav.contact}</li>
                    </ol>
                </div>
            </nav>

            {/* Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <h1>{dict.nav.contact}</h1>
                    <p>
                        {lang === "tr"
                            ? "Sorularınız için bizimle iletişime geçin, en kısa sürede size dönüş yapacağız."
                            : "Contact us for your questions, we will get back to you as soon as possible."}
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="section">
                <div className="container">
                    <div className={styles.grid}>
                        {/* Contact Info */}
                        <div className={styles.info}>
                            <h2>{lang === "tr" ? "İletişim Bilgileri" : "Contact Information"}</h2>

                            <div className={styles.infoCard}>
                                <div className={styles.infoItem}>
                                    <div className={styles.infoIcon}>
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h3>{dict.common.phone}</h3>
                                        <a href="tel:+905326763488">+90 532 676 34 88</a>
                                    </div>
                                </div>

                                <div className={styles.infoItem}>
                                    <div className={styles.infoIcon}>
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h3>{dict.common.email}</h3>
                                        <a href="mailto:info@aktifyay.com.tr">info@aktifyay.com.tr</a>
                                    </div>
                                </div>

                                <div className={styles.infoItem}>
                                    <div className={styles.infoIcon}>
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h3>{dict.common.address}</h3>
                                        <p>Horozluhan Mah. Yazırhan Sok. No:14<br />Selçuklu / Konya, Türkiye</p>
                                    </div>
                                </div>

                                <div className={styles.infoItem}>
                                    <div className={styles.infoIcon}>
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <h3>{lang === "tr" ? "Çalışma Saatleri" : "Working Hours"}</h3>
                                        <p>{lang === "tr" ? "Pazartesi - Cuma: 08:00 - 18:00" : "Monday - Friday: 08:00 - 18:00"}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Map */}
                            <div className={styles.map}>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3148.123456789!2d32.4943!3d37.9337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDU2JzAxLjMiTiAzMsKwMjknMzkuNSJF!5e0!3m2!1str!2str!4v1234567890"
                                    width="100%"
                                    height="300"
                                    style={{ border: 0, borderRadius: "0.75rem" }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Aktif Yay Konum"
                                />
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className={styles.formSection}>
                            <h2>{lang === "tr" ? "Bize Mesaj Gönderin" : "Send Us a Message"}</h2>
                            <ContactForm lang={lang} dict={dict} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
