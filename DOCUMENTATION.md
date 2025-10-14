# JetCode·SKI 完整文档

## 📑 目录

- [安装配置](#安装配置)
- [项目结构](#项目结构)
- [开发指南](#开发指南)
- [内容管理](#内容管理)
- [组件使用](#组件使用)
- [多语言](#多语言)
- [常见问题](#常见问题)

---

## 安装配置

### 环境要求

- Node.js 16.8 或更高版本
- npm 8.0 或更高版本

### 安装步骤

```bash
# 1. 安装依赖
npm install

# 2. 配置环境变量
cp env.example .env

# 3. 编辑 .env 文件
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
JWT_SECRET=your-jwt-secret-key-min-32-chars
NEXT_PUBLIC_SITE_URL=https://jcski.com

# 4. 启动开发服务器
npm run dev
```

### 可用脚本

```bash
npm run dev      # 启动开发服务器
npm run build    # 构建生产版本
npm start        # 启动生产服务器
npm run lint     # 代码检查
npm run format   # 代码格式化
```

---

## 项目结构

```
JCSKInfo/
├── app/                           # Next.js 13 App目录
│   ├── [lang]/                   # 多语言路由
│   │   ├── layout.tsx           # 语言布局
│   │   ├── page.tsx             # 首页
│   │   ├── about/               # 关于页面
│   │   └── posts/               # 文章页面
│   │       ├── page.tsx         # 文章列表
│   │       └── [slug]/          # 文章详情
│   ├── admin/                    # 后台管理系统
│   │   ├── layout.tsx           # 后台布局
│   │   ├── page.tsx             # 仪表板
│   │   ├── login/               # 登录
│   │   ├── posts/               # 文章管理
│   │   └── monetization/        # 盈利管理
│   ├── api/                      # API 路由
│   │   └── admin/               # 后台 API
│   ├── globals.css              # 全局样式
│   ├── layout.tsx               # 根布局
│   ├── manifest.ts              # PWA 配置
│   ├── robots.ts                # robots.txt
│   └── sitemap.ts               # 站点地图
│
├── components/                   # React 组件
│   ├── admin/                   # 后台组件
│   │   ├── AdminNav.tsx        # 导航栏
│   │   ├── AuthProvider.tsx    # 认证守卫
│   │   ├── MarkdownEditor.tsx  # MD 编辑器
│   │   └── ImageUrlInput.tsx   # 图片插入
│   ├── AffiliateLink.tsx       # 联盟链接
│   ├── LanguageSwitcher.tsx    # 语言切换
│   ├── LikeButton.tsx          # 点赞按钮
│   ├── MDXComponents.tsx       # MDX 组件
│   ├── NewsCard.tsx            # 新闻卡片
│   ├── PostCard.tsx            # 文章卡片
│   ├── PriceComparison.tsx     # 价格对比
│   ├── RelatedPosts.tsx        # 相关文章
│   ├── ShareButtons.tsx        # 分享按钮
│   ├── ThemeToggle.tsx         # 主题切换
│   ├── TrendingPosts.tsx       # 热门文章
│   └── WeatherWidget.tsx       # 天气小工具
│
├── content/                      # MDX 内容
│   └── posts/                   # 文章
│       ├── vi/                  # 越南语文章
│       ├── ja/                  # 日语文章
│       └── en/                  # 英语文章
│
├── lib/                          # 工具库
│   ├── admin/                   # 后台逻辑
│   │   ├── auth.ts             # 认证
│   │   ├── posts.ts            # 文章管理
│   │   └── types.ts            # 类型定义
│   ├── config/                  # 配置
│   │   └── admin-config.ts     # 后台配置
│   ├── analytics.tsx           # 分析工具
│   ├── dictionary.ts           # 多语言
│   ├── likes.ts                # 点赞系统
│   ├── types.ts                # 类型定义
│   └── utils.ts                # 工具函数
│
├── dictionaries/                 # 多语言翻译
│   ├── vi.json                 # 越南语
│   ├── ja.json                 # 日语
│   └── en.json                 # 英语
│
├── config/                       # 配置文件
│   └── site.ts                 # 网站配置
│
├── public/                       # 静态资源
├── contentlayer.config.ts       # Contentlayer 配置
├── middleware.ts                # 中间件
├── next.config.js               # Next.js 配置
├── tailwind.config.ts           # Tailwind 配置
└── tsconfig.json                # TypeScript 配置
```

---

## 开发指南

### 创建新页面

在 `app/[lang]/` 下创建目录和 `page.tsx`：

```tsx
// app/[lang]/new-page/page.tsx
import { getDictionary } from '@/lib/dictionary'
import type { Language } from '@/config/site'

export default async function NewPage({ params }: { params: { lang: Language } }) {
  const dict = await getDictionary(params.lang)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1>{dict.common.title}</h1>
    </div>
  )
}
```

### 添加新组件

创建组件文件：

```tsx
// components/MyComponent.tsx
export default function MyComponent({ title }: { title: string }) {
  return (
    <div className="rounded-lg border p-4">
      <h2>{title}</h2>
    </div>
  )
}
```

### 样式规范

使用 Tailwind CSS 工具类：

```tsx
// 响应式设计
<div className="w-full md:w-1/2 lg:w-1/3">

// 深色模式
<div className="bg-white dark:bg-gray-900">

// 交互状态
<button className="hover:bg-primary-700 active:scale-95">
```

---

## 内容管理

### 创建文章

#### 方式1：后台管理（推荐）

1. 访问 http://localhost:3000/admin/login
2. 登录后台
3. 点击"文章管理" → "创建文章"
4. 填写表单并保存

#### 方式2：直接创建 MDX 文件

在 `content/posts/[lang]/` 创建文件：

```mdx
---
title: iPhone 15 Pro 评测
date: 2024-10-14
lang: ja
translationKey: iphone-15-pro-review
tags: ['Apple', 'スマートフォン', 'レビュー']
summary: iPhone 15 Pro的完整评测，包括性能、相机、电池续航等
image: https://images.unsplash.com/photo-xxx
draft: false
---

## 简介

文章内容...

## 性能测试

更多内容...
```

### Frontmatter 字段说明

| 字段           | 类型    | 必需 | 说明                     |
| -------------- | ------- | ---- | ------------------------ |
| title          | string  | ✅   | 文章标题                 |
| date           | date    | ✅   | 发布日期 (YYYY-MM-DD)    |
| lang           | enum    | ✅   | 语言 (vi/ja/en)          |
| translationKey | string  | ✅   | 翻译关联键（英文）       |
| tags           | array   | ❌   | 标签数组                 |
| summary        | string  | ✅   | 文章摘要                 |
| image          | string  | ❌   | 封面图片 URL             |
| draft          | boolean | ❌   | 是否为草稿（默认 false） |

### Translation Key 规则

**✅ 正确示例：**

- `iphone-15-review`
- `macbook-air-m3-2024`
- `best-laptops-2024`

**❌ 错误示例：**

- `iPhone 15评测` （包含中文和空格）
- `iphone_15_review` （使用下划线）
- `IPHONE-15` （大写）

---

## 组件使用

### 联盟链接

```tsx
<AffiliateLink href="https://shopee.vn/product" platform="shopee">
  在 Shopee 购买
</AffiliateLink>
```

支持平台：`shopee` | `amazon` | `lazada` | `rakuten`

### 价格对比

```tsx
<PriceComparison
  productName="iPhone 15 Pro"
  prices={[
    {
      platform: 'shopee',
      price: '25,000,000',
      currency: 'VND',
      url: 'https://shopee.vn/product',
      inStock: true,
    },
    {
      platform: 'amazon',
      price: '$999',
      currency: 'USD',
      url: 'https://amazon.com/product',
      inStock: true,
    },
  ]}
/>
```

### 相关文章

```tsx
<RelatedPosts currentSlug="iphone-15-review" lang="vi" maxPosts={3} />
```

### 分享按钮

```tsx
<ShareButtons title="文章标题" url="https://jcski.com/vi/posts/article" />
```

---

## 多语言

### 添加新语言

1. **更新配置**

```ts
// config/site.ts
export const languages = ['vi', 'ja', 'en', 'zh'] as const
```

2. **创建翻译文件**

```json
// dictionaries/zh.json
{
  "common": {
    "readMore": "阅读更多",
    "readingTime": "分钟阅读"
  }
}
```

3. **更新 Contentlayer**

```ts
// contentlayer.config.ts
lang: {
  type: 'enum',
  options: ['vi', 'ja', 'en', 'zh'],
}
```

### 使用翻译

```tsx
import { getDictionary } from '@/lib/dictionary'

const dict = await getDictionary(params.lang)

<h1>{dict.home.title}</h1>
```

---

## 常见问题

### Q: 如何修改网站名称？

A: 编辑 `config/site.ts`：

```ts
export const siteConfig = {
  vi: {
    name: 'Your Site Name',
    description: 'Your description',
    // ...
  },
}
```

### Q: 如何自定义主题颜色？

A: 编辑 `tailwind.config.ts`：

```ts
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        // ...
      }
    }
  }
}
```

### Q: 图片应该放在哪里？

A:

- **本地图片**: 放在 `public/` 目录
- **外部图片**: 使用 CDN URL（推荐 Unsplash）

### Q: 如何启用 Google Analytics？

A: 在 `.env` 中设置：

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Q: 文章不显示？

A: 检查：

1. Frontmatter 格式是否正确
2. `draft` 是否为 `false`
3. 运行 `npm run build` 重新构建

### Q: 如何修改联盟链接ID？

A: 在 `.env` 中设置：

```env
NEXT_PUBLIC_SHOPEE_AFFILIATE_ID=your_id
NEXT_PUBLIC_AMAZON_AFFILIATE_ID=your_tag
```

### Q: 后台密码忘记了？

A: 修改 `.env` 中的 `ADMIN_PASSWORD`，然后重启服务器

### Q: 如何添加新的小工具？

A:

1. 在 `components/` 创建组件
2. 在页面中引入使用
3. 添加必要的 API 配置

---

## 性能优化

### 图片优化

```tsx
// 使用 Next/Image
import Image from 'next/image'

;<Image src="/image.jpg" alt="Description" width={800} height={600} priority={false} />
```

### 代码分割

```tsx
// 动态导入
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('@/components/Heavy'), {
  loading: () => <p>Loading...</p>,
})
```

### 静态生成

```tsx
// 预生成静态页面
export async function generateStaticParams() {
  return [{ lang: 'vi' }, { lang: 'ja' }, { lang: 'en' }]
}
```

---

## 部署

### Vercel 部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel

# 生产部署
vercel --prod
```

### 环境变量设置

在 Vercel Dashboard 设置：

- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `JWT_SECRET`
- 其他环境变量

### 构建命令

```json
{
  "scripts": {
    "build": "contentlayer build && next build"
  }
}
```

---

## 开发规范

### 文件命名

- 组件：`PascalCase.tsx`
- 工具函数：`camelCase.ts`
- 配置文件：`kebab-case.ts`

### 代码风格

```bash
# 格式化代码
npm run format

# 检查代码
npm run lint
```

### Git 提交规范

```
feat: 添加新功能
fix: 修复bug
docs: 更新文档
style: 代码格式调整
refactor: 代码重构
test: 添加测试
chore: 其他修改
```

---

## 支持

- **文档**: https://jcski.com/docs
- **后台文档**: [ADMIN.md](./ADMIN.md)
- **部署指南**: [DEPLOYMENT.md](./DEPLOYMENT.md)

---

**由 JetCode·SKI 团队维护**
