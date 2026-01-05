import { getSettings } from "@/actions/settings";
import SettingsForm from "./SettingsForm";
import styles from "./page.module.css";

export const metadata = {
    title: "Site Ayarları | Admin",
};

export default async function AdminSettingsPage() {
    const settings = await getSettings();

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <h1>Site Ayarları</h1>
                <p>Logo, iletişim bilgileri ve entegrasyonları yönetin</p>
            </header>

            <SettingsForm initialData={settings} />
        </div>
    );
}
