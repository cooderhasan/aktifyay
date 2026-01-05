import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all pages
export async function GET() {
    try {
        const pages = await prisma.page.findMany({
            orderBy: { order: "asc" },
        });
        return NextResponse.json(pages);
    } catch (error) {
        console.error("Error fetching pages:", error);
        return NextResponse.json({ error: "Failed to fetch pages" }, { status: 500 });
    }
}

// POST new page
export async function POST(request: Request) {
    try {
        const data = await request.json();

        const page = await prisma.page.create({
            data: {
                slug: data.slug,
                type: data.type || "static",
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
        console.error("Error creating page:", error);
        return NextResponse.json({ error: "Failed to create page" }, { status: 500 });
    }
}
