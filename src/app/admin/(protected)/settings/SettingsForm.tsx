"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import styles from "./page.module.css";
import ImageUpload from "@/components/admin/ImageUpload";
import { updateSettings } from "@/actions/settings";

interface SettingsFormProps {
    initialData: any;
}

export default function SettingsForm({ initialData }: SettingsFormProps) {
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState(initialData || {});

    const handleChange = (field: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        const res = await updateSettings(formData);
        setSaving(false);

        if (res.success) {
            alert("Ayarlar güncellendi!");
        } else {
            alert(res.error || "Hata oluştu");
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            {/* General Settings */}
            <section className={styles.section}>
                <h2>Marka & Görseller</h2>
                <div className={styles.grid}>
                    <div className={styles.field}>
                        <ImageUpload
                            label="Site Logosu"
                            description="Header'da görünecek logo (PNG formatı önerilir)"
                            value={formData.logo || ""}
                            onChange={(val) => handleChange("logo", val)}
                        />
                    </div>
                    <div className={styles.field}>
                        <ImageUpload
                            label="Favicon"
                            description="Tarayıcı sekmesinde görünecek ikon (32x32px)"
                            value={formData.favicon || ""}
                            onChange={(val) => handleChange("favicon", val)}
                        />
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <h2>İletişim Bilgileri</h2>
                <div className={styles.grid}>
                    <div className={styles.field}>
                        <label>Site Adı</label>
                        <input
                            type="text"
                            value={formData.siteName || ""}
                            onChange={(e) => handleChange("siteName", e.target.value)}
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Telefon</label>
                        <input
                            type="text"
                            value={formData.phone || ""}
                            onChange={(e) => handleChange("phone", e.target.value)}
                        />
                    </div>
                    <div className={styles.field}>
                        <label>E-posta</label>
                        <input
                            type="email"
                            value={formData.email || ""}
                            onChange={(e) => handleChange("email", e.target.value)}
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Adres</label>
                        <textarea
                            value={formData.address || ""}
                            onChange={(e) => handleChange("address", e.target.value)}
                            rows={3}
                        />
                    </div>
                </div>
            </section>

            {/* Social Media */}
            <section className={styles.section}>
                <h2>Sosyal Medya Linkleri</h2>
                <div className={styles.grid}>
                    <div className={styles.field}>
                        <label>WhatsApp Hattı</label>
                        <input
                            type="text"
                            value={formData.whatsapp || ""}
                            onChange={(e) => handleChange("whatsapp", e.target.value)}
                            placeholder="90532..."
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Facebook</label>
                        <input
                            type="url"
                            value={formData.facebook || ""}
                            onChange={(e) => handleChange("facebook", e.target.value)}
                            placeholder="https://facebook.com/..."
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Instagram</label>
                        <input
                            type="url"
                            value={formData.instagram || ""}
                            onChange={(e) => handleChange("instagram", e.target.value)}
                            placeholder="https://instagram.com/..."
                        />
                    </div>
                    <div className={styles.field}>
                        <label>LinkedIn</label>
                        <input
                            type="url"
                            value={formData.linkedin || ""}
                            onChange={(e) => handleChange("linkedin", e.target.value)}
                            placeholder="https://linkedin.com/..."
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Twitter / X</label>
                        <input
                            type="url"
                            value={formData.twitter || ""}
                            onChange={(e) => handleChange("twitter", e.target.value)}
                            placeholder="https://twitter.com/..."
                        />
                    </div>
                    <div className={styles.field}>
                        <label>YouTube</label>
                        <input
                            type="url"
                            value={formData.youtube || ""}
                            onChange={(e) => handleChange("youtube", e.target.value)}
                            placeholder="https://youtube.com/..."
                        />
                    </div>
                </div>
            </section>

            {/* Home Page SEO */}
            <section className={styles.section}>
                <h2>Ana Sayfa SEO</h2>
                <div className={styles.grid}>
                    <div className={styles.field}>
                        <label>Başlık (TR)</label>
                        <input
                            type="text"
                            value={formData.homeTitleTr || ""}
                            onChange={(e) => handleChange("homeTitleTr", e.target.value)}
                            placeholder="Aktif Yay | Endüstriyel Yay Üretimi"
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Açıklama (TR)</label>
                        <textarea
                            value={formData.homeDescTr || ""}
                            onChange={(e) => handleChange("homeDescTr", e.target.value)}
                            rows={3}
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Title (EN)</label>
                        <input
                            type="text"
                            value={formData.homeTitleEn || ""}
                            onChange={(e) => handleChange("homeTitleEn", e.target.value)}
                            placeholder="Aktif Yay | Industrial Spring Manufacturing"
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Description (EN)</label>
                        <textarea
                            value={formData.homeDescEn || ""}
                            onChange={(e) => handleChange("homeDescEn", e.target.value)}
                            rows={3}
                        />
                    </div>
                </div>
            </section>

            {/* SEO Settings */}
            <section className={styles.section}>
                <h2>Doğrulama Kodları (SEO)</h2>
                <div className={styles.grid}>
                    <div className={styles.field}>
                        <label>Google Search Console</label>
                        <input
                            type="text"
                            value={formData.googleVerification || ""}
                            onChange={(e) => handleChange("googleVerification", e.target.value)}
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Bing Webmaster</label>
                        <input
                            type="text"
                            value={formData.bingVerification || ""}
                            onChange={(e) => handleChange("bingVerification", e.target.value)}
                        />
                    </div>
                </div>
            </section>

            <button type="submit" disabled={saving} className={styles.saveBtn}>
                <Save size={20} />
                {saving ? "Kaydediliyor..." : "Kaydet"}
            </button>
        </form>
    );
}
