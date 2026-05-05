'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createApplication } from '@/app/actions/application'

export default function BasvuruFormu() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)
    
    const formData = new FormData(event.currentTarget)
    const result = await createApplication(formData)
    
    if (result?.error) {
      setError(result.error)
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto space-y-10 bg-white/70 backdrop-blur-xl p-6 sm:p-10 rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-white">
      <div className="text-center space-y-3">
        <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center text-3xl shadow-lg mx-auto mb-6">
           🎓
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
          Akademik Bilgiler
        </h2>
        <p className="text-gray-500 font-medium">
          Burs değerlendirmesi için güncel bilgilerinizi girin.
        </p>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit}>
        {error && (
          <div className="rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-600 border border-red-100 animate-shake">
            {error}
          </div>
        )}
        
        <div className="space-y-6">
          <div className="space-y-2.5">
            <Label htmlFor="university" className="text-sm font-bold text-gray-700 ml-1">Üniversite Adı</Label>
            <Input
              id="university"
              name="university"
              type="text"
              required
              placeholder="Örn: Orta Doğu Teknik Üniversitesi"
              className="h-14 px-5 rounded-2xl bg-gray-50/50 border-gray-200 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all text-lg"
            />
          </div>
          
          <div className="space-y-2.5">
            <div className="flex justify-between items-center ml-1">
               <Label htmlFor="gpa" className="text-sm font-bold text-gray-700">Not Ortalaması (GPA)</Label>
               <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Maks 4.00</span>
            </div>
            <Input
              id="gpa"
              name="gpa"
              type="text"
              required
              placeholder="Örn: 3.50"
              className="h-14 px-5 rounded-2xl bg-gray-50/50 border-gray-200 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all text-lg font-mono"
            />
            <p className="text-xs font-medium text-gray-400 ml-1 italic">Nokta (.) kullanarak giriniz.</p>
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full h-16 text-lg font-bold gradient-primary shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all border-none rounded-2xl"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Kaydediliyor...
            </div>
          ) : 'Kaydet ve İlerle'}
        </Button>
      </form>
    </div>
  )
}
