"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale, locales, localeNames } from "@/lib/i18n";
import styles from "./LanguageSwitcher.module.css";

interface LanguageSwitcherProps {
    locale: Locale;
}

const TrFlag = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" className={className}>
        <rect width="1200" height="800" fill="#E30A17" />
        <circle cx="425" cy="400" r="200" fill="#ffffff" />
        <circle cx="475" cy="400" r="160" fill="#E30A17" />
        <path d="M583.334 400l180.901 58.779-111.804-153.885v190.212l111.804-153.885z" fill="#ffffff" />
    </svg>
);

const EnFlag = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className={className}>
        <clipPath id="s">
            <path d="M0,0 v30 h60 v-30 z" />
        </clipPath>
        <clipPath id="t">
            <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
        </clipPath>
        <g clipPath="url(#s)">
            <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
            <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4" />
            <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
            <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
        </g>
    </svg>
);

export default function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
    const pathname = usePathname();

    const getAlternatePathname = (newLocale: Locale) => {
        const segments = pathname.split("/").filter(Boolean);
        // If the first segment is a locale, replace it
        if (locales.includes(segments[0] as Locale)) {
            segments[0] = newLocale;
        } else {
            // Otherwise prepend it (though middleware should handle this, safekeeping)
            segments.unshift(newLocale);
        }
        return "/" + segments.join("/");
    };

    return (
        <div className={styles.switcher}>
            {locales.map((loc) => (
                <Link
                    key={loc}
                    href={getAlternatePathname(loc)}
                    className={`${styles.link} ${loc === locale ? styles.active : ""}`}
                    aria-label={`Switch to ${localeNames[loc]}`}
                >
                    {loc === "tr" ? <TrFlag className={styles.flag} /> : <EnFlag className={styles.flag} />}
                    <span>{loc.toUpperCase()}</span>
                </Link>
            ))}
        </div>
    );
}
