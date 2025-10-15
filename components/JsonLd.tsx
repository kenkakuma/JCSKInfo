/**
 * JSON-LD 结构化数据组件
 * 用于提升 SEO 和 Google 搜索展示效果
 */

import { Post } from 'contentlayer/generated'

interface ArticleJsonLdProps {
  post: Post
  url: string
}

/**
 * 文章结构化数据 (Article Schema)
 */
export function ArticleJsonLd({ post, url }: ArticleJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.summary,
    image: post.image || `${process.env.NEXT_PUBLIC_SITE_URL}/og-${post.lang}.jpg`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'JetCode·SKI Team',
      url: process.env.NEXT_PUBLIC_SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'JetCode·SKI',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: post.tags?.join(', '),
    articleSection: post.tags?.[0] || 'Technology',
    inLanguage: post.lang === 'vi' ? 'vi-VN' : post.lang === 'ja' ? 'ja-JP' : 'en-US',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface BreadcrumbJsonLdProps {
  items: Array<{
    name: string
    url: string
  }>
}

/**
 * 面包屑结构化数据 (BreadcrumbList Schema)
 */
export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface WebsiteJsonLdProps {
  name: string
  description: string
  url: string
  lang: string
}

/**
 * 网站结构化数据 (WebSite Schema)
 */
export function WebsiteJsonLd({ name, description, url, lang }: WebsiteJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: name,
    description: description,
    url: url,
    inLanguage: lang === 'vi' ? 'vi-VN' : lang === 'ja' ? 'ja-JP' : 'en-US',
    publisher: {
      '@type': 'Organization',
      name: 'JetCode·SKI',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface OrganizationJsonLdProps {
  name: string
  url: string
  description: string
}

/**
 * 组织结构化数据 (Organization Schema)
 */
export function OrganizationJsonLd({ name, url, description }: OrganizationJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: name,
    url: url,
    description: description,
    logo: {
      '@type': 'ImageObject',
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
      width: 600,
      height: 60,
    },
    sameAs: [
      // 可以添加社交媒体链接
      // 'https://twitter.com/yourhandle',
      // 'https://facebook.com/yourpage',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

