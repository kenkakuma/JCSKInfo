# 📸 图片使用指南

在 JetCode·SKI 的文章中，您可以使用多种方式插入和设置图片样式。

---

## 🎯 方法 1: 使用自定义 ImageWithCaption 组件（推荐）

### ✅ 功能特性

- ✅ 图片对齐（左对齐/居中/右对齐）
- ✅ 图片标题/说明文字
- ✅ 自动圆角和阴影效果
- ✅ 响应式设计
- ✅ 暗黑模式支持

### 📝 基本语法

#### 1️⃣ 居中图片（默认）

```jsx
<ImageWithCaption
  src="https://res.cloudinary.com/dt@hpzm21/image/upload/v123/jcski-posts/image.jpg"
  alt="图片描述"
  width={800}
  height={600}
/>
```

#### 2️⃣ 居中图片 + 说明文字

```jsx
<ImageWithCaption
  src="https://res.cloudinary.com/dt@hpzm21/image/upload/v123/jcski-posts/image.jpg"
  alt="iPhone 15 Pro"
  caption="iPhone 15 Pro 采用钛金属设计，更轻更强"
  width={800}
  height={600}
/>
```

#### 3️⃣ 左对齐图片

```jsx
<ImageWithCaption
  src="https://res.cloudinary.com/dt@hpzm21/image/upload/v123/jcski-posts/image.jpg"
  alt="产品特写"
  align="left"
  width={400}
  height={300}
/>
```

#### 4️⃣ 右对齐图片

```jsx
<ImageWithCaption
  src="https://res.cloudinary.com/dt@hpzm21/image/upload/v123/jcski-posts/image.jpg"
  alt="产品细节"
  align="right"
  width={400}
  height={300}
/>
```

#### 5️⃣ 小尺寸居中图片

```jsx
<ImageWithCaption
  src="https://res.cloudinary.com/dt@hpzm21/image/upload/v123/jcski-posts/icon.png"
  alt="品牌标志"
  align="center"
  width={200}
  height={200}
  caption="JetCode·SKI 品牌标志"
/>
```

---

## 🎯 方法 2: 使用标准 Markdown 图片语法

### 基本语法

```markdown
![图片描述](https://example.com/image.jpg)
```

### 特点

- ✅ 简单快捷
- ✅ 标准 Markdown 语法
- ⚠️ 无法自定义对齐方式
- ⚠️ 默认样式（左对齐，占满容器宽度）

---

## 🎯 方法 3: 使用 HTML `<div>` 包裹（灵活自定义）

### 居中图片

```html
<div style="text-align: center; margin: 2rem 0;">
  <img
    src="https://example.com/image.jpg"
    alt="描述"
    style="max-width: 800px; border-radius: 0.5rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);"
  />
  <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">图片说明文字</p>
</div>
```

### 左对齐图片（文字环绕）

```html
<div style="float: left; margin: 0 1.5rem 1rem 0; max-width: 400px;">
  <img src="https://example.com/image.jpg" alt="描述" style="width: 100%; border-radius: 0.5rem;" />
</div>

这里是正文内容，文字会自动环绕左边的图片...
```

### 右对齐图片（文字环绕）

```html
<div style="float: right; margin: 0 0 1rem 1.5rem; max-width: 400px;">
  <img src="https://example.com/image.jpg" alt="描述" style="width: 100%; border-radius: 0.5rem;" />
</div>

这里是正文内容，文字会自动环绕右边的图片...
```

---

## 📚 完整示例文章

```mdx
---
title: '完整的图片使用示例'
date: '2025-10-15T10:00:00.000Z'
lang: 'zh'
translationKey: 'image-usage-example'
tags: ['教程', '示例']
summary: '展示如何在文章中使用各种图片样式'
image: '/images/posts/example.jpg'
draft: false
---

# 产品评测：iPhone 15 Pro

## 外观设计

<ImageWithCaption
  src="https://res.cloudinary.com/dt@hpzm21/image/upload/v123/jcski-posts/iphone-15-pro.jpg"
  alt="iPhone 15 Pro 外观"
  caption="iPhone 15 Pro 采用全新钛金属设计"
  width={800}
  height={600}
/>

iPhone 15 Pro 采用了全新的钛金属中框设计，相比之前的不锈钢材质...

## 相机系统

<ImageWithCaption
  src="https://res.cloudinary.com/dt@hpzm21/image/upload/v123/jcski-posts/iphone-camera.jpg"
  alt="相机系统"
  align="right"
  width={400}
  height={300}
  caption="三摄像头系统"
/>

全新的相机系统包括 48MP 主摄、12MP 超广角和 12MP 长焦镜头。主摄支持...

（文字会自动环绕右侧的图片）

## 性能表现

<ImageWithCaption
  src="https://res.cloudinary.com/dt@hpzm21/image/upload/v123/jcski-posts/benchmark.jpg"
  alt="性能测试"
  align="center"
  width={600}
  height={400}
  caption="GeekBench 6 性能测试结果"
/>

在 GeekBench 6 测试中，iPhone 15 Pro 搭载的 A17 Pro 芯片...

## 总结

<ImageWithCaption
  src="https://res.cloudinary.com/dt@hpzm21/image/upload/v123/jcski-posts/summary.jpg"
  alt="产品总结"
  width={800}
  height={400}
/>
```

---

## 💡 最佳实践建议

### 1️⃣ 图片尺寸选择

| 图片类型         | 推荐宽度    | 使用场景         |
| ---------------- | ----------- | ---------------- |
| **大图（全宽）** | 1200-1600px | 产品展示、横幅图 |
| **中等图片**     | 800-1000px  | 文章配图、特写   |
| **小图**         | 400-600px   | 侧边图、图标     |
| **缩略图**       | 200-300px   | Logo、小图标     |

### 2️⃣ 对齐方式选择

| 对齐方式            | 何时使用                       |
| ------------------- | ------------------------------ |
| **居中（center）**  | 主要产品图、重点展示图、横幅图 |
| **左对齐（left）**  | 配合右侧文字、流式布局         |
| **右对齐（right）** | 配合左侧文字、侧边说明         |

### 3️⃣ 图片优化建议

```jsx
// ✅ 推荐：使用 Cloudinary 自动优化
<ImageWithCaption
  src="https://res.cloudinary.com/dt@hpzm21/image/upload/v123/jcski-posts/image.jpg"
  alt="清晰的描述"
  width={800}
  height={600}
/>

// ⚠️ 避免：不指定尺寸
<ImageWithCaption
  src="https://example.com/image.jpg"
  alt="描述"
  // 缺少 width 和 height
/>

// ❌ 避免：过大的图片
<ImageWithCaption
  src="https://example.com/huge-image.jpg"
  width={5000}  // 太大了！
  height={4000}
/>
```

### 4️⃣ Alt 文本最佳实践

```jsx
// ✅ 好的 Alt 文本 - 描述性强
<ImageWithCaption
  src="/image.jpg"
  alt="iPhone 15 Pro 钛金属中框特写，展示精细的喷砂工艺"
/>

// ⚠️ 一般的 Alt 文本
<ImageWithCaption
  src="/image.jpg"
  alt="iPhone 15 Pro"
/>

// ❌ 差的 Alt 文本
<ImageWithCaption
  src="/image.jpg"
  alt="图片"
/>
```

---

## 🎨 高级用法

### 图片网格布局

```jsx
<div className="my-8 grid grid-cols-2 gap-4">
  <ImageWithCaption src="/image1.jpg" alt="图片1" width={400} height={300} />
  <ImageWithCaption src="/image2.jpg" alt="图片2" width={400} height={300} />
</div>
```

### 并排对比图

```jsx
<div className="my-8 flex justify-center gap-4">
  <div className="flex-1">
    <ImageWithCaption src="/before.jpg" alt="优化前" caption="优化前" width={400} height={300} />
  </div>
  <div className="flex-1">
    <ImageWithCaption src="/after.jpg" alt="优化后" caption="优化后" width={400} height={300} />
  </div>
</div>
```

---

## 🚀 在 Sveltia CMS 中使用

### 步骤 1: 上传图片

1. 登录后台 `/admin/posts`
2. 编辑文章
3. 在正文中点击需要插入图片的位置
4. 切换到 "Rich Text" 模式

### 步骤 2: 插入自定义图片组件

1. 点击工具栏的 "+" 按钮
2. 选择 "Code Block" 或直接输入 JSX 代码
3. 粘贴以下代码：

```jsx
<ImageWithCaption
  src="https://res.cloudinary.com/dt@hpzm21/image/upload/v123/jcski-posts/your-image.jpg"
  alt="图片描述"
  caption="图片说明（可选）"
  align="center"
  width={800}
  height={600}
/>
```

### 步骤 3: 调整参数

- 修改 `src` 为您上传的 Cloudinary 图片 URL
- 修改 `alt` 为描述性文字
- 修改 `align` 为 `left`、`center` 或 `right`
- 调整 `width` 和 `height`

### 步骤 4: 预览和保存

- 切换到预览模式查看效果
- 满意后点击保存并发布

---

## ✅ 总结

| 方法                      | 简单度     | 灵活性     | 推荐度     |
| ------------------------- | ---------- | ---------- | ---------- |
| **ImageWithCaption 组件** | ⭐⭐⭐     | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Markdown 图片语法**     | ⭐⭐⭐⭐⭐ | ⭐⭐       | ⭐⭐⭐     |
| **HTML/CSS 自定义**       | ⭐⭐       | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐   |

**推荐使用 `ImageWithCaption` 组件**，它提供了最佳的平衡：

- ✅ 使用简单（只需设置几个参数）
- ✅ 功能强大（支持对齐、说明、优化）
- ✅ 代码整洁（不需要复杂的 HTML/CSS）
- ✅ 响应式设计（自动适配移动端）
- ✅ 暗黑模式支持

---

🎉 现在您可以在文章中自由使用各种图片样式了！
