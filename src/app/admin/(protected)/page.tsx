import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import {
    Package,
    Factory,
    MessageSquare,
    Briefcase,
    TrendingUp,
    Users,
    FileText,
    ArrowUpRight,
    Search,
    Images
} from "lucide-react";
import styles from "./page.module.css";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
    const session = await auth();

    if (!session?.user) {
        redirect("/admin/login");
    }

    const [productsCount, industriesCount, quotesCount, applicationsCount, referencesCount] =
        await Promise.all([
            prisma.productCategory.count(),
            prisma.industry.count(),
            prisma.quoteRequest.count({ where: { isRead: false } }),
            prisma.jobApplication.count({ where: { isRead: false } }),
            prisma.reference.count(),
        ]);

    const stats = [
        {
            label: "Toplam Ürün Kategorisi",
            value: productsCount,
            icon: Package,
            color: "#3b82f6",
            bgColor: "rgba(59, 130, 246, 0.1)",
            trend: "+12% geçen ay"
        },
        {
            label: "Sektör Sayısı",
            value: industriesCount,
            icon: Factory,
            color: "#10b981",
            bgColor: "rgba(16, 185, 129, 0.1)",
            trend: "Stabil"
        },
        {
            label: "Okunmamış Teklifler",
            value: quotesCount,
            icon: MessageSquare,
            color: "#f59e0b",
            bgColor: "rgba(245, 158, 11, 0.1)",
            trend: "Aksiyon Gerekli"
        },
        {
            label: "Yeni İş Başvuruları",
            value: applicationsCount,
            icon: Briefcase,
            color: "#8b5cf6",
            bgColor: "rgba(139, 92, 246, 0.1)",
            trend: "Yeni"
        },
    ];

    const quickActions = [
        { title: "Yeni Ürün Ekle", icon: Package, href: "/admin/products/new", desc: "Kataloğa yeni bir ürün kategorisi ekleyin" },
        { title: "Sektör Ekle", icon: Factory, href: "/admin/industries/new", desc: "Yeni bir hizmet sektörü tanımlayın" },
        { title: "Referans Ekle", icon: Images, href: "/admin/references/new", desc: "Referanslar sayfasına logo ekleyin" },
        { title: "SEO Ayarları", icon: Search, href: "/admin/settings", desc: "Site genelindeki meta etiketlerini düzenleyin" },
    ];

    return (
        <div className={styles.dashboard}>
            {/* Welcome Section */}
            <header className={styles.header}>
                <div className={styles.welcomeText}>
                    <h1>Hoş geldin, {session.user.name || "Admin"}! 👋</h1>
                    <p>Bugün sistem durumun harika görünüyor. İşte güncel özetin:</p>
                </div>
                <div className={styles.date}>
                    {new Date().toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </header>

            {/* Stats Grid */}
            <div className={styles.statsGrid}>
                {stats.map((stat) => (
                    <div key={stat.label} className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <div
                                className={styles.statIcon}
                                style={{ backgroundColor: stat.bgColor, color: stat.color }}
                            >
                                <stat.icon size={24} />
                            </div>
                            {stat.value > 0 && (
                                <div className={styles.trendBadge}>
                                    <ArrowUpRight size={14} />
                                </div>
                            )}
                        </div>
                        <div className={styles.statContent}>
                            <span className={styles.statValue}>{stat.value}</span>
                            <span className={styles.statLabel}>{stat.label}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.mainGrid}>
                {/* Quick Actions */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2>Hızlı İşlemler</h2>
                        <Link href="/admin/products" className={styles.viewAll}>tümünü gör</Link>
                    </div>
                    <div className={styles.quickActions}>
                        {quickActions.map((action) => (
                            <Link key={action.href} href={action.href} className={styles.actionCard}>
                                <div className={styles.actionIcon}>
                                    <action.icon size={24} />
                                </div>
                                <div className={styles.actionInfo}>
                                    <h3>{action.title}</h3>
                                    <p>{action.desc}</p>
                                </div>
                                <ArrowUpRight className={styles.actionArrow} size={18} />
                            </Link>
                        ))}
                    </div>
                </section>

                {/* System Status / Info */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2>Sistem Durumu</h2>
                    </div>
                    <div className={styles.systemStatus}>
                        <div className={styles.statusItem}>
                            <div className={styles.statusIcon}>
                                <TrendingUp size={20} />
                            </div>
                            <div className={styles.statusInfo}>
                                <h4>Toplam Referans</h4>
                                <p>{referencesCount} adet aktif referans</p>
                            </div>
                            <Link href="/admin/references" className={styles.statusAction}>Yönet</Link>
                        </div>

                        <div className={styles.statusItem}>
                            <div className={styles.statusIcon}>
                                <Users size={20} />
                            </div>
                            <div className={styles.statusInfo}>
                                <h4>Admin Hesabı</h4>
                                <p>{session.user.email}</p>
                            </div>
                            <button className={styles.statusAction} disabled>Aktif</button>
                        </div>

                        <div className={styles.statusItem}>
                            <div className={styles.statusIcon}>
                                <FileText size={20} />
                            </div>
                            <div className={styles.statusInfo}>
                                <h4>Yasal Sayfalar</h4>
                                <p>Gizlilik, Çerez, KVKK vb.</p>
                            </div>
                            <Link href="/admin/pages" className={styles.statusAction}>Düzenle</Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
