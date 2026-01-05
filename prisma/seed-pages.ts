import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const pages = [
    {
        slug: "gizlilik-politikasi",
        titleTr: "Gizlilik Politikası",
        titleEn: "Privacy Policy",
        contentTr: "<h1>Gizlilik Politikası</h1><p>Gizlilik politikası içeriği buraya gelecek...</p>",
        contentEn: "<h1>Privacy Policy</h1><p>Privacy policy content goes here...</p>",
        type: "static"
    },
    {
        slug: "cerez-politikasi",
        titleTr: "Çerez Politikası",
        titleEn: "Cookie Policy",
        contentTr: "<h1>Çerez Politikası</h1><p>Çerez politikası içeriği buraya gelecek...</p>",
        contentEn: "<h1>Cookie Policy</h1><p>Cookie policy content goes here...</p>",
        type: "static"
    },
    {
        slug: "kullanim-kosullari",
        titleTr: "Kullanım Koşulları",
        titleEn: "Terms of Use",
        contentTr: "<h1>Kullanım Koşulları</h1><p>Kullanım koşulları içeriği buraya gelecek...</p>",
        contentEn: "<h1>Terms of Use</h1><p>Terms of use content goes here...</p>",
        type: "static"
    },
    {
        slug: "kvkk",
        titleTr: "KVKK Aydınlatma Metni",
        titleEn: "KVKK Clarification Text",
        contentTr: "<h1>KVKK Aydınlatma Metni</h1><p>KVKK metni buraya gelecek...</p>",
        contentEn: "<h1>KVKK Clarification Text</h1><p>KVKK text goes here...</p>",
        type: "static"
    }
];

async function main() {
    for (const page of pages) {
        const existing = await prisma.page.findUnique({
            where: { slug: page.slug }
        });

        if (!existing) {
            await prisma.page.create({
                data: page
            });
            console.log(`Created page: ${page.slug}`);
        } else {
            console.log(`Page already exists: ${page.slug}`);
        }
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
