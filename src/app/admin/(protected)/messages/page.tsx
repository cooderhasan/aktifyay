import { prisma } from "@/lib/prisma";
import styles from "../products/page.module.css";
import MessageActions from "@/components/admin/MessageActions";

export const metadata = {
    title: "İletişim Mesajları | Admin",
};

export default async function AdminMessagesPage() {
    const messages = await prisma.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div>
                    <h1>İletişim Mesajları</h1>
                    <p>Web sitesinden gelen iletişim formlarını yönetin</p>
                </div>
            </header>

            <div className={styles.table}>
                <table>
                    <thead>
                        <tr>
                            <th>Tarih</th>
                            <th>Ad Soyad</th>
                            <th>E-posta</th>
                            <th>Konu</th>
                            <th>Durum</th>
                            <th>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.length === 0 ? (
                            <tr>
                                <td colSpan={6} className={styles.empty}>
                                    Henüz mesaj yok
                                </td>
                            </tr>
                        ) : (
                            messages.map((message) => (
                                <tr key={message.id}>
                                    <td>{new Date(message.createdAt).toLocaleDateString("tr-TR")}</td>
                                    <td>{message.name}</td>
                                    <td>{message.email}</td>
                                    <td>{message.subject || "-"}</td>
                                    <td>
                                        <span className={message.isRead ? styles.inactive : styles.active}>
                                            {message.isRead ? "Okundu" : "Yeni"}
                                        </span>
                                    </td>
                                    <td className={styles.actions}>
                                        <MessageActions message={message} />
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
