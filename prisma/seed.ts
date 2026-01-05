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
            descriptionTr: "Basma yaylar, mekanik kuvvetlerin kontrolü, enerji depolama ve titreşimlerin sönümlenmesi için tasarlanmış endüstriyel yay türleridir.",
            descriptionEn: "Compression springs are industrial spring types designed for mechanical force control, energy storage, and vibration damping.",
            longDescTr: `Basma yaylar, endüstriyel uygulamalarda en yaygın kullanılan yay türlerinden biridir. Silindirik, konik veya varil şeklinde üretilebilen bu yaylar, üzerlerine uygulanan basınç kuvvetine karşı direnç göstererek enerji depolar ve bu enerjiyi kontrollü bir şekilde geri verir.

Aktif Yay olarak 30 yılı aşkın tecrübemizle, farklı sektörlerin ihtiyaçlarına uygun özel basma yay çözümleri sunuyoruz. CNC teknolojisi ile hassas üretim yaparak, müşterilerimizin teknik gereksinimlerini tam olarak karşılıyoruz.

Basma yaylarımız yüksek kaliteli çelik tellerden üretilmekte olup, ısıl işlem ve yüzey kaplama süreçlerinden geçirilerek uzun ömürlü performans sağlamaktadır.`,
            longDescEn: `Compression springs are one of the most commonly used spring types in industrial applications. These springs, which can be manufactured in cylindrical, conical, or barrel shapes, store energy by resisting the compression force applied to them and release this energy in a controlled manner.

At Aktif Yay, with over 30 years of experience, we offer custom compression spring solutions tailored to the needs of different industries. We meet our customers' technical requirements precisely through CNC technology and precision manufacturing.

Our compression springs are manufactured from high-quality steel wires and undergo heat treatment and surface coating processes to ensure long-lasting performance.`,
            usageAreasTr: "Otomotiv süspansiyon sistemleri\nBeyaz eşya mekanizmaları\nEndüstriyel makineler\nMedikal cihazlar\nElektronik ekipmanlar\nMobilya mekanizmaları",
            usageAreasEn: "Automotive suspension systems\nHome appliance mechanisms\nIndustrial machinery\nMedical devices\nElectronic equipment\nFurniture mechanisms",
            technicalSpecs: JSON.stringify([
                { label: "Tel Çapı / Wire Diameter", valueTr: "0.2mm - 25mm", valueEn: "0.2mm - 25mm" },
                { label: "Dış Çap / Outer Diameter", valueTr: "2mm - 200mm", valueEn: "2mm - 200mm" },
                { label: "Malzeme / Material", valueTr: "Çelik, Paslanmaz Çelik, Özel Alaşımlar", valueEn: "Steel, Stainless Steel, Special Alloys" },
                { label: "Yüzey İşlem / Surface Treatment", valueTr: "Galvaniz, Fosfat, Boyama", valueEn: "Galvanizing, Phosphate, Painting" }
            ]),
            metaTitleTr: "Basma Yaylar | Endüstriyel Yay Üretimi - Aktif Yay",
            metaTitleEn: "Compression Springs | Industrial Spring Manufacturing - Aktif Yay",
            metaDescriptionTr: "Yüksek kaliteli basma yay üretimi. Otomotiv, beyaz eşya, medikal ve endüstriyel uygulamalar için özel üretim.",
            metaDescriptionEn: "High quality compression spring manufacturing. Custom production for automotive, appliances, medical and industrial applications.",
        },
        {
            slug: "cekme-yaylar",
            nameTr: "Çekme Yaylar",
            nameEn: "Extension Springs",
            descriptionTr: "Çekme yaylar, iki uç arasında çekme kuvveti yaratarak enerji depolayan ve bu enerjiyi kontrollü şekilde serbest bırakan endüstriyel yay türüdür.",
            descriptionEn: "Extension springs are industrial springs that store energy by creating pulling force between two ends and release this energy in a controlled manner.",
            longDescTr: `Çekme yaylar, sıkıştırılmak yerine gerilme kuvvetine maruz kalarak çalışan yay türleridir. Uçlarında bulunan kancalar veya halkalar sayesinde parçalar arasında bağlantı kurarak çekme kuvveti oluştururlar.

Aktif Yay olarak, farklı kanca tiplerinde (İngiliz kanca, Alman kanca, makine kanca, halka uç) çekme yay üretimi yapıyoruz. CNC teknolojimiz sayesinde hassas toleranslarla yüksek kaliteli ürünler sunuyoruz.

Çekme yaylarımız otomotiv, beyaz eşya, tarım makineleri ve birçok endüstriyel uygulamada güvenle kullanılmaktadır.`,
            longDescEn: `Extension springs work by being subjected to tension force rather than compression. They create pulling force between parts through hooks or loops at their ends.

At Aktif Yay, we manufacture extension springs with different hook types (English hook, German hook, machine hook, loop end). Our CNC technology enables us to deliver high-quality products with precise tolerances.

Our extension springs are reliably used in automotive, home appliances, agricultural machinery, and many industrial applications.`,
            usageAreasTr: "Garaj kapı sistemleri\nTrambolinler\nOyuncaklar\nTarım makineleri\nOtomotiv parçaları\nKapı ve pencere mekanizmaları",
            usageAreasEn: "Garage door systems\nTrampolines\nToys\nAgricultural machinery\nAutomotive parts\nDoor and window mechanisms",
            technicalSpecs: JSON.stringify([
                { label: "Tel Çapı / Wire Diameter", valueTr: "0.3mm - 16mm", valueEn: "0.3mm - 16mm" },
                { label: "Dış Çap / Outer Diameter", valueTr: "3mm - 150mm", valueEn: "3mm - 150mm" },
                { label: "Kanca Tipi / Hook Type", valueTr: "İngiliz, Alman, Makine, Halka", valueEn: "English, German, Machine, Loop" },
                { label: "Malzeme / Material", valueTr: "Çelik, Paslanmaz Çelik", valueEn: "Steel, Stainless Steel" }
            ]),
            metaTitleTr: "Çekme Yaylar | Endüstriyel Yay Üretimi - Aktif Yay",
            metaTitleEn: "Extension Springs | Industrial Spring Manufacturing - Aktif Yay",
            metaDescriptionTr: "Profesyonel çekme yay üretimi. Farklı kanca tipleri ve özel ölçülerde üretim.",
            metaDescriptionEn: "Professional extension spring manufacturing. Production with different hook types and custom dimensions.",
        },
        {
            slug: "tel-form",
            nameTr: "Tel Form Yaylar",
            nameEn: "Wire Form Springs",
            descriptionTr: "Tel form ürünleri, özel geometrik şekillere sahip, sabitleme, bağlantı ve destek amaçlı kullanılan endüstriyel tel bileşenleridir.",
            descriptionEn: "Wire form products are industrial wire components with custom geometric shapes used for fastening, connection, and support purposes.",
            longDescTr: `Tel form yaylar, standart yay formlarının ötesinde özel tasarımlara sahip tel ürünlerdir. Müşteri ihtiyaçlarına göre çeşitli şekil ve boyutlarda üretilebilirler.

Aktif Yay olarak, CNC tel bükme makinelerimiz ile karmaşık geometrilere sahip tel form ürünleri üretiyoruz. Klipsler, toka yayları, mandal yayları, emniyet pimi telleri ve daha birçok özel ürün çeşidimiz mevcuttur.

Tel form ürünlerimiz otomotiv, mobilya, beyaz eşya ve elektrik-elektronik sektörlerinde yaygın olarak kullanılmaktadır.`,
            longDescEn: `Wire form springs are wire products with custom designs beyond standard spring forms. They can be manufactured in various shapes and sizes according to customer needs.

At Aktif Yay, we produce wire form products with complex geometries using our CNC wire bending machines. We have a wide range of products including clips, clasp springs, latch springs, safety pin wires, and many more custom products.

Our wire form products are widely used in automotive, furniture, home appliances, and electrical-electronics industries.`,
            usageAreasTr: "Otomotiv klipsleri\nMobilya mekanizmaları\nElektrik bağlantı elemanları\nEmniyet pimi telleri\nMandal sistemleri\nÖzel bağlantı parçaları",
            usageAreasEn: "Automotive clips\nFurniture mechanisms\nElectrical connectors\nSafety pin wires\nLatch systems\nCustom connecting parts",
            technicalSpecs: JSON.stringify([
                { label: "Tel Çapı / Wire Diameter", valueTr: "0.5mm - 12mm", valueEn: "0.5mm - 12mm" },
                { label: "Malzeme / Material", valueTr: "Çelik, Paslanmaz Çelik, Pirinç", valueEn: "Steel, Stainless Steel, Brass" },
                { label: "Şekil / Shape", valueTr: "Müşteri tasarımına göre özel", valueEn: "Custom according to customer design" },
                { label: "Tolerans / Tolerance", valueTr: "±0.1mm", valueEn: "±0.1mm" }
            ]),
            metaTitleTr: "Tel Form Yaylar | Özel Tel Şekillendirme - Aktif Yay",
            metaTitleEn: "Wire Form Springs | Custom Wire Forming - Aktif Yay",
            metaDescriptionTr: "CNC tel bükme ile özel tel form üretimi. Klipsler, bağlantı elemanları ve özel tasarımlar.",
            metaDescriptionEn: "Custom wire form production with CNC wire bending. Clips, connectors and custom designs.",
        },
        {
            slug: "kurma-yaylar",
            nameTr: "Kurma Yaylar",
            nameEn: "Torsion Springs",
            descriptionTr: "Kurma yaylar, dönme kuvvetine dayanarak enerji depolayan ve bu enerjiyi dönel hareket olarak geri veren endüstriyel yay türleridir.",
            descriptionEn: "Torsion springs are industrial springs that store energy by resisting rotational force and release this energy as rotational motion.",
            longDescTr: `Kurma yaylar (torsion yaylar), burulma momentine karşı çalışan ve dönel enerji depolayan yay türleridir. Uçlarındaki bacaklar sayesinde bağlı oldukları parçalara tork uygularlar.

Aktif Yay olarak, tek bacaklı, çift bacaklı ve özel bacak açılarına sahip kurma yay üretimi yapıyoruz. Otomotiv motor valflerinden ev eşyası menteşelerine kadar geniş bir uygulama yelpazesinde ürünlerimiz kullanılmaktadır.

Kurma yaylarımız yüksek yorulma dayanımına sahip malzemelerden üretilmekte ve hassas ısıl işlem süreçlerinden geçmektedir.`,
            longDescEn: `Torsion springs work against torsional moment and store rotational energy. They apply torque to connected parts through legs at their ends.

At Aktif Yay, we manufacture torsion springs with single leg, double leg, and custom leg angles. Our products are used in a wide range of applications from automotive engine valves to household hinges.

Our torsion springs are manufactured from materials with high fatigue resistance and undergo precise heat treatment processes.`,
            usageAreasTr: "Kapı ve pencere menteşeleri\nOtomotiv motor valfları\nGeri çekme mekanizmaları\nKollu mekanizmalar\nTıbbi cihazlar\nSaat mekanizmaları",
            usageAreasEn: "Door and window hinges\nAutomotive engine valves\nRetraction mechanisms\nLever mechanisms\nMedical devices\nClock mechanisms",
            technicalSpecs: JSON.stringify([
                { label: "Tel Çapı / Wire Diameter", valueTr: "0.2mm - 16mm", valueEn: "0.2mm - 16mm" },
                { label: "Dış Çap / Outer Diameter", valueTr: "3mm - 150mm", valueEn: "3mm - 150mm" },
                { label: "Bacak Tipi / Leg Type", valueTr: "Düz, Açılı, Kıvrımlı", valueEn: "Straight, Angled, Curved" },
                { label: "Sarım Yönü / Wind Direction", valueTr: "Sol veya Sağ", valueEn: "Left or Right" }
            ]),
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

    // Create static pages
    const pages = [
        {
            slug: "hakkimizda", // Canonical slug
            type: "static",

            // Content
            titleTr: "Hakkımızda",
            titleEn: "About Us",
            h1Tr: "Hakkımızda",
            h1En: "About Us",
            descriptionTr: "1994'ten bu yana Konya'da endüstriyel yay üretiminde öncü",
            descriptionEn: "Pioneer in industrial spring manufacturing in Konya since 1994",
            contentTr: `<h2>Hikayemiz</h2>
<p>Aktif Yay, 1994 yılında Konya'da kurulmuş ve o günden bu yana Türkiye'nin önde gelen yay üreticilerinden biri haline gelmiştir. 30 yılı aşkın tecrübemizle, otomotiv, savunma sanayi, beyaz eşya, medikal ve daha birçok sektöre hizmet vermekteyiz.</p>
<p>Modern CNC makineleri ve uzman kadromuzla, müşterilerimizin özel ihtiyaçlarına uygun yay çözümleri üretiyoruz. Kalite, güvenilirlik ve müşteri memnuniyeti her zaman önceliğimizdir.</p>`,
            contentEn: `<h2>Our Story</h2>
<p>Aktif Yay was founded in Konya in 1994 and has since become one of Turkey's leading spring manufacturers. With over 30 years of experience, we serve the automotive, defense, appliances, medical, and many other industries.</p>
<p>With our modern CNC machines and expert team, we produce spring solutions tailored to our customers' specific needs. Quality, reliability, and customer satisfaction are always our priority.</p>`,

            // SEO
            metaTitleTr: "Hakkımızda | Aktif Yay - 30 Yıllık Yay Üretim Tecrübesi",
            metaTitleEn: "About Us | Aktif Yay - 30 Years of Spring Manufacturing Experience",
            metaDescriptionTr: "1994'ten bu yana Konya'da endüstriyel yay üretimi. Aktif Yay olarak otomotiv, savunma, beyaz eşya sektörlerine hizmet veriyoruz.",
            metaDescriptionEn: "Industrial spring manufacturing in Konya since 1994. At Aktif Yay, we serve automotive, defense, and appliance industries.",

            isActive: true,
            order: 1
        }
    ];

    for (const page of pages) {
        await prisma.page.upsert({
            where: { slug: page.slug },
            update: page,
            create: page,
        });
    }
    console.log("✅ Pages created");

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
