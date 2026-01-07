
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const videos = await prisma.video.findMany({
            orderBy: { order: "asc" },
        });

        return NextResponse.json(videos);
    } catch (error) {
        console.error("Error fetching videos:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { youtubeUrl, titleTr, titleEn, descTr, descEn, order, isActive } = body;

        const video = await prisma.video.create({
            data: {
                youtubeUrl,
                titleTr,
                titleEn,
                descTr,
                descEn,
                order: order || 0,
                isActive: isActive ?? true,
            },
        });

        revalidatePath("/[lang]/uretim-videolari");
        revalidatePath("/[lang]/production-videos");

        return NextResponse.json(video);
    } catch (error) {
        console.error("Error creating video:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
