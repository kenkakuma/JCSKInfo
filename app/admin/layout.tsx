import { Metadata } from 'next'
import ThemeToggle from '@/components/ThemeToggle'
import AdminNav from '@/components/admin/AdminNav'
import AuthProvider from '@/components/admin/AuthProvider'

export const metadata: Metadata = {
  title: '后台管理 | JCSKInfo',
  description: 'JCSKInfo 后台管理系统',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
        {/* 侧边导航 */}
        <AdminNav />

        {/* 主内容区 */}
        <div className="flex-1 lg:ml-64">
          {/* 顶部栏 */}
          <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="ml-12 lg:ml-0">{/* 占位，移动端给菜单按钮留空间 */}</div>
              <ThemeToggle />
            </div>
          </header>

          {/* 页面内容 */}
          <main className="p-6">{children}</main>
        </div>
      </div>
    </AuthProvider>
  )
}
