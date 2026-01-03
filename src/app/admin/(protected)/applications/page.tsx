import { prisma } from "@/lib/prisma";
import { Eye, Trash2, Mail, Download } from "lucide-react";
import styles from "../products/page.module.css";

export const metadata = {
    title: "İş Başvuruları | Admin",
};

export default async function AdminApplicationsPage() {
    const applications = await prisma.jobApplication.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div>
                    <h1>İş Başvuruları</h1>
                    <p>Gelen iş başvurularını yönetin</p>
                </div>
            </header>

            <div className={styles.table}>
                <table>
                    <thead>
                        <tr>
                            <th>Tarih</th>
                            <th>Ad Soyad</th>
                            <th>E-posta</th>
                            <th>Telefon</th>
                            <th>Pozisyon</th>
                            <th>CV</th>
                            <th>Durum</th>
                            <th>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.length === 0 ? (
                            <tr>
                                <td colSpan={8} className={styles.empty}>
                                    Henüz iş başvurusu yok
                                </td>
                            </tr>
                        ) : (
                            applications.map((app) => (
                                <tr key={app.id}>
                                    <td>{new Date(app.createdAt).toLocaleDateString("tr-TR")}</td>
                                    <td>{app.name}</td>
                                    <td>{app.email}</td>
                                    <td>{app.phone || "-"}</td>
                                    <td>{app.position || "-"}</td>
                                    <td>
                                        {app.cvUrl ? (
                                            <a href={app.cvUrl} target="_blank" rel="noopener" className={styles.editBtn}>
                                                <Download size={16} />
                                            </a>
                                        ) : "-"}
                                    </td>
                                    <td>
                                        <span className={app.isRead ? styles.inactive : styles.active}>
                                            {app.isRead ? "Okundu" : "Yeni"}
                                        </span>
                                    </td>
                                    <td className={styles.actions}>
                                        <button className={styles.editBtn} title="Görüntüle">
                                            <Eye size={16} />
                                        </button>
                                        <a href={`mailto:${app.email}`} className={styles.editBtn} title="E-posta Gönder">
                                            <Mail size={16} />
                                        </a>
                                        <button className={styles.deleteBtn} title="Sil">
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
