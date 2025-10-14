'use client'

import { useMDXComponent } from 'next-contentlayer/hooks'
import { MDXComponents } from './MDXComponents'

interface MDXContentProps {
  code: string
}

export default function MDXContent({ code }: MDXContentProps) {
  const Component = useMDXComponent(code)
  return <Component components={MDXComponents} />
}



