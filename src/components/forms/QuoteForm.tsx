"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Locale } from "@/lib/i18n";
import { Dictionary } from "@/lib/dictionary";
import styles from "./ContactForm.module.css";

interface QuoteFormProps {
    lang: Locale;
    dict: Dictionary;
}

interface FormData {
    name: string;
    email: string;
    phone: string;
    company: string;
    product: string;
    quantity: string;
    message: string;
}

export default function QuoteForm({ lang, dict }: QuoteFormProps) {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>();

    const products = [
        lang === "tr" ? "Basma Yay" : "Compression Spring",
        lang === "tr" ? "Çekme Yay" : "Extension Spring",
        lang === "tr" ? "Kurma Yay" : "Torsion Spring",
        lang === "tr" ? "Tel Form" : "Wire Form",
        lang === "tr" ? "Diğer" : "Other",
    ];

    const onSubmit = async (data: FormData) => {
        setStatus("loading");

        try {
            const response = await fetch("/api/quote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setStatus("success");

                // Google Ads Conversion Tracking
                if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'generate_lead', {
                        event_category: 'lead',
                        event_label: 'teklif_formu',
                        value: 1
                    });
                }

                reset();
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {status === "success" && (
                <div className={styles.success}>{dict.forms.success}</div>
            )}
            {status === "error" && (
                <div className={styles.error}>{dict.forms.error}</div>
            )}

            <div className={styles.row}>
                <div className={styles.field}>
                    <label htmlFor="name">{dict.forms.name} *</label>
                    <input
                        type="text"
                        id="name"
                        {...register("name", { required: true })}
                        className={errors.name ? styles.inputError : ""}
                    />
                </div>

                <div className={styles.field}>
                    <label htmlFor="company">{dict.forms.company}</label>
                    <input
                        type="text"
                        id="company"
                        {...register("company")}
                    />
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.field}>
                    <label htmlFor="email">{dict.forms.email} *</label>
                    <input
                        type="email"
                        id="email"
                        {...register("email", { required: true })}
                        className={errors.email ? styles.inputError : ""}
                    />
                </div>

                <div className={styles.field}>
                    <label htmlFor="phone">{dict.forms.phone}</label>
                    <input
                        type="tel"
                        id="phone"
                        {...register("phone")}
                    />
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.field}>
                    <label htmlFor="product">{dict.forms.product}</label>
                    <select id="product" {...register("product")}>
                        <option value="">{lang === "tr" ? "Ürün Seçin" : "Select Product"}</option>
                        {products.map((p) => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.field}>
                    <label htmlFor="quantity">{dict.forms.quantity}</label>
                    <input
                        type="text"
                        id="quantity"
                        placeholder={lang === "tr" ? "Örn: 1000 adet" : "Ex: 1000 pcs"}
                        {...register("quantity")}
                    />
                </div>
            </div>

            <div className={styles.field}>
                <label htmlFor="message">{dict.forms.message} *</label>
                <textarea
                    id="message"
                    rows={5}
                    placeholder={lang === "tr" ? "Teknik detaylar, ölçüler, özel istekler..." : "Technical details, dimensions, special requests..."}
                    {...register("message", { required: true })}
                    className={errors.message ? styles.inputError : ""}
                />
            </div>

            <button type="submit" disabled={status === "loading"} className={styles.submit}>
                {status === "loading" ? dict.forms.sending : dict.forms.submit}
            </button>
        </form>
    );
}
