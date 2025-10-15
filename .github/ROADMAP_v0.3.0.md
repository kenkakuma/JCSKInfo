# 🚀 v0.3.0-beta 开发计划

> **版本代码名**: "Monetization & Analytics"  
> **预计发布时间**: 2025-11-15  
> **当前状态**: 📋 规划中

---

## 📋 目录

- [版本概览](#版本概览)
- [核心功能](#核心功能)
- [技术方案](#技术方案)
- [开发任务](#开发任务)
- [实施计划](#实施计划)
- [测试计划](#测试计划)

---

## 🎯 版本概览

v0.3.0 将专注于**商业化能力**和**数据分析**，为网站提供收入来源和性能监控能力。

### 核心目标

✅ 实现图片直接上传功能，提升内容编辑体验  
✅ 集成 Google AdSense，实现网站盈利  
✅ 部署监控系统，实时追踪网站性能和用户行为  
✅ 保持现有功能稳定性和用户体验  

### 关键指标

- **图片上传**: 支持拖拽上传，最大 10MB，自动优化
- **广告收入**: 实现广告自动化投放，预期点击率 > 1%
- **监控覆盖**: 100% 页面覆盖，实时数据追踪
- **性能影响**: 广告和监控代码对页面加载时间影响 < 200ms

---

## ✨ 核心功能

### 1. 图片上传系统 (Cloudinary 集成)

#### 功能描述

在 Sveltia CMS 中直接上传图片到 Cloudinary，无需手动管理图片文件。

#### 核心特性

- **拖拽上传**: 支持拖拽和点击上传
- **多图上传**: 一次上传多张图片
- **实时预览**: 上传后立即预览
- **自动优化**: 自动压缩和格式转换（WebP）
- **CDN 加速**: 通过 Cloudinary CDN 全球加速
- **响应式图片**: 自动生成多尺寸图片

#### 用户体验

```
1. 在 CMS 中点击 "上传图片"
2. 选择文件或拖拽图片
3. 自动上传到 Cloudinary
4. 返回图片 URL
5. 插入到文章中
```

#### 技术指标

- 支持格式: JPG, PNG, GIF, WebP
- 最大尺寸: 10MB
- 上传速度: < 3 秒（1MB 图片）
- CDN 延迟: < 100ms（全球平均）

---

### 2. Google AdSense 广告系统

#### 功能描述

在网站合适位置展示 Google AdSense 广告，实现网站盈利。

#### 广告位置

##### 文章页面
- **页首广告**: 导航栏下方（728x90 横幅）
- **内容中广告**: 文章内容中间（自适应）
- **侧边栏广告**: 右侧小组件上方（300x250）
- **页尾广告**: 文章底部（自适应）

##### 首页
- **首屏广告**: Hero 卡片下方（自适应）
- **列表中广告**: 文章列表中（原生广告）

##### 列表页
- **顶部广告**: 列表上方（728x90）
- **列表中广告**: 每 6 篇文章插入 1 个广告

#### 广告策略

- **自适应广告**: 根据屏幕尺寸自动调整
- **延迟加载**: 用户滚动到广告位置才加载
- **A/B 测试**: 测试不同广告位置的效果
- **频率控制**: 避免广告过多影响用户体验

#### 技术实现

- **异步加载**: 不阻塞页面渲染
- **错误处理**: 广告加载失败不影响页面
- **性能优化**: 使用 Intersection Observer 延迟加载
- **隐私保护**: 符合 GDPR 和 CCPA 要求

---

### 3. 监控系统 (Google Analytics 4 + Vercel Analytics)

#### 功能描述

实时追踪网站性能、用户行为和业务指标。

#### 监控维度

##### 用户行为分析 (Google Analytics 4)

- **页面浏览量**: PV、UV、跳出率
- **用户流程**: 用户路径、转化漏斗
- **内容分析**: 热门文章、阅读时长
- **搜索分析**: 搜索关键词、站内搜索
- **事件追踪**: 点击、滚动、分享、下载

##### 性能监控 (Vercel Analytics)

- **Web Vitals**: LCP、FID、CLS、TTFB
- **页面加载**: 首屏时间、完整加载时间
- **资源性能**: 图片、脚本、样式加载时间
- **错误监控**: JavaScript 错误、API 错误
- **地理分布**: 不同地区的访问速度

##### 商业指标

- **广告展示**: 展示次数、点击率、收入
- **用户留存**: 回访率、留存率
- **内容效果**: 阅读完成率、分享率
- **转化追踪**: 目标完成、ROI

#### 监控仪表盘

创建自定义仪表盘，实时展示关键指标：

```
┌─────────────────────────────────────────────┐
│  📊 JetCode·SKI 监控仪表盘                  │
├─────────────────────────────────────────────┤
│  今日概览                                   │
│  • 页面浏览: 1,234 PV                       │
│  • 独立访客: 567 UV                         │
│  • 平均停留: 2:34                           │
│  • 跳出率: 45%                              │
├─────────────────────────────────────────────┤
│  性能指标                                   │
│  • LCP: 1.2s ✅                             │
│  • FID: 45ms ✅                             │
│  • CLS: 0.05 ✅                             │
├─────────────────────────────────────────────┤
│  广告收入                                   │
│  • 展示次数: 3,456                          │
│  • 点击次数: 45                             │
│  • 收入: $12.34                             │
└─────────────────────────────────────────────┘
```

---

## 🔧 技术方案

### 1. 图片上传 - Cloudinary 集成

#### 技术栈

- **服务**: Cloudinary (免费额度: 25GB 存储 + 25GB 带宽/月)
- **上传方式**: Unsigned Upload (无需后端签名)
- **集成方式**: Sveltia CMS Widget + API Route

#### 实现步骤

##### Step 1: 注册 Cloudinary

```bash
1. 访问 https://cloudinary.com
2. 注册免费账户
3. 获取 Cloud Name
4. 配置 Upload Preset (unsigned)
```

##### Step 2: 配置环境变量

```bash
# .env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_preset
```

##### Step 3: 更新 Sveltia CMS 配置

```yaml
# public/cms/config.yml
media_folder: public/images/posts
public_folder: /images/posts

# 添加 Cloudinary 配置
media_library:
  name: cloudinary
  config:
    cloud_name: your_cloud_name
    api_key: your_api_key
```

##### Step 4: 创建图片上传 API

```typescript
// app/api/upload/image/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    // 上传到 Cloudinary
    const cloudinaryFormData = new FormData()
    cloudinaryFormData.append('file', file)
    cloudinaryFormData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!)
    
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: cloudinaryFormData,
      }
    )
    
    const data = await response.json()
    
    return NextResponse.json({
      success: true,
      url: data.secure_url,
      publicId: data.public_id,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Upload failed' },
      { status: 500 }
    )
  }
}
```

##### Step 5: 集成到 CMS

在 Sveltia CMS 中添加自定义图片上传按钮和处理逻辑。

#### 图片优化策略

```typescript
// lib/cloudinary.ts
export function getOptimizedImageUrl(
  publicId: string,
  options: {
    width?: number
    height?: number
    quality?: number
    format?: 'auto' | 'webp' | 'avif'
  } = {}
) {
  const { width, height, quality = 'auto', format = 'auto' } = options
  
  const baseUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`
  
  const transformations = [
    width && `w_${width}`,
    height && `h_${height}`,
    `q_${quality}`,
    `f_${format}`,
    'c_limit',
  ].filter(Boolean).join(',')
  
  return `${baseUrl}/${transformations}/${publicId}`
}
```

---

### 2. Google AdSense 集成

#### 技术栈

- **服务**: Google AdSense
- **加载方式**: 异步脚本 + 延迟加载
- **管理方式**: 自动广告 + 手动广告单元

#### 实现步骤

##### Step 1: 注册 Google AdSense

```bash
1. 访问 https://www.google.com/adsense
2. 注册账户并添加网站
3. 等待审核通过（通常 1-2 周）
4. 获取 Publisher ID (ca-pub-xxxxx)
```

##### Step 2: 添加 AdSense 脚本

```typescript
// app/layout.tsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {/* Google AdSense */}
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

##### Step 3: 创建广告组件

```typescript
// components/ads/AdUnit.tsx
'use client'

import { useEffect, useRef } from 'react'

interface AdUnitProps {
  slot: string
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical'
  responsive?: boolean
  style?: React.CSSProperties
}

export function AdUnit({ slot, format = 'auto', responsive = true, style }: AdUnitProps) {
  const adRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (adRef.current && window.adsbygoogle) {
      try {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (error) {
        console.error('AdSense error:', error)
      }
    }
  }, [])
  
  return (
    <div className="ad-container" style={style}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  )
}
```

##### Step 4: 延迟加载广告

```typescript
// components/ads/LazyAdUnit.tsx
'use client'

import { useEffect, useState, useRef } from 'react'
import { AdUnit } from './AdUnit'

export function LazyAdUnit(props: AdUnitProps) {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    
    if (containerRef.current) {
      observer.observe(containerRef.current)
    }
    
    return () => observer.disconnect()
  }, [])
  
  return (
    <div ref={containerRef}>
      {isVisible && <AdUnit {...props} />}
    </div>
  )
}
```

##### Step 5: 在页面中使用

```typescript
// app/[lang]/posts/[slug]/page.tsx
import { LazyAdUnit } from '@/components/ads/LazyAdUnit'

export default function PostPage() {
  return (
    <article>
      {/* 页首广告 */}
      <LazyAdUnit slot="1234567890" format="horizontal" />
      
      {/* 文章内容 */}
      <div className="content">...</div>
      
      {/* 内容中广告 */}
      <LazyAdUnit slot="0987654321" format="auto" />
      
      {/* 更多内容 */}
      <div className="content">...</div>
      
      {/* 页尾广告 */}
      <LazyAdUnit slot="1122334455" format="horizontal" />
    </article>
  )
}
```

---

### 3. 监控系统集成

#### 技术栈

- **Google Analytics 4**: 用户行为分析
- **Vercel Analytics**: 性能监控
- **Vercel Speed Insights**: Web Vitals 追踪

#### 实现步骤

##### Step 1: 设置 Google Analytics 4

```bash
1. 访问 https://analytics.google.com
2. 创建新的 GA4 属性
3. 获取 Measurement ID (G-XXXXXXXXXX)
```

```typescript
// app/layout.tsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {/* Google Analytics 4 */}
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

##### Step 2: 设置 Vercel Analytics

```bash
# 安装 Vercel Analytics
npm install @vercel/analytics @vercel/speed-insights
```

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

##### Step 3: 创建事件追踪工具

```typescript
// lib/analytics.ts
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams)
  }
}

// 预定义事件
export const analytics = {
  // 页面浏览
  pageView: (path: string) => {
    trackEvent('page_view', { page_path: path })
  },
  
  // 文章阅读
  readArticle: (title: string, lang: string) => {
    trackEvent('read_article', { article_title: title, language: lang })
  },
  
  // 搜索
  search: (query: string) => {
    trackEvent('search', { search_term: query })
  },
  
  // 点击广告（间接追踪）
  adClick: (adSlot: string) => {
    trackEvent('ad_interaction', { ad_slot: adSlot })
  },
  
  // 分享
  share: (method: string, content: string) => {
    trackEvent('share', { method, content_type: 'article', item_id: content })
  },
  
  // 错误
  error: (description: string, fatal: boolean = false) => {
    trackEvent('exception', { description, fatal })
  },
}
```

##### Step 4: 在组件中使用

```typescript
// app/[lang]/posts/[slug]/page.tsx
'use client'

import { useEffect } from 'react'
import { analytics } from '@/lib/analytics'

export default function PostPage({ post }) {
  useEffect(() => {
    // 追踪文章阅读
    analytics.readArticle(post.title, post.lang)
    
    // 追踪阅读进度
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / document.body.scrollHeight) * 100
      if (scrollPercent > 75) {
        analytics.trackEvent('article_read_75', { title: post.title })
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [post])
  
  return <article>...</article>
}
```

##### Step 5: 创建监控仪表盘

```typescript
// app/admin/analytics/page.tsx
import { Analytics } from '@/components/admin/Analytics'

export default function AnalyticsPage() {
  return (
    <div className="analytics-dashboard">
      <h1>网站分析</h1>
      
      {/* Google Analytics 嵌入 */}
      <iframe
        src={`https://analytics.google.com/analytics/web/#/embed/report/...`}
        className="h-96 w-full"
      />
      
      {/* Vercel Analytics */}
      <div className="vercel-analytics">
        {/* 从 Vercel API 获取数据并展示 */}
      </div>
    </div>
  )
}
```

---

## 📋 开发任务清单

### Phase 1: 图片上传系统 (Week 1-2)

- [ ] **任务 1.1**: 注册 Cloudinary 账户并配置
  - 注册账户
  - 创建 Upload Preset
  - 配置上传限制和转换规则
  - 测试上传功能

- [ ] **任务 1.2**: 创建图片上传 API
  - 实现 `/api/upload/image` 端点
  - 添加文件大小和格式验证
  - 实现错误处理
  - 添加上传进度追踪

- [ ] **任务 1.3**: 集成到 Sveltia CMS
  - 更新 CMS 配置文件
  - 添加自定义上传 widget
  - 实现拖拽上传 UI
  - 添加图片预览功能

- [ ] **任务 1.4**: 创建图片优化工具
  - 实现 `getOptimizedImageUrl` 函数
  - 添加响应式图片支持
  - 实现自动 WebP 转换
  - 创建图片占位符系统

- [ ] **任务 1.5**: 测试和文档
  - 单元测试
  - 集成测试
  - 性能测试
  - 编写使用文档

### Phase 2: Google AdSense 集成 (Week 3-4)

- [ ] **任务 2.1**: 注册和配置 AdSense
  - 注册 Google AdSense 账户
  - 添加网站并通过审核
  - 创建广告单元
  - 配置广告设置

- [ ] **任务 2.2**: 实现广告组件
  - 创建 `AdUnit` 基础组件
  - 创建 `LazyAdUnit` 延迟加载组件
  - 实现自适应广告
  - 添加错误处理

- [ ] **任务 2.3**: 在页面中部署广告
  - 首页广告位
  - 文章页广告位
  - 列表页广告位
  - 侧边栏广告位

- [ ] **任务 2.4**: 优化广告性能
  - 实现延迟加载
  - 优化广告脚本加载
  - 添加广告屏蔽检测
  - A/B 测试不同位置

- [ ] **任务 2.5**: 测试和文档
  - 测试不同设备和浏览器
  - 测试广告展示和点击
  - 性能影响测试
  - 编写广告管理文档

### Phase 3: 监控系统集成 (Week 5-6)

- [ ] **任务 3.1**: 设置 Google Analytics 4
  - 创建 GA4 属性
  - 配置数据流
  - 设置自定义事件
  - 配置转化追踪

- [ ] **任务 3.2**: 集成 Vercel Analytics
  - 安装依赖
  - 配置 Analytics 和 Speed Insights
  - 设置自定义指标
  - 配置警报

- [ ] **任务 3.3**: 实现事件追踪
  - 创建 `analytics.ts` 工具库
  - 实现页面浏览追踪
  - 实现用户交互追踪
  - 实现错误追踪

- [ ] **任务 3.4**: 创建监控仪表盘
  - 设计仪表盘 UI
  - 集成 Google Analytics 数据
  - 集成 Vercel Analytics 数据
  - 实现实时数据展示

- [ ] **任务 3.5**: 测试和文档
  - 测试数据采集准确性
  - 测试仪表盘功能
  - 性能影响测试
  - 编写监控文档

### Phase 4: 测试和优化 (Week 7-8)

- [ ] **任务 4.1**: 集成测试
  - 端到端测试
  - 跨浏览器测试
  - 移动端测试
  - 性能测试

- [ ] **任务 4.2**: 性能优化
  - 优化图片加载
  - 优化广告加载
  - 优化监控脚本
  - 减少页面体积

- [ ] **任务 4.3**: 文档完善
  - 更新 README.md
  - 更新 CHANGELOG.md
  - 创建 RELEASE_v0.3.0.md
  - 编写使用指南

- [ ] **任务 4.4**: 准备发布
  - 代码审查
  - 安全检查
  - 性能基准测试
  - 创建发布计划

---

## 📅 实施计划

### 时间线

```
Week 1-2:  图片上传系统开发
Week 3-4:  Google AdSense 集成
Week 5-6:  监控系统集成
Week 7:    测试和优化
Week 8:    文档和发布
```

### 里程碑

- **M1 (Week 2)**: 图片上传功能可用
- **M2 (Week 4)**: 广告系统上线
- **M3 (Week 6)**: 监控系统运行
- **M4 (Week 8)**: v0.3.0-beta 发布

---

## 🧪 测试计划

### 功能测试

#### 图片上传
- [ ] 上传单张图片
- [ ] 上传多张图片
- [ ] 拖拽上传
- [ ] 文件大小限制
- [ ] 文件格式限制
- [ ] 上传进度显示
- [ ] 错误处理

#### 广告系统
- [ ] 广告正常展示
- [ ] 延迟加载工作
- [ ] 自适应广告
- [ ] 移动端展示
- [ ] 广告屏蔽检测
- [ ] 错误处理

#### 监控系统
- [ ] GA4 数据采集
- [ ] Vercel Analytics 数据
- [ ] 事件追踪准确
- [ ] 仪表盘数据展示
- [ ] 实时数据更新

### 性能测试

- [ ] **页面加载时间**: < 3 秒
- [ ] **LCP**: < 2.5 秒
- [ ] **FID**: < 100ms
- [ ] **CLS**: < 0.1
- [ ] **广告影响**: < 200ms
- [ ] **监控影响**: < 100ms

### 兼容性测试

- [ ] Chrome (最新版本)
- [ ] Firefox (最新版本)
- [ ] Safari (最新版本)
- [ ] Edge (最新版本)
- [ ] iOS Safari
- [ ] Android Chrome

---

## 📊 成功指标

### 技术指标

- **图片上传成功率**: > 99%
- **广告展示率**: > 95%
- **监控数据准确率**: > 99%
- **页面性能影响**: < 10%

### 业务指标

- **广告点击率**: > 1%
- **广告收入**: > $50/月（前 3 个月）
- **用户留存率**: > 60%
- **页面跳出率**: < 50%

---

## 🔐 安全考虑

### 图片上传
- 文件类型白名单
- 文件大小限制
- 恶意文件扫描
- 上传频率限制

### 广告系统
- 广告内容审核
- 恶意广告检测
- 用户隐私保护
- GDPR 合规

### 监控系统
- 数据匿名化
- Cookie 同意
- 数据加密传输
- 隐私政策更新

---

## 📝 后续优化

### v0.3.1 可能的改进

- 图片编辑功能（裁剪、旋转）
- 广告 A/B 测试自动化
- 自定义监控报表
- 邮件告警系统

---

**准备好开始开发了吗？** 🚀

让我知道您想从哪个功能开始！

