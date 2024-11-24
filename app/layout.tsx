import { Toaster } from '@/components/ui/sonner'
import { COPILOTKIT_API_ENDPOINT } from '@/lib/constants'
import { CopilotKit } from '@copilotkit/react-core'
import { CopilotPopup } from '@copilotkit/react-ui'
import '@copilotkit/react-ui/styles.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'CopilotKit with Notion API',
  description:
    'Use CopilotKit to connect with the Notion API. Access to CRUD operations within a Notion Database using AI.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CopilotKit runtimeUrl={COPILOTKIT_API_ENDPOINT}>
          <main>{children}</main>
          <Toaster />
          <CopilotPopup instructions='You are assisting the user as best as you can. Answer the best way possible given the user notion database information.' />
        </CopilotKit>
      </body>
    </html>
  )
}
