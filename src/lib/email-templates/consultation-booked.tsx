import * as React from 'react'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  firstName?: string
  consultationDate?: string
  consultationTime?: string
  branchName?: string
  branchAddress?: string
  viewUrl?: string
  rescheduleUrl?: string
  isRescheduled?: boolean
}

const Email = ({
  firstName,
  consultationDate = '',
  consultationTime = '',
  branchName = '',
  branchAddress = '',
  viewUrl = 'https://www.meltawaysspa.com/account',
  rescheduleUrl = 'https://www.meltawaysspa.com/contact',
  isRescheduled = false,
}: Props) => {
  const greeting = firstName ? `Hi ${firstName},` : 'Hi there,'
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>We're looking forward to learning about your goals.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>
            {isRescheduled
              ? 'Your Meltaways Spa Consultation Has Been Updated'
              : 'Your Meltaways Spa Consultation Is Confirmed'}
          </Heading>
          <Text style={text}>{greeting}</Text>
          <Text style={text}>
            Thank you for booking your consultation with Meltaways Spa. We're excited to be part of your
            wellness and transformation journey.
          </Text>
          <Section style={card}>
            <Text style={cardLabel}>Your consultation details</Text>
            {consultationDate ? <Text style={cardRow}><strong>Date:</strong> {consultationDate}</Text> : null}
            {consultationTime ? <Text style={cardRow}><strong>Time:</strong> {consultationTime}</Text> : null}
            {branchName ? (
              <Text style={cardRow}>
                <strong>Location:</strong>
                <br />
                {branchName}
                {branchAddress ? (<><br />{branchAddress}</>) : null}
              </Text>
            ) : null}
          </Section>
          <Text style={text}>
            During your consultation, our team will take the time to understand your goals, answer your
            questions and discuss treatment options that may be appropriate for your individual needs.
          </Text>
          <Text style={text}>
            Our mission is to help you look and feel your absolute best through safe, effective and
            results-focused care.
          </Text>
          <Text style={text}>
            If there is anything you would like us to know before your consultation, you can update your
            information through your account or contact our team.
          </Text>
          <Text style={text}>
            We look forward to meeting you and helping you take the next step in your transformation.
          </Text>
          <Text style={tagline}>Where Confidence Begins and Your Transformation Starts.</Text>
          <Text style={text}>
            With care,
            <br />
            The Meltaways Spa Team
          </Text>
          <Section style={{ textAlign: 'center', margin: '28px 0 8px' }}>
            <Button style={button} href={viewUrl}>
              View Consultation
            </Button>
          </Section>
          <Text style={secondary}>
            <Link href={rescheduleUrl} style={link}>Reschedule or contact us</Link>
          </Text>
          <Hr style={hr} />
          <Text style={footer}>Meltaways Spa · care@meltawaysspa.com</Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: Email,
  subject: ({ isRescheduled }: Props = {}) =>
    isRescheduled
      ? 'Your Meltaways Spa Consultation Has Been Updated'
      : 'Your Meltaways Spa Consultation Is Confirmed',
  displayName: 'Consultation Booked / Rescheduled',
  previewData: {
    firstName: 'Jane',
    consultationDate: 'Friday, 14 August 2026',
    consultationTime: '10:30 AM',
    branchName: 'Meltaways Spa — El Dorado',
    branchAddress: '123 Main Road, El Dorado, Trinidad',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px 28px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#111111', margin: '0 0 20px' }
const text = { fontSize: '14px', color: '#3f3f46', lineHeight: '1.6', margin: '0 0 14px' }
const card = { backgroundColor: '#faf7f4', borderRadius: '10px', padding: '16px 18px', margin: '18px 0' }
const cardLabel = { fontSize: '12px', color: '#7a5a3f', textTransform: 'uppercase' as const, letterSpacing: '0.06em', margin: '0 0 8px' }
const cardRow = { fontSize: '14px', color: '#3f3f46', lineHeight: '1.6', margin: '0 0 6px' }
const tagline = { fontSize: '13px', color: '#7a5a3f', fontStyle: 'italic' as const, margin: '18px 0' }
const button = {
  backgroundColor: '#111111',
  color: '#ffffff',
  fontSize: '14px',
  borderRadius: '8px',
  padding: '12px 22px',
  textDecoration: 'none',
}
const secondary = { fontSize: '13px', color: '#666666', textAlign: 'center' as const, margin: '4px 0 0' }
const link = { color: '#7a5a3f', textDecoration: 'underline' }
const hr = { borderColor: '#eeeeee', margin: '28px 0 12px' }
const footer = { fontSize: '12px', color: '#999999', margin: 0 }