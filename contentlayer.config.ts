import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import readingTime from 'reading-time'
import { slug } from 'github-slugger'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'date',
      required: true,
    },
    lang: {
      type: 'enum',
      options: ['vi', 'ja', 'en'],
      required: true,
    },
    translationKey: {
      type: 'string',
      required: true,
      description: '用于关联不同语言版本的文章',
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      default: [],
    },
    summary: {
      type: 'string',
      required: true,
    },
    image: {
      type: 'string',
      required: false,
    },
    draft: {
      type: 'boolean',
      default: false,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => {
        const parts = doc._raw.flattenedPath.split('/')
        return parts[parts.length - 1]
      },
    },
    slugAsParams: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
    },
    readingTime: {
      type: 'json',
      resolve: (doc) => readingTime(doc.body.raw),
    },
    url: {
      type: 'string',
      resolve: (doc) => {
        const parts = doc._raw.flattenedPath.split('/')
        const lang = parts[1] // posts/vi/xxx or posts/ja/xxx
        const slug = parts[parts.length - 1]
        return `/${lang}/posts/${slug}`
      },
    },
    image: {
      type: 'string',
      resolve: (doc) => {
        // 如果 frontmatter 中已经设置了 image，优先使用
        if (doc.image) {
          return doc.image
        }
        
        // 否则从正文中提取第一张图片
        const content = doc.body.raw
        
        // 匹配 Markdown 图片语法: ![alt](url) 
        // 支持绝对路径 (https://...) 和相对路径 (/images/...)
        const markdownImageRegex = /!\[.*?\]\(([^\s)]+)\)/
        const markdownMatch = content.match(markdownImageRegex)
        if (markdownMatch) {
          return markdownMatch[1]
        }
        
        // 匹配 HTML img 标签: <img src="url" />
        const htmlImageRegex = /<img[^>]+src=["']([^"']+)["']/
        const htmlMatch = content.match(htmlImageRegex)
        if (htmlMatch) {
          return htmlMatch[1]
        }
        
        // 如果都没有找到，返回 undefined
        return undefined
      },
    },
  },
}))

export default makeSource({
  contentDirPath: './content',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: ['anchor'],
          },
        },
      ],
      [
        rehypePrettyCode as any,
        {
          theme: 'github-dark',
          keepBackground: false,
        },
      ],
    ],
  },
})
