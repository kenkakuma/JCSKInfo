'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { TrendingUp, Heart } from 'lucide-react'
import { getTopLikedPosts } from '@/lib/likes'
import { getWidgetTranslation, type WidgetLang } from '@/lib/widget-translations'
import type { Post } from '@/lib/types'

interface TrendingPostsProps {
  allPosts: Post[]
  limit?: number
  lang?: WidgetLang
}

export default function TrendingPosts({ allPosts, limit = 10, lang = 'ja' }: TrendingPostsProps) {
  const t = getWidgetTranslation(lang).trending
  const [trendingPosts, setTrendingPosts] = useState<Array<Post & { likeCount: number }>>([])

  const updateTrendingPosts = () => {
    const topLiked = getTopLikedPosts(limit)

    const postsWithLikes = topLiked
      .map(({ postId, count }) => {
        // 尝试通过 translationKey 或 _id 匹配文章
        const post = allPosts.find((p) => p.translationKey === postId || p._id === postId)
        if (post) {
          return { ...post, likeCount: count }
        }
        return null
      })
      .filter((p): p is Post & { likeCount: number } => p !== null && p.likeCount > 0)

    setTrendingPosts(postsWithLikes)
  }

  useEffect(() => {
    updateTrendingPosts()

    // 监听点赞更新事件
    const handleLikesUpdate = () => {
      updateTrendingPosts()
    }

    window.addEventListener('likesUpdated', handleLikesUpdate)

    // 也监听storage事件，确保跨标签页同步
    window.addEventListener('storage', handleLikesUpdate)

    return () => {
      window.removeEventListener('likesUpdated', handleLikesUpdate)
      window.removeEventListener('storage', handleLikesUpdate)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 当allPosts改变时重新更新
  useEffect(() => {
    updateTrendingPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allPosts, limit])

  if (trendingPosts.length === 0) {
    return (
      <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-900">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-red-500" />
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{t.title}</h3>
        </div>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">{t.noData}</p>
      </div>
    )
  }

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-900">
      <div className="mb-4 flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-red-500" />
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{t.title}</h3>
      </div>

      <div className="space-y-3">
        {trendingPosts.map((post, index) => (
          <Link
            key={post._id}
            href={post.url}
            className="group flex items-start gap-3 transition-opacity hover:opacity-80"
          >
            {/* 排名 */}
            <div
              className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded text-xs font-bold ${
                index === 0
                  ? 'bg-yellow-500 text-white'
                  : index === 1
                    ? 'bg-gray-400 text-white'
                    : index === 2
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              {index + 1}
            </div>

            {/* 文章信息 */}
            <div className="min-w-0 flex-1">
              <h4 className="mb-1 line-clamp-2 text-sm font-medium text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                {post.title}
              </h4>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Heart className="h-3 w-3 fill-current text-red-500" />
                <span>
                  {post.likeCount} {t.likes}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
