
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
    params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: Params) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { youtubeUrl, titleTr, titleEn, descTr, descEn, order, isActive } = body;

        const video = await prisma.video.update({
            where: { id },
            data: {
                youtubeUrl,
                titleTr,
                titleEn,
                descTr,
                descEn,
                order,
                isActive,
            },
        });

        return NextResponse.json(video);
    } catch (error) {
        console.error("Error updating video:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request, { params }: Params) {
    try {
        const { id } = await params;

        await prisma.video.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting video:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
