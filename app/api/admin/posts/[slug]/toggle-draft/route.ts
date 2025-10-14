import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/admin/auth'
import { toggleDraft } from '@/lib/admin/posts'
import type { ApiResponse } from '@/lib/admin/types'
import { Language } from '@/config/site'

// POST /api/admin/posts/[slug]/toggle-draft - 切换草稿状态
export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
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

    const post = await toggleDraft(lang, params.slug)

    return NextResponse.json<ApiResponse>({
      success: true,
      message: post.frontmatter.draft ? '已设为草稿' : '已发布',
      data: post,
    })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json<ApiResponse>({ success: false, error: '未授权' }, { status: 401 })
    }

    console.error('Toggle draft error:', error)
    return NextResponse.json<ApiResponse>({ success: false, error: '操作失败' }, { status: 500 })
  }
}
