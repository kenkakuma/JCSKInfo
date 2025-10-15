'use client'

import { useState, useEffect, useRef } from 'react'
import { Search as SearchIcon, X, Clock, TrendingUp } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Language } from '@/lib/types'
import { getSearchHistory, saveSearchHistory, clearSearchHistory } from '@/lib/search'

interface SearchProps {
  lang: Language
  placeholder?: string
}

export default function Search({ lang, placeholder = 'Search...' }: SearchProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    setHistory(getSearchHistory())
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K 打开搜索
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
        setTimeout(() => inputRef.current?.focus(), 100)
      }

      // ESC 关闭搜索
      if (e.key === 'Escape') {
        setIsOpen(false)
        setQuery('')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return

    saveSearchHistory(searchQuery)
    setHistory(getSearchHistory())
    router.push(`/${lang}/search?q=${encodeURIComponent(searchQuery)}`)
    setIsOpen(false)
    setQuery('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(query)
  }

  const handleHistoryClick = (historyQuery: string) => {
    setQuery(historyQuery)
    handleSearch(historyQuery)
  }

  const handleClearHistory = () => {
    clearSearchHistory()
    setHistory([])
  }

  return (
    <>
      {/* 搜索触发按钮 */}
      <button
        onClick={() => {
          setIsOpen(true)
          setTimeout(() => inputRef.current?.focus(), 100)
        }}
        className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-600 transition-colors hover:border-gray-400 hover:text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-500 dark:hover:text-gray-200"
        aria-label="Search"
      >
        <SearchIcon className="h-4 w-4" />
        <span className="hidden md:inline">{placeholder}</span>
        <kbd className="hidden rounded border border-gray-300 bg-gray-100 px-1.5 py-0.5 text-xs text-gray-600 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 md:inline">
          ⌘K
        </kbd>
      </button>

      {/* 搜索模态框 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-20"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-2xl rounded-lg bg-white shadow-2xl dark:bg-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 搜索输入 */}
            <form onSubmit={handleSubmit} className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 p-4">
                <SearchIcon className="h-5 w-5 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={placeholder}
                  className="flex-1 bg-transparent text-lg outline-none placeholder:text-gray-400 dark:text-white"
                  autoComplete="off"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </form>

            {/* 搜索历史 */}
            {history.length > 0 && !query && (
              <div className="max-h-96 overflow-y-auto p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>Recent Searches</span>
                  </div>
                  <button
                    onClick={handleClearHistory}
                    className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    Clear
                  </button>
                </div>
                <div className="space-y-1">
                  {history.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleHistoryClick(item)}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <SearchIcon className="h-4 w-4 text-gray-400" />
                      <span className="flex-1 text-sm text-gray-700 dark:text-gray-300">
                        {item}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 快捷键提示 */}
            <div className="border-t border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <kbd className="rounded bg-white px-1.5 py-0.5 font-medium dark:bg-gray-800">
                    ↵
                  </kbd>
                  Search
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="rounded bg-white px-1.5 py-0.5 font-medium dark:bg-gray-800">
                    ESC
                  </kbd>
                  Close
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
