"use client";

import Link from "next/link";
import { useState } from "react";
import {
    Menu, X, Phone,
    Instagram, Facebook, Linkedin, Home,
    Globe, Activity, Factory, Lightbulb,
    Award, Newspaper, BookOpen, Headphones,
    CarFront, Shield, Tractor,
    Armchair, WashingMachine, Stethoscope, Plane, Zap
} from "lucide-react";
import { Locale, pathMappings } from "@/lib/i18n";
import { Dictionary } from "@/lib/dictionary";
import LanguageSwitcher from "./LanguageSwitcher";
import styles from "./Header.module.css";
import Image from "next/image";

// Custom X (Twitter) icon component
const XIcon = ({ size = 16 }: { size?: number }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

// Youtube Icon
const YoutubeIcon = ({ size = 16 }: { size?: number }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
);

interface HeaderProps {
    locale: Locale;
    dict: Dictionary;
    settings?: any;
    products?: any[];
}

export default function Header({ locale, dict, settings, products = [] }: HeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const paths = pathMappings[locale] || pathMappings["tr"];

    // Use dynamic products if available, otherwise fallback (or empty)
    const productLinks = products.length > 0 ? products.map(p => ({
        name: locale === "tr" ? p.nameTr : p.nameEn,
        slug: p.slug,
        icon: <Activity />
    })) : [
        { name: dict.products.compressionSprings, slug: locale === "tr" ? "basma-yaylar" : "compression-springs", icon: <Activity /> },
        { name: dict.products.extensionSprings, slug: locale === "tr" ? "cekme-yaylar" : "extension-springs", icon: <Activity /> },
        { name: dict.products.wireForms, slug: locale === "tr" ? "tel-form" : "wire-forms", icon: <Activity /> },
        { name: dict.products.torsionSprings, slug: locale === "tr" ? "kurma-yaylar" : "torsion-springs" },
    ];

    const industryLinks = [
        { name: dict.industries.automotive, slug: locale === "tr" ? "otomotiv" : "automotive", icon: <CarFront /> },
        { name: dict.industries.defense, slug: locale === "tr" ? "savunma-sanayi" : "defense-industry", icon: <Shield /> },
        { name: dict.industries.agriculture, slug: locale === "tr" ? "tarim-ziraat" : "agriculture", icon: <Tractor /> },
        { name: dict.industries.furniture, slug: locale === "tr" ? "mobilya" : "furniture", icon: <Armchair /> },
        { name: dict.industries.appliances, slug: locale === "tr" ? "beyaz-esya" : "home-appliances", icon: <WashingMachine /> },
        { name: dict.industries.medical, slug: locale === "tr" ? "medikal" : "medical", icon: <Stethoscope /> },
        { name: dict.industries.aviation, slug: locale === "tr" ? "havacilik" : "aviation", icon: <Plane /> },
        { name: dict.industries.electronics, slug: locale === "tr" ? "elektrik-elektronik" : "electronics", icon: <Zap /> },
    ];

    return (
        <header className={styles.header}>
            <div className={styles.topBar}>
                <div className="container">
                    <div className={styles.topBarContent}>
                        <div className={styles.topBarLeft}>
                            <a href={`tel:${settings?.phone || "+903323456789"}`} className={styles.phone}>
                                <Phone size={16} />
                                <span>{settings?.phone || "+90 332 345 67 89"}</span>
                            </a>
                            <a href="tel:+905326763488" className={styles.callCenter}>
                                <Headphones size={16} />
                                <span>GSM: +90 532 676 34 88</span>
                            </a>
                        </div>
                        <div className={styles.topBarRight}>
                            <div className={styles.socialIcons}>
                                {(settings?.instagram || !settings) && (
                                    <a href={settings?.instagram || "https://instagram.com/aktifyay"} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                        <Instagram size={16} />
                                    </a>
                                )}
                                {(settings?.facebook || !settings) && (
                                    <a href={settings?.facebook || "https://facebook.com/aktifyay"} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                        <Facebook size={16} />
                                    </a>
                                )}
                                {(settings?.linkedin || !settings) && (
                                    <a href={settings?.linkedin || "https://linkedin.com/company/aktifyay"} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                        <Linkedin size={16} />
                                    </a>
                                )}
                                {(settings?.twitter || !settings) && (
                                    <a href={settings?.twitter || "https://x.com/aktifyay"} target="_blank" rel="noopener noreferrer" aria-label="X">
                                        <XIcon size={16} />
                                    </a>
                                )}
                                {settings?.youtube && (
                                    <a href={settings?.youtube} target="_blank" rel="noopener noreferrer" aria-label="Youtube">
                                        <YoutubeIcon size={16} />
                                    </a>
                                )}
                            </div>
                            <LanguageSwitcher locale={locale} />
                        </div>
                    </div>
                </div>
            </div>

            <nav className={styles.nav}>
                <div className="container">
                    <div className={styles.navContent}>
                        <Link href={`/${locale}`} className={styles.logo}>
                            {settings?.logo ? (
                                <img src={settings.logo} alt="Aktif Yay" className={styles.logoImg} style={{ height: '40px', width: 'auto' }} />
                            ) : (
                                <>
                                    <span className={styles.logoText}>AKTİF</span>
                                    <span className={styles.logoAccent}>YAY</span>
                                </>
                            )}
                        </Link>

                        {/* Desktop Navigation */}
                        <div className={styles.desktopNav}>
                            <div className={styles.navItem}>
                                <Link href={`/${locale}`} className={styles.navLink}>
                                    <Home strokeWidth={1.5} />
                                    <span>{dict.nav.home}</span>
                                </Link>
                            </div>

                            <div className={styles.navItem}>
                                <Link href={`/${locale}/${paths.about}`} className={styles.navLink}>
                                    <Globe strokeWidth={1.5} />
                                    <span>{dict.nav.about}</span>
                                </Link>
                            </div>

                            {/* Products Mega Menu */}
                            <div className={styles.navItem}>
                                <button className={styles.navLink}>
                                    <Activity strokeWidth={1.5} />
                                    <span>{dict.nav.products}</span>
                                </button>
                                <div className={styles.megaMenu}>
                                    <div className="container">
                                        <div className={styles.megaMenuContent}>
                                            {productLinks.map((product) => (
                                                <Link
                                                    key={product.slug}
                                                    href={`/${locale}/${paths.products}/${product.slug}`}
                                                    className={styles.megaMenuCard}
                                                >
                                                    <div className={styles.megaMenuIconWrapper}>
                                                        {product.icon || <Activity />}
                                                    </div>
                                                    <span className={styles.megaMenuTitle}>{product.name}</span>
                                                    <span className={styles.megaMenuDesc}>
                                                        {dict.nav.products}
                                                    </span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Industries Mega Menu */}
                            <div className={styles.navItem}>
                                <button className={styles.navLink}>
                                    <Factory strokeWidth={1.5} />
                                    <span>{dict.nav.industries}</span>
                                </button>
                                <div className={styles.megaMenu}>
                                    <div className="container">
                                        <div className={styles.megaMenuContent} style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                                            {industryLinks.slice(0, 8).map((industry) => (
                                                <Link
                                                    key={industry.slug}
                                                    href={`/${locale}/${paths.industries}/${industry.slug}`}
                                                    className={styles.megaMenuCard}
                                                >
                                                    <div className={styles.megaMenuIconWrapper}>
                                                        {industry.icon}
                                                    </div>
                                                    <span className={styles.megaMenuTitle}>{industry.name}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.navItem}>
                                <Link href={`/${locale}/blog`} className={styles.navLink}>
                                    <Newspaper strokeWidth={1.5} />
                                    <span>Blog</span>
                                </Link>
                            </div>

                            <div className={styles.navItem}>
                                <Link href={`/${locale}/e-katalog`} className={styles.navLink}>
                                    <BookOpen strokeWidth={1.5} />
                                    <span>{locale === "tr" ? "E-Katalog" : "E-Catalogs"}</span>
                                </Link>
                            </div>

                            <div className={styles.navItem}>
                                <Link href={`/${locale}/${paths.contact}`} className={styles.navLink}>
                                    <Phone strokeWidth={1.5} />
                                    <span>{dict.nav.contact}</span>
                                </Link>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className={styles.mobileMenuButton}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label={mobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className={styles.mobileNav}>
                        <Link
                            href={`/${locale}`}
                            className={styles.mobileNavLink}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {dict.nav.home}
                        </Link>
                        <Link
                            href={`/${locale}/${paths.about}`}
                            className={styles.mobileNavLink}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {dict.nav.about}
                        </Link>

                        <div className={styles.mobileNavGroup}>
                            <span className={styles.mobileNavGroupTitle}>{dict.nav.products}</span>
                            {productLinks.map((product) => (
                                <Link
                                    key={product.slug}
                                    href={`/${locale}/${paths.products}/${product.slug}`}
                                    className={styles.mobileNavSubLink}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {product.name}
                                </Link>
                            ))}
                        </div>

                        <div className={styles.mobileNavGroup}>
                            <span className={styles.mobileNavGroupTitle}>{dict.nav.industries}</span>
                            {industryLinks.map((industry) => (
                                <Link
                                    key={industry.slug}
                                    href={`/${locale}/${paths.industries}/${industry.slug}`}
                                    className={styles.mobileNavSubLink}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {industry.name}
                                </Link>
                            ))}
                        </div>

                        <Link href={`/${locale}/blog`} className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
                            Blog
                        </Link>

                        <Link
                            href={`/${locale}/${paths.contact}`}
                            className={styles.mobileNavLink}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {dict.nav.contact}
                        </Link>

                        <Link
                            href={`/${locale}/${paths.quote}`}
                            className={styles.mobileCta}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {dict.nav.quote}
                        </Link>
                    </div>
                )}
            </nav>
        </header>
    );
}
