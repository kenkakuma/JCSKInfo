import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/admin/auth'
import { getPostStats, getRecentPosts } from '@/lib/admin/posts'
import type { ApiResponse, DashboardStats } from '@/lib/admin/types'

// GET /api/admin/stats - 获取仪表板统计数据
export async function GET() {
  try {
    await requireAuth()

    const [postStats, recentPosts] = await Promise.all([getPostStats(), getRecentPosts(5)])

    const stats: DashboardStats = {
      posts: postStats,
      recentPosts,
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
