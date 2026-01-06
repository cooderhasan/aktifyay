"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function seedDefaultPages() {
    try {
        const pages = [
            {
                slug: "kvkk",
                type: "static",
                titleTr: "KVKK Aydınlatma Metni",
                titleEn: "KVKK Clarification Text",
                contentTr: "<p>Kişisel Verilerin Korunması Kanunu ile ilgili metin buraya gelecek.</p>",
                contentEn: "<p>Text regarding the Personal Data Protection Law will be here.</p>",
                isActive: true
            },
            {
                slug: "gizlilik-politikasi",
                type: "static",
                titleTr: "Gizlilik Politikası",
                titleEn: "Privacy Policy",
                contentTr: "<p>Gizlilik politikası metni buraya gelecek.</p>",
                contentEn: "<p>Privacy policy text will be here.</p>",
                isActive: true
            },
            {
                slug: "cerez-politikasi",
                type: "static",
                titleTr: "Çerez Politikası",
                titleEn: "Cookie Policy",
                contentTr: "<p>Çerez kullanım politikası metni buraya gelecek.</p>",
                contentEn: "<p>Cookie usage policy text will be here.</p>",
                isActive: true
            },
            {
                slug: "kullanim-kosullari",
                type: "static",
                titleTr: "Kullanım Koşulları",
                titleEn: "Terms of Use",
                contentTr: "<p>Site kullanım koşulları metni buraya gelecek.</p>",
                contentEn: "<p>Website terms of use text will be here.</p>",
                isActive: true
            }
        ];

        for (const page of pages) {
            await prisma.page.upsert({
                where: { slug: page.slug },
                update: {}, // Don't overwrite existing
                create: page,
            });
        }

        revalidatePath("/admin/pages");
        return { success: true };
    } catch (error) {
        console.error("Seed error:", error);
        return { success: false, error: "Sayfalar oluşturulurken bir hata oluştu." };
    }
}
