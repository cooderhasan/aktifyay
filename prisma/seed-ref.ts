import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const count = await prisma.reference.count();
    if (count === 0) {
        console.log("Adding dummy reference...");
        await prisma.reference.create({
            data: {
                name: "Aktif Yay (Dummy)",
                image: "/defaults/product-default.png", // Use an existing image
                isActive: true,
                order: 1
            },
        });
        console.log("Dummy reference added.");
    } else {
        console.log("References already exist.");
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
