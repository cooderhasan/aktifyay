import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const industry = await prisma.industry.findUnique({ where: { id }, include: { faqs: true } });
        if (!industry) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(industry);
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const data = await request.json();
        const industry = await prisma.industry.update({
            where: { id },
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
        console.error("Error:", error);
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await prisma.industry.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}
