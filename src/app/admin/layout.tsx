import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { logout } from '@/app/actions/auth'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/giris')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    redirect('/basvuru')
  }

  return (
    <div className="min-h-screen bg-[#fafafa] relative overflow-hidden flex flex-col">
       {/* Background blobs */}
       <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/5 rounded-full blur-[120px]" />
       <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-500/5 rounded-full blur-[120px]" />

      <header className="bg-slate-900 text-white shadow-2xl z-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center text-white text-xl font-bold">
                A
             </div>
             <div className="font-extrabold text-2xl tracking-tighter uppercase">
               Admin<span className="text-indigo-400">Portal</span>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-white leading-none mb-1">{user.user_metadata?.full_name}</div>
                <form action={logout}>
                   <button type="submit" className="text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:text-indigo-300 transition-colors cursor-pointer">
                      Çıkış Yap
                   </button>
                </form>
             </div>
             <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-indigo-400">
                {user.user_metadata?.full_name?.[0] || 'A'}
             </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 animate-fade-in">
        {children}
      </main>
    </div>
  )
}
