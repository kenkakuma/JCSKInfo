import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/admin/auth'
import { translateArticle, estimateTranslationCost, TranslationService } from '@/lib/translate'
import { allPosts } from 'contentlayer/generated'
import { Language } from '@/config/site'
import fs from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  try {
    await requireAuth()

    const body = await request.json()
    const { translationKey, targetLang, service, apiKey } = body

    if (!translationKey || !targetLang || !service || !apiKey) {
      return NextResponse.json(
        { success: false, message: '缺少必要参数' },
        { status: 400 }
      )
    }

    // 查找英文原文
    const sourcePost = allPosts.find(
      (post) => post.translationKey === translationKey && post.lang === 'en'
    )

    if (!sourcePost) {
      return NextResponse.json(
        {
          success: false,
          message: `未找到英文原文（translationKey: ${translationKey}）`,
        },
        { status: 404 }
      )
    }

    // 准备翻译内容
    const content = {
      title: sourcePost.title,
      summary: sourcePost.summary,
      body: sourcePost.body.raw,
      tags: sourcePost.tags,
    }

    // 估算成本
    const costEstimate = estimateTranslationCost(content, service as TranslationService)

    // 执行翻译
    const translated = await translateArticle(content, targetLang as Language, {
      service: service as TranslationService,
      apiKey,
    })

    // 生成新文件内容
    const frontmatter = `---
translationKey: '${translationKey}'
title: ${translated.title}
date: ${sourcePost.date}
lang: ${targetLang}
tags:
${translated.tags?.map((tag) => `  - ${tag}`).join('\n') || ''}
summary: ${translated.summary}
${sourcePost.image ? `image: '${sourcePost.image}'` : ''}
draft: false
---
`

    const newFileContent = frontmatter + '\n' + translated.body

    // 写入文件
    const fileName = `${sourcePost.slug}.mdx`
    const filePath = path.join(process.cwd(), 'content', 'posts', targetLang, fileName)

    await fs.writeFile(filePath, newFileContent, 'utf-8')

    return NextResponse.json({
      success: true,
      message: `文章已成功翻译为${targetLang === 'ja' ? '日语' : '越南语'}`,
      data: {
        filePath: `content/posts/${targetLang}/${fileName}`,
        characters: costEstimate.characters,
        cost: costEstimate.estimatedCost,
        currency: costEstimate.currency,
        translatedTitle: translated.title,
      },
    })
  } catch (error: any) {
    console.error('Translation error:', error)
    return NextResponse.json(
      {
        success: false,
        message: error.message || '翻译失败',
      },
      { status: 500 }
    )
  }
}

