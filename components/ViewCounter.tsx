'use client'

import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'
import { getPostViews, incrementPostViews, formatViews } from '@/lib/views'

interface ViewCounterProps {
  postId: string
  increment?: boolean
  showIcon?: boolean
  className?: string
}

/**
 * 文章浏览量计数器
 *
 * @param postId 文章 ID
 * @param increment 是否增加浏览量（默认 false）
 * @param showIcon 是否显示图标（默认 true）
 */
export default function ViewCounter({
  postId,
  increment = false,
  showIcon = true,
  className = '',
}: ViewCounterProps) {
  const [views, setViews] = useState<number>(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    if (increment) {
      // 增加并获取浏览量
      const newViews = incrementPostViews(postId)
      setViews(newViews)
    } else {
      // 仅获取浏览量
      const currentViews = getPostViews(postId)
      setViews(currentViews)
    }
  }, [postId, increment])

  // 避免服务端渲染和客户端渲染不一致
  if (!mounted) {
    return (
      <span className={`flex items-center gap-1.5 text-gray-500 dark:text-gray-400 ${className}`}>
        {showIcon && <Eye className="h-4 w-4" />}
        <span>--</span>
      </span>
    )
  }

  return (
    <span
      className={`flex items-center gap-1.5 text-gray-500 dark:text-gray-400 ${className}`}
      title={`${views} views`}
    >
      {showIcon && <Eye className="h-4 w-4" />}
      <span>{formatViews(views)}</span>
    </span>
  )
}
