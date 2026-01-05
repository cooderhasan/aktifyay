import { getBlogCategories } from "@/actions/blog-category";
import { Locale } from "@/lib/i18n";
import Link from "next/link";
import styles from "./BlogSidebar.module.css";

// Prisma types fallback
type BlogCategory = any;

interface BlogSidebarProps {
    locale: Locale;
}

export default async function BlogSidebar({ locale }: BlogSidebarProps) {
    const { success, data } = await getBlogCategories();
    const categories: BlogCategory[] = success && data ? data : [];

    return (
        <aside className={styles.sidebar}>
            <div className={styles.widget}>
                <h3 className={styles.title}>
                    {locale === "tr" ? "Kategoriler" : "Categories"}
                </h3>
                {categories.length === 0 ? (
                    <p style={{ color: "var(--color-gray-500)", fontSize: "0.875rem" }}>
                        {locale === "tr" ? "Kategori bulunamadı." : "No categories found."}
                    </p>
                ) : (
                    <ul className={styles.list}>
                        {categories.map((cat) => (
                            <li key={cat.id}>
                                <Link
                                    href={`/${locale}/blog/kategori/${cat.slug}`}
                                    className={styles.link}
                                >
                                    <span>{locale === "tr" ? cat.nameTr : cat.nameEn}</span>
                                    {cat._count && (
                                        <span className={styles.count}>{cat._count.posts}</span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </aside>
    );
}
