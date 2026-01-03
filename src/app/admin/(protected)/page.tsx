import { prisma } from "@/lib/prisma";
import {
    Package,
    Factory,
    MessageSquare,
    Briefcase,
    TrendingUp,
} from "lucide-react";
import styles from "./page.module.css";

export default async function AdminDashboard() {
    const [productsCount, industriesCount, quotesCount, applicationsCount] =
        await Promise.all([
            prisma.productCategory.count(),
            prisma.industry.count(),
            prisma.quoteRequest.count({ where: { isRead: false } }),
            prisma.jobApplication.count({ where: { isRead: false } }),
        ]);

    const stats = [
        { label: "Ürün Kategorileri", value: productsCount, icon: Package, color: "#3b82f6" },
        { label: "Sektörler", value: industriesCount, icon: Factory, color: "#10b981" },
        { label: "Okunmamış Teklifler", value: quotesCount, icon: MessageSquare, color: "#f59e0b" },
        { label: "Yeni Başvurular", value: applicationsCount, icon: Briefcase, color: "#8b5cf6" },
    ];

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <h1>Dashboard</h1>
                <p>Aktif Yay yönetim paneline hoş geldiniz</p>
            </header>

            <div className={styles.statsGrid}>
                {stats.map((stat) => (
                    <div key={stat.label} className={styles.statCard}>
                        <div
                            className={styles.statIcon}
                            style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
                        >
                            <stat.icon size={24} />
                        </div>
                        <div className={styles.statContent}>
                            <span className={styles.statValue}>{stat.value}</span>
                            <span className={styles.statLabel}>{stat.label}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.sections}>
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2>Hızlı İşlemler</h2>
                    </div>
                    <div className={styles.quickActions}>
                        <a href="/admin/products" className={styles.actionCard}>
                            <Package size={24} />
                            <span>Ürün Ekle</span>
                        </a>
                        <a href="/admin/industries" className={styles.actionCard}>
                            <Factory size={24} />
                            <span>Sektör Ekle</span>
                        </a>
                        <a href="/admin/quotes" className={styles.actionCard}>
                            <MessageSquare size={24} />
                            <span>Teklifleri Gör</span>
                        </a>
                        <a href="/admin/settings" className={styles.actionCard}>
                            <TrendingUp size={24} />
                            <span>SEO Ayarları</span>
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
}
