import Image from 'next/image'
import AffiliateLink from './AffiliateLink'
import PriceComparison from './PriceComparison'

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
  Image,
  ImageWithCaption,
  AffiliateLink,
  PriceComparison,
}
