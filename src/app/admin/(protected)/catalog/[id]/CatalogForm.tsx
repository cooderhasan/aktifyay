"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import Link from "next/link";
import styles from "./CatalogForm.module.css";
import { createCatalog, updateCatalog, deleteCatalog } from "@/actions/catalog";
import FileUpload from "@/components/admin/FileUpload";
import ImageUpload from "@/components/admin/ImageUpload";
import { Catalog } from "@prisma/client";

interface CatalogFormProps {
    catalog: Catalog | null;
    isNew: boolean;
}

export default function CatalogForm({ catalog, isNew }: CatalogFormProps) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState<Partial<Catalog>>({
        nameTr: catalog?.nameTr || "",
        nameEn: catalog?.nameEn || "",
        coverImage: catalog?.coverImage || "",
        pdfUrl: catalog?.pdfUrl || "",
        order: catalog?.order || 0,
        isActive: catalog?.isActive ?? true,
    });

    const handleChange = (field: string, value: string | boolean | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            let result;
            if (isNew) {
                result = await createCatalog(formData);
            } else {
                if (!catalog?.id) return;
                result = await updateCatalog(catalog.id, formData);
            }

            if (result.success) {
                router.push("/admin/catalog");
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
        if (!catalog?.id) return;
        if (!confirm("Bu kataloğu silmek istediğinize emin misiniz?")) return;

        const result = await deleteCatalog(catalog.id);
        if (result.success) {
            router.push("/admin/catalog");
            router.refresh();
        } else {
            alert(result.error || "Silme başarısız!");
        }
    };

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <Link href="/admin/catalog" className={styles.backBtn}>
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1>{isNew ? "Yeni Katalog" : "Kataloğu Düzenle"}</h1>
                        <p>{isNew ? "Yeni katalog ekle" : formData.nameTr}</p>
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
                        <button type="button" className={styles.deleteBtn} onClick={handleDelete}>
                            <Trash2 size={18} />
                        </button>
                    )}
                </div>
            </header>

            <form onSubmit={handleSubmit}>
                <div className={styles.section}>
                    <div className={styles.grid}>
                        <div className={styles.field}>
                            <label>Katalog Adı (TR) *</label>
                            <input
                                type="text"
                                value={formData.nameTr || ""}
                                onChange={(e) => handleChange("nameTr", e.target.value)}
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

                    <div className={styles.field}>
                        <label>Catalog Name (EN) *</label>
                        <input
                            type="text"
                            value={formData.nameEn || ""}
                            onChange={(e) => handleChange("nameEn", e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <ImageUpload
                            label="Kapak Görseli"
                            value={formData.coverImage || ""}
                            onChange={(url) => handleChange("coverImage", url)}
                            description="Katalog kapağı için bir görsel yükleyin."
                        />
                    </div>

                    <div className={styles.field}>
                        <label>PDF Dosyası</label>
                        <FileUpload
                            value={formData.pdfUrl || ""}
                            onChange={(url) => handleChange("pdfUrl", url)}
                            accept=".pdf"
                            description="PDF formatında katalog dosyası yükleyin."
                        />
                    </div>
                </div>

                <div className={styles.footer}>
                    <Link href="/admin/catalog" className={styles.cancelBtn}>
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
