import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/admin/auth'
import { getPost, deletePost } from '@/lib/admin/posts'
import type { ApiResponse } from '@/lib/admin/types'
import { Language } from '@/config/site'

// GET /api/admin/posts/[slug] - 获取单篇文章
export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await requireAuth()

    const { searchParams } = new URL(request.url)
    const lang = searchParams.get('lang') as Language

    if (!lang) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: '缺少语言参数' },
        { status: 400 }
      )
    }

    const post = await getPost(lang, params.slug)

    if (!post) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: '文章不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      data: post,
    })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json<ApiResponse>({ success: false, error: '未授权' }, { status: 401 })
    }

    console.error('Get post error:', error)
    return NextResponse.json<ApiResponse>(
      { success: false, error: '获取文章失败' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/posts/[slug] - 删除文章
export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await requireAuth()

    const { searchParams } = new URL(request.url)
    const lang = searchParams.get('lang') as Language

    if (!lang) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: '缺少语言参数' },
        { status: 400 }
      )
    }

    await deletePost(lang, params.slug)

    return NextResponse.json<ApiResponse>({
      success: true,
      message: '文章删除成功',
    })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json<ApiResponse>({ success: false, error: '未授权' }, { status: 401 })
    }

    console.error('Delete post error:', error)
    return NextResponse.json<ApiResponse>(
      { success: false, error: '删除文章失败' },
      { status: 500 }
    )
  }
}
