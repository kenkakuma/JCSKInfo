# 📸 Cloudinary 图片管理系统

> v0.2.1-beta 新增功能

**集成时间**: 2025-10-15  
**状态**: ✅ 已集成并可用

---

## 🎯 功能概览

Cloudinary 是一个强大的图片管理和优化服务，为 JetCode·SKI 提供：

- 📤 **直接上传**：在 CMS 中直接上传图片
- 🚀 **CDN 加速**：全球 CDN 分发，< 50ms 延迟
- 🎨 **自动优化**：自动压缩和格式转换（WebP）
- 📱 **响应式**：自动生成多尺寸图片
- 💾 **免费额度**：25GB 存储 + 25GB 月流量

---

## 📋 配置信息

### Cloudinary 账户

```
Cloud Name: dt@hpzm21
```

### 环境变量

在 `.env.local` 和 Vercel 环境变量中配置：

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dt@hpzm21
CLOUDINARY_API_KEY=295771887569851
CLOUDINARY_API_SECRET=GebAgK4oIbuseF46La0F2Y2MAgc
```

---

## 🚀 使用指南

### 在 CMS 中上传图片

1. **登录后台管理系统**
   ```
   https://jcski.com/admin/login
   ```

2. **进入文章管理**
   点击左侧菜单 "文章管理"

3. **编辑文章**
   创建新文章或编辑现有文章

4. **上传图片**
   - 在 "特色图片" 字段点击
   - 会看到 Cloudinary 上传界面
   - 选择图片上传
   - 自动返回优化后的 URL

### 图片 URL 格式

上传后的图片 URL：

```
https://res.cloudinary.com/dt@hpzm21/image/upload/v1234567890/jcski-posts/abc123.jpg
```

### 在文章中使用图片

Markdown 格式：

```markdown
![图片描述](https://res.cloudinary.com/dt@hpzm21/image/upload/v1234567/jcski-posts/image.jpg)
```

---

## 💻 API 使用

### 上传图片

```bash
curl -X POST http://localhost:3000/api/upload/image \
  -F "file=@your-image.jpg"
```

响应：

```json
{
  "success": true,
  "url": "https://res.cloudinary.com/dt@hpzm21/image/upload/v1234567/jcski-posts/abc123.jpg",
  "publicId": "jcski-posts/abc123",
  "width": 1920,
  "height": 1080,
  "format": "jpg",
  "size": 245678
}
```

### 获取配置

```bash
curl http://localhost:3000/api/upload/image
```

响应：

```json
{
  "cloudName": "dt@hpzm21",
  "maxFileSize": 10485760,
  "allowedFormats": ["jpg", "jpeg", "png", "gif", "webp"]
}
```

---

## 🛠️ 代码示例

### 基础用法

```typescript
import { getOptimizedImageUrl } from '@/lib/cloudinary'

// 获取优化后的图片
const url = getOptimizedImageUrl('jcski-posts/image')
// 返回: https://res.cloudinary.com/dt@hpzm21/image/upload/q_auto,f_auto/jcski-posts/image
```

### 指定尺寸

```typescript
const url = getOptimizedImageUrl('jcski-posts/image', {
  width: 800,
  height: 600,
  quality: 80,
  format: 'webp'
})
// 返回: https://res.cloudinary.com/dt@hpzm21/image/upload/w_800,h_600,q_80,f_webp/jcski-posts/image
```

### 响应式图片

```typescript
import { getResponsiveSrcSet } from '@/lib/cloudinary'

const srcset = getResponsiveSrcSet('jcski-posts/image', [400, 800, 1200])
// 返回: "url-400 400w, url-800 800w, url-1200 1200w"

// 在 Next.js Image 组件中使用
<Image
  src={getOptimizedImageUrl('jcski-posts/image')}
  srcSet={srcset}
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="描述"
/>
```

### 生成缩略图

```typescript
import { getThumbnailUrl } from '@/lib/cloudinary'

const thumb = getThumbnailUrl('jcski-posts/image', 200)
// 返回 200x200 正方形缩略图
```

### OG 图片（社交分享）

```typescript
import { getOGImageUrl } from '@/lib/cloudinary'

const ogImage = getOGImageUrl('jcski-posts/image')
// 返回 1200x630 适合社交媒体的图片
```

---

## 📊 文件限制

### 支持的格式

- ✅ JPG / JPEG
- ✅ PNG
- ✅ GIF
- ✅ WebP

### 文件大小

- **最大**: 10MB
- **推荐**: < 5MB（自动优化后通常 < 1MB）

---

## 🎨 自动优化

所有上传的图片会自动：

1. **压缩**：减少 50-70% 体积
2. **格式转换**：现代浏览器自动使用 WebP
3. **尺寸优化**：根据设备提供合适尺寸
4. **CDN 缓存**：全球边缘节点缓存

---

## 📈 使用配额

### 免费额度

- **存储空间**: 25GB
- **月流量**: 25GB
- **转换次数**: 25,000 次/月

### 当前使用情况

可在 Cloudinary 控制台查看：
```
https://console.cloudinary.com/console/dt@hpzm21/media_library
```

---

## 🔐 安全配置

### API 密钥管理

- ✅ API Secret 仅在服务器端使用
- ✅ 前端只暴露 Cloud Name 和 API Key
- ✅ 上传接口有文件验证
- ✅ 所有图片存储在 `jcski-posts` 文件夹

### 建议配置

1. **启用自动备份** (Settings → Security → Backup)
2. **设置上传限制** (Settings → Upload → Restrictions)
3. **启用访问控制** (Settings → Security → Access Control)

---

## 🚀 部署到 Vercel

### 添加环境变量

在 Vercel 项目设置中添加：

1. 访问: https://vercel.com/kenkakuma/jcskinfo/settings/environment-variables

2. 添加以下变量（所有环境）:
   ```
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = dt@hpzm21
   CLOUDINARY_API_KEY = 295771887569851
   CLOUDINARY_API_SECRET = GebAgK4oIbuseF46La0F2Y2MAgc
   ```

3. 重新部署项目

---

## 🧪 测试

### 本地测试

```bash
# 启动开发服务器
npm run dev

# 访问后台
http://localhost:3000/admin/posts

# 测试上传图片
```

### 生产测试

```bash
# 访问生产环境后台
https://jcski.com/admin/posts

# 上传测试图片
# 检查图片加载速度
```

---

## 📝 常见问题

### Q1: 图片上传失败？

**A**: 检查：
1. 文件大小是否超过 10MB
2. 文件格式是否支持
3. 环境变量是否正确配置
4. 网络连接是否正常

### Q2: 图片加载慢？

**A**: 
1. 使用 `getOptimizedImageUrl()` 优化图片
2. 使用响应式图片
3. 启用 WebP 格式

### Q3: 如何删除图片？

**A**: 
1. 访问 Cloudinary 控制台
2. 进入 Media Library
3. 找到图片并删除

### Q4: 超出免费额度怎么办？

**A**: 
1. 查看使用情况
2. 删除不需要的图片
3. 或升级到付费计划

---

## 🔗 相关链接

- **Cloudinary 控制台**: https://console.cloudinary.com
- **文档**: https://cloudinary.com/documentation
- **定价**: https://cloudinary.com/pricing

---

## 📞 技术支持

如有问题：

1. 查看本文档
2. 查看 Cloudinary 官方文档
3. 检查环境变量配置
4. 查看浏览器控制台错误

---

**更新时间**: 2025-10-15  
**版本**: v0.2.1-beta

