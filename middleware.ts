import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { defaultLanguage, languages } from '@/config/site'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // 排除后台管理路由和 API 路由，不进行语言重定向
  if (pathname.startsWith('/admin') || pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  // 检查路径是否已经包含语言前缀
  const pathnameHasLocale = languages.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // 如果访问根路径，重定向到默认语言
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLanguage}`, request.url))
  }

  // 如果路径没有语言前缀，重定向到默认语言
  if (!pathnameHasLocale) {
    return NextResponse.redirect(new URL(`/${defaultLanguage}${pathname}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // 匹配所有路径，除了以下这些
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|robots.txt|sitemap.xml|manifest.webmanifest).*)',
  ],
}
