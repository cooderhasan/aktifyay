import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const correctEmail = 'admin@aktifyay.com.tr';
    const wrongEmail = 'admin@aktifyay.com';
    const password = 'W@8m4rPxN6#fZvQh3Y9KT5jL';

    try {
        console.log('🔍 Tüm kullanıcılar kontrol ediliyor...\n');

        const allUsers = await prisma.user.findMany();
        console.log(`Toplam ${allUsers.length} kullanıcı bulundu:`);
        allUsers.forEach(u => console.log(`  - ${u.email} (ID: ${u.id})`));
        console.log('');

        // Yanlış email'i sil
        const wrongUser = await prisma.user.findUnique({ where: { email: wrongEmail } });
        if (wrongUser) {
            await prisma.user.delete({ where: { email: wrongEmail } });
            console.log('✅ Yanlış email silindi:', wrongEmail);
        }

        // Doğru email'i kontrol et veya oluştur
        let correctUser = await prisma.user.findUnique({ where: { email: correctEmail } });

        if (!correctUser) {
            const hashedPassword = await bcrypt.hash(password, 10);
            correctUser = await prisma.user.create({
                data: {
                    email: correctEmail,
                    name: 'Admin',
                    password: hashedPassword,
                }
            });
            console.log('✅ Doğru email ile kullanıcı oluşturuldu');
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            await prisma.user.update({
                where: { email: correctEmail },
                data: { password: hashedPassword }
            });
            console.log('✅ Mevcut kullanıcının şifresi güncellendi');
        }

        console.log('\n=== GİRİŞ BİLGİLERİ ===');
        console.log(`Email: ${correctEmail}`);
        console.log(`Şifre: ${password}`);
        console.log('========================\n');

    } catch (error) {
        console.error('❌ Hata:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
