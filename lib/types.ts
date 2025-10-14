import { Post } from 'contentlayer/generated'
import { Language } from '@/config/site'

export type { Post, Language }

export interface Dictionary {
  common: {
    readMore: string
    readingTime: string
    publishedOn: string
    tags: string
    share: string
    relatedPosts: string
    allPosts: string
    noPosts: string
    search: string
    darkMode: string
    lightMode: string
  }
  nav: {
    home: string
    posts: string
    about: string
  }
  home: {
    title: string
    subtitle: string
    latestPosts: string
  }
  post: {
    tableOfContents: string
    buyNow: string
    checkPrice: string
    comparePrice: string
    affiliateDisclosure: string
  }
  seo: {
    defaultTitle: string
    defaultDescription: string
  }
}

export interface PriceInfo {
  platform: 'shopee' | 'amazon' | 'lazada' | 'rakuten'
  price: string
  currency: string
  url: string
  inStock: boolean
}

export interface AffiliateLinkProps {
  href: string
  platform: 'shopee' | 'amazon' | 'lazada' | 'rakuten'
  children: React.ReactNode
  className?: string
}




