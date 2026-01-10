import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    // Host bilgisini al (önce x-forwarded-host, yoksa normal host)
    const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || "";

    // Localhost kontrolü (portlu veya portsuz)
    if (host.includes("localhost") || host.includes("127.0.0.1")) {
        return NextResponse.next();
    }

    // Domain kontrolü (aktifyay.com.tr)
    // Sadece tam eşleşme arıyoruz, subdomain (www hariç) varsa dokunmuyoruz
    if (host === "aktifyay.com.tr") {
        const url = request.nextUrl.clone();
        url.hostname = "www.aktifyay.com.tr";
        // Prod ortamında port numarasını URL'den kaldırmak gerekebilir, 
        // ama Next.js nextUrl.clone() ile genellikle doğru portu taşır veya yönetir.
        // Eğer proxy/load balancer port 80/443 kullanıyorsa port temizlenebilir.
        // Şimdilik sadece hostname değişimi yeterli.

        return NextResponse.redirect(url, 301);
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
