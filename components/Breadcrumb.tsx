/**
 * 面包屑导航组件
 * 提升 SEO 和用户体验
 */

'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { Language } from '@/config/site'

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  lang: Language
  homeLabel?: string
}

export default function Breadcrumb({ items, lang, homeLabel = 'Home' }: BreadcrumbProps) {
  const allItems = [
    { name: homeLabel, url: `/${lang}` },
    ...items,
  ]

  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
    >
      <ol className="flex flex-wrap items-center gap-2">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1
          const isFirst = index === 0

          return (
            <li key={item.url} className="flex items-center gap-2">
              {!isFirst && (
                <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-600" />
              )}
              {isLast ? (
                <span className="font-medium text-gray-900 dark:text-white">
                  {isFirst && <Home className="inline h-4 w-4 mr-1" />}
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="flex items-center gap-1 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {isFirst && <Home className="h-4 w-4" />}
                  {item.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

