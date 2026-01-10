import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    // Host bilgisini al
    const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || "";

    // Localhost kontrolü (portlu veya portsuz)
    if (host.includes("localhost") || host.includes("127.0.0.1")) {
        return NextResponse.next();
    }

    // Sadece "aktifyay.com.tr" (www'siz) ise yönlendir
    if (host === "aktifyay.com.tr") {
        // URL nesnesi klonlamak yerine, statik olarak https ve www ekleyerek oluşturuyoruz.
        // Bu, container içindeki port (3000) veya protokol (http) sorunlarını engeller.
        const url = request.nextUrl;
        return NextResponse.redirect(
            `https://www.aktifyay.com.tr${url.pathname}${url.search}`,
            301
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
