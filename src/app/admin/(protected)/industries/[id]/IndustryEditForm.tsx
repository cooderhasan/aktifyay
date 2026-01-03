"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import Link from "next/link";
import SEOFields from "@/components/admin/SEOFields";
import InternalLinking from "@/components/admin/InternalLinking";
import styles from "../../products/[id]/ProductEditForm.module.css";

interface IndustryData {
    id?: string;
    slug: string;
    nameTr: string;
    nameEn: string;
    h1Tr?: string | null;
    h1En?: string | null;
    descriptionTr?: string | null;
    descriptionEn?: string | null;
    contentTr?: string | null;
    contentEn?: string | null;
    solutionsTr?: string | null;
    solutionsEn?: string | null;
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
    relatedProducts?: string | null;
    isActive?: boolean;
    order?: number;
}

interface IndustryEditFormProps {
    industry: IndustryData | null;
    products: { slug: string; name: string }[];
    isNew: boolean;
}

export default function IndustryEditForm({ industry, products, isNew }: IndustryEditFormProps) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<"content" | "seo" | "linking">("content");

    const [formData, setFormData] = useState<IndustryData>({
        slug: industry?.slug || "",
        nameTr: industry?.nameTr || "",
        nameEn: industry?.nameEn || "",
        h1Tr: industry?.h1Tr || "",
        h1En: industry?.h1En || "",
        descriptionTr: industry?.descriptionTr || "",
        descriptionEn: industry?.descriptionEn || "",
        contentTr: industry?.contentTr || "",
        contentEn: industry?.contentEn || "",
        solutionsTr: industry?.solutionsTr || "",
        solutionsEn: industry?.solutionsEn || "",
        metaTitleTr: industry?.metaTitleTr || "",
        metaTitleEn: industry?.metaTitleEn || "",
        metaDescriptionTr: industry?.metaDescriptionTr || "",
        metaDescriptionEn: industry?.metaDescriptionEn || "",
        ogTitleTr: industry?.ogTitleTr || "",
        ogTitleEn: industry?.ogTitleEn || "",
        ogDescriptionTr: industry?.ogDescriptionTr || "",
        ogDescriptionEn: industry?.ogDescriptionEn || "",
        ogImage: industry?.ogImage || "",
        canonical: industry?.canonical || "",
        isIndexed: industry?.isIndexed ?? true,
        isFollowed: industry?.isFollowed ?? true,
        schemaEnabled: industry?.schemaEnabled ?? true,
        image: industry?.image || "",
        imageAltTr: industry?.imageAltTr || "",
        imageAltEn: industry?.imageAltEn || "",
        relatedProducts: industry?.relatedProducts || "[]",
        isActive: industry?.isActive ?? true,
        order: industry?.order ?? 0,
    });

    const handleChange = (field: string, value: string | boolean | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSEOChange = (field: string, value: string | boolean) => {
        handleChange(field, value);
    };

    const handleRelatedChange = (items: string[]) => {
        setFormData((prev) => ({ ...prev, relatedProducts: JSON.stringify(items) }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const response = await fetch(`/api/admin/industries${isNew ? "" : `/${industry?.id}`}`, {
                method: isNew ? "POST" : "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                router.push("/admin/industries");
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
            return JSON.parse(formData.relatedProducts || "[]");
        } catch {
            return [];
        }
    })();

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <Link href="/admin/industries" className={styles.backBtn}>
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1>{isNew ? "Yeni Sektör" : "Sektör Düzenle"}</h1>
                        <p>{isNew ? "Yeni sektör sayfası oluştur" : formData.nameTr}</p>
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
                {activeTab === "content" && (
                    <div className={styles.section}>
                        <div className={styles.grid}>
                            <div className={styles.field}>
                                <label>Slug (URL)</label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => handleChange("slug", e.target.value)}
                                    placeholder="otomotiv"
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
                                <input type="text" value={formData.nameTr} onChange={(e) => handleChange("nameTr", e.target.value)} required />
                            </div>
                            <div className={styles.field}>
                                <label>Açıklama</label>
                                <textarea value={formData.descriptionTr || ""} onChange={(e) => handleChange("descriptionTr", e.target.value)} rows={3} />
                            </div>
                            <div className={styles.field}>
                                <label>İçerik</label>
                                <textarea value={formData.contentTr || ""} onChange={(e) => handleChange("contentTr", e.target.value)} rows={5} />
                            </div>
                            <div className={styles.field}>
                                <label>Çözümler</label>
                                <textarea value={formData.solutionsTr || ""} onChange={(e) => handleChange("solutionsTr", e.target.value)} rows={3} placeholder="Her satıra bir çözüm" />
                            </div>
                        </div>

                        <div className={styles.langSection}>
                            <h3>🇬🇧 English Content</h3>
                            <div className={styles.field}>
                                <label>Name *</label>
                                <input type="text" value={formData.nameEn} onChange={(e) => handleChange("nameEn", e.target.value)} required />
                            </div>
                            <div className={styles.field}>
                                <label>Description</label>
                                <textarea value={formData.descriptionEn || ""} onChange={(e) => handleChange("descriptionEn", e.target.value)} rows={3} />
                            </div>
                            <div className={styles.field}>
                                <label>Content</label>
                                <textarea value={formData.contentEn || ""} onChange={(e) => handleChange("contentEn", e.target.value)} rows={5} />
                            </div>
                            <div className={styles.field}>
                                <label>Solutions</label>
                                <textarea value={formData.solutionsEn || ""} onChange={(e) => handleChange("solutionsEn", e.target.value)} rows={3} placeholder="One solution per line" />
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label>Görsel URL</label>
                            <input type="text" value={formData.image || ""} onChange={(e) => handleChange("image", e.target.value)} placeholder="https://..." />
                        </div>
                    </div>
                )}

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

                {activeTab === "linking" && (
                    <div className={styles.section}>
                        <InternalLinking
                            type="products"
                            selectedItems={relatedItems}
                            availableItems={products}
                            onChange={handleRelatedChange}
                        />
                    </div>
                )}

                <div className={styles.footer}>
                    <Link href="/admin/industries" className={styles.cancelBtn}>İptal</Link>
                    <button type="submit" disabled={saving} className={styles.saveBtn}>
                        <Save size={18} />
                        {saving ? "Kaydediliyor..." : "Kaydet"}
                    </button>
                </div>
            </form>
        </div>
    );
}
