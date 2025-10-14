// 点赞功能管理
const LIKES_STORAGE_KEY = 'post_likes'
const USER_LIKES_KEY = 'user_liked_posts'

// 获取所有文章的点赞数据
export function getAllLikes(): Record<string, number> {
  if (typeof window === 'undefined') return {}

  const stored = localStorage.getItem(LIKES_STORAGE_KEY)
  return stored ? JSON.parse(stored) : {}
}

// 获取用户点赞的文章列表
export function getUserLikes(): Set<string> {
  if (typeof window === 'undefined') return new Set()

  const stored = localStorage.getItem(USER_LIKES_KEY)
  return stored ? new Set(JSON.parse(stored)) : new Set()
}

// 获取特定文章的点赞数
export function getLikeCount(postId: string): number {
  const likes = getAllLikes()
  return likes[postId] || 0
}

// 检查用户是否点赞了某文章
export function isLiked(postId: string): boolean {
  const userLikes = getUserLikes()
  return userLikes.has(postId)
}

// 切换点赞状态
export function toggleLike(postId: string): { liked: boolean; count: number } {
  const allLikes = getAllLikes()
  const userLikes = getUserLikes()

  const currentCount = allLikes[postId] || 0
  const wasLiked = userLikes.has(postId)

  if (wasLiked) {
    // 取消点赞
    allLikes[postId] = Math.max(0, currentCount - 1)
    userLikes.delete(postId)
  } else {
    // 添加点赞
    allLikes[postId] = currentCount + 1
    userLikes.add(postId)
  }

  // 保存到 localStorage
  localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(allLikes))
  localStorage.setItem(USER_LIKES_KEY, JSON.stringify([...userLikes]))

  return {
    liked: !wasLiked,
    count: allLikes[postId],
  }
}

// 获取点赞数最多的文章
export function getTopLikedPosts(limit: number = 10): Array<{ postId: string; count: number }> {
  const allLikes = getAllLikes()

  return Object.entries(allLikes)
    .map(([postId, count]) => ({ postId, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
}

