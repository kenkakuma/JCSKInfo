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

  // 如果有翻译URL，使用它；否则，简单地切换语言前缀
  const getAlternateUrl = (targetLang: Language) => {
    if (translationUrl) {
      return translationUrl
    }
    // 替换路径中的语言代码
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
