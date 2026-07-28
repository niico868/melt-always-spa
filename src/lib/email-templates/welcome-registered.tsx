import * as React from 'react'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  firstName?: string
  siteUrl?: string
  marketingOptIn?: boolean
}

const Email = ({ firstName, siteUrl = 'https://www.meltawaysspa.com', marketingOptIn = false }: Props) => {
  const greeting = firstName ? `Hi ${firstName},` : 'Hi there,'
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Your journey to greater confidence, wellness and beauty starts here.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to Meltaways Spa 🌿✨</Heading>
          <Text style={text}>{greeting}</Text>
          <Text style={text}>Welcome to Meltaways Spa. We're delighted to have you here.</Text>
          <Text style={text}>
            At Meltaways Spa, we believe every transformation begins with a single step. Whether your goal
            is body sculpting, skin rejuvenation, wellness, relaxation or advanced aesthetic treatments,
            our team is committed to providing personalized care and an exceptional experience.
          </Text>
          <Text style={text}>Through your Meltaways Spa account, you can:</Text>
          <Text style={bullet}>• Book and manage your appointments</Text>
          <Text style={bullet}>• Explore our treatments and services</Text>
          <Text style={bullet}>• View your treatment plans and progress</Text>
          <Text style={bullet}>• Receive appointment reminders and important updates</Text>
          {marketingOptIn ? (
            <Text style={bullet}>• Stay informed about promotions and exclusive offers</Text>
          ) : null}
          <Text style={text}>
            Thank you for choosing Meltaways Spa. We look forward to being part of your journey toward
            greater confidence, health and beauty.
          </Text>
          <Text style={tagline}>Where Confidence Begins and Your Transformation Starts.</Text>
          <Text style={text}>
            With care,
            <br />
            The Meltaways Spa Team
          </Text>
          <Section style={{ textAlign: 'center', margin: '28px 0 8px' }}>
            <Button style={button} href={siteUrl}>
              Explore Meltaways Spa
            </Button>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>Meltaways Spa · care@meltawaysspa.com</Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: Email,
  subject: 'Welcome to Meltaways Spa 🌿✨',
  displayName: 'Welcome — Account Registered',
  previewData: { firstName: 'Jane', marketingOptIn: true },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px 28px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#111111', margin: '0 0 20px' }
const text = { fontSize: '14px', color: '#3f3f46', lineHeight: '1.6', margin: '0 0 14px' }
const bullet = { fontSize: '14px', color: '#3f3f46', lineHeight: '1.6', margin: '0 0 6px', paddingLeft: '8px' }
const tagline = { fontSize: '13px', color: '#7a5a3f', fontStyle: 'italic' as const, margin: '18px 0' }
const button = {
  backgroundColor: '#111111',
  color: '#ffffff',
  fontSize: '14px',
  borderRadius: '8px',
  padding: '12px 22px',
  textDecoration: 'none',
}
const hr = { borderColor: '#eeeeee', margin: '28px 0 12px' }
const footer = { fontSize: '12px', color: '#999999', margin: 0 }