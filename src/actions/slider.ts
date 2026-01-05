"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSliders() {
    try {
        return await prisma.heroSlide.findMany({
            orderBy: { order: "asc" }
        });
    } catch (error) {
        console.error("Sliders fetch error:", error);
        return [];
    }
}

export async function getSlider(id: string) {
    try {
        return await prisma.heroSlide.findUnique({
            where: { id }
        });
    } catch (error) {
        console.error("Slider fetch error:", error);
        return null;
    }
}

export async function createSlider(data: any) {
    try {
        await prisma.heroSlide.create({
            data: {
                ...data,
                order: parseInt(data.order) || 0,
                isActive: data.isActive === true || data.isActive === "true"
            }
        });
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Slider create error:", error);
        return { success: false, error: "Slider oluşturulamadı." };
    }
}

export async function updateSlider(id: string, data: any) {
    try {
        await prisma.heroSlide.update({
            where: { id },
            data: {
                ...data,
                order: parseInt(data.order) || 0,
                isActive: data.isActive === true || data.isActive === "true"
            }
        });
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Slider update error:", error);
        return { success: false, error: "Slider güncellenemedi." };
    }
}

export async function deleteSlider(id: string) {
    try {
        await prisma.heroSlide.delete({
            where: { id }
        });
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Slider delete error:", error);
        return { success: false, error: "Slider silinemedi." };
    }
}
