'use client'

import { Facebook, Twitter, Link as LinkIcon } from 'lucide-react'
import { useState } from 'react'
import { Language } from '@/config/site'

interface ShareButtonsProps {
  url: string
  title: string
  lang: Language
}

export default function ShareButtons({ url, title, lang }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL || ''}${url}`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
  }

  const shareText = lang === 'vi' ? 'Chia sẻ' : lang === 'ja' ? '共有' : 'Share'
  const copiedText = lang === 'vi' ? 'Đã sao chép!' : lang === 'ja' ? 'コピーしました！' : 'Copied!'

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{shareText}:</span>
      <div className="flex gap-2">
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700"
          aria-label="Share on Facebook"
        >
          <Facebook className="h-5 w-5" />
        </a>
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-sky-500 p-2 text-white transition-colors hover:bg-sky-600"
          aria-label="Share on Twitter"
        >
          <Twitter className="h-5 w-5" />
        </a>
        <button
          onClick={handleCopyLink}
          className="relative rounded-lg bg-gray-600 p-2 text-white transition-colors hover:bg-gray-700"
          aria-label="Copy link"
        >
          <LinkIcon className="h-5 w-5" />
          {copied && (
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white">
              {copiedText}
            </span>
          )}
        </button>
      </div>
    </div>
  )
}
