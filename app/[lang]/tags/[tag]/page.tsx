import { notFound } from 'next/navigation'
import { allPosts } from 'contentlayer/generated'
import { Language } from '@/config/site'
import { getDictionary } from '@/lib/dictionary'
import { getPostsByTag, decodeTagFromUrl } from '@/lib/utils'
import PostCard from '@/components/PostCard'
import { Metadata } from 'next'
import { Tag } from 'lucide-react'
import Breadcrumb from '@/components/Breadcrumb'

// 生成所有可能的 tag 页面路径
export async function generateStaticParams() {
  const tagsByLang: Record<string, Set<string>> = {
    vi: new Set(),
    ja: new Set(),
    en: new Set(),
  }

  allPosts.forEach((post) => {
    if (post.tags && post.lang) {
      post.tags.forEach((tag) => {
        tagsByLang[post.lang].add(tag)
      })
    }
  })

  const paths: { lang: string; tag: string }[] = []
  Object.entries(tagsByLang).forEach(([lang, tags]) => {
    tags.forEach((tag) => {
      paths.push({
        lang,
        tag: encodeURIComponent(tag),
      })
    })
  })

  return paths
}

// 生成页面 metadata
export async function generateMetadata({
  params,
}: {
  params: { lang: Language; tag: string }
}): Promise<Metadata> {
  const tagName = decodeTagFromUrl(params.tag)
  const dict = await getDictionary(params.lang)
  const posts = getPostsByTag(allPosts, tagName, params.lang)

  return {
    title: `${dict.common.taggedWith} ${tagName}`,
    description: `${posts.length} ${dict.common.postsWithTag}`,
    keywords: tagName,
  }
}

export default async function TagPage({ params }: { params: { lang: Language; tag: string } }) {
  const tagName = decodeTagFromUrl(params.tag)
  const posts = getPostsByTag(allPosts, tagName, params.lang)
  const dict = await getDictionary(params.lang)

  // 如果没有文章，返回 404
  if (posts.length === 0) {
    notFound()
  }

  // 面包屑导航数据
  const breadcrumbItems = [
    { name: dict.common.posts, url: `/${params.lang}/posts` },
    { name: dict.common.allTags, url: `/${params.lang}/tags` },
    { name: `#${tagName}`, url: `/${params.lang}/tags/${params.tag}` },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      {/* 面包屑导航 */}
      <Breadcrumb items={breadcrumbItems} lang={params.lang} homeLabel={dict.common.home} />

      {/* 页面头部 */}
      <div className="mb-12">
        <div className="mb-4 flex items-center gap-3">
          <Tag className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">#{tagName}</h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {posts.length} {dict.common.postsWithTag}
        </p>
      </div>

      {/* 文章列表 */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard
            key={post.slug}
            post={post}
            readMoreText={dict.common.readMore}
            readingTimeText={dict.common.readingTime}
          />
        ))}
      </div>
    </div>
  )
}
