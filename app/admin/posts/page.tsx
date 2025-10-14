'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FilePlus, Search, Eye, EyeOff, Edit2, Trash2, Globe } from 'lucide-react'
import type { PostData } from '@/lib/admin/types'
import { ADMIN_CONFIG } from '@/lib/config/admin-config'
import { Language } from '@/config/site'

export default function PostsListPage() {
  const [posts, setPosts] = useState<PostData[]>([])
  const [filteredPosts, setFilteredPosts] = useState<PostData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLang, setSelectedLang] = useState<Language | 'all'>('all')
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'published' | 'draft'>('all')

  useEffect(() => {
    fetchPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    filterPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts, searchTerm, selectedLang, selectedStatus])

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/admin/posts')
      if (res.ok) {
        const data = await res.json()
        setPosts(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterPosts = () => {
    let filtered = [...posts]

    // 语言过滤
    if (selectedLang !== 'all') {
      filtered = filtered.filter((post) => post.frontmatter.lang === selectedLang)
    }

    // 状态过滤
    if (selectedStatus === 'published') {
      filtered = filtered.filter((post) => !post.frontmatter.draft)
    } else if (selectedStatus === 'draft') {
      filtered = filtered.filter((post) => post.frontmatter.draft)
    }

    // 搜索过滤
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (post) =>
          post.frontmatter.title.toLowerCase().includes(term) ||
          post.frontmatter.summary.toLowerCase().includes(term) ||
          post.frontmatter.tags.some((tag) => tag.toLowerCase().includes(term))
      )
    }

    setFilteredPosts(filtered)
  }

  const handleToggleDraft = async (lang: Language, slug: string) => {
    if (!confirm('确定要切换文章的发布状态吗？')) return

    try {
      const res = await fetch(`/api/admin/posts/${slug}/toggle-draft?lang=${lang}`, {
        method: 'POST',
      })

      if (res.ok) {
        await fetchPosts()
      } else {
        alert('操作失败，请重试')
      }
    } catch (error) {
      console.error('Toggle draft failed:', error)
      alert('操作失败，请重试')
    }
  }

  const handleDelete = async (lang: Language, slug: string, title: string) => {
    if (!confirm(`确定要删除文章 "${title}" 吗？此操作不可恢复！`)) return

    try {
      const res = await fetch(`/api/admin/posts/${slug}?lang=${lang}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        await fetchPosts()
      } else {
        alert('删除失败，请重试')
      }
    } catch (error) {
      console.error('Delete failed:', error)
      alert('删除失败，请重试')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl">
      {/* 页面标题和操作 */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">文章管理</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">共 {filteredPosts.length} 篇文章</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 font-medium text-white transition-colors hover:bg-primary-700"
        >
          <FilePlus size={20} />
          创建文章
        </Link>
      </div>

      {/* 过滤器 */}
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        {/* 搜索 */}
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="搜索标题、摘要、标签..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        {/* 语言过滤 */}
        <select
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value as Language | 'all')}
          className="rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        >
          <option value="all">所有语言</option>
          <option value="vi">🇻🇳 越南语</option>
          <option value="ja">🇯🇵 日语</option>
          <option value="en">🇬🇧 英语</option>
        </select>

        {/* 状态过滤 */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value as 'all' | 'published' | 'draft')}
          className="rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        >
          <option value="all">所有状态</option>
          <option value="published">已发布</option>
          <option value="draft">草稿</option>
        </select>
      </div>

      {/* 文章列表 */}
      {filteredPosts.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center dark:border-gray-800 dark:bg-gray-900">
          <FilePlus className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-gray-500 dark:text-gray-400">
            {searchTerm || selectedLang !== 'all' || selectedStatus !== 'all'
              ? '没有找到匹配的文章'
              : '还没有文章，创建第一篇吧！'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div
              key={`${post.frontmatter.lang}-${post.slug}`}
              className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex items-start justify-between gap-4">
                {/* 文章信息 */}
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium uppercase text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                      {post.frontmatter.lang === 'vi'
                        ? '🇻🇳 VI'
                        : post.frontmatter.lang === 'ja'
                          ? '🇯🇵 JA'
                          : '🇬🇧 EN'}
                    </span>
                    {post.frontmatter.draft ? (
                      <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-0.5 text-xs text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                        <EyeOff size={12} />
                        草稿
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        <Eye size={12} />
                        已发布
                      </span>
                    )}
                  </div>

                  <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {post.frontmatter.title}
                  </h3>

                  <p className="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                    {post.frontmatter.summary}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {post.frontmatter.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                    最后编辑：{new Date(post.frontmatter.date).toLocaleString('zh-CN')}
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex flex-col gap-2">
                  <Link
                    href={`/admin/posts/edit/${post.frontmatter.lang}/${post.slug}`}
                    className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40"
                  >
                    <Edit2 size={16} />
                    编辑
                  </Link>

                  <a
                    href={`/${post.frontmatter.lang}/posts/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                  >
                    <Globe size={16} />
                    预览
                  </a>

                  <button
                    onClick={() => handleToggleDraft(post.frontmatter.lang, post.slug)}
                    className="flex items-center gap-2 rounded-lg bg-yellow-50 px-3 py-2 text-sm text-yellow-600 transition-colors hover:bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400 dark:hover:bg-yellow-900/40"
                  >
                    {post.frontmatter.draft ? <Eye size={16} /> : <EyeOff size={16} />}
                    {post.frontmatter.draft ? '发布' : '草稿'}
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(post.frontmatter.lang, post.slug, post.frontmatter.title)
                    }
                    className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40"
                  >
                    <Trash2 size={16} />
                    删除
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
