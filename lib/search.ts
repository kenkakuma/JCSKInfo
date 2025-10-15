import { Post } from './types'

/**
 * 搜索文章
 * @param posts 文章列表
 * @param query 搜索关键词
 * @returns 匹配的文章列表及匹配信息
 */
export function searchPosts(posts: Post[], query: string) {
  if (!query || query.trim() === '') {
    return []
  }

  const normalizedQuery = query.toLowerCase().trim()
  const keywords = normalizedQuery.split(/\s+/).filter((k) => k.length > 0)

  return posts
    .map((post) => {
      let score = 0
      const matches: {
        field: 'title' | 'summary' | 'tags' | 'body'
        keyword: string
      }[] = []

      keywords.forEach((keyword) => {
        // 标题匹配（权重最高）
        if (post.title.toLowerCase().includes(keyword)) {
          score += 10
          matches.push({ field: 'title', keyword })
        }

        // 摘要匹配
        if (post.summary.toLowerCase().includes(keyword)) {
          score += 5
          matches.push({ field: 'summary', keyword })
        }

        // 标签匹配
        if (post.tags?.some((tag) => tag.toLowerCase().includes(keyword))) {
          score += 7
          matches.push({ field: 'tags', keyword })
        }

        // 内容匹配（权重最低）
        if (post.body?.raw && post.body.raw.toLowerCase().includes(keyword)) {
          score += 2
          matches.push({ field: 'body', keyword })
        }
      })

      return { post, score, matches }
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
}

/**
 * 高亮搜索关键词
 * @param text 原始文本
 * @param keywords 关键词列表
 * @returns 带高亮标记的 HTML 字符串
 */
export function highlightKeywords(text: string, keywords: string[]): string {
  if (!keywords || keywords.length === 0) {
    return text
  }

  let highlightedText = text
  keywords.forEach((keyword) => {
    const regex = new RegExp(`(${escapeRegExp(keyword)})`, 'gi')
    highlightedText = highlightedText.replace(
      regex,
      '<mark class="bg-yellow-200 dark:bg-yellow-600 px-0.5">$1</mark>'
    )
  })

  return highlightedText
}

/**
 * 转义正则表达式特殊字符
 */
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * 获取搜索历史
 */
export function getSearchHistory(): string[] {
  if (typeof window === 'undefined') return []

  try {
    const history = localStorage.getItem('search_history')
    return history ? JSON.parse(history) : []
  } catch {
    return []
  }
}

/**
 * 保存搜索历史
 */
export function saveSearchHistory(query: string, maxItems = 10) {
  if (typeof window === 'undefined' || !query.trim()) return

  try {
    const history = getSearchHistory()
    const newHistory = [query, ...history.filter((q) => q !== query)].slice(0, maxItems)

    localStorage.setItem('search_history', JSON.stringify(newHistory))
  } catch (error) {
    console.error('Failed to save search history:', error)
  }
}

/**
 * 清除搜索历史
 */
export function clearSearchHistory() {
  if (typeof window === 'undefined') return

  try {
    localStorage.removeItem('search_history')
  } catch (error) {
    console.error('Failed to clear search history:', error)
  }
}
