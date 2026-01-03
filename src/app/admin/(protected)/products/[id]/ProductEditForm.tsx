"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import Link from "next/link";
import SEOFields from "@/components/admin/SEOFields";
import InternalLinking from "@/components/admin/InternalLinking";
import styles from "./ProductEditForm.module.css";

interface ProductData {
    id?: string;
    slug: string;
    nameTr: string;
    nameEn: string;
    h1Tr?: string | null;
    h1En?: string | null;
    descriptionTr?: string | null;
    descriptionEn?: string | null;
    longDescTr?: string | null;
    longDescEn?: string | null;
    usageAreasTr?: string | null;
    usageAreasEn?: string | null;
    technicalSpecs?: string | null;
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
    image?: string | null;
    imageAltTr?: string | null;
    imageAltEn?: string | null;
    relatedIndustries?: string | null;
    isActive?: boolean;
    order?: number;
}

interface ProductEditFormProps {
    product: ProductData | null;
    industries: { slug: string; name: string }[];
    isNew: boolean;
}

export default function ProductEditForm({ product, industries, isNew }: ProductEditFormProps) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<"content" | "seo" | "linking">("content");

    const [formData, setFormData] = useState<ProductData>({
        slug: product?.slug || "",
        nameTr: product?.nameTr || "",
        nameEn: product?.nameEn || "",
        h1Tr: product?.h1Tr || "",
        h1En: product?.h1En || "",
        descriptionTr: product?.descriptionTr || "",
        descriptionEn: product?.descriptionEn || "",
        longDescTr: product?.longDescTr || "",
        longDescEn: product?.longDescEn || "",
        usageAreasTr: product?.usageAreasTr || "",
        usageAreasEn: product?.usageAreasEn || "",
        technicalSpecs: product?.technicalSpecs || "",
        metaTitleTr: product?.metaTitleTr || "",
        metaTitleEn: product?.metaTitleEn || "",
        metaDescriptionTr: product?.metaDescriptionTr || "",
        metaDescriptionEn: product?.metaDescriptionEn || "",
        ogTitleTr: product?.ogTitleTr || "",
        ogTitleEn: product?.ogTitleEn || "",
        ogDescriptionTr: product?.ogDescriptionTr || "",
        ogDescriptionEn: product?.ogDescriptionEn || "",
        ogImage: product?.ogImage || "",
        canonical: product?.canonical || "",
        isIndexed: product?.isIndexed ?? true,
        isFollowed: product?.isFollowed ?? true,
        schemaEnabled: product?.schemaEnabled ?? true,
        image: product?.image || "",
        imageAltTr: product?.imageAltTr || "",
        imageAltEn: product?.imageAltEn || "",
        relatedIndustries: product?.relatedIndustries || "[]",
        isActive: product?.isActive ?? true,
        order: product?.order ?? 0,
    });

    const handleChange = (field: string, value: string | boolean | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSEOChange = (field: string, value: string | boolean) => {
        handleChange(field, value);
    };

    const handleRelatedChange = (items: string[]) => {
        setFormData((prev) => ({ ...prev, relatedIndustries: JSON.stringify(items) }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const response = await fetch(`/api/admin/products${isNew ? "" : `/${product?.id}`}`, {
                method: isNew ? "POST" : "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                router.push("/admin/products");
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

    const relatedItems = (() => {
        try {
            return JSON.parse(formData.relatedIndustries || "[]");
        } catch {
            return [];
        }
    })();

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <Link href="/admin/products" className={styles.backBtn}>
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1>{isNew ? "Yeni Ürün Kategorisi" : "Ürün Düzenle"}</h1>
                        <p>{isNew ? "Yeni kategori oluştur" : formData.nameTr}</p>
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
                <button
                    className={`${styles.tab} ${activeTab === "linking" ? styles.active : ""}`}
                    onClick={() => setActiveTab("linking")}
                >
                    İç Linkleme
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
                                    placeholder="basma-yaylar"
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
                                <label>Ad *</label>
                                <input
                                    type="text"
                                    value={formData.nameTr}
                                    onChange={(e) => handleChange("nameTr", e.target.value)}
                                    required
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
                                <label>Detaylı Açıklama</label>
                                <textarea
                                    value={formData.longDescTr || ""}
                                    onChange={(e) => handleChange("longDescTr", e.target.value)}
                                    rows={5}
                                />
                            </div>
                            <div className={styles.field}>
                                <label>Kullanım Alanları</label>
                                <textarea
                                    value={formData.usageAreasTr || ""}
                                    onChange={(e) => handleChange("usageAreasTr", e.target.value)}
                                    rows={3}
                                    placeholder="Her satıra bir kullanım alanı"
                                />
                            </div>
                        </div>

                        <div className={styles.langSection}>
                            <h3>🇬🇧 English Content</h3>
                            <div className={styles.field}>
                                <label>Name *</label>
                                <input
                                    type="text"
                                    value={formData.nameEn}
                                    onChange={(e) => handleChange("nameEn", e.target.value)}
                                    required
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
                                <label>Long Description</label>
                                <textarea
                                    value={formData.longDescEn || ""}
                                    onChange={(e) => handleChange("longDescEn", e.target.value)}
                                    rows={5}
                                />
                            </div>
                            <div className={styles.field}>
                                <label>Usage Areas</label>
                                <textarea
                                    value={formData.usageAreasEn || ""}
                                    onChange={(e) => handleChange("usageAreasEn", e.target.value)}
                                    rows={3}
                                    placeholder="One usage area per line"
                                />
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label>Görsel URL</label>
                            <input
                                type="text"
                                value={formData.image || ""}
                                onChange={(e) => handleChange("image", e.target.value)}
                                placeholder="https://..."
                            />
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

                {/* Internal Linking Tab */}
                {activeTab === "linking" && (
                    <div className={styles.section}>
                        <InternalLinking
                            type="industries"
                            selectedItems={relatedItems}
                            availableItems={industries}
                            onChange={handleRelatedChange}
                        />
                    </div>
                )}

                <div className={styles.footer}>
                    <Link href="/admin/products" className={styles.cancelBtn}>
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
