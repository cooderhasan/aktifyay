"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter, MapPin, Phone, Mail, Youtube } from "lucide-react";
import { Locale, pathMappings } from "@/lib/i18n";
import { Dictionary } from "@/lib/dictionary";
import styles from "./Footer.module.css";
import Image from "next/image";

interface FooterProps {
    locale: Locale;
    dict: Dictionary;
    settings?: any;
    products?: any[];
}

export default function Footer({ locale, dict, settings, products = [] }: FooterProps) {
    const paths = pathMappings[locale] || pathMappings["tr"];

    // Use dynamic products if available, otherwise fallback
    const productLinks = products.length > 0 ? products.map(p => ({
        name: locale === "tr" ? p.nameTr : p.nameEn,
        slug: p.slug,
    })) : [
        { name: dict.products.compressionSprings, slug: locale === "tr" ? "basma-yaylar" : "compression-springs" },
        { name: dict.products.extensionSprings, slug: locale === "tr" ? "cekme-yaylar" : "extension-springs" },
        { name: dict.products.wireForms, slug: locale === "tr" ? "tel-form" : "wire-forms" },
        { name: dict.products.torsionSprings, slug: locale === "tr" ? "kurma-yaylar" : "torsion-springs" },
    ];

    const XIcon = ({ size = 20, className }: { size?: number, className?: string }) => (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-8.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
        </svg>
    );

    const socialLinks = [
        { icon: Facebook, href: settings?.facebook || "https://facebook.com", label: "Facebook" },
        { icon: Instagram, href: settings?.instagram || "https://instagram.com", label: "Instagram" },
        { icon: Linkedin, href: settings?.linkedin || "https://linkedin.com", label: "LinkedIn" },
        { icon: XIcon, href: settings?.twitter || "https://twitter.com", label: "X (Twitter)" },
        { icon: Youtube, href: settings?.youtube || "https://youtube.com", label: "Youtube" },
    ].filter(link => {
        // If settings are provided, only show link if URL exists in settings
        if (settings) {
            if (link.label === "Facebook") return !!settings.facebook;
            if (link.label === "Instagram") return !!settings.instagram;
            if (link.label === "LinkedIn") return !!settings.linkedin;
            if (link.label === "X (Twitter)") return !!settings.twitter;
            if (link.label === "Youtube") return !!settings.youtube;
        }
        return true; // Default behavior if no settings
    });

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.grid}>
                    {/* Company Info */}
                    <div className={styles.column}>
                        <Link href={`/${locale}`} className={styles.logo}>
                            {settings?.footerLogo ? (
                                <Image
                                    src={settings.footerLogo}
                                    alt="Aktif Yay"
                                    width={216}
                                    height={60}
                                    className={styles.logoImg}
                                    style={{ width: 'auto', height: '60px' }}
                                />
                            ) : settings?.logo ? (
                                <Image
                                    src={settings.logo}
                                    alt="Aktif Yay"
                                    width={216}
                                    height={60}
                                    className={styles.logoImg}
                                    style={{ width: 'auto', height: '60px' }}
                                />
                            ) : (
                                <>
                                    <span className={styles.logoText}>AKTİF</span>
                                    <span className={styles.logoAccent}>YAY</span>
                                </>
                            )}
                        </Link>
                        <p className={styles.description}>
                            {locale === "tr"
                                ? "30 yılı aşkın tecrübemizle endüstriyel yay üretiminde sektörün öncü firmalarındanız."
                                : "With over 30 years of experience, we are one of the leading companies in industrial spring manufacturing."}
                        </p>
                        <div className={styles.socialIcons}>
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className={styles.socialLink}
                                >
                                    <social.icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Access */}
                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>{dict.footer.quickLinks}</h3>
                        <ul className={styles.linkList}>
                            <li><Link href={`/${locale}`}>{dict.nav.home}</Link></li>
                            <li><Link href={`/${locale}/${paths.about}`}>{dict.nav.about}</Link></li>
                            <li><Link href={`/${locale}/${paths.products}`}>{dict.nav.products}</Link></li>
                            <li><Link href={`/${locale}/${paths.careers}`}>{dict.nav.careers}</Link></li>
                            <li><Link href={`/${locale}/${paths.contact}`}>{dict.nav.contact}</Link></li>
                        </ul>
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

                    {/* Contact */}
                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>{dict.nav.contact}</h3>
                        <div className={styles.contact}>
                            <div className={styles.contactItem}>
                                <MapPin size={20} />
                                <span>
                                    {settings?.address ? (
                                        settings.address.split('\n').map((line: string, i: number) => (
                                            <span key={i} style={{ display: 'block' }}>
                                                {line}
                                            </span>
                                        ))
                                    ) : (
                                        locale === "tr"
                                            ? "Konya Organize Sanayi Bölgesi, Konya, Türkiye"
                                            : "Konya Organized Industrial Zone, Konya, Turkey"
                                    )}
                                </span>
                            </div>
                            <div className={styles.contactItem}>
                                <Phone size={20} />
                                <a href={`tel:${settings?.phone || "+903323456789"}`}>
                                    {settings?.phone || "+90 332 345 67 89"}
                                </a>
                            </div>
                            <div className={styles.contactItem}>
                                <Mail size={20} />
                                <a href={`mailto:${settings?.email || "info@aktifyay.com.tr"}`}>
                                    {settings?.email || "info@aktifyay.com.tr"}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <div className={styles.copyright}>
                        <p>
                            &copy; {new Date().getFullYear()} Aktif Yay. {dict.footer.rights}.
                        </p>
                        <div className={styles.signature}>
                            Coded by <a href="https://hasandurmus.com" target="_blank" rel="noopener noreferrer">Hasan Durmus</a>
                        </div>
                    </div>
                    <div className={styles.legalLinks}>
                        <Link href={`/${locale}/gizlilik-politikasi`}>{dict.footer.privacyPolicy}</Link>
                        <span className={styles.legalSeparator}>|</span>
                        <Link href={`/${locale}/cerez-politikasi`}>{dict.footer.cookiePolicy}</Link>
                        <span className={styles.legalSeparator}>|</span>
                        <Link href={`/${locale}/kullanim-kosullari`}>{dict.footer.termsOfUse}</Link>
                        <span className={styles.legalSeparator}>|</span>
                        <Link href={`/${locale}/kvkk`}>{dict.footer.kvkk}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
