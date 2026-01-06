"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteQuote(id: string) {
    try {
        await prisma.quoteRequest.delete({ where: { id } });
        revalidatePath("/admin/quotes");
        return { success: true };
    } catch {
        return { success: false, error: "Silme işlemi başarısız" };
    }
}

export async function markQuoteAsRead(id: string) {
    try {
        await prisma.quoteRequest.update({
            where: { id },
            data: { isRead: true }
        });
        revalidatePath("/admin/quotes");
        return { success: true };
    } catch {
        return { success: false, error: "İşlem başarısız" };
    }
}
