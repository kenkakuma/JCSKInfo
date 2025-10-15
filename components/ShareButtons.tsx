'use client'

import { Facebook, Twitter, Link as LinkIcon, Check } from 'lucide-react'
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
          className="group rounded-lg bg-blue-600 p-2 text-white transition-all hover:scale-110 hover:bg-blue-700 hover:shadow-lg"
          aria-label="Share on Facebook"
        >
          <Facebook className="h-5 w-5 transition-transform group-hover:scale-110" />
        </a>
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-lg bg-sky-500 p-2 text-white transition-all hover:scale-110 hover:bg-sky-600 hover:shadow-lg"
          aria-label="Share on Twitter"
        >
          <Twitter className="h-5 w-5 transition-transform group-hover:scale-110" />
        </a>
        <button
          onClick={handleCopyLink}
          className={`group relative rounded-lg p-2 text-white transition-all hover:scale-110 hover:shadow-lg ${
            copied
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600'
          }`}
          aria-label="Copy link"
        >
          {copied ? (
            <Check className="h-5 w-5 animate-bounce" />
          ) : (
            <LinkIcon className="h-5 w-5 transition-transform group-hover:scale-110" />
          )}
          {copied && (
            <span className="animate-in fade-in slide-in-from-bottom-2 absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white shadow-lg dark:bg-gray-700">
              {copiedText}
              <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rotate-45 bg-gray-900 dark:bg-gray-700"></span>
            </span>
          )}
        </button>
      </div>
    </div>
  )
}
