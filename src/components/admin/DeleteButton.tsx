"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

interface DeleteButtonProps {
    id: string;
    endpoint: string; // e.g., "/api/admin/products"
    confirmMessage?: string;
    className?: string;
    onDelete?: () => void; // Optional callback after successful delete
    iconSize?: number;
    redirectUrl?: string; // Optional URL to redirect after delete
    style?: React.CSSProperties;
}

export default function DeleteButton({
    id,
    endpoint,
    confirmMessage = "Bu öğeyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.",
    className = "",
    onDelete,
    iconSize = 16,
    redirectUrl,
    style
}: DeleteButtonProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (loading) return;

        if (!confirm(confirmMessage)) return;

        setLoading(true);
        const toastId = toast.loading("Siliniyor...");

        try {
            const response = await fetch(`${endpoint}/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                toast.success("Başarıyla silindi", { id: toastId });
                router.refresh();
                if (redirectUrl) {
                    router.push(redirectUrl);
                }
                if (onDelete) {
                    onDelete();
                }
            } else {
                const data = await response.json();
                toast.error(data.error || "Silme işlemi başarısız", { id: toastId });
            }
        } catch (error) {
            console.error(error);
            toast.error("Bir hata oluştu", { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleDelete}
            className={className}
            style={style}
            disabled={loading}
            title="Sil"
        >
            <Trash2 size={iconSize} />
        </button>
    );
}
