"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Locale } from "@/lib/i18n";
import { Dictionary } from "@/lib/dictionary";
import { UploadCloud } from "lucide-react";
import styles from "./ContactForm.module.css";

interface JobApplicationFormProps {
    lang: Locale;
    dict: Dictionary;
}

interface FormData {
    name: string;
    email: string;
    phone: string;
    position: string;
    cv: FileList;
    message: string;
}

export default function JobApplicationForm({ lang, dict }: JobApplicationFormProps) {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        setStatus("loading");

        try {
            // Create FormData object to handle file upload
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("phone", data.phone);
            formData.append("position", data.position);
            formData.append("message", data.message);

            if (data.cv && data.cv.length > 0) {
                formData.append("cv", data.cv[0]);
            }

            const response = await fetch("/api/apply", {
                method: "POST",
                body: formData, // Auto-sets Content-Type to multipart/form-data
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
                    <label htmlFor="position">{dict.forms.position} *</label>
                    <input
                        type="text"
                        id="position"
                        {...register("position", { required: true })}
                        className={errors.position ? styles.inputError : ""}
                        placeholder={lang === "tr" ? "Genel Başvuru" : "General Application"}
                    />
                </div>
            </div>

            <div className={styles.field}>
                <label htmlFor="cv">{dict.forms.cv}</label>
                <div className={styles.fileInputWrapper}>
                    <input
                        type="file"
                        id="cv"
                        accept=".pdf,.doc,.docx"
                        {...register("cv", {
                            onChange: (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setSelectedFileName(file.name);
                                } else {
                                    setSelectedFileName(null);
                                }
                            }
                        })}
                        className={styles.fileInput}
                    />
                    <div className={styles.fileInputPlaceholder}>
                        <UploadCloud size={20} />
                        <span className={styles.fileName}>
                            {selectedFileName || (lang === "tr" ? "Dosya Seçiniz (PDF, DOC)" : "Choose File (PDF, DOC)")}
                        </span>
                    </div>
                </div>
            </div>

            <div className={styles.field}>
                <label htmlFor="message">{dict.forms.message}</label>
                <textarea
                    id="message"
                    rows={5}
                    {...register("message")}
                    className={errors.message ? styles.inputError : ""}
                />
            </div>

            <button type="submit" disabled={status === "loading"} className={styles.submit}>
                {status === "loading" ? dict.forms.sending : dict.forms.submit}
            </button>
        </form>
    );
}
