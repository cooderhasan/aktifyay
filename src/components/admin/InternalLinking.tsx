"use client";

import { useState } from "react";
import styles from "./InternalLinking.module.css";

interface InternalLinkingProps {
    type: "products" | "industries";
    selectedItems: string[];
    availableItems: { slug: string; name: string }[];
    onChange: (items: string[]) => void;
}

export default function InternalLinking({
    type,
    selectedItems,
    availableItems,
    onChange,
}: InternalLinkingProps) {
    const [anchorText, setAnchorText] = useState<Record<string, string>>({});

    const handleToggle = (slug: string) => {
        if (selectedItems.includes(slug)) {
            onChange(selectedItems.filter((s) => s !== slug));
        } else {
            onChange([...selectedItems, slug]);
        }
    };

    const handleAnchorChange = (slug: string, text: string) => {
        setAnchorText((prev) => ({ ...prev, [slug]: text }));
    };

    return (
        <div className={styles.container}>
            <h3>
                {type === "products" ? "İlgili Ürünler" : "İlgili Sektörler"}
            </h3>
            <p className={styles.description}>
                {type === "products"
                    ? "Bu içerikle ilişkilendirilecek ürün kategorilerini seçin"
                    : "Bu içerikle ilişkilendirilecek sektörleri seçin"}
            </p>

            <div className={styles.items}>
                {availableItems.map((item) => (
                    <div key={item.slug} className={styles.item}>
                        <label className={styles.itemLabel}>
                            <input
                                type="checkbox"
                                checked={selectedItems.includes(item.slug)}
                                onChange={() => handleToggle(item.slug)}
                            />
                            <span>{item.name}</span>
                        </label>
                        {selectedItems.includes(item.slug) && (
                            <input
                                type="text"
                                className={styles.anchorInput}
                                placeholder="Özel anchor text (opsiyonel)"
                                value={anchorText[item.slug] || ""}
                                onChange={(e) => handleAnchorChange(item.slug, e.target.value)}
                            />
                        )}
                    </div>
                ))}
            </div>

            {availableItems.length === 0 && (
                <p className={styles.empty}>
                    {type === "products"
                        ? "Henüz ürün kategorisi eklenmemiş"
                        : "Henüz sektör eklenmemiş"}
                </p>
            )}
        </div>
    );
}
