import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/admin/auth'
import type { AuthResponse } from '@/lib/admin/types'

export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json<AuthResponse>(
        {
          success: false,
          message: '未登录',
        },
        { status: 401 }
      )
    }

    return NextResponse.json<AuthResponse>({
      success: true,
      user,
    })
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json<AuthResponse>(
      {
        success: false,
        message: '验证失败',
      },
      { status: 500 }
    )
  }
}
