import { getApplications } from '@/app/actions/admin'
import ApplicationList from './_components/ApplicationList'

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { status?: string }
}) {
  const statusFilter = searchParams.status || 'all'
  const { data: applications, error } = await getApplications(statusFilter)

  if (error) {
    return (
      <div className="p-6 bg-red-50 text-red-600 rounded-3xl border border-red-100 font-bold flex items-center gap-3">
        <span>⚠️</span> {error}
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
           <h1 className="text-4xl font-black text-gray-900 tracking-tight">Öğrenci Başvuruları</h1>
           <p className="text-gray-500 font-medium">Toplam {applications?.length || 0} başvuru listeleniyor.</p>
        </div>
        <div className="flex gap-3">
           {/* Future export or action buttons */}
        </div>
      </div>
      
      <div className="animate-slide-up">
        <ApplicationList initialApplications={applications || []} initialStatus={statusFilter} />
      </div>
    </div>
  )
}
