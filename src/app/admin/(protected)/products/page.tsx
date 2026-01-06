import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit } from "lucide-react";
import styles from "./page.module.css";
import DeleteButton from "@/components/admin/DeleteButton";

export const metadata = {
    title: "Ürün Kategorileri | Admin",
};

export default async function AdminProductsPage() {
    const products = await prisma.productCategory.findMany({
        orderBy: { order: "asc" },
    });

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div>
                    <h1>Ürün Kategorileri</h1>
                    <p>Ürün kategorilerini yönetin</p>
                </div>
                <Link href="/admin/products/new" className={styles.addBtn}>
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
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={6} className={styles.empty}>
                                    Henüz ürün kategorisi eklenmemiş
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.order}</td>
                                    <td>{product.nameTr}</td>
                                    <td>{product.nameEn}</td>
                                    <td><code>{product.slug}</code></td>
                                    <td>
                                        <span className={product.isActive ? styles.active : styles.inactive}>
                                            {product.isActive ? "Aktif" : "Pasif"}
                                        </span>
                                    </td>
                                    <td className={styles.actions}>
                                        <Link href={`/admin/products/${product.id}`} className={styles.editBtn}>
                                            <Edit size={16} />
                                        </Link>
                                        <DeleteButton
                                            id={product.id}
                                            endpoint="/api/admin/products"
                                            className={styles.deleteBtn}
                                            confirmMessage={`${product.nameTr} kategorisini silmek istediğinizden emin misiniz?`}
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
