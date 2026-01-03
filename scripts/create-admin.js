const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
    const hash = await bcrypt.hash("admin123", 10);
    const user = await prisma.user.upsert({
        where: { email: "admin@aktifyay.com.tr" },
        update: { password: hash },
        create: {
            email: "admin@aktifyay.com.tr",
            password: hash,
            name: "Admin",
            role: "admin",
        },
    });
    console.log("✅ Admin created:", user.email);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
