"use client";

import { useState, useRef } from "react";
import { Upload, X, Video as VideoIcon, Loader2 } from "lucide-react";
import styles from "./ImageUpload.module.css";

interface VideoUploadProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    description?: string;
}

export default function VideoUpload({ value, onChange, label = "Video Yükle", description }: VideoUploadProps) {
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (data.success) {
                onChange(data.url);
            } else {
                alert(data.error || "Yükleme başarısız.");
            }
        } catch (error) {
            console.error(error);
            alert("Bir hata oluştu.");
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const handleRemove = () => {
        onChange("");
    };

    return (
        <div className={styles.container}>
            {label && <label className={styles.label}>{label}</label>}

            <div className={styles.wrapper}>
                {value ? (
                    <div className={styles.preview} style={{ aspectRatio: '16/9', maxHeight: '200px' }}>
                        <button
                            type="button"
                            onClick={handleRemove}
                            className={styles.removeBtn}
                            title="Videoyu Kaldır"
                        >
                            <X size={16} />
                        </button>
                        <video 
                            src={value} 
                            controls 
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.5rem' }} 
                        />
                    </div>
                ) : (
                    <button
                        type="button"
                        className={styles.uploadBox}
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        style={{ aspectRatio: '16/9', maxHeight: '200px' }}
                    >
                        {uploading ? (
                            <>
                                <Loader2 size={24} className="animate-spin" />
                                <span style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Yükleniyor...</span>
                            </>
                        ) : (
                            <>
                                <Upload size={24} style={{ marginBottom: '0.5rem' }} />
                                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Video Seç</span>
                                <span style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Sadece MP4 (Önerilen: < 10MB)</span>
                            </>
                        )}
                    </button>
                )}

                {value && (
                    <div className={styles.changeWrapper}>
                        <button
                            type="button"
                            className={styles.changeBtn}
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                        >
                            <VideoIcon size={16} />
                            {uploading ? "Yükleniyor..." : "Videoyu Değiştir"}
                        </button>
                    </div>
                )}
            </div>
            {description && <p className={styles.description} style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#6b7280' }}>{description}</p>}

            <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4"
                onChange={handleFileChange}
                style={{ display: "none" }}
            />
        </div>
    );
}
