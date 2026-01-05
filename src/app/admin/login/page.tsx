"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, ArrowRight, Loader2 } from "lucide-react";
import styles from "./page.module.css";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Geçersiz e-posta veya şifre");
                setLoading(false);
            } else {
                router.push("/admin");
                router.refresh();
            }
        } catch {
            setError("Bir hata oluştu");
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.background}>
                <div className={styles.shape1}></div>
                <div className={styles.shape2}></div>
                <div className={styles.shape3}></div>
            </div>

            <div className={styles.card}>
                <div className={styles.header}>
                    <div className={styles.logo}>
                        <span className={styles.logoText}>AKTİF</span>
                        <span className={styles.logoAccent}>YAY</span>
                    </div>
                    <h1 className={styles.title}>Admin Paneli</h1>
                    <p className={styles.subtitle}>Yönetim paneline erişmek için giriş yapın</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {error && (
                        <div className={styles.error}>
                            <div className={styles.errorIcon}>!</div>
                            {error}
                        </div>
                    )}

                    <div className={styles.formGroup}>
                        <label htmlFor="email">E-posta Adresi</label>
                        <div className={styles.inputWrapper}>
                            <Mail className={styles.inputIcon} size={20} />
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                                placeholder="ornek@aktifyay.com"
                                className={styles.input}
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password">Şifre</label>
                        <div className={styles.inputWrapper}>
                            <Lock className={styles.inputIcon} size={20} />
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                                placeholder="••••••••"
                                className={styles.input}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className={styles.togglePassword}
                                title={showPassword ? "Şifreyi Gizle" : "Şifreyi Göster"}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <div className={styles.rememberMe}>
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">Beni hatırla</label>
                        </div>
                        <a href="#" className={styles.forgotPassword}>Şifremi unuttum</a>
                    </div>

                    <button type="submit" disabled={loading} className={styles.button}>
                        {loading ? (
                            <>
                                <Loader2 className={styles.spinner} size={20} />
                                Giriş Yapılıyor...
                            </>
                        ) : (
                            <>
                                Giriş Yap
                                <ArrowRight size={20} />
                            </>
                        )}
                    </button>
                </form>

                <div className={styles.footer}>
                    <p>Aktif Yay &copy; {new Date().getFullYear()}</p>
                    <div className={styles.signature}>
                        Coded by <a href="https://hasandurmus.com" target="_blank" rel="noopener noreferrer">Hasan Durmus</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
