import { allPosts } from 'contentlayer/generated'
import { Language } from '@/config/site'
import { getDictionary } from '@/lib/dictionary'
import { getAllTags, normalizeTagForUrl } from '@/lib/utils'
import Link from 'next/link'
import { Metadata } from 'next'
import { Tag } from 'lucide-react'
import Breadcrumb from '@/components/Breadcrumb'

// 生成页面 metadata
export async function generateMetadata({ params }: { params: { lang: Language } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang)

  return {
    title: dict.common.allTags,
    description: dict.common.popularTags,
  }
}

export default async function TagsPage({ params }: { params: { lang: Language } }) {
  const dict = await getDictionary(params.lang)
  const tags = getAllTags(allPosts, params.lang)

  // 面包屑导航数据
  const breadcrumbItems = [
    { name: dict.common.posts, url: `/${params.lang}/posts` },
    { name: dict.common.allTags, url: `/${params.lang}/tags` },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      {/* 面包屑导航 */}
      <Breadcrumb items={breadcrumbItems} lang={params.lang} homeLabel={dict.common.home} />

      {/* 页面头部 */}
      <div className="mb-12">
        <div className="mb-4 flex items-center gap-3">
          <Tag className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            {dict.common.allTags}
          </h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {params.lang === 'vi'
            ? `Tìm thấy ${tags.length} thẻ`
            : params.lang === 'ja'
              ? `${tags.length}個のタグが見つかりました`
              : `Found ${tags.length} tags`}
        </p>
      </div>

      {/* Tags 显示 - 标签云样式 */}
      {tags.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">{dict.common.noPosts}</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {tags.map(({ tag, count }) => {
            // 根据文章数量计算标签大小
            const sizeClass =
              count >= 5
                ? 'text-2xl px-6 py-3'
                : count >= 3
                  ? 'text-xl px-5 py-2.5'
                  : 'text-base px-4 py-2'

            return (
              <Link
                key={tag}
                href={`/${params.lang}/tags/${normalizeTagForUrl(tag)}`}
                className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-100 to-primary-200 font-medium text-primary-700 transition-all hover:scale-105 hover:shadow-lg dark:from-primary-900 dark:to-primary-800 dark:text-primary-300 ${sizeClass}`}
              >
                <span>#{tag}</span>
                <span className="rounded-full bg-primary-200 px-2 py-0.5 text-xs dark:bg-primary-700">
                  {count}
                </span>
              </Link>
            )
          })}
        </div>
      )}

      {/* 热门标签区块 */}
      {tags.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
            {dict.common.popularTags}
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tags.slice(0, 9).map(({ tag, count, posts }) => (
              <Link
                key={tag}
                href={`/${params.lang}/tags/${normalizeTagForUrl(tag)}`}
                className="group rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-primary-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-700"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                    #{tag}
                  </span>
                  <span className="rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700 dark:bg-primary-900 dark:text-primary-300">
                    {count} {dict.common.postsWithTag}
                  </span>
                </div>
                <div className="space-y-2">
                  {posts.slice(0, 3).map((post) => (
                    <div key={post.slug} className="text-sm text-gray-600 dark:text-gray-400">
                      • {post.title.length > 40 ? `${post.title.substring(0, 40)}...` : post.title}
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
