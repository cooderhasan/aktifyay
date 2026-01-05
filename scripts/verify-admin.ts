import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const adminEmail = 'admin@aktifyay.com';
    const testPassword = 'W@8m4rPxN6#fZvQh3Y9KT5jL';

    try {
        console.log('🔍 Admin kullanıcısı kontrol ediliyor...\n');

        const user = await prisma.user.findUnique({
            where: { email: adminEmail }
        });

        if (!user) {
            console.log('❌ Admin kullanıcısı bulunamadı!');
            console.log('   Kullanıcı oluşturulmalı.');
            return;
        }

        console.log('✅ Kullanıcı bulundu:');
        console.log(`   ID: ${user.id}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Name: ${user.name}`);
        console.log(`   Password Hash: ${user.password}\n`);

        // Şifreyi kontrol et
        const isPasswordValid = await bcrypt.compare(testPassword, user.password);

        if (isPasswordValid) {
            console.log('✅ Şifre eşleşmesi BAŞARILI!');
            console.log(`   Test Şifresi: ${testPassword}`);
        } else {
            console.log('❌ Şifre eşleşmesi BAŞARISIZ!');
            console.log(`   Test Şifresi: ${testPassword}`);
            console.log('\n🔧 Şifre yeniden oluşturuluyor...');

            const newHash = await bcrypt.hash(testPassword, 10);
            await prisma.user.update({
                where: { email: adminEmail },
                data: { password: newHash }
            });

            console.log('✅ Şifre güncellendi!');
            console.log(`   Yeni Hash: ${newHash}`);
        }
    } catch (error) {
        console.error('❌ Hata:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
