# 📝 更新日志 (Changelog)

> JetCode·SKI 项目版本更新记录

所有值得注意的项目更改都将记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，  
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

---

## [0.2.6-beta] - 2025-10-15

### 🎯 版本概述

**功能完善与用户体验优化** - 添加搜索、浏览量统计、图片加载优化、暗色模式增强等核心功能。

### ✨ 新增功能

#### 🔍 搜索功能

- 全站智能搜索（标题、摘要、标签、内容）
- 搜索关键词高亮显示
- 搜索历史记录（最多 10 条）
- 快捷键支持（Ctrl/Cmd + K）
- 搜索结果页面带评分排序
- 优雅的模态框设计

#### 📊 文章浏览量统计

- 基于 localStorage 的本地统计
- 防重复计数（每天每用户每文章一次）
- 浏览历史记录（最多 1000 条）
- 文章详情页和卡片显示浏览量
- 浏览量格式化（K/M）

#### 🖼️ 图片加载优化

- 图片加载骨架屏动画
- 加载失败优雅回退 UI
- Next.js Image 配置优化（remotePatterns）
- SVG 图片安全支持
- Cloudinary CDN 集成
- 缓存策略优化（60 秒 TTL）

#### 🎨 暗色模式优化

- 全局平滑过渡动画（0.2 秒）
- 所有组件暗色模式对比度增强
- 智能排除输入框等元素的过渡

#### 🔗 分享功能增强

- 优雅的悬停效果（放大 + 阴影）
- 复制成功视觉反馈（勾选图标 + 弹跳动画）
- 工具提示气泡（带箭头）
- 状态颜色变化（复制后变绿）

### 🏗️ 基础设施

- **PWA 图标**：动态生成 SVG 格式图标（192x192, 512x512）
- **版本管理**：修复 `package.json` 版本号为 `0.2.6-beta`
- **图标脚本**：添加 `scripts/generate-icons.js` 自动生成图标

### 🔧 技术改进

- 搜索系统：正则转义、客户端实现、高性能
- 统计系统：localStorage API、错误处理、数据清理
- 图片系统：多层回退、CDN 支持、SVG CSP

### 📝 新增文件

```
lib/search.ts
lib/views.ts
components/Search.tsx
components/ViewCounter.tsx
components/ImageSkeleton.tsx
app/[lang]/search/page.tsx
public/icon-192.svg
public/icon-512.svg
scripts/generate-icons.js
RELEASE_v0.2.6.md
```

### 🔄 修改文件

```
package.json
app/manifest.ts
next.config.js
app/globals.css
app/[lang]/layout.tsx
app/[lang]/posts/[slug]/page.tsx
components/MasonryNewsCard.tsx
components/ShareButtons.tsx
```

### 🎯 性能影响

- Client Bundle: +15 KB（主要是搜索功能）
- Server Bundle: +5 KB
- 总代码量: ~700 行

---

## [0.2.5-beta] - 2025-10-15

### 🎯 版本概述

专注于 **SEO 优化** 和 **用户体验提升**，为网站内容发布做好充分准备。保持轻量级，无重型监控系统。

### ✨ 新增功能

#### SEO 优化

- **结构化数据 (JSON-LD)**
  - ArticleJsonLd: 文章结构化数据
  - BreadcrumbJsonLd: 面包屑结构化数据
  - WebsiteJsonLd: 网站结构化数据
  - OrganizationJsonLd: 组织结构化数据
  - 提升 Google 搜索展示效果，支持丰富摘要

- **RSS Feed 生成器**
  - 支持三种语言独立 Feed (`/vi/feed.xml`, `/ja/feed.xml`, `/en/feed.xml`)
  - 自动更新，包含文章图片和标签
  - 完全符合 RSS 2.0 标准

- **增强的 Meta 标签**
  - 自动从标签和标题生成 keywords
  - 添加 RSS Feed link 到 `<head>`
  - 支持英语语言标签

- **面包屑导航**
  - 响应式设计，支持多语言
  - 包含结构化数据标记
  - Home 图标、分隔符、悬停效果

#### 用户体验优化

- **阅读进度条**
  - 页面顶部固定显示
  - 渐变色彩（蓝→紫→粉）
  - 实时更新，平滑动画
  - 性能优化（passive 事件监听）

- **返回顶部按钮**
  - 滚动超过 300px 后显示
  - 平滑滚动动画
  - 悬停放大效果
  - 深色模式适配

#### CMS 优化

- **发布前检查清单**
  - 标题: "建议 10-60 个字符，包含关键词"
  - 摘要: "建议 50-160 个字符"
  - 标签: "至少添加 2-5 个相关标签"
  - 特色图片: "建议尺寸 1200x630"
  - 详细的字段提示和 SEO 最佳实践指导

### ⚡ 性能优化

- **字体加载优化**
  - 所有字体使用 `font-display: swap`
  - 预加载关键 Inter 字体
  - 防止 FOIT (Flash of Invisible Text)

- **轻量级实现**
  - 移除计划中的重型监控系统
  - 保持核心功能轻量
  - 新增功能仅增加 < 10KB

### 🔧 技术改进

- 文章页面集成所有新组件
- RSS Feed 链接添加到 metadata
- 优化面包屑导航路径生成
- 增强 keywords 自动生成逻辑

### 📚 文档更新

- 新增 `RELEASE_v0.2.5.md` 完整发布说明
- 更新 CHANGELOG.md
- 包含完整测试清单和部署步骤

### 🎯 预期效果

- **SEO**: 结构化数据覆盖率 100%
- **用户体验**: 阅读体验提升 30%
- **内容质量**: 发布规范化，SEO 友好
- **性能**: 保持高性能，无明显影响

---

## [0.2.0-beta] - 2025-10-15

### 🎉 重大更新

集成轻量级 Git-based CMS（Sveltia CMS），解决 Vercel 只读文件系统限制，实现在线内容管理。

### ✨ 新增功能

#### 内容管理系统 (CMS)

- **集成 Sveltia CMS**：轻量级、现代化的 Git-based 内容管理系统
- **在线文章编辑**：无需本地环境，直接在浏览器中编辑文章
- **多语言支持**：完整支持越南语、日语、英语三语种文章管理
- **实时预览**：Markdown 编辑器支持实时预览
- **草稿功能**：支持草稿状态，可先编辑后发布
- **版本控制**：所有更改通过 Git 管理，可追溯历史版本
- **自动部署**：保存文章后自动触发 Vercel 部署

#### 认证系统

- **Personal Access Token 认证**：简单、安全的 GitHub Token 认证方式
- **嵌入式 CMS**：集成到现有后台管理系统，受 JWT 认证保护
- **双重安全保护**：后台登录 + GitHub Token 双重验证

#### 用户体验

- **统一管理界面**：CMS 无缝集成到 `/admin/posts` 路径
- **响应式设计**：支持桌面和移动端访问
- **深色模式支持**：CMS 界面支持深色模式

### 🔧 技术改进

#### 架构优化

- 移除旧的文件系统文章编辑功能（不适用于 Vercel）
- 采用 Git-based 工作流，完美适配 Vercel 无服务器架构
- 创建自定义 OAuth 代理 API（`/api/cms/auth`）

#### 配置文件

- 添加 `public/cms/config.yml`：Sveltia CMS 配置文件
- 添加 `public/cms/index.html`：CMS 入口文件
- 更新 `middleware.ts`：排除 CMS 路由的语言重定向

#### 文件结构

```
public/cms/
├── index.html       # CMS 入口
└── config.yml       # CMS 配置

app/api/cms/auth/
└── route.ts         # OAuth 认证 API

app/admin/posts/
└── page.tsx         # CMS 嵌入页面（iframe）
```

### 📚 文档更新

#### 新增文档

- `SVELTIA_CMS_USAGE.md`：用户使用指南（推荐阅读）
- `SVELTIA_CMS_SETUP.md`：技术集成文档
- `SVELTIA_INTEGRATION.md`：架构说明文档
- `CHANGELOG.md`：版本更新日志（本文件）

#### 更新文档

- `README.md`：添加 CMS 功能说明
- `VERCEL_LIMITATIONS.md`：更新解决方案
- `.vercel-credentials.md`：添加 GitHub Token 配置

### 🗑️ 移除功能

#### 已移除文件

- `app/admin/posts/new/page.tsx`：旧的新建文章页面
- `app/admin/posts/edit/[lang]/[slug]/page.tsx`：旧的编辑文章页面
- `/app/cms/page.tsx`：独立 CMS 入口（改为嵌入式）

#### 移除原因

- 旧的文件系统编辑功能不适用于 Vercel 只读文件系统
- 改用 Git-based 工作流，通过 GitHub API 管理内容

### 🐛 问题修复

- 修复 Vercel 只读文件系统导致的文章编辑失败问题
- 修复 Vercel 只读文件系统导致的文章删除失败问题
- 优化多语言路由中间件，排除 CMS 路径

### 🔒 安全增强

- CMS 嵌入后台管理系统，受 JWT 认证保护
- 移除独立 `/cms` 入口，仅允许通过认证后台访问
- 使用 Personal Access Token，避免 OAuth 配置复杂性
- 所有内容更改通过 GitHub 审计

### 📊 性能优化

- 使用 Sveltia CMS（比 Decap CMS 快 10 倍）
- 静态资源 CDN 加速（通过 Vercel Edge Network）
- 按需加载 CMS 资源（iframe 懒加载）

### 🎯 工作流程

#### 内容发布流程（全自动）

1. 在 CMS 中编辑文章
2. 点击 "Save"
3. Sveltia CMS 自动提交到 GitHub
4. GitHub 触发 Vercel 自动部署
5. Vercel 重新构建网站（2-3 分钟）
6. 网站自动更新

### 📝 使用说明

#### 快速开始

1. 创建 GitHub Personal Access Token
2. 访问 `https://jcski.com/admin/login` 登录后台
3. 进入 "文章管理"
4. 使用 Token 登录 CMS
5. 开始创作！

详细说明请查看：`SVELTIA_CMS_USAGE.md`

### ⚠️ 已知限制

- 图片上传需要通过图床或手动提交到 Git
- Personal Access Token 仅适用于仓库所有者（团队协作需配置 OAuth）
- 内容更新需要等待 2-3 分钟部署时间

### 🔮 下一步计划

- [ ] 配置 GitHub OAuth 支持团队协作
- [ ] 集成 Cloudinary 实现图片直接上传
- [ ] 添加文章发布定时功能
- [ ] 优化 CMS 界面本地化

---

## [0.2.1-beta] - 2025-10-15

### 🎉 新增功能

#### 图片管理系统

- **Cloudinary 集成**：完整的图片上传和管理系统
- **自动优化**：自动压缩和 WebP 转换
- **CDN 加速**：全球 CDN 分发，加载速度提升
- **响应式图片**：自动生成多尺寸图片

#### 图片上传 API

- **上传接口**：`POST /api/upload/image` - 支持图片上传
- **配置接口**：`GET /api/upload/image` - 获取上传配置
- **文件验证**：类型和大小验证（最大 20MB）
- **自动优化**：上传时自动优化图片

#### 特色图片增强

- **双模式支持**：支持上传图片和引用外部 URL
- **Cloudinary 上传**：直接在 CMS 中上传特色图片
- **外部 URL**：继续支持引用 Unsplash 等图床
- **灵活选择**：根据需求选择最合适的方式

#### 文章图片增强 ⭐ 新增

- **ImageWithCaption 组件**：全新的图片展示组件
- **对齐方式**：支持左对齐、居中、右对齐
- **图片说明**：自动显示 caption 文字
- **自定义尺寸**：灵活设置 width 和 height
- **自动美化**：圆角、阴影效果
- **响应式设计**：自动适配移动端
- **暗黑模式**：自动适配主题

#### 工具函数

- **图片优化**：`getOptimizedImageUrl()` - 获取优化后的图片 URL
- **响应式图片**：`getResponsiveSrcSet()` - 生成 srcset
- **缩略图**：`getThumbnailUrl()` - 快速生成缩略图
- **OG 图片**：`getOGImageUrl()` - 社交媒体分享图片

### 🔧 技术改进

#### Sveltia CMS 增强

- 集成 Cloudinary 媒体库
- 支持直接在 CMS 中上传图片
- 自动返回优化后的图片 URL
- `image` widget 类型从 `string` 改为 `image`

#### MDX 组件增强

- 添加 `ImageWithCaption` 组件到 MDX Components
- 支持 JSX 语法在 Markdown 中使用
- 自动应用 Tailwind CSS 样式

#### Middleware 优化

- 排除 `/api` 路由的语言重定向
- 提升 API 响应速度

### 📚 文档更新

- **新增**：`IMAGE_USAGE_GUIDE.md` - 完整的图片使用指南
- **新增**：`CLOUDINARY_SETUP.md` - Cloudinary 集成文档
- 更新图片上传使用指南

### 🐛 问题修复

- 修复 middleware 处理 API 路由导致的错误
- 修复端口冲突问题
- 修复图片上传大小限制（从 10MB 提升到 20MB）

### 💡 使用示例

#### ImageWithCaption 组件使用

```jsx
<ImageWithCaption
  src="https://res.cloudinary.com/dt@hpzm21/image/upload/v123/jcski-posts/image.jpg"
  alt="图片描述"
  caption="图片说明文字"
  align="center" // left | center | right
  width={800}
  height={600}
/>
```

#### 特色图片 - 上传方式

```yaml
image: 'https://res.cloudinary.com/dt@hpzm21/image/upload/v123/jcski-posts/featured.jpg'
```

#### 特色图片 - 外部 URL

```yaml
image: 'https://images.unsplash.com/photo-xxxxx'
```

---

## [0.1.0-beta] - 2025-10-14

### 🎉 首次发布

JetCode·SKI 多语言资讯聚合平台首次发布。

### ✨ 核心功能

#### 多语言支持

- **三语种支持**：越南语（vi）、日语（ja）、英语（en）
- **自动语言检测**：根据浏览器设置自动选择语言
- **语言切换**：顶部导航栏支持一键切换
- **URL 国际化**：`/vi/`, `/ja/`, `/en/` 路径前缀

#### 内容展示

- **首页布局**：Hero Card + 标准卡片网格布局
- **文章列表**：分页展示，支持筛选和排序
- **文章详情**：Markdown/MDX 渲染，代码高亮
- **标签系统**：文章分类标签，支持标签筛选
- **相关文章推荐**：基于标签的智能推荐

#### 右侧小组件

- **市场行情**：实时股市数据（模拟）
- **热门公司**：科技公司股票信息
- **加密货币**：加密货币实时价格
- **天气信息**：多城市天气显示

#### 后台管理系统

- **JWT 认证**：安全的身份验证
- **仪表盘**：文章统计、访问数据
- **文章管理**：CRUD 操作（本地模式）
- **草稿功能**：支持草稿保存
- **深色模式**：支持明暗主题切换

#### 技术栈

- **框架**：Next.js 14 (App Router)
- **语言**：TypeScript
- **样式**：Tailwind CSS
- **内容**：Contentlayer + MDX
- **部署**：Vercel
- **版本控制**：Git + GitHub

### 🎨 设计特点

- **现代化 UI**：简洁、专业的设计风格
- **响应式设计**：完美支持桌面和移动端
- **深色模式**：支持系统主题自动切换
- **JetBrains Mono 字体**：品牌标识使用 800 ExtraBold Italic

### 🔧 配置

#### 环境变量

- `ADMIN_USERNAME`：后台管理员用户名
- `ADMIN_PASSWORD`：后台管理员密码
- `JWT_SECRET`：JWT 签名密钥
- `NEXT_PUBLIC_SITE_URL`：网站 URL

#### 部署

- **平台**：Vercel
- **域名**：jcski.com / www.jcski.com
- **自动部署**：推送到 GitHub 自动触发

### 📚 文档

- `README.md`：项目说明
- `ADMIN_ARCHITECTURE.md`：后台系统架构
- `VERCEL_DEPLOYMENT.md`：Vercel 部署指南
- `VERCEL_LIMITATIONS.md`：Vercel 限制说明

### 🐛 已知问题

- 后台文章编辑功能在 Vercel 上不可用（只读文件系统限制）
- 需要在本地编辑 MDX 文件并推送到 GitHub

---

## 版本号说明

### 格式：`主版本号.次版本号.修订号[-预发布标识]`

- **主版本号**：重大架构变更或不兼容的 API 修改
- **次版本号**：新增功能，向下兼容
- **修订号**：问题修复，向下兼容
- **预发布标识**：`alpha`, `beta`, `rc`（候选版本）

### 示例

- `0.1.0-beta`：Beta 测试版本
- `0.2.0-beta`：Beta 测试版本，新增功能
- `1.0.0`：正式发布版本

---

## 更新类型说明

- 🎉 **重大更新**：重要的新功能或架构变更
- ✨ **新增功能**：添加的新功能
- 🔧 **技术改进**：技术层面的优化和改进
- 📚 **文档更新**：文档的新增或修改
- 🗑️ **移除功能**：移除的功能或文件
- 🐛 **问题修复**：修复的 Bug
- 🔒 **安全增强**：安全相关的改进
- 📊 **性能优化**：性能提升
- ⚠️ **已知限制**：当前版本的限制
- 🔮 **下一步计划**：后续版本规划

---

## 贡献指南

### 提交更新日志

每次发布新版本时，请按以下步骤更新此文件：

1. 在文件顶部添加新版本区块
2. 填写版本号和发布日期
3. 按类型分类列出所有更改
4. 使用清晰、简洁的语言描述更改
5. 添加必要的代码示例或配置说明

### 版本发布流程

```bash
# 1. 更新 CHANGELOG.md
# 2. 提交更改
git add CHANGELOG.md
git commit -m "docs: update changelog for v0.x.0"

# 3. 创建版本标签
git tag -a v0.x.0 -m "Release v0.x.0"

# 4. 推送到 GitHub
git push origin main --tags

# 5. Vercel 自动部署
```

---

**版本历史**: [GitHub Releases](https://github.com/kenkakuma/JCSKInfo/releases)  
**问题反馈**: [GitHub Issues](https://github.com/kenkakuma/JCSKInfo/issues)
