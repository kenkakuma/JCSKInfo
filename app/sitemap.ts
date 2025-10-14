import { MetadataRoute } from 'next'
import { allPosts } from 'contentlayer/generated'
import { languages } from '@/config/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  // 主页路由
  const homeRoutes = languages.map((lang) => ({
    url: `${siteUrl}/${lang}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }))

  // 文章列表页
  const postsRoutes = languages.map((lang) => ({
    url: `${siteUrl}/${lang}/posts`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  // 关于页
  const aboutRoutes = languages.map((lang) => ({
    url: `${siteUrl}/${lang}/about`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  // 所有文章
  const postRoutes = allPosts
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}${post.url}`,
      lastModified: new Date(post.date),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

  return [...homeRoutes, ...postsRoutes, ...aboutRoutes, ...postRoutes]
}




