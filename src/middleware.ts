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

    // 3. Eski ve Yarı-Dinamik URL Yönlendirmeleri (301 Permanent Redirect)
    const exactRedirects: Record<string, string> = {
        "/sektorler": "/tr/sektorler",
        "/hakkimizda": "/tr/hakkimizda",
        "/iletisim": "/tr/iletisim",
        "/teklif": "/tr/teklif-al",
        "/teklif-al": "/tr/teklif-al",
        "/kariyer": "/tr/kariyer",
        "/e-katalog": "/tr/e-katalog",
        "/urunler": "/tr/urunler",
        "/blog": "/tr/blog",
        "/about-us": "/en/about-us",
        "/contact": "/en/contact",
        "/request-quote": "/en/request-quote",
        "/careers": "/en/careers",
        "/e-catalog": "/en/e-catalog",
        "/products": "/en/products",
        "/industries": "/en/industries",
    };

    const normalizedPath = path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
    const search = request.nextUrl.search;

    if (exactRedirects[normalizedPath]) {
        return NextResponse.redirect(
            `${targetProto}://${targetHost}${exactRedirects[normalizedPath]}${search}`,
            301
        );
    }

    const prefixRedirects: Record<string, string> = {
        "/sektorler/": "/tr/sektorler/",
        "/urunler/": "/tr/urunler/",
        "/products/": "/en/products/",
        "/industries/": "/en/industries/",
        "/blog/": "/tr/blog/",
    };

    for (const [prefix, targetPrefix] of Object.entries(prefixRedirects)) {
        if (path.startsWith(prefix)) {
            const rest = path.slice(prefix.length);
            return NextResponse.redirect(
                `${targetProto}://${targetHost}${targetPrefix}${rest}${search}`,
                301
            );
        }
    }

    // 4. Yönlendirme Kontrolleri
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
