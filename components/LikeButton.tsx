'use client'

import { Heart } from 'lucide-react'
import { useState, useEffect } from 'react'
import { toggleLike, getLikeCount, isLiked } from '@/lib/likes'

interface LikeButtonProps {
  postId: string
  className?: string
  showCount?: boolean
}

export default function LikeButton({ postId, className = '', showCount = true }: LikeButtonProps) {
  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setLiked(isLiked(postId))
    setCount(getLikeCount(postId))
  }, [postId])

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault() // 防止触发Link跳转

    const result = toggleLike(postId)
    setLiked(result.liked)
    setCount(result.count)

    // 触发自定义事件，通知其他组件更新
    window.dispatchEvent(new CustomEvent('likesUpdated'))
  }

  if (!mounted) {
    return (
      <button className={`flex items-center gap-1 transition-colors ${className}`}>
        <Heart className="h-4 w-4" />
        {showCount && <span className="text-sm">0</span>}
      </button>
    )
  }

  return (
    <button
      onClick={handleLike}
      className={`flex items-center gap-1 transition-colors ${
        liked
          ? 'text-red-500 hover:text-red-600'
          : 'text-gray-500 hover:text-red-500 dark:text-gray-400'
      } ${className}`}
    >
      <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
      {showCount && <span className="text-sm">{count}</span>}
    </button>
  )
}

