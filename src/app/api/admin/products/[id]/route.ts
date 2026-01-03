import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET single product
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const product = await prisma.productCategory.findUnique({
            where: { id },
            include: { faqs: true },
        });

        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
    }
}

// PUT update product
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const data = await request.json();

        const product = await prisma.productCategory.update({
            where: { id },
            data: {
                slug: data.slug,
                nameTr: data.nameTr,
                nameEn: data.nameEn,
                h1Tr: data.h1Tr || null,
                h1En: data.h1En || null,
                descriptionTr: data.descriptionTr || null,
                descriptionEn: data.descriptionEn || null,
                longDescTr: data.longDescTr || null,
                longDescEn: data.longDescEn || null,
                usageAreasTr: data.usageAreasTr || null,
                usageAreasEn: data.usageAreasEn || null,
                technicalSpecs: data.technicalSpecs || null,
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
                relatedIndustries: data.relatedIndustries || null,
                isActive: data.isActive ?? true,
                order: data.order ?? 0,
            },
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error("Error updating product:", error);
        return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
    }
}

// DELETE product
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.productCategory.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting product:", error);
        return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
    }
}
