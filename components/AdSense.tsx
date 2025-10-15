'use client'

import { useEffect } from 'react'

/**
 * Google AdSense 广告组件
 *
 * 支持多种广告格式：
 * - display: 展示广告（响应式）
 * - in-article: 文章内广告
 * - in-feed: 信息流广告
 * - multiplex: 多广告单元
 */

interface AdSenseProps {
  adSlot: string
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal'
  adLayout?: string
  adLayoutKey?: string
  fullWidthResponsive?: boolean
  className?: string
  style?: React.CSSProperties
}

export function AdSenseUnit({
  adSlot,
  adFormat = 'auto',
  adLayout,
  adLayoutKey,
  fullWidthResponsive = true,
  className = '',
  style = {},
}: AdSenseProps) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID

  useEffect(() => {
    if (adsenseId && typeof window !== 'undefined') {
      try {
        // @ts-ignore
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (error) {
        console.error('AdSense error:', error)
      }
    }
  }, [adsenseId])

  if (!adsenseId) {
    // 开发模式下显示占位符
    return (
      <div
        className={`flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900 ${className}`}
        style={{ minHeight: '250px', ...style }}
      >
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">📢 AdSense 广告位</p>
          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">生产环境将显示广告</p>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client={adsenseId}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-ad-layout={adLayout}
        data-ad-layout-key={adLayoutKey}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
      />
    </div>
  )
}

/**
 * 响应式展示广告（通用）
 */
export function DisplayAd({ adSlot, className = '' }: { adSlot: string; className?: string }) {
  return (
    <AdSenseUnit
      adSlot={adSlot}
      adFormat="auto"
      fullWidthResponsive={true}
      className={className}
      style={{ minHeight: '250px' }}
    />
  )
}

/**
 * 文章内广告（嵌入文章内容中）
 */
export function InArticleAd({ adSlot, className = '' }: { adSlot: string; className?: string }) {
  return (
    <AdSenseUnit
      adSlot={adSlot}
      adFormat="fluid"
      adLayout="in-article"
      className={`my-8 ${className}`}
    />
  )
}

/**
 * 信息流广告（适合列表页）
 */
export function InFeedAd({
  adSlot,
  adLayoutKey,
  className = '',
}: {
  adSlot: string
  adLayoutKey: string
  className?: string
}) {
  return (
    <AdSenseUnit
      adSlot={adSlot}
      adFormat="fluid"
      adLayout="in-feed"
      adLayoutKey={adLayoutKey}
      className={className}
    />
  )
}

/**
 * 矩形广告（300x250）
 */
export function RectangleAd({ adSlot, className = '' }: { adSlot: string; className?: string }) {
  return (
    <AdSenseUnit
      adSlot={adSlot}
      adFormat="rectangle"
      fullWidthResponsive={false}
      className={className}
      style={{ width: '300px', height: '250px' }}
    />
  )
}

/**
 * 横幅广告（728x90）
 */
export function BannerAd({ adSlot, className = '' }: { adSlot: string; className?: string }) {
  return (
    <AdSenseUnit
      adSlot={adSlot}
      adFormat="horizontal"
      fullWidthResponsive={true}
      className={className}
      style={{ minHeight: '90px' }}
    />
  )
}

/**
 * 侧边栏广告（垂直）
 */
export function SidebarAd({ adSlot, className = '' }: { adSlot: string; className?: string }) {
  return (
    <AdSenseUnit
      adSlot={adSlot}
      adFormat="vertical"
      fullWidthResponsive={false}
      className={className}
      style={{ width: '160px', height: '600px' }}
    />
  )
}

/**
 * 多广告单元（推荐）
 */
export function MultiplexAd({
  adSlot,
  adFormat = 'autorelaxed',
  className = '',
}: {
  adSlot: string
  adFormat?: string
  className?: string
}) {
  return (
    <AdSenseUnit
      adSlot={adSlot}
      adFormat={adFormat as any}
      fullWidthResponsive={true}
      className={className}
      style={{ minHeight: '250px' }}
    />
  )
}
