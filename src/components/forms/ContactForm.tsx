"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Locale } from "@/lib/i18n";
import { Dictionary } from "@/lib/dictionary";
import styles from "./ContactForm.module.css";

interface ContactFormProps {
    lang: Locale;
    dict: Dictionary;
}

interface FormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

export default function ContactForm({ lang, dict }: ContactFormProps) {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        setStatus("loading");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setStatus("success");
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
                    <label htmlFor="email">{dict.forms.email} *</label>
                    <input
                        type="email"
                        id="email"
                        {...register("email", { required: true })}
                        className={errors.email ? styles.inputError : ""}
                    />
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.field}>
                    <label htmlFor="phone">{dict.forms.phone}</label>
                    <input
                        type="tel"
                        id="phone"
                        {...register("phone")}
                    />
                </div>

                <div className={styles.field}>
                    <label htmlFor="subject">{dict.forms.subject}</label>
                    <input
                        type="text"
                        id="subject"
                        {...register("subject")}
                    />
                </div>
            </div>

            <div className={styles.field}>
                <label htmlFor="message">{dict.forms.message} *</label>
                <textarea
                    id="message"
                    rows={5}
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
