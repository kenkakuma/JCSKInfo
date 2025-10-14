# 后台管理系统架构文档

## 📐 系统架构

### 整体设计理念

1. **模块化**：每个功能独立成模块，便于维护和扩展
2. **类型安全**：使用 TypeScript 严格类型检查
3. **无数据库**：直接操作文件系统，符合静态博客特性
4. **可扩展**：预留接口，支持未来功能扩展

## 🗂️ 目录结构

```
JCSKInfo/
├── app/
│   ├── admin/                          # 后台页面
│   │   ├── layout.tsx                  # 后台布局（含认证）
│   │   ├── page.tsx                    # 仪表板
│   │   ├── login/
│   │   │   └── page.tsx               # 登录页
│   │   └── posts/
│   │       ├── page.tsx               # 文章列表
│   │       ├── new/
│   │       │   └── page.tsx           # 创建文章
│   │       └── edit/
│   │           └── [lang]/
│   │               └── [slug]/
│   │                   └── page.tsx   # 编辑文章
│   │
│   └── api/
│       └── admin/
│           ├── auth/                   # 认证 API
│           │   ├── login/route.ts
│           │   ├── logout/route.ts
│           │   └── check/route.ts
│           ├── posts/                  # 文章 API
│           │   ├── route.ts           # GET 列表
│           │   ├── create/route.ts    # POST 创建
│           │   └── [slug]/
│           │       ├── route.ts       # GET/DELETE
│           │       ├── update/route.ts
│           │       └── toggle-draft/route.ts
│           └── stats/
│               └── route.ts           # 统计数据
│
├── components/
│   └── admin/
│       ├── AdminNav.tsx               # 侧边导航
│       ├── AuthProvider.tsx          # 认证守卫
│       ├── MarkdownEditor.tsx        # Markdown 编辑器
│       └── ImageUrlInput.tsx         # 图片插入弹窗
│
├── lib/
│   ├── admin/
│   │   ├── auth.ts                    # 认证逻辑
│   │   ├── posts.ts                   # 文章操作
│   │   └── types.ts                   # 类型定义
│   └── config/
│       └── admin-config.ts            # 后台配置
│
└── middleware.ts                       # 中间件（排除后台路由）
```

## 🔐 认证系统

### 认证流程

```
┌─────────┐     登录请求      ┌─────────────┐
│ 登录页面 │ ──────────────→  │ /api/auth/  │
│         │                   │   login     │
└─────────┘                   └─────────────┘
                                     │
                                     ↓
                              验证用户名密码
                                     │
                                     ↓
                              创建 JWT Token
                                     │
                                     ↓
                              设置 HTTP-Only Cookie
                                     │
                                     ↓
                              返回成功响应
                                     │
                                     ↓
                              跳转到仪表板
```

### 技术实现

**依赖：** `jose` - 现代化的 JWT 库

**文件：** `lib/admin/auth.ts`

**核心函数：**

1. **verifyCredentials** - 验证用户名密码

   ```typescript
   export async function verifyCredentials(username: string, password: string): Promise<boolean>
   ```

2. **createToken** - 创建 JWT Token

   ```typescript
   export async function createToken(user: AdminUser): Promise<string>
   ```

3. **verifyToken** - 验证 Token 有效性

   ```typescript
   export async function verifyToken(token: string): Promise<AdminUser | null>
   ```

4. **getCurrentUser** - 获取当前用户

   ```typescript
   export async function getCurrentUser(): Promise<AdminUser | null>
   ```

5. **requireAuth** - 页面/API 认证守卫
   ```typescript
   export async function requireAuth(): Promise<AdminUser>
   ```

### 安全特性

- ✅ JWT Token 认证
- ✅ HTTP-Only Cookie（防止 XSS）
- ✅ 24 小时自动过期
- ✅ SameSite Cookie 策略
- ✅ 生产环境 Secure Cookie

## 📝 文章管理系统

### 数据流

```
前端操作 → API 路由 → 业务逻辑 → 文件系统 → Contentlayer 重建
                                          ↓
                                      更新静态页面
```

### 核心功能实现

**文件：** `lib/admin/posts.ts`

#### 1. 文章 CRUD

| 操作     | 函数                      | 说明                       |
| -------- | ------------------------- | -------------------------- |
| 列出     | `getAllPosts(lang?)`      | 获取所有文章，可按语言筛选 |
| 读取     | `getPost(lang, slug)`     | 获取单篇文章               |
| 创建     | `createPost(input)`       | 创建新文章                 |
| 更新     | `updatePost(input)`       | 更新现有文章               |
| 删除     | `deletePost(lang, slug)`  | 删除文章                   |
| 切换草稿 | `toggleDraft(lang, slug)` | 切换发布状态               |

#### 2. Slug 生成策略

```typescript
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-') // 支持中文
    .replace(/^-+|-+$/g, '')
}
```

#### 3. 文件操作

- 使用 Node.js `fs/promises` 异步操作
- 使用 `gray-matter` 解析/生成 Frontmatter
- 直接操作 `content/posts/[lang]/[slug].mdx` 文件

### API 路由设计

所有 API 遵循 RESTful 规范：

| HTTP 方法 | 路径                                           | 功能         |
| --------- | ---------------------------------------------- | ------------ |
| GET       | `/api/admin/posts`                             | 获取文章列表 |
| POST      | `/api/admin/posts/create`                      | 创建文章     |
| GET       | `/api/admin/posts/[slug]?lang=xx`              | 获取单篇     |
| PUT       | `/api/admin/posts/[slug]/update?lang=xx`       | 更新文章     |
| DELETE    | `/api/admin/posts/[slug]?lang=xx`              | 删除文章     |
| POST      | `/api/admin/posts/[slug]/toggle-draft?lang=xx` | 切换草稿     |

**统一响应格式：**

```typescript
interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
```

## 🎨 前端组件

### 1. AuthProvider (认证守卫)

**功能：**

- 检查用户登录状态
- 未登录自动跳转到登录页
- 登录页面直接放行

**实现：**

```typescript
'use client'
export default function AuthProvider({ children }) {
  useEffect(() => {
    checkAuth()  // 验证登录状态
  }, [pathname])

  // 验证中显示加载
  if (isChecking) return <Loading />

  return <>{children}</>
}
```

### 2. AdminNav (侧边导航)

**特性：**

- 响应式设计（支持移动端）
- 当前页面高亮
- 功能模块开关（基于配置）
- 徽章提示（即将上线）

### 3. MarkdownEditor (编辑器)

**功能：**

- 工具栏快捷操作
- 左右分屏预览
- 自动保存草稿（LocalStorage）
- 简单的 Markdown → HTML 预览

**工具栏按钮：**

- 粗体、斜体
- 标题（H1/H2/H3）
- 列表（有序/无序）
- 链接、图片
- 代码块

### 4. ImageUrlInput (图片插入)

**功能：**

- 输入图片 URL
- 实时预览
- 图片描述（alt）
- 常用图床快捷按钮

## ⚙️ 配置系统

### 1. 功能开关

```typescript
// lib/config/admin-config.ts
export const ADMIN_CONFIG = {
  features: {
    posts: true, // 控制文章管理显示
    media: false, // 控制图片管理显示
    automation: false, // 控制自动化显示
    monetization: {
      enabled: true,
      affiliate: true,
      adsense: false,
    },
  },
}
```

### 2. 菜单配置

```typescript
export const ADMIN_MENU = [
  {
    id: 'dashboard',
    label: '仪表板',
    icon: 'LayoutDashboard',
    href: '/admin',
    enabled: true,
  },
  // ... 其他菜单项
]
```

- `enabled` 控制菜单是否显示
- `badge` 可添加提示标签
- `icon` 对应 Lucide React 图标名

## 🔄 中间件配置

**文件：** `middleware.ts`

**修改内容：**

```typescript
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // 排除后台路由，不进行语言重定向
  if (pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // ... 其他语言重定向逻辑
}
```

**作用：**

- 后台路由不受多语言重定向影响
- 直接访问 `/admin` 不会重定向到 `/ja/admin`

## 📦 依赖包

### 新增依赖

| 包名   | 版本   | 用途           |
| ------ | ------ | -------------- |
| `jose` | latest | JWT Token 处理 |

### 已有依赖（复用）

- `gray-matter` - Frontmatter 解析
- `lucide-react` - 图标库
- `next` - 框架
- `react` - UI 库
- `tailwindcss` - 样式

## 🔌 扩展接口

### 添加新功能模块

#### 步骤 1：创建配置

```typescript
// lib/config/admin-config.ts
export const ADMIN_CONFIG = {
  features: {
    yourFeature: true, // 添加开关
  },
}

export const ADMIN_MENU = [
  {
    id: 'your-feature',
    label: '新功能',
    icon: 'Star',
    href: '/admin/your-feature',
    enabled: ADMIN_CONFIG.features.yourFeature,
  },
]
```

#### 步骤 2：创建页面

```typescript
// app/admin/your-feature/page.tsx
'use client'
export default function YourFeaturePage() {
  // 实现页面
}
```

#### 步骤 3：创建 API

```typescript
// app/api/admin/your-feature/route.ts
import { requireAuth } from '@/lib/admin/auth'

export async function GET() {
  await requireAuth() // 认证检查
  // 实现逻辑
}
```

#### 步骤 4：业务逻辑

```typescript
// lib/admin/your-feature.ts
import 'server-only'

export async function yourFunction() {
  // 实现业务逻辑
}
```

### 添加新的 API 路由模式

所有 API 路由应：

1. 使用 `requireAuth()` 验证登录
2. 返回统一的 `ApiResponse` 格式
3. 正确处理错误（401/400/500）

```typescript
export async function POST(request: NextRequest) {
  try {
    await requireAuth()

    const body = await request.json()
    // 验证输入
    // 执行操作

    return NextResponse.json<ApiResponse>({
      success: true,
      data: result,
    })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json<ApiResponse>({ success: false, error: '未授权' }, { status: 401 })
    }
    return NextResponse.json<ApiResponse>({ success: false, error: error.message }, { status: 500 })
  }
}
```

## 🎯 设计模式

### 1. Server-Only 模式

所有服务端逻辑文件头部添加：

```typescript
import 'server-only'
```

防止敏感代码打包到客户端。

### 2. Client Component 模式

需要交互的组件使用：

```typescript
'use client'
```

### 3. 统一错误处理

API 路由统一捕获错误：

- `Unauthorized` → 401
- 验证错误 → 400
- 其他错误 → 500

### 4. 类型安全

所有函数都有明确的类型定义：

```typescript
export async function createPost(input: CreatePostInput): Promise<PostData>
```

## 📊 数据流图

### 文章创建流程

```
用户填写表单
    ↓
前端验证
    ↓
POST /api/admin/posts/create
    ↓
requireAuth() 验证登录
    ↓
验证必填字段
    ↓
generateSlug(title)
    ↓
创建 MDX 文件
    ↓
写入文件系统
    ↓
返回成功响应
    ↓
跳转到文章列表
```

### 认证状态检查

```
页面加载
    ↓
AuthProvider
    ↓
GET /api/admin/auth/check
    ↓
读取 Cookie
    ↓
verifyToken(token)
    ↓
有效？
├─ 是 → 渲染页面
└─ 否 → 跳转登录页
```

## 🛠️ 开发建议

### 1. 调试技巧

- 使用浏览器开发工具查看网络请求
- 检查 Cookie 是否正确设置
- 查看 Console 错误信息

### 2. 测试流程

1. 登录功能测试
2. 文章 CRUD 测试
3. 多语言切换测试
4. 权限验证测试

### 3. 性能优化

- 文章列表考虑分页
- 图片使用 CDN
- 启用 Next.js 缓存

### 4. 安全加固

- 定期更新依赖
- 使用强密码策略
- 添加访问日志
- 考虑添加 CSRF 保护

## 📝 总结

这是一个**模块化、类型安全、易扩展**的后台管理系统。核心设计原则：

1. **简单优先**：无数据库，直接文件操作
2. **类型安全**：TypeScript 全覆盖
3. **模块化**：功能独立，便于维护
4. **可扩展**：配置驱动，接口预留
5. **安全可靠**：JWT 认证，权限控制

系统已实现第一阶段所有功能，为后续扩展打下坚实基础。
