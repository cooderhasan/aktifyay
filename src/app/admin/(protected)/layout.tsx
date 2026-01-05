import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";
import {
    LayoutDashboard,
    Package,
    Factory,
    FileText,
    MessageSquare,
    Briefcase,
    Settings,
    LogOut,
    Newspaper,
    Tags,
    BookOpen,
    Images,
} from "lucide-react";
import styles from "./layout.module.css";

export const metadata = {
    title: "Admin Panel | Aktif Yay",
    robots: { index: false, follow: false },
};

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
    const session = await auth();

    if (!session) {
        redirect("/admin/login");
    }

    const menuItems = [
        { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
        { href: "/admin/slider", icon: Images, label: "Slider Yönetimi" },
        { href: "/admin/products", icon: Package, label: "Ürün Kategorileri" },
        { href: "/admin/industries", icon: Factory, label: "Sektörler" },
        { href: "/admin/pages", icon: FileText, label: "Sayfalar" },
        { href: "/admin/quotes", icon: MessageSquare, label: "Teklif Talepleri" },
        { href: "/admin/applications", icon: Briefcase, label: "İş Başvuruları" },
        { href: "/admin/blog", icon: Newspaper, label: "Blog Yazıları" },
        { href: "/admin/blog/categories", icon: Tags, label: "Blog Kategorileri" },
        { href: "/admin/catalog", icon: BookOpen, label: "E-Kataloglar" },
        { href: "/admin/settings", icon: Settings, label: "Ayarlar" },
    ];

    return (
        <div className={styles.layout}>
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <Link href="/admin" className={styles.logo}>
                        <span className={styles.logoText}>AKTİF</span>
                        <span className={styles.logoAccent}>YAY</span>
                    </Link>
                    <span className={styles.adminBadge}>Admin</span>
                </div>

                <nav className={styles.nav}>
                    {menuItems.map((item) => (
                        <Link key={item.href} href={item.href} className={styles.navLink}>
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className={styles.sidebarFooter}>
                    <Link href="/tr" className={styles.viewSite}>
                        Siteyi Görüntüle
                    </Link>
                    <form
                        action={async () => {
                            "use server";
                            const { signOut } = await import("@/lib/auth");
                            await signOut({ redirectTo: "/admin/login" });
                        }}
                    >
                        <button type="submit" className={styles.logoutBtn}>
                            <LogOut size={18} />
                            <span>Çıkış Yap</span>
                        </button>
                    </form>
                </div>
            </aside>

            <main className={styles.main}>
                <div className={styles.content}>{children}</div>
            </main>
        </div>
    );
}
