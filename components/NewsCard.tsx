'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Clock, Heart } from 'lucide-react'
import type { Post } from '@/lib/types'

interface NewsCardProps {
  post: Post
  size?: 'large' | 'medium' | 'small'
}

export default function NewsCard({ post, size = 'medium' }: NewsCardProps) {
  return (
    <Link href={post.url}>
      <article className="group flex gap-5 overflow-hidden rounded-xl bg-white p-5 shadow-md transition-all hover:shadow-lg dark:bg-gray-800/40 dark:hover:bg-gray-800/60">
        {/* 缩略图 - 左侧 */}
        {post.image && (
          <div className="relative h-32 w-48 flex-shrink-0 overflow-hidden rounded-lg">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        {/* 内容 - 右侧 */}
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <h3 className="mb-3 line-clamp-2 text-lg font-semibold leading-snug text-gray-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
              {post.title}
            </h3>
            <p className="line-clamp-2 text-base leading-relaxed text-gray-600 dark:text-gray-400">
              {post.summary}
            </p>
          </div>

          {/* 底部信息 */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>{post.readingTime.text}</span>
              </div>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-primary-100 px-2 py-0.5 text-xs text-primary-700 dark:bg-primary-900/30 dark:text-primary-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <button className="flex-shrink-0 transition-colors hover:text-red-400">
              <Heart className="h-4 w-4" />
            </button>
          </div>
        </div>
      </article>
    </Link>
  )
}
