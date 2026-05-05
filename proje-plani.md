1. Proje Özeti
Bu uygulama, bir derneğin kurumsal web sitesini, öğrencilerin burs başvurusu yapabileceği bir portalı ve yöneticilerin bu başvuruları değerlendirebileceği gelişmiş bir admin panelini kapsar.

Ana Hedef: Kullanıcı dostu bir başvuru süreci ve güvenli bir evrak yönetim sistemi oluşturmak.

2. Teknoloji Yığını (Tech Stack)
Frontend: Next.js 14+ (App Router), TypeScript, Tailwind CSS.

Backend/Veritabanı: Supabase (PostgreSQL).

Kimlik Doğrulama: Supabase Auth.

Dosya Depolama: Supabase Storage (Öğrenci evrakları için private bucket).

Form Yönetimi: React Hook Form + Zod (Validasyon için).

UI Kütüphanesi: Shadcn UI (Hızlı ve modern arayüz için).

3. Veritabanı Şeması (Supabase SQL)
Aşağıdaki tabloların ve ilişkilerin kurulması gerekmektedir:

profiles: Kullanıcı rolleri ve temel bilgiler.

id (uuid, references auth.users)

full_name (text)

role (text: 'admin' veya 'student')

applications: Burs başvuru detayları.

id (uuid)

user_id (uuid, references profiles)

university (text)

gpa (numeric)

status (text: 'pending', 'approved', 'rejected')

documents: Yüklenen evrakların meta verileri.

id (uuid)

application_id (uuid, references applications)

file_path (text)

doc_type (text: 'transkript', 'kimlik', 'ogrenci_belgesi')

4. Uygulama Aşamaları (Antigravity İçin Adımlar)
Adım 1: Kurulum ve Bağlantı
Next.js projesini başlat ve Tailwind CSS ayarlarını yap.

@supabase/supabase-js kurulumunu yap ve .env.local yapılandırmasını tamamla.

Adım 2: Burs Başvuru Portalı (Öğrenci Tarafı)
Kayıt/Giriş: Supabase Auth kullanarak güvenli giriş mekanizması kur.

Başvuru Formu: Öğrencinin akademik bilgilerini alacak bir form oluştur.

Evrak Yükleme: Sürükle-bırak destekli, dosyaları direkt Supabase Storage scholarship-docs klasörüne yükleyen bileşen tasarla.

Adım 3: Admin Paneli (Yönetici Tarafı)
Başvuru Listesi: Tüm başvuruları durumlarına göre filtreleyebilen bir tablo yap.

Evrak İnceleme: Adminin yüklenen PDF ve resimleri güvenli linkler (Signed URLs) üzerinden görüntülemesini sağla.

Karar Mekanizması: Başvuruları tek tıkla onaylayan veya reddeden butonlar ekle.

Adım 4: Kurumsal Web Sitesi
Dernek hakkında bilgi veren modern bir ana sayfa tasarla.

Duyurular ve iletişim formu ekle.

5. Güvenlik Kuralları (RLS)
Öğrenciler sadece kendi başvurularını görebilmeli ve düzenleyebilmeli.

Adminler tüm verilere ve dosyalara tam erişim yetkisine sahip olmalı.