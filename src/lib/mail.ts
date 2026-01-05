import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    tls: {
        rejectUnauthorized: false
    }
});

export async function sendMail({ to, subject, html, replyTo }: { to: string; subject: string; html: string; replyTo?: string }) {
    try {
        await transporter.sendMail({
            from: process.env.SMTP_FROM || `"Aktif Yay Bildirim" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html,
            replyTo
        });
        return { success: true };
    } catch (error) {
        console.error("Email send error:", error);
        return { success: false, error };
    }
}
