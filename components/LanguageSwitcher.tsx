'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Language } from '@/config/site'

interface LanguageSwitcherProps {
  currentLang: Language
  translationUrl?: string
}

export default function LanguageSwitcher({ currentLang, translationUrl }: LanguageSwitcherProps) {
  const pathname = usePathname()

  // 检测是否在文章详情页
  const isArticlePage = pathname.includes('/posts/')

  // 获取目标语言的URL
  const getAlternateUrl = (targetLang: Language) => {
    // 如果提供了翻译URL（来自文章页的translationKey），使用它
    if (translationUrl) {
      return translationUrl
    }

    // 如果在文章详情页且没有翻译URL，跳转到目标语言的首页
    if (isArticlePage) {
      return `/${targetLang}`
    }

    // 其他页面（首页、列表页等），简单替换语言代码
    return pathname.replace(`/${currentLang}`, `/${targetLang}`)
  }

  const languages = [
    { code: 'vi' as Language, flag: '🇻🇳', name: 'Tiếng Việt' },
    { code: 'ja' as Language, flag: '🇯🇵', name: '日本語' },
    { code: 'en' as Language, flag: '🇬🇧', name: 'English' },
  ]

  return (
    <div className="flex items-center gap-2">
      {languages.map((lang) => {
        const isActive = currentLang === lang.code
        const url = isActive ? '#' : getAlternateUrl(lang.code)

        return (
          <Link
            key={lang.code}
            href={url}
            className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
            }`}
            aria-label={`Switch to ${lang.name}`}
            aria-current={isActive ? 'page' : undefined}
          >
            <span className="text-xl">{lang.flag}</span>
            <span className="hidden sm:inline">{lang.name}</span>
          </Link>
        )
      })}
    </div>
  )
}
