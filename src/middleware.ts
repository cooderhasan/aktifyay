import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    // Host bilgisini al (Proxy arkasında ise x-forwarded-host öncelikli)
    const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || "";
    // Protokol bilgisini al (Proxy arkası genellikle http gelir, header kontrolü şart)
    const proto = request.headers.get("x-forwarded-proto");
    const path = request.nextUrl.pathname;

    // 1. Localhost ve Test Ortamlarını Yoksay
    // Bu kontrol geliştirme ortamınızın bozulmasını engeller
    if (host.includes("localhost") || host.includes("127.0.0.1") || host.includes("host.docker.internal")) {
        return NextResponse.next();
    }

    // 2. Hedef Yapılandırma
    const targetHost = "www.aktifyay.com.tr";
    const targetProto = "https";

    // 3. Yönlendirme Kontrolleri
    // a. Yanlış Host (www yoksa veya farklıysa)
    const isWrongHost = host !== targetHost;

    // b. Yanlış Protokol (http ise)
    // Not: Cloudflare/Coolify gibi yapılarda SSL sonlandırma proxy'de olur, 
    // içeride http çalışır. Bu yüzden proto === 'http' kontrolü önemlidir.
    const isWrongProto = proto === "http";

    // c. Kök Dizin (Ana sayfa / -> /tr olmalı)
    const isRoot = path === "/";

    // Eğer herhangi bir koşul sağlanmıyorsa (hatalı durumdaysa)
    if (isWrongHost || isWrongProto || isRoot) {
        // Yeni yolu belirle (/ -> /tr, diğerleri aynı)
        const newPath = isRoot ? "/tr" : path;
        const search = request.nextUrl.search;

        // Tek seferlik Kalıcı (301) Yönlendirme
        return NextResponse.redirect(
            `${targetProto}://${targetHost}${newPath}${search}`,
            301
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // api, _next ve statik dosyalar hariç tüm istekleri yakala
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
