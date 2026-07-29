import * as React from 'react'
import { render } from '@react-email/render'
import { createClient } from '@supabase/supabase-js'
import { TEMPLATES } from '@/lib/email-templates/registry'

const SITE_NAME = 'Meltaways Spa'
const SENDER_DOMAIN = 'care.meltawaysspa.com'
const FROM_DOMAIN = 'meltawaysspa.com'

function redactEmail(email?: string | null): string {
  if (!email) return '***'
  const [l, d] = email.split('@')
  return l && d ? `${l[0]}***@${d}` : '***'
}

function generateToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('')
}

export interface SendAppEmailInput {
  templateName: string
  recipientEmail: string
  idempotencyKey?: string
  templateData?: Record<string, any>
  /** Skip if an email with this template was already logged for the recipient. */
  onlyOnce?: boolean
}

/**
 * Server-side app email send (service role). Used by public/webhook routes that
 * have no user JWT. Mirrors /lovable/email/transactional/send behaviour.
 */
export async function sendAppEmail({
  templateName,
  recipientEmail,
  idempotencyKey,
  templateData = {},
  onlyOnce = false,
}: SendAppEmailInput): Promise<{ success: boolean; reason?: string }> {
  const supabaseUrl = process.env.SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceKey) return { success: false, reason: 'missing_config' }
  if (!recipientEmail || !recipientEmail.includes('@')) return { success: false, reason: 'no_recipient' }

  const template = TEMPLATES[templateName]
  if (!template) return { success: false, reason: 'template_not_found' }

  const supabase = createClient(supabaseUrl, serviceKey)
  const to = (template.to || recipientEmail).toLowerCase()
  const messageId = crypto.randomUUID()

  if (onlyOnce) {
    const { data: prior } = await supabase
      .from('email_send_log')
      .select('id')
      .eq('template_name', templateName)
      .eq('recipient_email', to)
      .limit(1)
    if (prior?.length) return { success: false, reason: 'already_sent' }
  }

  const { data: suppressed, error: suppressionError } = await supabase
    .from('suppressed_emails').select('id').eq('email', to).maybeSingle()
  if (suppressionError) return { success: false, reason: 'suppression_check_failed' }
  if (suppressed) {
    await supabase.from('email_send_log').insert({
      message_id: messageId, template_name: templateName, recipient_email: to, status: 'suppressed',
    })
    return { success: false, reason: 'email_suppressed' }
  }

  let unsubscribeToken: string
  const { data: existing } = await supabase
    .from('email_unsubscribe_tokens').select('token, used_at').eq('email', to).maybeSingle()
  if (existing?.token && !existing.used_at) {
    unsubscribeToken = existing.token
  } else if (!existing) {
    unsubscribeToken = generateToken()
    await supabase.from('email_unsubscribe_tokens')
      .upsert({ token: unsubscribeToken, email: to }, { onConflict: 'email', ignoreDuplicates: true })
    const { data: stored } = await supabase
      .from('email_unsubscribe_tokens').select('token').eq('email', to).maybeSingle()
    if (!stored) return { success: false, reason: 'token_failed' }
    unsubscribeToken = stored.token
  } else {
    await supabase.from('email_send_log').insert({
      message_id: messageId, template_name: templateName, recipient_email: to, status: 'suppressed',
      error_message: 'Recipient previously unsubscribed',
    })
    return { success: false, reason: 'email_suppressed' }
  }

  const element = React.createElement(template.component, templateData)
  const html = await render(element)
  const text = await render(element, { plainText: true })
  const subject = typeof template.subject === 'function' ? template.subject(templateData) : template.subject

  await supabase.from('email_send_log').insert({
    message_id: messageId, template_name: templateName, recipient_email: to, status: 'pending',
  })

  const { error: enqueueError } = await supabase.rpc('enqueue_email', {
    queue_name: 'transactional_emails',
    payload: {
      message_id: messageId,
      to,
      from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
      sender_domain: SENDER_DOMAIN,
      subject,
      html,
      text,
      purpose: 'transactional',
      label: templateName,
      idempotency_key: idempotencyKey || messageId,
      unsubscribe_token: unsubscribeToken,
      queued_at: new Date().toISOString(),
    },
  })

  if (enqueueError) {
    console.error('sendAppEmail enqueue failed', { templateName, recipient: redactEmail(to), error: enqueueError })
    await supabase.from('email_send_log').insert({
      message_id: messageId, template_name: templateName, recipient_email: to, status: 'failed',
      error_message: 'Failed to enqueue email',
    })
    return { success: false, reason: 'enqueue_failed' }
  }

  return { success: true }
}
