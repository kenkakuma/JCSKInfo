import { notFound } from 'next/navigation'
import Link from 'next/link'
import { languages, Language, siteConfig, navLinks } from '@/config/site'
import { getDictionary } from '@/lib/dictionary'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import ThemeToggle from '@/components/ThemeToggle'
import Search from '@/components/Search'

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: Language } }) {
  const config = siteConfig[params.lang]
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jcski.com'

  return {
    title: {
      default: config.name,
      template: `%s | ${config.name}`,
    },
    description: config.description,
    keywords: ['technology', 'reviews', 'affiliate', 'shopping', 'tech news', 'finance'],
    authors: [{ name: config.author.name }],
    creator: config.author.name,
    openGraph: {
      type: 'website',
      locale: params.lang === 'vi' ? 'vi_VN' : params.lang === 'ja' ? 'ja_JP' : 'en_US',
      url: config.url,
      title: config.name,
      description: config.description,
      siteName: config.name,
      images: [
        {
          url: config.ogImage,
          width: 1200,
          height: 630,
          alt: config.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.name,
      description: config.description,
      images: [config.ogImage],
    },
    alternates: {
      languages: {
        vi: '/vi',
        ja: '/ja',
        en: '/en',
      },
      types: {
        'application/rss+xml': `${siteUrl}/${params.lang}/feed.xml`,
      },
    },
  }
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: Language }
}) {
  if (!languages.includes(params.lang)) {
    notFound()
  }

  const dict = await getDictionary(params.lang)
  const config = siteConfig[params.lang]
  const links = navLinks[params.lang]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80">
        <nav className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex flex-col">
            <Link
              href={`/${params.lang}`}
              className="font-mono text-3xl font-extrabold italic text-[#2c5282] dark:text-[#e2e8f0]"
            >
              {config.name}
            </Link>
            <span className="font-mono text-sm font-thin italic text-gray-600 dark:text-gray-400">
              {params.lang === 'vi' && 'Tin Công Nghệ & Tài Chính'}
              {params.lang === 'ja' && 'テクノロジー・金融情報プラットフォーム'}
              {params.lang === 'en' && 'Tech & Finance Intelligence'}
            </span>
          </div>

          <div className="flex items-center gap-6">
            {/* 搜索框 */}
            <div className="hidden md:block">
              <Search lang={params.lang} placeholder={dict.common.search} />
            </div>

            {/* 导航链接 */}
            <ul className="hidden items-center gap-6 md:flex">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-700 transition-colors hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* 工具按钮 */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <LanguageSwitcher currentLang={params.lang} />
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-gray-100">
                {config.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{config.description}</p>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-gray-100">
                {dict.nav.posts}
              </h3>
              <ul className="space-y-2 text-sm">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-gray-100">
                {params.lang === 'vi' ? 'Kết nối' : 'フォロー'}
              </h3>
              <div className="flex gap-4">
                <a
                  href={config.links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                >
                  Twitter
                </a>
                <a
                  href={config.links.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-600 dark:border-gray-800 dark:text-gray-400">
            <p>
              © {new Date().getFullYear()} {config.name}. All rights reserved.
            </p>
            <p className="mt-2 text-xs">{dict.post.affiliateDisclosure}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
