# scholarship-portal
Next.js 15 ve Supabase ile geliştirilmiş, öğrencilerin burs başvurusu yapabileceği ve belgelerini yönetebileceği modern bir portal.


## Kullanılan Teknolojiler

- Next.js (App Router) ve React
- TypeScript
- Supabase (@supabase/supabase-js, @supabase/ssr)
- Tailwind CSS
- React Hook Form ve Zod (form ve doğrulama)
- shadcn / Base UI bileşenleri, Lucide React (ikonlar)

## Kurulum

1. Repoyu klonla:
   ```bash
   git clone https://github.com/fundamintemur/scholarship-portal.git
   cd scholarship-portal
   ```
2. Bağımlılıkları yükle:
   ```bash
   npm install
   ```
3. Proje kök dizininde `.env.local` dosyası oluştur ve kendi Supabase proje bilgilerini ekle (Supabase proje URL'si ve anon key).
4. Veritabanı şeması için `supabase/migrations` klasöründeki dosyaları Supabase projende çalıştır.
5. Geliştirme sunucusunu başlat:
   ```bash
   npm run dev
   ```
6. Tarayıcıda http://localhost:3000 adresini aç.
























