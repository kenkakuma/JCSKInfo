'use client'

import { Facebook, Link as LinkIcon, Check, Instagram, MessageCircle } from 'lucide-react'
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
    x: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
    line: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`,
    wechat: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareUrl)}`,
    instagram: `https://www.instagram.com/`,
  }

  const shareText = lang === 'vi' ? 'Chia sẻ' : lang === 'ja' ? '共有' : 'Share'
  const copiedText = lang === 'vi' ? 'Đã sao chép!' : lang === 'ja' ? 'コピーしました！' : 'Copied!'

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{shareText}:</span>
      <div className="flex flex-wrap gap-2">
        {/* Facebook */}
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-lg bg-blue-600 p-2 text-white transition-all hover:scale-110 hover:bg-blue-700 hover:shadow-lg"
          aria-label="Share on Facebook"
        >
          <Facebook className="h-5 w-5 transition-transform group-hover:scale-110" />
        </a>

        {/* X (formerly Twitter) */}
        <a
          href={shareLinks.x}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-lg bg-black p-2 text-white transition-all hover:scale-110 hover:bg-gray-800 hover:shadow-lg"
          aria-label="Share on X"
        >
          <svg className="h-5 w-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>

        {/* Line */}
        <a
          href={shareLinks.line}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-lg bg-[#00B900] p-2 text-white transition-all hover:scale-110 hover:bg-[#00A000] hover:shadow-lg"
          aria-label="Share on Line"
        >
          <MessageCircle className="h-5 w-5 transition-transform group-hover:scale-110" />
        </a>

        {/* WeChat - Opens QR code */}
        <a
          href={shareLinks.wechat}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-lg bg-[#09B83E] p-2 text-white transition-all hover:scale-110 hover:bg-[#08A036] hover:shadow-lg"
          aria-label="Share on WeChat"
        >
          <MessageCircle className="h-5 w-5 transition-transform group-hover:scale-110" fill="currentColor" />
        </a>

        {/* Instagram */}
        <a
          href={shareLinks.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-lg bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 p-2 text-white transition-all hover:scale-110 hover:shadow-lg"
          aria-label="Share on Instagram"
        >
          <Instagram className="h-5 w-5 transition-transform group-hover:scale-110" />
        </a>

        {/* Copy Link */}
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
