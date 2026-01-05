"use client";

import styles from "./WhatsAppButton.module.css";
import { MessageCircle } from "lucide-react";

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
                <MessageCircle className={styles.icon} strokeWidth={2.5} />
            </a>
            <div className={styles.tooltip}>
                WhatsApp Hattı
            </div>
        </div>
    );
}
