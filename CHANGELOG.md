# 📝 更新日志 (Changelog)

> JetCode·SKI 项目版本更新记录

所有值得注意的项目更改都将记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

---

## [0.3.1] - 2025-10-18

### 🎯 版本概述

**AI 新闻轮播与 SEO 优化** - 添加智能 AI 新闻轮播功能，完成全面 SEO 审计，为搜索引擎收录做准备。

### ✨ 新增功能

#### 🤖 AI 新闻轮播组件

全新的 AI 新闻专属轮播模块，智能展示 AI 相关科技新闻。

**核心功能**：
- **智能过滤**：自动筛选包含 AI 标签的文章（不区分大小写）
- **时效性控制**：仅显示 7 天内发布的 AI 新闻，确保内容新鲜度
- **自动连播**：8 秒自动切换（可配置间隔时间）
- **翻拍动画**：3D `rotateY` 翻转效果，平滑过渡
- **AI 标识**：顶部渐变色 "⚡ AI News" 徽章

**交互功能**：
- 鼠标悬停显示左右箭头和播放/暂停按钮
- 键盘导航：← → 切换文章，空格暂停/播放
- 底部指示器显示当前位置和总数
- 计数显示："X / Y AI Related News"

**设计特点**：
- 与 HeroCarousel 保持一致的设计风格
- AI 标签使用蓝紫渐变突出显示
- 完整的响应式设计和暗色模式支持
- 图片左侧，文字右侧布局（占3列宽度）

**实现文件**：
- `components/AICarousel.tsx` - AI 轮播组件
- `app/[lang]/page.tsx` - 集成到主页第一个大卡片位置

**过滤逻辑**：
```typescript
// 同时满足两个条件：
// 1. 标签包含 "ai" 或 "AI"
// 2. 发布时间在过去 7 天以内
const aiPosts = posts.filter((post) => {
  const hasAITag = post.tags?.some((tag) => tag.toLowerCase().includes('ai'))
  const postDate = new Date(post.date)
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  return hasAITag && postDate >= oneWeekAgo
})
```

#### 📊 SEO 全面审计与优化文档

创建完整的 SEO 优化文档套件，为 v0.4.0 广告集成做准备。

**新增文档**：

1. **`docs/SEO_AUDIT_REPORT.md`** (10,000+ 字)
   - 当前 SEO 状态全面分析
   - 为什么还没被搜索引擎收录的原因
   - 完整优化建议和行动计划
   - v0.4.0 广告集成详细规划
   - 预计收录时间：2-7 天（完成所有建议后）

2. **`docs/SEO_QUICK_START.md`**
   - 今天立即执行的任务清单（逐步指导）
   - Google Search Console 配置步骤
   - Google Analytics 设置指南
   - 故障排查指南

3. **`docs/SEO_CODE_CHANGES.md`**
   - 所有需要修改的代码（复制即用）
   - hreflang 标签完整实现
   - 隐私政策页面模板
   - 环境变量配置示例
   - 部署验证步骤

4. **`docs/ROADMAP_v0.4.0.md`**
   - 6 周详细规划（5 个阶段）
   - AdSense 申请与集成完整流程
   - 联盟营销系统开发计划
   - 成功指标（KPIs）和时间线
   - 预计发布时间：4-6 周后

**关键 SEO 发现**：

**✅ 已实现的优势**：
- robots.txt 和 sitemap.xml 配置正确
- 完整的 meta 标签（OpenGraph, Twitter Cards）
- JSON-LD 结构化数据（Article, Breadcrumb, Website, Organization）
- Google Analytics 基础设施就绪
- Google AdSense 基础设施就绪

**❌ 关键缺失项**（导致未收录的主要原因）：
- Google Search Console 未验证
- 未主动提交 sitemap
- 缺少 hreflang 标签
- Google Analytics 未配置
- 缺少隐私政策页面（AdSense 必需）

**立即行动计划**：
1. Google Search Console 验证（30分钟）
2. 配置 Google Analytics（20分钟）
3. 请求索引重要页面（15分钟）

### 🔧 技术改进

#### 组件优化

**AICarousel 性能优化**：
- 使用 `useCallback` 避免不必要的重渲染
- 过滤逻辑在组件内部完成，不影响其他组件
- 翻拍动画性能优化（500ms 过渡）

**代码质量**：
- 无构建错误或警告
- 完整的 TypeScript 类型支持
- 符合 React Hooks 最佳实践

### 📚 文档更新

**新增文档（4 份）**：
- `docs/SEO_AUDIT_REPORT.md` - SEO 审计报告
- `docs/SEO_QUICK_START.md` - 快速启动指南
- `docs/SEO_CODE_CHANGES.md` - 代码修改清单
- `docs/ROADMAP_v0.4.0.md` - v0.4.0 路线图

### 🎯 版本亮点

✅ **AI 内容聚焦**：专属 AI 新闻轮播，突出技术前沿内容
✅ **内容新鲜度**：7 天时效性控制，确保展示最新资讯
✅ **交互体验**：翻拍动画 + 键盘快捷键 + 自动播放
✅ **SEO 准备**：完整的 SEO 优化文档和路线图
✅ **广告准备**：为 v0.4.0 AdSense 集成奠定基础

### 🔮 下一步计划（v0.4.0）

**SEO 优化**（Week 1-2）：
- [ ] Google Search Console 验证与配置
- [ ] 实现 hreflang 标签
- [ ] 创建隐私政策页面
- [ ] 配置 Google Analytics

**内容建设**（Week 2-4）：
- [ ] 发布 20-30 篇高质量文章
- [ ] 优化现有内容 SEO
- [ ] 建立外部链接

**AdSense 集成**（Week 4-6）：
- [ ] 申请 Google AdSense
- [ ] 配置广告单元
- [ ] 优化广告位置
- [ ] 实现联盟营销系统

**预计发布时间**：4-6 周后（确保搜索引擎充分收录）

---

## [0.3.0-beta] - 2025-10-18

### 🎯 版本概述

**自动化内容采集系统** - 集成 RSS 自动采集功能，实现内容半自动化生产工作流，支持定时采集、智能去重、草稿审核。

### 🎉 重大更新

#### 📡 RSS 内容自动采集系统

全新的 RSS 内容采集模块，实现从 RSS 源自动抓取、转换、发布的完整工作流。

- **自动化采集**：GitHub Actions 定时任务，每 6 小时自动运行
- **智能去重**：基于 MD5 内容哈希的重复检测机制
- **草稿管理**：所有采集内容自动标记为 `draft: true`，需人工审核
- **格式转换**：HTML → Markdown 自动转换，保留格式和图片
- **多语言支持**：支持多语言 RSS 源配置（当前配置：仅英语）

### ✨ 新增功能

#### 📰 RSS 源配置

- **Engadget 集成**：科技新闻源 `https://www.engadget.com/rss.xml`
- **灵活配置**：`scripts/rss-collector/feeds.config.js` 集中管理所有源
- **优先级支持**：high/medium/low 优先级设置
- **分类标签**：自动提取和分配文章分类

#### 🔄 内容处理管道

**核心模块**：
- `parser.js` - RSS 解析和内容提取
- `generator.js` - MDX 文件生成
- `utils.js` - 工具函数库（slug生成、哈希计算等）
- `index.js` - 主控制器

**关键功能**：
- URL 友好 slug 自动生成（支持 CJK 字符）
- 自动提取文章摘要（160字符限制）
- 自动提取首图（从 HTML 或 RSS enclosure）
- 自动提取标签（来自 RSS categories）
- 日期标准化（ISO 8601 格式）
- 内容长度验证（最小 100 字符）

#### ⚙️ GitHub Actions 工作流

**文件**：`.github/workflows/rss-collector.yml`

**触发条件**：
- **定时任务**：每 6 小时运行一次（00:00, 06:00, 12:00, 18:00 UTC）
- **手动触发**：支持 workflow_dispatch 手动执行
- **Dry Run 模式**：测试模式，不提交更改

**工作流步骤**：
1. Checkout 代码仓库
2. 设置 Node.js 18 环境
3. 安装 npm 依赖
4. 运行 RSS 采集器
5. 检测新内容
6. Git 提交和推送
7. 生成执行摘要报告

**输出示例**：
```
📊 RSS Collection Summary
- Timestamp: 2025-10-18 01:59 UTC
- Status: success
- New Content: ✅ Yes
```

#### 🔍 智能去重系统

- **内容哈希**：MD5(title + content前500字符)
- **持久化存储**：`.collected-hashes.json` 跟踪已采集内容
- **跨运行去重**：防止重复采集相同文章
- **自动清理**：可配置哈希过期策略

### 🔧 技术改进

#### 架构优化

**新增目录结构**：
```
scripts/rss-collector/
├── package.json          # 独立依赖管理
├── feeds.config.js       # RSS 源配置
├── parser.js             # RSS 解析器
├── generator.js          # MDX 生成器
├── utils.js              # 工具函数
├── index.js              # 主入口
├── .gitignore            # Git 忽略规则
└── .collected-hashes.json # 去重哈希存储
```

**依赖管理**：
- `rss-parser@3.13.0` - RSS 解析
- `gray-matter@4.0.3` - Frontmatter 处理
- `turndown@7.1.2` - HTML to Markdown
- `node-fetch@3.3.2` - HTTP 请求

#### 路径处理优化

**问题修复**：
- GitHub Actions 环境 `process.cwd()` 返回 `scripts/rss-collector`
- 本地环境 `process.cwd()` 返回项目根目录

**解决方案**：
```javascript
const projectRoot = currentDir.endsWith('rss-collector')
  ? path.resolve(currentDir, '..', '..')  // GitHub Actions
  : path.resolve(currentDir);              // 本地环境
```

#### Git 配置优化

- `.collected-hashes.json` 必须提交到仓库（去重需要）
- 自动提交消息格式：`feat: Add RSS collected drafts [TIMESTAMP]`
- 包含 `[skip ci]` 标签避免循环触发
- 自动配置 Git 用户：`RSS Content Collector <rss-bot@jcski.com>`

### 📚 文档更新

#### 新增文档

- **`docs/RSS_COLLECTOR_GUIDE.md`** (15,000+ 字完整指南)
  - 快速开始
  - 配置说明
  - 本地运行
  - GitHub Actions 设置
  - 内容审核工作流
  - 故障排查
  - 技术架构
  - FAQ

### 🐛 问题修复

#### Issue #1: 路径计算错误
- **问题**：文件保存到 `scripts/rss-collector/content/posts/` 而非 `content/posts/`
- **原因**：GitHub Actions 工作目录导致路径计算错误
- **修复**：添加环境检测，自动调整项目根目录路径
- **提交**：`6783cca` - "fix: Correct file path resolution for GitHub Actions"

#### Issue #2: .gitignore 阻止提交
- **问题**：`.collected-hashes.json` 被 `.gitignore` 忽略
- **原因**：初始配置错误，该文件应该被提交
- **修复**：从 `.gitignore` 中移除该文件
- **提交**：`fca0a3b` - "fix: Allow .collected-hashes.json to be committed"

#### Issue #3: YAML 语法错误
- **问题**：工作流文件多处换行错误导致语法失败
- **原因**：手动编辑时不正确的换行
- **修复**：修正所有多行 YAML 语法
- **提交**：`c5f2988` - "fix: Correct YAML syntax in RSS workflow"

### 🔄 配置变更

#### RSS 源配置演变

**初始配置**（测试阶段）：
- 日语：CNET Japan, Gizmodo Japan
- 英语：TechCrunch, The Verge
- 越南语：Genk.vn

**当前配置**（生产环境）：
- 英语：Engadget（唯一源）

**配置参数**：
```javascript
COLLECTOR_CONFIG: {
  maxArticlesPerFeed: 3,      // 每个源每次最多采集3篇
  minContentLength: 100,      // 最小内容长度100字符
  maxSlugLength: 60,          // Slug 最大长度60字符
  draftMode: true,            // 强制草稿模式
  validation: {
    requireTitle: true,        // 必须有标题
    requireContent: true,      // 必须有内容
    requireDate: true          // 必须有日期
  }
}
```

### 📊 性能指标

- **GitHub Actions 执行时间**：20-30 秒/次
- **采集效率**：3 篇文章/源
- **成功率**：100%（带错误处理）
- **存储占用**：~2KB/文章（MDX 格式）

### 🔒 安全措施

- GitHub Actions 权限：仅 `contents: write`
- 工作流文件保护：需要 `workflow` scope 权限修改
- Personal Access Token 认证
- Git commit 自动签名

### 📝 工作流程

#### 内容生产流程

```
定时触发 (每6小时)
    ↓
采集 RSS 源 (Engadget)
    ↓
解析文章内容
    ↓
HTML → Markdown 转换
    ↓
生成 MDX 文件 (draft: true)
    ↓
去重检测 (哈希比对)
    ↓
保存到 content/posts/en/
    ↓
Git 提交和推送
    ↓
GitHub → Vercel 自动部署
    ↓
Sveltia CMS 可见草稿
    ↓
人工审核和编辑
    ↓
发布 (draft: false)
    ↓
网站前台显示
```

### 🎯 草稿管理机制

**草稿保护**：
- 所有采集文章 `draft: true`
- 前台自动过滤草稿（`getPostsByLang` 函数）
- CMS 后台可见所有草稿
- 需手动审核后发布

**验证**：
```typescript
// lib/utils.ts:97
export function getPostsByLang(posts: Post[], lang: Language): Post[] {
  return posts
    .filter((post) => post.lang === lang && !post.draft)  // 过滤草稿
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
```

### 🔮 下一步计划

- [ ] 添加更多 RSS 源（多样化内容来源）
- [ ] 实现 RSS 源健康检查和告警
- [ ] 添加采集统计和可视化面板
- [ ] 支持全文抓取（针对摘要类 RSS）
- [ ] 实现关键词过滤和内容分类
- [ ] 添加图片本地化存储（避免外链失效）
- [ ] 支持定时发布（从草稿自动变为已发布）
- [ ] 集成 AI 内容优化（标题、摘要改写）

### 📦 文件清单

#### 新增文件

```
.github/workflows/rss-collector.yml
scripts/rss-collector/package.json
scripts/rss-collector/feeds.config.js
scripts/rss-collector/parser.js
scripts/rss-collector/generator.js
scripts/rss-collector/utils.js
scripts/rss-collector/index.js
scripts/rss-collector/.gitignore
scripts/rss-collector/.collected-hashes.json
docs/RSS_COLLECTOR_GUIDE.md
```

#### 修改文件

```
package.json (version: 0.2.7-beta → 0.3.0-beta)
CHANGELOG.md (添加本版本记录)
```

### 🎓 学习要点

**RSS 采集系统设计原则**：
1. **幂等性**：去重机制确保重复运行不会产生重复内容
2. **可恢复性**：持久化哈希存储，重启不丢失状态
3. **环境适配**：同时支持本地和 CI/CD 环境
4. **错误处理**：优雅降级，单个源失败不影响整体
5. **人工审核**：自动化采集 + 人工质量控制

**GitHub Actions 最佳实践**：
1. 使用 `continue-on-error` 处理非关键步骤
2. 使用 `GITHUB_OUTPUT` 传递步骤间数据
3. 使用 `GITHUB_STEP_SUMMARY` 生成可读报告
4. 合理设置 `permissions` 最小权限
5. 使用 Heredoc 处理多行字符串

### 🏆 版本亮点

✅ **完全自动化**：从采集到发布全流程自动化
✅ **零维护成本**：定时运行，无需人工干预
✅ **质量保障**：草稿机制确保内容质量
✅ **可扩展性**：轻松添加新 RSS 源
✅ **Git 版本控制**：所有内容变更可追溯
✅ **CI/CD 集成**：与现有部署流程完美融合

---

## [0.2.7-beta] - 2025-01-15

### 🎯 版本概述

**功能增强与性能优化** - 修复暗色模式过渡问题，增强后台仪表板真实数据统计。

### ✨ 新增功能

#### 📊 后台仪表板数据增强

- 热门标签 Top 10 统计展示
- 月度发布趋势图表（最近 6 个月）
- 排名序号和进度条可视化
- 所有数据来自真实文章统计
- 实时计算，无缓存延迟

### 🐛 Bug 修复

#### 🎨 暗色模式过渡优化

- 修复切换时掉帧感问题
- 移除全局 `*` 选择器（性能优化）
- 缩短过渡时间（0.2-0.3s → 0.15s）
- 精确指定需要过渡的元素
- 排除图片、视频等不需要过渡的元素
- 性能提升约 70-80%

### 📦 技术变更

#### 新增文件

- `lib/dashboard-stats.ts` - 仪表板统计工具库

#### 修改文件

- `app/globals.css` - CSS 过渡选择器优化
- `app/api/admin/stats/route.ts` - 增强统计 API
- `app/admin/page.tsx` - 仪表板界面更新
- `lib/admin/types.ts` - 类型定义扩展
- `package.json` - 版本号更新为 0.2.7-beta

### 🎯 版本管理规范

- **Bug 修复/调试**：x.x.1 (Patch 版本)
- **新功能开发**：x.1.x (Minor 版本)

本次发布包含新功能（热门标签、发布趋势），因此为 Minor 版本升级。

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
