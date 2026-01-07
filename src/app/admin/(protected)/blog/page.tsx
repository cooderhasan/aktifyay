import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import styles from "./page.module.css";
import { deleteBlogPost } from "@/actions/blog";
import DeleteButton from "@/components/admin/DeleteButton";

export const metadata = {
    title: "Blog Yönetimi | Admin",
};

export default async function AdminBlogPage() {
    const posts = await prisma.blogPost.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div>
                    <h1>Blog Yazıları</h1>
                    <p>Blog yazılarını ve makaleleri yönetin</p>
                </div>
                <Link href="/admin/blog/new" className={styles.addBtn}>
                    <Plus size={20} />
                    Yeni Ekle
                </Link>
            </header>

            <div className={styles.table}>
                <table>
                    <thead>
                        <tr>
                            <th>Başlık (TR)</th>
                            <th>Başlık (EN)</th>
                            <th>Slug</th>
                            <th>Görüntülenme</th>
                            <th>Durum</th>
                            <th>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.length === 0 ? (
                            <tr>
                                <td colSpan={6} className={styles.empty}>
                                    Henüz blog yazısı eklenmemiş
                                </td>
                            </tr>
                        ) : (
                            posts.map((post) => (
                                <tr key={post.id}>
                                    <td>{post.titleTr}</td>
                                    <td>{post.titleEn}</td>
                                    <td><code>{post.slug}</code></td>
                                    <td>{post.viewCount}</td>
                                    <td>
                                        <span className={post.isPublished ? styles.active : styles.inactive}>
                                            {post.isPublished ? "Yayında" : "Taslak"}
                                        </span>
                                    </td>
                                    <td className={styles.actions}>
                                        <a href={`/tr/blog/${post.slug}`} target="_blank" className={styles.editBtn} title="Görüntüle">
                                            <Eye size={16} />
                                        </a>
                                        <Link href={`/admin/blog/${post.id}`} className={styles.editBtn} title="Düzenle">
                                            <Edit size={16} />
                                        </Link>
                                        <DeleteButton
                                            id={post.id}
                                            endpoint="/api/admin/blog"
                                            className={styles.deleteBtn}
                                            confirmMessage={`${post.titleTr} yazısını silmek istediğinizden emin misiniz?`}
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
