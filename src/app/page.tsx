import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafafa] selection:bg-primary/20 antialiased overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-11 sm:h-11 gradient-primary rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 transform hover:scale-105 transition-transform cursor-pointer">
              <span className="text-white font-bold text-xl sm:text-2xl">D</span>
            </div>
            <span className="font-bold text-xl sm:text-2xl tracking-tight text-gray-900">
              Dernek<span className="text-indigo-600">Burs</span>
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/giris" className="hidden xs:block">
              <Button variant="ghost" className="font-semibold text-gray-600 hover:text-indigo-600 text-sm sm:text-base px-2 sm:px-4">Giriş Yap</Button>
            </Link>
            <Link href="/kayit">
              <Button className="gradient-primary font-semibold px-4 sm:px-8 h-9 sm:h-11 text-xs sm:text-base shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all border-none">
                Hemen Başvur
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-24 pb-16 lg:pt-52 lg:pb-40 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[radial-gradient(circle_at_center,_#4f46e508_0%,_transparent_70%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100/50 text-indigo-600 text-sm font-semibold shadow-sm animate-fade-in">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-600"></span>
                </span>
                2024-2025 Başvuruları Başladı
              </div>
              
              <h1 className="text-4xl xs:text-5xl sm:text-6xl lg:text-[84px] font-extrabold tracking-tighter text-gray-900 leading-[1.1] sm:leading-[1] animate-slide-up">
                Geleceğinizi <br className="hidden sm:block" />
                <span className="text-gradient">Birlikte İnşa Edelim</span>
              </h1>
              
              <p className="max-w-xl text-lg sm:text-xl lg:text-2xl text-gray-500 leading-relaxed mx-auto lg:mx-0 font-medium">
                Derneğimiz, akademik başarıyı ve sosyal sorumluluğu ödüllendiren vizyonuyla üniversite öğrencilerini destekliyor.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-5 pt-4">
                <Link href="/kayit" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto h-14 sm:h-16 px-8 sm:px-10 text-base sm:text-lg font-bold shadow-2xl shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all gradient-primary border-none">
                    Burs Başvurusu Yap
                  </Button>
                </Link>
                <Link href="/giris" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 sm:h-16 px-8 sm:px-10 text-base sm:text-lg font-bold bg-white/80 border-gray-200 hover:bg-gray-50 transition-all">
                    Öğrenci Girişi
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-3 items-center justify-center lg:justify-start gap-4 sm:gap-12 pt-12 border-t border-gray-200/60 mt-12 max-w-lg">
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">500+</div>
                  <div className="text-[10px] sm:text-sm font-semibold text-gray-400 uppercase tracking-widest">Bursiyer</div>
                </div>
                <div className="space-y-1 text-center sm:text-left border-x border-gray-200/80 px-4">
                  <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">₺10M</div>
                  <div className="text-[10px] sm:text-sm font-semibold text-gray-400 uppercase tracking-widest">Destek</div>
                </div>
                <div className="space-y-1 text-right sm:text-left">
                  <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">81</div>
                  <div className="text-[10px] sm:text-sm font-semibold text-gray-400 uppercase tracking-widest">Şehir</div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block relative group">
              <div className="relative z-10 w-full aspect-square rounded-[48px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(79,70,229,0.2)] bg-white/40 backdrop-blur-xl border border-white/60 p-12 flex flex-col items-center justify-center space-y-10 group-hover:scale-[1.01] transition-all duration-500">
                  <div className="relative">
                    <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                    <div className="relative w-32 h-32 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto transform -rotate-12 group-hover:rotate-0 transition-all duration-500">
                       <span className="text-6xl">🎓</span>
                    </div>
                  </div>
                  <div className="text-center space-y-4">
                    <h3 className="text-3xl font-bold text-gray-900 tracking-tight">Dijital Başvuru Deneyimi</h3>
                    <p className="text-gray-500 text-lg font-medium max-w-xs mx-auto">
                      Belgelerinizi saniyeler içinde yükleyin, süreci şeffaf bir şekilde takip edin.
                    </p>
                  </div>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent" />
                  <div className="flex gap-3">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-3 h-3 rounded-full bg-indigo-100 group-hover:bg-indigo-400 transition-colors duration-500" />
                    ))}
                  </div>
              </div>
              
              {/* Decorative Floating Elements */}
              <div className="absolute -top-12 -right-12 w-32 h-32 gradient-primary rounded-full blur-[60px] opacity-20" />
              <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-500 rounded-full blur-[60px] opacity-20" />
            </div>
          </div>
        </div>
      </main>

      {/* Feature Section */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Neden Bizimle Başvurmalısın?</h2>
            <p className="text-xl text-gray-500 font-medium">Başvuru sürecini sizin için en kolay ve şeffaf hale getirdik.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
            {[
              { icon: "🚀", title: "Hızlı Süreç", text: "Dakikalar içinde profilini oluştur ve evraklarını yükle.", color: "indigo" },
              { icon: "🛡️", title: "Güvenli Depolama", text: "Tüm verileriniz ve evraklarınız uçtan uca şifrelenmiş olarak saklanır.", color: "blue" },
              { icon: "📊", title: "Anlık Takip", text: "Başvurunuzun durumunu her an panelden kontrol edebilirsiniz.", color: "violet" }
            ].map((feature, i) => (
              <div key={i} className={`group p-6 sm:p-10 bg-gray-50/50 rounded-3xl border border-gray-100/80 hover:bg-white hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 cursor-pointer ${i === 2 ? 'sm:col-span-2 lg:col-span-1' : ''}`}>
                <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-${feature.color}-100 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl mb-6 sm:mb-8 group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-500 text-base sm:text-lg leading-relaxed font-medium">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-gray-100 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="flex items-center justify-center gap-3">
             <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">
              Dernek<span className="text-indigo-600">Burs</span>
            </span>
          </div>
          <p className="text-gray-400 font-medium">&copy; 2024 Dernek Burs Portalı. Geleceği birlikte inşa ediyoruz.</p>
          <div className="flex justify-center gap-6 text-gray-400">
             <Link href="#" className="hover:text-indigo-600 transition-colors">KVKK</Link>
             <Link href="#" className="hover:text-indigo-600 transition-colors">İletişim</Link>
             <Link href="#" className="hover:text-indigo-600 transition-colors">Hakkımızda</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
