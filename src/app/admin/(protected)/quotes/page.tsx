import { prisma } from "@/lib/prisma";
import { Eye, Trash2, Mail } from "lucide-react";
import styles from "../products/page.module.css";

export const metadata = {
    title: "Teklif Talepleri | Admin",
};

export default async function AdminQuotesPage() {
    const quotes = await prisma.quoteRequest.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div>
                    <h1>Teklif Talepleri</h1>
                    <p>Gelen teklif taleplerini yönetin</p>
                </div>
            </header>

            <div className={styles.table}>
                <table>
                    <thead>
                        <tr>
                            <th>Tarih</th>
                            <th>Ad Soyad</th>
                            <th>E-posta</th>
                            <th>Firma</th>
                            <th>Ürün</th>
                            <th>Durum</th>
                            <th>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quotes.length === 0 ? (
                            <tr>
                                <td colSpan={7} className={styles.empty}>
                                    Henüz teklif talebi yok
                                </td>
                            </tr>
                        ) : (
                            quotes.map((quote) => (
                                <tr key={quote.id}>
                                    <td>{new Date(quote.createdAt).toLocaleDateString("tr-TR")}</td>
                                    <td>{quote.name}</td>
                                    <td>{quote.email}</td>
                                    <td>{quote.company || "-"}</td>
                                    <td>{quote.product || "-"}</td>
                                    <td>
                                        <span className={quote.isRead ? styles.inactive : styles.active}>
                                            {quote.isRead ? "Okundu" : "Yeni"}
                                        </span>
                                    </td>
                                    <td className={styles.actions}>
                                        <button className={styles.editBtn} title="Görüntüle">
                                            <Eye size={16} />
                                        </button>
                                        <a href={`mailto:${quote.email}`} className={styles.editBtn} title="E-posta Gönder">
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
