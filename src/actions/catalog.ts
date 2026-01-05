"use server";

import { prisma } from "@/lib/prisma";
import { Catalog } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function getCatalogs() {
    try {
        const catalogs = await prisma.catalog.findMany({
            orderBy: { order: "asc" },
        });
        return { success: true, data: catalogs };
    } catch (error) {
        return { success: false, error: "Kataloglar getirilemedi" };
    }
}

export async function createCatalog(data: Partial<Catalog>) {
    try {
        const catalog = await prisma.catalog.create({
            data: {
                nameTr: data.nameTr || "",
                nameEn: data.nameEn || "",
                coverImage: data.coverImage || "",
                pdfUrl: data.pdfUrl || "",
                isActive: data.isActive ?? true,
                order: data.order || 0,
            },
        });

        revalidatePath("/tr/e-katalog");
        revalidatePath("/en/e-catalog");
        revalidatePath("/admin/catalog");

        return { success: true, data: catalog };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Katalog oluşturulamadı" };
    }
}

export async function updateCatalog(id: string, data: Partial<Catalog>) {
    try {
        const catalog = await prisma.catalog.update({
            where: { id },
            data,
        });

        revalidatePath("/tr/e-katalog");
        revalidatePath("/en/e-catalog");
        revalidatePath("/admin/catalog");

        return { success: true, data: catalog };
    } catch (error) {
        return { success: false, error: "Katalog güncellenemedi" };
    }
}

export async function deleteCatalog(id: string) {
    try {
        await prisma.catalog.delete({
            where: { id },
        });

        revalidatePath("/tr/e-katalog");
        revalidatePath("/en/e-catalog");
        revalidatePath("/admin/catalog");

        return { success: true };
    } catch (error) {
        return { success: false, error: "Katalog silinemedi" };
    }
}
