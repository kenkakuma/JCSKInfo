'use client'

/**
 * 文章浏览量统计工具
 * 使用 localStorage 存储浏览记录
 */

const VIEWS_KEY = 'post_views'
const VIEW_HISTORY_KEY = 'view_history'

interface ViewData {
  [postId: string]: number
}

interface ViewHistoryItem {
  postId: string
  timestamp: number
}

/**
 * 获取所有文章的浏览量
 */
export function getAllViews(): ViewData {
  if (typeof window === 'undefined') return {}

  try {
    const views = localStorage.getItem(VIEWS_KEY)
    return views ? JSON.parse(views) : {}
  } catch {
    return {}
  }
}

/**
 * 获取单个文章的浏览量
 */
export function getPostViews(postId: string): number {
  const allViews = getAllViews()
  return allViews[postId] || 0
}

/**
 * 增加文章浏览量
 * 每个用户每篇文章每天只计数一次
 */
export function incrementPostViews(postId: string): number {
  if (typeof window === 'undefined') return 0

  try {
    // 检查今天是否已经浏览过
    if (hasViewedToday(postId)) {
      return getPostViews(postId)
    }

    // 增加浏览量
    const allViews = getAllViews()
    allViews[postId] = (allViews[postId] || 0) + 1
    localStorage.setItem(VIEWS_KEY, JSON.stringify(allViews))

    // 记录浏览历史
    recordViewHistory(postId)

    return allViews[postId]
  } catch (error) {
    console.error('Failed to increment views:', error)
    return 0
  }
}

/**
 * 检查今天是否已经浏览过某篇文章
 */
function hasViewedToday(postId: string): boolean {
  if (typeof window === 'undefined') return false

  try {
    const history = getViewHistory()
    const today = new Date().setHours(0, 0, 0, 0)

    return history.some(
      (item) => item.postId === postId && new Date(item.timestamp).setHours(0, 0, 0, 0) === today
    )
  } catch {
    return false
  }
}

/**
 * 获取浏览历史
 */
function getViewHistory(): ViewHistoryItem[] {
  if (typeof window === 'undefined') return []

  try {
    const history = localStorage.getItem(VIEW_HISTORY_KEY)
    return history ? JSON.parse(history) : []
  } catch {
    return []
  }
}

/**
 * 记录浏览历史
 */
function recordViewHistory(postId: string) {
  if (typeof window === 'undefined') return

  try {
    const history = getViewHistory()
    const newHistory = [{ postId, timestamp: Date.now() }, ...history].slice(0, 1000) // 最多保留 1000 条记录

    localStorage.setItem(VIEW_HISTORY_KEY, JSON.stringify(newHistory))
  } catch (error) {
    console.error('Failed to record view history:', error)
  }
}

/**
 * 获取最受欢迎的文章（按浏览量排序）
 */
export function getPopularPosts(limit = 10): Array<{ postId: string; views: number }> {
  const allViews = getAllViews()

  return Object.entries(allViews)
    .map(([postId, views]) => ({ postId, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, limit)
}

/**
 * 格式化浏览量显示
 */
export function formatViews(views: number): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`
  }
  return views.toString()
}

/**
 * 清除所有浏览数据（开发调试用）
 */
export function clearAllViews() {
  if (typeof window === 'undefined') return

  try {
    localStorage.removeItem(VIEWS_KEY)
    localStorage.removeItem(VIEW_HISTORY_KEY)
  } catch (error) {
    console.error('Failed to clear views:', error)
  }
}
