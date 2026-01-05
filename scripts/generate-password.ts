import bcrypt from 'bcryptjs';
import crypto from 'crypto';

// Generate a secure random password (24 characters)
const generateSecurePassword = (length = 24) => {
    const charset = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%^&*';
    let password = '';
    const randomBytes = crypto.randomBytes(length);

    for (let i = 0; i < length; i++) {
        password += charset[randomBytes[i] % charset.length];
    }

    return password;
};

async function main() {
    // Generate secure password
    const password = generateSecurePassword();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('\n=== GÜVENLI ADMIN ŞİFRESİ ===\n');
    console.log('Düz Şifre (Güvenli Yere Kaydedin!):');
    console.log(password);
    console.log('\nHashlenmiş Şifre (Veritabanına Kaydedilecek):');
    console.log(hashedPassword);
    console.log('\n================================\n');
    console.log('Veritabanını güncellemek için:\n');
    console.log(`npx prisma studio`);
    console.log('\nveya doğrudan SQL ile:\n');
    console.log(`UPDATE "User" SET password = '${hashedPassword}' WHERE email = 'admin@aktifyay.com';`);
    console.log('\n');
}

main().catch(console.error);
