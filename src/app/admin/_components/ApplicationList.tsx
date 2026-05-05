'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { updateApplicationStatus, getSignedDocumentUrl } from '@/app/actions/admin'

type Document = {
  id: string
  doc_type: string
  file_path: string
  created_at: string
}

type Application = {
  id: string
  university_name: string
  gpa: number
  status: string
  created_at: string
  profiles: { full_name: string }
  documents: Document[]
}

export default function ApplicationList({
  initialApplications,
  initialStatus,
}: {
  initialApplications: Application[]
  initialStatus: string
}) {
  const router = useRouter()
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const handleStatusChange = (value: string | null) => {
    if (value) {
      router.push(`/admin?status=${value}`)
    }
  }

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setLoadingId(id)
    const result = await updateApplicationStatus(id, newStatus)
    if (!result?.error) {
      router.refresh()
    } else {
      alert(result.error)
    }
    setLoadingId(null)
  }

  const handleViewDocument = async (filePath: string) => {
    const result = await getSignedDocumentUrl(filePath)
    if (result?.signedUrl) {
      window.open(result.signedUrl, '_blank')
    } else {
      alert('Belge açılamadı: ' + (result?.error || 'Bilinmeyen hata'))
    }
  }

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-[24px] sm:rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] border border-white overflow-hidden">
      <div className="p-6 sm:p-8 border-b border-gray-100/50 flex flex-col sm:flex-row items-center justify-between gap-6 bg-white/40">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              🔍
           </div>
           <h3 className="text-xl font-bold text-gray-900">Filtreleme Seçenekleri</h3>
        </div>
        <div className="w-full sm:w-64">
          <Select value={initialStatus} onValueChange={handleStatusChange}>
            <SelectTrigger className="h-12 rounded-2xl bg-white/50 border-gray-200 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold">
              <SelectValue placeholder="Durum seçin" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl shadow-2xl border-gray-100">
              <SelectItem value="all" className="rounded-xl py-3 px-4">Tüm Başvurular</SelectItem>
              <SelectItem value="pending" className="rounded-xl py-3 px-4">Bekleyenler</SelectItem>
              <SelectItem value="approved" className="rounded-xl py-3 px-4">Onaylananlar</SelectItem>
              <SelectItem value="rejected" className="rounded-xl py-3 px-4">Reddedilenler</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-none hover:bg-transparent">
              <TableHead className="px-4 sm:px-8 py-4 sm:py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Tarih</TableHead>
              <TableHead className="px-4 sm:px-8 py-4 sm:py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Öğrenci</TableHead>
              <TableHead className="px-4 sm:px-8 py-4 sm:py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Üniversite</TableHead>
              <TableHead className="px-4 sm:px-8 py-4 sm:py-6 text-xs font-black text-gray-400 uppercase tracking-widest text-center">GPA</TableHead>
              <TableHead className="px-4 sm:px-8 py-4 sm:py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Evraklar</TableHead>
              <TableHead className="px-4 sm:px-8 py-4 sm:py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Durum</TableHead>
              <TableHead className="px-4 sm:px-8 py-4 sm:py-6 text-xs font-black text-gray-400 uppercase tracking-widest text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialApplications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-20">
                   <div className="space-y-4">
                      <div className="text-6xl">📭</div>
                      <p className="text-xl font-bold text-gray-400">Henüz başvuru bulunmuyor.</p>
                   </div>
                </TableCell>
              </TableRow>
            ) : (
              initialApplications.map((app) => (
                <TableRow key={app.id} className="group border-b border-gray-50 hover:bg-indigo-50/20 transition-colors">
                  <TableCell className="px-4 sm:px-8 py-4 sm:py-6">
                    <span className="text-sm font-bold text-gray-500 whitespace-nowrap">
                      {new Date(app.created_at).toLocaleDateString('tr-TR')}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 sm:px-8 py-4 sm:py-6">
                     <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-indigo-500/20">
                           {app.profiles?.full_name?.[0]}
                        </div>
                        <span className="text-base font-extrabold text-gray-900 whitespace-nowrap">{app.profiles?.full_name}</span>
                     </div>
                  </TableCell>
                  <TableCell className="px-4 sm:px-8 py-4 sm:py-6">
                     <span className="text-sm font-bold text-gray-600 max-w-[200px] block truncate" title={app.university_name}>
                        {app.university_name}
                     </span>
                  </TableCell>
                  <TableCell className="px-4 sm:px-8 py-4 sm:py-6 text-center">
                     <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gray-50 text-indigo-600 font-black text-sm border border-gray-100 group-hover:bg-white group-hover:shadow-md transition-all">
                        {app.gpa.toFixed(2)}
                     </span>
                  </TableCell>
                  <TableCell className="px-4 sm:px-8 py-4 sm:py-6">
                    {app.documents.length === 0 ? (
                      <span className="text-xs font-bold text-gray-300 uppercase">Yüklenmedi</span>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {app.documents.map((doc) => (
                          <button
                            key={doc.id}
                            onClick={() => handleViewDocument(doc.file_path)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:border-indigo-600 hover:text-indigo-600 hover:shadow-lg transition-all"
                          >
                             📄 {doc.doc_type.replace('_', ' ')}
                          </button>
                        ))}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="px-8 py-6">
                    <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest ${
                      app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      app.status === 'approved' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        app.status === 'pending' ? 'bg-yellow-500 animate-pulse' :
                        app.status === 'approved' ? 'bg-green-500' : 'bg-red-500'
                      }`} />
                      {app.status === 'pending' ? 'Bekliyor' : app.status === 'approved' ? 'Onaylandı' : 'Reddedildi'}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 sm:px-8 py-4 sm:py-6 text-right">
                    {app.status === 'pending' ? (
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          className="bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold h-10 px-4 border-none shadow-lg shadow-green-500/20 active:scale-95 transition-all"
                          disabled={loadingId === app.id}
                          onClick={() => handleUpdateStatus(app.id, 'approved')}
                        >
                          Onayla
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="rounded-xl font-bold h-10 px-4 shadow-lg shadow-red-500/20 active:scale-95 transition-all"
                          disabled={loadingId === app.id}
                          onClick={() => handleUpdateStatus(app.id, 'rejected')}
                        >
                          Reddet
                        </Button>
                      </div>
                    ) : (
                      <span className="text-xs font-black text-gray-300 uppercase tracking-widest italic">İşlem Tamam</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
