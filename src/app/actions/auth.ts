'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const full_name = formData.get('full_name') as string

  if (!email || !password || !full_name) {
    return { error: 'Lütfen tüm alanları doldurun.' }
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: full_name,
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/basvuru') // Redirect to dashboard or application portal after signup
}

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Lütfen tüm alanları doldurun.' }
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    // If it's an unconfirmed email, provide a specific Turkish message
    if (error.message.includes('Email not confirmed')) {
      return { error: 'E-posta adresiniz henüz onaylanmamış. Lütfen Supabase ayarlarından "Confirm email" seçeneğini kapatın veya e-postanızı onaylayın.' }
    }
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/basvuru')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  
  revalidatePath('/', 'layout')
  redirect('/')
}
