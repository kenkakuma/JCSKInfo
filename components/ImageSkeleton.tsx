'use client'

import { useState } from 'react'
import Image, { ImageProps } from 'next/image'

interface ImageSkeletonProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallbackSrc?: string
}

/**
 * 带骨架屏和错误回退的图片组件
 *
 * 特性：
 * - 加载时显示骨架屏动画
 * - 加载失败时显示优雅的回退
 * - 支持所有 Next/Image 属性
 */
export default function ImageSkeleton({
  fallbackSrc,
  alt,
  className,
  ...props
}: ImageSkeletonProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const handleLoad = () => {
    setLoading(false)
  }

  const handleError = () => {
    setLoading(false)
    setError(true)
  }

  if (error && !fallbackSrc) {
    // 显示优雅的回退 UI
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 ${className}`}
      >
        <div className="p-4 text-center">
          <div className="mb-2 text-4xl opacity-30">🖼️</div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Image unavailable</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* 骨架屏 */}
      {loading && (
        <div
          className={`absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 ${className}`}
          style={{ backgroundSize: '200% 100%' }}
        />
      )}

      {/* 实际图片 */}
      <Image
        {...props}
        src={error && fallbackSrc ? fallbackSrc : props.src}
        alt={alt}
        className={`transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'} ${className}`}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  )
}
