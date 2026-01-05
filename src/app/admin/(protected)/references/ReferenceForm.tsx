"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createReference, updateReference } from "@/actions/reference";
import { ArrowLeft, Save, Upload } from "lucide-react";
import Link from "next/link";
import styles from "../products/page.module.css"; // Reuse general admin styles
// We'll use inline styles for the form specific parts to save time creating a new module

interface ReferenceFormProps {
    reference?: {
        id: string;
        name: string;
        image: string;
        isActive: boolean;
        order: number;
    };
}

export default function ReferenceForm({ reference }: ReferenceFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // We can use a simple state for image preview if we want, 
    // but for now let's just stick to URL input or simple file upload mechanism if implemented.
    // Since the original prompt implied "add image", I'll assume we paste a URL or use a simple input.
    // The schema has `image String`.

    async function onSubmit(formData: FormData) {
        setLoading(true);
        const res = reference
            ? await updateReference(reference.id, formData)
            : await createReference(formData);

        if (res.success) {
            router.push("/admin/references");
            router.refresh();
        } else {
            alert(res.error);
            setLoading(false);
        }
    }

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
                <Link href="/admin/references" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#f3f4f6", color: "#374151" }}>
                    <ArrowLeft size={20} />
                </Link>
                <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                    {reference ? "Referans Düzenle" : "Yeni Referans Ekle"}
                </h1>
            </div>

            <form action={onSubmit} style={{ backgroundColor: "white", padding: "2rem", borderRadius: "0.5rem", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                <div style={{ display: "grid", gap: "1.5rem" }}>
                    <div>
                        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500", color: "#374151" }}>Firma Adı</label>
                        <input
                            name="name"
                            defaultValue={reference?.name}
                            required
                            placeholder="Örn: Aktif Yay, Müşteri A.Ş"
                            style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "0.375rem" }}
                        />
                    </div>

                    <div>
                        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500", color: "#374151" }}>Logo URL</label>
                        <input
                            name="image"
                            defaultValue={reference?.image}
                            required
                            placeholder="https://..."
                            style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "0.375rem" }}
                        />
                        <p style={{ fontSize: "0.875rem", color: "#6b7280", marginTop: "0.25rem" }}>
                            Admin panelinden medya kütüphanesine yükleyip linki buraya yapıştırabilirsiniz.
                        </p>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                        <div>
                            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500", color: "#374151" }}>Sıralama</label>
                            <input
                                type="number"
                                name="order"
                                defaultValue={reference?.order || 0}
                                style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "0.375rem" }}
                            />
                        </div>

                        <div>
                            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500", color: "#374151" }}>Durum</label>
                            <select
                                name="isActive"
                                defaultValue={reference?.isActive?.toString() || "true"}
                                style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "0.375rem" }}
                            >
                                <option value="true">Aktif</option>
                                <option value="false">Pasif</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                padding: "0.75rem 1.5rem",
                                backgroundColor: loading ? "#9ca3af" : "#2563eb",
                                color: "white",
                                borderRadius: "0.375rem",
                                border: "none",
                                cursor: loading ? "not-allowed" : "pointer",
                                fontWeight: "500"
                            }}
                        >
                            <Save size={18} />
                            {loading ? "Kaydediliyor..." : "Kaydet"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
