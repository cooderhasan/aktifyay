import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import styles from "../products/page.module.css";
import DeleteButton from "@/components/admin/DeleteButton";

export const metadata = {
    title: "Sayfalar | Admin",
};

export default async function AdminPagesPage() {
    const pages = await prisma.page.findMany({
        orderBy: { order: "asc" },
    });

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div>
                    <h1>Sayfalar</h1>
                    <p>Statik sayfaları yönetin</p>
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                    <form action={async () => {
                        "use server";
                        const { seedDefaultPages } = await import("@/actions/admin-pages");
                        await seedDefaultPages();
                    }}>
                        <button type="submit" className={styles.addBtn} style={{ background: "#4b5563" }}>
                            Eksikleri Yükle
                        </button>
                    </form>
                    <Link href="/admin/pages/new" className={styles.addBtn}>
                        <Plus size={20} />
                        Yeni Ekle
                    </Link>
                </div>
            </header>

            <div className={styles.table}>
                <table>
                    <thead>
                        <tr>
                            <th>Sıra</th>
                            <th>Başlık (TR)</th>
                            <th>Başlık (EN)</th>
                            <th>Slug</th>
                            <th>Tip</th>
                            <th>Durum</th>
                            <th>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pages.length === 0 ? (
                            <tr>
                                <td colSpan={7} className={styles.empty}>
                                    Henüz sayfa eklenmemiş
                                </td>
                            </tr>
                        ) : (
                            pages.map((page) => (
                                <tr key={page.id}>
                                    <td>{page.order}</td>
                                    <td>{page.titleTr}</td>
                                    <td>{page.titleEn}</td>
                                    <td><code>{page.slug}</code></td>
                                    <td>{page.type}</td>
                                    <td>
                                        <span className={page.isActive ? styles.active : styles.inactive}>
                                            {page.isActive ? "Aktif" : "Pasif"}
                                        </span>
                                    </td>
                                    <td className={styles.actions}>
                                        <Link href={`/admin/pages/${page.id}`} className={styles.editBtn}>
                                            <Edit size={16} />
                                        </Link>
                                        <DeleteButton
                                            id={page.id}
                                            endpoint="/api/admin/pages"
                                            className={styles.deleteBtn}
                                            confirmMessage={`${page.titleTr} sayfasını silmek istediğinizden emin misiniz?`}
                                        />
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
