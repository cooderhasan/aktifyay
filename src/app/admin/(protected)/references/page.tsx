import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import styles from "../products/page.module.css"; // Reuse existing styles
import { deleteReference } from "@/actions/reference";

export const metadata = {
    title: "Referanslar | Admin",
};

export default async function AdminReferencesPage() {
    // @ts-ignore - Prisma client outdated
    const references = await prisma.reference.findMany({
        orderBy: { order: "asc" },
    });

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div>
                    <h1>Referanslar</h1>
                    <p>Müşteri ve iş ortaklarını yönetin</p>
                </div>
                <Link href="/admin/references/new" className={styles.addBtn}>
                    <Plus size={20} />
                    Yeni Ekle
                </Link>
            </header>

            <div className={styles.table}>
                <table>
                    <thead>
                        <tr>
                            <th>Sıra</th>
                            <th>Logo</th>
                            <th>Ad</th>
                            <th>Durum</th>
                            <th>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {references.length === 0 ? (
                            <tr>
                                <td colSpan={5} className={styles.empty}>
                                    Henüz referans eklenmemiş
                                </td>
                            </tr>
                        ) : (
                            references.map((ref: any) => (
                                <tr key={ref.id}>
                                    <td>{ref.order}</td>
                                    <td>
                                        <img
                                            src={ref.image}
                                            alt={ref.name}
                                            style={{ height: "40px", objectFit: "contain", maxWidth: "100px" }}
                                        />
                                    </td>
                                    <td>{ref.name}</td>
                                    <td>
                                        <span className={ref.isActive ? styles.active : styles.inactive}>
                                            {ref.isActive ? "Aktif" : "Pasif"}
                                        </span>
                                    </td>
                                    <td className={styles.actions}>
                                        <Link href={`/admin/references/${ref.id}`} className={styles.editBtn}>
                                            <Edit size={16} />
                                        </Link>
                                        {/* @ts-expect-error - Server action type mismatch */}
                                        <form action={deleteReference.bind(null, ref.id)}>
                                            <button type="submit" className={styles.deleteBtn}>
                                                <Trash2 size={16} />
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
