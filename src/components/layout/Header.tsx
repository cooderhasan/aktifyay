"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Locale, pathMappings } from "@/lib/i18n";
import { Dictionary } from "@/lib/dictionary";
import LanguageSwitcher from "./LanguageSwitcher";
import styles from "./Header.module.css";

interface HeaderProps {
    locale: Locale;
    dict: Dictionary;
}

export default function Header({ locale, dict }: HeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [productsOpen, setProductsOpen] = useState(false);
    const [industriesOpen, setIndustriesOpen] = useState(false);

    const paths = pathMappings[locale];

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
        { name: dict.industries.furniture, slug: locale === "tr" ? "mobilya" : "furniture" },
        { name: dict.industries.appliances, slug: locale === "tr" ? "beyaz-esya" : "home-appliances" },
        { name: dict.industries.medical, slug: locale === "tr" ? "medikal" : "medical" },
        { name: dict.industries.aviation, slug: locale === "tr" ? "havacilik" : "aviation" },
        { name: dict.industries.electronics, slug: locale === "tr" ? "elektrik-elektronik" : "electronics" },
    ];

    return (
        <header className={styles.header}>
            <div className={styles.topBar}>
                <div className="container">
                    <div className={styles.topBarContent}>
                        <a href="tel:+905326763488" className={styles.phone}>
                            <Phone size={16} />
                            <span>+90 532 676 34 88</span>
                        </a>
                        <LanguageSwitcher locale={locale} />
                    </div>
                </div>
            </div>

            <nav className={styles.nav}>
                <div className="container">
                    <div className={styles.navContent}>
                        <Link href={`/${locale}`} className={styles.logo}>
                            <span className={styles.logoText}>AKTİF</span>
                            <span className={styles.logoAccent}>YAY</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className={styles.desktopNav}>
                            <Link href={`/${locale}`} className={styles.navLink}>
                                {dict.nav.home}
                            </Link>
                            <Link href={`/${locale}/${paths.about}`} className={styles.navLink}>
                                {dict.nav.about}
                            </Link>

                            {/* Products Dropdown */}
                            <div
                                className={styles.dropdown}
                                onMouseEnter={() => setProductsOpen(true)}
                                onMouseLeave={() => setProductsOpen(false)}
                            >
                                <button className={styles.navLink}>
                                    {dict.nav.products}
                                    <ChevronDown size={16} />
                                </button>
                                {productsOpen && (
                                    <div className={styles.dropdownMenu}>
                                        {productLinks.map((product) => (
                                            <Link
                                                key={product.slug}
                                                href={`/${locale}/${paths.products}/${product.slug}`}
                                                className={styles.dropdownItem}
                                            >
                                                {product.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Industries Dropdown */}
                            <div
                                className={styles.dropdown}
                                onMouseEnter={() => setIndustriesOpen(true)}
                                onMouseLeave={() => setIndustriesOpen(false)}
                            >
                                <button className={styles.navLink}>
                                    {dict.nav.industries}
                                    <ChevronDown size={16} />
                                </button>
                                {industriesOpen && (
                                    <div className={styles.dropdownMenu}>
                                        {industryLinks.map((industry) => (
                                            <Link
                                                key={industry.slug}
                                                href={`/${locale}/${paths.industries}/${industry.slug}`}
                                                className={styles.dropdownItem}
                                            >
                                                {industry.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <Link href={`/${locale}/${paths.contact}`} className={styles.navLink}>
                                {dict.nav.contact}
                            </Link>

                            <Link href={`/${locale}/${paths.quote}`} className={styles.ctaButton}>
                                {dict.nav.quote}
                            </Link>
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
