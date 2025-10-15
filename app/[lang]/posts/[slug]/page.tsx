import { notFound } from 'next/navigation'
import { allPosts } from 'contentlayer/generated'
import { Language } from '@/config/site'
import { getDictionary } from '@/lib/dictionary'
import { formatDate, getRelatedPosts, getTranslatedPost } from '@/lib/utils'
import Image from 'next/image'
import { Calendar, Clock } from 'lucide-react'
import ShareButtons from '@/components/ShareButtons'
import RelatedPosts from '@/components/RelatedPosts'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import MDXContent from '@/components/MDXContent'
import { DisplayAd, InArticleAd } from '@/components/AdSense'
import { Metadata } from 'next'
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd'
import Breadcrumb from '@/components/Breadcrumb'
import ReadingProgress from '@/components/ReadingProgress'
import BackToTop from '@/components/BackToTop'

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    lang: post.lang,
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { lang: Language; slug: string }
}): Promise<Metadata> {
  const post = allPosts.find((post) => post.slug === params.slug && post.lang === params.lang)

  if (!post) {
    return {}
  }

  const ogImage = post.image || `${process.env.NEXT_PUBLIC_SITE_URL}/og-${params.lang}.jpg`

  // 生成 keywords
  const keywords = [
    ...(post.tags || []),
    post.title.split(' ').slice(0, 3).join(' '), // 从标题提取关键词
  ].join(', ')

  return {
    title: post.title,
    description: post.summary,
    keywords: keywords,
    authors: [{ name: 'JetCode·SKI Team' }],
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.date,
      url: post.url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: [ogImage],
    },
    alternates: {
      canonical: post.url,
      languages: {
        [params.lang]: post.url,
      },
    },
  }
}

export default async function PostPage({ params }: { params: { lang: Language; slug: string } }) {
  const post = allPosts.find((post) => post.slug === params.slug && post.lang === params.lang)

  if (!post) {
    notFound()
  }

  const dict = await getDictionary(params.lang)
  const relatedPosts = getRelatedPosts(post, allPosts, 3)

  // 查找翻译版本
  const translatedPost = getTranslatedPost(
    allPosts,
    post.translationKey,
    params.lang === 'vi' ? 'ja' : 'vi'
  )

  // 面包屑导航数据
  const breadcrumbItems = [
    { name: dict.common.posts, url: `/${params.lang}/posts` },
    { name: post.title, url: post.url },
  ]

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jcski.com'

  return (
    <>
      {/* 阅读进度条 */}
      <ReadingProgress />

      {/* 结构化数据 - Article */}
      <ArticleJsonLd post={post} url={`${siteUrl}${post.url}`} />

      {/* 结构化数据 - Breadcrumb */}
      <BreadcrumbJsonLd items={breadcrumbItems.map((item) => ({ name: item.name, url: `${siteUrl}${item.url}` }))} />

      <article className="container mx-auto px-4 py-12">
        {/* 面包屑导航 */}
        <Breadcrumb items={breadcrumbItems} lang={params.lang} homeLabel={dict.common.home} />

        {/* 语言切换器 */}
        <div className="mb-6 flex justify-end">
          <LanguageSwitcher currentLang={params.lang} translationUrl={translatedPost?.url} />
        </div>

        {/* 文章头部 */}
        <header className="mb-8">
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700 dark:bg-primary-900 dark:text-primary-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mb-6 font-serif text-4xl font-medium text-gray-900 dark:text-gray-100 md:text-5xl">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <time dateTime={post.date}>{formatDate(post.date, params.lang)}</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>
                {Math.ceil(post.readingTime.minutes)} {dict.common.readingTime}
              </span>
            </div>
          </div>
        </header>

        {/* 特色图片 */}
        {post.image && (
          <div className="relative mb-8 aspect-video overflow-hidden rounded-lg">
            <Image src={post.image} alt={post.title} fill className="object-cover" priority />
          </div>
        )}

        {/* 顶部广告 - 响应式展示广告 */}
        <div className="mx-auto mb-8 max-w-3xl">
          <DisplayAd adSlot="1234567890" />
        </div>

        {/* 文章内容 */}
        <div className="prose prose-lg mx-auto dark:prose-dark">
          <MDXContent code={post.body.code} />
        </div>

        {/* 文章内广告 */}
        <div className="mx-auto my-8 max-w-3xl">
          <InArticleAd adSlot="1234567891" />
        </div>

        {/* 分享按钮 */}
        <div className="mx-auto mt-12 max-w-3xl border-t border-gray-200 pt-8 dark:border-gray-700">
          <ShareButtons url={post.url} title={post.title} lang={params.lang} />
        </div>

        {/* 联盟声明 */}
        <div className="mx-auto mt-8 max-w-3xl rounded-lg bg-gray-50 p-4 text-sm text-gray-600 dark:bg-gray-800 dark:text-gray-400">
          ℹ️ {dict.post.affiliateDisclosure}
        </div>

        {/* 相关文章 */}
        <div className="mx-auto max-w-6xl">
          <RelatedPosts posts={relatedPosts} title={dict.common.relatedPosts} />
        </div>
      </article>

      {/* 返回顶部按钮 */}
      <BackToTop />
    </>
  )
}
