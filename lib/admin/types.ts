import { Language } from '@/config/site'

// 认证相关类型
export interface AdminUser {
  username: string
  isAuthenticated: boolean
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface AuthResponse {
  success: boolean
  message?: string
  token?: string
  user?: AdminUser
}

// 文章相关类型
export interface PostFrontmatter {
  title: string
  date: string
  lang: Language
  translationKey: string
  tags: string[]
  summary: string
  image?: string
  draft: boolean
}

export interface PostData {
  frontmatter: PostFrontmatter
  content: string
  slug: string
  filepath: string
}

export interface CreatePostInput {
  title: string
  lang: Language
  translationKey: string
  tags: string[]
  summary: string
  image?: string
  content: string
  draft: boolean
}

export interface UpdatePostInput extends CreatePostInput {
  slug: string
}

// 统计数据类型
export interface PostStats {
  total: number
  published: number
  draft: number
  byLanguage: Record<Language, number>
}

export interface DashboardStats {
  posts: PostStats
  recentPosts: Array<{
    title: string
    slug: string
    lang: Language
    date: string
    draft: boolean
  }>
  languageStats?: {
    vi: number
    ja: number
    en: number
  }
  topTags?: Array<{
    tag: string
    count: number
  }>
  monthlyPosts?: Array<{
    month: string
    count: number
  }>
}

// API 响应类型
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
