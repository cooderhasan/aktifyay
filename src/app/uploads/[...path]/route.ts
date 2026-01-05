import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    try {
        const { path: pathSegments } = await params;
        const filePathRelative = pathSegments.join("/");

        // Construct path to the public directory using process.cwd()
        // This targets the persistent volume in most Docker setups
        const fullPath = path.join(process.cwd(), "public", "uploads", filePathRelative);

        try {
            const fileBuffer = await fs.readFile(fullPath);

            // Determine content type
            const ext = path.extname(fullPath).toLowerCase();
            let contentType = "application/octet-stream";

            if (ext === ".png") contentType = "image/png";
            else if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
            else if (ext === ".webp") contentType = "image/webp";
            else if (ext === ".svg") contentType = "image/svg+xml";
            else if (ext === ".pdf") contentType = "application/pdf";

            return new NextResponse(fileBuffer, {
                headers: {
                    "Content-Type": contentType,
                    "Cache-Control": "public, max-age=31536000, immutable",
                },
            });
        } catch (error) {
            // console.error("File read error:", error);
            // If file not found in public/uploads, return 404
            return NextResponse.json({ error: "File not found" }, { status: 404 });
        }
    } catch (error) {
        console.error("Route error:", error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}
