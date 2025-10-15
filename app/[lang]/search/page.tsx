import { allPosts } from 'contentlayer/generated'
import { Language } from '@/lib/types'
import { searchPosts, highlightKeywords } from '@/lib/search'
import Link from 'next/link'
import { Clock, Tag } from 'lucide-react'
import { Metadata } from 'next'
import { getDictionary } from '@/lib/dictionary'

interface SearchPageProps {
  params: { lang: Language }
  searchParams: { q?: string }
}

export async function generateMetadata({
  params,
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const query = searchParams.q || ''
  return {
    title: `Search: ${query}`,
    description: `Search results for "${query}"`,
  }
}

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
  const query = searchParams.q || ''
  const dict = await getDictionary(params.lang)

  // 过滤当前语言的文章
  const langPosts = allPosts.filter((post) => post.lang === params.lang && !post.draft)

  // 执行搜索
  const results = searchPosts(langPosts, query)
  const keywords = query
    .toLowerCase()
    .split(/\s+/)
    .filter((k) => k.length > 0)

  return (
    <div className="container mx-auto px-4 py-12">
      {/* 搜索头部 */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Search Results</h1>
        {query && (
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {results.length} result{results.length !== 1 ? 's' : ''} for{' '}
            <span className="font-medium text-gray-900 dark:text-white">&quot;{query}&quot;</span>
          </p>
        )}
      </div>

      {/* 搜索结果 */}
      {!query ? (
        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800">
          <p className="text-gray-600 dark:text-gray-400">Enter a search term to find articles</p>
        </div>
      ) : results.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800">
          <p className="mb-2 text-lg font-medium text-gray-900 dark:text-white">No results found</p>
          <p className="text-gray-600 dark:text-gray-400">
            Try different keywords or check your spelling
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {results.map(({ post, score }) => (
            <Link
              key={post._id}
              href={post.url}
              className="group block rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-primary-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-400"
            >
              {/* 标题 */}
              <h2
                className="mb-2 text-xl font-semibold text-gray-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400"
                dangerouslySetInnerHTML={{
                  __html: highlightKeywords(post.title, keywords),
                }}
              />

              {/* 摘要 */}
              <p
                className="mb-4 text-gray-600 dark:text-gray-400"
                dangerouslySetInnerHTML={{
                  __html: highlightKeywords(post.summary, keywords),
                }}
              />

              {/* 元信息 */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>{new Date(post.date).toLocaleDateString(params.lang)}</span>
                </div>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex items-center gap-1.5">
                    <Tag className="h-4 w-4" />
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-gray-100 px-2 py-0.5 text-xs dark:bg-gray-700"
                          dangerouslySetInnerHTML={{
                            __html: highlightKeywords(tag, keywords),
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* 匹配分数（开发调试用） */}
                {process.env.NODE_ENV === 'development' && (
                  <span className="ml-auto text-xs text-gray-400">Score: {score}</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* 返回首页 */}
      <div className="mt-12 text-center">
        <Link
          href={`/${params.lang}`}
          className="text-primary-600 hover:underline dark:text-primary-400"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
