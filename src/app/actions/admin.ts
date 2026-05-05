'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

// Helper to check if current user is admin
async function checkAdmin(supabase: any) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  return profile?.role === 'admin'
}

export async function getApplications(statusFilter?: string) {
  const supabase = await createClient()
  if (!(await checkAdmin(supabase))) {
    return { error: 'Yetkisiz erişim' }
  }

  let query = supabase
    .from('applications')
    .select(`
      *,
      profiles (full_name),
      documents (*)
    `)
    .order('created_at', { ascending: false })

  if (statusFilter && statusFilter !== 'all') {
    query = query.eq('status', statusFilter)
  }

  const { data, error } = await query

  if (error) {
    console.error('Admin Fetch Error:', error)
    return { error: 'Başvurular alınamadı.' }
  }

  return { data }
}

export async function updateApplicationStatus(id: string, newStatus: string) {
  const supabase = await createClient()
  if (!(await checkAdmin(supabase))) {
    return { error: 'Yetkisiz erişim' }
  }

  const { error } = await supabase
    .from('applications')
    .update({ status: newStatus })
    .eq('id', id)

  if (error) {
    console.error('Admin Update Error:', error)
    return { error: 'Durum güncellenemedi.' }
  }

  revalidatePath('/admin')
  return { success: true }
}

export async function getSignedDocumentUrl(filePath: string) {
  const supabase = await createClient()
  if (!(await checkAdmin(supabase))) {
    return { error: 'Yetkisiz erişim' }
  }

  const { data, error } = await supabase.storage
    .from('scholarship-docs')
    .createSignedUrl(filePath, 60) // valid for 60 seconds

  if (error) {
    console.error('Signed URL Error:', error)
    return { error: 'Dosya linki oluşturulamadı.' }
  }

  return { signedUrl: data.signedUrl }
}
