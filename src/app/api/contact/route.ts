import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const data = await request.json();

        const message = await prisma.contactMessage.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone || null,
                subject: data.subject || null,
                message: data.message,
            },
        });

        return NextResponse.json({ success: true, id: message.id });
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to submit message" },
            { status: 500 }
        );
    }
}
