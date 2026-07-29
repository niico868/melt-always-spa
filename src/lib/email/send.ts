import { supabase } from '@/integrations/supabase/client'

export async function sendTransactionalEmail(input: {
  templateName: string
  recipientEmail: string
  idempotencyKey?: string
  templateData?: Record<string, any>
}) {
  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token
  if (!token) return { success: false, reason: 'no_session' }
  try {
    const res = await fetch('/lovable/email/transactional/send', {
      method: 'POST',
      headers: { 'content-type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(input),
    })
    return await res.json()
  } catch {
    return { success: false, reason: 'network_error' }
  }
}
