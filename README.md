# JetCode·SKI

> 基于 Next.js 13 的多语言技术博客，支持 Markdown/MDX 内容管理

[![Next.js](https://img.shields.io/badge/Next.js-13.5-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 🌟 特性

### 核心功能

- ✅ **多语言支持** - 越南语(vi)、日语(ja)、英语(en)
- ✅ **MDX 内容管理** - Contentlayer 驱动的内容系统
- ✅ **响应式设计** - 完美支持桌面/平板/移动端
- ✅ **深色模式** - 自动主题切换
- ✅ **SEO 优化** - 完整的 meta 标签和 sitemap

### 后台管理系统

- ✅ **文章管理** - 创建、编辑、删除、发布/草稿
- ✅ **Markdown 编辑器** - 实时预览、工具栏、自动保存
- ✅ **图片管理** - 外部图片链接支持
- ✅ **JWT 认证** - 安全的后台访问控制
- ✅ **统计仪表板** - 文章数据可视化

### 联盟营销

- ✅ **价格对比** - 多平台价格展示
- ✅ **联盟链接** - Shopee、Amazon、Lazada、Rakuten
- ✅ **小工具** - 天气、加密货币、股票信息

## 🚀 部署方式

### ⚡ Vercel 部署 (推荐)

**最简单的部署方式，3 分钟上线！**

1. 访问 https://vercel.com 并用 GitHub 登录
2. 导入项目
3. 配置环境变量（参考下方）
4. 点击 Deploy

📖 详细指南: [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)  
⚡ 快速参考: [VERCEL_QUICK_START.md](./VERCEL_QUICK_START.md)

### 💻 本地开发

#### 环境要求

- Node.js 16+
- npm 8+

### 安装步骤

```bash
# 1. 克隆项目
git clone <your-repo-url>
cd JCSKInfo

# 2. 安装依赖
npm install

# 3. 配置环境变量
cp env.example .env
# 编辑 .env 文件，设置必要的配置

# 4. 启动开发服务器
npm run dev
```

访问：

- 前台：http://localhost:3000
- 后台：http://localhost:3000/admin/login

### 环境变量配置

创建 `.env` 文件：

```env
# 网站配置
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# 后台管理（必需）
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
JWT_SECRET=your-jwt-secret-min-32-chars

# 联盟营销（可选）
NEXT_PUBLIC_SHOPEE_AFFILIATE_ID=your_shopee_id
NEXT_PUBLIC_AMAZON_AFFILIATE_ID=your_amazon_tag

# Google Analytics（可选）
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## 📚 文档

- **[完整文档](./DOCUMENTATION.md)** - 详细的安装和开发指南
- **[后台管理](./ADMIN.md)** - 后台系统使用说明
- **[部署指南](./DEPLOYMENT.md)** - 生产环境部署

## 🏗️ 项目结构

```
JCSKInfo/
├── app/                      # Next.js 13 App Router
│   ├── [lang]/              # 多语言路由
│   ├── admin/               # 后台管理系统
│   └── api/                 # API 路由
├── components/              # React 组件
│   ├── admin/              # 后台组件
│   └── ...                 # 前台组件
├── content/                # MDX 内容
│   └── posts/              # 文章
│       ├── vi/            # 越南语
│       ├── ja/            # 日语
│       └── en/            # 英语
├── lib/                    # 工具库
│   ├── admin/             # 后台逻辑
│   └── config/            # 配置文件
├── dictionaries/          # 多语言翻译
└── public/                # 静态资源
```

## 🎨 技术栈

### 核心框架

- **Next.js 13** - React 框架（App Router）
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架

### 内容管理

- **Contentlayer** - MDX 内容处理
- **gray-matter** - Frontmatter 解析
- **remark/rehype** - Markdown 处理

### 后台系统

- **jose** - JWT 认证
- **lucide-react** - 图标库

## 📝 使用指南

### 创建文章

1. **通过后台管理**（推荐）

   ```
   访问：http://localhost:3000/admin
   登录 → 文章管理 → 创建文章
   ```

2. **直接创建 MDX 文件**
   ```bash
   # 在 content/posts/[lang]/ 目录创建文件
   content/posts/ja/my-article.mdx
   ```

### 文章格式

```mdx
---
title: 文章标题
date: 2024-01-01
lang: ja
translationKey: my-article
tags: [tag1, tag2]
summary: 文章摘要
image: https://example.com/image.jpg
draft: false
---

文章内容...
```

### Translation Key 规则

- 使用英文或拼音
- 小写字母、数字、连字符
- 示例：`iphone-15-review`
- 同一篇文章的不同语言版本使用相同的 key

## 🔐 后台管理

### 登录信息

```
URL: http://localhost:3000/admin/login
用户名: 在 .env 中设置的 ADMIN_USERNAME
密码: 在 .env 中设置的 ADMIN_PASSWORD
```

### 功能模块

- **仪表板** - 文章统计和快速操作
- **文章管理** - CRUD 操作、搜索筛选
- **盈利管理** - 联盟链接和数据分析（规划中）

## 🚢 部署

### 构建生产版本

```bash
npm run build
npm start
```

### Vercel 部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

### 环境变量设置

在部署平台设置以下环境变量：

- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `JWT_SECRET`
- 其他可选变量

## 📊 性能优化

- ✅ 静态生成（SSG）
- ✅ 图片优化（Next/Image）
- ✅ 代码分割
- ✅ 字体优化

## 🔄 开发工作流

```bash
# 开发
npm run dev

# 类型检查
npm run lint

# 格式化代码
npm run format

# 构建
npm run build
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🔗 相关链接

- **文档**: [查看完整文档](./DOCUMENTATION.md)
- **后台**: [后台管理文档](./ADMIN.md)
- **部署**: [部署指南](./DEPLOYMENT.md)

---

**由 JetCode·SKI 团队用 ❤️ 制作**
