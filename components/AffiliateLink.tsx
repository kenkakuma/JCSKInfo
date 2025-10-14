'use client'

import { ExternalLink } from 'lucide-react'
import { generateAffiliateLink, trackAffiliateClick } from '@/lib/utils'
import { AffiliateLinkProps } from '@/lib/types'

export default function AffiliateLink({
  href,
  platform,
  children,
  className = '',
}: AffiliateLinkProps) {
  const affiliateUrl = generateAffiliateLink(href, platform)

  const handleClick = () => {
    trackAffiliateClick(platform, href)
  }

  const platformStyles = {
    shopee: 'bg-orange-600 hover:bg-orange-700 text-white',
    amazon: 'bg-amber-500 hover:bg-amber-600 text-gray-900',
    lazada: 'bg-blue-600 hover:bg-blue-700 text-white',
    rakuten: 'bg-rose-600 hover:bg-rose-700 text-white',
  }

  return (
    <a
      href={affiliateUrl}
      target="_blank"
      rel="nofollow noopener noreferrer"
      onClick={handleClick}
      className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium shadow-sm transition-all hover:shadow ${platformStyles[platform]} ${className}`}
    >
      {children}
      <ExternalLink className="h-3.5 w-3.5" />
    </a>
  )
}
