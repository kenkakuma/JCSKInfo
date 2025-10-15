# 📊 Google Analytics 4 & AdSense 集成指南

本文档详细说明如何在 JetCode·SKI 项目中配置和使用 Google Analytics 4 (GA4) 和 Google AdSense。

---

## 📋 目录

1. [Google Analytics 4 配置](#google-analytics-4-配置)
2. [Google AdSense 配置](#google-adsense-配置)
3. [环境变量设置](#环境变量设置)
4. [功能说明](#功能说明)
5. [使用指南](#使用指南)
6. [常见问题](#常见问题)

---

## 🎯 Google Analytics 4 配置

### 步骤 1: 创建 GA4 账号和资源

1. 访问 [Google Analytics](https://analytics.google.com/)
2. 登录您的 Google 账号
3. 点击"管理" → "创建资源"
4. 填写资源信息：
   - 资源名称：`JetCode·SKI`
   - 时区：选择您的时区
   - 货币：选择您的货币

### 步骤 2: 创建数据流

1. 在资源中，点击"数据流" → "添加流"
2. 选择"网站"
3. 填写网站信息：
   - 网站网址：`https://jcski.com`
   - 流名称：`JetCode·SKI Website`
4. 点击"创建流"

### 步骤 3: 获取衡量 ID

1. 创建数据流后，您会看到"衡量 ID"
2. 格式为：`G-XXXXXXXXXX`
3. 复制这个 ID，稍后会用到

### 步骤 4: 配置环境变量

在您的 `.env.local` 文件中添加：

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

将 `G-XXXXXXXXXX` 替换为您的实际衡量 ID。

### 步骤 5: 验证安装

1. 重启开发服务器：`npm run dev`
2. 访问您的网站
3. 在 GA4 控制台中，点击"实时" → "概览"
4. 您应该能看到当前的实时访问者

---

## 💰 Google AdSense 配置

### 步骤 1: 注册 AdSense 账号

1. 访问 [Google AdSense](https://www.google.com/adsense/)
2. 登录您的 Google 账号
3. 点击"开始使用"
4. 填写网站信息和个人信息

### 步骤 2: 添加网站并等待审核

1. 在 AdSense 控制台中，添加您的网站 URL：`https://jcski.com`
2. 复制 AdSense 提供的验证代码
3. 将代码添加到网站（已自动集成，只需配置环境变量）
4. 等待 Google 审核（通常需要 1-2 周）

### 步骤 3: 获取发布商 ID

1. 审核通过后，在 AdSense 控制台中
2. 点击"账号" → "账号信息"
3. 找到"发布商 ID"，格式为：`ca-pub-XXXXXXXXXXXXXXXX`
4. 复制这个 ID

### 步骤 4: 创建广告单元

1. 在 AdSense 控制台中，点击"广告" → "按广告单元"
2. 点击"新建广告单元"
3. 选择广告类型：
   - **展示广告**：用于首页和侧边栏
   - **文章内广告**：用于文章内容中
   - **信息流广告**：用于文章列表
4. 创建后，复制广告单元 ID（格式：`1234567890`）

### 步骤 5: 配置环境变量

在您的 `.env.local` 文件中添加：

```env
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX
```

将 `ca-pub-XXXXXXXXXXXXXXXX` 替换为您的实际发布商 ID。

### 步骤 6: 更新广告单元 ID

在以下文件中，将示例广告单元 ID 替换为您的实际 ID：

**文章页面** (`app/[lang]/posts/[slug]/page.tsx`):

```tsx
{
  /* 顶部广告 */
}
;<DisplayAd adSlot="您的广告单元ID" />

{
  /* 文章内广告 */
}
;<InArticleAd adSlot="您的广告单元ID" />
```

---

## ⚙️ 环境变量设置

### 完整的环境变量配置

创建或更新 `.env.local` 文件：

```env
# 网站配置
NEXT_PUBLIC_SITE_URL=https://jcski.com

# Google Analytics 4 (GA4)
# 获取方式：https://analytics.google.com/ → 管理 → 数据流 → 衡量ID
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google AdSense
# 获取方式：https://www.google.com/adsense/ → 账号 → 账号信息 → 发布商ID
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX

# 后台管理系统配置
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
JWT_SECRET=your-jwt-secret-key-change-in-production

# Cloudinary 图片管理
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Vercel 部署配置

在 Vercel 项目设置中添加以下环境变量：

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择您的项目
3. 点击 "Settings" → "Environment Variables"
4. 添加以上环境变量（除了本地开发用的变量）

---

## 🎨 功能说明

### Google Analytics 功能

#### 1. 自动页面浏览跟踪

- 自动跟踪所有页面浏览
- 路由变化自动触发事件
- 支持 SPA 路由跟踪

#### 2. 自定义事件跟踪

项目已集成以下自定义事件：

```typescript
import { analytics } from '@/lib/analytics'

// 文章查看
analytics.viewPost('文章标题', 'article-slug', 'ja')

// 联盟链接点击
analytics.clickAffiliateLink('产品名称', 'Amazon', 'https://...')

// 搜索
analytics.search('搜索关键词')

// 语言切换
analytics.switchLanguage('ja', 'vi')

// 点赞
analytics.likePost('article-slug')

// 分享
analytics.sharePost('article-slug', 'twitter')

// 广告点击
analytics.clickAd('广告单元ID', '展示广告')
```

#### 3. 后台数据展示

访问 `/admin/analytics` 查看：

- 实时访问数据
- 设备分布
- 流量来源
- 用户行为分析

### Google AdSense 功能

#### 1. 多种广告格式

项目提供以下广告组件：

```tsx
import {
  DisplayAd, // 展示广告（响应式）
  InArticleAd, // 文章内广告
  InFeedAd, // 信息流广告
  RectangleAd, // 矩形广告 (300x250)
  BannerAd, // 横幅广告 (728x90)
  SidebarAd, // 侧边栏广告 (160x600)
  MultiplexAd, // 多广告单元
} from '@/components/AdSense'
```

#### 2. 使用示例

**文章页面广告**：

```tsx
{
  /* 顶部展示广告 */
}
;<DisplayAd adSlot="1234567890" />

{
  /* 文章内广告 */
}
;<InArticleAd adSlot="1234567891" />
```

**首页侧边栏广告**：

```tsx
<SidebarAd adSlot="1234567892" />
```

**列表页信息流广告**：

```tsx
<InFeedAd adSlot="1234567893" adLayoutKey="your-layout-key" />
```

#### 3. 开发模式占位符

在开发环境中（未配置 AdSense ID 时），广告位会显示为占位符，方便布局调试。

---

## 📖 使用指南

### 查看 GA4 数据

#### 方式 1: 后台管理系统

1. 访问 `https://jcski.com/admin/login`
2. 登录后台
3. 点击侧边栏"数据分析"
4. 查看关键指标和设备分布

#### 方式 2: Google Analytics 控制台

1. 访问 [Google Analytics](https://analytics.google.com/)
2. 选择"JetCode·SKI"资源
3. 查看详细报告：
   - **实时**：当前访问者
   - **生命周期**：用户获取、参与度、盈利
   - **用户**：用户属性、技术详情
   - **探索**：自定义分析

### 查看 AdSense 收益

#### 方式 1: 后台管理系统

1. 访问 `https://jcski.com/admin/login`
2. 登录后台
3. 点击侧边栏"数据分析"
4. 查看广告收益概览

#### 方式 2: Google AdSense 控制台

1. 访问 [Google AdSense](https://www.google.com/adsense/)
2. 查看详细报告：
   - **首页**：今日收益、本月收益
   - **报告**：详细的广告效果数据
   - **优化**：广告优化建议

### 优化建议

#### GA4 优化

- 定期查看"用户获取"报告，了解流量来源
- 分析"参与度"报告，优化内容策略
- 使用"探索"功能创建自定义报告

#### AdSense 优化

- 测试不同的广告位置和格式
- 查看"广告平衡"功能，优化用户体验
- 启用"自动广告"功能，让 Google 自动优化

---

## ❓ 常见问题

### GA4 常见问题

**Q: 为什么看不到实时数据？**

- 确认环境变量 `NEXT_PUBLIC_GA_MEASUREMENT_ID` 已正确配置
- 重启开发服务器
- 清除浏览器缓存
- 等待 5-10 分钟，数据可能有延迟

**Q: 如何跟踪自定义事件？**

```typescript
import { analytics } from '@/lib/analytics'

// 在您的组件中调用
analytics.viewPost(title, slug, lang)
```

**Q: 如何查看历史数据？**

- 在 Google Analytics 控制台中
- 点击右上角的日期选择器
- 选择您想查看的日期范围

### AdSense 常见问题

**Q: 为什么广告不显示？**

- 确认您的网站已通过 AdSense 审核
- 确认环境变量 `NEXT_PUBLIC_ADSENSE_ID` 已正确配置
- 新建的广告单元需要等待几小时才会生效
- 检查广告单元 ID 是否正确

**Q: 开发环境如何测试广告？**

- 开发环境会显示占位符
- 要查看真实广告，请部署到生产环境

**Q: 如何增加广告收益？**

- 增加优质内容，提高流量
- 优化广告位置（靠近内容、视觉突出）
- 使用多种广告格式
- 启用自动广告功能
- 保持良好的用户体验

**Q: AdSense 审核需要多久？**

- 通常需要 1-2 周
- 确保网站有足够的原创内容
- 遵守 AdSense 政策

---

## 📊 架构说明

### 文件结构

```
JCSKInfo/
├── lib/
│   └── analytics.tsx                 # GA4 和 AdSense 集成
├── components/
│   └── AdSense.tsx                   # AdSense 广告组件
├── app/
│   ├── layout.tsx                    # 全局 GA4 和 AdSense 加载
│   ├── [lang]/
│   │   └── posts/
│   │       └── [slug]/
│   │           └── page.tsx          # 文章页面（已添加广告）
│   └── admin/
│       └── analytics/
│           └── page.tsx              # 后台数据分析页面
└── .env.local                        # 环境变量配置
```

### 技术栈

- **Google Analytics 4**: 使用 gtag.js
- **Google AdSense**: 使用 adsbygoogle.js
- **Next.js Script**: 优化脚本加载
- **React Hooks**: 路由变化跟踪

---

## 🚀 下一步

1. **配置环境变量**：按照本文档配置 GA4 和 AdSense
2. **部署到生产环境**：推送代码到 Vercel
3. **验证集成**：检查 GA4 实时数据和广告显示
4. **优化广告布局**：根据收益数据调整广告位置
5. **定期查看数据**：每周查看分析报告，优化内容策略

---

## 📞 支持

如果遇到问题，请查看：

- [Google Analytics 帮助中心](https://support.google.com/analytics)
- [Google AdSense 帮助中心](https://support.google.com/adsense)
- 项目 GitHub Issues

---

✅ 现在您已经完成了 Google Analytics 4 和 Google AdSense 的集成！
