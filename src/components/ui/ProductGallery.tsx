"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./ProductGallery.module.css";

interface ProductGalleryProps {
    images: string[];
    alt: string;
}

export default function ProductGallery({ images, alt }: ProductGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    if (!images || images.length === 0) return null;

    return (
        <div className={styles.gallery}>
            <div className={styles.mainImage}>
                <div className={styles.imageWrapper}>
                    <Image
                        src={images[selectedIndex]}
                        alt={`${alt} - ${selectedIndex + 1}`}
                        fill
                        className={styles.img}
                        priority
                    />
                    {images.length > 1 && (
                        <>
                            <button
                                className={styles.navBtnPrev}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
                                }}
                                aria-label="Previous image"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                className={styles.navBtnNext}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedIndex((prev) => (prev + 1) % images.length);
                                }}
                                aria-label="Next image"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </>
                    )}
                </div>
            </div>

            {
                images.length > 1 && (
                    <div className={styles.thumbnails}>
                        {images.map((img, index) => (
                            <button
                                key={index}
                                className={`${styles.thumbnail} ${selectedIndex === index ? styles.active : ""}`}
                                onClick={() => setSelectedIndex(index)}
                            >
                                <div className={styles.thumbWrapper}>
                                    <Image
                                        src={img}
                                        alt={`${alt} thumbnail ${index + 1}`}
                                        fill
                                        className={styles.thumbImg}
                                    />
                                </div>
                            </button>
                        ))}
                    </div>
                )
            }
        </div >
    );
}
