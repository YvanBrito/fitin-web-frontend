import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import type { Metadata } from 'next'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../theme'
import './globals.css'
import Header from '../components/header'
import Footer from '../components/footer'
import ToastProvider from '../lib/react-toastify/toast-provider'

export const metadata: Metadata = {
  title: 'FitIn - Lifestyle',
  description: 'FitIn',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <ToastProvider>
              <Header />
              {children}
              <Footer />
            </ToastProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
