"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import Link from "next/link";
import SEOFields from "@/components/admin/SEOFields";
import RichTextEditor from "@/components/admin/RichTextEditor";
import styles from "./PageForm.module.css";

interface PageData {
    id?: string;
    slug: string;
    type: string;
    titleTr: string;
    titleEn: string;
    h1Tr?: string | null;
    h1En?: string | null;
    descriptionTr?: string | null;
    descriptionEn?: string | null;
    contentTr?: string | null;
    contentEn?: string | null;
    metaTitleTr?: string | null;
    metaTitleEn?: string | null;
    metaDescriptionTr?: string | null;
    metaDescriptionEn?: string | null;
    ogTitleTr?: string | null;
    ogTitleEn?: string | null;
    ogDescriptionTr?: string | null;
    ogDescriptionEn?: string | null;
    ogImage?: string | null;
    canonical?: string | null;
    isIndexed?: boolean;
    isFollowed?: boolean;
    schemaEnabled?: boolean;
    imageAltTr?: string | null;
    imageAltEn?: string | null;
    isActive?: boolean;
    order?: number;
}

interface PageFormProps {
    page: PageData | null;
    isNew: boolean;
}

export default function PageForm({ page, isNew }: PageFormProps) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<"content" | "seo">("content");

    const [formData, setFormData] = useState<PageData>({
        slug: page?.slug || "",
        type: page?.type || "static",
        titleTr: page?.titleTr || "",
        titleEn: page?.titleEn || "",
        h1Tr: page?.h1Tr || "",
        h1En: page?.h1En || "",
        descriptionTr: page?.descriptionTr || "",
        descriptionEn: page?.descriptionEn || "",
        contentTr: page?.contentTr || "",
        contentEn: page?.contentEn || "",
        metaTitleTr: page?.metaTitleTr || "",
        metaTitleEn: page?.metaTitleEn || "",
        metaDescriptionTr: page?.metaDescriptionTr || "",
        metaDescriptionEn: page?.metaDescriptionEn || "",
        ogTitleTr: page?.ogTitleTr || "",
        ogTitleEn: page?.ogTitleEn || "",
        ogDescriptionTr: page?.ogDescriptionTr || "",
        ogDescriptionEn: page?.ogDescriptionEn || "",
        ogImage: page?.ogImage || "",
        canonical: page?.canonical || "",
        isIndexed: page?.isIndexed ?? true,
        isFollowed: page?.isFollowed ?? true,
        schemaEnabled: page?.schemaEnabled ?? true,
        imageAltTr: page?.imageAltTr || "",
        imageAltEn: page?.imageAltEn || "",
        isActive: page?.isActive ?? true,
        order: page?.order ?? 0,
    });

    const handleChange = (field: string, value: string | boolean | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSEOChange = (field: string, value: string | boolean) => {
        handleChange(field, value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const response = await fetch(`/api/admin/pages${isNew ? "" : `/${page?.id}`}`, {
                method: isNew ? "POST" : "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                router.push("/admin/pages");
                router.refresh();
            } else {
                alert("Kaydetme başarısız!");
            }
        } catch {
            alert("Bir hata oluştu!");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <Link href="/admin/pages" className={styles.backBtn}>
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1>{isNew ? "Yeni Sayfa" : "Sayfayı Düzenle"}</h1>
                        <p>{isNew ? "Yeni sayfa oluştur" : formData.titleTr}</p>
                    </div>
                </div>
                <div className={styles.headerActions}>
                    <label className={styles.activeToggle}>
                        <input
                            type="checkbox"
                            checked={formData.isActive}
                            onChange={(e) => handleChange("isActive", e.target.checked)}
                        />
                        <span>Aktif</span>
                    </label>
                    {!isNew && (
                        <button type="button" className={styles.deleteBtn}>
                            <Trash2 size={18} />
                        </button>
                    )}
                </div>
            </header>

            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === "content" ? styles.active : ""}`}
                    onClick={() => setActiveTab("content")}
                >
                    İçerik
                </button>
                <button
                    className={`${styles.tab} ${activeTab === "seo" ? styles.active : ""}`}
                    onClick={() => setActiveTab("seo")}
                >
                    SEO Ayarları
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Content Tab */}
                {activeTab === "content" && (
                    <div className={styles.section}>
                        <div className={styles.grid}>
                            <div className={styles.field}>
                                <label>Slug (URL)</label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => handleChange("slug", e.target.value)}
                                    placeholder="hakkimizda"
                                    required
                                />
                            </div>
                            <div className={styles.field}>
                                <label>Sıra</label>
                                <input
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) => handleChange("order", parseInt(e.target.value))}
                                />
                            </div>
                        </div>

                        <div className={styles.langSection}>
                            <h3>🇹🇷 Türkçe İçerik</h3>
                            <div className={styles.field}>
                                <label>Sayfa Başlığı (Title) *</label>
                                <input
                                    type="text"
                                    value={formData.titleTr}
                                    onChange={(e) => handleChange("titleTr", e.target.value)}
                                    required
                                />
                            </div>
                            <div className={styles.field}>
                                <label>H1 Başlık</label>
                                <input
                                    type="text"
                                    value={formData.h1Tr || ""}
                                    onChange={(e) => handleChange("h1Tr", e.target.value)}
                                />
                            </div>
                            <div className={styles.field}>
                                <label>Kısa Açıklama</label>
                                <textarea
                                    value={formData.descriptionTr || ""}
                                    onChange={(e) => handleChange("descriptionTr", e.target.value)}
                                    rows={3}
                                />
                            </div>
                            <div className={styles.field}>
                                <label>İçerik</label>
                                <RichTextEditor
                                    value={formData.contentTr || ""}
                                    onChange={(value) => handleChange("contentTr", value)}
                                />
                            </div>
                        </div>

                        <div className={styles.langSection}>
                            <h3>🇬🇧 English Content</h3>
                            <div className={styles.field}>
                                <label>Page Title *</label>
                                <input
                                    type="text"
                                    value={formData.titleEn}
                                    onChange={(e) => handleChange("titleEn", e.target.value)}
                                    required
                                />
                            </div>
                            <div className={styles.field}>
                                <label>H1 Title</label>
                                <input
                                    type="text"
                                    value={formData.h1En || ""}
                                    onChange={(e) => handleChange("h1En", e.target.value)}
                                />
                            </div>
                            <div className={styles.field}>
                                <label>Short Description</label>
                                <textarea
                                    value={formData.descriptionEn || ""}
                                    onChange={(e) => handleChange("descriptionEn", e.target.value)}
                                    rows={3}
                                />
                            </div>
                            <div className={styles.field}>
                                <label>Content</label>
                                <RichTextEditor
                                    value={formData.contentEn || ""}
                                    onChange={(value) => handleChange("contentEn", value)}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* SEO Tab */}
                {activeTab === "seo" && (
                    <div className={styles.section}>
                        <SEOFields
                            data={{
                                metaTitleTr: formData.metaTitleTr || undefined,
                                metaTitleEn: formData.metaTitleEn || undefined,
                                metaDescriptionTr: formData.metaDescriptionTr || undefined,
                                metaDescriptionEn: formData.metaDescriptionEn || undefined,
                                h1Tr: formData.h1Tr || undefined,
                                h1En: formData.h1En || undefined,
                                ogTitleTr: formData.ogTitleTr || undefined,
                                ogTitleEn: formData.ogTitleEn || undefined,
                                ogDescriptionTr: formData.ogDescriptionTr || undefined,
                                ogDescriptionEn: formData.ogDescriptionEn || undefined,
                                ogImage: formData.ogImage || undefined,
                                canonical: formData.canonical || undefined,
                                isIndexed: formData.isIndexed,
                                isFollowed: formData.isFollowed,
                                schemaEnabled: formData.schemaEnabled,
                                imageAltTr: formData.imageAltTr || undefined,
                                imageAltEn: formData.imageAltEn || undefined,
                            }}
                            onChange={handleSEOChange}
                        />
                    </div>
                )}

                <div className={styles.footer}>
                    <Link href="/admin/pages" className={styles.cancelBtn}>
                        İptal
                    </Link>
                    <button type="submit" disabled={saving} className={styles.saveBtn}>
                        <Save size={18} />
                        {saving ? "Kaydediliyor..." : "Kaydet"}
                    </button>
                </div>
            </form>
        </div>
    );
}
