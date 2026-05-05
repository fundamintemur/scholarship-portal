'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { login } from '@/app/actions/auth'
import Link from 'next/link'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)
    
    const formData = new FormData(event.currentTarget)
    const result = await login(formData)
    
    if (result?.error) {
      setError(result.error)
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafafa] relative overflow-hidden p-4">
      {/* Background blobs */}
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-500/5 rounded-full blur-[120px]" />

      <div className="w-full max-w-md space-y-10 relative">
        <div className="text-center space-y-4">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <span className="font-bold text-2xl tracking-tight text-gray-900">
              Dernek<span className="text-indigo-600">Burs</span>
            </span>
          </Link>
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Tekrar Hoş Geldiniz
            </h2>
            <p className="text-gray-500 font-medium">
              Burs başvuru portalına erişmek için giriş yapın.
            </p>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-xl p-6 sm:p-10 rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-white">
          <form className="space-y-8" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-600 border border-red-100 animate-shake">
                {error}
              </div>
            )}
            
            <div className="space-y-6">
              <div className="space-y-2.5">
                <Label htmlFor="email" className="text-sm font-bold text-gray-700 ml-1">E-posta Adresi</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="ornek@ogrenci.edu.tr"
                  className="h-14 px-5 rounded-2xl bg-gray-50/50 border-gray-200 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all text-lg"
                />
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between ml-1">
                  <Label htmlFor="password" title="Şifre" className="text-sm font-bold text-gray-700">Şifre</Label>
                  <Link href="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-500">Unuttun mu?</Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  className="h-14 px-5 rounded-2xl bg-gray-50/50 border-gray-200 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all text-lg"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 text-lg font-bold gradient-primary shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all border-none rounded-2xl"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Giriş Yapılıyor...
                </div>
              ) : 'Giriş Yap'}
            </Button>
            
            <p className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest pt-2">
              Veya
            </p>

            <p className="text-center text-gray-500 font-medium">
              Henüz hesabınız yok mu?{' '}
              <Link href="/kayit" className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors">
                Kayıt Olun
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
