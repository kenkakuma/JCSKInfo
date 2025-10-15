import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/admin/auth'
import { getPostStats, getRecentPosts } from '@/lib/admin/posts'
import { allPosts } from 'contentlayer/generated'
import type { ApiResponse, DashboardStats } from '@/lib/admin/types'

// GET /api/admin/stats - 获取仪表板统计数据
export async function GET() {
  try {
    await requireAuth()

    const [postStats, recentPosts] = await Promise.all([getPostStats(), getRecentPosts(5)])

    // 按语言统计
    const languageStats = {
      vi: allPosts.filter((p) => p.lang === 'vi').length,
      ja: allPosts.filter((p) => p.lang === 'ja').length,
      en: allPosts.filter((p) => p.lang === 'en').length,
    }

    // 标签统计（Top 10）
    const tagsMap = new Map<string, number>()
    allPosts.forEach((post) => {
      post.tags?.forEach((tag) => {
        tagsMap.set(tag, (tagsMap.get(tag) || 0) + 1)
      })
    })
    const topTags = Array.from(tagsMap.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    // 月度发布统计（最近6个月）
    const monthlyPosts = getMonthlyPostStats()

    const stats: DashboardStats = {
      posts: postStats,
      recentPosts,
      languageStats,
      topTags,
      monthlyPosts,
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      data: stats,
    })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json<ApiResponse>({ success: false, error: '未授权' }, { status: 401 })
    }

    console.error('Get stats error:', error)
    return NextResponse.json<ApiResponse>(
      { success: false, error: '获取统计数据失败' },
      { status: 500 }
    )
  }
}

function getMonthlyPostStats() {
  const now = new Date()
  const months: Array<{ month: string; count: number }> = []

  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const monthKey = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })

    const postsInMonth = allPosts.filter((post) => {
      const postDate = new Date(post.date)
      return (
        postDate.getFullYear() === date.getFullYear() && postDate.getMonth() === date.getMonth()
      )
    }).length

    months.push({
      month: monthKey,
      count: postsInMonth,
    })
  }

  return months
}
