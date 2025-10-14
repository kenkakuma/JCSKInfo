import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/admin/auth'
import { updatePost } from '@/lib/admin/posts'
import type { ApiResponse, UpdatePostInput } from '@/lib/admin/types'

// PUT /api/admin/posts/[slug]/update - 更新文章
export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await requireAuth()

    const body = (await request.json()) as Omit<UpdatePostInput, 'slug'>
    const input: UpdatePostInput = {
      ...body,
      slug: params.slug,
    }

    // 验证必要字段
    if (!input.title || !input.lang || !input.translationKey || !input.summary) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: '缺少必要字段',
        },
        { status: 400 }
      )
    }

    const post = await updatePost(input)

    return NextResponse.json<ApiResponse>({
      success: true,
      message: '文章更新成功',
      data: post,
    })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json<ApiResponse>({ success: false, error: '未授权' }, { status: 401 })
    }

    console.error('Update post error:', error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || '更新文章失败',
      },
      { status: 500 }
    )
  }
}
