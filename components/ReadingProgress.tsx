/**
 * 阅读进度条组件
 * 显示文章阅读进度
 */

'use client'

import { useEffect, useState } from 'react'

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = (scrollTop / docHeight) * 100

      setProgress(Math.min(scrollProgress, 100))
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress() // 初始化

    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div
      className="fixed left-0 top-0 z-50 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-150"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    />
  )
}

