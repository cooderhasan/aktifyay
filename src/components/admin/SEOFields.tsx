"use client";

import { useState } from "react";
import styles from "./SEOFields.module.css";

interface SEOFieldsProps {
    data: {
        metaTitleTr?: string;
        metaTitleEn?: string;
        metaDescriptionTr?: string;
        metaDescriptionEn?: string;
        h1Tr?: string;
        h1En?: string;
        ogTitleTr?: string;
        ogTitleEn?: string;
        ogDescriptionTr?: string;
        ogDescriptionEn?: string;
        ogImage?: string;
        canonical?: string;
        isIndexed?: boolean;
        isFollowed?: boolean;
        schemaEnabled?: boolean;
        imageAltTr?: string;
        imageAltEn?: string;
    };
    onChange: (field: string, value: string | boolean) => void;
    showH1?: boolean;
    showImageAlt?: boolean;
}

export default function SEOFields({ data, onChange, showH1 = true, showImageAlt = true }: SEOFieldsProps) {
    const [activeTab, setActiveTab] = useState<"tr" | "en">("tr");

    const getCharCount = (text: string | undefined, limit: number) => {
        const length = text?.length || 0;
        const status = length === 0 ? "empty" : length <= limit ? "good" : "warning";
        return { length, status };
    };

    const metaTitleLimit = 60;
    const metaDescLimit = 160;

    return (
        <div className={styles.seoFields}>
            {/* Language Tabs */}
            <div className={styles.tabs}>
                <button
                    type="button"
                    className={`${styles.tab} ${activeTab === "tr" ? styles.active : ""}`}
                    onClick={() => setActiveTab("tr")}
                >
                    🇹🇷 Türkçe
                </button>
                <button
                    type="button"
                    className={`${styles.tab} ${activeTab === "en" ? styles.active : ""}`}
                    onClick={() => setActiveTab("en")}
                >
                    🇬🇧 English
                </button>
            </div>

            {/* Turkish SEO */}
            <div className={styles.tabContent} style={{ display: activeTab === "tr" ? "block" : "none" }}>
                {showH1 && (
                    <div className={styles.field}>
                        <label>H1 Başlık (TR)</label>
                        <input
                            type="text"
                            value={data.h1Tr || ""}
                            onChange={(e) => onChange("h1Tr", e.target.value)}
                            placeholder="Sayfa ana başlığı (H1)"
                        />
                        <small>Boş bırakılırsa sayfa adı kullanılır</small>
                    </div>
                )}

                <div className={styles.field}>
                    <label>
                        Meta Title (TR)
                        <span className={styles.charCount} data-status={getCharCount(data.metaTitleTr, metaTitleLimit).status}>
                            {getCharCount(data.metaTitleTr, metaTitleLimit).length}/{metaTitleLimit}
                        </span>
                    </label>
                    <input
                        type="text"
                        value={data.metaTitleTr || ""}
                        onChange={(e) => onChange("metaTitleTr", e.target.value)}
                        placeholder="SEO başlığı (50-60 karakter önerilir)"
                    />
                </div>

                <div className={styles.field}>
                    <label>
                        Meta Description (TR)
                        <span className={styles.charCount} data-status={getCharCount(data.metaDescriptionTr, metaDescLimit).status}>
                            {getCharCount(data.metaDescriptionTr, metaDescLimit).length}/{metaDescLimit}
                        </span>
                    </label>
                    <textarea
                        value={data.metaDescriptionTr || ""}
                        onChange={(e) => onChange("metaDescriptionTr", e.target.value)}
                        placeholder="SEO açıklaması (150-160 karakter önerilir)"
                        rows={3}
                    />
                </div>

                <div className={styles.fieldGroup}>
                    <div className={styles.field}>
                        <label>OG Title (TR)</label>
                        <input
                            type="text"
                            value={data.ogTitleTr || ""}
                            onChange={(e) => onChange("ogTitleTr", e.target.value)}
                            placeholder="Sosyal medya başlığı"
                        />
                    </div>
                    <div className={styles.field}>
                        <label>OG Description (TR)</label>
                        <textarea
                            value={data.ogDescriptionTr || ""}
                            onChange={(e) => onChange("ogDescriptionTr", e.target.value)}
                            placeholder="Sosyal medya açıklaması"
                            rows={2}
                        />
                    </div>
                </div>

                {showImageAlt && (
                    <div className={styles.field}>
                        <label>Görsel Alt Tag (TR)</label>
                        <input
                            type="text"
                            value={data.imageAltTr || ""}
                            onChange={(e) => onChange("imageAltTr", e.target.value)}
                            placeholder="Görsel açıklaması (SEO için önemli)"
                        />
                    </div>
                )}
            </div>

            {/* English SEO */}
            <div className={styles.tabContent} style={{ display: activeTab === "en" ? "block" : "none" }}>
                {showH1 && (
                    <div className={styles.field}>
                        <label>H1 Title (EN)</label>
                        <input
                            type="text"
                            value={data.h1En || ""}
                            onChange={(e) => onChange("h1En", e.target.value)}
                            placeholder="Main page heading (H1)"
                        />
                        <small>If empty, page name will be used</small>
                    </div>
                )}

                <div className={styles.field}>
                    <label>
                        Meta Title (EN)
                        <span className={styles.charCount} data-status={getCharCount(data.metaTitleEn, metaTitleLimit).status}>
                            {getCharCount(data.metaTitleEn, metaTitleLimit).length}/{metaTitleLimit}
                        </span>
                    </label>
                    <input
                        type="text"
                        value={data.metaTitleEn || ""}
                        onChange={(e) => onChange("metaTitleEn", e.target.value)}
                        placeholder="SEO title (50-60 characters recommended)"
                    />
                </div>

                <div className={styles.field}>
                    <label>
                        Meta Description (EN)
                        <span className={styles.charCount} data-status={getCharCount(data.metaDescriptionEn, metaDescLimit).status}>
                            {getCharCount(data.metaDescriptionEn, metaDescLimit).length}/{metaDescLimit}
                        </span>
                    </label>
                    <textarea
                        value={data.metaDescriptionEn || ""}
                        onChange={(e) => onChange("metaDescriptionEn", e.target.value)}
                        placeholder="SEO description (150-160 characters recommended)"
                        rows={3}
                    />
                </div>

                <div className={styles.fieldGroup}>
                    <div className={styles.field}>
                        <label>OG Title (EN)</label>
                        <input
                            type="text"
                            value={data.ogTitleEn || ""}
                            onChange={(e) => onChange("ogTitleEn", e.target.value)}
                            placeholder="Social media title"
                        />
                    </div>
                    <div className={styles.field}>
                        <label>OG Description (EN)</label>
                        <textarea
                            value={data.ogDescriptionEn || ""}
                            onChange={(e) => onChange("ogDescriptionEn", e.target.value)}
                            placeholder="Social media description"
                            rows={2}
                        />
                    </div>
                </div>

                {showImageAlt && (
                    <div className={styles.field}>
                        <label>Image Alt Tag (EN)</label>
                        <input
                            type="text"
                            value={data.imageAltEn || ""}
                            onChange={(e) => onChange("imageAltEn", e.target.value)}
                            placeholder="Image description (important for SEO)"
                        />
                    </div>
                )}
            </div>

            {/* Common SEO Settings */}
            <div className={styles.section}>
                <h3>Genel SEO Ayarları</h3>

                <div className={styles.field}>
                    <label>OG Image URL</label>
                    <input
                        type="text"
                        value={data.ogImage || ""}
                        onChange={(e) => onChange("ogImage", e.target.value)}
                        placeholder="https://aktifyay.com.tr/images/og-image.jpg"
                    />
                </div>

                <div className={styles.field}>
                    <label>Canonical URL</label>
                    <input
                        type="text"
                        value={data.canonical || ""}
                        onChange={(e) => onChange("canonical", e.target.value)}
                        placeholder="Boş bırakılırsa kendi URL'i kullanılır"
                    />
                </div>

                <div className={styles.checkboxGroup}>
                    <label className={styles.checkbox}>
                        <input
                            type="checkbox"
                            checked={data.isIndexed !== false}
                            onChange={(e) => onChange("isIndexed", e.target.checked)}
                        />
                        <span>Index: Arama motorlarında görünsün</span>
                    </label>

                    <label className={styles.checkbox}>
                        <input
                            type="checkbox"
                            checked={data.isFollowed !== false}
                            onChange={(e) => onChange("isFollowed", e.target.checked)}
                        />
                        <span>Follow: Linkleri takip etsin</span>
                    </label>

                    <label className={styles.checkbox}>
                        <input
                            type="checkbox"
                            checked={data.schemaEnabled !== false}
                            onChange={(e) => onChange("schemaEnabled", e.target.checked)}
                        />
                        <span>Schema: Yapısal veri aktif</span>
                    </label>
                </div>
            </div>
        </div>
    );
}
