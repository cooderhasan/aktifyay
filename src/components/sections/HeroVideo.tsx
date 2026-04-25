"use client";

import Link from "next/link";
import styles from "@/app/[lang]/page.module.css";
import { useEffect, useRef } from "react";

interface HeroVideoProps {
    lang: string;
    dict: any;
    videoUrl?: string;
    titleTr?: string;
    titleEn?: string;
    descTr?: string;
    descEn?: string;
}

export default function HeroVideo({
    lang,
    dict,
    videoUrl = "/hero.mp4",
    titleTr,
    titleEn,
    descTr,
    descEn
}: HeroVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Ensure video plays especially on Safari/iOS
        if (videoRef.current) {
            videoRef.current.play().catch(e => {
                console.log("Auto-play was prevented. Please interact with the document.", e);
            });
        }
    }, []);

    // Metinleri belirle (öncelik veritabanı, yoksa varsayılan)
    const title = lang === "tr" 
        ? (titleTr || "Endüstriyel Yay Üretiminde 30 Yıllık Tecrübe")
        : (titleEn || "30 Years of Experience in Industrial Spring Manufacturing");
        
    const description = lang === "tr"
        ? (descTr || dict.siteDescription)
        : (descEn || dict.siteDescription);

    return (
        <section className={styles.hero} style={{ background: "none", overflow: "hidden", position: "relative" }}>
            {/* Video Background */}
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: "translate(-50%, -50%)",
                    zIndex: 0
                }}
            >
                <source src={videoUrl} type="video/mp4" />
                Tarayıcınız video etiketini desteklemiyor.
            </video>

            {/* Dark Overlay for readability */}
            <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.5)", // Yarı saydam siyah
                zIndex: 1
            }}></div>

            {/* Content */}
            <div className="container" style={{ position: "relative", zIndex: 2 }}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle} dangerouslySetInnerHTML={{ 
                        __html: title.replace("Yay Üretiminde", "<span>Yay Üretiminde</span>").replace("Industrial Spring", "<span>Industrial Spring</span>") 
                    }} />
                    
                    <p className={styles.heroDescription}>
                        {description}
                    </p>
                    
                    <div className={styles.heroButtons}>
                        <Link
                            href={`/${lang}/${lang === "tr" ? "teklif-al" : "request-quote"}`}
                            className={styles.heroPrimaryBtn}
                        >
                            {dict.nav.quote}
                        </Link>
                        <Link
                            href={`/${lang}/${lang === "tr" ? "urunler" : "products"}`}
                            className={`btn btn-outline ${styles.btnOutlineHero}`}
                        >
                            {dict.products.viewAll}
                        </Link>
                    </div>
                </div>
            </div>
            
            {/* Optional existing dots/overlay styling */}
            <div className={styles.heroOverlay} style={{ zIndex: 1, opacity: 0.2 }}></div>
        </section>
    );
}
