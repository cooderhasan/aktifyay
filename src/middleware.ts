import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const host = request.headers.get("host") || "";
    const wwwRegex = /^www\./;

    // Localhost'ta çalışma
    if (host.includes("localhost") || host.includes("127.0.0.1")) {
        return NextResponse.next();
    }

    // Eğer host www ile başlamıyorsa ve root domain ise
    if (!wwwRegex.test(host) && host === "aktifyay.com.tr") {
        const newUrl = new URL(request.url);
        newUrl.host = "www.aktifyay.com.tr";
        return NextResponse.redirect(newUrl, 301);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
