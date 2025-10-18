# SEO 快速启动指南 (Quick Start Guide)

## 🚨 今天立即执行 (1-2 小时)

### Step 1: Google Search Console 验证 (30 分钟)

```bash
# 1. 访问
https://search.google.com/search-console/

# 2. 点击 "添加资源" → 选择 "URL 前缀"
# 3. 输入: https://jcski.com
# 4. 选择验证方法: "HTML 标记"
# 5. 复制验证代码 (格式: google-site-verification=XXXXXX)
```

**代码修改** - `app/[lang]/layout.tsx`:

```typescript
// 在 generateMetadata 函数中添加 (line 17 附近):
export async function generateMetadata({ params }: { params: { lang: Language } }) {
  const config = siteConfig[params.lang]
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jcski.com'

  return {
    // ... 现有配置
    verification: {
      google: 'YOUR_VERIFICATION_CODE_HERE', // 👈 粘贴从 GSC 获取的代码
    },
    // ... 其他配置
  }
}
```

**部署验证**:
```bash
# 提交代码
git add app/[lang]/layout.tsx
git commit -m "Add Google Search Console verification"
git push

# 等待部署完成 (1-2 分钟)
# 返回 GSC 点击 "验证"
```

### Step 2: 提交 Sitemap (5 分钟)

在 GSC 左侧菜单:
1. 点击 "Sitemap"
2. 输入: `sitemap.xml`
3. 点击 "提交"

### Step 3: 请求索引重要页面 (15 分钟)

在 GSC 顶部搜索框:
1. 输入: `https://jcski.com/en`
2. 点击 "请求编入索引"
3. 重复以下 URL:
   - `https://jcski.com/ja`
   - `https://jcski.com/vi`
   - 所有已发布的文章 URL

### Step 4: 配置 Google Analytics (20 分钟)

```bash
# 1. 访问
https://analytics.google.com/

# 2. 创建账号和资源 (GA4)
# 3. 复制 "衡量 ID" (格式: G-XXXXXXXXXX)

# 4. 更新环境变量
echo "NEXT_PUBLIC_GA_MEASUREMENT_ID=G-YOUR-ID-HERE" >> .env.local

# 5. 验证配置
cat .env.local | grep GA_MEASUREMENT_ID

# 6. 重启开发服务器 (如果在本地测试)
npm run dev

# 7. 部署到生产环境
git add .env.local  # ⚠️ 确保 .env.local 在 .gitignore 中
# 在部署平台 (Vercel/Netlify) 添加环境变量
```

**Vercel 环境变量设置**:
```bash
# 访问 Vercel 项目设置
Settings → Environment Variables → Add

Name: NEXT_PUBLIC_GA_MEASUREMENT_ID
Value: G-YOUR-ID-HERE
Environment: Production, Preview, Development
```

### Step 5: 创建社交媒体链接 (30 分钟)

**必做平台**:
- [ ] Twitter/X: 创建账号 → 简介添加网站链接
- [ ] Facebook: 创建主页 → "关于" 添加网站
- [ ] LinkedIn: 个人/公司页面添加网站
- [ ] GitHub: 项目 README 添加网站 badge

**Badge 示例** (GitHub README):
```markdown
[![Website](https://img.shields.io/badge/Website-jcski.com-blue)](https://jcski.com)
```

---

## 📊 验证成功的标志

### Google Search Console (24 小时内)
- ✅ 验证状态: "所有权已验证"
- ✅ Sitemap 状态: "成功"
- ✅ 覆盖率: 显示已发现的 URL

### Google Analytics (30 分钟内)
- ✅ 实时报告: 显示当前访问者
- ✅ 事件跟踪: 页面浏览事件正常

---

## 🔍 故障排查

### GSC 验证失败?

```bash
# 检查验证标签是否正确部署
curl -I https://jcski.com | grep -i "google-site-verification"

# 或在浏览器查看页面源代码 (Ctrl+U / Cmd+Option+U)
# 搜索: google-site-verification
```

### GA 没有数据?

```bash
# 1. 检查环境变量
echo $NEXT_PUBLIC_GA_MEASUREMENT_ID  # 应该输出: G-XXXXXXXXXX

# 2. 检查浏览器控制台
# 打开 DevTools → Network → 搜索 "google-analytics"
# 应该看到请求发送到 www.google-analytics.com

# 3. 检查脚本加载
# 查看页面源代码，搜索 "gtag"
```

---

## 📅 后续步骤 (本周完成)

### 周一-周二: hreflang 实现

修改两个文件:

**1. `app/[lang]/layout.tsx`** (第 48-57 行):

```typescript
alternates: {
  canonical: `${siteUrl}/${params.lang}`,
  languages: {
    'en-US': `${siteUrl}/en`,
    'ja-JP': `${siteUrl}/ja`,
    'vi-VN': `${siteUrl}/vi`,
    'x-default': `${siteUrl}/en`, // 👈 添加默认语言
  },
  types: {
    'application/rss+xml': `${siteUrl}/${params.lang}/feed.xml`,
  },
},
```

**2. `app/[lang]/posts/[slug]/page.tsx`** (第 77-82 行):

```typescript
alternates: {
  canonical: `${siteUrl}${post.url}`,
  languages: {
    'en-US': `${siteUrl}/en/posts/${post.slug}`,
    'ja-JP': `${siteUrl}/ja/posts/${post.slug}`,
    'vi-VN': `${siteUrl}/vi/posts/${post.slug}`,
    'x-default': `${siteUrl}/en/posts/${post.slug}`, // 👈 添加
  },
},
```

### 周三-周四: Bing Webmaster

```bash
# 1. 访问
https://www.bing.com/webmasters/

# 2. 使用 "Import from Google Search Console" (最快)
# 或手动添加网站

# 3. 提交 sitemap: https://jcski.com/sitemap.xml
```

### 周五-周日: 内容优化

- [ ] 审核并发布草稿文章
- [ ] 创建 2-3 篇新文章
- [ ] 优化现有文章的内部链接
- [ ] 添加/优化图片 alt 文本

---

## 🎯 2 周后检查点

### GSC 数据检查

```
覆盖率报告 → 应该看到:
- 有效页面: 15-30 页
- 已发现 - 尚未编入索引: 减少
- 已编入索引的网页: 增加
```

### GA 数据检查

```
报告 → 应该看到:
- 日活跃用户: 10-50 (取决于推广)
- 页面浏览量: 50-200
- 主要流量来源: Google, Direct, Social
```

### 搜索可见性测试

```bash
# Google 搜索测试
site:jcski.com  # 应该显示所有已索引页面

# 品牌搜索
JetCode·SKI  # 您的网站应该排名第一

# 文章标题搜索
"[您的文章完整标题]"  # 应该找到对应文章
```

---

## 💰 何时可以申请 AdSense?

### 最低要求检查清单

- [ ] **网站已被 Google 索引** (site:jcski.com 有结果)
- [ ] **至少 20-30 篇高质量文章** (目前: 需要更多)
- [ ] **稳定的日流量** (50+ 用户/天)
- [ ] **网站运营时间** (至少 1-2 个月)
- [ ] **有隐私政策页面** (需要创建)
- [ ] **有关于页面** (已有 ✅)
- [ ] **无版权侵权内容** (需审核)

**预计可申请时间**: 4-6 周后

---

## 📞 需要帮助?

如果遇到问题,请查看:
1. 完整报告: `docs/SEO_AUDIT_REPORT.md`
2. Google Search Console 帮助: https://support.google.com/webmasters/
3. Next.js SEO 文档: https://nextjs.org/learn/seo/

---

**最后更新**: 2025-10-18
**预计下次更新**: v0.4.0 发布前
