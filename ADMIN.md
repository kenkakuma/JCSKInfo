# 后台管理系统文档

> JetCode·SKI 后台管理系统完整指南

## 📑 目录

- [快速开始](#快速开始)
- [功能模块](#功能模块)
- [使用指南](#使用指南)
- [API 文档](#api-文档)
- [系统架构](#系统架构)
- [安全机制](#安全机制)

---

## 快速开始

### 访问后台

```
URL: http://localhost:3000/admin/login
默认用户名: admin（可在 .env 中配置）
默认密码: 在 .env 中设置
```

### 首次登录

1. 访问登录页面
2. 输入用户名和密码
3. 点击"登录"按钮
4. 自动跳转到仪表板

### 会话管理

- 登录有效期：24小时
- 无操作自动退出：30分钟
- 可手动点击"退出登录"

---

## 功能模块

### 1. 仪表板（Dashboard）

**路径**: `/admin`

**功能**:

- ✅ 文章统计（总数、已发布、草稿）
- ✅ 最近编辑的文章列表
- ✅ 快速操作按钮
- ✅ 数据可视化

**快速操作**:

- 创建新文章
- 查看所有文章
- 访问盈利管理

### 2. 文章管理（Posts）

**路径**: `/admin/posts`

**功能**:

- ✅ 文章列表（支持分页）
- ✅ 搜索和筛选（按语言、状态、标签）
- ✅ 批量操作
- ✅ 实时预览

**操作**:

- 创建文章
- 编辑文章
- 删除文章
- 切换发布状态
- 预览文章

### 3. 文章编辑器

**路径**: `/admin/posts/new` 或 `/admin/posts/edit/[lang]/[slug]`

**功能**:

- ✅ Markdown 编辑
- ✅ 实时预览
- ✅ 工具栏快捷操作
- ✅ 图片插入（外部 URL）
- ✅ 自动保存（每30秒）
- ✅ 语法高亮

**工具栏**:

- **B** - 加粗
- **I** - 斜体
- **H** - 标题
- **Link** - 链接
- **List** - 列表
- **Code** - 代码块
- **Quote** - 引用
- **Image** - 图片

### 4. 盈利管理（Monetization）

**路径**: `/admin/monetization`

**状态**: 🚧 规划中

**计划功能**:

- 联盟链接管理
- 收益统计
- 点击追踪
- 转化分析

---

## 使用指南

### 创建文章

#### 步骤1: 填写基本信息

```
标题: iPhone 15 Pro 评测
语言: ja (日语)
Translation Key: iphone-15-pro-review
标签: Apple, iPhone, Review（用逗号分隔）
摘要: 详细评测 iPhone 15 Pro 的性能、相机等
```

#### 步骤2: 编写内容

使用 Markdown 语法编写：

```markdown
## 简介

iPhone 15 Pro 是苹果最新旗舰手机...

## 性能测试

搭载 A17 Pro 芯片...

### 跑分数据

- Geekbench: 2900 (单核)
- AnTuTu: 1,500,000
```

#### 步骤3: 插入图片

1. 点击工具栏的"图片"按钮
2. 输入图片 URL（推荐使用 Unsplash）
3. 添加 Alt 文本
4. 点击"插入"

#### 步骤4: 预览和保存

1. 点击"预览"标签查看效果
2. 确认无误后点击"保存为草稿"
3. 或直接点击"发布文章"

### 编辑文章

#### 方式1: 从列表进入

1. 访问文章管理页面
2. 找到要编辑的文章
3. 点击"编辑"按钮

#### 方式2: 从仪表板进入

1. 在仪表板查看"最近编辑"
2. 点击文章标题
3. 进入编辑页面

### 发布/撤回文章

#### 发布草稿

1. 在文章列表找到草稿
2. 点击"发布"按钮
3. 确认发布

#### 撤回文章

1. 找到已发布的文章
2. 点击"撤回"按钮
3. 文章变为草稿状态

### 删除文章

⚠️ **警告**: 删除操作不可恢复

1. 在文章列表找到要删除的文章
2. 点击"删除"按钮
3. 确认删除操作

### 搜索和筛选

#### 搜索功能

- 输入关键词搜索标题和内容
- 支持实时搜索

#### 筛选选项

- **语言**: 全部 / vi / ja / en
- **状态**: 全部 / 已发布 / 草稿
- **标签**: 选择特定标签

---

## API 文档

### 认证 API

#### POST `/api/admin/auth/login`

登录

**请求**:

```json
{
  "username": "admin",
  "password": "password"
}
```

**响应**:

```json
{
  "success": true,
  "data": {
    "user": {
      "username": "admin",
      "role": "admin"
    }
  }
}
```

#### POST `/api/admin/auth/logout`

退出登录

**响应**:

```json
{
  "success": true,
  "message": "已退出登录"
}
```

#### GET `/api/admin/auth/check`

检查认证状态

**响应**:

```json
{
  "success": true,
  "data": {
    "authenticated": true,
    "user": {
      "username": "admin"
    }
  }
}
```

### 文章 API

#### GET `/api/admin/posts`

获取文章列表

**查询参数**:

- `lang`: 语言筛选（可选）
- `status`: 状态筛选（可选）

**响应**:

```json
{
  "success": true,
  "data": [
    {
      "title": "文章标题",
      "slug": "article-slug",
      "lang": "ja",
      "translationKey": "article-key",
      "draft": false,
      "date": "2024-10-14",
      "tags": ["tag1", "tag2"],
      "summary": "摘要",
      "image": "https://...",
      "content": "内容"
    }
  ]
}
```

#### POST `/api/admin/posts/create`

创建文章

**请求**:

```json
{
  "title": "新文章",
  "lang": "ja",
  "translationKey": "new-article",
  "tags": ["tag1", "tag2"],
  "summary": "摘要",
  "content": "# 内容",
  "image": "https://...",
  "draft": true
}
```

**响应**:

```json
{
  "success": true,
  "data": {
    "slug": "new-article",
    "message": "文章创建成功"
  }
}
```

#### GET `/api/admin/posts/[slug]?lang=ja`

获取单篇文章

**响应**:

```json
{
  "success": true,
  "data": {
    // 文章数据
  }
}
```

#### PUT `/api/admin/posts/[slug]/update`

更新文章

**请求**:

```json
{
  "lang": "ja",
  "title": "更新后的标题",
  "content": "更新后的内容"
  // 其他字段...
}
```

#### DELETE `/api/admin/posts/[slug]?lang=ja`

删除文章

**响应**:

```json
{
  "success": true,
  "message": "文章删除成功"
}
```

#### POST `/api/admin/posts/[slug]/toggle-draft`

切换发布状态

**请求**:

```json
{
  "lang": "ja"
}
```

### 统计 API

#### GET `/api/admin/stats`

获取统计数据

**响应**:

```json
{
  "success": true,
  "data": {
    "total": 50,
    "published": 45,
    "draft": 5,
    "byLanguage": {
      "vi": 20,
      "ja": 25,
      "en": 5
    }
  }
}
```

---

## 系统架构

### 技术栈

**前端**:

- Next.js 13 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Lucide React (图标)

**后端**:

- Next.js API Routes
- Node.js fs/promises (文件操作)
- Jose (JWT 认证)
- Gray-matter (Frontmatter 解析)

**内容管理**:

- Contentlayer (MDX 处理)
- 文件系统存储

### 文件结构

```
lib/
├── admin/
│   ├── auth.ts          # 认证逻辑
│   ├── posts.ts         # 文章管理
│   └── types.ts         # 类型定义
└── config/
    └── admin-config.ts  # 配置文件

app/
├── admin/
│   ├── layout.tsx       # 布局
│   ├── page.tsx         # 仪表板
│   ├── login/           # 登录
│   └── posts/           # 文章管理
└── api/
    └── admin/           # API 路由

components/
└── admin/
    ├── AdminNav.tsx     # 导航
    ├── AuthProvider.tsx # 认证守卫
    ├── MarkdownEditor.tsx # 编辑器
    └── ImageUrlInput.tsx  # 图片输入
```

### 数据流

```
用户操作
    ↓
前端组件
    ↓
API 路由 (认证检查)
    ↓
业务逻辑 (lib/admin/)
    ↓
文件系统操作
    ↓
Contentlayer 重建
    ↓
前端更新
```

---

## 安全机制

### 认证系统

1. **JWT Token**
   - 使用 Jose 库生成和验证
   - 密钥存储在环境变量中
   - Token 有效期：24小时

2. **HTTP-Only Cookie**
   - 防止 XSS 攻击
   - Secure 标志（生产环境）
   - SameSite=Lax

3. **密码安全**
   - 环境变量存储
   - 建议使用强密码
   - 定期更换

### 路由保护

1. **中间件保护**

   ```ts
   // middleware.ts
   if (pathname.startsWith('/admin')) {
     // 排除登录页
   }
   ```

2. **客户端守卫**

   ```tsx
   // AuthProvider.tsx
   if (!authenticated) {
     router.push('/admin/login')
   }
   ```

3. **API 保护**
   ```ts
   // API 路由
   const user = await requireAuth(req)
   if (!user) {
     return unauthorized()
   }
   ```

### 最佳实践

✅ **推荐**:

- 使用强密码（至少12位）
- 定期更换 JWT_SECRET
- 生产环境启用 HTTPS
- 限制登录尝试次数（计划中）

❌ **避免**:

- 密码写在代码中
- 使用默认密码
- 分享管理员账号
- 在公共网络登录

---

## 配置说明

### 后台配置文件

```ts
// lib/config/admin-config.ts
export const ADMIN_CONFIG = {
  features: {
    dashboard: true,
    posts: true,
    monetization: false, // 暂未启用
  },
  posts: {
    autosaveInterval: 30000, // 30秒
    maxFileSize: 5 * 1024 * 1024, // 5MB
  },
  security: {
    sessionTimeout: 30 * 60 * 1000, // 30分钟
    jwtExpiry: '24h',
  },
}
```

### 菜单配置

```ts
export const ADMIN_MENU = [
  {
    name: '仪表板',
    path: '/admin',
    icon: 'LayoutDashboard',
    enabled: true,
  },
  {
    name: '文章管理',
    path: '/admin/posts',
    icon: 'FileText',
    enabled: true,
  },
  // ...
]
```

---

## 常见问题

### Q: 忘记后台密码怎么办？

A: 修改 `.env` 文件中的 `ADMIN_PASSWORD`，然后重启服务器。

### Q: 如何修改会话超时时间？

A: 编辑 `lib/config/admin-config.ts` 中的 `sessionTimeout` 值。

### Q: 文章保存后前台没显示？

A: 检查文章是否为"已发布"状态，草稿不会在前台显示。

### Q: 如何批量导入文章？

A: 直接在 `content/posts/[lang]/` 目录下放置 MDX 文件，系统会自动识别。

### Q: 支持多个管理员吗？

A: 当前版本仅支持单管理员，多用户功能在第二阶段规划中。

### Q: 如何备份文章？

A: 直接备份 `content/posts/` 目录即可。

### Q: 编辑器支持哪些 Markdown 语法？

A: 支持标准 Markdown 和 GFM（GitHub Flavored Markdown）语法。

### Q: 图片可以上传到服务器吗？

A: 当前版本仅支持外部图片 URL，本地上传功能在后续版本中添加。

---

## 快速参考

### 键盘快捷键

- `Ctrl + B` - 加粗
- `Ctrl + I` - 斜体
- `Ctrl + S` - 保存
- `Ctrl + P` - 预览

### 常用 Markdown

```markdown
# 一级标题

## 二级标题

**加粗** _斜体_
[链接](url)
![图片](url)

- 列表项
  > 引用
  > `代码`
```

### API 状态码

- `200` - 成功
- `400` - 请求错误
- `401` - 未授权
- `404` - 未找到
- `500` - 服务器错误

---

## 扩展开发

### 添加新功能模块

1. 在 `app/admin/` 创建新页面
2. 在 `lib/admin/` 添加业务逻辑
3. 在 `app/api/admin/` 创建 API
4. 更新 `ADMIN_MENU` 配置

### 自定义编辑器

编辑 `components/admin/MarkdownEditor.tsx`：

```tsx
// 添加新的工具栏按钮
const customButton = () => {
  // 自定义功能
}
```

### 扩展 API

创建新的 API 路由：

```ts
// app/api/admin/custom/route.ts
import { requireAuth } from '@/lib/admin/auth'

export async function GET(req: Request) {
  await requireAuth(req)
  // 业务逻辑
}
```

---

## 更新日志

### v1.0.0 (2024-10-14)

**新功能**:

- ✅ JWT 认证系统
- ✅ 文章 CRUD 操作
- ✅ Markdown 编辑器
- ✅ 实时预览
- ✅ 统计仪表板

**改进**:

- ✅ 响应式设计
- ✅ 深色模式支持
- ✅ 自动保存功能

**计划中**:

- 🚧 图片上传
- 🚧 多用户支持
- 🚧 盈利管理
- 🚧 批量操作

---

## 支持

- **主文档**: [README.md](./README.md)
- **开发文档**: [DOCUMENTATION.md](./DOCUMENTATION.md)
- **部署指南**: [DEPLOYMENT.md](./DEPLOYMENT.md)

---

**由 JetCode·SKI 团队维护**
