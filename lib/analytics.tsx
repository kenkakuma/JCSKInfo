'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

/**
 * Google Analytics 4 (GA4) 组件
 *
 * 功能：
 * - 自动页面浏览跟踪
 * - 路由变化跟踪
 * - 自定义事件跟踪
 */
export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // 路由变化时触发页面浏览事件
  useEffect(() => {
    if (gaId && pathname) {
      // @ts-ignore
      if (typeof window.gtag !== 'undefined') {
        // @ts-ignore
        window.gtag('config', gaId, {
          page_path: pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : ''),
        })
      }
    }
  }, [pathname, searchParams, gaId])

  if (!gaId) {
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}

/**
 * Google AdSense 组件
 *
 * 自动加载 AdSense 脚本
 */
export function GoogleAdSense() {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID

  if (!adsenseId) {
    return null
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  )
}

/**
 * GA4 事件跟踪工具函数
 */
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  // @ts-ignore
  if (typeof window.gtag !== 'undefined') {
    // @ts-ignore
    window.gtag('event', eventName, eventParams)
  }
}

/**
 * 预定义的事件跟踪函数
 */
export const analytics = {
  // 文章查看
  viewPost: (postTitle: string, postSlug: string, language: string) => {
    trackEvent('view_post', {
      post_title: postTitle,
      post_slug: postSlug,
      language: language,
    })
  },

  // 点击联盟链接
  clickAffiliateLink: (productName: string, platform: string, url: string) => {
    trackEvent('click_affiliate_link', {
      product_name: productName,
      platform: platform,
      link_url: url,
    })
  },

  // 搜索
  search: (searchTerm: string) => {
    trackEvent('search', {
      search_term: searchTerm,
    })
  },

  // 语言切换
  switchLanguage: (fromLang: string, toLang: string) => {
    trackEvent('switch_language', {
      from_language: fromLang,
      to_language: toLang,
    })
  },

  // 点赞
  likePost: (postSlug: string) => {
    trackEvent('like_post', {
      post_slug: postSlug,
    })
  },

  // 分享
  sharePost: (postSlug: string, platform: string) => {
    trackEvent('share_post', {
      post_slug: postSlug,
      platform: platform,
    })
  },

  // 广告点击
  clickAd: (adSlot: string, adFormat: string) => {
    trackEvent('click_ad', {
      ad_slot: adSlot,
      ad_format: adFormat,
    })
  },
}
