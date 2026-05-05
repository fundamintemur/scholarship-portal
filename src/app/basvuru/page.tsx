import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import BasvuruFormu from './_components/BasvuruFormu'
import EvrakYukleme from './_components/EvrakYukleme'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { logout } from '@/app/actions/auth'

export default async function BasvuruPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/giris')
  }

  // Fetch application
  const { data: application } = await supabase
    .from('applications')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle()

  // Fetch documents if application exists
  let documents = []
  if (application) {
    const { data: docs } = await supabase
      .from('documents')
      .select('*')
      .eq('application_id', application.id)
      .order('created_at', { ascending: false })
    
    if (docs) documents = docs
  }

  return (
    <div className="min-h-screen bg-[#fafafa] relative overflow-hidden">
       {/* Background blobs */}
       <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/5 rounded-full blur-[120px]" />
       <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-500/5 rounded-full blur-[120px]" />

      <div className="max-w-6xl mx-auto px-4 py-8 md:p-12 space-y-8 md:space-y-12 relative">
        
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 glass border-white/50 p-6 md:p-8 rounded-[24px] md:rounded-[32px] shadow-sm">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Öğrenci Paneli</h1>
            <p className="text-gray-500 font-medium">Hoş geldin, <span className="text-indigo-600 font-bold">{user.user_metadata?.full_name}</span></p>
          </div>
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center text-white text-xl font-bold shadow-lg">
                {user.user_metadata?.full_name?.[0] || 'U'}
             </div>
             <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-gray-900 leading-none mb-1">{user.user_metadata?.full_name}</div>
                <form action={logout}>
                   <button type="submit" className="text-xs font-black text-red-500 uppercase tracking-widest hover:text-red-600 transition-colors cursor-pointer">
                      Çıkış Yap
                   </button>
                </form>
             </div>
          </div>
        </header>

        {!application ? (
          <div className="max-w-3xl mx-auto w-full animate-slide-up">
            <BasvuruFormu />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
            <div className="lg:col-span-7 space-y-8">
              <Card className="rounded-[24px] md:rounded-[32px] border-none shadow-[0_20px_40px_-12px_rgba(0,0,0,0.05)] bg-white/70 backdrop-blur-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-bold">Başvuru Bilgileri</CardTitle>
                  <CardDescription className="font-medium">Akademik geçmişiniz ve güncel durumunuz.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 md:p-6 rounded-[20px] md:rounded-3xl bg-gray-50/50 border border-gray-100 flex flex-col gap-2">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Durum</span>
                        <div className="flex items-center gap-2">
                           <div className={`w-2 h-2 rounded-full ${
                             application.status === 'pending' ? 'bg-yellow-500 animate-pulse' :
                             application.status === 'approved' ? 'bg-green-500' : 'bg-red-500'
                           }`} />
                           <span className="text-lg font-bold text-gray-900 capitalize">
                             {application.status === 'pending' ? 'Bekliyor' : application.status === 'approved' ? 'Onaylandı' : 'Reddedildi'}
                           </span>
                        </div>
                     </div>
                     <div className="p-4 md:p-6 rounded-[20px] md:rounded-3xl bg-gray-50/50 border border-gray-100 flex flex-col gap-2">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">GPA</span>
                        <span className="text-2xl font-black text-indigo-600">{application.gpa.toFixed(2)}</span>
                     </div>
                  </div>
                  <div className="p-4 md:p-6 rounded-[20px] md:rounded-3xl bg-gray-50/50 border border-gray-100 flex flex-col gap-2">
                     <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Üniversite</span>
                     <span className="text-lg font-bold text-gray-900">{application.university_name}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[24px] md:rounded-[32px] border-none shadow-[0_20px_40px_-12px_rgba(0,0,0,0.05)] bg-white/70 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Yüklenen Evraklar</CardTitle>
                  <CardDescription className="font-medium">Sisteme başarıyla iletilen belgeler.</CardDescription>
                </CardHeader>
                <CardContent>
                  {documents.length === 0 ? (
                    <div className="text-center py-12 space-y-4">
                       <div className="text-5xl">📁</div>
                       <p className="text-gray-400 font-medium italic">Henüz evrak yüklemediniz.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {documents.map((doc) => (
                        <div key={doc.id} className="flex justify-between items-center p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-indigo-100 transition-colors group">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                                📄
                             </div>
                             <span className="text-base font-bold text-gray-700 capitalize">{doc.doc_type.replace('_', ' ')}</span>
                          </div>
                          <div className="text-right">
                             <span className="text-xs font-bold text-gray-400 block tracking-wider">{new Date(doc.created_at).toLocaleDateString('tr-TR')}</span>
                             <span className="text-[10px] font-black text-green-500 uppercase tracking-tighter">Onaylandı</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-5">
              <EvrakYukleme applicationId={application.id} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
