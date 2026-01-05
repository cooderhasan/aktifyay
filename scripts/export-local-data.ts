
import { PrismaClient } from "@prisma/client";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// Local connection string
const prisma = new PrismaClient({
    datasourceUrl: "postgresql://postgres:123456@localhost:5432/yay?schema=public"
});

async function main() {
    console.log("--- START EXPORT ---");

    // Ensure data directory exists
    await mkdir("prisma/seed-data", { recursive: true });

    // 1. Export Industries
    const industries = await prisma.industry.findMany({
        include: { faqs: true },
        orderBy: { order: 'asc' }
    });

    await writeFile("prisma/seed-data/industries.json", JSON.stringify(industries, null, 2), "utf-8");
    console.log(`Saved ${industries.length} industries to prisma/seed-data/industries.json`);

    // 2. Export Products
    const products = await prisma.productCategory.findMany({
        include: { faqs: true },
        orderBy: { order: 'asc' }
    });

    await writeFile("prisma/seed-data/products.json", JSON.stringify(products, null, 2), "utf-8");
    console.log(`Saved ${products.length} products to prisma/seed-data/products.json`);

    // 3. Export Blog Categories
    const blogCategories = await prisma.blogCategory.findMany();
    await writeFile("prisma/seed-data/blog-categories.json", JSON.stringify(blogCategories, null, 2), "utf-8");
    console.log(`Saved ${blogCategories.length} blog categories to prisma/seed-data/blog-categories.json`);

    // 4. Export Blog Posts
    const blogPosts = await prisma.blogPost.findMany();
    await writeFile("prisma/seed-data/blog-posts.json", JSON.stringify(blogPosts, null, 2), "utf-8");
    console.log(`Saved ${blogPosts.length} blog posts to prisma/seed-data/blog-posts.json`);

    console.log("--- END EXPORT ---");
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
