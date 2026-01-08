import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/lib/i18n";
import JobApplicationForm from "@/components/forms/JobApplicationForm";
import styles from "./page.module.css";
import { Metadata } from "next";
import { Check } from "lucide-react";

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
    const dict = getDictionary(lang);
    return {
        title: `${dict.nav.careers} | ${dict.siteName}`,
        description: dict.nav.careers,
    };
}

export default function CareerPage({ params: { lang } }: { params: { lang: Locale } }) {
    const dict = getDictionary(lang);

    // Fallback for new dictionary keys if they haven't propagated yet in dev mode (safety check)
    const whyUsItems = dict.careers.whyUsItems || [
        "Kariyer ve gelişim fırsatları",
        "Yenilikçi çalışma kültürü",
        "Sürdürülebilirlik odaklı projeler",
        "Güçlü takım ruhu"
    ];

    return (
        <main className={styles.main}>
            {/* Minimal Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <h1 className={styles.heroTitle}>{dict.careers.title}</h1>
                    <p className={styles.heroDesc}>
                        {dict.careers.description}
                    </p>
                </div>
            </section>

            <div className="container">
                <div className={styles.grid}>
                    {/* Left Column: Content */}
                    <div className={styles.textColumn}>

                        {/* Join Us Section */}
                        <div className={styles.joinSection}>
                            <h2 className={styles.joinTitle}>
                                {dict.careers.joinUsTitle || "Aramıza Katılın"}
                            </h2>
                            <p className={styles.joinText}>
                                {dict.careers.joinUsText || "Geleceği birlikte şekillendirelim."}
                            </p>
                        </div>

                        {/* Why Us Section */}
                        <div className={styles.whySection}>
                            <h3 className={styles.sectionTitle}>
                                {dict.careers.whyUsTitle || "Neden Biz?"}
                            </h3>
                            <ul className={styles.list}>
                                {whyUsItems.map((item, index) => (
                                    <li key={index} className={styles.listItem}>
                                        <Check size={20} className={styles.checkIcon} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className={styles.formColumn}>
                        <div className={styles.formWrapper}>
                            <h3 className={styles.formTitle}>
                                {dict.careers.formTitle}
                            </h3>
                            <JobApplicationForm lang={lang} dict={dict} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
