import './globals.css'
import type { Metadata } from 'next'
import { Inter, Noto_Serif, JetBrains_Mono, Merriweather } from 'next/font/google'
import { GoogleAnalytics, GoogleAdSense } from '@/lib/analytics'

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '800'],
  variable: '--font-inter',
  display: 'swap',
})

const notoSerif = Noto_Serif({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '600', '700'],
  variable: '--font-noto-serif',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['100', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

const merriweather = Merriweather({
  subsets: ['latin', 'vietnamese'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-merriweather',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        {/* 预加载关键字体 */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'light';
                document.documentElement.classList.toggle('dark', theme === 'dark');
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${notoSerif.variable} ${jetbrainsMono.variable} ${merriweather.variable} font-sans`}
      >
        {children}
        {/* Google Analytics */}
        <GoogleAnalytics />
        {/* Google AdSense */}
        <GoogleAdSense />
      </body>
    </html>
  )
}
