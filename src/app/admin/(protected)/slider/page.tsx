import Link from "next/link";
import { Plus, Edit2, ImageIcon } from "lucide-react";
import styles from "./page.module.css";
import { getSliders } from "@/actions/slider";

export const metadata = {
    title: "Slider Yönetimi | Admin",
};

export default async function AdminSliderPage() {
    const sliders = await getSliders();

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div>
                    <h1>Slider Yönetimi</h1>
                    <p>Anasayfa manşet alanını yönetin</p>
                </div>
                <Link href="/admin/slider/new" className={styles.createBtn}>
                    <Plus size={20} />
                    Yeni Slayt
                </Link>
            </header>

            <div className={styles.grid}>
                {sliders.map((slider) => (
                    <div key={slider.id} className={styles.card}>
                        <div className={styles.imageWrapper}>
                            {slider.image ? (
                                <img src={slider.image} alt={slider.titleTr} />
                            ) : (
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#ccc'
                                }}>
                                    <ImageIcon size={48} />
                                </div>
                            )}
                            <div className={`${styles.badge} ${slider.isActive ? styles.active : styles.inactive}`}>
                                {slider.isActive ? "Aktif" : "Pasif"}
                            </div>
                        </div>
                        <div className={styles.content}>
                            <h3>{slider.titleTr}</h3>
                            <p>{slider.descTr || "Açıklama yok"}</p>
                            <div className={styles.actions}>
                                <Link href={`/admin/slider/${slider.id}`} className={styles.editBtn}>
                                    <Edit2 size={16} />
                                    Düzenle
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}

                {sliders.length === 0 && (
                    <div className={styles.emptyState}>
                        <ImageIcon size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                        <h3>Henüz slayt eklenmemiş</h3>
                        <p>Anasayfada göstermek için yeni bir slayt oluşturun.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
