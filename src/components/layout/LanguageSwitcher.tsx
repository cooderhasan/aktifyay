"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale, locales, localeNames } from "@/lib/i18n";
import styles from "./LanguageSwitcher.module.css";

interface LanguageSwitcherProps {
    locale: Locale;
}

export default function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
    const pathname = usePathname();

    const getAlternatePathname = (newLocale: Locale) => {
        const segments = pathname.split("/").filter(Boolean);
        segments[0] = newLocale;
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
                    {loc.toUpperCase()}
                </Link>
            ))}
        </div>
    );
}
