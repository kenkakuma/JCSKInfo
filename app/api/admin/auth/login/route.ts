import { NextRequest, NextResponse } from 'next/server'
import { verifyCredentials, createToken, setAuthCookie } from '@/lib/admin/auth'
import type { LoginCredentials, AuthResponse } from '@/lib/admin/types'

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LoginCredentials

    // 验证必要字段
    if (!body.username || !body.password) {
      return NextResponse.json<AuthResponse>(
        {
          success: false,
          message: '用户名和密码不能为空',
        },
        { status: 400 }
      )
    }

    // 验证凭据
    const isValid = await verifyCredentials(body.username, body.password)

    if (!isValid) {
      return NextResponse.json<AuthResponse>(
        {
          success: false,
          message: '用户名或密码错误',
        },
        { status: 401 }
      )
    }

    // 创建 token
    const user = {
      username: body.username,
      isAuthenticated: true,
    }
    const token = await createToken(user)

    // 设置 cookie
    await setAuthCookie(token)

    return NextResponse.json<AuthResponse>({
      success: true,
      message: '登录成功',
      token,
      user,
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json<AuthResponse>(
      {
        success: false,
        message: '服务器错误，请稍后重试',
      },
      { status: 500 }
    )
  }
}
