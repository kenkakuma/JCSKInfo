'use client'

import { useEffect, useRef } from 'react'
import { DisplayAd } from './AdSense'

interface InlineAdProps {
  afterParagraph?: number // 在第N个段落后插入
}

export default function InlineAd({ afterParagraph = 2 }: InlineAdProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const insertedRef = useRef(false)

  useEffect(() => {
    // 只在客户端执行，避免hydration错误
    if (insertedRef.current) return

    const adElement = adRef.current
    if (!adElement) return

    // 找到文章内容容器
    const articleContent = adElement.closest('article')
    if (!articleContent) return

    // 找到所有段落
    const paragraphs = articleContent.querySelectorAll('.prose p')

    if (paragraphs.length > afterParagraph) {
      const targetParagraph = paragraphs[afterParagraph]

      // 创建广告容器
      const adContainer = document.createElement('div')
      adContainer.className = 'my-8 inline-ad-container'

      // 将广告元素移动到目标位置
      targetParagraph.parentNode?.insertBefore(adContainer, targetParagraph.nextSibling)
      adContainer.appendChild(adElement)

      insertedRef.current = true
    }
  }, [afterParagraph])

  return (
    <div ref={adRef} className="my-8">
      <DisplayAd adSlot="1234567890" />
    </div>
  )
}
