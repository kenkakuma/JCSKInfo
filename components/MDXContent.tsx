'use client'

import { useMDXComponent } from 'next-contentlayer/hooks'
import { MDXComponents } from './MDXComponents'
import { useRef } from 'react'

interface MDXContentProps {
  code: string
  skipFirstImage?: boolean // 新增参数：是否跳过第一张图片
}

export default function MDXContent({ code, skipFirstImage = false }: MDXContentProps) {
  const Component = useMDXComponent(code)
  const imageCountRef = useRef(0)

  // 创建包装的图片组件 - 默认居中
  const WrappedImage = (props: any) => {
    if (skipFirstImage) {
      imageCountRef.current += 1
      // 如果是第一张图片，不渲染
      if (imageCountRef.current === 1) {
        return null
      }
    }

    // 所有图片默认居中并添加样式
    return (
      <figure className="my-8 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img
          {...props}
          className="inline-block rounded-lg shadow-lg mx-auto max-w-full h-auto"
          loading="lazy"
        />
      </figure>
    )
  }

  const customComponents = {
    ...MDXComponents,
    img: WrappedImage,
  }

  return <Component components={customComponents} />
}



