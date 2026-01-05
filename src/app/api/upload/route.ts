import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "Dosya yüklenmedi." }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        // Dosya adını temizle
        // Türkçe karakterleri ve boşlukları temizleyebiliriz ama basitçe timestamp ekleyelim
        const filename = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const timestamp = Date.now();
        const cleanFilename = `${timestamp}-${filename}`;

        // Klasör yapısı: public/uploads/YYYY/MM
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');

        // Dizin yolları
        const uploadDirRelative = `uploads/${year}/${month}`;
        const uploadDir = path.join(process.cwd(), "public", uploadDirRelative);

        // Klasörü oluştur
        await mkdir(uploadDir, { recursive: true });

        // Dosyayı kaydet
        const filePath = path.join(uploadDir, cleanFilename);
        await writeFile(filePath, buffer);

        // Public URL döndür (/uploads/2024/01/file.jpg)
        const publicUrl = `/${uploadDirRelative.replace(/\\/g, "/")}/${cleanFilename}`;

        return NextResponse.json({
            success: true,
            url: publicUrl
        });

    } catch (error) {
        console.error("Upload Error:", error);
        return NextResponse.json({ error: "Dosya yüklenirken hata oluştu." }, { status: 500 });
    }
}
