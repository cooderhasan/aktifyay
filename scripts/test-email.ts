
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";

// Load .env from project root
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

async function main() {
    console.log("Test ediliyor...");
    console.log("SMTP Host:", process.env.SMTP_HOST);
    console.log("SMTP Port:", process.env.SMTP_PORT);
    console.log("SMTP User:", process.env.SMTP_USER);
    console.log("SMTP Secure:", process.env.SMTP_SECURE);

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
        tls: {
            rejectUnauthorized: false // Bazen sertifika hatalarını atlamak için gerekebilir (test amaçlı)
        },
        debug: true, // Detaylı loglar
        logger: true // Konsola log basma
    });

    try {
        const info = await transporter.sendMail({
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to: process.env.SMTP_USER, // Kendine gönder
            subject: "Test E-postası (Local Script)",
            text: "Bu bir test e-postasıdır. Ayarlarınız çalışıyor!",
        });

        console.log("✅ E-posta başarıyla gönderildi!");
        console.log("Message ID:", info.messageId);
    } catch (error) {
        console.error("❌ E-posta gönderilemedi:");
        console.error(error);
    }
}

main();
