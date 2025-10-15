# 🖼️ 图片防盗链问题解决方案

## 问题说明

某些新闻网站的图片在后台编辑时可以预览，但发布后在网站上无法显示。这是因为：

### 1. 防盗链保护（Hotlink Protection）

很多网站使用防盗链技术防止其他网站直接引用其图片：

```
检查 HTTP Referer 头
  ↓
如果不是来自本站
  ↓
拒绝访问（403 Forbidden）
```

**为什么编辑时可以预览？**
- CMS 编辑器在浏览器中直接加载图片
- Referer 是空或是 CMS 域名
- 某些网站允许空 Referer

**为什么发布后不显示？**
- Next.js Image 组件通过服务器优化图片
- Referer 是 jcski.com
- 源网站拒绝外部 Referer

### 2. CORS 限制

某些图片服务器不允许跨域访问。

## 解决方案

### 方案 1: 使用 Cloudinary（推荐）✅

**最佳实践**：将所有图片上传到 Cloudinary

```markdown
优势:
✅ 完全无防盗链问题
✅ 自动优化和 CDN 加速
✅ 无需担心源站删除图片
✅ 可以裁剪和变换
✅ 已集成到 CMS
```

**操作步骤**:
1. 在 CMS 编辑器中点击图片按钮
2. 选择 "Upload from Cloudinary"
3. 上传或选择图片
4. 自动插入 Cloudinary URL

### 方案 2: 使用支持的新闻源

已配置支持的新闻网站（无防盗链或已绕过）:

```
✅ Reuters (reuters.com)
✅ Future Publishing (futurecdn.net)
✅ CoinCentral (coincentral.com)
✅ The Verge (theverge.com)
✅ TechCrunch (techcrunch.com)
✅ Ars Technica (arstechnica.com)
✅ Engadget (engadget.com)
✅ Wired (wired.com)
✅ CNET (cnet.com)
✅ ZDNet (zdnet.com)
✅ Unsplash (images.unsplash.com)
✅ AWS S3 (amazonaws.com)
✅ CloudFront (cloudfront.net)
```

### 方案 3: 检测图片是否有防盗链

**测试命令**:
```bash
curl -I -H "Referer: https://www.jcski.com/" "https://example.com/image.jpg"
```

**查看响应**:
- `200 OK` → 可以使用 ✅
- `403 Forbidden` → 有防盗链保护 ❌
- `404 Not Found` → 图片不存在 ❌

## 常见问题网站

### ❌ 通常有严格防盗链的网站:

```
❌ Apple (apple.com/newsroom)
❌ 某些国内网站 (weibo, zhihu)
❌ 某些小型博客
❌ 付费图片网站
```

**建议**: 这些网站的图片**不要直接引用**，应下载后上传到 Cloudinary

### ✅ 通常允许引用的网站:

```
✅ Unsplash (images.unsplash.com)
✅ 大多数主流科技媒体
✅ AWS S3 公开存储桶
✅ Cloudinary, Imgur 等图床
```

## 操作建议

### 创建新文章时:

1. **优先级 1**: 使用 Cloudinary
   ```
   - 上传自己的图片
   - 或从 Unsplash 等免费图库选择
   - 保证图片稳定可用
   ```

2. **优先级 2**: 使用主流科技媒体图片
   ```
   - Reuters, The Verge, TechCrunch 等
   - 已配置支持
   - 通常无防盗链
   ```

3. **避免**: 未知来源的图片
   ```
   - 先测试是否有防盗链
   - 如有问题，下载后上传 Cloudinary
   ```

### 如果图片不显示:

**调试步骤**:

1. **检查浏览器控制台**
   ```
   按 F12 → Console 标签
   查找图片加载错误
   ```

2. **检查图片 URL**
   ```
   右键点击图片位置 → 检查元素
   查看实际的 <img> 标签
   复制 src 属性的 URL
   ```

3. **在浏览器直接访问**
   ```
   将 URL 粘贴到地址栏
   如果能访问 → Next.js 配置问题
   如果不能访问 → 防盗链或图片删除
   ```

4. **检查域名配置**
   ```
   查看 next.config.js 的 remotePatterns
   确认域名已添加
   ```

## 技术说明

### Next.js Image 组件工作原理

```
用户访问页面
  ↓
Next.js Image 组件
  ↓
/_next/image?url=xxx&w=xxx
  ↓
Next.js 服务器获取图片
  ↓
优化处理（调整大小、格式转换）
  ↓
返回优化后的图片
```

**问题点**: Next.js 服务器获取图片时，Referer 是 jcski.com

### 当前配置的绕过方案

1. **Referrer-Policy 设置**
   ```javascript
   headers: [
     {
       key: 'Referrer-Policy',
       value: 'no-referrer-when-downgrade',
     },
   ]
   ```

2. **允许的域名白名单**
   ```javascript
   remotePatterns: [
     { hostname: '**.reuters.com' },
     { hostname: '**.theverge.com' },
     // ... 更多
   ]
   ```

## 最佳实践总结

### ✅ 推荐做法

1. **使用 Cloudinary** (100% 可靠)
2. **使用 Unsplash** (免费且无版权问题)
3. **使用主流科技媒体图片** (已测试支持)
4. **定期检查图片** (源站可能删除)

### ❌ 避免做法

1. 不要直接引用有防盗链的图片
2. 不要使用小型博客的图片
3. 不要使用付费网站的图片
4. 不要使用未测试的陌生域名

## 如何添加新的图片源

如果需要使用新的新闻网站图片:

1. **测试防盗链**:
   ```bash
   curl -I -H "Referer: https://www.jcski.com/" "https://newsite.com/image.jpg"
   ```

2. **如果返回 200 OK**，添加到 `next.config.js`:
   ```javascript
   {
     protocol: 'https',
     hostname: 'newsite.com',
   },
   {
     protocol: 'https',
     hostname: '**.newsite.com',  // 支持子域名
   },
   ```

3. **重新部署**

## 故障排查清单

- [ ] 图片 URL 是否正确？
- [ ] 图片是否还存在（直接访问测试）？
- [ ] 域名是否在 next.config.js 中配置？
- [ ] 是否有防盗链保护？
- [ ] 图片格式是否支持（JPG, PNG, WebP, GIF）？
- [ ] 图片大小是否过大（建议 < 5MB）？
- [ ] 是否需要特殊的 CORS 头？

## 联系信息

如果遇到无法解决的图片显示问题:

1. 记录图片 URL
2. 记录浏览器控制台错误信息
3. 尝试将图片上传到 Cloudinary
4. 如需添加新的图片源支持，请联系开发者

