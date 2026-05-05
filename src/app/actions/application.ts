'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createApplication(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Oturum açmanız gerekiyor.' }
  }

  const university = formData.get('university') as string
  const gpaStr = formData.get('gpa') as string

  if (!university || !gpaStr) {
    return { error: 'Lütfen tüm alanları doldurun.' }
  }

  const gpa = parseFloat(gpaStr.replace(',', '.'))
  if (isNaN(gpa) || gpa < 0 || gpa > 4) {
    return { error: 'Lütfen geçerli bir not ortalaması girin (0.00 - 4.00).' }
  }

  const { data, error } = await supabase
    .from('applications')
    .insert({
      user_id: user.id,
      university_name: university,
      gpa,
      status: 'pending',
    })
    .select()
    .single()

  if (error) {
    console.error('Application Error:', error)
    return { error: `Başvuru kaydedilirken bir hata oluştu: ${error.message}` }
  }

  revalidatePath('/basvuru')
  return { success: true, applicationId: data.id }
}

export async function uploadDocument(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Oturum açmanız gerekiyor.' }
  }

  const applicationId = formData.get('applicationId') as string
  const file = formData.get('file') as File
  const docType = formData.get('docType') as string

  if (!applicationId || !file || !docType) {
    return { error: 'Eksik bilgi: Uygulama ID, dosya veya evrak türü bulunamadı.' }
  }

  // 1. Upload file to storage
  const fileExt = file.name.split('.').pop()
  const fileName = `${docType}_${Date.now()}.${fileExt}`
  const filePath = `${user.id}/${fileName}`

  const { error: uploadError } = await supabase.storage
    .from('scholarship-docs')
    .upload(filePath, file)

  if (uploadError) {
    console.error('Upload Error:', uploadError)
    return { error: `Dosya yüklenirken bir hata oluştu: ${uploadError.message}` }
  }

  // 2. Save document record to database
  const { error: dbError } = await supabase.from('documents').insert({
    application_id: applicationId,
    file_path: filePath,
    doc_type: docType,
  })

  if (dbError) {
    console.error('DB Insert Error:', dbError)
    return { error: `Dosya bilgisi veritabanına kaydedilemedi: ${dbError.message}` }
  }

  revalidatePath('/basvuru')
  return { success: true }
}
