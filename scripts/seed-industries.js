const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const staticIndustries = {
    "otomotiv": {
        nameTr: "Otomotiv Sektörü",
        nameEn: "Automotive Industry",
        descriptionTr: "Otomotiv sektörü için yüksek performanslı ve dayanıklı yay çözümleri. Motor parçalarından süspansiyon sistemlerine kadar geniş ürün yelpazesi.",
        descriptionEn: "High-performance and durable spring solutions for the automotive industry. Wide product range from engine parts to suspension systems.",
        contentTr: `Otomotiv sektörü, en zorlu çalışma koşullarına sahip endüstrilerden biridir. Araçların güvenliği, performansı ve konforu için kullanılan yayların yüksek kalitede olması kritik önem taşır.

Aktif Yay olarak, otomotiv sektörünün ihtiyaç duyduğu hassas toleranslı ve yüksek dayanımlı yayları üretiyoruz. Motor valflerinden fren sistemlerine, süspansiyondan koltuk mekanizmalarına kadar geniş bir uygulama alanına hizmet veriyoruz.

30 yılı aşkın tecrübemizle, Türkiye'nin önde gelen otomotiv tedarikçilerine güvenilir yay çözümleri sunuyoruz.`,
        contentEn: `The automotive industry is one of the industries with the most demanding operating conditions. The high quality of springs used for vehicle safety, performance, and comfort is critically important.

At Aktif Yay, we manufacture precision-toleranced and high-strength springs required by the automotive industry. We serve a wide range of applications from engine valves to brake systems, from suspension to seat mechanisms.

With over 30 years of experience, we provide reliable spring solutions to Turkey's leading automotive suppliers.`,
        solutionsTr: [
            "Motor valf yayları - yüksek sıcaklık dayanımı",
            "Süspansiyon yayları - özel alaşım çelikler",
            "Fren sistemi yayları - güvenlik sertifikalı",
            "Koltuk mekanizma yayları - uzun ömürlü",
            "Kapı ve bagaj yayları - korozyon dirençli",
        ],
        solutionsEn: [
            "Engine valve springs - high temperature resistance",
            "Suspension springs - special alloy steels",
            "Brake system springs - safety certified",
            "Seat mechanism springs - long-lasting",
            "Door and trunk springs - corrosion resistant",
        ],
        products: ["basma-yaylar", "cekme-yaylar", "kurma-yaylar", "tel-form"],
        order: 1
    },
    "savunma-sanayi": {
        nameTr: "Savunma Sanayi",
        nameEn: "Defense Industry",
        descriptionTr: "Savunma sanayi için kritik güvenlik standartlarında üretilen yüksek performanslı yay çözümleri.",
        descriptionEn: "High-performance spring solutions manufactured to critical safety standards for the defense industry.",
        contentTr: `Savunma sanayi, en yüksek kalite ve güvenilirlik standartlarını gerektiren sektörlerden biridir. Bu alanda kullanılan yayların olağanüstü koşullarda bile güvenilir çalışması zorunludur.

Aktif Yay, savunma sanayi projelerinde kullanılan kritik komponentler için özel yay çözümleri geliştirmektedir. Tüm ürünlerimiz sıkı kalite kontrol süreçlerinden geçmekte ve belgelenmektedir.

Gizlilik ilkelerine bağlı kalarak, savunma sanayi müşterilerimize güvenilir tedarik süreci sunuyoruz.`,
        contentEn: `The defense industry is one of the sectors that requires the highest quality and reliability standards. Springs used in this field must operate reliably even under extraordinary conditions.

Aktif Yay develops special spring solutions for critical components used in defense industry projects. All our products undergo strict quality control processes and are documented.

Adhering to confidentiality principles, we offer a reliable supply process to our defense industry customers.`,
        solutionsTr: [
            "Silah sistemleri yayları",
            "Askeri araç komponentleri",
            "Hassas mekanizma yayları",
            "Yüksek dayanımlı özel alaşımlar",
        ],
        solutionsEn: [
            "Weapon system springs",
            "Military vehicle components",
            "Precision mechanism springs",
            "High-strength special alloys",
        ],
        products: ["basma-yaylar", "cekme-yaylar", "kurma-yaylar"],
        order: 2
    },
    "tarim-ziraat": {
        nameTr: "Tarım & Ziraat",
        nameEn: "Agriculture",
        descriptionTr: "Tarım makineleri ve sulama sistemleri için dayanıklı ve güvenilir yay çözümleri.",
        descriptionEn: "Durable and reliable spring solutions for agricultural machinery and irrigation systems.",
        contentTr: `Tarım sektörü, zorlu arazi koşullarında çalışan makineler için dayanıklı ve güvenilir yay çözümleri gerektirir. Traktörlerden hasat makinelerine, sulama sistemlerinden seralara kadar geniş bir uygulama alanında yaylarımız kullanılmaktadır.

Aktif Yay, tarım makineleri üreticilerine ve tarım ekipmanları tedarikçilerine yüksek kaliteli yay çözümleri sunmaktadır. Ürünlerimiz korozyon direnci ve uzun ömür göz önünde bulundurularak tasarlanmaktadır.`,
        contentEn: `The agricultural sector requires durable and reliable spring solutions for machines operating in challenging terrain conditions. Our springs are used in a wide range of applications from tractors to harvesters, from irrigation systems to greenhouses.

Aktif Yay provides high-quality spring solutions to agricultural machinery manufacturers and agricultural equipment suppliers. Our products are designed with corrosion resistance and longevity in mind.`,
        solutionsTr: [
            "Traktör ve biçerdöver yayları",
            "Sulama sistemi yayları",
            "Ekipman mekanizma yayları",
            "Sera sistemleri yayları",
        ],
        solutionsEn: [
            "Tractor and harvester springs",
            "Irrigation system springs",
            "Equipment mechanism springs",
            "Greenhouse system springs",
        ],
        products: ["basma-yaylar", "cekme-yaylar", "tel-form"],
        order: 3
    },
    "mobilya": {
        nameTr: "Mobilya Sektörü",
        nameEn: "Furniture Industry",
        descriptionTr: "Mobilya mekanizmaları için estetik ve fonksiyonel yay çözümleri.",
        descriptionEn: "Aesthetic and functional spring solutions for furniture mechanisms.",
        contentTr: `Mobilya sektörü, konfor ve fonksiyonelliği bir arada sunan yay çözümleri gerektirir. Koltuk mekanizmalarından yatak sistemlerine, çekmece raylarından kapı menteşelerine kadar birçok mobilya parçasında yaylar kritik rol oynar.

Aktif Yay, mobilya üreticilerine uzun ömürlü ve sessiz çalışan yay çözümleri sunmaktadır. Ürünlerimiz estetik ve fonksiyonellik dengesini gözetir.`,
        contentEn: `The furniture industry requires spring solutions that combine comfort and functionality. Springs play a critical role in many furniture parts, from seat mechanisms to bed systems, from drawer slides to door hinges.

Aktif Yay provides long-lasting and quiet-running spring solutions to furniture manufacturers. Our products balance aesthetics and functionality.`,
        solutionsTr: [
            "Koltuk ve kanepe yayları",
            "Yatak mekanizma yayları",
            "Çekmece rayı yayları",
            "Kapı ve dolap menteşe yayları",
        ],
        solutionsEn: [
            "Sofa and couch springs",
            "Bed mechanism springs",
            "Drawer slide springs",
            "Door and cabinet hinge springs",
        ],
        products: ["basma-yaylar", "kurma-yaylar", "tel-form"],
        order: 4
    },
    "beyaz-esya": {
        nameTr: "Beyaz Eşya",
        nameEn: "Home Appliances",
        descriptionTr: "Ev aletleri için güvenilir ve uzun ömürlü yay çözümleri.",
        descriptionEn: "Reliable and long-lasting spring solutions for home appliances.",
        contentTr: `Beyaz eşya sektörü, günlük kullanımda güvenilir performans gösteren yay çözümleri gerektirir. Çamaşır makinelerinden bulaşık makinelerine, buzdolaplarından fırınlara kadar birçok ev aletinde yaylarımız kullanılmaktadır.

Aktif Yay, Türkiye'nin önde gelen beyaz eşya üreticilerine yay tedarik etmektedir. Ürünlerimiz yüksek çevrim ömrü ve sessiz çalışma için optimize edilmiştir.`,
        contentEn: `The home appliance sector requires spring solutions that deliver reliable performance in daily use. Our springs are used in many home appliances from washing machines to dishwashers, from refrigerators to ovens.

Aktif Yay supplies springs to Turkey's leading home appliance manufacturers. Our products are optimized for high cycle life and quiet operation.`,
        solutionsTr: [
            "Çamaşır makinesi süspansiyon yayları",
            "Bulaşık makinesi kapı yayları",
            "Buzdolabı menteşe yayları",
            "Fırın kapak yayları",
        ],
        solutionsEn: [
            "Washing machine suspension springs",
            "Dishwasher door springs",
            "Refrigerator hinge springs",
            "Oven door springs",
        ],
        products: ["basma-yaylar", "cekme-yaylar", "kurma-yaylar"],
        order: 5
    },
    "medikal": {
        nameTr: "Medikal Sektörü",
        nameEn: "Medical Industry",
        descriptionTr: "Tıbbi cihazlar için hassas ve hijyenik yay çözümleri.",
        descriptionEn: "Precise and hygienic spring solutions for medical devices.",
        contentTr: `Medikal sektör, en yüksek hassasiyet ve hijyen standartlarını gerektiren alanlardan biridir. Tıbbi cihazlarda kullanılan yayların güvenilir ve sterilize edilebilir olması zorunludur.

Aktif Yay, medikal cihaz üreticilerine paslanmaz çelik ve özel alaşımlardan üretilmiş yay çözümleri sunmaktadır. Tüm ürünlerimiz sağlık sektörünün gereksinimlerine uygun olarak üretilmektedir.`,
        contentEn: `The medical sector is one of the areas that requires the highest precision and hygiene standards. Springs used in medical devices must be reliable and sterilizable.

Aktif Yay provides spring solutions made from stainless steel and special alloys to medical device manufacturers. All our products are manufactured to meet the requirements of the healthcare sector.`,
        solutionsTr: [
            "Cerrahi alet yayları",
            "Tıbbi cihaz mekanizma yayları",
            "Protez ve ortez yayları",
            "Laboratuvar ekipmanı yayları",
        ],
        solutionsEn: [
            "Surgical instrument springs",
            "Medical device mechanism springs",
            "Prosthetic and orthotic springs",
            "Laboratory equipment springs",
        ],
        products: ["basma-yaylar", "cekme-yaylar", "kurma-yaylar", "tel-form"],
        order: 6
    },
    "havacilik": {
        nameTr: "Havacılık Sektörü",
        nameEn: "Aviation Industry",
        descriptionTr: "Havacılık ve uzay sanayi için yüksek performanslı özel yay çözümleri.",
        descriptionEn: "High-performance special spring solutions for aviation and aerospace industry.",
        contentTr: `Havacılık sektörü, en zorlu çalışma koşulları ve en yüksek güvenlik standartları gerektiren sektörlerden biridir. Bu alanda kullanılan yayların olağanüstü dayanıklılık ve güvenilirlik göstermesi zorunludur.

Aktif Yay, havacılık sektörünün ihtiyaç duyduğu özel alaşımlardan üretilen yayları sağlamaktadır. Isı direnci, yorulma dayanımı ve hafiflik gibi kritik parametreler göz önünde bulundurularak tasarlanan ürünlerimiz, sıkı kalite kontrol süreçlerinden geçmektedir.`,
        contentEn: `The aviation industry is one of the sectors that requires the most demanding operating conditions and highest safety standards. Springs used in this field must demonstrate extraordinary durability and reliability.

Aktif Yay provides springs manufactured from special alloys required by the aviation industry. Our products, designed with critical parameters such as heat resistance, fatigue strength, and lightness in mind, undergo strict quality control processes.`,
        solutionsTr: [
            "Uçak motor komponent yayları",
            "İniş takımı yayları",
            "Kabin mekanizma yayları",
            "Kontrol sistemi yayları",
        ],
        solutionsEn: [
            "Aircraft engine component springs",
            "Landing gear springs",
            "Cabin mechanism springs",
            "Control system springs",
        ],
        products: ["basma-yaylar", "kurma-yaylar"],
        order: 7
    },
    "elektrik-elektronik": {
        nameTr: "Elektrik & Elektronik",
        nameEn: "Electronics Industry",
        descriptionTr: "Elektronik cihazlar ve elektrik sistemleri için hassas yay çözümleri.",
        descriptionEn: "Precision spring solutions for electronic devices and electrical systems.",
        contentTr: `Elektrik-elektronik sektörü, minyatür boyutlardan endüstriyel ölçeklere kadar geniş bir yay çeşitliliği gerektirir. Bağlantı elemanlarından şalterlere, sensörlerden güç kaynaklarına kadar birçok uygulamada yaylar kritik rol oynar.

Aktif Yay, elektronik sektörünün ihtiyaç duyduğu yüksek hassasiyetli ve iletken yay çözümleri sunmaktadır. Fosfor bronz, berilliyum bakır ve paslanmaz çelik gibi özel malzemelerden üretim yapıyoruz.`,
        contentEn: `The electrical-electronics sector requires a wide variety of springs from miniature sizes to industrial scales. Springs play a critical role in many applications from connectors to switches, from sensors to power supplies.

Aktif Yay provides high-precision and conductive spring solutions required by the electronics sector. We manufacture from special materials such as phosphor bronze, beryllium copper, and stainless steel.`,
        solutionsTr: [
            "Konektör ve terminal yayları",
            "Şalter ve anahtar yayları",
            "Pil kontakt yayları",
            "Sensör mekanizma yayları",
        ],
        solutionsEn: [
            "Connector and terminal springs",
            "Switch springs",
            "Battery contact springs",
            "Sensor mechanism springs",
        ],
        products: ["basma-yaylar", "cekme-yaylar", "tel-form"],
        order: 8
    },
};

async function main() {
    console.log('Seeding industries...');

    for (const [slug, data] of Object.entries(staticIndustries)) {
        const solutionsTr = data.solutionsTr.join('\n');
        const solutionsEn = data.solutionsEn.join('\n');
        const relatedProducts = JSON.stringify(data.products);

        await prisma.industry.upsert({
            where: { slug: slug },
            update: {
                nameTr: data.nameTr,
                nameEn: data.nameEn,
                descriptionTr: data.descriptionTr,
                descriptionEn: data.descriptionEn,
                contentTr: data.contentTr,
                contentEn: data.contentEn,
                solutionsTr: solutionsTr,
                solutionsEn: solutionsEn,
                relatedProducts: relatedProducts,
                order: data.order,
                // Keep existing image if present, otherwise no change (or default)
                // We don't overwrite image/isActive/meta here to preserve admin edits if any
            },
            create: {
                slug: slug,
                nameTr: data.nameTr,
                nameEn: data.nameEn,
                descriptionTr: data.descriptionTr,
                descriptionEn: data.descriptionEn,
                contentTr: data.contentTr,
                contentEn: data.contentEn,
                solutionsTr: solutionsTr,
                solutionsEn: solutionsEn,
                relatedProducts: relatedProducts,
                order: data.order,
                isActive: true,
                image: "/defaults/industry-default.png",
                imageAltTr: data.nameTr,
                imageAltEn: data.nameEn,
            }
        });
        console.log(`Upserted industry: ${slug}`);
    }

    console.log('Seeding completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
