import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const position = formData.get("position") as string;
        const message = formData.get("message") as string;
        const cv = formData.get("cv") as File | null;

        // Validation
        if (!name || !email || !position) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Email content
        const html = `
            <h2>Yeni İş Başvurusu</h2>
            <p><strong>Ad Soyad:</strong> ${name}</p>
            <p><strong>E-posta:</strong> ${email}</p>
            <p><strong>Telefon:</strong> ${phone || "-"}</p>
            <p><strong>Pozisyon:</strong> ${position}</p>
            <p><strong>Mesaj:</strong></p>
            <p>${message || "-"}</p>
            ${cv ? `<p><strong>CV:</strong> Dosya ektedir (${cv.name})</p>` : "<p><strong>CV:</strong> Yüklenmedi</p>"}
        `;

        // Send email (Note: File attachment handling depends on mail provider, 
        // for now we just notify. Ideally we'd buffer the file and attach it)

        let attachments = [];
        if (cv) {
            const buffer = Buffer.from(await cv.arrayBuffer());
            attachments.push({
                filename: cv.name,
                content: buffer,
            });
        }


        await sendMail({
            to: process.env.SMTP_USER || "info@aktifyay.com.tr",
            subject: `İş Başvurusu: ${name} - ${position}`,
            html,
            attachments
        } as any);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Job application error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
