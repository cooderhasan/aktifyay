"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import Link from "next/link";
import SEOFields from "@/components/admin/SEOFields";
import styles from "./CategoryForm.module.css";
import { createBlogCategory, updateBlogCategory, deleteBlogCategory } from "@/actions/blog-category";
import { BlogCategory } from "@prisma/client";

interface CategoryFormProps {
    category: BlogCategory | null;
    isNew: boolean;
}

export default function CategoryForm({ category, isNew }: CategoryFormProps) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<"content" | "seo">("content");

    const [formData, setFormData] = useState<Partial<BlogCategory>>({
        slug: category?.slug || "",
        nameTr: category?.nameTr || "",
        nameEn: category?.nameEn || "",
        descriptionTr: category?.descriptionTr || "",
        descriptionEn: category?.descriptionEn || "",
        metaTitleTr: category?.metaTitleTr || "",
        metaTitleEn: category?.metaTitleEn || "",
        metaDescriptionTr: category?.metaDescriptionTr || "",
        metaDescriptionEn: category?.metaDescriptionEn || "",
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
            let result;
            if (isNew) {
                result = await createBlogCategory(formData);
            } else {
                if (!category?.id) return;
                result = await updateBlogCategory(category.id, formData);
            }

            if (result.success) {
                router.push("/admin/blog/categories");
                router.refresh();
            } else {
                alert(result.error || "Kaydetme başarısız!");
            }
        } catch {
            alert("Bir hata oluştu!");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!category?.id) return;
        if (!confirm("Bu kategoriyi silmek istediğinize emin misiniz?")) return;

        const result = await deleteBlogCategory(category.id);
        if (result.success) {
            router.push("/admin/blog/categories");
            router.refresh();
        } else {
            alert(result.error || "Silme başarısız!");
        }
    };

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <Link href="/admin/blog/categories" className={styles.backBtn}>
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1>{isNew ? "Yeni Kategori" : "Kategoriyi Düzenle"}</h1>
                        <p>{isNew ? "Yeni kategori oluştur" : formData.nameTr}</p>
                    </div>
                </div>
                {!isNew && (
                    <div className={styles.headerActions}>
                        <button type="button" className={styles.deleteBtn} onClick={handleDelete}>
                            <Trash2 size={18} />
                        </button>
                    </div>
                )}
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
                        <div className={styles.field} style={{ marginBottom: "1.5rem" }}>
                            <label>Slug (URL) *</label>
                            <input
                                type="text"
                                value={formData.slug || ""}
                                onChange={(e) => handleChange("slug", e.target.value)}
                                placeholder="teknoloji"
                                required
                            />
                        </div>

                        <div className={styles.langSection}>
                            <h3>🇹🇷 Türkçe İçerik</h3>
                            <div className={styles.field}>
                                <label>Kategori Adı *</label>
                                <input
                                    type="text"
                                    value={formData.nameTr || ""}
                                    onChange={(e) => handleChange("nameTr", e.target.value)}
                                    required
                                />
                            </div>
                            <div className={styles.field}>
                                <label>Açıklama</label>
                                <textarea
                                    value={formData.descriptionTr || ""}
                                    onChange={(e) => handleChange("descriptionTr", e.target.value)}
                                    rows={3}
                                />
                            </div>
                        </div>

                        <div className={styles.langSection}>
                            <h3>🇬🇧 English Content</h3>
                            <div className={styles.field}>
                                <label>Category Name *</label>
                                <input
                                    type="text"
                                    value={formData.nameEn || ""}
                                    onChange={(e) => handleChange("nameEn", e.target.value)}
                                    required
                                />
                            </div>
                            <div className={styles.field}>
                                <label>Description</label>
                                <textarea
                                    value={formData.descriptionEn || ""}
                                    onChange={(e) => handleChange("descriptionEn", e.target.value)}
                                    rows={3}
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
                            }}
                            onChange={handleSEOChange}
                        />
                    </div>
                )}

                <div className={styles.footer}>
                    <Link href="/admin/blog/categories" className={styles.cancelBtn}>
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
