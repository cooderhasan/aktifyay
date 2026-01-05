import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = '$2b$10$bKJqFFbw.qFpc61ax1cF7eG/779EdVIY5WzKdYjQl.JqYXPXu8tK.';
    const adminEmail = 'admin@aktifyay.com';

    try {
        // Önce admin kullanıcısının var olup olmadığını kontrol et
        const existingUser = await prisma.user.findUnique({
            where: { email: adminEmail }
        });

        if (!existingUser) {
            console.log('❌ Admin kullanıcısı bulunamadı. Yeni kullanıcı oluşturuluyor...');

            const newUser = await prisma.user.create({
                data: {
                    email: adminEmail,
                    name: 'Admin',
                    password: hashedPassword,
                }
            });

            console.log('✅ Yeni admin kullanıcısı oluşturuldu!');
            console.log(`   Email: ${newUser.email}`);
            console.log(`   Şifre: W@8m4rPxN6#fZvQh3Y9KT5jL`);
        } else {
            // Kullanıcı varsa şifreyi güncelle
            const updatedUser = await prisma.user.update({
                where: { email: adminEmail },
                data: { password: hashedPassword }
            });

            console.log('✅ Admin şifresi başarıyla güncellendi!');
            console.log(`   Email: ${updatedUser.email}`);
            console.log(`   Yeni Şifre: W@8m4rPxN6#fZvQh3Y9KT5jL`);
        }
    } catch (error) {
        console.error('❌ Hata:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
