import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { ADMIN_CONFIG } from '@/lib/config/admin-config'
import type { AdminUser } from './types'

// 从环境变量获取配置
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme'
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

// 将密钥转换为 Uint8Array
const secret = new TextEncoder().encode(JWT_SECRET)

/**
 * 验证登录凭据
 */
export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD
}

/**
 * 创建 JWT token
 */
export async function createToken(user: AdminUser): Promise<string> {
  const token = await new SignJWT({ username: user.username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret)

  return token
}

/**
 * 验证 JWT token
 */
export async function verifyToken(token: string): Promise<AdminUser | null> {
  try {
    const { payload } = await jwtVerify(token, secret)

    if (!payload.username || typeof payload.username !== 'string') {
      return null
    }

    return {
      username: payload.username,
      isAuthenticated: true,
    }
  } catch (error) {
    return null
  }
}

/**
 * 设置认证 cookie
 */
export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(ADMIN_CONFIG.auth.cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: ADMIN_CONFIG.auth.sessionDuration / 1000, // 转换为秒
    path: '/',
  })
}

/**
 * 获取当前认证用户
 */
export async function getCurrentUser(): Promise<AdminUser | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(ADMIN_CONFIG.auth.cookieName)

    if (!token?.value) {
      return null
    }

    return await verifyToken(token.value)
  } catch (error) {
    return null
  }
}

/**
 * 清除认证 cookie
 */
export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_CONFIG.auth.cookieName)
}

/**
 * 检查是否已认证（用于页面保护）
 */
export async function requireAuth(): Promise<AdminUser> {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  return user
}
