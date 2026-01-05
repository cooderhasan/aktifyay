import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const oldEmail = 'admin@aktifyay.com';
    const newEmail = 'admin@aktifyay.com.tr';

    try {
        console.log('🔄 Admin email güncelleniyor...\n');

        const user = await prisma.user.findUnique({
            where: { email: oldEmail }
        });

        if (!user) {
            console.log('❌ Eski email ile kullanıcı bulunamadı:', oldEmail);
            return;
        }

        const updatedUser = await prisma.user.update({
            where: { email: oldEmail },
            data: { email: newEmail }
        });

        console.log('✅ Email başarıyla güncellendi!');
        console.log(`   Eski Email: ${oldEmail}`);
        console.log(`   Yeni Email: ${updatedUser.email}`);
        console.log(`   Şifre: W@8m4rPxN6#fZvQh3Y9KT5jL (değişmedi)\n`);
    } catch (error) {
        console.error('❌ Hata:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
