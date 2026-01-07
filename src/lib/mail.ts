import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    connectionTimeout: 10000, // 10 seconds
    socketTimeout: 10000,
    tls: {
        rejectUnauthorized: false
    }
});

interface MailOptions {
    to: string;
    subject: string;
    html: string;
    replyTo?: string;
    attachments?: any[];
}

export const sendMail = async ({ to, subject, html, replyTo, attachments }: MailOptions) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.SMTP_FROM || `"Aktif Yay" <${process.env.SMTP_USER}>`,
            to,
            replyTo,
            subject,
            html,
            attachments,
        });
        console.log("Email sent: %s", info.messageId);
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
};
