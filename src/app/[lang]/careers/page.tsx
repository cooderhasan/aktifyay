import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/lib/i18n";
import JobApplicationForm from "@/components/forms/JobApplicationForm";
import styles from "../kariyer/page.module.css";
import { Metadata } from "next";

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
    const dict = getDictionary(lang);
    return {
        title: `${dict.nav.careers} | ${dict.siteName}`,
        description: dict.nav.careers,
    };
}

export default function CareerPage({ params: { lang } }: { params: { lang: Locale } }) {
    const dict = getDictionary(lang);

    return (
        <main className={styles.main}>
            <section className={styles.hero}>
                <div className="container">
                    <h1 className={styles.title}>{dict.careers.title}</h1>
                    <p className={styles.description}>
                        {dict.careers.description}
                    </p>
                </div>
            </section>

            {/* Form Section */}
            <section className={styles.content}>
                <div className="container">
                    <div className={styles.formWrapper}>
                        <JobApplicationForm lang={lang} dict={dict} />
                    </div>
                </div>
            </section>
        </main>
    );
}
