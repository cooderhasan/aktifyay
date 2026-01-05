import { Locale, locales } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { generateLocalBusinessSchema } from "@/lib/seo";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getSettings } from "@/actions/settings";
import { prisma } from "@/lib/prisma";

export function generateStaticParams(): { lang: Locale }[] {
    return locales.map((locale) => ({ lang: locale }));
}

interface LangLayoutProps {
    children: React.ReactNode;
    params: Promise<{ lang: Locale }>;
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
    const { lang } = await params;
    const dict = getDictionary(lang);
    const settings = await getSettings();
    const products = await prisma.productCategory.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" },
        select: { nameTr: true, nameEn: true, slug: true }
    });

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateLocalBusinessSchema()),
                }}
            />
            <Header locale={lang} dict={dict} settings={settings} products={products} />
            <main id="main-content">{children}</main>
            <Footer locale={lang} dict={dict} settings={settings} products={products} />
        </>
    );
}
