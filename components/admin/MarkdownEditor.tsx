'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Code,
  Eye,
  EyeOff,
} from 'lucide-react'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  onImageInsert?: () => void
}

export default function MarkdownEditor({ value, onChange, onImageInsert }: MarkdownEditorProps) {
  const [showPreview, setShowPreview] = useState(true)
  const [textareaRef, setTextareaRef] = useState<HTMLTextAreaElement | null>(null)

  // 自动保存到 localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      if (value) {
        localStorage.setItem('admin_draft_content', value)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [value])

  // 恢复草稿
  useEffect(() => {
    const draft = localStorage.getItem('admin_draft_content')
    if (draft && !value) {
      if (confirm('检测到未保存的草稿，是否恢复？')) {
        onChange(draft)
      }
    }
  }, [])

  const insertText = useCallback(
    (before: string, after: string = '', placeholder: string = '') => {
      if (!textareaRef) return

      const start = textareaRef.selectionStart
      const end = textareaRef.selectionEnd
      const selectedText = value.substring(start, end)
      const text = selectedText || placeholder

      const newValue = value.substring(0, start) + before + text + after + value.substring(end)

      onChange(newValue)

      // 设置光标位置
      setTimeout(() => {
        textareaRef.focus()
        const newCursorPos = start + before.length + text.length
        textareaRef.setSelectionRange(newCursorPos, newCursorPos)
      }, 0)
    },
    [textareaRef, value, onChange]
  )

  const toolbarButtons = [
    {
      icon: Bold,
      label: '粗体',
      action: () => insertText('**', '**', '粗体文字'),
    },
    {
      icon: Italic,
      label: '斜体',
      action: () => insertText('*', '*', '斜体文字'),
    },
    {
      icon: Heading1,
      label: '标题1',
      action: () => insertText('# ', '', '标题1'),
    },
    {
      icon: Heading2,
      label: '标题2',
      action: () => insertText('## ', '', '标题2'),
    },
    {
      icon: Heading3,
      label: '标题3',
      action: () => insertText('### ', '', '标题3'),
    },
    {
      icon: List,
      label: '无序列表',
      action: () => insertText('- ', '', '列表项'),
    },
    {
      icon: ListOrdered,
      label: '有序列表',
      action: () => insertText('1. ', '', '列表项'),
    },
    {
      icon: LinkIcon,
      label: '链接',
      action: () => insertText('[', '](https://)', '链接文字'),
    },
    {
      icon: ImageIcon,
      label: '图片',
      action: () => {
        if (onImageInsert) {
          onImageInsert()
        } else {
          insertText('![', '](https://)', '图片描述')
        }
      },
    },
    {
      icon: Code,
      label: '代码块',
      action: () => insertText('```\n', '\n```', '代码'),
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      {/* 工具栏 */}
      <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-2 dark:border-gray-700 dark:bg-gray-900">
        <div className="flex flex-wrap gap-1">
          {toolbarButtons.map((button, index) => (
            <button
              key={index}
              type="button"
              onClick={button.action}
              title={button.label}
              className="rounded p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
            >
              <button.icon size={18} />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          {showPreview ? (
            <>
              <EyeOff size={16} />
              隐藏预览
            </>
          ) : (
            <>
              <Eye size={16} />
              显示预览
            </>
          )}
        </button>
      </div>

      {/* 编辑器区域 */}
      <div className={`grid gap-4 ${showPreview ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
        {/* 编辑器 */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Markdown 编辑
          </label>
          <textarea
            ref={setTextareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="min-h-[500px] w-full rounded-lg border border-gray-300 p-4 font-mono text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="在这里输入 Markdown 内容..."
          />
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            💾 内容会自动保存到本地草稿
          </p>
        </div>

        {/* 预览 */}
        {showPreview && (
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              预览
            </label>
            <div className="min-h-[500px] rounded-lg border border-gray-300 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-900">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                {value ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: convertMarkdownToHtml(value),
                    }}
                  />
                ) : (
                  <p className="text-gray-400">预览将显示在这里...</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// 简单的 Markdown 转 HTML（用于预览）
function convertMarkdownToHtml(markdown: string): string {
  let html = markdown

  // 代码块
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')

  // 标题
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')

  // 粗体和斜体
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')

  // 链接
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')

  // 图片
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')

  // 列表
  html = html.replace(/^\* (.+)$/gim, '<li>$1</li>')
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')

  // 换行
  html = html.replace(/\n/g, '<br />')

  return html
}
