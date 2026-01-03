import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    datasourceUrl: "postgresql://postgres:123456@localhost:5432/yay?schema=public"
});

async function main() {
    console.log("🌱 Seeding database...");

    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const admin = await prisma.user.upsert({
        where: { email: "admin@aktifyay.com.tr" },
        update: {},
        create: {
            email: "admin@aktifyay.com.tr",
            password: hashedPassword,
            name: "Admin",
            role: "admin",
        },
    });
    console.log("✅ Admin user created:", admin.email);

    // Create product categories
    const products = [
        {
            slug: "basma-yaylar",
            nameTr: "Basma Yaylar",
            nameEn: "Compression Springs",
            descriptionTr: "Mekanik kuvvetlerin kontrolü ve enerji depolama için tasarlanmış yaylar",
            descriptionEn: "Springs designed for mechanical force control and energy storage",
            metaTitleTr: "Basma Yaylar | Endüstriyel Yay Üretimi - Aktif Yay",
            metaTitleEn: "Compression Springs | Industrial Spring Manufacturing - Aktif Yay",
            metaDescriptionTr: "Yüksek kaliteli basma yay üretimi. Otomotiv, beyaz eşya, medikal ve endüstriyel uygulamalar için özel üretim.",
            metaDescriptionEn: "High quality compression spring manufacturing. Custom production for automotive, appliances, medical and industrial applications.",
        },
        {
            slug: "cekme-yaylar",
            nameTr: "Çekme Yaylar",
            nameEn: "Extension Springs",
            descriptionTr: "Çekme kuvveti yaratarak enerji depolayan kritik yay türü",
            descriptionEn: "Critical spring type that stores energy by creating pulling force",
            metaTitleTr: "Çekme Yaylar | Endüstriyel Yay Üretimi - Aktif Yay",
            metaTitleEn: "Extension Springs | Industrial Spring Manufacturing - Aktif Yay",
            metaDescriptionTr: "Profesyonel çekme yay üretimi. Farklı kanca tipleri ve özel ölçülerde üretim.",
            metaDescriptionEn: "Professional extension spring manufacturing. Production with different hook types and custom dimensions.",
        },
        {
            slug: "tel-form",
            nameTr: "Tel Form Yaylar",
            nameEn: "Wire Form Springs",
            descriptionTr: "Özel geometrik şekillere sahip endüstriyel tel bileşenleri",
            descriptionEn: "Industrial wire components with custom geometric shapes",
            metaTitleTr: "Tel Form Yaylar | Özel Tel Şekillendirme - Aktif Yay",
            metaTitleEn: "Wire Form Springs | Custom Wire Forming - Aktif Yay",
            metaDescriptionTr: "CNC tel bükme ile özel tel form üretimi. Klipsler, bağlantı elemanları ve özel tasarımlar.",
            metaDescriptionEn: "Custom wire form production with CNC wire bending. Clips, connectors and custom designs.",
        },
        {
            slug: "kurma-yaylar",
            nameTr: "Kurma Yaylar",
            nameEn: "Torsion Springs",
            descriptionTr: "Dönme kuvvetine dayanarak enerji depolayan yay türü",
            descriptionEn: "Spring type that stores energy by resisting rotational force",
            metaTitleTr: "Kurma Yaylar | Burulma Yay Üretimi - Aktif Yay",
            metaTitleEn: "Torsion Springs | Torsion Spring Manufacturing - Aktif Yay",
            metaDescriptionTr: "Kurma yay (torsion yay) üretimi. Menteşe, motor valfi ve mekanizma uygulamaları için.",
            metaDescriptionEn: "Torsion spring manufacturing. For hinge, engine valve and mechanism applications.",
        },
    ];

    for (const product of products) {
        await prisma.productCategory.upsert({
            where: { slug: product.slug },
            update: product,
            create: { ...product, order: products.indexOf(product) },
        });
    }
    console.log("✅ Product categories created");

    // Create industries
    const industries = [
        {
            slug: "otomotiv",
            nameTr: "Otomotiv",
            nameEn: "Automotive",
            descriptionTr: "Otomotiv sektörü için yüksek performanslı yay çözümleri",
            descriptionEn: "High-performance spring solutions for the automotive industry",
            metaTitleTr: "Otomotiv Sektörü için Yay Çözümleri | Aktif Yay",
            metaTitleEn: "Spring Solutions for Automotive Industry | Aktif Yay",
        },
        {
            slug: "savunma-sanayi",
            nameTr: "Savunma Sanayi",
            nameEn: "Defense Industry",
            descriptionTr: "Savunma sanayi için kritik güvenlik standartlarında yay üretimi",
            descriptionEn: "Spring manufacturing at critical safety standards for defense industry",
            metaTitleTr: "Savunma Sanayi için Yay Çözümleri | Aktif Yay",
            metaTitleEn: "Spring Solutions for Defense Industry | Aktif Yay",
        },
        {
            slug: "tarim-ziraat",
            nameTr: "Tarım & Ziraat",
            nameEn: "Agriculture",
            descriptionTr: "Tarım makineleri için dayanıklı yay çözümleri",
            descriptionEn: "Durable spring solutions for agricultural machinery",
            metaTitleTr: "Tarım Sektörü için Yay Çözümleri | Aktif Yay",
            metaTitleEn: "Spring Solutions for Agriculture | Aktif Yay",
        },
        {
            slug: "mobilya",
            nameTr: "Mobilya",
            nameEn: "Furniture",
            descriptionTr: "Mobilya mekanizmaları için estetik ve fonksiyonel yaylar",
            descriptionEn: "Aesthetic and functional springs for furniture mechanisms",
            metaTitleTr: "Mobilya Sektörü için Yay Çözümleri | Aktif Yay",
            metaTitleEn: "Spring Solutions for Furniture Industry | Aktif Yay",
        },
        {
            slug: "beyaz-esya",
            nameTr: "Beyaz Eşya",
            nameEn: "Home Appliances",
            descriptionTr: "Ev aletleri için güvenilir ve uzun ömürlü yaylar",
            descriptionEn: "Reliable and long-lasting springs for home appliances",
            metaTitleTr: "Beyaz Eşya Sektörü için Yay Çözümleri | Aktif Yay",
            metaTitleEn: "Spring Solutions for Home Appliances | Aktif Yay",
        },
        {
            slug: "medikal",
            nameTr: "Medikal",
            nameEn: "Medical",
            descriptionTr: "Tıbbi cihazlar için hassas ve hijyenik yay çözümleri",
            descriptionEn: "Precise and hygienic spring solutions for medical devices",
            metaTitleTr: "Medikal Sektör için Yay Çözümleri | Aktif Yay",
            metaTitleEn: "Spring Solutions for Medical Industry | Aktif Yay",
        },
        {
            slug: "havacilik",
            nameTr: "Havacılık",
            nameEn: "Aviation",
            descriptionTr: "Havacılık ve uzay sanayi için yüksek performanslı yaylar",
            descriptionEn: "High-performance springs for aviation and aerospace industry",
            metaTitleTr: "Havacılık Sektörü için Yay Çözümleri | Aktif Yay",
            metaTitleEn: "Spring Solutions for Aviation Industry | Aktif Yay",
        },
        {
            slug: "elektrik-elektronik",
            nameTr: "Elektrik & Elektronik",
            nameEn: "Electronics",
            descriptionTr: "Elektronik cihazlar için hassas yay çözümleri",
            descriptionEn: "Precision spring solutions for electronic devices",
            metaTitleTr: "Elektrik Elektronik Sektörü için Yay Çözümleri | Aktif Yay",
            metaTitleEn: "Spring Solutions for Electronics Industry | Aktif Yay",
        },
    ];

    for (const industry of industries) {
        await prisma.industry.upsert({
            where: { slug: industry.slug },
            update: industry,
            create: { ...industry, order: industries.indexOf(industry) },
        });
    }
    console.log("✅ Industries created");

    // Create site settings
    const settings = [
        { key: "site_name", valueTr: "Aktif Yay", valueEn: "Aktif Yay" },
        { key: "phone", valueTr: "+90 532 676 34 88", valueEn: "+90 532 676 34 88" },
        { key: "email", valueTr: "info@aktifyay.com.tr", valueEn: "info@aktifyay.com.tr" },
        { key: "address", valueTr: "Horozluhan Mah. Yazırhan Sok. No:14 Selçuklu/Konya", valueEn: "Horozluhan Mah. Yazirhan Sok. No:14 Selcuklu/Konya, Turkey" },
    ];

    for (const setting of settings) {
        await prisma.setting.upsert({
            where: { key: setting.key },
            update: setting,
            create: setting,
        });
    }
    console.log("✅ Settings created");

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
