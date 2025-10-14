'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Eye } from 'lucide-react'
import Link from 'next/link'
import MarkdownEditor from '@/components/admin/MarkdownEditor'
import ImageUrlInput from '@/components/admin/ImageUrlInput'
import { ADMIN_CONFIG } from '@/lib/config/admin-config'
import type { CreatePostInput } from '@/lib/admin/types'
import { Language } from '@/config/site'

export default function NewPostPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showImageInput, setShowImageInput] = useState(false)
  const [formData, setFormData] = useState<CreatePostInput>({
    title: '',
    lang: ADMIN_CONFIG.posts.defaultLanguage,
    translationKey: '',
    tags: [],
    summary: '',
    image: '',
    content: '',
    draft: true,
  })
  const [tagInput, setTagInput] = useState('')

  const handleSubmit = async (asDraft: boolean) => {
    // 验证必填字段
    if (!formData.title || !formData.translationKey || !formData.summary || !formData.content) {
      alert('请填写所有必填字段')
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch('/api/admin/posts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          draft: asDraft,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        // 清除本地草稿
        localStorage.removeItem('admin_draft_content')
        alert(`文章${asDraft ? '保存为草稿' : '发布'}成功！`)
        router.push('/admin/posts')
      } else {
        alert(data.error || '创建失败')
      }
    } catch (error) {
      console.error('Create post error:', error)
      alert('创建失败，请重试')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      })
      setTagInput('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    })
  }

  const handleImageInsert = (url: string, alt?: string) => {
    const imageMarkdown = `![${alt || '图片'}](${url})`
    setFormData({
      ...formData,
      content: formData.content + '\n\n' + imageMarkdown,
    })
  }

  return (
    <div className="mx-auto max-w-7xl">
      {/* 页面标题 */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/posts"
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">创建新文章</h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">填写文章信息并编辑内容</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => handleSubmit(true)}
            disabled={isLoading}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <Save size={16} />
            保存草稿
          </button>
          <button
            onClick={() => handleSubmit(false)}
            disabled={isLoading}
            className="flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 font-medium text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Eye size={16} />
            {isLoading ? '发布中...' : '发布文章'}
          </button>
        </div>
      </div>

      {/* 表单 */}
      <div className="space-y-6">
        {/* 基本信息 */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">基本信息</h2>

          <div className="grid gap-4 md:grid-cols-2">
            {/* 标题 */}
            <div className="md:col-span-2">
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                文章标题 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                placeholder="输入文章标题"
                required
              />
            </div>

            {/* 语言 */}
            <div>
              <label
                htmlFor="lang"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                语言 <span className="text-red-500">*</span>
              </label>
              <select
                id="lang"
                value={formData.lang}
                onChange={(e) => setFormData({ ...formData, lang: e.target.value as Language })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                required
              >
                {ADMIN_CONFIG.posts.languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang === 'vi'
                      ? '🇻🇳 越南语 (vi)'
                      : lang === 'ja'
                        ? '🇯🇵 日语 (ja)'
                        : '🇬🇧 英语 (en)'}
                  </option>
                ))}
              </select>
            </div>

            {/* Translation Key */}
            <div>
              <label
                htmlFor="translationKey"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Translation Key <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="translationKey"
                value={formData.translationKey}
                onChange={(e) => setFormData({ ...formData, translationKey: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                placeholder="例如：iphone-15-review"
                required
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                用于关联不同语言版本的同一篇文章
              </p>
            </div>

            {/* 摘要 */}
            <div className="md:col-span-2">
              <label
                htmlFor="summary"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                文章摘要 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="summary"
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                placeholder="简短描述文章内容"
                required
              />
            </div>

            {/* 封面图片 */}
            <div className="md:col-span-2">
              <label
                htmlFor="image"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                封面图片 URL（可选）
              </label>
              <input
                type="url"
                id="image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* 标签 */}
            <div className="md:col-span-2">
              <label
                htmlFor="tags"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                标签
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  placeholder="输入标签后按回车"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  添加
                </button>
              </div>
              {formData.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 rounded-md bg-primary-100 px-2 py-1 text-sm text-primary-700 dark:bg-primary-900/30 dark:text-primary-400"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Markdown 编辑器 */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
            文章内容 <span className="text-red-500">*</span>
          </h2>
          <MarkdownEditor
            value={formData.content}
            onChange={(content) => setFormData({ ...formData, content })}
            onImageInsert={() => setShowImageInput(true)}
          />
        </div>
      </div>

      {/* 图片插入弹窗 */}
      {showImageInput && (
        <ImageUrlInput onInsert={handleImageInsert} onClose={() => setShowImageInput(false)} />
      )}
    </div>
  )
}
