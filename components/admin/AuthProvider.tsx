'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // 登录页面不需要验证
    if (pathname === '/admin/login') {
      setIsChecking(false)
      return
    }

    // 验证认证状态
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/auth/check')

        if (!res.ok) {
          router.push('/admin/login')
          return
        }

        setIsChecking(false)
      } catch (error) {
        console.error('Auth check failed:', error)
        router.push('/admin/login')
      }
    }

    checkAuth()
  }, [pathname, router])

  // 登录页面直接渲染
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  // 验证中显示加载状态
  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
          <p className="text-gray-600 dark:text-gray-400">验证身份中...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
