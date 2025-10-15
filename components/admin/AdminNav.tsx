'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, FileText, Image, Bot, DollarSign, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { ADMIN_MENU } from '@/lib/config/admin-config'

const iconMap = {
  LayoutDashboard,
  FileText,
  Image,
  Bot,
  DollarSign,
}

export default function AdminNav() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/admin/auth/logout', {
        method: 'POST',
      })

      if (res.ok) {
        window.location.href = '/admin/login'
      }
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <>
      {/* 移动端菜单按钮 */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed left-4 top-4 z-50 rounded-lg bg-gray-800 p-2 text-white lg:hidden"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* 侧边栏 */}
      <nav
        className={`fixed left-0 top-0 z-40 h-screen w-64 transform border-r border-gray-200 bg-white transition-transform duration-300 dark:border-gray-700 dark:bg-gray-900 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="border-b border-gray-200 p-6 dark:border-gray-700">
            <div className="flex flex-col">
              <Link
                href="/admin"
                className="font-mono text-3xl font-extrabold italic text-[#2c5282] dark:text-[#e2e8f0]"
              >
                JetCode·SKI
              </Link>
              <span className="font-mono text-sm font-thin italic text-gray-600 dark:text-gray-400">
                Tech & Finance Intelligence
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">后台管理</p>
          </div>

          {/* 菜单项 */}
          <div className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {ADMIN_MENU.filter((item) => item.enabled).map((item) => {
                const Icon = iconMap[item.icon as keyof typeof iconMap]
                const isActive = pathname === item.href

                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                        isActive
                          ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                          : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="flex-1">{item.label}</span>
                      {'badge' in item && item.badge ? (
                        <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                          {item.badge as string}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* 登出按钮 */}
          <div className="border-t border-gray-200 p-4 dark:border-gray-700">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <LogOut size={20} />
              <span>登出</span>
            </button>
          </div>
        </div>
      </nav>

      {/* 移动端遮罩 */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
