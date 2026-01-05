"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSettings() {
    try {
        const settings = await prisma.siteSettings.findUnique({
            where: { id: "settings" }
        });
        return settings;
    } catch (error) {
        console.error("Settings fetch error:", error);
        return null;
    }
}

export async function updateSettings(data: any) {
    try {
        await prisma.siteSettings.upsert({
            where: { id: "settings" },
            update: data,
            create: { id: "settings", ...data }
        });
        revalidatePath("/", "layout"); // Revalidate everything
        return { success: true };
    } catch (error) {
        console.error("Settings update error:", error);
        return { success: false, error: "Ayarlar güncellenemedi." };
    }
}
