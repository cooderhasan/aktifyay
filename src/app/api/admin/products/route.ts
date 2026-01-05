import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all products
export async function GET() {
    try {
        const products = await prisma.productCategory.findMany({
            orderBy: { order: "asc" },
        });
        return NextResponse.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}

// POST new product
export async function POST(request: Request) {
    try {
        const data = await request.json();

        const product = await prisma.productCategory.create({
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
                gallery: data.gallery || null,
                isActive: data.isActive ?? true,
                order: data.order ?? 0,
                faqs: {
                    create: data.faqs?.map((faq: any) => ({
                        questionTr: faq.questionTr,
                        questionEn: faq.questionEn,
                        answerTr: faq.answerTr,
                        answerEn: faq.answerEn,
                        isActive: true
                    })) || []
                }
            },
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
    }
}
