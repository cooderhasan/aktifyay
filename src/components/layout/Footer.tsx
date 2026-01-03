import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { Locale, pathMappings } from "@/lib/i18n";
import { Dictionary } from "@/lib/dictionary";
import styles from "./Footer.module.css";

interface FooterProps {
    locale: Locale;
    dict: Dictionary;
}

export default function Footer({ locale, dict }: FooterProps) {
    const paths = pathMappings[locale];
    const currentYear = new Date().getFullYear();

    const productLinks = [
        { name: dict.products.compressionSprings, slug: locale === "tr" ? "basma-yaylar" : "compression-springs" },
        { name: dict.products.extensionSprings, slug: locale === "tr" ? "cekme-yaylar" : "extension-springs" },
        { name: dict.products.wireForms, slug: locale === "tr" ? "tel-form" : "wire-forms" },
        { name: dict.products.torsionSprings, slug: locale === "tr" ? "kurma-yaylar" : "torsion-springs" },
    ];

    const industryLinks = [
        { name: dict.industries.automotive, slug: locale === "tr" ? "otomotiv" : "automotive" },
        { name: dict.industries.defense, slug: locale === "tr" ? "savunma-sanayi" : "defense-industry" },
        { name: dict.industries.agriculture, slug: locale === "tr" ? "tarim-ziraat" : "agriculture" },
        { name: dict.industries.medical, slug: locale === "tr" ? "medikal" : "medical" },
    ];

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.grid}>
                    {/* Company Info */}
                    <div className={styles.column}>
                        <div className={styles.logo}>
                            <span className={styles.logoText}>AKTİF</span>
                            <span className={styles.logoAccent}>YAY</span>
                        </div>
                        <p className={styles.description}>
                            {dict.siteDescription}
                        </p>
                        <div className={styles.contact}>
                            <a href="tel:+905326763488" className={styles.contactItem}>
                                <Phone size={18} />
                                <span>+90 532 676 34 88</span>
                            </a>
                            <a href="mailto:info@aktifyay.com.tr" className={styles.contactItem}>
                                <Mail size={18} />
                                <span>info@aktifyay.com.tr</span>
                            </a>
                            <div className={styles.contactItem}>
                                <MapPin size={18} />
                                <span>Horozluhan Mah., Yazırhan Sok. No:14, Selçuklu/Konya</span>
                            </div>
                        </div>
                    </div>

                    {/* Products */}
                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>{dict.nav.products}</h3>
                        <ul className={styles.linkList}>
                            {productLinks.map((product) => (
                                <li key={product.slug}>
                                    <Link href={`/${locale}/${paths.products}/${product.slug}`}>
                                        {product.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Industries */}
                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>{dict.nav.industries}</h3>
                        <ul className={styles.linkList}>
                            {industryLinks.map((industry) => (
                                <li key={industry.slug}>
                                    <Link href={`/${locale}/${paths.industries}/${industry.slug}`}>
                                        {industry.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>{dict.footer.quickLinks}</h3>
                        <ul className={styles.linkList}>
                            <li>
                                <Link href={`/${locale}/${paths.about}`}>{dict.nav.about}</Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/${paths.contact}`}>{dict.nav.contact}</Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/${paths.quote}`}>{dict.nav.quote}</Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/${paths.careers}`}>{dict.nav.careers}</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>© {currentYear} Aktif Yay. {dict.footer.rights}</p>
                </div>
            </div>
        </footer>
    );
}
