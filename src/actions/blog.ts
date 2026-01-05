"use server";

import { prisma } from "@/lib/prisma";
import { BlogPost } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function getBlogPosts() {
    try {
        const posts = await prisma.blogPost.findMany({
            orderBy: { createdAt: "desc" },
            include: { category: true }
        });
        return { success: true, data: posts };
    } catch (error) {
        return { success: false, error: "Blog yazıları getirilemedi" };
    }
}

export async function getBlogPost(id: string) {
    try {
        const post = await prisma.blogPost.findUnique({
            where: { id },
            include: { category: true }
        });
        if (!post) return { success: false, error: "Yazı bulunamadı" };
        return { success: true, data: post };
    } catch (error) {
        return { success: false, error: "Yazı getirilemedi" };
    }
}

function calculateReadingTime(content: string = ""): number {
    const wordsPerMinute = 200;
    // HTML taglerini temizle
    const text = content.replace(/<[^>]*>?/gm, "");
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute) || 1;
}

export async function createBlogPost(data: any) {
    try {
        if (!data.slug) {
            return { success: false, error: "Slug zorunludur" };
        }

        const existing = await prisma.blogPost.findUnique({
            where: { slug: data.slug },
        });

        if (existing) {
            return { success: false, error: "Bu URL adresi zaten kullanılıyor" };
        }

        // Calculate reading time based on TR content (fallback to EN)
        const readingTime = calculateReadingTime(data.contentTr || data.contentEn || "");

        const post = await prisma.blogPost.create({
            data: {
                slug: data.slug.trim(),
                categoryId: data.categoryId || null,

                // Content
                titleTr: data.titleTr || "",
                titleEn: data.titleEn || "",
                contentTr: data.contentTr,
                contentEn: data.contentEn,
                descriptionTr: data.descriptionTr,
                descriptionEn: data.descriptionEn,

                // SEO
                keywordsTr: data.keywordsTr,
                keywordsEn: data.keywordsEn,
                canonicalUrl: data.canonicalUrl,
                robots: data.robots,

                metaTitleTr: data.metaTitleTr,
                metaTitleEn: data.metaTitleEn,
                metaDescriptionTr: data.metaDescriptionTr,
                metaDescriptionEn: data.metaDescriptionEn,

                // OG & Social
                ogTitleTr: data.ogTitleTr,
                ogTitleEn: data.ogTitleEn,
                ogDescriptionTr: data.ogDescriptionTr,
                ogDescriptionEn: data.ogDescriptionEn,
                ogImage: data.ogImage,

                // Media & Author
                image: data.image,
                imageAltTr: data.imageAltTr,
                imageAltEn: data.imageAltEn,
                authorName: data.authorName,

                // System
                readingTime: readingTime,
                isPublished: data.isPublished || false,
                publishedAt: data.isPublished ? new Date() : null,
            },
        });

        revalidatePath("/tr/blog");
        revalidatePath("/en/blog");
        revalidatePath("/admin/blog");

        return { success: true, data: post };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Yazı oluşturulamadı" };
    }
}

export async function updateBlogPost(id: string, data: any) {
    try {
        const readingTime = calculateReadingTime(data.contentTr || data.contentEn || "");

        const post = await prisma.blogPost.update({
            where: { id },
            data: {
                ...data,
                readingTime,
                publishedAt: (data.isPublished && !data.publishedAt) ? new Date() : undefined,
            },
        });

        revalidatePath("/tr/blog");
        revalidatePath("/en/blog");
        revalidatePath(`/tr/blog/${post.slug}`);
        revalidatePath("/admin/blog");

        return { success: true, data: post };
    } catch (error) {
        console.error("Update Error:", error);
        return { success: false, error: "Yazı güncellenemedi" };
    }
}

export async function deleteBlogPost(id: string) {
    try {
        await prisma.blogPost.delete({
            where: { id },
        });

        revalidatePath("/tr/blog");
        revalidatePath("/en/blog");
        revalidatePath("/admin/blog");

        return { success: true };
    } catch (error) {
        return { success: false, error: "Yazı silinemedi" };
    }
}
