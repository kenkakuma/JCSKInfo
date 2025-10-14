import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/admin/auth'
import { createPost } from '@/lib/admin/posts'
import type { ApiResponse, CreatePostInput } from '@/lib/admin/types'

// POST /api/admin/posts/create - 创建文章
export async function POST(request: NextRequest) {
  try {
    await requireAuth()

    const body = (await request.json()) as CreatePostInput

    // 验证必要字段
    if (!body.title || !body.lang || !body.translationKey || !body.summary) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: '缺少必要字段',
        },
        { status: 400 }
      )
    }

    const post = await createPost(body)

    return NextResponse.json<ApiResponse>({
      success: true,
      message: '文章创建成功',
      data: post,
    })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json<ApiResponse>({ success: false, error: '未授权' }, { status: 401 })
    }

    console.error('Create post error:', error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || '创建文章失败',
      },
      { status: 500 }
    )
  }
}
