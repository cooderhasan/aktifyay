
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit } from "lucide-react";
import styles from "./page.module.css";
import DeleteButton from "@/components/admin/DeleteButton";

export const metadata = {
    title: "Üretim Videoları | Admin",
};

export default async function AdminVideosPage() {
    const videos = await prisma.video.findMany({
        orderBy: { order: "asc" },
    });

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div>
                    <h1>Üretim Videoları</h1>
                    <p>YouTube videolarını ve galeriyi yönetin</p>
                </div>
                <Link href="/admin/videos/new" className={styles.addBtn}>
                    <Plus size={20} />
                    Yeni Ekle
                </Link>
            </header>

            <div className={styles.table}>
                <table>
                    <thead>
                        <tr>
                            <th>Sıra</th>
                            <th>Başlık (TR)</th>
                            <th>URL</th>
                            <th>Durum</th>
                            <th>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {videos.length === 0 ? (
                            <tr>
                                <td colSpan={5} className={styles.empty}>
                                    Henüz video eklenmemiş
                                </td>
                            </tr>
                        ) : (
                            videos.map((video) => (
                                <tr key={video.id}>
                                    <td>{video.order}</td>
                                    <td>{video.titleTr}</td>
                                    <td><code>{video.youtubeUrl}</code></td>
                                    <td>
                                        <span className={video.isActive ? styles.active : styles.inactive}>
                                            {video.isActive ? "Aktif" : "Pasif"}
                                        </span>
                                    </td>
                                    <td className={styles.actions}>
                                        <Link href={`/admin/videos/${video.id}`} className={styles.editBtn}>
                                            <Edit size={16} />
                                        </Link>
                                        <DeleteButton
                                            id={video.id}
                                            endpoint="/api/admin/videos"
                                            className={styles.deleteBtn}
                                            confirmMessage={`${video.titleTr} videosunu silmek istediğinizden emin misiniz?`}
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
