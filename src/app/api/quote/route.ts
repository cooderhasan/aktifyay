import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const data = await request.json();

        const quote = await prisma.quoteRequest.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone || null,
                company: data.company || null,
                product: data.product || null,
                quantity: data.quantity || null,
                message: data.message,
            },
        });

        return NextResponse.json({ success: true, id: quote.id });
    } catch (error) {
        console.error("Quote form error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to submit quote request" },
            { status: 500 }
        );
    }
}
