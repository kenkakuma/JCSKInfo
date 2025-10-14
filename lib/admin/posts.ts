import 'server-only'
import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { ADMIN_CONFIG } from '@/lib/config/admin-config'
import type {
  PostData,
  PostFrontmatter,
  CreatePostInput,
  UpdatePostInput,
  PostStats,
} from './types'
import { Language } from '@/config/site'

/**
 * 生成 slug（从标题）
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * 获取文章文件路径
 */
export function getPostPath(lang: Language, slug: string): string {
  const contentPath = path.join(process.cwd(), ADMIN_CONFIG.posts.contentPath)
  return path.join(contentPath, lang, `${slug}.mdx`)
}

/**
 * 获取所有文章
 */
export async function getAllPosts(lang?: Language): Promise<PostData[]> {
  const contentPath = path.join(process.cwd(), ADMIN_CONFIG.posts.contentPath)
  const posts: PostData[] = []

  const languages = lang ? [lang] : ADMIN_CONFIG.posts.languages

  for (const language of languages) {
    const langDir = path.join(contentPath, language)

    try {
      const files = await fs.readdir(langDir)

      for (const file of files) {
        if (!file.endsWith('.mdx')) continue

        const filepath = path.join(langDir, file)
        const fileContent = await fs.readFile(filepath, 'utf-8')
        const { data, content } = matter(fileContent)

        posts.push({
          frontmatter: data as PostFrontmatter,
          content,
          slug: file.replace('.mdx', ''),
          filepath,
        })
      }
    } catch (error) {
      console.error(`Error reading posts from ${language}:`, error)
    }
  }

  // 按日期排序（最新的在前）
  posts.sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  )

  return posts
}

/**
 * 获取单篇文章
 */
export async function getPost(lang: Language, slug: string): Promise<PostData | null> {
  try {
    const filepath = getPostPath(lang, slug)
    const fileContent = await fs.readFile(filepath, 'utf-8')
    const { data, content } = matter(fileContent)

    return {
      frontmatter: data as PostFrontmatter,
      content,
      slug,
      filepath,
    }
  } catch (error) {
    console.error(`Error reading post ${lang}/${slug}:`, error)
    return null
  }
}

/**
 * 创建文章
 */
export async function createPost(input: CreatePostInput): Promise<PostData> {
  // 生成 slug
  const slug = generateSlug(input.title)
  const filepath = getPostPath(input.lang, slug)

  // 检查文件是否已存在
  try {
    await fs.access(filepath)
    throw new Error(`文章 "${slug}" 已存在`)
  } catch (error: any) {
    if (error.code !== 'ENOENT') {
      throw error
    }
  }

  // 准备 frontmatter
  const frontmatter: PostFrontmatter = {
    title: input.title,
    date: new Date().toISOString(),
    lang: input.lang,
    translationKey: input.translationKey,
    tags: input.tags,
    summary: input.summary,
    image: input.image,
    draft: input.draft,
  }

  // 生成 MDX 内容
  const mdxContent = matter.stringify(input.content, frontmatter)

  // 写入文件
  await fs.writeFile(filepath, mdxContent, 'utf-8')

  return {
    frontmatter,
    content: input.content,
    slug,
    filepath,
  }
}

/**
 * 更新文章
 */
export async function updatePost(input: UpdatePostInput): Promise<PostData> {
  const oldPath = getPostPath(input.lang, input.slug)

  // 检查文件是否存在
  try {
    await fs.access(oldPath)
  } catch {
    throw new Error(`文章 "${input.slug}" 不存在`)
  }

  // 如果标题改变，生成新的 slug
  const newSlug = generateSlug(input.title)
  const newPath = getPostPath(input.lang, newSlug)

  // 准备 frontmatter
  const frontmatter: PostFrontmatter = {
    title: input.title,
    date: new Date().toISOString(),
    lang: input.lang,
    translationKey: input.translationKey,
    tags: input.tags,
    summary: input.summary,
    image: input.image,
    draft: input.draft,
  }

  // 生成 MDX 内容
  const mdxContent = matter.stringify(input.content, frontmatter)

  // 如果 slug 改变，删除旧文件
  if (oldPath !== newPath) {
    await fs.unlink(oldPath)
  }

  // 写入文件
  await fs.writeFile(newPath, mdxContent, 'utf-8')

  return {
    frontmatter,
    content: input.content,
    slug: newSlug,
    filepath: newPath,
  }
}

/**
 * 删除文章
 */
export async function deletePost(lang: Language, slug: string): Promise<void> {
  const filepath = getPostPath(lang, slug)

  try {
    await fs.unlink(filepath)
  } catch (error) {
    console.error(`Error deleting post ${lang}/${slug}:`, error)
    throw new Error(`删除文章失败`)
  }
}

/**
 * 切换草稿状态
 */
export async function toggleDraft(lang: Language, slug: string): Promise<PostData> {
  const post = await getPost(lang, slug)

  if (!post) {
    throw new Error(`文章 "${slug}" 不存在`)
  }

  const updatedFrontmatter = {
    ...post.frontmatter,
    draft: !post.frontmatter.draft,
  }

  const mdxContent = matter.stringify(post.content, updatedFrontmatter)
  await fs.writeFile(post.filepath, mdxContent, 'utf-8')

  return {
    ...post,
    frontmatter: updatedFrontmatter,
  }
}

/**
 * 获取文章统计
 */
export async function getPostStats(): Promise<PostStats> {
  const posts = await getAllPosts()

  const stats: PostStats = {
    total: posts.length,
    published: posts.filter((p) => !p.frontmatter.draft).length,
    draft: posts.filter((p) => p.frontmatter.draft).length,
    byLanguage: {} as Record<Language, number>,
  }

  // 统计每种语言的文章数
  for (const lang of ADMIN_CONFIG.posts.languages) {
    stats.byLanguage[lang as Language] = posts.filter((p) => p.frontmatter.lang === lang).length
  }

  return stats
}

/**
 * 获取最近编辑的文章
 */
export async function getRecentPosts(limit: number = 5) {
  const posts = await getAllPosts()

  return posts.slice(0, limit).map((post) => ({
    title: post.frontmatter.title,
    slug: post.slug,
    lang: post.frontmatter.lang,
    date: post.frontmatter.date,
    draft: post.frontmatter.draft,
  }))
}

/**
 * 检查 translationKey 是否已存在
 */
export async function translationKeyExists(
  translationKey: string,
  excludeLang?: Language,
  excludeSlug?: string
): Promise<boolean> {
  const posts = await getAllPosts()

  return posts.some(
    (post) =>
      post.frontmatter.translationKey === translationKey &&
      !(post.frontmatter.lang === excludeLang && post.slug === excludeSlug)
  )
}
