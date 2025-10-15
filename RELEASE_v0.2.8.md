# 🚀 JetCode·SKI v0.2.8-beta 发布说明

**发布日期**: 2025-10-15  
**版本类型**: Beta 测试版

---

## 📋 版本概述

本次更新主要聚焦于品牌叙事优化和字体调整，更好地传达 JetCode·SKI 作为 AI 开发实验的独特定位。

---

## ✨ 新增功能

### 1. 品牌叙事重写

**网站描述更新** (页脚):
- 🇬🇧 英语: "An AI-built content platform curating news and insights..."
- 🇯🇵 日语: "AIが構築したコンテンツプラットフォーム..."
- 🇻🇳 越南语: "Nền tảng nội dung do AI xây dựng..."

**核心信息**:
- 强调完全由 AI (Claude) 开发
- 从架构设计到每行代码
- AI 重写应用开发门槛
- 感谢开源社区贡献

### 2. About 页面完全重构

**新内容结构**:
```
1. 主要描述
   - AI 独立开发的技术实验
   - 开发门槛的根本性改变
   - 对开源社区的致敬

2. 完整技术栈展示 🛠️
   - Next.js 13 (App Router)
   - TypeScript
   - Tailwind CSS
   - Contentlayer
   - Cloudinary
   - Sveltia CMS
   - GitHub OAuth
   - Google Analytics & AdSense
   - Vercel
```

**展示特点**:
- 双列网格布局（响应式）
- 清晰的技术名称 + 用途说明
- 技术透明度最大化

---

## 🎨 UI/UX 优化

### 1. 字体系统优化

**Merriweather 字体应用**:
- 替换 Playfair Display
- 更清晰易读的笔画
- 专为屏幕阅读优化

**字体大小精确调整**:
```
Hero 标题:
  移动端: 24px (text-2xl)
  桌面端: 40px (text-[40px])

Large 标题:
  移动端: 24px (text-2xl)
  桌面端: 28px (text-[28px])

Large-reverse 标题:
  移动端: 24px (text-2xl)
  桌面端: 28px (text-[28px])
```

**优化效果**:
- ✅ Hero 40px 醒目突出
- ✅ Large 28px 适中平衡
- ✅ 12px 差距形成明显层次
- ✅ leading-tight 改善行高

### 2. 字体应用规则

**多语言支持**:
- 英语/越南语: Merriweather (400 / 400 Italic)
- 日语: Noto Serif (保持原样)
- 自动根据语言切换

---

## 🐛 Bug 修复

### 图片显示问题
- ✅ 修复本地上传图片在首页无法显示
- ✅ 支持相对路径图片提取 (`/images/posts/`)
- ✅ ImageSkeleton 智能检测本地图片
- ✅ 扩展支持更多新闻网站图片域名

### 图片管理优化
- ✅ 文章中图片默认居中显示
- ✅ 自动添加圆角和阴影效果
- ✅ 自动提取正文第一张图片作为特色图
- ✅ 修复图片重复显示问题

### 防盗链问题
- ✅ 添加 Referrer-Policy 绕过配置
- ✅ 支持 The Verge, TechCrunch 等主流媒体
- ✅ 创建完整的防盗链问题文档

---

## 📝 文档更新

### 新增文档
1. `docs/IMAGE_HOTLINK_PROTECTION.md`
   - 防盗链问题解决方案
   - 支持的新闻网站列表
   - 故障排查清单

2. `docs/IMAGE_UPLOAD_GUIDE.md`
   - 三种图片上传方式
   - 默认样式说明
   - 最佳实践指南

### 文档整理
- 归档历史版本发布文档到 `docs/releases/`
- 合并多个设置文档为 `SETUP_GUIDE.md`
- 删除冗余和过时文档

---

## 🔧 技术改进

### 字体加载优化
```typescript
// 仅加载需要的权重
const merriweather = Merriweather({
  subsets: ['latin', 'vietnamese'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-merriweather',
  display: 'swap',
})
```

### 图片处理优化
```typescript
// 智能检测本地图片
const isLocalImage = 
  typeof src === 'string' && 
  src.startsWith('/') && 
  !src.startsWith('//')

// 本地图片使用 unoptimized
<Image unoptimized={isLocalImage} />
```

### 内容提取增强
```typescript
// 支持相对路径和绝对路径
const markdownImageRegex = /!\[.*?\]\(([^\s)]+)\)/
```

---

## 🎯 核心价值变化

### 品牌定位升级

**从**:
```
"Tracking Innovation, Delivering Insights"
传统新闻聚合平台
```

**到**:
```
"AI-Built Content Platform"
技术实验 + 时代信号
```

**核心信息**:
1. 🤖 AI 开发伙伴能力展示
2. 📡 技术民主化信号
3. 🙏 开源社区致敬
4. 🌍 技术栈完全透明

---

## 📊 性能指标

### 字体加载
- ✅ 仅加载 400 权重（正常 + 斜体）
- ✅ 使用 font-display: swap
- ✅ Google Fonts CDN 加速

### 图片优化
- ✅ 懒加载 (loading="lazy")
- ✅ 骨架屏加载动画
- ✅ 自动优化和 CDN（Cloudinary）
- ✅ 本地图片 unoptimized 模式

---

## 🚀 部署信息

- **平台**: Vercel
- **环境**: Production
- **部署方式**: GitHub 自动部署
- **域名**: https://www.jcski.com

---

## 📋 完整更新列表

### 功能更新
- [x] 网站描述重写（三语言）
- [x] About 页面完全重构
- [x] 技术栈展示添加
- [x] Merriweather 字体集成
- [x] 字体大小精确调整

### Bug 修复
- [x] 本地图片显示问题
- [x] 图片重复显示问题
- [x] 防盗链绕过配置
- [x] 图片自动居中

### 文档
- [x] 图片防盗链文档
- [x] 图片上传指南
- [x] 文档结构整理

---

## 🔄 升级指南

### 从 v0.2.7 升级

1. **拉取最新代码**:
```bash
git pull origin main
```

2. **安装依赖**（如有新增）:
```bash
npm install
```

3. **清理缓存**:
```bash
rm -rf .next .contentlayer
```

4. **重新构建**:
```bash
npm run build
```

5. **启动服务**:
```bash
npm run dev
```

---

## 🐛 已知问题

暂无已知问题。

---

## 📅 下一步计划 (v0.3.0)

### 优先功能
1. **标签系统增强** 🏷️
   - 标签页面
   - 标签云展示
   - 相关标签推荐
   - 标签统计

2. **分享功能增强** 📤
   - 社交媒体分享优化
   - 引用卡片生成
   - 分享统计
   - Open Graph 优化

3. **文章详情页优化** 📄
   - 目录导航
   - 阅读进度条
   - 相关文章推荐
   - 评论系统集成

4. **搜索功能增强** 🔍
   - 搜索结果优化
   - 搜索建议
   - 热门搜索
   - 搜索历史

### 技术优化
- [ ] PWA 完整支持
- [ ] 图片懒加载优化
- [ ] 性能监控集成
- [ ] SEO 进一步优化

---

## 🙏 致谢

感谢以下开源项目和社区:
- Next.js 团队
- Vercel 平台
- Tailwind CSS
- Contentlayer
- Cloudinary
- Sveltia CMS
- 所有贡献者和用户

---

## 📞 反馈与支持

- **GitHub Issues**: [提交问题](https://github.com/kenkakuma/JCSKInfo/issues)
- **讨论**: [GitHub Discussions](https://github.com/kenkakuma/JCSKInfo/discussions)

---

**感谢使用 JetCode·SKI！** 🎉

这是一个由 AI 完全开发的内容平台，展示了 AI 作为开发伙伴的可能性。

---

**发布团队**: JetCode·SKI Development Team (Claude)  
**发布日期**: 2025-10-15
