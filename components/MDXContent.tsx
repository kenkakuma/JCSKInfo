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

  // 创建包装的图片组件
  const WrappedImage = (props: any) => {
    if (skipFirstImage) {
      imageCountRef.current += 1
      // 如果是第一张图片，不渲染
      if (imageCountRef.current === 1) {
        return null
      }
    }

    // 如果 props 中有 src，使用标准的 img 标签（MDX 自动转换）
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} className="rounded-lg" />
  }

  const customComponents = {
    ...MDXComponents,
    img: WrappedImage,
  }

  return <Component components={customComponents} />
}



