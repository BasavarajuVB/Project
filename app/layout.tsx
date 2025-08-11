import type { Metadata } from 'next'
import { ConfigProvider } from 'antd'
import './styles/globals.css'

export const metadata: Metadata = {
  title: 'HES - SLA Dashboard',
  description: 'Data Push Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#1890ff',
            },
          }}
        >
          {children}
        </ConfigProvider>
      </body>
    </html>
  )
}