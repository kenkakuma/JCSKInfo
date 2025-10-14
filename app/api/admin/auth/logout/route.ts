import { NextResponse } from 'next/server'
import { clearAuthCookie } from '@/lib/admin/auth'
import type { ApiResponse } from '@/lib/admin/types'

export async function POST() {
  try {
    await clearAuthCookie()

    return NextResponse.json<ApiResponse>({
      success: true,
      message: '登出成功',
    })
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: '登出失败',
      },
      { status: 500 }
    )
  }
}
