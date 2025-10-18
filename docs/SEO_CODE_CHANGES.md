# SEO 代码修改清单

## 🔧 需要立即修改的代码

### 1. Google Search Console 验证标签

**文件**: `app/[lang]/layout.tsx`

**位置**: Line 13-59 (generateMetadata 函数)

**修改前**:
```typescript
export async function generateMetadata({ params }: { params: { lang: Language } }) {
  const config = siteConfig[params.lang]
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jcski.com'

  return {
    title: {
      default: config.name,
      template: `%s | ${config.name}`,
    },
    description: config.description,
    keywords: ['technology', 'reviews', 'affiliate', 'shopping', 'tech news', 'finance'],
    authors: [{ name: config.author.name }],
    creator: config.author.name,
    openGraph: {
      // ... OpenGraph 配置
    },
    twitter: {
      // ... Twitter 配置
    },
    alternates: {
      languages: {
        vi: '/vi',
        ja: '/ja',
        en: '/en',
      },
      types: {
        'application/rss+xml': `${siteUrl}/${params.lang}/feed.xml`,
      },
    },
  }
}
```

**修改后** (添加 verification 和优化 alternates):
```typescript
export async function generateMetadata({ params }: { params: { lang: Language } }) {
  const config = siteConfig[params.lang]
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jcski.com'

  return {
    title: {
      default: config.name,
      template: `%s | ${config.name}`,
    },
    description: config.description,
    keywords: ['technology', 'reviews', 'affiliate', 'shopping', 'tech news', 'finance'],
    authors: [{ name: config.author.name }],
    creator: config.author.name,
    // ✨ 新增: 搜索引擎验证标签
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '', // 从 GSC 获取
      // yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || '', // 可选
      // 'bing': process.env.NEXT_PUBLIC_BING_VERIFICATION || '', // 可选
    },
    openGraph: {
      type: 'website',
      locale: params.lang === 'vi' ? 'vi_VN' : params.lang === 'ja' ? 'ja_JP' : 'en_US',
      url: config.url,
      title: config.name,
      description: config.description,
      siteName: config.name,
      images: [
        {
          url: config.ogImage,
          width: 1200,
          height: 630,
          alt: config.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.name,
      description: config.description,
      images: [config.ogImage],
    },
    // ✨ 优化: 更完整的 hreflang 配置
    alternates: {
      canonical: `${siteUrl}/${params.lang}`,
      languages: {
        'en-US': `${siteUrl}/en`,
        'ja-JP': `${siteUrl}/ja`,
        'vi-VN': `${siteUrl}/vi`,
        'x-default': `${siteUrl}/en`, // 默认语言
      },
      types: {
        'application/rss+xml': `${siteUrl}/${params.lang}/feed.xml`,
      },
    },
  }
}
```

---

### 2. 文章页面 hreflang 优化

**文件**: `app/[lang]/posts/[slug]/page.tsx`

**位置**: Line 32-84 (generateMetadata 函数)

**修改前** (Line 77-82):
```typescript
alternates: {
  canonical: post.url,
  languages: {
    [params.lang]: post.url,
  },
},
```

**修改后**:
```typescript
alternates: {
  canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://jcski.com'}${post.url}`,
  languages: {
    'en-US': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://jcski.com'}/en/posts/${post.slug}`,
    'ja-JP': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://jcski.com'}/ja/posts/${post.slug}`,
    'vi-VN': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://jcski.com'}/vi/posts/${post.slug}`,
    'x-default': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://jcski.com'}/en/posts/${post.slug}`,
  },
},
```

**完整的 generateMetadata 函数** (推荐):
```typescript
export async function generateMetadata({
  params,
}: {
  params: { lang: Language; slug: string }
}): Promise<Metadata> {
  const post = allPosts.find((post) => post.slug === params.slug && post.lang === params.lang)

  if (!post) {
    return {}
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jcski.com'
  const ogImage = post.image || `${siteUrl}/og-${params.lang}.jpg`

  // 生成 keywords
  const keywords = [
    ...(post.tags || []),
    post.title.split(' ').slice(0, 3).join(' '),
  ].join(', ')

  return {
    title: post.title,
    description: post.summary,
    keywords: keywords,
    authors: [{ name: 'JetCode·SKI Team' }],
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.date,
      url: `${siteUrl}${post.url}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: [ogImage],
    },
    alternates: {
      canonical: `${siteUrl}${post.url}`,
      languages: {
        'en-US': `${siteUrl}/en/posts/${post.slug}`,
        'ja-JP': `${siteUrl}/ja/posts/${post.slug}`,
        'vi-VN': `${siteUrl}/vi/posts/${post.slug}`,
        'x-default': `${siteUrl}/en/posts/${post.slug}`,
      },
    },
  }
}
```

---

### 3. 环境变量配置

**文件**: `.env.local` (需要创建或更新)

```bash
# 网站基础配置
NEXT_PUBLIC_SITE_URL=https://jcski.com

# 搜索引擎验证
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_verification_code_here
# NEXT_PUBLIC_BING_VERIFICATION=your_bing_code
# NEXT_PUBLIC_YANDEX_VERIFICATION=your_yandex_code

# Google Analytics 4 (GA4)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google AdSense (v0.4.0 准备)
# NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX

# 联盟营销 ID (v0.4.0 准备)
# NEXT_PUBLIC_SHOPEE_AFFILIATE_ID=your_shopee_id
# NEXT_PUBLIC_AMAZON_AFFILIATE_ID=your_amazon_tag
```

**重要**:
1. 本地开发使用 `.env.local`
2. 生产环境在部署平台 (Vercel/Netlify) 配置环境变量
3. **不要**将 `.env.local` 提交到 Git

---

### 4. ads.txt 文件优化

**文件**: `public/ads.txt`

**当前内容**: (需要查看)

**推荐内容**:
```txt
# Google AdSense
google.com, pub-YOUR-PUBLISHER-ID, DIRECT, f08c47fec0942fa0

# 如果使用其他广告网络，添加相应行
# 格式: domain, publisher-id, relationship, certification-id
```

**注意**:
- 只在 AdSense 批准后更新
- `pub-YOUR-PUBLISHER-ID` 替换为真实 ID
- 保持此文件可通过 `https://jcski.com/ads.txt` 访问

---

### 5. 创建隐私政策页面 (AdSense 必需)

**新建文件**: `app/[lang]/privacy/page.tsx`

```typescript
import { Language } from '@/config/site'
import { getDictionary } from '@/lib/dictionary'

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ja' }, { lang: 'vi' }]
}

export default async function PrivacyPage({ params }: { params: { lang: Language } }) {
  const dict = await getDictionary(params.lang)

  return (
    <div className="container mx-auto px-4 py-12">
      <article className="prose prose-lg dark:prose-dark mx-auto">
        <h1>Privacy Policy</h1>

        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <h2>Information We Collect</h2>
        <p>We collect information you provide directly to us, including:</p>
        <ul>
          <li>Usage data through Google Analytics</li>
          <li>Cookies for site functionality and analytics</li>
        </ul>

        <h2>Google Analytics</h2>
        <p>
          We use Google Analytics to understand how visitors use our site.
          Google Analytics uses cookies to collect information such as:
        </p>
        <ul>
          <li>Pages you visit</li>
          <li>Time spent on pages</li>
          <li>Device and browser information</li>
        </ul>

        <h2>Advertising</h2>
        <p>
          We use Google AdSense to serve advertisements. Google may use cookies
          to serve ads based on your prior visits to our website or other websites.
        </p>

        <h2>Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Opt out of personalized advertising</li>
          <li>Request deletion of your data</li>
          <li>Access your data</li>
        </ul>

        <h2>Contact Us</h2>
        <p>For privacy-related questions, please contact: privacy@jcski.com</p>
      </article>
    </div>
  )
}
```

**字典文件更新** (`dictionaries/en.json`, `ja.json`, `vi.json`):

```json
{
  "nav": {
    "home": "...",
    "posts": "...",
    "about": "...",
    "privacy": "Privacy Policy"  // 👈 添加
  }
}
```

**导航链接更新** (`config/site.ts`):

```typescript
export const navLinks: Record<Language, NavLink[]> = {
  en: [
    { label: 'Home', href: '/en' },
    { label: 'Posts', href: '/en/posts' },
    { label: 'About', href: '/en/about' },
    { label: 'Privacy', href: '/en/privacy' }, // 👈 添加
  ],
  ja: [
    { label: 'ホーム', href: '/ja' },
    { label: '記事', href: '/ja/posts' },
    { label: '概要', href: '/ja/about' },
    { label: 'プライバシー', href: '/ja/privacy' }, // 👈 添加
  ],
  vi: [
    { label: 'Trang chủ', href: '/vi' },
    { label: 'Bài viết', href: '/vi/posts' },
    { label: 'Giới thiệu', href: '/vi/about' },
    { label: 'Quyền riêng tư', href: '/vi/privacy' }, // 👈 添加
  ],
}
```

---

## 🔄 部署步骤

### 1. 本地测试

```bash
# 更新代码
git status

# 构建测试
npm run build

# 检查构建输出
# 确保没有错误
```

### 2. 提交代码

```bash
git add .
git commit -m "feat: Add SEO improvements (GSC verification, hreflang, privacy policy)"
git push origin main
```

### 3. 配置环境变量 (Vercel 示例)

```bash
# 访问 Vercel 项目仪表板
# Settings → Environment Variables

# 添加以下变量:
NEXT_PUBLIC_SITE_URL=https://jcski.com
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=从_GSC_获取
NEXT_PUBLIC_GA_MEASUREMENT_ID=从_GA4_获取

# 点击 Save
# 触发新部署: Deployments → Redeploy
```

### 4. 验证部署

```bash
# 检查 GSC 验证标签
curl -s https://jcski.com | grep "google-site-verification"

# 检查 hreflang 标签
curl -s https://jcski.com/en | grep "hreflang"

# 检查 GA 脚本
curl -s https://jcski.com | grep "googletagmanager"

# 检查 sitemap
curl -s https://jcski.com/sitemap.xml | head -20

# 检查 robots.txt
curl -s https://jcski.com/robots.txt
```

---

## ✅ 验证清单

完成所有修改后:

- [ ] `app/[lang]/layout.tsx` 包含 `verification` 字段
- [ ] `app/[lang]/layout.tsx` 包含完整 `hreflang` 配置
- [ ] `app/[lang]/posts/[slug]/page.tsx` 包含完整 `hreflang`
- [ ] `.env.local` 配置所有环境变量
- [ ] `app/[lang]/privacy/page.tsx` 已创建
- [ ] `config/site.ts` 导航链接包含隐私政策
- [ ] 字典文件包含隐私政策翻译
- [ ] 生产环境变量已配置
- [ ] 部署成功完成
- [ ] GSC 验证标签在线上可见
- [ ] GA 脚本正常加载

---

**参考文档**:
- Next.js Metadata API: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Google Search Console: https://search.google.com/search-console/
- Google Analytics Setup: https://analytics.google.com/

**最后更新**: 2025-10-18
