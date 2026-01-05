import { Locale } from "./i18n";

export interface Dictionary {
    // Site
    siteName: string;
    siteDescription: string;

    // Navigation
    nav: {
        home: string;
        about: string;
        products: string;
        industries: string;
        contact: string;
        quote: string;
        careers: string;
        references: string;
    };

    // Products
    products: {
        compressionSprings: string;
        extensionSprings: string;
        wireForms: string;
        torsionSprings: string;
        viewAll: string;
        requestQuote: string;
        usageAreas: string;
        technicalSpecs: string;
        faq: string;
    };

    // Industries
    industries: {
        automotive: string;
        defense: string;
        agriculture: string;
        furniture: string;
        appliances: string;
        medical: string;
        aviation: string;
        electronics: string;
        viewAll: string;
        solutions: string;
    };

    // Common
    common: {
        readMore: string;
        contactUs: string;
        getQuote: string;
        phone: string;
        email: string;
        address: string;
        yearsExperience: string;
        qualityAssurance: string;
        customProduction: string;
        fastDelivery: string;
    };

    // Forms
    forms: {
        name: string;
        email: string;
        phone: string;
        company: string;
        subject: string;
        message: string;
        submit: string;
        product: string;
        quantity: string;
        position: string;
        cv: string;
        sending: string;
        success: string;
        error: string;
    };

    // Footer
    footer: {
        quickLinks: string;
        contact: string;
        followUs: string;
        rights: string;
        careers: string;
        privacyPolicy: string;
        cookiePolicy: string;
        termsOfUse: string;
        kvkk: string;
    };

    // Careers
    careers: {
        title: string;
        description: string;
        formTitle: string;
    };

    // SEO
    seo: {
        homeTitle: string;
        homeDescription: string;
    };
}

const dictionaries: Record<Locale, Dictionary> = {
    tr: {
        siteName: "Aktif Yay",
        siteDescription: "30 yıllık tecrübe ile endüstriyel yay üretimi. Basma, çekme, kurma ve tel form yaylar.",

        nav: {
            home: "Ana Sayfa",
            about: "Hakkımızda",
            products: "Ürünler",
            industries: "Sektörler",
            contact: "İletişim",
            quote: "Teklif Al",
            careers: "Kariyer",
            references: "Referanslar",
        },

        products: {
            compressionSprings: "Basma Yaylar",
            extensionSprings: "Çekme Yaylar",
            wireForms: "Tel Form Yaylar",
            torsionSprings: "Kurma Yaylar",
            viewAll: "Tüm Ürünler",
            requestQuote: "Teklif İste",
            usageAreas: "Kullanım Alanları",
            technicalSpecs: "Teknik Özellikler",
            faq: "Sıkça Sorulan Sorular",
        },

        industries: {
            automotive: "Otomotiv",
            defense: "Savunma Sanayi",
            agriculture: "Tarım & Ziraat",
            furniture: "Mobilya",
            appliances: "Beyaz Eşya",
            medical: "Medikal",
            aviation: "Havacılık",
            electronics: "Elektrik & Elektronik",
            viewAll: "Tüm Sektörler",
            solutions: "Yay Çözümlerimiz",
        },

        common: {
            readMore: "Devamını Oku",
            contactUs: "Bize Ulaşın",
            getQuote: "Teklif Alın",
            phone: "Telefon",
            email: "E-posta",
            address: "Adres",
            yearsExperience: "Yıllık Tecrübe",
            qualityAssurance: "Kalite Güvencesi",
            customProduction: "Özel Üretim",
            fastDelivery: "Hızlı Teslimat",
        },

        forms: {
            name: "Adınız Soyadınız",
            email: "E-posta Adresiniz",
            phone: "Telefon Numaranız",
            company: "Firma Adı",
            subject: "Konu",
            message: "Mesajınız",
            submit: "Gönder",
            product: "Ürün",
            quantity: "Miktar",
            position: "Başvurulan Pozisyon",
            cv: "CV Yükle",
            sending: "Gönderiliyor...",
            success: "Mesajınız başarıyla gönderildi!",
            error: "Bir hata oluştu. Lütfen tekrar deneyin.",
        },

        footer: {
            quickLinks: "Hızlı Bağlantılar",
            contact: "İletişim Bilgileri",
            followUs: "Bizi Takip Edin",
            rights: "Tüm hakları saklıdır.",
            careers: "Kariyer",
            privacyPolicy: "Gizlilik Politikası",
            cookiePolicy: "Çerez Politikası",
            termsOfUse: "Kullanım Koşulları",
            kvkk: "KVKK Aydınlatma Metni",
        },

        careers: {
            title: "Kariyer",
            description: "Aktif Yay ailesine katılmak için aşağıdaki formu doldurarak başvurunuzu bize iletebilirsiniz.",
            formTitle: "İş Başvuru Formu",
        },

        seo: {
            homeTitle: "Aktif Yay | Konya Yay Üretimi - Basma, Çekme, Kurma Yay",
            homeDescription: "Konya'da 30 yıllık tecrübe ile endüstriyel yay üretimi. Basma yaylar, çekme yaylar, kurma yaylar ve tel form yaylar. ISO sertifikalı kaliteli üretim.",
        },
    },

    en: {
        siteName: "Aktif Yay",
        siteDescription: "Industrial spring manufacturing with 30 years of experience. Compression, extension, torsion and wire form springs.",

        nav: {
            home: "Home",
            about: "About Us",
            products: "Products",
            industries: "Industries",
            contact: "Contact",
            quote: "Get Quote",
            careers: "Careers",
            references: "References",
        },

        products: {
            compressionSprings: "Compression Springs",
            extensionSprings: "Extension Springs",
            wireForms: "Wire Form Springs",
            torsionSprings: "Torsion Springs",
            viewAll: "All Products",
            requestQuote: "Request Quote",
            usageAreas: "Usage Areas",
            technicalSpecs: "Technical Specifications",
            faq: "Frequently Asked Questions",
        },

        industries: {
            automotive: "Automotive",
            defense: "Defense Industry",
            agriculture: "Agriculture",
            furniture: "Furniture",
            appliances: "Home Appliances",
            medical: "Medical",
            aviation: "Aviation",
            electronics: "Electronics",
            viewAll: "All Industries",
            solutions: "Our Spring Solutions",
        },

        common: {
            readMore: "Read More",
            contactUs: "Contact Us",
            getQuote: "Get Quote",
            phone: "Phone",
            email: "Email",
            address: "Address",
            yearsExperience: "Years Experience",
            qualityAssurance: "Quality Assurance",
            customProduction: "Custom Production",
            fastDelivery: "Fast Delivery",
        },

        forms: {
            name: "Full Name",
            email: "Email Address",
            phone: "Phone Number",
            company: "Company Name",
            subject: "Subject",
            message: "Your Message",
            submit: "Submit",
            product: "Product",
            quantity: "Quantity",
            position: "Position Applied",
            cv: "Upload CV",
            sending: "Sending...",
            success: "Your message has been sent successfully!",
            error: "An error occurred. Please try again.",
        },

        footer: {
            quickLinks: "Quick Links",
            contact: "Contact Information",
            followUs: "Follow Us",
            rights: "All rights reserved.",
            careers: "Careers",
            privacyPolicy: "Privacy Policy",
            cookiePolicy: "Cookie Policy",
            termsOfUse: "Terms of Use",
            kvkk: "KVKK Clarification Text",
        },

        careers: {
            title: "Careers",
            description: "To join the Aktif Yay family, you can submit your application by filling out the form below.",
            formTitle: "Job Application Form",
        },

        seo: {
            homeTitle: "Aktif Yay | Spring Manufacturing in Turkey - Industrial Springs",
            homeDescription: "Industrial spring manufacturing with 30 years of experience in Turkey. Compression springs, extension springs, torsion springs and wire forms. ISO certified quality production.",
        },
    },
};

export function getDictionary(locale: Locale): Dictionary {
    return dictionaries[locale] || dictionaries.tr;
}
