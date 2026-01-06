import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

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

        let cvUrl = null;
        let attachments = [];

        // Handle CV File
        if (cv) {
            const buffer = Buffer.from(await cv.arrayBuffer());

            // 1. Prepare for Email Attachment
            attachments.push({
                filename: cv.name,
                content: buffer,
            });

            // 2. Save to Disk for Admin Panel (best effort)
            try {
                // Ensure upload directory exists
                const uploadDir = join(process.cwd(), "public", "uploads", "cv");
                await mkdir(uploadDir, { recursive: true });

                // Create unique filename
                const filename = `${Date.now()}-${cv.name.replace(/[^a-zA-Z0-9.-]/g, "")}`;
                const filepath = join(uploadDir, filename);

                // Write file
                await writeFile(filepath, buffer);

                // Set URL
                cvUrl = `/uploads/cv/${filename}`;
            } catch (err) {
                console.error("Error saving CV file locally:", err);
                // Continue without saving file to disk, but still send email
            }
        }

        // Save to Database
        try {
            await prisma.jobApplication.create({
                data: {
                    name,
                    email,
                    phone,
                    position,
                    message,
                    cvUrl, // Save the URL if file was saved
                },
            });
        } catch (dbError) {
            console.error("Database error:", dbError);
            return NextResponse.json(
                { error: "Database save failed" },
                { status: 500 }
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

        // Send Email (Fire and forget - don't await)
        sendMail({
            to: process.env.SMTP_USER || "info@aktifyay.com.tr",
            subject: `İş Başvurusu: ${name} - ${position}`,
            html,
            attachments
        }).catch(err => console.error("Background email error:", err));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Job application error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
