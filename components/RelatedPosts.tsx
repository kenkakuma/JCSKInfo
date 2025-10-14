import Link from 'next/link'
import Image from 'next/image'
import { Post } from 'contentlayer/generated'
import { formatDate } from '@/lib/utils'
import { Clock } from 'lucide-react'

interface RelatedPostsProps {
  posts: Post[]
  title: string
}

export default function RelatedPosts({ posts, title }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700">
      <h2 className="mb-6 font-serif text-2xl font-medium text-gray-900 dark:text-gray-100">
        {title}
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={post.url}
            className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
          >
            {post.image && (
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="mb-2 line-clamp-2 font-serif text-lg font-semibold text-gray-900 group-hover:text-primary-600 dark:text-gray-100 dark:group-hover:text-primary-400">
                {post.title}
              </h3>
              <p className="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                {post.summary}
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                <time dateTime={post.date}>{formatDate(post.date, post.lang)}</time>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{Math.ceil(post.readingTime.minutes)}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
