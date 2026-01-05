
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL || "postgresql://postgres:123456@localhost:5432/yay?schema=public"
});

async function main() {
    console.log(`🌱 Seeding database...`);

    // 1. ADMIN USER
    const hashedPassword = await bcrypt.hash("W@8m4rPxN6#fZvQh3Y9KT5jL", 10);
    const admin = await prisma.user.upsert({
        where: { email: "admin@aktifyay.com" },
        update: {},
        create: {
            email: "admin@aktifyay.com",
            password: hashedPassword,
            name: "Admin",
            role: "admin",
        },
    });
    console.log(`✅ Admin user created: ${admin.email}`);

    // 2. HELPER: Read JSON Data
    const readJson = (file: string) => {
        const filePath = path.join(__dirname, "seed-data", file);
        if (!fs.existsSync(filePath)) {
            console.warn(`⚠️ Warning: Seed data file not found: ${file}`);
            return [];
        }
        return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    };

    const productsData = readJson("products.json");
    const industriesData = readJson("industries.json");
    const blogCategoriesData = readJson("blog-categories.json");
    const blogPostsData = readJson("blog-posts.json");

    // 3. SEED PRODUCTS
    console.log(`📦 Seeding ${productsData.length} product categories...`);
    for (const p of productsData) {
        const { id, createdAt, updatedAt, faqs, industryId, ...data } = p;

        await prisma.productCategory.upsert({
            where: { slug: p.slug },
            update: {
                ...data, // Update text content
                faqs: {
                    deleteMany: {},
                    create: faqs ? faqs.map((f: any) => ({
                        questionTr: f.questionTr,
                        answerTr: f.answerTr,
                        questionEn: f.questionEn,
                        answerEn: f.answerEn,
                        order: f.order,
                        isActive: f.isActive
                    })) : []
                }
            },
            create: {
                ...data,
                faqs: {
                    create: faqs ? faqs.map((f: any) => ({
                        questionTr: f.questionTr,
                        answerTr: f.answerTr,
                        questionEn: f.questionEn,
                        answerEn: f.answerEn,
                        order: f.order,
                        isActive: f.isActive
                    })) : []
                }
            }
        });
    }

    // 4. SEED INDUSTRIES
    console.log(`🏭 Seeding ${industriesData.length} industries...`);
    for (const ind of industriesData) {
        const { id, createdAt, updatedAt, faqs, ...data } = ind;

        await prisma.industry.upsert({
            where: { slug: ind.slug },
            update: {
                ...data,
                faqs: {
                    deleteMany: {},
                    create: faqs ? faqs.map((f: any) => ({
                        questionTr: f.questionTr,
                        answerTr: f.answerTr,
                        questionEn: f.questionEn,
                        answerEn: f.answerEn,
                        order: f.order,
                        isActive: f.isActive
                    })) : []
                }
            },
            create: {
                ...data,
                faqs: {
                    create: faqs ? faqs.map((f: any) => ({
                        questionTr: f.questionTr,
                        answerTr: f.answerTr,
                        questionEn: f.questionEn,
                        answerEn: f.answerEn,
                        order: f.order,
                        isActive: f.isActive
                    })) : []
                }
            }
        });
    }

    // 5. SEED BLOG CATEGORIES
    console.log(`📚 Seeding ${blogCategoriesData.length} blog categories...`);
    for (const cat of blogCategoriesData) {
        // We preserve ID to maintain relationships with posts
        const { createdAt, updatedAt, ...data } = cat;

        await prisma.blogCategory.upsert({
            where: { id: cat.id },
            update: data,
            create: {
                ...data,
                createdAt: cat.createdAt ? new Date(cat.createdAt) : undefined
            }
        });
    }

    // 6. SEED BLOG POSTS
    console.log(`📝 Seeding ${blogPostsData.length} blog posts...`);
    for (const post of blogPostsData) {
        const { createdAt, updatedAt, category, ...data } = post; // Exclude 'category' relation object if present

        await prisma.blogPost.upsert({
            where: { id: post.id },
            update: data,
            create: {
                ...data,
                publishedAt: post.publishedAt ? new Date(post.publishedAt) : undefined,
                createdAt: post.createdAt ? new Date(post.createdAt) : undefined
            }
        });
    }


    // 7. SITE SETTINGS (Static)
    const settings = [
        { key: "site_name", valueTr: "Aktif Yay", valueEn: "Aktif Yay" },
        { key: "phone", valueTr: "+90 212 123 45 67", valueEn: "+90 212 123 45 67" },
        { key: "email", valueTr: "info@aktifyay.com", valueEn: "info@aktifyay.com" },
        { key: "address", valueTr: "İstanbul, Türkiye", valueEn: "Istanbul, Turkey" },
        { key: "whatsapp", valueTr: "+905000000000", valueEn: "+905000000000" },
    ];

    for (const setting of settings) {
        await prisma.setting.upsert({
            where: { key: setting.key },
            update: {
                valueTr: setting.valueTr,
                valueEn: setting.valueEn
            },
            create: setting,
        });
    }

    // 8. STATIC PAGES
    const pages = [
        {
            slug: "hakkimizda",
            type: "static",
            titleTr: "Hakkımızda",
            titleEn: "About Us",
            contentTr: "<p>Aktif Yay olarak 1990 yılından beri...</p>",
            contentEn: "<p>As Aktif Yay, since 1990...</p>",
            isActive: true
        },
        {
            slug: "iletisim",
            type: "static",
            titleTr: "İletişim",
            titleEn: "Contact",
            contentTr: "<p>İletişim bilgilerimiz...</p>",
            contentEn: "<p>Contact details...</p>",
            isActive: true
        },
        {
            slug: "referanslar",
            type: "static",
            titleTr: "Referanslar",
            titleEn: "References",
            contentTr: "<p>Referanslarımız...</p>",
            contentEn: "<p>Our references...</p>",
            isActive: true
        }
    ];

    for (const page of pages) {
        await prisma.page.upsert({
            where: { slug: page.slug },
            update: {}, // Don't overwrite if exists (user might have edited)
            create: page,
        });
    }

    console.log("🎉 Database seeded successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
