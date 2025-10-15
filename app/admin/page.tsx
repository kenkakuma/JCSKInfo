'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FileText, FilePlus, Clock, Eye, EyeOff } from 'lucide-react'
import type { DashboardStats } from '@/lib/admin/types'
import { ADMIN_CONFIG } from '@/lib/config/admin-config'

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/admin/stats')
        if (res.ok) {
          const data = await res.json()
          setStats(data.data)
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl">
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">仪表板</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">欢迎回来！这里是您的内容管理中心</p>
      </div>

      {/* 统计卡片 */}
      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* 总文章数 */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">总文章数</p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
                {stats?.posts.total || 0}
              </p>
            </div>
            <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/20">
              <FileText className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
          </div>
        </div>

        {/* 已发布 */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">已发布</p>
              <p className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">
                {stats?.posts.published || 0}
              </p>
            </div>
            <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/20">
              <Eye className="text-green-600 dark:text-green-400" size={24} />
            </div>
          </div>
        </div>

        {/* 草稿 */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">草稿</p>
              <p className="mt-2 text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                {stats?.posts.draft || 0}
              </p>
            </div>
            <div className="rounded-full bg-yellow-100 p-3 dark:bg-yellow-900/20">
              <EyeOff className="text-yellow-600 dark:text-yellow-400" size={24} />
            </div>
          </div>
        </div>

        {/* 快速创建 */}
        <Link
          href="/admin/posts/new"
          className="group flex items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white p-6 shadow-sm transition-all hover:border-primary-500 hover:bg-primary-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-primary-500 dark:hover:bg-primary-900/20"
        >
          <div className="text-center">
            <div className="mx-auto mb-2 inline-flex rounded-full bg-primary-100 p-3 dark:bg-primary-900/20">
              <FilePlus className="text-primary-600 dark:text-primary-400" size={24} />
            </div>
            <p className="font-medium text-gray-900 group-hover:text-primary-600 dark:text-gray-100 dark:group-hover:text-primary-400">
              创建新文章
            </p>
          </div>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 各语言统计 */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">语言分布</h2>
          <div className="space-y-3">
            {ADMIN_CONFIG.posts.languages.map((lang) => (
              <div key={lang} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary-500" />
                  <span className="text-sm font-medium uppercase text-gray-700 dark:text-gray-300">
                    {lang === 'vi' ? '🇻🇳 越南语' : lang === 'ja' ? '🇯🇵 日语' : '🇬🇧 英语'}
                  </span>
                </div>
                <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                  {stats?.posts.byLanguage[lang as 'vi' | 'ja' | 'en'] || 0} 篇
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 最近编辑 */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">最近编辑</h2>
            <Link
              href="/admin/posts"
              className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              查看全部 →
            </Link>
          </div>

          {stats?.recentPosts && stats.recentPosts.length > 0 ? (
            <div className="space-y-3">
              {stats.recentPosts.map((post) => (
                <Link
                  key={`${post.lang}-${post.slug}`}
                  href={`/admin/posts/edit/${post.lang}/${post.slug}`}
                  className="group block rounded-lg border border-gray-200 p-3 transition-colors hover:border-primary-300 hover:bg-primary-50/50 dark:border-gray-700 dark:hover:border-primary-700 dark:hover:bg-primary-900/10"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-gray-900 group-hover:text-primary-600 dark:text-gray-100 dark:group-hover:text-primary-400">
                        {post.title}
                      </p>
                      <div className="mt-1 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span className="uppercase">{post.lang}</span>
                        <span>•</span>
                        <Clock size={12} />
                        <span>{new Date(post.date).toLocaleDateString('zh-CN')}</span>
                      </div>
                    </div>
                    {post.draft && (
                      <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                        草稿
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-gray-500 dark:text-gray-400">
              <FileText className="mx-auto mb-2 opacity-50" size={48} />
              <p>暂无文章</p>
            </div>
          )}
        </div>
      </div>

      {/* 更多统计数据 */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* 热门标签 */}
        {stats?.topTags && stats.topTags.length > 0 && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
              📌 热门标签
            </h2>
            <div className="space-y-2">
              {stats.topTags.map((item, index) => (
                <div key={item.tag} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                      {index + 1}
                    </span>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                      {item.tag}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                    {item.count} 篇
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 月度发布趋势 */}
        {stats?.monthlyPosts && stats.monthlyPosts.length > 0 && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
              📈 发布趋势（最近6个月）
            </h2>
            <div className="space-y-3">
              {stats.monthlyPosts.map((item) => (
                <div key={item.month}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {item.month}
                    </span>
                    <span className="font-bold text-gray-900 dark:text-gray-100">
                      {item.count} 篇
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all"
                      style={{
                        width: `${Math.max((item.count / Math.max(...stats.monthlyPosts!.map((m) => m.count))) * 100, 5)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 功能预告 */}
      <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-900/50 dark:bg-blue-900/20">
        <h3 className="mb-2 font-semibold text-blue-900 dark:text-blue-400">🚀 即将推出</h3>
        <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-300">
          <li>• 真实访问统计 - 集成 Google Analytics 4 数据</li>
          <li>• 文章浏览量排行 - 基于真实浏览数据</li>
          <li>• 盈利分析 - 联盟链接和广告收入统计</li>
        </ul>
      </div>
    </div>
  )
}
