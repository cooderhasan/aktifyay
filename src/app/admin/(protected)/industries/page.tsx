import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import styles from "../products/page.module.css";

export const metadata = {
    title: "Sektörler | Admin",
};

export default async function AdminIndustriesPage() {
    const industries = await prisma.industry.findMany({
        orderBy: { order: "asc" },
    });

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div>
                    <h1>Sektörler</h1>
                    <p>Sektör sayfalarını yönetin</p>
                </div>
                <Link href="/admin/industries/new" className={styles.addBtn}>
                    <Plus size={20} />
                    Yeni Ekle
                </Link>
            </header>

            <div className={styles.table}>
                <table>
                    <thead>
                        <tr>
                            <th>Sıra</th>
                            <th>Ad (TR)</th>
                            <th>Ad (EN)</th>
                            <th>Slug</th>
                            <th>Durum</th>
                            <th>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {industries.length === 0 ? (
                            <tr>
                                <td colSpan={6} className={styles.empty}>
                                    Henüz sektör eklenmemiş
                                </td>
                            </tr>
                        ) : (
                            industries.map((industry) => (
                                <tr key={industry.id}>
                                    <td>{industry.order}</td>
                                    <td>{industry.nameTr}</td>
                                    <td>{industry.nameEn}</td>
                                    <td><code>{industry.slug}</code></td>
                                    <td>
                                        <span className={industry.isActive ? styles.active : styles.inactive}>
                                            {industry.isActive ? "Aktif" : "Pasif"}
                                        </span>
                                    </td>
                                    <td className={styles.actions}>
                                        <Link href={`/admin/industries/${industry.id}`} className={styles.editBtn}>
                                            <Edit size={16} />
                                        </Link>
                                        <button className={styles.deleteBtn}>
                                            <Trash2 size={16} />
                                        </button>
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
