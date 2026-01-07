"use client";

import { useState } from "react";
import { Eye, Mail, Trash2 } from "lucide-react";
import { deleteMessage, markMessageAsRead } from "@/actions/messages";
import styles from "@/app/admin/(protected)/products/page.module.css";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface MessageActionsProps {
    message: any;
}

export default function MessageActions({ message }: MessageActionsProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm("Bu mesajı silmek istediğinize emin misiniz?")) return;

        setIsLoading(true);
        const res = await deleteMessage(message.id);
        setIsLoading(false);

        if (!res.success) {
            toast.error(res.error || "Mesaj silinirken bir hata oluştu");
        } else {
            toast.success("Mesaj başarıyla silindi");
            router.refresh();
        }
    };

    const handleView = async () => {
        setIsModalOpen(true);
        if (!message.isRead) {
            await markMessageAsRead(message.id);
            router.refresh();
        }
    };

    return (
        <>
            <div className={styles.actions}>
                <button
                    onClick={handleView}
                    className={styles.editBtn}
                    title="Görüntüle"
                    disabled={isLoading}
                >
                    <Eye size={16} />
                </button>
                <a
                    href={`mailto:${message.email}?subject=Konu: ${message.subject || 'İletişim Formu Yanıtı'}&body=Merhaba ${message.name},\n\n`}
                    className={styles.editBtn}
                    title="E-posta Gönder"
                >
                    <Mail size={16} />
                </a>
                <button
                    onClick={handleDelete}
                    className={styles.deleteBtn}
                    title="Sil"
                    disabled={isLoading}
                >
                    <Trash2 size={16} />
                </button>
            </div>

            {isModalOpen && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000
                }} onClick={() => setIsModalOpen(false)}>
                    <div style={{
                        backgroundColor: "white",
                        padding: "2rem",
                        borderRadius: "8px",
                        maxWidth: "600px",
                        width: "90%",
                        maxHeight: "80vh",
                        overflowY: "auto"
                    }} onClick={e => e.stopPropagation()}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                            <h2 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>Mesaj Detayı</h2>
                            <button onClick={() => setIsModalOpen(false)} style={{ fontSize: "1.5rem", lineHeight: 1 }}>&times;</button>
                        </div>

                        <div style={{ display: "grid", gap: "1rem" }}>
                            <div>
                                <strong>Tarih:</strong> {new Date(message.createdAt).toLocaleDateString("tr-TR")}
                            </div>
                            <div>
                                <strong>Ad Soyad:</strong> {message.name}
                            </div>
                            <div>
                                <strong>E-posta:</strong> {message.email}
                            </div>
                            <div>
                                <strong>Telefon:</strong> {message.phone || "-"}
                            </div>
                            <div>
                                <strong>Konu:</strong> {message.subject || "-"}
                            </div>
                            <hr style={{ borderColor: "#eee", margin: "0.5rem 0" }} />
                            <div>
                                <strong>Mesaj:</strong>
                                <p style={{ marginTop: "0.5rem", whiteSpace: "pre-wrap", background: "#f9fafb", padding: "1rem", borderRadius: "4px" }}>
                                    {message.message}
                                </p>
                            </div>
                        </div>

                        <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
                            <a
                                href={`mailto:${message.email}`}
                                style={{
                                    display: "inline-block",
                                    padding: "0.5rem 1rem",
                                    backgroundColor: "#3b82f6",
                                    color: "white",
                                    textDecoration: "none",
                                    borderRadius: "4px"
                                }}
                            >
                                Yanıtla (E-posta)
                            </a>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                style={{
                                    padding: "0.5rem 1rem",
                                    backgroundColor: "#eee",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer"
                                }}
                            >
                                Kapat
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
