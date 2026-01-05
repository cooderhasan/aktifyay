import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import styles from "./page.module.css";
import { deleteBlogCategory } from "@/actions/blog-category";

export const metadata = {
    title: "Blog Kategorileri | Admin",
};

export default async function AdminBlogCategoriesPage() {
    const categories = await prisma.blogCategory.findMany({
        orderBy: { nameTr: "asc" },
        include: { _count: { select: { posts: true } } }
    });

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div>
                    <h1>Blog Kategorileri</h1>
                    <p>Blog yazılarını gruplandırmak için kategoriler oluşturun</p>
                </div>
                <Link href="/admin/blog/categories/new" className={styles.addBtn}>
                    <Plus size={20} />
                    Yeni Ekle
                </Link>
            </header>

            <div className={styles.table}>
                <table>
                    <thead>
                        <tr>
                            <th>Ad (TR)</th>
                            <th>Ad (EN)</th>
                            <th>Slug</th>
                            <th>Yazı Sayısı</th>
                            <th>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length === 0 ? (
                            <tr>
                                <td colSpan={5} className={styles.empty}>
                                    Henüz kategori eklenmemiş
                                </td>
                            </tr>
                        ) : (
                            categories.map((category) => (
                                <tr key={category.id}>
                                    <td>{category.nameTr}</td>
                                    <td>{category.nameEn}</td>
                                    <td><code>{category.slug}</code></td>
                                    <td>{category._count.posts}</td>
                                    <td className={styles.actions}>
                                        <Link href={`/admin/blog/categories/${category.id}`} className={styles.editBtn}>
                                            <Edit size={16} />
                                        </Link>
                                        <form action={async () => {
                                            "use server";
                                            await deleteBlogCategory(category.id);
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
