# 🎨 Sveltia CMS 集成指南

> 为 JetCode·SKI 项目配置轻量级 Git-based CMS

**更新时间**: 2025-10-15  
**状态**: ✅ 已集成，待配置 OAuth

---

## 📋 目录

- [简介](#简介)
- [集成状态](#集成状态)
- [快速开始](#快速开始)
- [GitHub OAuth 配置](#github-oauth-配置)
- [使用指南](#使用指南)
- [本地开发](#本地开发)
- [常见问题](#常见问题)

---

## 🎯 简介

### 什么是 Sveltia CMS？

Sveltia CMS 是一个轻量级、现代化的 Git-based 内容管理系统：

- 🪶 **超轻量**: 比 Decap CMS 快 10 倍
- 🎨 **现代化**: 美观的用户界面，支持深色模式
- 🔄 **Git 工作流**: 所有更改通过 GitHub 管理
- 🆓 **完全免费**: 开源 (MIT 许可证)
- 🚀 **零依赖**: 无需额外云服务

### 为什么选择 Sveltia CMS？

对于 JetCode·SKI 项目，Sveltia CMS 是完美的选择：

✅ **完美适配现有架构**
- 无需修改 Contentlayer 配置
- 无需修改 MDX 文件结构
- 无需修改任何代码

✅ **支持多语言结构**
- 越南语 (vi)
- 日语 (ja)
- 英语 (en)

✅ **解决 Vercel 限制**
- Vercel Serverless 不支持文件系统写入
- Sveltia 通过 GitHub API 直接更新内容
- 自动触发 Vercel 重新部署

---

## ✅ 集成状态

### 已完成的工作

- ✅ 创建 `/public/admin/index.html` (CMS 入口)
- ✅ 创建 `/public/admin/config.yml` (配置文件)
- ✅ 配置支持三种语言的文章集合
- ✅ 配置 translationKey 关联功能
- ✅ 配置草稿、标签、特色图片等功能

### 待完成的配置

- ⏳ 配置 GitHub OAuth App
- ⏳ 添加 OAuth 回调 URL
- ⏳ 测试在线编辑

---

## 🚀 快速开始

### 第一步: GitHub OAuth 配置

**重要**: 必须先完成 OAuth 配置才能使用 CMS！

详细步骤请参考: [GitHub OAuth 配置](#github-oauth-配置)

### 第二步: 访问 CMS

配置完成后，访问：

- **生产环境**: https://jcski.com/admin
- **本地开发**: http://localhost:3000/admin

### 第三步: 登录

1. 点击 **"Login with GitHub"**
2. 授权 GitHub OAuth App
3. 开始编辑内容！

---

## 🔐 GitHub OAuth 配置

### 为什么需要 OAuth？

Sveltia CMS 需要通过 GitHub OAuth 来获取权限，以便：
- 读取仓库内容
- 创建/编辑/删除文章
- 提交更改到 GitHub

### 配置步骤

#### 1. 创建 GitHub OAuth App

访问: https://github.com/settings/developers

点击 **"New OAuth App"** 或 **"OAuth Apps" → "New OAuth App"**

#### 2. 填写应用信息

| 字段 | 填写内容 |
|------|----------|
| **Application name** | `JetCode·SKI CMS` |
| **Homepage URL** | `https://jcski.com` |
| **Application description** | (可选) `Content management for JetCode·SKI` |
| **Authorization callback URL** | `https://api.netlify.com/auth/done` |

⚠️ **重要**: Authorization callback URL 必须是 `https://api.netlify.com/auth/done`，即使您使用的是 Vercel！这是 Sveltia/Decap CMS 的标准回调地址。

#### 3. 获取 Client ID 和 Client Secret

创建后，GitHub 会显示：

```
Client ID: Iv1.xxxxxxxxxxxxxxxx
```

点击 **"Generate a new client secret"**，会得到：

```
Client Secret: ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

⚠️ **重要**: Client Secret 只显示一次，请立即保存！

#### 4. 配置 Vercel 环境变量

访问 Vercel 项目设置: https://vercel.com/kenkakuma/jcskinfo/settings/environment-variables

添加以下环境变量：

| 变量名 | 值 | 环境 |
|--------|-----|------|
| `OAUTH_GITHUB_CLIENT_ID` | `Iv1.xxxxxxxxxxxxxxxx` | Production, Preview, Development |
| `OAUTH_GITHUB_CLIENT_SECRET` | `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` | Production, Preview, Development |

⚠️ **注意**: 不是 `GITHUB_TOKEN`，而是 `OAUTH_GITHUB_CLIENT_ID` 和 `OAUTH_GITHUB_CLIENT_SECRET`！

#### 5. 创建 OAuth 认证端点

**重要**: Sveltia CMS 需要一个 OAuth 认证端点。有两种方案：

##### 方案 A: 使用 Netlify 的 OAuth 服务 (推荐)

Sveltia CMS 默认配置为使用 Netlify 的 OAuth 服务（这也适用于非 Netlify 部署的网站）。

无需额外配置，保持 `config.yml` 中的默认设置即可：

```yaml
backend:
  name: github
  repo: kenkakuma/JCSKInfo
  branch: main
```

##### 方案 B: 自建 OAuth 端点 (高级)

如果您想完全独立，可以创建自己的 OAuth 端点。

1. 创建 `app/api/auth/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  
  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 })
  }
  
  try {
    // 使用 code 换取 access_token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.OAUTH_GITHUB_CLIENT_ID,
        client_secret: process.env.OAUTH_GITHUB_CLIENT_SECRET,
        code,
      }),
    })
    
    const data = await tokenResponse.json()
    
    if (data.error) {
      return NextResponse.json({ error: data.error_description }, { status: 400 })
    }
    
    // 重定向回 CMS，带上 token
    const redirectUrl = `${request.nextUrl.origin}/admin#access_token=${data.access_token}&token_type=${data.token_type}`
    return NextResponse.redirect(redirectUrl)
  } catch (error) {
    console.error('OAuth error:', error)
    return NextResponse.json({ error: 'OAuth failed' }, { status: 500 })
  }
}
```

2. 更新 `public/admin/config.yml`:

```yaml
backend:
  name: github
  repo: kenkakuma/JCSKInfo
  branch: main
  base_url: https://jcski.com
  auth_endpoint: /api/auth
```

**推荐使用方案 A**，除非您有特殊的安全或隐私需求。

#### 6. 重新部署

配置环境变量后，**必须重新部署** Vercel 项目：

```bash
# 推送一个小改动触发部署
git commit --allow-empty -m "chore: trigger deploy for OAuth config"
git push origin main
```

或在 Vercel Dashboard 点击 **"Redeploy"**。

#### 7. 测试

1. 访问 https://jcski.com/admin
2. 点击 **"Login with GitHub"**
3. 如果看到 GitHub 授权页面，说明配置成功！
4. 授权后，您应该能看到 Sveltia CMS 的管理界面

---

## 📝 使用指南

### 创建新文章

1. 访问 https://jcski.com/admin
2. 选择语言集合：
   - 📝 越南语文章 (Vietnamese)
   - 📝 日语文章 (Japanese)
   - 📝 英语文章 (English)
3. 点击 **"New [语言]文章"**
4. 填写文章信息：
   - **标题**: 文章标题
   - **发布日期**: 自动填充当前时间
   - **翻译键**: ⚠️ **关键字段**！用于关联不同语言版本
   - **标签**: 添加文章标签（可选）
   - **摘要**: 文章简短摘要
   - **特色图片**: 图片 URL（可选）
   - **草稿状态**: 是否为草稿
   - **正文内容**: Markdown/MDX 内容
5. 点击 **"Save"** → **"Publish"**

### 编辑现有文章

1. 在文章列表中找到要编辑的文章
2. 点击进入编辑页面
3. 修改内容
4. 点击 **"Save"** → **"Publish"**

### 删除文章

1. 在文章列表中找到要删除的文章
2. 点击删除按钮
3. 确认删除

### 多语言关联

**translationKey** 是关联不同语言版本的关键！

**示例**: 为同一篇文章创建三个语言版本

1. **越南语版本**:
   - translationKey: `apple-vision-pro-apps`
   - 文件: `content/posts/vi/apple-vision-pro-apps.mdx`

2. **日语版本**:
   - translationKey: `apple-vision-pro-apps` (相同！)
   - 文件: `content/posts/ja/apple-vision-pro-apps.mdx`

3. **英语版本**:
   - translationKey: `apple-vision-pro-apps` (相同！)
   - 文件: `content/posts/en/apple-vision-pro-apps.mdx`

⚠️ **注意**:
- translationKey 必须相同才能关联
- 建议使用英文短语，小写字母 + 连字符
- 示例: `apple-vision-pro`, `tesla-cybertruck`, `openai-gpt4`

### 草稿功能

- **草稿** (`draft: true`): 不会在网站上显示
- **已发布** (`draft: false`): 会在网站上显示

您可以：
1. 创建草稿文章，慢慢编辑
2. 编辑完成后，取消勾选 "草稿状态"
3. 发布文章

---

## 💻 本地开发

### 启用本地后端

Sveltia CMS 支持本地开发模式，无需 GitHub OAuth！

#### 1. 安装 Sveltia CMS 本地服务器

```bash
npm install -g @sveltia/cms-auth
```

#### 2. 启动本地服务器

在项目根目录运行：

```bash
# 终端 1: 启动 Next.js 开发服务器
npm run dev

# 终端 2: 启动 Sveltia CMS 本地后端
npx @sveltia/cms-auth start
```

#### 3. 访问本地 CMS

访问: http://localhost:3000/admin

在本地模式下：
- 无需 GitHub OAuth
- 直接修改本地文件
- 实时预览更改
- 手动 git commit 和 push

---

## ❓ 常见问题

### Q1: 点击 "Login with GitHub" 没有反应？

**A**: 检查以下几点：

1. 是否正确配置了 GitHub OAuth App？
2. Authorization callback URL 是否正确？
   - 必须是: `https://api.netlify.com/auth/done`
3. 是否在 Vercel 添加了环境变量？
   - `OAUTH_GITHUB_CLIENT_ID`
   - `OAUTH_GITHUB_CLIENT_SECRET`
4. 是否重新部署了 Vercel 项目？

### Q2: 提示 "Error: Unable to access"？

**A**: 检查 GitHub OAuth App 的权限：

1. 访问 https://github.com/settings/developers
2. 找到您的 OAuth App
3. 确认 Repository access 包含 `kenkakuma/JCSKInfo`

### Q3: 编辑文章后，网站多久更新？

**A**: 
- Sveltia CMS 保存 → GitHub 提交 → Vercel 自动部署
- 整个流程大约 **2-3 分钟**

### Q4: 可以恢复之前的版本吗？

**A**: 可以！所有更改都通过 Git 管理：

1. 访问 GitHub 仓库
2. 查看 commit 历史
3. 找到要恢复的版本
4. 使用 `git revert` 或手动恢复文件

### Q5: 如何上传图片？

**A**: Sveltia CMS 配置了图片文件夹：

- **存储位置**: `public/images/posts/`
- **访问路径**: `/images/posts/your-image.jpg`

使用方式：
1. 手动上传图片到 `public/images/posts/`
2. 在文章中引用: `/images/posts/your-image.jpg`

或者使用外部图片托管服务（如 Cloudinary, Imgur）。

### Q6: 与原有的后台管理系统冲突吗？

**A**: 不会冲突！两者可以共存：

- **Sveltia CMS**: `/admin` (主要用于编辑文章)
- **原后台**: `/admin/legacy` (可保留统计等功能)

或者您可以修改路由，让它们访问不同的路径。

### Q7: Sveltia CMS 是否支持 MDX 组件？

**A**: 支持！您可以在 Markdown 内容中使用：

```mdx
# 标题

普通 Markdown 内容...

<PriceComparison 
  productName="iPhone 15"
  prices={[...]}
/>

更多内容...
```

Sveltia CMS 会保留所有 MDX 语法，Contentlayer 在构建时会正确处理。

---

## 🎯 总结

### ✅ 优势

1. **零代码改动**: 不需要修改任何现有代码
2. **完美适配**: 支持 Contentlayer + MDX + 多语言
3. **轻量快速**: 加载速度快，界面美观
4. **Git 工作流**: 所有更改有版本控制
5. **完全免费**: 开源且无需云服务

### 📊 工作流程

```
编辑文章 (Sveltia CMS)
    ↓
保存并发布
    ↓
提交到 GitHub
    ↓
Vercel 自动检测
    ↓
自动构建部署 (2-3 分钟)
    ↓
网站更新完成 ✅
```

### 🚀 下一步

1. ✅ 完成 GitHub OAuth 配置
2. ✅ 测试创建第一篇文章
3. ✅ 测试多语言关联功能
4. ✅ 开始正常使用！

---

## 📚 相关资源

- **Sveltia CMS 官方文档**: https://github.com/sveltia/sveltia-cms
- **Sveltia CMS 配置参考**: https://decapcms.org/docs/configuration-options/
- **GitHub OAuth 文档**: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps
- **Contentlayer 文档**: https://contentlayer.dev/docs

---

**如有问题，请参考本文档或查看 Sveltia CMS 官方文档。**

祝使用愉快！🎉

