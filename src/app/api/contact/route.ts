import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mail";

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // Save to DB
        const message = await prisma.contactMessage.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone || null,
                subject: data.subject || null,
                message: data.message,
            },
        });

        // Get Admin Email from Settings
        const settings = await prisma.siteSettings.findUnique({
            where: { id: "settings" }
        });

        const adminEmail = settings?.email || process.env.SMTP_USER;

        // Send Email Notification
        if (adminEmail) {
            // Send Email Notification (Fire and forget)
            sendMail({
                to: adminEmail,
                replyTo: data.email,
                subject: `Yeni İletişim Formu Mesajı: ${data.subject || "Konusuz"} - ${data.name}`,
                html: `
                    <h2>Yeni İletişim Mesajı</h2>
                    <p><strong>Gönderen:</strong> ${data.name}</p>
                    <p><strong>E-posta:</strong> ${data.email}</p>
                    <p><strong>Telefon:</strong> ${data.phone || "-"}</p>
                    <p><strong>Konu:</strong> ${data.subject || "-"}</p>
                    <br/>
                    <p><strong>Mesaj:</strong></p>
                    <p>${data.message.replace(/\n/g, "<br>")}</p>
                    <hr/>
                    <p><small>Bu mesaj Aktif Yay web sitesinden gönderilmiştir.</small></p>
                `
            }).catch(err => console.error("Background email error:", err));
        }

        return NextResponse.json({ success: true, id: message.id });
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to submit message" },
            { status: 500 }
        );
    }
}
