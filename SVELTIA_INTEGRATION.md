# 🎨 Sveltia CMS 集成说明

> JetCode·SKI 后台管理系统 + Sveltia CMS 完美整合

**更新时间**: 2025-10-15  
**版本**: v0.2.0-beta

---

## 📋 目录

- [概述](#概述)
- [架构设计](#架构设计)
- [访问方式](#访问方式)
- [安全机制](#安全机制)
- [使用指南](#使用指南)
- [生产部署](#生产部署)

---

## 🎯 概述

### 整合方案

我们将 Sveltia CMS 完美集成到现有的后台管理系统中：

- **文章编辑** → Sveltia CMS（专业的内容管理）
- **统计仪表板** → 原后台系统
- **盈利管理** → 原后台系统
- **认证系统** → JWT Token（统一管理）

### 为什么这样设计？

1. **解决 Vercel 限制** - Vercel Serverless 不支持文件系统写入
2. **专业工具** - 使用 Sveltia CMS 专业的编辑体验
3. **保留价值** - 原后台的认证、统计功能不浪费
4. **统一入口** - 所有管理功能在一个系统中

---

## 🏗️ 架构设计

### 整体架构

```
JetCode·SKI 后台管理系统
│
├── 认证层 (JWT)
│   └── /admin/login
│
├── 核心功能
│   ├── 仪表板 (/admin)
│   │   ├── 文章统计
│   │   ├── 访问数据
│   │   └── 最近编辑
│   │
│   ├── 文章管理 (/admin/posts) ✨
│   │   └── Sveltia CMS (iframe 嵌入)
│   │       ├── 越南语文章 (vi)
│   │       ├── 日语文章 (ja)
│   │       └── 英语文章 (en)
│   │
│   └── 盈利管理 (/admin/monetization)
│       ├── 联盟链接管理
│       ├── 数据分析
│       └── 收益统计
│
└── CMS 静态文件
    └── public/cms/
        ├── index.html (Sveltia CMS 入口)
        └── config.yml (配置文件)
```

### 技术实现

#### 1. iframe 嵌入方式

```typescript
// app/admin/posts/page.tsx
export default function PostsManagementPage() {
  return (
    <div className="flex h-screen flex-col">
      {/* 页面标题 */}
      <div className="border-b bg-white px-6 py-4">
        <h1>文章管理</h1>
        <p>使用 Sveltia CMS 编辑和管理您的文章内容</p>
      </div>

      {/* Sveltia CMS iframe */}
      <div className="flex-1 overflow-hidden">
        <iframe
          src="/cms/index.html"
          className="h-full w-full border-0"
          title="Sveltia CMS"
          allow="clipboard-read; clipboard-write"
        />
      </div>
    </div>
  )
}
```

#### 2. 认证保护

```typescript
// app/admin/layout.tsx
export default function AdminLayout({ children }) {
  return (
    <AuthProvider>  {/* 🔒 所有子页面都被保护 */}
      <div className="flex min-h-screen">
        <AdminNav />
        <main>{children}</main>  {/* 包括 /admin/posts */}
      </div>
    </AuthProvider>
  )
}
```

#### 3. Sveltia CMS 配置

```yaml
# public/cms/config.yml
backend:
  name: github
  repo: kenkakuma/JCSKInfo
  branch: main

collections:
  - name: posts-vi
    label: "📝 越南语文章"
    folder: content/posts/vi
    
  - name: posts-ja
    label: "📝 日语文章"
    folder: content/posts/ja
    
  - name: posts-en
    label: "📝 英语文章"
    folder: content/posts/en
```

---

## 🚪 访问方式

### 本地开发

1. 启动开发服务器：
   ```bash
   npm run dev
   ```

2. 访问后台：http://localhost:3000/admin/login

3. 登录后点击 "文章管理"

4. 在 Sveltia CMS 中选择 "Work with Local Repository"

5. 选择项目根目录：`/Users/eric/WebstormProjects/JCSKInfo`

6. 开始编辑文章

### 生产环境

1. 访问：https://jcski.com/admin/login

2. 使用管理员账号登录

3. 点击 "文章管理"

4. 点击 "Sign In with GitHub"（需要配置 OAuth）

5. 授权后开始编辑

---

## 🔒 安全机制

### 三层保护

#### 1. 后台认证 (第一层)

```
用户访问 /admin/posts
  ↓
AuthProvider 检查 JWT Token
  ↓
✅ 有效 Token → 允许访问
❌ 无效 Token → 跳转到 /admin/login
```

**特点**：
- JWT Token 存储在 Cookie
- 24 小时有效期
- 自动刷新

#### 2. GitHub OAuth (第二层 - 生产环境)

```
Sveltia CMS 界面
  ↓
点击 "Sign In with GitHub"
  ↓
GitHub OAuth 认证
  ↓
✅ 授权成功 → 可以编辑文章
❌ 授权失败 → 无法编辑
```

**特点**：
- GitHub 用户权限控制
- 仓库访问权限检查
- 提交历史记录作者信息

#### 3. 路径保护

**受保护的路径**：
- ✅ `/admin/*` - 所有后台路径（除了登录页）
- ✅ `/admin/posts` - 文章管理页面

**已移除的路径**：
- ❌ `/cms` - 独立入口已删除
- ❌ `/cms/index.html` - 只能通过后台 iframe 访问

### 安全性对比

| 访问方式 | 认证要求 | 安全级别 |
|---------|----------|----------|
| /admin/posts | JWT Token | 🔒🔒🔒 高 |
| iframe 内嵌 | 继承父页面认证 | 🔒🔒🔒 高 |
| 独立 /cms | 已删除 | ✅ 不存在 |

---

## 📝 使用指南

### 文章编辑流程

#### 本地开发

1. **启动服务器**
   ```bash
   npm run dev
   ```

2. **登录后台**
   - 访问：http://localhost:3000/admin/login
   - 输入账号密码

3. **进入文章管理**
   - 点击左侧菜单 "文章管理"
   - 看到 Sveltia CMS 界面

4. **配置本地仓库**
   - 点击 "Work with Local Repository"
   - 选择项目目录
   - 开始编辑

5. **创建文章**
   - 选择语言集合（越南语/日语/英语）
   - 点击 "New [语言]文章"
   - 填写字段
   - 保存并发布

6. **查看效果**
   - 文章自动保存到 `content/posts/[lang]/`
   - Contentlayer 自动重新生成
   - 刷新网站即可看到

#### 生产环境

1. **配置 GitHub OAuth**（一次性）
   - 参考 `SVELTIA_CMS_SETUP.md`

2. **登录后台**
   - 访问：https://jcski.com/admin/login

3. **进入文章管理**
   - 点击 "文章管理"

4. **GitHub 登录**
   - 点击 "Sign In with GitHub"
   - 授权 OAuth App

5. **编辑文章**
   - 创建/编辑文章
   - 保存时自动提交到 GitHub
   - Vercel 自动检测并部署（2-3 分钟）

### 多语言关联

使用 `translationKey` 关联不同语言版本：

**示例**：为同一篇文章创建三个语言版本

1. **越南语版本**
   - translationKey: `apple-vision-pro-apps`
   - 文件：`content/posts/vi/apple-vision-pro-apps.mdx`

2. **日语版本**
   - translationKey: `apple-vision-pro-apps` ⚠️ 相同！
   - 文件：`content/posts/ja/apple-vision-pro-apps.mdx`

3. **英语版本**
   - translationKey: `apple-vision-pro-apps` ⚠️ 相同！
   - 文件：`content/posts/en/apple-vision-pro-apps.mdx`

**规则**：
- translationKey 必须相同才能关联
- 建议使用英文短语，小写 + 连字符
- 格式：`^[a-z0-9-]+$`

---

## 🚀 生产部署

### 环境变量配置

在 Vercel 添加以下环境变量：

```env
# 后台管理（必需）
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
JWT_SECRET=your-jwt-secret-min-32-chars

# GitHub OAuth（生产环境必需）
OAUTH_GITHUB_CLIENT_ID=Iv1.xxxxxxxxxxxxxxxx
OAUTH_GITHUB_CLIENT_SECRET=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# 网站配置
NEXT_PUBLIC_SITE_URL=https://jcski.com
```

### GitHub OAuth 配置

1. **创建 OAuth App**
   - 访问：https://github.com/settings/developers
   - 点击 "New OAuth App"
   - 填写信息：
     - Application name: `JetCode·SKI CMS`
     - Homepage URL: `https://jcski.com`
     - Callback URL: `https://api.netlify.com/auth/done`

2. **添加环境变量**
   - 复制 Client ID 和 Client Secret
   - 添加到 Vercel 环境变量

3. **重新部署**
   ```bash
   git push origin main
   ```
   或在 Vercel Dashboard 点击 "Redeploy"

### 部署流程

```
本地编辑 → Git commit → Push to GitHub → Vercel 自动部署
```

---

## 🎯 优势总结

### ✅ 完美解决 Vercel 限制

- Vercel Serverless 不支持文件系统写入
- Sveltia CMS 通过 GitHub API 操作文件
- 完美适配 Serverless 架构

### ✅ 专业的编辑体验

- 现代化的 CMS 界面
- 实时预览
- Markdown/MDX 支持
- 多语言集合管理

### ✅ 保留原有价值

- 认证系统完整保留
- 统计仪表板正常工作
- 盈利管理功能不受影响
- 只替换了文章编辑部分

### ✅ 统一的管理入口

- 所有功能在一个后台系统
- 无需在多个系统间切换
- 统一的用户体验

### ✅ Git 版本控制

- 所有文章更改都有历史记录
- 可以随时回滚
- 清晰的提交记录

---

## 📚 相关文档

- **[Sveltia CMS 详细设置](./SVELTIA_CMS_SETUP.md)** - OAuth 配置、使用指南
- **[快速开始](./SVELTIA_CMS_QUICK_START.md)** - 5 分钟上手指南
- **[后台管理](./ADMIN.md)** - 完整的后台系统文档
- **[Vercel 部署](./VERCEL_DEPLOYMENT.md)** - 生产环境部署指南

---

## ❓ 常见问题

### Q1: 为什么使用 iframe 嵌入？

**A**: 
- Sveltia CMS 是独立的 SPA 应用
- iframe 方式无需修改其代码
- 保持 CMS 功能完整性
- 便于未来升级

### Q2: 安全性如何？

**A**:
- 必须通过后台登录才能访问
- JWT Token 验证
- 生产环境还有 GitHub OAuth 保护
- 独立 /cms 入口已删除

### Q3: 如何在本地测试？

**A**:
```bash
npm run dev
# 访问 http://localhost:3000/admin/login
# 登录后点击 "文章管理"
# 选择 "Work with Local Repository"
```

### Q4: 生产环境如何编辑？

**A**:
1. 配置 GitHub OAuth（一次性）
2. 登录后台
3. 点击 "文章管理"
4. "Sign In with GitHub"
5. 编辑保存后自动部署

### Q5: 可以恢复到之前的版本吗？

**A**:
可以！所有更改都通过 Git 管理：
```bash
git log  # 查看历史
git revert <commit>  # 恢复某个提交
```

---

## 🎉 总结

通过将 Sveltia CMS 集成到后台管理系统：

1. ✅ 解决了 Vercel 的文件系统限制
2. ✅ 提供了专业的内容编辑体验
3. ✅ 保留了原有后台的所有功能
4. ✅ 实现了统一的管理入口
5. ✅ 保证了系统的安全性

这是一个**两全其美**的方案！

---

**如有问题，请查看相关文档或联系开发者。**

祝使用愉快！🚀

