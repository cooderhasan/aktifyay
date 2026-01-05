"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getReferences() {
    try {
        const references = await prisma.reference.findMany({
            orderBy: { order: "asc" },
        });
        return { success: true, data: references };
    } catch (error) {
        return { success: false, error: "Referanslar getirilemedi" };
    }
}

export async function getActiveReferences() {
    try {
        const references = await prisma.reference.findMany({
            where: { isActive: true },
            orderBy: { order: "asc" },
        });
        return references;
    } catch (error) {
        return [];
    }
}

export async function createReference(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const image = formData.get("image") as string;
        const isActive = formData.get("isActive") === "true";
        const order = parseInt(formData.get("order") as string) || 0;

        await prisma.reference.create({
            data: {
                name,
                image,
                isActive,
                order,
            },
        });

        revalidatePath("/admin/references");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Referans oluşturulamadı" };
    }
}

export async function updateReference(id: string, formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const image = formData.get("image") as string;
        const isActive = formData.get("isActive") === "true";
        const order = parseInt(formData.get("order") as string) || 0;

        await prisma.reference.update({
            where: { id },
            data: {
                name,
                image,
                isActive,
                order,
            },
        });

        revalidatePath("/admin/references");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Referans güncellenemedi" };
    }
}

export async function deleteReference(id: string) {
    try {
        await prisma.reference.delete({
            where: { id },
        });

        revalidatePath("/admin/references");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Referans silinemedi" };
    }
}
