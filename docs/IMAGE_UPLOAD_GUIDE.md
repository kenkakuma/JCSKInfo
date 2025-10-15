# 📸 图片上传与管理指南

## ✅ 已解决的问题

### 1. 本地上传的图片在首页无法显示
**原因**: 
- Contentlayer 配置只提取 `https://` 开头的图片 URL
- 本地路径（如 `/images/posts/xxx.jpg`）被忽略

**解决方案**:
- ✅ 修改正则表达式支持相对路径提取
- ✅ `ImageSkeleton` 组件智能检测本地图片并使用 `unoptimized` 模式

### 2. 文章中的图片未居中显示
**原因**: 
- MDX 渲染的图片使用默认样式
- 没有包裹 `<figure>` 标签

**解决方案**:
- ✅ 修改 `MDXContent.tsx`，所有图片默认居中
- ✅ 添加 `shadow-lg`、`rounded-lg` 等样式
- ✅ 包裹在 `<figure className="text-center">` 中

---

## 🎯 上传图片的推荐方式

### 方式 1: 使用 Cloudinary（推荐）⭐

**优势**:
```
✅ 自动 CDN 加速
✅ 自动优化（WebP、压缩）
✅ 100% 稳定可靠
✅ 无需手动管理文件
✅ 支持图片变换
```

**操作步骤**:
1. 在 CMS 编辑器中点击图片按钮
2. 选择 "Upload from Cloudinary"
3. 上传图片
4. 系统自动插入优化后的 URL

**示例**:
```markdown
![Product Image](https://res.cloudinary.com/your-cloud/image/upload/v123/product.jpg)
```

---

### 方式 2: 上传到本地 `/public/images/posts/`

**优势**:
```
✅ 简单直接
✅ 完全控制文件
✅ 无需第三方服务
```

**操作步骤**:
1. 将图片放到 `public/images/posts/` 目录
2. 在文章中引用：

```markdown
![Description](/images/posts/your-image.jpg)
```

**文件命名建议**:
```
✅ 使用小写字母
✅ 使用连字符分隔
✅ 使用描述性名称

推荐:
- apple-macbook-pro.jpg
- japan-crypto-regulation.jpg
- google-ai-datacenter.jpg

避免:
- IMG_1234.jpg
- 屏幕截图.png
- image (1).jpg
```

**注意事项**:
- ⚠️ 文件大小建议 < 2MB
- ⚠️ 推荐使用 JPG（照片）或 PNG（图表）
- ⚠️ 提交到 Git 前请压缩图片

---

### 方式 3: 引用外部新闻网站图片

**支持的网站**（无防盗链）:
```
✅ Reuters (reuters.com)
✅ The Verge (theverge.com)
✅ TechCrunch (techcrunch.com)
✅ Unsplash (images.unsplash.com)
✅ AWS S3 (amazonaws.com)
```

**操作步骤**:
1. 在新闻网站找到图片
2. 右键 → "复制图片地址"
3. 在文章中引用：

```markdown
![News Photo](https://www.reuters.com/resizer/v2/XXXX.jpg)
```

**注意**:
- ⚠️ 检查图片是否有防盗链（参考 `docs/IMAGE_HOTLINK_PROTECTION.md`）
- ⚠️ 源站可能删除图片，建议重要图片上传到 Cloudinary

---

## 📐 图片默认样式

所有在文章中插入的图片**自动应用**以下样式：

### 1. 居中显示
```html
<figure class="my-8 text-center">
  <img class="mx-auto" />
</figure>
```

### 2. 圆角和阴影
```css
rounded-lg    /* 圆角 */
shadow-lg     /* 阴影效果 */
```

### 3. 响应式
```css
max-w-full    /* 最大宽度 100% */
h-auto        /* 高度自适应 */
```

### 4. 懒加载
```html
loading="lazy"  /* 延迟加载 */
```

---

## 🎨 自定义图片样式（高级）

如果需要特殊的图片布局，可以使用 `ImageWithCaption` 组件：

### 居中（默认）
```jsx
<ImageWithCaption 
  src="/images/posts/example.jpg"
  alt="Description"
  align="center"
/>
```

### 左对齐 + 文字环绕
```jsx
<ImageWithCaption 
  src="/images/posts/example.jpg"
  alt="Description"
  align="left"
  width={400}
/>
```

### 右对齐
```jsx
<ImageWithCaption 
  src="/images/posts/example.jpg"
  alt="Description"
  align="right"
  width={400}
/>
```

### 添加图片说明
```jsx
<ImageWithCaption 
  src="/images/posts/example.jpg"
  alt="Description"
  caption="这是一张示例图片的说明文字"
  align="center"
/>
```

---

## 📊 技术实现

### 自动提取特色图片

系统会按以下优先级设置文章的特色图片（用于首页展示）：

```
1. frontmatter 中的 image 字段
   ↓ 如果没有设置
2. 正文中的第一张图片（Markdown 语法）
   ↓ 如果没有
3. 正文中的第一张图片（HTML 语法）
   ↓ 如果都没有
4. 使用默认占位符（文章标题首字母）
```

**正则表达式**:
```javascript
// Markdown: ![alt](url)
const markdownImageRegex = /!\[.*?\]\(([^\s)]+)\)/

// HTML: <img src="url" />
const htmlImageRegex = /<img[^>]+src=["']([^"']+)["']/
```

### ImageSkeleton 组件特性

```typescript
// 自动检测本地图片
const isLocalImage = 
  typeof src === 'string' && 
  src.startsWith('/') && 
  !src.startsWith('//')

// 本地图片使用 unoptimized 模式
<Image 
  src={src}
  unoptimized={isLocalImage}
  // ...
/>
```

**为什么需要 `unoptimized`？**
- Next.js Image 优化 API 要求明确的宽高
- 本地图片路径动态，无法预知尺寸
- `unoptimized` 模式直接使用原图，避免优化错误

---

## 🔧 故障排查

### 问题 1: 首页图片不显示

**可能原因**:
1. 图片路径错误
2. 图片不在 `public/` 目录
3. 文件名大小写不匹配（Linux 服务器区分大小写）

**解决方法**:
```bash
# 检查文件是否存在
ls -la public/images/posts/

# 检查 contentlayer 提取的图片路径
cat .contentlayer/generated/Post/_index.json | jq -r '.[] | .image'
```

### 问题 2: 文章详情页图片不显示

**可能原因**:
1. Markdown 语法错误
2. 图片 URL 无效
3. 外部网站有防盗链

**解决方法**:
```markdown
# ✅ 正确
![Description](/images/posts/example.jpg)

# ❌ 错误（缺少 alt 文本）
![]( /images/posts/example.jpg)

# ❌ 错误（多余空格）
![ Description ]( /images/posts/example.jpg )
```

### 问题 3: 图片重复显示

**可能原因**:
- 第一张图片既作为特色图片又在正文中渲染

**解决方法**:
- ✅ 系统已自动处理：`skipFirstImage={!!post.image}`
- 如果特色图片已设置，正文中的第一张图片会自动跳过

### 问题 4: 外部图片有防盗链

**可能原因**:
- 源网站检测 Referer 并拒绝外部访问

**解决方法**:
1. 下载图片
2. 上传到 Cloudinary 或 `public/images/posts/`
3. 使用新路径

---

## 📝 最佳实践

### ✅ 推荐做法

1. **重要文章**: 使用 Cloudinary
   - 确保图片永久可用
   - 自动优化和 CDN

2. **快速发布**: 上传到 `/public/images/posts/`
   - 简单快速
   - 完全控制

3. **引用新闻**: 使用已支持的网站
   - 节省空间
   - 保持最新

### ❌ 避免做法

1. ❌ 使用有防盗链的网站图片
2. ❌ 上传超大图片（> 5MB）
3. ❌ 使用中文文件名
4. ❌ 在多篇文章中重复上传同一图片

### 🎯 优化建议

**图片压缩工具**:
- https://tinypng.com/ (PNG)
- https://squoosh.app/ (多格式)
- ImageOptim (macOS)

**推荐尺寸**:
```
特色图片（首页）:  1200 x 630 px
文章内图片:        800 - 1200 px 宽
缩略图:           400 x 300 px
```

**格式选择**:
```
照片 / 复杂图像  →  JPG (质量 80-90%)
图表 / 截图      →  PNG
动画            →  GIF / WebP
矢量图          →  SVG
```

---

## 🚀 总结

### 快速上手

**方式 1: Cloudinary（最推荐）**
```markdown
1. CMS 编辑器 → 点击图片按钮
2. Upload from Cloudinary
3. 选择或上传图片
4. 自动插入
```

**方式 2: 本地上传**
```markdown
1. 图片放到 public/images/posts/
2. 在文章中引用: ![Alt](/images/posts/image.jpg)
3. 自动居中、圆角、阴影
```

### 默认效果

所有图片在文章中**自动**:
- ✅ 居中显示
- ✅ 圆角 + 阴影
- ✅ 响应式
- ✅ 懒加载
- ✅ 骨架屏（加载中）

### 首页展示

系统**自动提取**:
1. frontmatter 中的 `image` 字段
2. 或正文中的第一张图片

**无需额外配置！**

---

## 📞 需要帮助？

遇到问题请参考：
- `docs/IMAGE_HOTLINK_PROTECTION.md` - 防盗链问题
- `SETUP_GUIDE.md` - 环境配置
- `CHANGELOG.md` - 更新记录

