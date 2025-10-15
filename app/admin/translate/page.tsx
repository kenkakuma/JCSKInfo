'use client'

import { useState } from 'react'
import { Globe, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { TranslationService } from '@/lib/translate'

export default function TranslateArticlePage() {
  const [service, setService] = useState<TranslationService>('google')
  const [apiKey, setApiKey] = useState('')
  const [translationKey, setTranslationKey] = useState('')
  const [targetLang, setTargetLang] = useState<'ja' | 'vi'>('ja')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    message: string
    data?: any
  } | null>(null)

  const handleTranslate = async () => {
    if (!apiKey || !translationKey) {
      alert('请填写 API Key 和 Translation Key')
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/admin/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          translationKey,
          targetLang,
          service,
          apiKey,
        }),
      })

      const data = await response.json()
      setResult(data)
    } catch (error: any) {
      setResult({
        success: false,
        message: error.message || '翻译失败',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
          🌐 自动翻译文章
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          将英文文章自动翻译为日语或越南语
        </p>
      </div>

      {/* 配置表单 */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        {/* 翻译服务选择 */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            翻译服务
          </label>
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: 'google', label: 'Google Translate', desc: '推荐 · 性价比高' },
              { value: 'deepl', label: 'DeepL', desc: '质量最佳' },
              { value: 'openai', label: 'OpenAI GPT', desc: '最自然' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setService(option.value as TranslationService)}
                className={`rounded-lg border-2 p-4 text-left transition-all ${
                  service === option.value
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
                }`}
              >
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  {option.label}
                </div>
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {option.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* API Key */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            API Key
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder={
              service === 'google'
                ? 'Google Cloud API Key'
                : service === 'deepl'
                  ? 'DeepL API Key'
                  : 'OpenAI API Key'
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-600 dark:bg-gray-800"
          />
          <p className="mt-1 text-xs text-gray-500">
            {service === 'google' && '在 Google Cloud Console 创建 API Key'}
            {service === 'deepl' && '在 DeepL 官网注册免费账号获取'}
            {service === 'openai' && '在 OpenAI 平台获取 API Key'}
          </p>
        </div>

        {/* Translation Key */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Translation Key（文章标识）
          </label>
          <input
            type="text"
            value={translationKey}
            onChange={(e) => setTranslationKey(e.target.value)}
            placeholder="例如: microsoft-windows"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-600 dark:bg-gray-800"
          />
          <p className="mt-1 text-xs text-gray-500">
            在 CMS 中设置的 translationKey 字段
          </p>
        </div>

        {/* 目标语言 */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            目标语言
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => setTargetLang('ja')}
              className={`flex-1 rounded-lg border-2 p-3 transition-all ${
                targetLang === 'ja'
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
              }`}
            >
              <div className="text-2xl">🇯🇵</div>
              <div className="mt-1 font-medium">日语</div>
            </button>
            <button
              onClick={() => setTargetLang('vi')}
              className={`flex-1 rounded-lg border-2 p-3 transition-all ${
                targetLang === 'vi'
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
              }`}
            >
              <div className="text-2xl">🇻🇳</div>
              <div className="mt-1 font-medium">越南语</div>
            </button>
          </div>
        </div>

        {/* 翻译按钮 */}
        <button
          onClick={handleTranslate}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-6 py-3 font-medium text-white transition-colors hover:bg-primary-700 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              翻译中...
            </>
          ) : (
            <>
              <Globe className="h-5 w-5" />
              开始翻译
            </>
          )}
        </button>
      </div>

      {/* 翻译结果 */}
      {result && (
        <div
          className={`mt-6 rounded-xl border p-6 ${
            result.success
              ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
              : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
          }`}
        >
          <div className="flex items-start gap-3">
            {result.success ? (
              <CheckCircle className="h-6 w-6 text-green-600" />
            ) : (
              <AlertCircle className="h-6 w-6 text-red-600" />
            )}
            <div className="flex-1">
              <h3
                className={`mb-2 font-semibold ${
                  result.success ? 'text-green-900' : 'text-red-900'
                }`}
              >
                {result.success ? '✅ 翻译成功！' : '❌ 翻译失败'}
              </h3>
              <p
                className={`text-sm ${
                  result.success ? 'text-green-700' : 'text-red-700'
                }`}
              >
                {result.message}
              </p>

              {result.success && result.data && (
                <div className="mt-4 space-y-2 text-sm">
                  <div>
                    <span className="font-medium">生成的文件：</span>
                    <code className="ml-2 rounded bg-green-100 px-2 py-1 dark:bg-green-900">
                      {result.data.filePath}
                    </code>
                  </div>
                  <div>
                    <span className="font-medium">字符数：</span>
                    <span className="ml-2">{result.data.characters}</span>
                  </div>
                  <div>
                    <span className="font-medium">预计费用：</span>
                    <span className="ml-2">
                      ${result.data.cost} {result.data.currency}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 使用说明 */}
      <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-900/20">
        <h3 className="mb-3 font-semibold text-blue-900 dark:text-blue-400">
          📖 使用说明
        </h3>
        <ol className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
          <li>1. 先在 CMS 中创建并发布英文文章</li>
          <li>2. 记下文章的 translationKey（例如: microsoft-windows）</li>
          <li>3. 选择翻译服务并填写 API Key</li>
          <li>4. 点击"开始翻译"，系统会自动创建对应语言的文章文件</li>
          <li>5. 在 CMS 中审核并发布翻译后的文章</li>
        </ol>
      </div>

      {/* API Key 获取指南 */}
      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">
          🔑 API Key 获取指南
        </h3>
        <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
          <div>
            <strong className="text-gray-900 dark:text-gray-100">Google Translate:</strong>
            <p className="mt-1">
              1. 访问{' '}
              <a
                href="https://console.cloud.google.com"
                target="_blank"
                rel="noopener"
                className="text-primary-600 hover:underline"
              >
                Google Cloud Console
              </a>
            </p>
            <p>2. 启用 Cloud Translation API</p>
            <p>3. 创建 API Key（免费额度: 50万字符/月）</p>
          </div>

          <div>
            <strong className="text-gray-900 dark:text-gray-100">DeepL:</strong>
            <p className="mt-1">
              1. 访问{' '}
              <a
                href="https://www.deepl.com/pro-api"
                target="_blank"
                rel="noopener"
                className="text-primary-600 hover:underline"
              >
                DeepL API
              </a>
            </p>
            <p>2. 注册免费账号（50万字符/月）</p>
            <p>3. 在账户设置中获取 API Key</p>
          </div>

          <div>
            <strong className="text-gray-900 dark:text-gray-100">OpenAI:</strong>
            <p className="mt-1">
              1. 访问{' '}
              <a
                href="https://platform.openai.com"
                target="_blank"
                rel="noopener"
                className="text-primary-600 hover:underline"
              >
                OpenAI Platform
              </a>
            </p>
            <p>2. 创建账号并充值</p>
            <p>3. 在 API Keys 页面创建密钥</p>
          </div>
        </div>
      </div>
    </div>
  )
}

