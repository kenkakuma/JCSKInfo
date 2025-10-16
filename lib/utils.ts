import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Post } from 'contentlayer/generated'
import { Language } from '@/config/site'

// Tailwind CSS类名合并工具
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 格式化日期
export function formatDate(date: string, lang: Language): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  const localeMap: Record<Language, string> = {
    vi: 'vi-VN',
    ja: 'ja-JP',
    en: 'en-US',
  }
  const locale = localeMap[lang] || 'en-US'
  return new Date(date).toLocaleDateString(locale, options)
}

// 计算时间差（相对时间）
export function getTimeAgo(date: string, lang: Language = 'vi'): string {
  const now = new Date()
  const postDate = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000)

  const translations: Record<
    Language,
    { seconds: string; minutes: string; hours: string; days: string; months: string; years: string }
  > = {
    vi: {
      seconds: '秒前',
      minutes: '分钟前',
      hours: '小时前',
      days: '天前',
      months: '个月前',
      years: '年前',
    },
    ja: {
      seconds: '秒前',
      minutes: '分前',
      hours: '時間前',
      days: '日前',
      months: 'ヶ月前',
      years: '年前',
    },
    en: {
      seconds: 's ago',
      minutes: 'm ago',
      hours: 'h ago',
      days: 'd ago',
      months: 'mo ago',
      years: 'y ago',
    },
  }

  const t = translations[lang] || translations.en

  if (diffInSeconds < 60) {
    return `${diffInSeconds}${t.seconds}`
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes}${t.minutes}`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours}${t.hours}`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 30) {
    return `${diffInDays}${t.days}`
  }

  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths < 12) {
    return `${diffInMonths}${t.months}`
  }

  const diffInYears = Math.floor(diffInMonths / 12)
  return `${diffInYears}${t.years}`
}

// 获取指定语言的文章
export function getPostsByLang(posts: Post[], lang: Language): Post[] {
  return posts
    .filter((post) => post.lang === lang && !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// 根据translationKey查找对应语言的文章
export function getTranslatedPost(
  posts: Post[],
  translationKey: string,
  targetLang: Language
): Post | undefined {
  return posts.find((post) => post.translationKey === translationKey && post.lang === targetLang)
}

// 获取相关文章（基于标签）
export function getRelatedPosts(currentPost: Post, allPosts: Post[], limit: number = 3): Post[] {
  const currentTags = currentPost.tags || []

  return allPosts
    .filter(
      (post) =>
        post.lang === currentPost.lang &&
        post.slug !== currentPost.slug &&
        !post.draft &&
        post.tags?.some((tag) => currentTags.includes(tag))
    )
    .sort((a, b) => {
      const aMatchCount = a.tags?.filter((tag) => currentTags.includes(tag)).length || 0
      const bMatchCount = b.tags?.filter((tag) => currentTags.includes(tag)).length || 0
      return bMatchCount - aMatchCount
    })
    .slice(0, limit)
}

// 生成联盟链接
export function generateAffiliateLink(
  url: string,
  platform: 'shopee' | 'amazon' | 'lazada' | 'rakuten'
): string {
  const affiliateIds = {
    shopee: process.env.NEXT_PUBLIC_SHOPEE_AFFILIATE_ID || '',
    amazon: process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_ID || '',
    lazada: '',
    rakuten: '',
  }

  const affiliateId = affiliateIds[platform]
  if (!affiliateId) return url

  try {
    const urlObj = new URL(url)

    switch (platform) {
      case 'shopee':
        urlObj.searchParams.set('aff_sid', affiliateId)
        break
      case 'amazon':
        urlObj.searchParams.set('tag', affiliateId)
        break
      case 'lazada':
        urlObj.searchParams.set('aff_short_key', affiliateId)
        break
      case 'rakuten':
        urlObj.searchParams.set('aff_id', affiliateId)
        break
    }

    return urlObj.toString()
  } catch {
    return url
  }
}

// 追踪联盟链接点击
export function trackAffiliateClick(platform: string, productName: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', 'affiliate_click', {
      event_category: 'Affiliate',
      event_label: platform,
      value: productName,
    })
  }
}

// ==================== Tag 相关工具函数 ====================

// Tag 数据结构
export interface TagWithCount {
  tag: string
  count: number
  posts: Post[]
}

/**
 * 获取所有标签（按文章数量排序）
 * @param posts 文章列表
 * @param lang 语言（可选，如果提供则只统计该语言的文章）
 * @returns 标签列表（包含文章数量）
 */
export function getAllTags(posts: Post[], lang?: Language): TagWithCount[] {
  const tagMap = new Map<string, Post[]>()

  // 筛选文章
  const filteredPosts = lang
    ? posts.filter((post) => post.lang === lang && !post.draft)
    : posts.filter((post) => !post.draft)

  // 统计每个标签的文章
  filteredPosts.forEach((post) => {
    const tags = post.tags || []
    tags.forEach((tag) => {
      if (!tagMap.has(tag)) {
        tagMap.set(tag, [])
      }
      tagMap.get(tag)!.push(post)
    })
  })

  // 转换为数组并排序
  return Array.from(tagMap.entries())
    .map(([tag, posts]) => ({
      tag,
      count: posts.length,
      posts: posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    }))
    .sort((a, b) => b.count - a.count)
}

/**
 * 根据标签获取文章
 * @param posts 所有文章
 * @param tag 标签名
 * @param lang 语言
 * @returns 包含该标签的文章列表（按日期倒序）
 */
export function getPostsByTag(posts: Post[], tag: string, lang: Language): Post[] {
  return posts
    .filter(
      (post) =>
        post.lang === lang &&
        !post.draft &&
        post.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/**
 * 获取热门标签（Top N）
 * @param posts 文章列表
 * @param lang 语言
 * @param limit 返回数量（默认 10）
 * @returns 热门标签列表
 */
export function getPopularTags(posts: Post[], lang: Language, limit: number = 10): TagWithCount[] {
  return getAllTags(posts, lang).slice(0, limit)
}

/**
 * 规范化标签名称（用于 URL）
 * @param tag 标签名
 * @returns URL 安全的标签名
 */
export function normalizeTagForUrl(tag: string): string {
  return encodeURIComponent(tag.trim())
}

/**
 * 从 URL 解码标签名称
 * @param tag URL 编码的标签名
 * @returns 原始标签名
 */
export function decodeTagFromUrl(tag: string): string {
  return decodeURIComponent(tag)
}
