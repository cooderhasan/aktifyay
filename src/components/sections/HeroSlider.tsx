"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import styles from "./HeroSlider.module.css";
import { Locale } from "@/lib/i18n";

interface HeroSlide {
    id: string;
    image: string;
    titleTr: string;
    titleEn: string;
    descTr?: string | null;
    descEn?: string | null;
    btnTextTr?: string | null;
    btnTextEn?: string | null;
    btnLink?: string | null;
    order: number;
    isActive: boolean;
}

interface HeroSliderProps {
    slides: HeroSlide[];
    lang: Locale;
}

export default function HeroSlider({ slides, lang }: HeroSliderProps) {
    const [current, setCurrent] = useState(0);

    // Auto-slide
    useEffect(() => {
        if (slides.length <= 1) return;

        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [slides.length]);

    if (!slides || slides.length === 0) return null;

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <section className={styles.slider}>
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`${styles.slide} ${index === current ? styles.active : ""}`}
                >
                    <Image
                        src={slide.image}
                        alt={lang === "tr" ? slide.titleTr : slide.titleEn}
                        fill
                        priority={index === 0}
                        sizes="100vw"
                        className={styles.backgroundImage}
                    />
                    <div className={styles.overlay} />

                    <div className={`container ${styles.container}`}>
                        <div className={styles.content}>
                            {index === 0 ? (
                                <h1 className={styles.title}>
                                    {lang === "tr" ? slide.titleTr : slide.titleEn}
                                </h1>
                            ) : (
                                <h2 className={styles.title}>
                                    {lang === "tr" ? slide.titleTr : slide.titleEn}
                                </h2>
                            )}
                            <p className={styles.description}>
                                {lang === "tr" ? slide.descTr : slide.descEn}
                            </p>
                            {(lang === "tr" ? slide.btnTextTr : slide.btnTextEn) && (
                                <div className={styles.buttons}>
                                    <Link
                                        href={slide.btnLink || "#"}
                                        className={`${styles.btn} ${styles.btnPrimary}`}
                                    >
                                        {lang === "tr" ? slide.btnTextTr : slide.btnTextEn}
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            {slides.length > 1 && (
                <>
                    <button className={`${styles.arrow} ${styles.prev}`} onClick={prevSlide}>
                        <ChevronLeft size={32} />
                    </button>
                    <button className={`${styles.arrow} ${styles.next}`} onClick={nextSlide}>
                        <ChevronRight size={32} />
                    </button>

                    <div className={styles.dots}>
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                className={`${styles.dot} ${index === current ? styles.active : ""}`}
                                onClick={() => setCurrent(index)}
                            />
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}
