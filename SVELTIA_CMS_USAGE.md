# 📝 Sveltia CMS 使用指南

> JetCode·SKI 内容管理系统快速参考

**更新时间**: 2025-10-15  
**认证方式**: GitHub Personal Access Token

---

## 🚀 快速开始

### 步骤 1: 创建 GitHub Token（首次使用）

1. **访问**: https://github.com/settings/tokens/new

2. **填写表单**:
   - **Note**: `JCSKInfo CMS Access`
   - **Expiration**: `No expiration`（或选择期限）
   - **Scopes**: ✅ 勾选 `repo`

3. **生成并保存**:
   - 点击 "Generate token"
   - **立即复制并保存** Token（只显示一次！）

### 步骤 2: 登录 CMS

1. **访问后台**: https://jcski.com/admin/login
   - 用户名: `admin`
   - 密码: 见凭证文档

2. **进入文章管理**: 点击左侧 "文章管理"

3. **使用 Token 登录**:
   - 点击 "Sign in with GitHub"
   - 粘贴 Personal Access Token
   - 点击 "Login"

4. ✅ 登录成功！

---

## ✍️ 创建和编辑文章

### 创建新文章

1. **选择语言**:
   - 📝 越南语文章 (Vietnamese)
   - 📝 日语文章 (Japanese)
   - 📝 英语文章 (English)

2. **点击**: "New [语言]文章"

3. **填写字段**:

   | 字段           | 说明                                           | 必填 |
   | -------------- | ---------------------------------------------- | ---- |
   | **标题**       | 文章标题                                       | ✅   |
   | **发布日期**   | 自动填充当前时间                               | ✅   |
   | **翻译键**     | 用于关联不同语言版本，如 `apple-vision-pro`    | ✅   |
   | **标签**       | 文章标签，如 `技术`, `产品评测`                | ❌   |
   | **摘要**       | 简短摘要，用于列表页和 SEO                     | ✅   |
   | **特色图片**   | 图片 URL，如 `/images/posts/article-name.jpg`  | ❌   |
   | **草稿状态**   | `true` = 草稿（不显示），`false` = 发布       | ❌   |
   | **正文内容**   | Markdown/MDX 格式的文章内容                    | ✅   |

4. **点击**: 右上角 "Save" 按钮

5. **等待部署**: 约 2-3 分钟后文章会显示在网站上

### 编辑现有文章

1. 在文章列表中点击要编辑的文章
2. 修改内容
3. 点击 "Save"
4. 等待部署完成

### 删除文章

1. 在文章列表中找到文章
2. 点击删除按钮（通常在右上角或文章操作菜单）
3. 确认删除
4. 等待部署完成

---

## 🌐 多语言文章关联

使用 **translationKey** 关联同一篇文章的不同语言版本。

### 示例：创建三语文章

#### 1. 越南语版本
```yaml
translationKey: apple-vision-pro-review
lang: vi
title: Đánh giá Apple Vision Pro
```

#### 2. 日语版本
```yaml
translationKey: apple-vision-pro-review  # 相同的 translationKey！
lang: ja
title: Apple Vision Pro レビュー
```

#### 3. 英语版本
```yaml
translationKey: apple-vision-pro-review  # 相同的 translationKey！
lang: en
title: Apple Vision Pro Review
```

### translationKey 命名规则

✅ **推荐**:
- `apple-vision-pro-apps`
- `tesla-cybertruck-review`
- `openai-gpt4-guide`

❌ **避免**:
- `Apple Vision Pro Apps`（不要空格和大写）
- `apple_vision_pro_apps`（使用连字符，不是下划线）
- `123456`（不够描述性）

---

## 🔄 发布流程（自动化）

当您保存文章后，系统会自动完成以下步骤：

```
1. 点击 "Save"
   ↓
2. Sveltia CMS 自动提交到 GitHub
   ↓
3. GitHub 触发 Vercel 部署
   ↓
4. Vercel 重新构建网站（2-3 分钟）
   ↓
5. 网站自动更新！✅
```

### 查看部署状态

访问: https://vercel.com/kenkakuma/jcskinfo/deployments

- **Building...**: 构建中，请稍候
- **Ready ✅**: 构建完成，网站已更新

---

## 🖼️ 图片管理

### 方法 1: 使用外部图床（推荐）

1. 上传图片到图床服务（如 Imgur, Cloudinary）
2. 复制图片 URL
3. 在文章中使用:

```markdown
![图片描述](https://example.com/your-image.jpg)
```

### 方法 2: 放到项目中

1. 将图片放到 `public/images/posts/` 目录
2. 通过 Git 提交图片到仓库
3. 在文章中引用:

```markdown
![图片描述](/images/posts/your-image.jpg)
```

⚠️ **注意**: Sveltia CMS 不支持直接上传图片到 Vercel，需要通过 Git 手动管理。

---

## 📋 草稿功能

### 草稿 vs 发布

- **草稿** (`draft: true`):
  - ❌ 不会显示在网站上
  - ✅ 可以慢慢编辑
  - ✅ 适合未完成的文章

- **已发布** (`draft: false`):
  - ✅ 显示在网站上
  - ✅ 所有访客可见

### 工作流程

1. 创建文章时设置 `draft: true`
2. 慢慢编辑内容
3. 预览效果（在 CMS 右侧）
4. 准备发布时改为 `draft: false`
5. 保存并等待部署

---

## ⚡ 快捷提示

### Markdown 语法

Sveltia CMS 支持完整的 Markdown 和 MDX 语法：

```markdown
# 标题 1
## 标题 2
### 标题 3

**粗体文本**
*斜体文本*

- 列表项 1
- 列表项 2

1. 有序列表 1
2. 有序列表 2

[链接文本](https://example.com)

![图片描述](https://example.com/image.jpg)

`行内代码`

​```
代码块
​```
```

### 实时预览

- CMS 右侧有实时预览功能
- 编辑时可以看到最终渲染效果
- 预览样式与网站一致

### 版本控制

- 每次保存都创建一个 Git commit
- 可以在 GitHub 查看完整编辑历史
- 需要回退时，在 GitHub 上恢复旧版本

---

## ❓ 常见问题

### Q1: Token 在哪里保存？

**A**: Token 保存在您的浏览器 localStorage 中。

- ✅ 安全：只在您的浏览器中
- ⚠️ 更换浏览器需要重新输入
- ⚠️ 清除缓存会删除 Token

### Q2: 编辑后多久能看到更新？

**A**: 约 2-3 分钟。

流程：保存 → GitHub → Vercel 构建 → 网站更新

### Q3: 如何删除已发布的文章？

**A**: 
1. 在 CMS 中删除文章
2. 或者设置 `draft: true` 隐藏文章

### Q4: 可以恢复之前的版本吗？

**A**: 可以！

1. 访问 GitHub 仓库
2. 查看文件的 commit 历史
3. 找到旧版本并恢复

### Q5: Token 丢失了怎么办？

**A**: 
1. 回到 https://github.com/settings/tokens
2. 撤销旧 Token
3. 创建新 Token
4. 在 CMS 中重新登录

### Q6: 能同时编辑多篇文章吗？

**A**: 可以，但要小心：

- ✅ 可以在 CMS 中打开多个文章
- ⚠️ 保存时会按顺序提交到 GitHub
- ⚠️ 建议编辑完一篇再编辑下一篇

---

## 🔐 安全提示

### Token 安全

⚠️ Personal Access Token 相当于您的密码！

**请务必**:
- ✅ 妥善保管 Token
- ✅ 不要分享给他人
- ✅ 不要提交到代码仓库
- ✅ 如果泄露，立即撤销并创建新的

### 后台安全

✅ CMS 嵌入在后台管理系统中，受到双重保护：

1. **后台登录**: JWT 认证
2. **CMS 登录**: GitHub Token 认证

只有您能访问和编辑文章！

---

## 📚 相关文档

- [Sveltia CMS 官方文档](https://github.com/sveltia/sveltia-cms)
- [Markdown 语法指南](https://www.markdownguide.org/)
- [Vercel 部署文档](./VERCEL_DEPLOYMENT.md)
- [后台系统架构](./ADMIN_ARCHITECTURE.md)

---

## 💬 需要帮助？

如果遇到问题：

1. 查看 [常见问题](#常见问题)
2. 检查 Vercel 部署状态
3. 查看 GitHub commit 历史
4. 联系技术支持

---

**Happy Writing!** ✨

