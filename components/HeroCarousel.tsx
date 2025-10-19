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

interface HeroCarouselProps {
  posts: Post[]
  autoPlayInterval?: number
}

export default function HeroCarousel({ posts, autoPlayInterval = 5000 }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayIndex, setDisplayIndex] = useState(0)

  const featuredPosts = posts.slice(0, 3)

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex(index)
    // 先淡出旧内容，完全消失后再更新显示内容
    setTimeout(() => {
      // 500ms后更新显示的索引（确保完全透明后）
      setDisplayIndex(index)
      // 再等待50ms让DOM更新，然后开始淡入
      setTimeout(() => setIsTransitioning(false), 50)
    }, 500)
  }, [isTransitioning])

  const goToPrevious = useCallback(() => {
    const newIndex = currentIndex === 0 ? featuredPosts.length - 1 : currentIndex - 1
    goToSlide(newIndex)
  }, [currentIndex, featuredPosts.length, goToSlide])

  const goToNext = useCallback(() => {
    const newIndex = currentIndex === featuredPosts.length - 1 ? 0 : currentIndex + 1
    goToSlide(newIndex)
  }, [currentIndex, featuredPosts.length, goToSlide])

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  // 自动轮播
  useEffect(() => {
    if (!isAutoPlaying || featuredPosts.length <= 1) return

    const interval = setInterval(() => {
      goToNext()
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isAutoPlaying, goToNext, autoPlayInterval, featuredPosts.length])

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
  }, [goToPrevious, goToNext])

  if (featuredPosts.length === 0) return null

  const currentPost = featuredPosts[displayIndex]
  const titleFont =
    currentPost.lang === 'en' || currentPost.lang === 'vi'
      ? 'font-merriweather italic'
      : 'font-serif'

  return (
    <div className="group relative mb-6 overflow-visible rounded-2xl bg-transparent">
      {/* 轮播内容 */}
      <div className="relative overflow-hidden rounded-2xl">
        <Link href={currentPost.url}>
          <article className="cursor-pointer transition-colors duration-300">
            <div className="grid gap-6 p-6 md:h-[380px] md:grid-cols-2">
              {/* 左侧文字内容 */}
              <div className="flex flex-col justify-between overflow-hidden">
                <div>
                  {/* 标题 - 从上向下进入，最多显示3行 */}
                  <h2
                    className={`mb-4 line-clamp-3 ${titleFont} text-2xl font-normal text-gray-900 transition-all duration-500 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 md:text-[40px] md:leading-tight ${
                      isTransitioning
                        ? 'opacity-0 -translate-y-8'
                        : 'opacity-100 translate-y-0'
                    }`}
                    style={{ transitionDelay: isTransitioning ? '0ms' : '150ms' }}
                  >
                    {currentPost.title}
                  </h2>

                  {/* 元信息 - 淡入，与标题同时显示 */}
                  <div
                    className={`mb-4 flex items-center gap-3 text-sm text-gray-500 transition-all duration-500 dark:text-gray-400 ${
                      isTransitioning ? 'opacity-0' : 'opacity-100'
                    }`}
                    style={{ transitionDelay: isTransitioning ? '0ms' : '150ms' }}
                  >
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{currentPost.readingTime.text}</span>
                    </div>
                    <span>•</span>
                    <ViewCounter postId={currentPost._id} showIcon={false} className="text-sm" />
                    <span>•</span>
                    <span>发布于{getTimeAgo(currentPost.date, currentPost.lang)}</span>
                  </div>

                  {/* 摘要 - 从下往上进入 */}
                  <p
                    className={`line-clamp-3 leading-relaxed text-gray-600 transition-all duration-500 dark:text-gray-300 ${
                      isTransitioning
                        ? 'opacity-0 translate-y-8'
                        : 'opacity-100 translate-y-0'
                    }`}
                    style={{ transitionDelay: isTransitioning ? '0ms' : '450ms' }}
                  >
                    {currentPost.summary}
                  </p>
                </div>

                {/* 底部交互栏 - 淡入 */}
                <div
                  className={`mt-6 flex items-center justify-between border-t border-gray-200 pt-4 transition-all duration-500 dark:border-gray-800 ${
                    isTransitioning ? 'opacity-0' : 'opacity-100'
                  }`}
                  style={{ transitionDelay: isTransitioning ? '0ms' : '600ms' }}
                >
                  <div className="flex items-center gap-4">
                    <LikeButton
                      postId={currentPost.translationKey || currentPost._id}
                      className="text-lg"
                    />
                    {currentPost.tags && currentPost.tags.length > 0 && (
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-gray-400" />
                        <div className="flex gap-2">
                          {currentPost.tags.slice(0, 3).map((tag, index) => (
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
                </div>
              </div>

              {/* 右侧图片 - 从中心缩放进入 */}
              <div
                className={`relative h-80 overflow-hidden rounded-xl md:h-full transition-all duration-600 ${
                  isTransitioning ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
                }`}
                style={{ transitionDelay: isTransitioning ? '0ms' : '200ms' }}
              >
                {currentPost.image ? (
                  <ImageSkeleton
                    src={currentPost.image}
                    alt={currentPost.title}
                    fill
                    className="object-cover hover:scale-110 hover:brightness-105"
                    style={{
                      transition:
                        'transform 800ms cubic-bezier(0.34, 1.56, 0.64, 1), filter 800ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600">
                    <div className="text-6xl font-bold text-white opacity-20">
                      {currentPost.title.substring(0, 3)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </article>
        </Link>

        {/* 导航控制按钮 */}
        {featuredPosts.length > 1 && (
          <>
            {/* 左右箭头 */}
            <button
              onClick={(e) => {
                e.preventDefault()
                goToPrevious()
              }}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-3 text-gray-800 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white hover:scale-110 group-hover:opacity-100 dark:bg-gray-800/90 dark:text-white dark:hover:bg-gray-800"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={(e) => {
                e.preventDefault()
                goToNext()
              }}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-3 text-gray-800 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white hover:scale-110 group-hover:opacity-100 dark:bg-gray-800/90 dark:text-white dark:hover:bg-gray-800"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* 左侧指示器（三个点） - 移到容器外侧 */}
            <div className="absolute -left-8 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-3">
              {featuredPosts.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault()
                    goToSlide(index)
                  }}
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'scale-125 bg-blue-600 shadow-lg dark:bg-blue-400'
                      : 'bg-white/70 hover:bg-white hover:scale-110 dark:bg-gray-600/70 dark:hover:bg-gray-500'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
