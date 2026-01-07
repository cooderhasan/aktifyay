
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import styles from "./VideoForm.module.css";
import toast from "react-hot-toast";

interface VideoData {
    id?: string;
    youtubeUrl: string;
    titleTr: string;
    titleEn: string;
    descTr?: string | null;
    descEn?: string | null;
    isActive: boolean;
    order: number;
}

interface VideoFormProps {
    video: VideoData | null;
    isNew: boolean;
}

function getYoutubeId(url: string) {
    if (!url) return null;
    // Updated regex to include shorts/
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

export default function VideoForm({ video, isNew }: VideoFormProps) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [videoId, setVideoId] = useState<string | null>(null);

    const [formData, setFormData] = useState<VideoData>({
        youtubeUrl: video?.youtubeUrl || "",
        titleTr: video?.titleTr || "",
        titleEn: video?.titleEn || "",
        descTr: video?.descTr || "",
        descEn: video?.descEn || "",
        isActive: video?.isActive ?? true,
        order: video?.order ?? 0,
    });

    useEffect(() => {
        if (formData.youtubeUrl) {
            setVideoId(getYoutubeId(formData.youtubeUrl));
        }
    }, [formData.youtubeUrl]);

    const handleChange = (field: string, value: string | boolean | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!videoId) {
            toast.error("Geçerli bir YouTube URL'si giriniz.");
            return;
        }

        setSaving(true);
        const toastId = toast.loading("Kaydediliyor...");

        try {
            const response = await fetch(`/api/admin/videos${isNew ? "" : `/${video?.id}`}`, {
                method: isNew ? "POST" : "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success("Başarıyla kaydedildi", { id: toastId });
                router.push("/admin/videos");
                router.refresh();
            } else {
                toast.error("Kaydetme başarısız!", { id: toastId });
            }
        } catch {
            toast.error("Bir hata oluştu!", { id: toastId });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <Link href="/admin/videos" className={styles.backBtn}>
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1>{isNew ? "Yeni Video" : "Video Düzenle"}</h1>
                        <p>{isNew ? "Yeni YouTube videosu ekle" : formData.titleTr}</p>
                    </div>
                </div>
            </header>

            <form onSubmit={handleSubmit}>
                <div className={styles.section}>
                    <div className={styles.field}>
                        <label>YouTube URL *</label>
                        <input
                            type="text"
                            value={formData.youtubeUrl}
                            onChange={(e) => handleChange("youtubeUrl", e.target.value)}
                            placeholder="https://www.youtube.com/watch?v=..."
                            required
                        />
                        {videoId && (
                            <div className={styles.preview}>
                                <iframe
                                    src={`https://www.youtube.com/embed/${videoId}`}
                                    title="Video Preview"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        )}
                    </div>

                    <div className={styles.grid}>
                        <div className={styles.field}>
                            <label>Sıra</label>
                            <input
                                type="number"
                                value={formData.order}
                                onChange={(e) => handleChange("order", parseInt(e.target.value))}
                            />
                        </div>
                        <div className={styles.field} style={{ flexDirection: 'row', alignItems: 'center', marginTop: '1.5rem' }}>
                            <input
                                type="checkbox"
                                checked={formData.isActive}
                                onChange={(e) => handleChange("isActive", e.target.checked)}
                                style={{ width: 'auto', marginRight: '0.5rem' }}
                            />
                            <label style={{ margin: 0 }}>Aktif</label>
                        </div>
                    </div>

                    <div className={styles.langSection}>
                        <h3>🇹🇷 Türkçe İçerik</h3>
                        <div className={styles.field}>
                            <label>Başlık *</label>
                            <input
                                type="text"
                                value={formData.titleTr}
                                onChange={(e) => handleChange("titleTr", e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.field}>
                            <label>Açıklama</label>
                            <textarea
                                value={formData.descTr || ""}
                                onChange={(e) => handleChange("descTr", e.target.value)}
                                rows={3}
                            />
                        </div>
                    </div>

                    <div className={styles.langSection}>
                        <h3>🇬🇧 English Content</h3>
                        <div className={styles.field}>
                            <label>Title *</label>
                            <input
                                type="text"
                                value={formData.titleEn}
                                onChange={(e) => handleChange("titleEn", e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.field}>
                            <label>Description</label>
                            <textarea
                                value={formData.descEn || ""}
                                onChange={(e) => handleChange("descEn", e.target.value)}
                                rows={3}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.footer}>
                    <Link href="/admin/videos" className={styles.cancelBtn}>
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
