'use client'

export default function PostsManagementPage() {
  return (
    <div className="flex h-screen flex-col">
      {/* 页面标题 */}
      <div className="border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">文章管理</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              使用 Sveltia CMS 编辑和管理您的文章内容
            </p>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
              支持 MDX 格式
            </span>
          </div>
        </div>
      </div>

      {/* Sveltia CMS iframe */}
      <div className="flex-1 overflow-hidden">
        <iframe
          src="/cms/index.html"
          className="h-full w-full border-0"
          title="Sveltia CMS"
          allow="clipboard-read; clipboard-write"
        />
      </div>
    </div>
  )
}
