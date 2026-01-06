import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mail";

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // Save to DB
        const quote = await prisma.quoteRequest.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone || null,
                company: data.company || null,
                product: data.product || null,
                quantity: data.quantity || null,
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
                subject: `Yeni Teklif Talebi: ${data.product || "Genel"} - ${data.name}`,
                html: `
                    <h2>Yeni Teklif Talebi</h2>
                    <p><strong>Ad Soyad:</strong> ${data.name}</p>
                    <p><strong>Firma:</strong> ${data.company || "-"}</p>
                    <p><strong>E-posta:</strong> ${data.email}</p>
                    <p><strong>Telefon:</strong> ${data.phone || "-"}</p>
                    <hr/>
                    <p><strong>Ürün:</strong> ${data.product || "-"}</p>
                    <p><strong>Miktar:</strong> ${data.quantity || "-"}</p>
                    <br/>
                    <p><strong>Mesaj / Not:</strong></p>
                    <p>${data.message.replace(/\n/g, "<br>")}</p>
                    <hr/>
                    <p><small>Bu mesaj Aktif Yay web sitesinden gönderilmiştir.</small></p>
                `
            }).catch(err => console.error("Background email error:", err));
        }

        return NextResponse.json({ success: true, id: quote.id });
    } catch (error) {
        console.error("Quote form error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to submit quote request" },
            { status: 500 }
        );
    }
}
