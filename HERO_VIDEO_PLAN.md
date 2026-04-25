# Hero Video (Yerel Dosya) ve Admin Paneli Kontrol Planı

Bu plan, dışarıdan (Cloudflare) video çekmek yerine sitenizin kendi sunucusundaki (`public` klasöründeki) videoyu kullanmayı ve yönetim paneline bir "Video / Resim Slider" geçiş anahtarı eklemeyi kapsar.

## 1. Veritabanı Güncellemesi (Prisma)
- Mevcut `SiteSettings` modeline `useHeroVideo` adında bir Evet/Hayır (Boolean) alanı eklenecektir. Varsayılan olarak kapalı (`false`) gelecektir.
- Bu işlem için veritabanında şema güncellemesi (`npx prisma db push`) yapılacaktır.

## 2. Admin Paneli Güncellemesi (Ayarlar Sayfası)
- Yönetim panelindeki "Genel Ayarlar" veya "Ana Sayfa Ayarları" bölümüne yeni bir seçenek eklenecektir: **"Ana Sayfada Video Arka Plan Kullan"**.
- Bu seçenek açık (aktif) olduğunda sistem videoyu, kapalı olduğunda ise mevcut görsel slider'ı (eski banner) gösterecektir. Böylece videoda bir sorun hissederseniz tek tıkla eski sisteme dönebileceksiniz.

## 3. Önyüz (Frontend) Güncellemesi
- `src/components/sections/HeroVideo.tsx` adında yeni bir bileşen oluşturulacaktır. Bu bileşen doğrudan `public/hero.mp4` dosyasını `autoPlay`, `loop` ve `muted` olarak oynatacak ve üzerindeki yazıları/butonları barındıracaktır.
- `src/app/[lang]/page.tsx` dosyası güncellenecektir. Veritabanından gelen `useHeroVideo` ayarına bakılacak; eğer açıksa Video Hero, kapalıysa eski `HeroSlider` yüklenecektir.

## 4. Kullanıcı Tarafından Yapılacaklar (Şu an veya daha sonra)
- Hazırladığınız videonun ismini `hero.mp4` yapıp sitenizin `public` klasörünün içine atmanız yeterlidir (veya bana dosyanın nerede olduğunu söylerseniz ben atabilirim).
