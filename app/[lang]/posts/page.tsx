import { allPosts } from 'contentlayer/generated'
import { Language } from '@/config/site'
import { getDictionary } from '@/lib/dictionary'
import { getPostsByLang } from '@/lib/utils'
import PostCard from '@/components/PostCard'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { lang: Language } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang)

  return {
    title: dict.nav.posts,
    description: dict.seo.defaultDescription,
  }
}

export default async function PostsPage({ params }: { params: { lang: Language } }) {
  const dict = await getDictionary(params.lang)
  const posts = getPostsByLang(allPosts, params.lang)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">
          {dict.common.allPosts}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {params.lang === 'vi'
            ? `Tìm thấy ${posts.length} bài viết`
            : `${posts.length}件の記事が見つかりました`}
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">{dict.common.noPosts}</p>
      ) : (
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
      )}
    </div>
  )
}




