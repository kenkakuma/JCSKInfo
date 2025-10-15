/**
 * 多语言自动翻译服务
 * 支持 Google Translate, DeepL, OpenAI
 */

import { Language } from '@/config/site'

// 翻译服务类型
export type TranslationService = 'google' | 'deepl' | 'openai'

interface TranslationConfig {
  service: TranslationService
  apiKey: string
}

interface ArticleContent {
  title: string
  summary: string
  body: string
  tags?: string[]
}

/**
 * 使用 Google Translate API 翻译
 */
async function translateWithGoogle(
  text: string,
  targetLang: Language,
  apiKey: string
): Promise<string> {
  const sourceLang = 'en'
  const targetCode = targetLang === 'ja' ? 'ja' : 'vi'

  const response = await fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: text,
        source: sourceLang,
        target: targetCode,
        format: 'text',
      }),
    }
  )

  if (!response.ok) {
    throw new Error(`Google Translate API error: ${response.statusText}`)
  }

  const data = await response.json()
  return data.data.translations[0].translatedText
}

/**
 * 使用 DeepL API 翻译
 */
async function translateWithDeepL(
  text: string,
  targetLang: Language,
  apiKey: string
): Promise<string> {
  const targetCode = targetLang === 'ja' ? 'JA' : 'VI'

  const response = await fetch('https://api-free.deepl.com/v2/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      auth_key: apiKey,
      text: text,
      source_lang: 'EN',
      target_lang: targetCode,
    }),
  })

  if (!response.ok) {
    throw new Error(`DeepL API error: ${response.statusText}`)
  }

  const data = await response.json()
  return data.translations[0].text
}

/**
 * 使用 OpenAI GPT 翻译（更自然，保持上下文）
 */
async function translateWithOpenAI(
  text: string,
  targetLang: Language,
  apiKey: string,
  context?: string
): Promise<string> {
  const targetLanguage = targetLang === 'ja' ? '日语' : '越南语'

  const systemPrompt = `你是一个专业的${targetLanguage}翻译专家，专门翻译科技和金融新闻。
要求：
1. 保持专业术语的准确性
2. 保持原文的语气和风格
3. 对于品牌名称、产品名称保持英文原文
4. 确保翻译自然流畅
5. 保留 Markdown 格式
${context ? `\n上下文信息：${context}` : ''}`

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini', // 使用性价比高的模型
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `请将以下内容翻译成${targetLanguage}：\n\n${text}` },
      ],
      temperature: 0.3, // 降低随机性，提高一致性
    }),
  })

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`)
  }

  const data = await response.json()
  return data.choices[0].message.content
}

/**
 * 批量翻译文章内容
 */
export async function translateArticle(
  content: ArticleContent,
  targetLang: Language,
  config: TranslationConfig
): Promise<ArticleContent> {
  const { service, apiKey } = config

  // 选择翻译函数
  const translateFn = async (text: string, context?: string) => {
    switch (service) {
      case 'google':
        return translateWithGoogle(text, targetLang, apiKey)
      case 'deepl':
        return translateWithDeepL(text, targetLang, apiKey)
      case 'openai':
        return translateWithOpenAI(text, targetLang, apiKey, context)
      default:
        throw new Error(`Unsupported translation service: ${service}`)
    }
  }

  try {
    // 并行翻译标题、摘要、正文
    const [translatedTitle, translatedSummary, translatedBody] = await Promise.all([
      translateFn(content.title, '这是文章标题'),
      translateFn(content.summary, '这是文章摘要'),
      translateFn(content.body, '这是文章正文，包含 Markdown 格式'),
    ])

    // 标签可选翻译（建议保持英文）
    const translatedTags = content.tags // 通常标签保持英文

    return {
      title: translatedTitle,
      summary: translatedSummary,
      body: translatedBody,
      tags: translatedTags,
    }
  } catch (error) {
    console.error('Translation error:', error)
    throw error
  }
}

/**
 * 估算翻译成本
 */
export function estimateTranslationCost(
  content: ArticleContent,
  service: TranslationService
): { characters: number; estimatedCost: number; currency: string } {
  const totalText = `${content.title} ${content.summary} ${content.body}`
  const characters = totalText.length

  let costPerMillion = 0
  let currency = 'USD'

  switch (service) {
    case 'google':
      costPerMillion = 20
      break
    case 'deepl':
      costPerMillion = 25
      break
    case 'openai':
      // GPT-4o-mini: $0.150/1M input tokens, 约 4 字符 = 1 token
      costPerMillion = (0.15 * characters) / 4 / 1000000
      break
  }

  const estimatedCost = (characters / 1000000) * costPerMillion

  return {
    characters,
    estimatedCost: Math.round(estimatedCost * 100) / 100,
    currency,
  }
}

/**
 * 检测文本语言
 */
export async function detectLanguage(text: string, apiKey: string): Promise<string> {
  const response = await fetch(
    `https://translation.googleapis.com/language/translate/v2/detect?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: text }),
    }
  )

  if (!response.ok) {
    throw new Error('Language detection failed')
  }

  const data = await response.json()
  return data.data.detections[0][0].language
}

