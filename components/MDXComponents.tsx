import Image from 'next/image'
import AffiliateLink from './AffiliateLink'
import PriceComparison from './PriceComparison'
import { ImgHTMLAttributes } from 'react'

// 智能图片布局组件
// - 第一张图片：70%宽度 + 左浮动 + 文字环绕（桌面端）
// - 其他图片：居中显示
// - 移动端：全部图片全宽显示
const ArticleImg = ({ src, alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <img
      src={src}
      alt={alt || ''}
      className="
        rounded-lg shadow-lg max-w-full h-auto
        w-full md:w-auto
        md:first-of-type:float-left
        md:first-of-type:w-[70%]
        md:first-of-type:mr-6
        md:first-of-type:mb-4
        md:not-first-of-type:mx-auto
        md:not-first-of-type:block
        md:not-first-of-type:max-w-[90%]
      "
      loading="lazy"
      {...props}
    />
  )
}

// 段落组件 - 用于在第一张图片后清除浮动
const ArticleParagraph = ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p className="clear-left" {...props}>
      {children}
    </p>
  )
}

// 自定义图片组件 - 支持对齐方式和样式
const ImageWithCaption = ({
  src,
  alt,
  caption,
  align = 'center',
  width,
  height,
  ...props
}: {
  src: string
  alt: string
  caption?: string
  align?: 'left' | 'center' | 'right'
  width?: number
  height?: number
  [key: string]: any
}) => {
  const alignClass = {
    left: 'mr-auto',
    center: 'mx-auto',
    right: 'ml-auto',
  }[align]

  const wrapperAlign = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align]

  return (
    <figure className={`my-8 ${wrapperAlign}`}>
      <div className={`inline-block ${alignClass}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="rounded-lg shadow-lg"
          {...props}
        />
        {caption && (
          <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {caption}
          </figcaption>
        )}
      </div>
    </figure>
  )
}

export const MDXComponents = {
  img: ArticleImg, // 覆盖默认的 <img> 标签
  p: ArticleParagraph, // 覆盖默认的 <p> 标签，清除浮动
  Image,
  ImageWithCaption,
  AffiliateLink,
  PriceComparison,
}
