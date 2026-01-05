import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET single page
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const page = await prisma.page.findUnique({
            where: { id },
        });

        if (!page) {
            return NextResponse.json({ error: "Page not found" }, { status: 404 });
        }

        return NextResponse.json(page);
    } catch (error) {
        console.error("Error fetching page:", error);
        return NextResponse.json({ error: "Failed to fetch page" }, { status: 500 });
    }
}

// PUT update page
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const data = await request.json();

        const page = await prisma.page.update({
            where: { id },
            data: {
                slug: data.slug,
                type: data.type,
                titleTr: data.titleTr,
                h1Tr: data.h1Tr || null,
                descriptionTr: data.descriptionTr || null,
                contentTr: data.contentTr || null,
                titleEn: data.titleEn,
                h1En: data.h1En || null,
                descriptionEn: data.descriptionEn || null,
                contentEn: data.contentEn || null,
                metaTitleTr: data.metaTitleTr || null,
                metaDescriptionTr: data.metaDescriptionTr || null,
                ogTitleTr: data.ogTitleTr || null,
                ogDescriptionTr: data.ogDescriptionTr || null,
                metaTitleEn: data.metaTitleEn || null,
                metaDescriptionEn: data.metaDescriptionEn || null,
                ogTitleEn: data.ogTitleEn || null,
                ogDescriptionEn: data.ogDescriptionEn || null,
                canonical: data.canonical || null,
                isIndexed: data.isIndexed ?? true,
                isFollowed: data.isFollowed ?? true,
                schemaEnabled: data.schemaEnabled ?? true,
                ogImage: data.ogImage || null,
                imageAltTr: data.imageAltTr || null,
                imageAltEn: data.imageAltEn || null,
                isActive: data.isActive ?? true,
                order: data.order ?? 0,
            },
        });

        return NextResponse.json(page);
    } catch (error) {
        console.error("Error updating page:", error);
        return NextResponse.json({ error: "Failed to update page" }, { status: 500 });
    }
}

// DELETE page
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.page.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting page:", error);
        return NextResponse.json({ error: "Failed to delete page" }, { status: 500 });
    }
}
