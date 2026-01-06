"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import Link from "next/link";
import styles from "./SliderForm.module.css";
import ImageUpload from "@/components/admin/ImageUpload";
import { createSlider, updateSlider, deleteSlider } from "@/actions/slider";
import toast from "react-hot-toast";

interface SliderFormProps {
    slider: any;
    isNew: boolean;
}

export default function SliderForm({ slider, isNew }: SliderFormProps) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        image: slider?.image || "",

        titleTr: slider?.titleTr || "",
        titleEn: slider?.titleEn || "",

        descTr: slider?.descTr || "",
        descEn: slider?.descEn || "",

        btnTextTr: slider?.btnTextTr || "",
        btnTextEn: slider?.btnTextEn || "",
        btnLink: slider?.btnLink || "",

        order: slider?.order || 0,
        isActive: slider?.isActive ?? true,
    });

    const handleChange = (field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        const toastId = toast.loading("Kaydediliyor...");

        try {
            let result;
            if (isNew) {
                result = await createSlider(formData);
            } else {
                result = await updateSlider(slider.id, formData);
            }

            if (result.success) {
                toast.success("Başarıyla kaydedildi", { id: toastId });
                router.push("/admin/slider");
                router.refresh();
            } else {
                toast.error(result.error || "İşlem başarısız", { id: toastId });
            }
        } catch (error) {
            toast.error("Bir hata oluştu", { id: toastId });
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Bu slaytı silmek istediğinize emin misiniz?")) return;

        const toastId = toast.loading("Siliniyor...");
        const result = await deleteSlider(slider.id);

        if (result.success) {
            toast.success("Başarıyla silindi", { id: toastId });
            router.push("/admin/slider");
            router.refresh();
        } else {
            toast.error(result.error || "Silme başarısız", { id: toastId });
        }
    };

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <Link href="/admin/slider" className={styles.backBtn}>
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1>{isNew ? "Yeni Slayt" : "Slaytı Düzenle"}</h1>
                        <p>{isNew ? "Yeni manşet oluştur" : formData.titleTr}</p>
                    </div>
                </div>
                {!isNew && (
                    <div className={styles.headerActions}>
                        <button type="button" onClick={handleDelete} className={styles.deleteBtn}>
                            <Trash2 size={18} />
                        </button>
                    </div>
                )}
            </header>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.sectionTitle}>Görsel & Durum</div>
                <div className={styles.field}>
                    <ImageUpload
                        label="Arkaplan Görseli *"
                        value={formData.image}
                        onChange={(val) => handleChange("image", val)}
                        description="Yüksek çözünürlüklü (1920x1080) görsel yükleyin."
                    />
                </div>
                <div className={styles.grid}>
                    <div className={styles.field}>
                        <label>Sıralama</label>
                        <input
                            type="number"
                            value={formData.order}
                            onChange={(e) => handleChange("order", e.target.value)}
                        />
                    </div>
                    <div className={styles.field} style={{ justifyContent: 'flex-end', paddingBottom: '0.5rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={formData.isActive}
                                onChange={(e) => handleChange("isActive", e.target.checked)}
                                style={{ width: 'auto' }}
                            />
                            <span>Yayında</span>
                        </label>
                    </div>
                </div>

                <div className={styles.sectionTitle}>İçerik (Türkçe)</div>
                <div className={styles.field}>
                    <label>Başlık (TR) *</label>
                    <input
                        type="text"
                        value={formData.titleTr}
                        onChange={(e) => handleChange("titleTr", e.target.value)}
                        required
                    />
                </div>
                <div className={styles.field}>
                    <label>Açıklama (TR)</label>
                    <textarea
                        value={formData.descTr}
                        onChange={(e) => handleChange("descTr", e.target.value)}
                        rows={3}
                    />
                </div>
                <div className={styles.grid}>
                    <div className={styles.field}>
                        <label>Buton Metni (TR)</label>
                        <input
                            type="text"
                            value={formData.btnTextTr}
                            onChange={(e) => handleChange("btnTextTr", e.target.value)}
                            placeholder="Örn: İncele"
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Buton Linki</label>
                        <input
                            type="text"
                            value={formData.btnLink}
                            onChange={(e) => handleChange("btnLink", e.target.value)}
                            placeholder="Örn: /tr/urunler/basma-yaylar"
                        />
                    </div>
                </div>

                <div className={styles.sectionTitle}>Content (English)</div>
                <div className={styles.field}>
                    <label>Title (EN) *</label>
                    <input
                        type="text"
                        value={formData.titleEn}
                        onChange={(e) => handleChange("titleEn", e.target.value)}
                        required
                    />
                </div>
                <div className={styles.field}>
                    <label>Description (EN)</label>
                    <textarea
                        value={formData.descEn}
                        onChange={(e) => handleChange("descEn", e.target.value)}
                        rows={3}
                    />
                </div>
                <div className={styles.field}>
                    <label>Button Text (EN)</label>
                    <input
                        type="text"
                        value={formData.btnTextEn}
                        onChange={(e) => handleChange("btnTextEn", e.target.value)}
                        placeholder="Ex: Details"
                    />
                </div>

                <div className={styles.footer}>
                    <Link href="/admin/slider" className={styles.cancelBtn}>
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
