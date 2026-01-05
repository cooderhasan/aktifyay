import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding blog data...");

    // 1. Kategorileri Oluştur
    const catTechnical = await prisma.blogCategory.upsert({
        where: { slug: "teknik-bilgiler" },
        update: {},
        create: {
            slug: "teknik-bilgiler",
            nameTr: "Teknik Bilgiler",
            nameEn: "Technical Information",
            descriptionTr: "Yay üretimi, malzeme bilimi ve teknik detaylar hakkında uzman makaleleri.",
            descriptionEn: "Expert articles about spring manufacturing, material science and technical details.",
            metaTitleTr: "Teknik Bilgiler - Yay Üretimi Blogu",
            metaDescriptionTr: "Yay seçimi, üretim standartları ve teknik rehberler.",
            metaTitleEn: "Technical Information - Spring Manufacturing Blog",
            metaDescriptionEn: "Spring selection, manufacturing standards and technical guides.",
        },
    });

    const catNews = await prisma.blogCategory.upsert({
        where: { slug: "sektorel-haberler" },
        update: {},
        create: {
            slug: "sektorel-haberler",
            nameTr: "Sektörel Haberler",
            nameEn: "Industry News",
            descriptionTr: "Aktif Yay ve sektörden güncel haberler, duyurular.",
            descriptionEn: "Latest news and announcements from Aktif Yay and the industry.",
            metaTitleTr: "Sektörel Haberler - Aktif Yay",
            metaDescriptionTr: "Yay sektöründeki son gelişmeler ve firma haberleri.",
        },
    });

    console.log("✅ Categories created/verified.");

    // 2. Blog Yazılarını Oluştur

    // Post 1: Kalite Kontrol
    await prisma.blogPost.upsert({
        where: { slug: "endustriyel-yay-uretiminde-kalite-kontrolun-onemi" },
        update: {},
        create: {
            slug: "endustriyel-yay-uretiminde-kalite-kontrolun-onemi",
            categoryId: catTechnical.id,

            titleTr: "Endüstriyel Yay Üretiminde Kalite Kontrolün Önemi",
            descriptionTr: "Yay üretiminde mikroskobik çatlaklardan yorulma testlerine kadar kalite kontrol süreçlerinin ürün ömrüne etkisi.",
            contentTr: `
        <h2>Kalite Neden Vazgeçilmezdir?</h2>
        <p>Endüstriyel yaylar, otomotivden savunma sanayine kadar kritik makine parçalarının çalışmasını sağlayan görünmez kahramanlardır. Bir yayın kalitesi, sadece ölçüsel doğruluğu ile değil, malzeme yapısı ve ısıl işlem süreçlerinin başarısı ile ölçülür.</p>
        
        <h3>1. Malzeme Seçimi</h3>
        <p>Kaliteli bir yay, doğru hammadde ile başlar. Karbon çelikleri, paslanmaz çelikler veya özel alaşımlar... Kullanılacak alanın sıcaklığığı, korozyon riski ve yük miktarı malzeme seçimini belirler.</p>
        
        <h3>2. Isıl İşlem ve Menevişleme</h3>
        <p>Yayların esneklik kazanması ve kırılganlığının giderilmesi için ısıl işlem hayati önem taşır. Yanlış sıcaklık veya süre, yayın ömrünü %80 oranında azaltabilir.</p>
        
        <h3>3. Yük ve Ömür Testleri</h3>
        <p>Aktif Yay olarak, ürettiğimiz her partiyi bilgisayar destekli test cihazlarında (Load Testing) kontrolden geçiriyoruz. Yayların belirlenen yük altında ne kadar esnediği (yay katsayısı) ve kaç bin çevrimden sonra yorulma gösterdiği raporlanır.</p>
        
        <p>Sonuç olarak, kalite kontrol bir maliyet değil, müşteri memnuniyetinin ve güvenliğin garantisidir.</p>
      `,

            titleEn: "Importance of Quality Control in Industrial Spring Manufacturing",
            descriptionEn: "The impact of quality control processes, from microscopic cracks to fatigue tests, on product life in spring manufacturing.",
            contentEn: `
        <h2>Why Quality is Indispensable?</h2>
        <p>Industrial springs are the invisible heroes ensuring the operation of critical machinery parts from automotive to defense industries. The quality of a spring is measured not only by dimensional accuracy but also by the success of material structure and heat treatment processes.</p>
        
        <h3>1. Material Selection</h3>
        <p>A quality spring starts with the right raw material. Carbon steels, stainless steels, or special alloys... The temperature of the usage area, corrosion risk, and load amount determine the material selection.</p>
        
        <h3>2. Heat Treatment and Tempering</h3>
        <p>Heat treatment is vital for springs to gain elasticity and remove brittleness. Incorrect temperature or duration can reduce spring life by 80%.</p>
        
        <h3>3. Load and Life Cycle Tests</h3>
        <p>As Aktif Yay, we check every batch we produce in computer-aided test devices (Load Testing). It is reported how much the springs stretch under the specified load (spring rate) and after how many thousand cycles they show fatigue.</p>
        
        <p>In conclusion, quality control is not a cost, but a guarantee of customer satisfaction and safety.</p>
      `,

            keywordsTr: "yay üretimi, kalite kontrol, load test, ısıl işlem, yay malzemesi",
            keywordsEn: "spring manufacturing, quality control, load test, heat treatment, spring material",

            metaTitleTr: "Yay Üretiminde Kalite Kontrol - Aktif Yay",
            metaDescriptionTr: "Endüstriyel yay üretiminde kalite standartları ve test süreçleri hakkında teknik inceleme.",

            robots: "index, follow",
            isPublished: true,
            publishedAt: new Date(),
            readingTime: 4,
            viewCount: 125,
            authorName: "Mühendislik Ekibi",

            // Placeholder image URL (You can define a real one later)
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070",
            imageAltTr: "Laboratuvar ortamında yay kalite kontrol testi",
            imageAltEn: "Spring quality control test in laboratory environment",
        }
    });

    // Post 2: Doğru Yay Seçimi
    await prisma.blogPost.upsert({
        where: { slug: "dogru-yay-secimi-nasil-yapilir" },
        update: {},
        create: {
            slug: "dogru-yay-secimi-nasil-yapilir",
            categoryId: catTechnical.id,

            titleTr: "Doğru Yay Seçimi Nasıl Yapılır? Kapsamlı Rehber",
            descriptionTr: "Projeniz için basma yayı mı, çekme yayı mı lazım? Yay hesaplamalarında dikkat edilmesi gereken temel parametreler.",
            contentTr: `
        <h2>Hangi Yay Tipine İhtiyacınız Var?</h2>
        <p>Mühendislik projelerinde doğru yay seçimi, mekanizmanın verimli çalışması için ilk adımdır. İşte yay tiplerine göre seçim kriterleri:</p>
        
        <ul>
            <li><strong>Basma Yaylar (Compression Springs):</strong> Sıkıştırma kuvvetine direnç gösterir. En yaygın kullanılan tiptir. Amortisörler, valfler ve düğmelerde kullanılır.</li>
            <li><strong>Çekme Yaylar (Extension Springs):</strong> Uzamaya karşı direnç gösterir. Uçlarında kancalar bulunur. Trambolinler ve garaj kapılarında görülür.</li>
            <li><strong>Kurma Yaylar (Torsion Springs):</strong> Dönme kuvveti (tork) depolar. Mandallar ve kapı kolları örnektir.</li>
        </ul>

        <h3>Dikkat Edilmesi Gereken Parametreler</h3>
        <ol>
            <li><strong>Yay Çapı (D):</strong> Yayın dış çapı, montaj yapılacak yuvaya uygun olmalıdır.</li>
            <li><strong>Tel Çapı (d):</strong> Tel kalınlığı arttıkça yayın sertliği (katsayısı) artar.</li>
            <li><strong>Serbest Boy (L0):</strong> Yayın yüksüz haldeki boyudur.</li>
        </ol>

        <p>Aktif Yay olarak özel projeleriniz için teknik çizim desteği sunuyor ve en uygun yayı tasarlamanıza yardımcı oluyoruz.</p>
      `,

            titleEn: "How to Choose the Right Spring? Comprehensive Guide",
            descriptionEn: "Do you need a compression spring or an extension spring for your project? Basic parameters to consider in spring calculations.",
            contentEn: `
        <h2>Which Spring Type Do You Need?</h2>
        <p>Choosing the right spring in engineering projects is the first step for the efficient operation of the mechanism. Here are selection criteria according to spring types:</p>
        
        <ul>
            <li><strong>Compression Springs:</strong> Resist compressive force. They are the most common type. Used in shock absorbers, valves, and buttons.</li>
            <li><strong>Extension Springs:</strong> Resist stretching. They have hooks at their ends. Seen in trampolines and garage doors.</li>
            <li><strong>Torsion Springs:</strong> Store rotational force (torque). Latches and door handles are examples.</li>
        </ul>

        <h3>Parameters to Consider</h3>
        <ol>
            <li><strong>Spring Diameter (D):</strong> The outer diameter of the spring must be suitable for the mounting slot.</li>
            <li><strong>Wire Diameter (d):</strong> As wire thickness increases, the stiffness (rate) of the spring increases.</li>
            <li><strong>Free Length (L0):</strong> The length of the spring without load.</li>
        </ol>

        <p>As Aktif Yay, we offer technical drawing support for your special projects and help you design the most suitable spring.</p>
      `,

            keywordsTr: "yay seçimi, basma yay, çekme yay, yay hesabı",
            keywordsEn: "spring selection, compression spring, extension spring, spring calculation",

            metaTitleTr: "Yay Seçim Rehberi - Aktif Yay",
            metaDescriptionTr: "Basma, çekme ve kurma yayları arasındaki farklar ve seçim kriterleri.",

            robots: "index, follow",
            isPublished: true,
            publishedAt: new Date(Date.now() - 86400000), // Dün
            readingTime: 3,
            viewCount: 84,
            authorName: "Hasan Durmuş", // Veya user'dan gelen isim

            image: "https://images.unsplash.com/photo-1542662565-7e5b6c239462?auto=format&fit=crop&q=80&w=2670",
            imageAltTr: "Çeşitli endüstriyel metal yaylar",
            imageAltEn: "Various industrial metal springs",
        }
    });

    console.log("✅ Blog posts created/verified.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
