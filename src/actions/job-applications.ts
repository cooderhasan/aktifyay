"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteJobApplication(id: string) {
    try {
        await prisma.jobApplication.delete({ where: { id } });
        revalidatePath("/admin/applications");
        return { success: true };
    } catch {
        return { success: false, error: "Silme işlemi başarısız" };
    }
}

export async function markJobApplicationAsRead(id: string) {
    try {
        await prisma.jobApplication.update({
            where: { id },
            data: { isRead: true }
        });
        revalidatePath("/admin/applications");
        return { success: true };
    } catch {
        return { success: false, error: "İşlem başarısız" };
    }
}
