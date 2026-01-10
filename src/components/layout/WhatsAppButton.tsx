"use client";

import styles from "./WhatsAppButton.module.css";
// import { MessageCircle } from "lucide-react"; // Removed

export default function WhatsAppButton() {
    const phoneNumber = "905326763488";
    const message = "Merhaba, ürünleriniz hakkında bilgi almak istiyorum.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div className={styles.container}>
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.button}
                aria-label="WhatsApp ile iletişime geçin"
            >
                {/* Official WhatsApp Icon SVG - Green Bubble, White Phone */}
                <svg
                    viewBox="0 0 48 48"
                    className={styles.icon}
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                >
                    <path fill="#25D366" d="M24 4C12.95 4 4 12.95 4 24c0 3.84 1.09 7.42 2.99 10.51L4 44l9.74-2.91C16.66 42.84 20.22 44 24 44c11.05 0 20-8.95 20-20S35.05 4 24 4z" />
                    <path fill="#FFF" d="M33.8 28.5c-.5-.2-2.9-1.5-3.4-1.6-.4-.2-.7-.2-1 .2-.3.5-1.1 1.4-1.4 1.7-.2.3-.5.3-.9.1s-1.8-.7-3.4-2.1c-1.3-1.1-2.2-2.5-2.5-3-.2-.3-.1-.6.2-.8.2-.1.4-.3.6-.5.2-.2.2-.3.4-.6.1-.2.1-.5.0-.6-.1-.2-.8-2.6-1.1-3.5-.3-.9-.6-.8-.8-.8h-.7c-.3 0-.7.1-1.1.5-.4.4-1.6 1.6-1.6 3.8s1.6 4.4 1.9 4.7c.2.3 3.2 4.9 7.7 6.9 2.8 1.2 4 .9 5.4.8 1.6-.1 3.5-1.4 4-2.8.5-1.4.5-2.6.4-2.8-.2-.3-.6-.4-1.1-.6z" />
                </svg>
            </a>
            <div className={styles.tooltip}>
                WhatsApp Hattı
            </div>
        </div>
    );
}
