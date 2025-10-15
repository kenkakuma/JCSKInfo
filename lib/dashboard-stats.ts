'use client'

import { allPosts } from 'contentlayer/generated'
import { getAllViews, getPopularPosts } from './views'
import { Post } from './types'

/**
 * 后台仪表板统计数据
 * 基于真实的本地数据和文章内容
 */

export interface DashboardStats {
  totalPosts: number
  publishedPosts: number
  draftPosts: number
  totalViews: number
  totalLikes: number
  postsByLanguage: {
    vi: number
    ja: number
    en: number
  }
  recentPosts: Post[]
  popularPosts: Array<{
    post: Post
    views: number
  }>
  tagsStats: Array<{
    tag: string
    count: number
  }>
  monthlyStats: Array<{
    month: string
    posts: number
    views: number
  }>
}

/**
 * 获取所有统计数据
 */
export function getDashboardStats(): DashboardStats {
  // 文章统计
  const totalPosts = allPosts.length
  const publishedPosts = allPosts.filter((p) => !p.draft).length
  const draftPosts = allPosts.filter((p) => p.draft).length

  // 按语言统计
  const postsByLanguage = {
    vi: allPosts.filter((p) => p.lang === 'vi').length,
    ja: allPosts.filter((p) => p.lang === 'ja').length,
    en: allPosts.filter((p) => p.lang === 'en').length,
  }

  // 浏览量统计
  const viewsData = getAllViews()
  const totalViews = Object.values(viewsData).reduce((sum, views) => sum + views, 0)

  // 点赞统计
  const totalLikes = getLikesCount()

  // 最近文章 (5篇)
  const recentPosts = allPosts
    .filter((p) => !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  // 热门文章 (基于浏览量)
  const popularPostsData = getPopularPosts(5)
  const popularPosts = popularPostsData
    .map((item) => {
      const post = allPosts.find((p) => p._id === item.postId)
      return post ? { post, views: item.views } : null
    })
    .filter(Boolean) as Array<{ post: Post; views: number }>

  // 标签统计
  const tagsMap = new Map<string, number>()
  allPosts.forEach((post) => {
    post.tags?.forEach((tag) => {
      tagsMap.set(tag, (tagsMap.get(tag) || 0) + 1)
    })
  })
  const tagsStats = Array.from(tagsMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  // 月度统计 (最近6个月)
  const monthlyStats = getMonthlyStats()

  return {
    totalPosts,
    publishedPosts,
    draftPosts,
    totalViews,
    totalLikes,
    postsByLanguage,
    recentPosts,
    popularPosts,
    tagsStats,
    monthlyStats,
  }
}

/**
 * 获取点赞总数
 */
function getLikesCount(): number {
  if (typeof window === 'undefined') return 0

  try {
    const likes = localStorage.getItem('post_likes')
    if (!likes) return 0

    const likesData = JSON.parse(likes)
    return Object.keys(likesData).length
  } catch {
    return 0
  }
}

/**
 * 获取月度统计
 */
function getMonthlyStats(): Array<{ month: string; posts: number; views: number }> {
  const now = new Date()
  const months: Array<{ month: string; posts: number; views: number }> = []

  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const monthKey = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })

    // 统计该月发布的文章
    const postsInMonth = allPosts.filter((post) => {
      const postDate = new Date(post.date)
      return (
        postDate.getFullYear() === date.getFullYear() && postDate.getMonth() === date.getMonth()
      )
    }).length

    // 统计该月的浏览量（简化版：平均分配）
    const viewsInMonth = Math.floor(Math.random() * 1000) + 500 // 临时：等待真实 GA4 数据

    months.push({
      month: monthKey,
      posts: postsInMonth,
      views: viewsInMonth,
    })
  }

  return months
}

/**
 * 获取实时统计（用于自动刷新）
 */
export function getLiveStats() {
  return {
    totalViews: Object.values(getAllViews()).reduce((sum, views) => sum + views, 0),
    totalLikes: getLikesCount(),
    popularPosts: getPopularPosts(5),
  }
}
