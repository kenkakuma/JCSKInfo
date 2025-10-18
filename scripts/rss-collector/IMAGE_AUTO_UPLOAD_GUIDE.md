# 📸 图片自动上传功能使用指南

## 功能说明

RSS采集系统现已集成**自动图片下载+Cloudinary上传**功能，实现完全自动化的图片处理流程。

### 工作流程

```
RSS采集
  ↓
提取图片URL
  ↓
下载到临时目录 (scripts/rss-collector/temp-images/)
  ↓
上传到Cloudinary CDN (jcski-posts文件夹)
  ↓
获取优化后的CDN URL
  ↓
写入MDX文件的frontmatter
  ↓
清理临时文件
```

## 使用方法

### 1. 配置Cloudinary环境变量

确保 `.env.local` 文件包含以下配置：

```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 2. 运行采集器

```bash
# 进入采集器目录
cd scripts/rss-collector

# 运行采集（自动启用图片上传）
npm run collect
```

### 3. 验证结果

采集完成后，检查生成的MDX文件：

```mdx
---
title: 文章标题
image: https://res.cloudinary.com/your-cloud/image/upload/v123/jcski-posts/article-slug-featured.jpg
---
```

图片已自动上传到Cloudinary并优化！

## 测试功能

### 测试图片上传

```bash
cd scripts/rss-collector
node test-image-upload.js
```

这将：
1. 下载一张测试图片
2. 上传到Cloudinary
3. 显示CDN URL
4. 清理临时文件

### 测试完整采集流程

```bash
cd scripts/rss-collector
npm run collect
```

观察输出日志：
```
📸 Processing image...
✓ Downloaded: image-abc12345.jpg
☁️  Uploading to Cloudinary: image-abc12345.jpg
✓ Uploaded: jcski-posts/article-slug-featured
  URL: https://res.cloudinary.com/...
  Size: 245.32 KB
✓ Image uploaded to Cloudinary
```

## 技术细节

### 图片命名规则

- **特色图片**: `{article-slug}-featured`
- **MD5哈希**: 避免重复下载相同图片
- **自动扩展名**: 根据原图格式自动识别

### Cloudinary优化

上传时自动应用优化：
```javascript
{
  quality: 'auto',      // 自动质量调整
  fetch_format: 'auto'  // 自动格式选择（WebP/AVIF）
}
```

### 错误处理

- 下载失败 → 跳过图片，继续采集
- 上传失败 → 使用原始URL（回退机制）
- 已存在 → 跳过上传，使用现有URL

### 性能优化

- **顺序处理**: 避免同时发送过多API请求
- **缓存检测**: 已下载的图片不重复下载
- **自动清理**: 采集完成后删除临时文件

## 文件结构

```
scripts/rss-collector/
├── image-downloader.js        # 图片下载模块
├── cloudinary-uploader.js     # Cloudinary上传模块
├── parser.js                  # RSS解析（集成图片处理）
├── generator.js               # MDX生成
├── index.js                   # 主流程（含清理）
├── test-image-upload.js       # 测试脚本
└── temp-images/               # 临时目录（自动创建和清理）
```

## 常见问题

### Q: 图片上传失败怎么办？

**A**: 检查以下几点：
1. `.env.local` 配置是否正确
2. Cloudinary账户配额是否充足
3. 网络连接是否正常

### Q: 如何禁用自动上传？

**A**: 修改 `index.js`：

```javascript
const articles = await parseFeeds(
  feeds,
  lang,
  COLLECTOR_CONFIG.maxArticlesPerFeed,
  false // 禁用图片处理
);
```

### Q: 临时文件占用空间吗？

**A**: 不会。每次采集完成后自动清理 `temp-images/` 目录。

### Q: 支持哪些图片格式？

**A**: 支持所有常见格式：JPG, PNG, GIF, WebP, AVIF

### Q: 图片大小有限制吗？

**A**: Cloudinary免费账户单个文件最大10MB，足够新闻图片使用。

## 监控和日志

### 正常输出示例

```bash
📡 Fetching feed: Engadget
✅ Found 15 items in Engadget
  📸 Processing image...
  ✓ Downloaded: image-abc12345.jpg
  ☁️  Uploading to Cloudinary: image-abc12345.jpg
  ✓ Uploaded: jcski-posts/article-slug-featured
  ✓ Image uploaded to Cloudinary
✅ Saved: en/article-slug.mdx
```

### 错误输出示例

```bash
  📸 Processing image...
  ✗ Download failed: HTTP 404
  ⚠ No image found
✅ Saved: en/article-slug.mdx
```

## 最佳实践

1. **定期检查Cloudinary配额**: 访问 Cloudinary Dashboard
2. **监控上传失败**: 查看采集日志中的 `✗` 标记
3. **手动审核图片**: 上传成功后在CMS中预览
4. **备份重要图片**: 重要内容建议本地备份

## 下一步优化

可能的增强功能：
- [ ] 批量上传API（提升速度）
- [ ] 智能图片裁剪（适配不同尺寸）
- [ ] 图片元数据提取（alt文本）
- [ ] 失败重试机制
- [ ] 上传进度显示

## 联系支持

遇到问题？
- 查看日志文件
- 检查环境变量配置
- 验证Cloudinary账户状态
