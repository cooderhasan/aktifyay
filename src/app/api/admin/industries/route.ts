import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const industries = await prisma.industry.findMany({ orderBy: { order: "asc" } });
        return NextResponse.json(industries);
    } catch (error) {
        console.error("Error fetching industries:", error);
        return NextResponse.json({ error: "Failed to fetch industries" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const industry = await prisma.industry.create({
            data: {
                slug: data.slug,
                nameTr: data.nameTr,
                nameEn: data.nameEn,
                h1Tr: data.h1Tr || null,
                h1En: data.h1En || null,
                descriptionTr: data.descriptionTr || null,
                descriptionEn: data.descriptionEn || null,
                contentTr: data.contentTr || null,
                contentEn: data.contentEn || null,
                solutionsTr: data.solutionsTr || null,
                solutionsEn: data.solutionsEn || null,
                metaTitleTr: data.metaTitleTr || null,
                metaTitleEn: data.metaTitleEn || null,
                metaDescriptionTr: data.metaDescriptionTr || null,
                metaDescriptionEn: data.metaDescriptionEn || null,
                ogTitleTr: data.ogTitleTr || null,
                ogTitleEn: data.ogTitleEn || null,
                ogDescriptionTr: data.ogDescriptionTr || null,
                ogDescriptionEn: data.ogDescriptionEn || null,
                ogImage: data.ogImage || null,
                canonical: data.canonical || null,
                isIndexed: data.isIndexed ?? true,
                isFollowed: data.isFollowed ?? true,
                schemaEnabled: data.schemaEnabled ?? true,
                image: data.image || null,
                imageAltTr: data.imageAltTr || null,
                imageAltEn: data.imageAltEn || null,
                relatedProducts: data.relatedProducts || null,
                isActive: data.isActive ?? true,
                order: data.order ?? 0,
            },
        });
        return NextResponse.json(industry);
    } catch (error) {
        console.error("Error creating industry:", error);
        return NextResponse.json({ error: "Failed to create industry" }, { status: 500 });
    }
}
