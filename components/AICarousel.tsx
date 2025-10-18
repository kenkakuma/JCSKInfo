'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Tag, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import type { Post } from '@/lib/types'
import LikeButton from './LikeButton'
import ViewCounter from './ViewCounter'
import ImageSkeleton from './ImageSkeleton'
import { getTimeAgo } from '@/lib/utils'

interface AICarouselProps {
  posts: Post[]
  autoPlayInterval?: number
}

export default function AICarousel({ posts, autoPlayInterval = 8000 }: AICarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isFlipping, setIsFlipping] = useState(false)
  const [displayIndex, setDisplayIndex] = useState(0)

  // 过滤出一周以内发布的、包含 AI 标签的文章（不区分大小写）
  const aiPosts = posts.filter((post) => {
    // 检查是否有 AI 标签
    const hasAITag = post.tags?.some((tag) => tag.toLowerCase().includes('ai'))
    if (!hasAITag) return false

    // 检查是否在一周以内发布
    const postDate = new Date(post.date)
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    return postDate >= oneWeekAgo
  })

  const goToSlide = useCallback(
    (index: number) => {
      if (isFlipping || aiPosts.length === 0) return
      setIsFlipping(true)
      setCurrentIndex(index)

      // 翻拍动画：500ms 翻转，然后更新内容，再翻转回来
      setTimeout(() => {
        setDisplayIndex(index)
        setTimeout(() => setIsFlipping(false), 50)
      }, 500)
    },
    [isFlipping, aiPosts.length]
  )

  const goToPrevious = useCallback(() => {
    const newIndex = currentIndex === 0 ? aiPosts.length - 1 : currentIndex - 1
    goToSlide(newIndex)
  }, [currentIndex, aiPosts.length, goToSlide])

  const goToNext = useCallback(() => {
    const newIndex = currentIndex === aiPosts.length - 1 ? 0 : currentIndex + 1
    goToSlide(newIndex)
  }, [currentIndex, aiPosts.length, goToSlide])

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying((prev) => !prev)
  }, [])

  // 自动轮播
  useEffect(() => {
    if (!isAutoPlaying || aiPosts.length <= 1) return

    const interval = setInterval(() => {
      goToNext()
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isAutoPlaying, goToNext, autoPlayInterval, aiPosts.length])

  // 键盘导航
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
      if (e.key === ' ') {
        e.preventDefault()
        toggleAutoPlay()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToPrevious, goToNext, toggleAutoPlay])

  if (aiPosts.length === 0) return null

  const currentPost = aiPosts[displayIndex]
  const titleFont =
    currentPost.lang === 'en' || currentPost.lang === 'vi' ? 'font-merriweather' : 'font-serif'

  return (
    <div className="group relative mb-6 lg:col-span-3">
      {/* AI 标签指示器 */}
      <div className="absolute -top-3 left-6 z-20 flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-1.5 text-sm font-medium text-white shadow-lg">
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        AI News
      </div>

      {/* 轮播内容 - 使用翻拍动画 */}
      <div
        className="relative overflow-hidden rounded-xl transition-all duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipping ? 'rotateY(90deg)' : 'rotateY(0deg)',
        }}
      >
        <Link href={currentPost.url}>
          <article className="h-full cursor-pointer">
            <div className="h-full overflow-hidden rounded-xl bg-transparent transition-colors duration-300">
              <div className="grid h-64 md:grid-cols-3">
                {/* 左侧图片 - 固定高度 h-48 */}
                <div className="relative flex h-64 items-center justify-center p-3">
                  <div className="relative h-48 w-full overflow-hidden rounded-xl">
                    {currentPost.image ? (
                      <ImageSkeleton
                        src={currentPost.image}
                        alt={currentPost.title}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-110 hover:brightness-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 transition-transform duration-700 hover:scale-110">
                        <div className="text-6xl font-bold text-white opacity-20">
                          {currentPost.title.substring(0, 3)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 右侧内容 - 占2/3 */}
                <div className="flex flex-col justify-between p-4 md:col-span-2">
                  <div>
                    <h3
                      className={`mb-3 line-clamp-2 ${titleFont} text-2xl font-normal text-gray-900 transition-colors duration-300 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 md:text-[28px] md:leading-tight`}
                    >
                      {currentPost.title}
                    </h3>

                    <div className="mb-2 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{currentPost.readingTime.text}</span>
                      </div>
                      <span>•</span>
                      <ViewCounter postId={currentPost._id} showIcon={false} className="text-xs" />
                      <span>•</span>
                      <span>发布于{getTimeAgo(currentPost.date, currentPost.lang)}</span>
                    </div>

                    <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-300">
                      {currentPost.summary}
                    </p>
                  </div>

                  {/* 底部交互栏 */}
                  <div className="mt-3 flex items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                      <LikeButton
                        postId={currentPost.translationKey || currentPost._id}
                        showCount={false}
                      />
                      {currentPost.tags && currentPost.tags.length > 0 && (
                        <div className="flex items-center gap-1.5">
                          <Tag className="h-3 w-3 text-gray-400" />
                          <div className="flex gap-1.5">
                            {currentPost.tags.slice(0, 3).map((tag, index) => (
                              <span
                                key={index}
                                className={`rounded-full px-2 py-0.5 text-xs ${
                                  tag.toLowerCase().includes('ai')
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                                    : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </Link>

        {/* 导航控制按钮 */}
        {aiPosts.length > 1 && (
          <>
            {/* 左右箭头 */}
            <button
              onClick={(e) => {
                e.preventDefault()
                goToPrevious()
              }}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-800 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white group-hover:opacity-100 dark:bg-gray-800/90 dark:text-white dark:hover:bg-gray-800"
              aria-label="Previous AI news"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={(e) => {
                e.preventDefault()
                goToNext()
              }}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-800 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white group-hover:opacity-100 dark:bg-gray-800/90 dark:text-white dark:hover:bg-gray-800"
              aria-label="Next AI news"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* 播放/暂停按钮 */}
            <button
              onClick={(e) => {
                e.preventDefault()
                toggleAutoPlay()
              }}
              className="absolute bottom-4 right-4 z-10 rounded-full bg-white/90 p-2 text-gray-800 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white group-hover:opacity-100 dark:bg-gray-800/90 dark:text-white dark:hover:bg-gray-800"
              aria-label={isAutoPlaying ? 'Pause autoplay' : 'Resume autoplay'}
            >
              {isAutoPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </button>

            {/* 底部指示器 */}
            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {aiPosts.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault()
                    goToSlide(index)
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-gradient-to-r from-blue-500 to-purple-600'
                      : 'w-1.5 bg-white/70 hover:bg-white dark:bg-gray-600/70 dark:hover:bg-gray-500'
                  }`}
                  aria-label={`Go to AI news ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* AI 新闻计数 */}
      <div className="mt-2 text-center">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {currentIndex + 1} / {aiPosts.length} AI Related News
        </span>
      </div>
    </div>
  )
}
