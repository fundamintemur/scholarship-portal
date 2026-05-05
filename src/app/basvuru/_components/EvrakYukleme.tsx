'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { uploadDocument } from '@/app/actions/application'

export default function EvrakYukleme({ applicationId }: { applicationId: string }) {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [docType, setDocType] = useState<string>('')
  const [isDragging, setIsDragging] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError('Lütfen bir dosya seçin.')
      return
    }
    if (!docType) {
      setError('Lütfen evrak türünü seçin.')
      return
    }

    setIsLoading(true)
    setError(null)
    
    const formData = new FormData()
    formData.append('applicationId', applicationId)
    formData.append('file', file)
    formData.append('docType', docType)

    const result = await uploadDocument(formData)
    
    if (result?.error) {
      setError(result.error)
      setIsLoading(false)
    } else {
      setFile(null)
      setDocType('')
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full bg-white/70 backdrop-blur-md p-6 sm:p-10 rounded-[32px] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.05)] border border-white">
      <div className="text-center space-y-3 mb-6 sm:mb-10">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Evrak Yükleme
        </h2>
        <p className="text-sm font-medium text-gray-500">
          Gerekli belgeleri güvenli bir şekilde yükleyin.
        </p>
      </div>

      <div className="space-y-8">
        {error && (
          <div className="rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-600 border border-red-100">
            {error}
          </div>
        )}

        <div className="space-y-2.5">
          <Label className="text-sm font-bold text-gray-700 ml-1">Evrak Türü</Label>
          <Select value={docType} onValueChange={(val) => val && setDocType(val)}>
            <SelectTrigger className="h-14 px-5 rounded-2xl bg-gray-50/50 border-gray-200 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all text-lg">
              <SelectValue placeholder="Evrak türünü seçiniz" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl shadow-xl border-gray-100">
              <SelectItem value="transkript" className="rounded-xl py-3 px-4">Transkript</SelectItem>
              <SelectItem value="kimlik" className="rounded-xl py-3 px-4">Kimlik Fotokopisi</SelectItem>
              <SelectItem value="ogrenci_belgesi" className="rounded-xl py-3 px-4">Öğrenci Belgesi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2.5">
          <Label className="text-sm font-bold text-gray-700 ml-1">Dosya Seçimi</Label>
          <div
            className={`mt-1 flex justify-center rounded-[24px] border-2 border-dashed px-4 sm:px-8 py-8 sm:py-12 transition-all duration-300 ${
              isDragging ? 'border-indigo-500 bg-indigo-500/5 scale-[1.02]' : 'border-gray-200 bg-gray-50/30 hover:bg-gray-50/80 hover:border-indigo-300'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto text-3xl">
                 {file ? '✅' : '📤'}
              </div>
              <div className="flex flex-col items-center text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 font-bold text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all active:scale-95"
                >
                  <span>Dosya Seç</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileSelect} ref={fileInputRef} />
                </label>
                <p className="mt-3 font-medium text-gray-400 italic">veya sürükleyip bırakın</p>
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest pt-2">
                PDF, PNG, JPG (Maks 5MB)
              </p>
              {file && (
                <div className="mt-4 px-4 py-3 bg-green-50 rounded-2xl text-sm text-green-700 font-bold border border-green-100 flex items-center justify-center gap-2 animate-bounce-in">
                  <span className="truncate max-w-[200px]">{file.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <Button 
          onClick={handleUpload}
          className="w-full h-16 text-lg font-bold gradient-primary shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all border-none rounded-2xl"
          disabled={isLoading || !file || !docType}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Yükleniyor...
            </div>
          ) : 'Evrakı Sisteme Yükle'}
        </Button>
      </div>
    </div>
  )
}
