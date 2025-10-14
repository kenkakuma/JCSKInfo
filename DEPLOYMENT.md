# 部署指南

> JetCode·SKI 生产环境部署完整指南

## 📑 目录

- [部署前检查](#部署前检查)
- [环境配置](#环境配置)
- [Vercel 部署](#vercel-部署)
- [其他平台部署](#其他平台部署)
- [性能优化](#性能优化)
- [安全配置](#安全配置)
- [监控和维护](#监控和维护)

---

## 部署前检查

### ✅ 代码质量检查

```bash
# 1. 运行 linter
npm run lint

# 2. 类型检查
npm run type-check  # 如果配置了

# 3. 构建测试
npm run build

# 4. 本地预览
npm start
```

### ✅ 功能测试清单

- [ ] 所有语言版本正常访问（vi/ja/en）
- [ ] 文章列表和详情页加载正常
- [ ] 图片正常显示
- [ ] 深色/浅色模式切换正常
- [ ] 语言切换功能正常
- [ ] 后台管理系统可访问
- [ ] 后台登录认证正常
- [ ] 文章 CRUD 操作正常
- [ ] 联盟链接正常工作
- [ ] 分享功能正常
- [ ] 移动端响应式正常

### ✅ 内容检查

```bash
# 检查文章数量
find content/posts -name "*.mdx" | wc -l

# 检查是否有草稿
grep -r "draft: true" content/posts
```

### ✅ SEO 检查

- [ ] meta 标签完整
- [ ] sitemap.xml 生成正常
- [ ] robots.txt 配置正确
- [ ] Open Graph 图片设置
- [ ] 结构化数据（Schema.org）

---

## 环境配置

### 环境变量清单

#### 必需变量

```env
# 网站基本配置
NEXT_PUBLIC_SITE_URL=https://jcski.com

# 后台管理（必需）
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password_min_12_chars
JWT_SECRET=your-jwt-secret-key-minimum-32-characters-long
```

#### 可选变量

```env
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# 联盟营销
NEXT_PUBLIC_SHOPEE_AFFILIATE_ID=your_shopee_id
NEXT_PUBLIC_AMAZON_AFFILIATE_ID=your_amazon_tag
NEXT_PUBLIC_LAZADA_AFFILIATE_ID=your_lazada_id
NEXT_PUBLIC_RAKUTEN_AFFILIATE_ID=your_rakuten_id

# 第三方 API
OPENWEATHER_API_KEY=your_api_key
COINGECKO_API_KEY=your_api_key
```

### 安全建议

⚠️ **重要**:

1. **强密码生成**:

```bash
# 生成随机密码
openssl rand -base64 32
```

2. **JWT Secret 生成**:

```bash
# 生成 JWT 密钥（至少 32 字符）
openssl rand -hex 32
```

3. **密码要求**:
   - 至少 12 个字符
   - 包含大小写字母
   - 包含数字和特殊字符
   - 不使用常见密码

---

## Vercel 部署

### 方式1: 通过 GitHub（推荐）

#### 步骤1: 推送到 GitHub

```bash
# 初始化 Git（如果还没有）
git init
git add .
git commit -m "Initial commit"

# 添加远程仓库
git remote add origin https://github.com/yourusername/jcski.git
git push -u origin main
```

#### 步骤2: 连接 Vercel

1. 访问 [vercel.com](https://vercel.com)
2. 点击 "New Project"
3. 导入 GitHub 仓库
4. 选择项目

#### 步骤3: 配置项目

**Framework Preset**: Next.js

**Build Command**:

```bash
npm run build
```

**Output Directory**:

```
.next
```

**Install Command**:

```bash
npm install
```

#### 步骤4: 添加环境变量

在 Vercel Dashboard 设置：

```
Environment Variables:
├─ ADMIN_USERNAME = admin
├─ ADMIN_PASSWORD = your_secure_password
├─ JWT_SECRET = your_jwt_secret_key
├─ NEXT_PUBLIC_SITE_URL = https://jcski.com
├─ NEXT_PUBLIC_GA_MEASUREMENT_ID = G-XXXXXXXXXX
└─ ... (其他变量)
```

#### 步骤5: 部署

点击 "Deploy" 按钮，等待部署完成。

### 方式2: 通过 CLI

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 登录
vercel login

# 3. 部署
vercel

# 4. 生产部署
vercel --prod
```

### 域名配置

#### 1. 添加自定义域名

在 Vercel Dashboard:

1. Project Settings → Domains
2. 添加 `jcski.com`
3. 添加 `www.jcski.com` (可选)

#### 2. DNS 配置

在域名提供商设置：

```
类型    名称    值
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

#### 3. SSL 证书

Vercel 自动提供免费 SSL 证书（Let's Encrypt）

---

## 其他平台部署

### Netlify 部署

```bash
# 1. 安装 CLI
npm i -g netlify-cli

# 2. 登录
netlify login

# 3. 初始化
netlify init

# 4. 部署
netlify deploy --prod
```

**构建设置**:

```
Build command: npm run build
Publish directory: .next
```

### Railway 部署

1. 访问 [railway.app](https://railway.app)
2. 创建新项目
3. 连接 GitHub 仓库
4. 添加环境变量
5. 部署

### Docker 部署

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

```bash
# 构建镜像
docker build -t jcski .

# 运行容器
docker run -p 3000:3000 \
  -e ADMIN_USERNAME=admin \
  -e ADMIN_PASSWORD=password \
  -e JWT_SECRET=secret \
  jcski
```

### VPS 部署（PM2）

```bash
# 1. 安装 PM2
npm i -g pm2

# 2. 构建项目
npm run build

# 3. 启动
pm2 start npm --name "jcski" -- start

# 4. 保存配置
pm2 save

# 5. 设置开机自启
pm2 startup
```

---

## 性能优化

### 图片优化

#### 1. 配置图片域名

```js
// next.config.js
module.exports = {
  images: {
    domains: ['images.unsplash.com', 'your-cdn.com'],
  },
}
```

#### 2. 使用 CDN

推荐使用：

- Cloudinary
- Imgix
- Cloudflare Images

### 静态资源优化

#### 1. 启用压缩

```js
// next.config.js
module.exports = {
  compress: true,
}
```

#### 2. 字体优化

```tsx
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})
```

### 缓存策略

#### 1. CDN 缓存

在 Vercel:

- 静态资源自动缓存
- ISR（增量静态再生）支持

#### 2. 浏览器缓存

```js
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*).(jpg|jpeg|png|gif|ico|webp)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
```

### 代码优化

```tsx
// 动态导入
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('@/components/Heavy'), {
  loading: () => <div>Loading...</div>,
  ssr: false,
})
```

---

## 安全配置

### HTTPS 强制

Vercel 默认强制 HTTPS，其他平台需配置：

```js
// middleware.ts
if (req.headers['x-forwarded-proto'] !== 'https' && process.env.NODE_ENV === 'production') {
  return NextResponse.redirect(`https://${req.headers.host}${req.url}`)
}
```

### 安全头部

```js
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
}
```

### 环境变量安全

✅ **最佳实践**:

- 使用平台的环境变量功能
- 不在代码中硬编码敏感信息
- 区分生产和开发环境
- 定期轮换密钥

❌ **避免**:

- 提交 `.env` 到 Git
- 在客户端暴露服务端密钥
- 使用默认密码

---

## 监控和维护

### 分析工具

#### Google Analytics

```tsx
// app/layout.tsx
import { Analytics } from '@/lib/analytics'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

#### Vercel Analytics

```bash
npm i @vercel/analytics
```

```tsx
import { Analytics } from '@vercel/analytics/react'

;<Analytics />
```

### 错误监控

#### Sentry 集成

```bash
npm i @sentry/nextjs
```

```js
// sentry.config.js
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
})
```

### 性能监控

#### Web Vitals

```tsx
// app/layout.tsx
export function reportWebVitals(metric) {
  console.log(metric)
  // 发送到分析服务
}
```

### 日志管理

```js
// lib/logger.ts
export const logger = {
  info: (message) => console.log(`[INFO] ${message}`),
  error: (message) => console.error(`[ERROR] ${message}`),
  warn: (message) => console.warn(`[WARN] ${message}`),
}
```

---

## 部署后检查

### ✅ 功能验证

```bash
# 检查网站可访问性
curl -I https://jcski.com

# 检查 SSL 证书
curl -vI https://jcski.com 2>&1 | grep -i ssl

# 检查响应时间
curl -w "@curl-format.txt" -o /dev/null -s https://jcski.com
```

### ✅ SEO 验证

工具：

- Google Search Console
- Bing Webmaster Tools
- PageSpeed Insights
- Lighthouse

### ✅ 安全扫描

工具：

- Mozilla Observatory
- Security Headers
- SSL Labs

---

## 常见问题

### Q: 部署后 404 错误？

A: 检查：

1. 构建是否成功
2. 路由配置是否正确
3. `.next` 目录是否生成

### Q: 环境变量不生效？

A:

1. 重新部署
2. 检查变量名是否正确
3. 客户端变量需要 `NEXT_PUBLIC_` 前缀

### Q: 图片加载失败？

A:

1. 检查 `next.config.js` 中的 `domains`
2. 验证图片 URL 可访问
3. 检查 CDN 配置

### Q: 构建超时？

A:

1. 优化依赖
2. 减少构建时间
3. 升级部署平台套餐

### Q: 后台无法登录？

A:

1. 检查环境变量设置
2. 验证 JWT_SECRET 是否配置
3. 清除浏览器缓存和 Cookie

---

## 更新和回滚

### 自动部署

Vercel 自动部署 Git 分支：

- `main` 分支 → 生产环境
- 其他分支 → 预览环境

### 手动回滚

在 Vercel Dashboard:

1. Deployments → 选择历史版本
2. 点击 "Promote to Production"

### CI/CD 流程

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm run build
      - run: npm test
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

---

## 维护计划

### 每日检查

- [ ] 网站可访问性
- [ ] 错误日志
- [ ] 性能指标

### 每周检查

- [ ] 依赖更新
- [ ] 安全补丁
- [ ] 备份检查

### 每月检查

- [ ] 性能优化
- [ ] SEO 排名
- [ ] 用户反馈
- [ ] 服务器资源

---

## 备份策略

### Git 备份

```bash
# 定期推送到多个远程仓库
git remote add backup https://gitlab.com/user/jcski.git
git push backup main
```

### 内容备份

```bash
# 备份文章
tar -czf posts-backup-$(date +%Y%m%d).tar.gz content/posts/

# 定期上传到云存储
```

### 数据库备份（如使用）

```bash
# 示例：备份 MongoDB
mongodump --uri="mongodb://..." --out=./backup
```

---

## 支持资源

### 文档链接

- [主文档](./README.md)
- [开发文档](./DOCUMENTATION.md)
- [后台文档](./ADMIN.md)

### 官方文档

- [Next.js 部署](https://nextjs.org/docs/deployment)
- [Vercel 文档](https://vercel.com/docs)
- [Contentlayer 文档](https://contentlayer.dev)

### 社区支持

- Next.js Discord
- GitHub Discussions
- Stack Overflow

---

**部署愉快！🚀**

**由 JetCode·SKI 团队维护**
