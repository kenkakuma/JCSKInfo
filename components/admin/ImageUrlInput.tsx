'use client'

import { useState } from 'react'
import { Image as ImageIcon, X, Check, ExternalLink } from 'lucide-react'
import { ADMIN_CONFIG } from '@/lib/config/admin-config'

interface ImageUrlInputProps {
  onInsert: (url: string, alt?: string) => void
  onClose: () => void
}

export default function ImageUrlInput({ onInsert, onClose }: ImageUrlInputProps) {
  const [url, setUrl] = useState('')
  const [alt, setAlt] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')

  const handlePreview = () => {
    if (url) {
      setPreviewUrl(url)
    }
  }

  const handleInsert = () => {
    if (url) {
      onInsert(url, alt)
      onClose()
    }
  }

  const handleQuickInsert = (baseUrl: string) => {
    setUrl(baseUrl)
    setPreviewUrl(baseUrl)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl dark:bg-gray-900">
        {/* 标题 */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ImageIcon className="text-primary-600 dark:text-primary-400" size={24} />
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">插入图片</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          >
            <X size={20} />
          </button>
        </div>

        {/* 常用图床 */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            常用图床
          </label>
          <div className="flex flex-wrap gap-2">
            {ADMIN_CONFIG.imageHosts.map((host) => (
              <button
                key={host.name}
                onClick={() => host.url && handleQuickInsert(host.url)}
                disabled={!host.url}
                className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm transition-colors hover:border-primary-500 hover:bg-primary-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:hover:border-primary-500 dark:hover:bg-primary-900/20"
              >
                {host.name}
              </button>
            ))}
          </div>
        </div>

        {/* 图片URL */}
        <div className="mb-4">
          <label
            htmlFor="image-url"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            图片 URL
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              id="image-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            <button
              onClick={handlePreview}
              className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <ExternalLink size={16} />
              预览
            </button>
          </div>
        </div>

        {/* 图片描述 */}
        <div className="mb-4">
          <label
            htmlFor="image-alt"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            图片描述（可选）
          </label>
          <input
            type="text"
            id="image-alt"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            placeholder="图片的替代文字"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* 预览区域 */}
        {previewUrl && (
          <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
            <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">预览</p>
            <img
              src={previewUrl}
              alt={alt || '预览'}
              className="max-h-64 rounded-lg object-contain"
              onError={() => setPreviewUrl('')}
            />
          </div>
        )}

        {/* 操作按钮 */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            取消
          </button>
          <button
            onClick={handleInsert}
            disabled={!url}
            className="flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 font-medium text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Check size={16} />
            插入
          </button>
        </div>
      </div>
    </div>
  )
}
