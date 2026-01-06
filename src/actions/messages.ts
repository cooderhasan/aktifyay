"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteMessage(id: string) {
    try {
        await prisma.contactMessage.delete({ where: { id } });
        revalidatePath("/admin/messages");
        return { success: true };
    } catch {
        return { success: false, error: "Silme işlemi başarısız" };
    }
}

export async function markMessageAsRead(id: string) {
    try {
        await prisma.contactMessage.update({
            where: { id },
            data: { isRead: true }
        });
        revalidatePath("/admin/messages");
        return { success: true };
    } catch {
        return { success: false, error: "İşlem başarısız" };
    }
}
