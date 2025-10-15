'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Clock, MoreHorizontal, Tag } from 'lucide-react'
import type { Post } from '@/lib/types'
import LikeButton from './LikeButton'
import ViewCounter from './ViewCounter'
import ImageSkeleton from './ImageSkeleton'
import { getTimeAgo } from '@/lib/utils'

interface MasonryNewsCardProps {
  post: Post
  variant?: 'hero' | 'large' | 'large-reverse' | 'medium' | 'small'
  colSpan?: string
}

export default function MasonryNewsCard({
  post,
  variant = 'small',
  colSpan = '',
}: MasonryNewsCardProps) {
  // 英雄卡片 - 特色文章（横向布局，左文字右图）
  if (variant === 'hero') {
    // 根据语言选择字体：英语和越南语使用 Merriweather Italic，日语使用 Noto Serif
    const titleFont =
      post.lang === 'en' || post.lang === 'vi' ? 'font-merriweather italic' : 'font-serif'

    return (
      <Link href={post.url} className={colSpan}>
        <article className="group cursor-pointer overflow-hidden rounded-2xl bg-transparent transition-colors duration-300">
          <div className="grid gap-6 p-6 md:min-h-[380px] md:grid-cols-2">
            {/* 左侧文字内容 */}
            <div className="flex flex-col justify-between">
              <div>
                <h2
                  className={`mb-4 ${titleFont} text-2xl font-normal text-gray-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 md:text-[40px] md:leading-tight`}
                >
                  {post.title}
                </h2>

                <div className="mb-4 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readingTime.text}</span>
                  </div>
                  <span>•</span>
                  <ViewCounter postId={post._id} showIcon={false} className="text-sm" />
                  <span>•</span>
                  <span>发布于{getTimeAgo(post.date, post.lang)}</span>
                </div>

                <p className="line-clamp-3 leading-relaxed text-gray-600 dark:text-gray-300">
                  {post.summary}
                </p>
              </div>

              {/* 底部交互栏 */}
              <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-800">
                <div className="flex items-center gap-4">
                  <LikeButton postId={post.translationKey || post._id} className="text-lg" />
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-gray-400" />
                      <div className="flex gap-2">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-blue-100 px-2.5 py-1 text-sm text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <button className="text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* 右侧图片 */}
            <div className="relative h-80 overflow-hidden rounded-xl md:h-full">
              {post.image ? (
                <ImageSkeleton
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 transition-transform duration-500 group-hover:scale-110">
                  <div className="text-6xl font-bold text-white opacity-20">
                    {post.title.substring(0, 3)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </article>
      </Link>
    )
  }

  // 大卡片 - 横向布局占据整行（图片左，文字右）高度与小卡片一致
  if (variant === 'large') {
    // 根据语言选择字体：英语和越南语使用 Merriweather，日语使用 Noto Serif
    const titleFont = post.lang === 'en' || post.lang === 'vi' ? 'font-merriweather' : 'font-serif'

    return (
      <Link href={post.url} className={colSpan}>
        <article className="group h-full cursor-pointer">
          <div className="h-full overflow-hidden rounded-xl bg-transparent transition-colors duration-300">
            <div className="grid h-64 md:grid-cols-3">
              {/* 左侧图片 - 固定高度 h-48，与小卡片一致 */}
              <div className="relative flex h-64 items-center justify-center p-3">
                <div className="relative h-48 w-full overflow-hidden rounded-xl">
                  {post.image ? (
                    <ImageSkeleton
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-600 transition-transform duration-500 group-hover:scale-110">
                      <div className="text-6xl font-bold text-white opacity-20">
                        {post.title.substring(0, 3)}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 右侧内容 - 占2/3 */}
              <div className="flex flex-col justify-between p-4 md:col-span-2">
                <div>
                  <h3
                    className={`mb-3 line-clamp-2 ${titleFont} text-2xl font-normal text-gray-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 md:text-[28px] md:leading-tight`}
                  >
                    {post.title}
                  </h3>

                  <div className="mb-2 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readingTime.text}</span>
                    </div>
                    <span>•</span>
                    <ViewCounter postId={post._id} showIcon={false} className="text-xs" />
                    <span>•</span>
                    <span>发布于{getTimeAgo(post.date, post.lang)}</span>
                  </div>

                  <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-300">
                    {post.summary}
                  </p>
                </div>

                {/* 底部交互栏 */}
                <div className="mt-3 flex items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-800">
                  <div className="flex items-center gap-3">
                    <LikeButton postId={post.translationKey || post._id} showCount={false} />
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex items-center gap-1.5">
                        <Tag className="h-3 w-3 text-gray-400" />
                        <div className="flex gap-1.5">
                          {post.tags.slice(0, 2).map((tag, index) => (
                            <span
                              key={index}
                              className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <button className="text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </Link>
    )
  }

  // 大卡片反向 - 横向布局占据整行（图片右，文字左）高度与小卡片一致
  if (variant === 'large-reverse') {
    // 根据语言选择字体：英语和越南语使用 Merriweather，日语使用 Noto Serif
    const titleFont = post.lang === 'en' || post.lang === 'vi' ? 'font-merriweather' : 'font-serif'

    return (
      <Link href={post.url} className={colSpan}>
        <article className="group h-full cursor-pointer">
          <div className="h-full overflow-hidden rounded-xl bg-transparent transition-colors duration-300">
            <div className="grid h-64 md:grid-cols-3">
              {/* 左侧内容 - 占2/3 */}
              <div className="flex flex-col justify-between p-4 md:col-span-2">
                <div>
                  <h3
                    className={`mb-3 line-clamp-2 ${titleFont} text-2xl font-normal text-gray-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 md:text-[28px] md:leading-tight`}
                  >
                    {post.title}
                  </h3>

                  <div className="mb-2 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readingTime.text}</span>
                    </div>
                    <span>•</span>
                    <ViewCounter postId={post._id} showIcon={false} className="text-xs" />
                    <span>•</span>
                    <span>发布于{getTimeAgo(post.date, post.lang)}</span>
                  </div>

                  <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-300">
                    {post.summary}
                  </p>
                </div>

                {/* 底部交互栏 */}
                <div className="mt-3 flex items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-800">
                  <div className="flex items-center gap-3">
                    <LikeButton postId={post.translationKey || post._id} showCount={false} />
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex items-center gap-1.5">
                        <Tag className="h-3 w-3 text-gray-400" />
                        <div className="flex gap-1.5">
                          {post.tags.slice(0, 2).map((tag, index) => (
                            <span
                              key={index}
                              className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <button className="text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* 右侧图片 - 固定高度 h-48，与小卡片一致 */}
              <div className="relative flex h-64 items-center justify-center p-3">
                <div className="relative h-48 w-full overflow-hidden rounded-xl">
                  {post.image ? (
                    <ImageSkeleton
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-pink-400 to-rose-600 transition-transform duration-500 group-hover:scale-110">
                      <div className="text-6xl font-bold text-white opacity-20">
                        {post.title.substring(0, 3)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </article>
      </Link>
    )
  }

  // 中等卡片 - 横向布局（图片左，文字右）高度与Small卡片一致
  if (variant === 'medium') {
    return (
      <Link href={post.url} className={colSpan}>
        <article className="group h-full cursor-pointer">
          <div className="h-full overflow-hidden rounded-xl bg-white transition-transform duration-300 hover:scale-105 dark:bg-gray-900">
            <div className="grid h-64 md:grid-cols-2">
              {/* 左侧图片 - 四圆角横向居中 */}
              <div className="relative flex h-64 items-center justify-center p-4">
                <div className="relative h-48 w-full overflow-hidden rounded-xl">
                  {post.image ? (
                    <ImageSkeleton
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-400 to-indigo-600">
                      <div className="text-6xl font-bold text-white opacity-20">
                        {post.title.substring(0, 3)}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 右侧文字内容 */}
              <div className="flex flex-col justify-between p-4">
                <div>
                  <h3 className="mb-2 line-clamp-2 font-serif text-lg font-medium text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                    {post.title}
                  </h3>

                  <div className="mb-2 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="h-3 w-3" />
                    <span>{post.readingTime.text}</span>
                    <span>•</span>
                    <ViewCounter postId={post._id} showIcon={false} className="text-xs" />
                  </div>

                  <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-300">
                    {post.summary}
                  </p>
                </div>

                {/* 底部交互栏 - 在右侧内容区域内 */}
                <div className="mt-3 flex items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-800">
                  <div className="flex items-center gap-3">
                    <LikeButton postId={post.translationKey || post._id} showCount={false} />
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex items-center gap-1.5">
                        <Tag className="h-3 w-3 text-gray-400" />
                        <div className="flex gap-1.5">
                          {post.tags.slice(0, 2).map((tag, index) => (
                            <span
                              key={index}
                              className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <button className="text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </Link>
    )
  }

  // 小卡片 - 标准卡片（图片上，文字下）
  return (
    <Link href={post.url} className={colSpan}>
      <article className="group h-full cursor-pointer">
        <div className="h-full overflow-hidden rounded-xl bg-white transition-transform duration-300 hover:scale-105 dark:bg-gray-900">
          <div className="relative h-48">
            {post.image ? (
              <ImageSkeleton src={post.image} alt={post.title} fill className="object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-red-500 to-orange-500">
                <div className="text-4xl font-bold text-white opacity-30">
                  {post.title.substring(0, 2)}
                </div>
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="mb-3 line-clamp-2 text-base font-normal text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
              {post.title}
            </h3>
            <div className="mb-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <Clock className="h-3 w-3" />
              <span>{post.readingTime.text}</span>
              <span>•</span>
              <ViewCounter postId={post._id} showIcon={false} className="text-xs" />
              <span>•</span>
              <span>发布于{getTimeAgo(post.date, post.lang)}</span>
            </div>

            {/* 底部：点赞和标签在同一行 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LikeButton postId={post._id} showCount={false} />
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <button className="flex-shrink-0 transition-colors hover:text-gray-900 dark:hover:text-white">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
