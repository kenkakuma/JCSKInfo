import Link from 'next/link'
import Image from 'next/image'
import { Post } from 'contentlayer/generated'
import { formatDate } from '@/lib/utils'
import { Clock, Calendar } from 'lucide-react'

interface PostCardProps {
  post: Post
  readMoreText: string
  readingTimeText: string
}

export default function PostCard({ post, readMoreText, readingTimeText }: PostCardProps) {
  return (
    <article className="card-hover-effect overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
      {post.image && (
        <Link href={post.url} className="block">
          <div className="image-zoom-container relative aspect-video overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="image-zoom object-cover"
            />
          </div>
        </Link>
      )}
      <div className="p-6">
        <div className="mb-3 flex flex-wrap gap-2">
          {post.tags?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700 dark:bg-primary-900 dark:text-primary-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link href={post.url}>
          <h2 className="mb-3 font-serif text-2xl font-medium text-gray-900 transition-colors group-hover:text-primary-600 dark:text-gray-100 dark:group-hover:text-primary-400">
            {post.title}
          </h2>
        </Link>
        <p className="mb-4 line-clamp-3 text-gray-600 dark:text-gray-400">{post.summary}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.date}>{formatDate(post.date, post.lang)}</time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>
                {Math.ceil(post.readingTime.minutes)} {readingTimeText}
              </span>
            </div>
          </div>
          <Link
            href={post.url}
            className="font-medium text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            {readMoreText} →
          </Link>
        </div>
      </div>
    </article>
  )
}
