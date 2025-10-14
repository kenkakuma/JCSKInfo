import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/admin/auth'
import { getAllPosts } from '@/lib/admin/posts'
import type { ApiResponse } from '@/lib/admin/types'
import { Language } from '@/config/site'

// GET /api/admin/posts - 获取所有文章
export async function GET(request: NextRequest) {
  try {
    await requireAuth()

    const { searchParams } = new URL(request.url)
    const lang = searchParams.get('lang') as Language | null

    const posts = await getAllPosts(lang || undefined)

    return NextResponse.json<ApiResponse>({
      success: true,
      data: posts,
    })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json<ApiResponse>({ success: false, error: '未授权' }, { status: 401 })
    }

    console.error('Get posts error:', error)
    return NextResponse.json<ApiResponse>(
      { success: false, error: '获取文章列表失败' },
      { status: 500 }
    )
  }
}
