"use server";

import { prisma } from "@/lib/prisma";
import { BlogCategory } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function getBlogCategories() {
    try {
        const categories = await prisma.blogCategory.findMany({
            orderBy: { nameTr: "asc" },
            include: { _count: { select: { posts: true } } }
        });
        return { success: true, data: categories };
    } catch (error) {
        return { success: false, error: "Kategoriler getirilemedi" };
    }
}

export async function getBlogCategory(id: string) {
    try {
        const category = await prisma.blogCategory.findUnique({
            where: { id },
        });
        if (!category) return { success: false, error: "Kategori bulunamadı" };
        return { success: true, data: category };
    } catch (error) {
        return { success: false, error: "Kategori getirilemedi" };
    }
}

export async function createBlogCategory(data: Partial<BlogCategory>) {
    try {
        if (!data.slug || !data.nameTr) {
            return { success: false, error: "Ad ve Slug zorunludur" };
        }

        const existing = await prisma.blogCategory.findUnique({
            where: { slug: data.slug },
        });

        if (existing) {
            return { success: false, error: "Bu URL adresi zaten kullanılıyor" };
        }

        const category = await prisma.blogCategory.create({
            data: {
                slug: data.slug,
                nameTr: data.nameTr,
                nameEn: data.nameEn || "",
                descriptionTr: data.descriptionTr,
                descriptionEn: data.descriptionEn,
                metaTitleTr: data.metaTitleTr,
                metaTitleEn: data.metaTitleEn,
                metaDescriptionTr: data.metaDescriptionTr,
                metaDescriptionEn: data.metaDescriptionEn,
            },
        });

        revalidatePath("/admin/blog/categories");
        revalidatePath("/tr/blog");
        return { success: true, data: category };
    } catch (error) {
        return { success: false, error: "Kategori oluşturulamadı" };
    }
}

export async function updateBlogCategory(id: string, data: Partial<BlogCategory>) {
    try {
        const category = await prisma.blogCategory.update({
            where: { id },
            data,
        });

        revalidatePath("/admin/blog/categories");
        revalidatePath("/tr/blog");
        return { success: true, data: category };
    } catch (error) {
        return { success: false, error: "Kategori güncellenemedi" };
    }
}

export async function deleteBlogCategory(id: string) {
    try {
        await prisma.blogCategory.delete({
            where: { id },
        });

        revalidatePath("/admin/blog/categories");
        revalidatePath("/tr/blog");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Kategori silinemedi (içinde yazı olabilir)" };
    }
}
