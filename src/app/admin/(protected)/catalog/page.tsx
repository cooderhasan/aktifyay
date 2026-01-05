import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Trash2, FileText, ImageIcon } from "lucide-react";
import styles from "./page.module.css";
import { deleteCatalog } from "@/actions/catalog";

export const metadata = {
    title: "E-Katalog Yönetimi | Admin",
};

export default async function AdminCatalogPage() {
    const catalogs = await prisma.catalog.findMany({
        orderBy: { order: "asc" },
    });

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div>
                    <h1>E-Katalog Yönetimi</h1>
                    <p>PDF katalogları ve dökümanları yönetin</p>
                </div>
                <Link href="/admin/catalog/new" className={styles.addBtn}>
                    <Plus size={20} />
                    Yeni Ekle
                </Link>
            </header>

            <div className={styles.table}>
                <table>
                    <thead>
                        <tr>
                            <th>Sıra</th>
                            <th>Kapak</th>
                            <th>Ad (TR)</th>
                            <th>Ad (EN)</th>
                            <th>PDF</th>
                            <th>Durum</th>
                            <th>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {catalogs.length === 0 ? (
                            <tr>
                                <td colSpan={7} className={styles.empty}>
                                    Henüz katalog eklenmemiş
                                </td>
                            </tr>
                        ) : (
                            catalogs.map((catalog) => (
                                <tr key={catalog.id}>
                                    <td>{catalog.order}</td>
                                    <td>
                                        {catalog.coverImage ? (
                                            <img src={catalog.coverImage} alt={catalog.nameTr} style={{ width: 40, height: 60, objectFit: "cover" }} />
                                        ) : (
                                            <ImageIcon size={24} color="#ccc" />
                                        )}
                                    </td>
                                    <td>{catalog.nameTr}</td>
                                    <td>{catalog.nameEn}</td>
                                    <td>
                                        {catalog.pdfUrl ? (
                                            <a href={catalog.pdfUrl} target="_blank" rel="noopener noreferrer" title="PDF Görüntüle">
                                                <FileText size={20} />
                                            </a>
                                        ) : (
                                            "-"
                                        )}
                                    </td>
                                    <td>
                                        <span className={catalog.isActive ? styles.active : styles.inactive}>
                                            {catalog.isActive ? "Aktif" : "Pasif"}
                                        </span>
                                    </td>
                                    <td className={styles.actions}>
                                        <Link href={`/admin/catalog/${catalog.id}`} className={styles.editBtn}>
                                            <Edit size={16} />
                                        </Link>
                                        <form action={async () => {
                                            "use server";
                                            await deleteCatalog(catalog.id);
                                        }}>
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
