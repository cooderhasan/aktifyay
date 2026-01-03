"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import styles from "./page.module.css";

export default function AdminSettingsPage() {
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSaving(true);
        // TODO: Implement save functionality
        setTimeout(() => setSaving(false), 1000);
    };

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <h1>Site Ayarları</h1>
                <p>Genel site ayarlarını yapılandırın</p>
            </header>

            <form onSubmit={handleSubmit} className={styles.form}>
                {/* General Settings */}
                <section className={styles.section}>
                    <h2>Genel Bilgiler</h2>
                    <div className={styles.grid}>
                        <div className={styles.field}>
                            <label htmlFor="siteName">Site Adı</label>
                            <input type="text" id="siteName" defaultValue="Aktif Yay" />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="phone">Telefon</label>
                            <input type="tel" id="phone" defaultValue="+90 532 676 34 88" />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="email">E-posta</label>
                            <input type="email" id="email" defaultValue="info@aktifyay.com.tr" />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="address">Adres</label>
                            <input type="text" id="address" defaultValue="Horozluhan Mah. Yazırhan Sok. No:14 Selçuklu/Konya" />
                        </div>
                    </div>
                </section>

                {/* SEO Settings */}
                <section className={styles.section}>
                    <h2>SEO Ayarları</h2>
                    <div className={styles.grid}>
                        <div className={styles.field}>
                            <label htmlFor="googleVerification">Google Search Console</label>
                            <input type="text" id="googleVerification" placeholder="google-site-verification=..." />
                            <small>Google Search Console doğrulama kodu</small>
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="bingVerification">Bing Webmaster</label>
                            <input type="text" id="bingVerification" placeholder="msvalidate.01=..." />
                            <small>Bing Webmaster doğrulama kodu</small>
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="yandexVerification">Yandex Webmaster</label>
                            <input type="text" id="yandexVerification" placeholder="yandex-verification=..." />
                            <small>Yandex Webmaster doğrulama kodu</small>
                        </div>
                    </div>
                </section>

                {/* Social Media */}
                <section className={styles.section}>
                    <h2>Sosyal Medya</h2>
                    <div className={styles.grid}>
                        <div className={styles.field}>
                            <label htmlFor="facebook">Facebook</label>
                            <input type="url" id="facebook" placeholder="https://facebook.com/..." />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="instagram">Instagram</label>
                            <input type="url" id="instagram" placeholder="https://instagram.com/..." />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="linkedin">LinkedIn</label>
                            <input type="url" id="linkedin" placeholder="https://linkedin.com/company/..." />
                        </div>
                    </div>
                </section>

                <button type="submit" disabled={saving} className={styles.saveBtn}>
                    <Save size={20} />
                    {saving ? "Kaydediliyor..." : "Kaydet"}
                </button>
            </form>
        </div>
    );
}
