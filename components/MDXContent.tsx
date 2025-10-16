'use client'

import { useMDXComponent } from 'next-contentlayer/hooks'
import { MDXComponents } from './MDXComponents'

interface MDXContentProps {
  code: string
  showAdAfterParagraphs?: number // 在第N段后插入广告（暂不使用，避免hydration错误）
}

export default function MDXContent({ code }: MDXContentProps) {
  const Component = useMDXComponent(code)

  const customComponents = {
    ...MDXComponents,
  }

  return <Component components={customComponents} />
}



