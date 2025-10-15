# 🛠️ JetCode·SKI 设置指南

> 完整的项目配置和功能设置文档

## 📑 目录

1. [环境变量配置](#环境变量配置)
2. [后台管理系统](#后台管理系统)
3. [图片管理 (Cloudinary)](#图片管理-cloudinary)
4. [图片使用指南](#图片使用指南)
5. [Google Analytics 4](#google-analytics-4)
6. [Google AdSense](#google-adsense)
7. [Sveltia CMS](#sveltia-cms)

---

## ⚙️ 环境变量配置

### 完整配置

创建 `.env.local` 文件：

```env
# 网站配置
NEXT_PUBLIC_SITE_URL=https://jcski.com

# 后台管理系统
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
JWT_SECRET=your-jwt-secret-key-change-in-production

# Cloudinary 图片管理
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dt@hpzm21
CLOUDINARY_API_KEY=295771887569851
CLOUDINARY_API_SECRET=GebAgK4oIbuseF46La0F2Y2MAgc

# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google AdSense
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX
```

### Vercel 部署配置

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择项目 → Settings → Environment Variables
3. 添加以上所有环境变量
4. 保存并重新部署

---

## 🎯 后台管理系统

### 快速开始

**访问地址**：
- 本地：`http://localhost:3000/admin/login`
- 生产：`https://jcski.com/admin/login`

**默认凭证**：
- 用户名：在 `.env` 中的 `ADMIN_USERNAME`
- 密码：在 `.env` 中的 `ADMIN_PASSWORD`

### 主要功能

#### 1. 仪表板 (`/admin`)
- 文章统计（总数、已发布、草稿）
- 语言分布统计
- 热门标签 Top 10
- 月度发布趋势
- 最近编辑的文章列表

#### 2. 文章管理 (`/admin/posts`)

**通过 Sveltia CMS 管理**：
- 创建、编辑、删除文章
- Markdown 编辑器
- 图片上传（Cloudinary）
- 多语言支持
- 草稿/发布切换

**访问方式**：
- 点击后台侧边栏"文章管理"
- 会打开嵌入的 Sveltia CMS

#### 3. 数据分析 (`/admin/analytics`)
- Google Analytics 4 配置状态
- Google AdSense 配置状态
- 快速链接到官方控制台

### 安全说明

✅ **已实施的安全措施**：
- JWT Token 认证（24小时有效期）
- HTTP-Only Cookie（防 XSS）
- 路由保护（Middleware + 客户端守卫）
- API 权限检查

⚠️ **安全建议**：
- 使用强密码（至少12位）
- 定期更换 `JWT_SECRET`
- 生产环境使用 HTTPS
- 不要分享管理员凭证

---

## 📸 图片管理 (Cloudinary)

### 账户信息

```
Cloud Name: dt@hpzm21
免费额度：25GB 存储 + 25GB 月流量
控制台：https://console.cloudinary.com
```

### 上传图片

#### 方式 1：在 CMS 中上传（推荐）

1. 登录后台 → 文章管理
2. 创建/编辑文章
3. 点击"特色图片"字段
4. 上传图片或输入 URL
5. 自动返回优化后的 Cloudinary URL

#### 方式 2：使用 API

```bash
curl -X POST http://localhost:3000/api/upload/image \
  -F "file=@your-image.jpg"
```

### 文件限制

- **支持格式**：JPG, PNG, GIF, WebP
- **最大大小**：10MB
- **推荐大小**：< 5MB

### 自动优化

所有上传的图片会自动：
- 压缩 50-70% 体积
- 转换为 WebP（现代浏览器）
- 根据设备提供合适尺寸
- 全球 CDN 缓存

---

## 🖼️ 图片使用指南

### 方法 1：ImageWithCaption 组件（推荐）

#### 居中图片

```jsx
<ImageWithCaption
  src="https://res.cloudinary.com/dt@hpzm21/image/upload/v123/jcski-posts/image.jpg"
  alt="图片描述"
  width={800}
  height={600}
/>
```

#### 居中 + 说明文字

```jsx
<ImageWithCaption
  src="https://res.cloudinary.com/dt@hpzm21/image/upload/v123/jcski-posts/image.jpg"
  alt="iPhone 15 Pro"
  caption="iPhone 15 Pro 采用钛金属设计"
  width={800}
  height={600}
/>
```

#### 左/右对齐

```jsx
<ImageWithCaption
  src="https://res.cloudinary.com/dt@hpzm21/image/upload/v123/jcski-posts/image.jpg"
  alt="产品特写"
  align="left"  // 或 "right"
  width={400}
  height={300}
/>
```

### 方法 2：标准 Markdown

```markdown
![图片描述](https://example.com/image.jpg)
```

### 图片尺寸建议

| 类型     | 宽度        | 使用场景     |
| -------- | ----------- | ------------ |
| 大图     | 1200-1600px | 产品展示     |
| 中等图片 | 800-1000px  | 文章配图     |
| 小图     | 400-600px   | 侧边图、图标 |
| 缩略图   | 200-300px   | Logo         |

---

## 📊 Google Analytics 4

### 设置步骤

#### 1. 创建 GA4 资源

1. 访问 [Google Analytics](https://analytics.google.com/)
2. 管理 → 创建资源
3. 填写资源信息：`JetCode·SKI`

#### 2. 创建数据流

1. 数据流 → 添加流 → 网站
2. 网站 URL：`https://jcski.com`
3. 流名称：`JetCode·SKI Website`

#### 3. 获取衡量 ID

1. 查看数据流详情
2. 复制"衡量 ID"（格式：`G-XXXXXXXXXX`）

#### 4. 配置环境变量

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 功能特性

#### 自动跟踪
- 页面浏览
- 路由变化
- SPA 路由跟踪

#### 自定义事件

```typescript
import { analytics } from '@/lib/analytics'

// 文章查看
analytics.viewPost('文章标题', 'slug', 'ja')

// 联盟链接点击
analytics.clickAffiliateLink('产品', 'Amazon', 'url')

// 搜索
analytics.search('关键词')

// 分享
analytics.sharePost('slug', 'twitter')
```

### 查看数据

#### 方式 1：后台管理系统
- 访问 `/admin/analytics`
- 查看配置状态
- 快速链接到 GA4 控制台

#### 方式 2：Google Analytics 控制台
- 实时数据
- 用户获取
- 参与度报告
- 自定义分析

---

## 💰 Google AdSense

### 设置步骤

#### 1. 注册 AdSense

1. 访问 [Google AdSense](https://www.google.com/adsense/)
2. 添加网站：`https://jcski.com`
3. 等待审核（通常 1-2 周）

#### 2. 获取发布商 ID

1. 审核通过后
2. 账号 → 账号信息
3. 复制"发布商 ID"（`ca-pub-XXXXXXXXXXXXXXXX`）

#### 3. 配置环境变量

```env
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX
```

#### 4. 设置 ads.txt

文件已自动创建在 `public/ads.txt`：

```
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

### 广告组件

项目提供多种广告格式：

```tsx
import {
  DisplayAd,     // 展示广告（响应式）
  InArticleAd,   // 文章内广告
  InFeedAd,      // 信息流广告
  SidebarAd,     // 侧边栏广告
} from '@/components/AdSense'

// 使用示例
<DisplayAd adSlot="您的广告单元ID" />
```

### 查看收益

#### 方式 1：后台管理系统
- 访问 `/admin/analytics`
- 查看 AdSense 配置状态

#### 方式 2：AdSense 控制台
- 访问 [Google AdSense](https://www.google.com/adsense/)
- 查看详细报告和收益

---

## 📝 Sveltia CMS

### 简介

Sveltia CMS 是一个轻量级的开源 CMS，已集成到后台管理系统中。

### 访问方式

1. 登录后台：`/admin/login`
2. 点击侧边栏"文章管理"
3. 自动打开嵌入的 Sveltia CMS

### 功能特性

- ✅ Markdown 编辑器
- ✅ 图片上传（Cloudinary）
- ✅ 多语言支持
- ✅ 实时预览
- ✅ Git 工作流
- ✅ 草稿/发布管理

### 首次使用

#### 1. GitHub 认证

Sveltia CMS 使用 GitHub 作为后端存储。

**认证方式**：Personal Access Token (PAT)

1. 访问 [GitHub Token 设置](https://github.com/settings/tokens)
2. 生成新 Token（需要 `repo` 权限）
3. 在 CMS 登录页输入 Token

#### 2. 创建文章

1. 点击"新建文章"
2. 填写基本信息：
   - 标题
   - 语言（vi/ja/en）
   - Translation Key
   - 标签
   - 摘要
3. 编写内容（支持 Markdown）
4. 上传特色图片
5. 保存草稿或发布

#### 3. 编辑文章

1. 在文章列表中选择文章
2. 修改内容
3. 保存更改

#### 4. 图片插入

在 Markdown 编辑器中：

```jsx
<ImageWithCaption
  src="https://res.cloudinary.com/dt@hpzm21/image/upload/v123/jcski-posts/image.jpg"
  alt="描述"
  caption="说明（可选）"
  align="center"
  width={800}
  height={600}
/>
```

### 更新网站

编辑保存后：

1. **本地开发**：自动热更新
2. **生产环境**：
   - Git 提交并推送
   - Vercel 自动部署
   - 2-3 分钟后生效

---

## 🧪 测试清单

### 本地测试

```bash
# 启动开发服务器
npm run dev

# 测试后台登录
访问 http://localhost:3000/admin/login

# 测试文章管理
访问 http://localhost:3000/admin/posts

# 测试图片上传
在 CMS 中上传测试图片
```

### 生产测试

```bash
# 构建项目
npm run build

# 启动生产服务器
npm start

# 访问后台
https://jcski.com/admin/login
```

---

## ❓ 常见问题

### 后台管理

**Q: 忘记密码怎么办？**
- 修改 `.env` 中的 `ADMIN_PASSWORD`
- 重启服务器

**Q: 登录后自动退出？**
- 检查 `JWT_SECRET` 是否配置
- 清除浏览器 Cookie

### 图片管理

**Q: 图片上传失败？**
- 检查文件大小（< 10MB）
- 检查环境变量配置
- 确认网络连接

**Q: 图片加载慢？**
- 使用 Cloudinary 优化
- 检查图片尺寸
- 启用 WebP 格式

### Google Analytics

**Q: 看不到实时数据？**
- 确认环境变量配置正确
- 重启开发服务器
- 等待 5-10 分钟

### Google AdSense

**Q: 广告不显示？**
- 确认网站已通过审核
- 检查环境变量配置
- 新广告单元需等待几小时

### Sveltia CMS

**Q: 无法登录 CMS？**
- 确认已登录后台管理系统
- 检查 GitHub Token 权限
- 清除浏览器缓存

**Q: 编辑后网站未更新？**
- 确认已提交并推送到 Git
- 检查 Vercel 部署状态
- 等待 2-3 分钟

---

## 📞 技术支持

### 官方文档

- **Cloudinary**: https://cloudinary.com/documentation
- **Google Analytics**: https://support.google.com/analytics
- **Google AdSense**: https://support.google.com/adsense
- **Sveltia CMS**: https://github.com/sveltia/sveltia-cms

### 项目文档

- **README**: 项目概览
- **CHANGELOG**: 版本更新记录
- **ADMIN_ARCHITECTURE**: 后台架构说明
- **VERCEL_DEPLOYMENT**: 部署指南

---

## 🚀 下一步

1. ✅ 配置环境变量
2. ✅ 登录后台管理系统
3. ✅ 测试图片上传
4. ✅ 配置 Google Analytics 4
5. ✅ 配置 Google AdSense（可选）
6. ✅ 使用 Sveltia CMS 创建第一篇文章
7. ✅ 部署到生产环境

---

**版本**: v0.2.7-beta  
**最后更新**: 2025-01-15  
**维护者**: JetCode·SKI Team

