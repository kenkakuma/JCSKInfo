# ⚡ Sveltia CMS 快速开始

> 5 分钟配置指南

---

## 📝 前提条件

- ✅ 项目已集成 Sveltia CMS
- ✅ 项目已部署到 Vercel
- ✅ 有 GitHub 账号访问权限

---

## 🚀 三步上手

### Step 1: 创建 GitHub OAuth App (5 分钟)

1. 访问: https://github.com/settings/developers
2. 点击 **"New OAuth App"**
3. 填写信息:
   ```
   Application name: JetCode·SKI CMS
   Homepage URL: https://jcski.com
   Authorization callback URL: https://api.netlify.com/auth/done
   ```
   ⚠️ **重要**: callback URL 必须是 `https://api.netlify.com/auth/done`
4. 创建后获得:
   - Client ID: `Iv1.xxxxxxxxxxxxxxxx`
   - Client Secret: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Step 2: 配置 Vercel 环境变量 (2 分钟)

访问: https://vercel.com/kenkakuma/jcskinfo/settings/environment-variables

添加两个变量：

| 变量名 | 值 | 环境 |
|--------|-----|------|
| `OAUTH_GITHUB_CLIENT_ID` | 您的 Client ID | All |
| `OAUTH_GITHUB_CLIENT_SECRET` | 您的 Client Secret | All |

⚠️ 添加后**必须重新部署**！

### Step 3: 开始使用 (1 分钟)

1. 访问: https://jcski.com/admin
2. 点击 **"Login with GitHub"**
3. 授权
4. 开始编辑文章！

---

## 📝 创建文章示例

### 越南语文章

1. 选择 **"📝 越南语文章 (Vietnamese)"**
2. 点击 **"New 越南语文章"**
3. 填写:
   - 标题: `Apple Vision Pro Apps 你需要知道的`
   - 翻译键: `apple-vision-pro-apps`
   - 摘要: `探索最佳 Vision Pro 应用...`
   - 草稿状态: `false` (取消勾选)
   - 内容: 使用 Markdown 编写
4. 点击 **"Save"** → **"Publish"**

### 日语文章（关联越南语版本）

1. 选择 **"📝 日语文章 (Japanese)"**
2. 点击 **"New 日语文章"**
3. 填写:
   - 标题: `Apple Vision Pro アプリガイド`
   - 翻译键: `apple-vision-pro-apps` ⚠️ **相同的键！**
   - 摘要: `最高の Vision Pro アプリを探索...`
   - 草稿状态: `false`
   - 内容: 日语内容
4. 点击 **"Save"** → **"Publish"**

### 英语文章（关联前两个版本）

1. 选择 **"📝 英语文章 (English)"**
2. 点击 **"New 英语文章"**
3. 填写:
   - 标题: `Apple Vision Pro Apps Guide`
   - 翻译键: `apple-vision-pro-apps` ⚠️ **相同的键！**
   - 摘要: `Explore the best Vision Pro apps...`
   - 草稿状态: `false`
   - 内容: 英语内容
4. 点击 **"Save"** → **"Publish"**

✅ 三个语言版本通过 `translationKey` 关联完成！

---

## ⏱️ 更新时间

保存文章后 → GitHub 提交 → Vercel 自动部署 → **2-3 分钟**后网站更新

---

## 💡 重要提示

### translationKey 规则

✅ **正确示例**:
- `apple-vision-pro-apps`
- `tesla-cybertruck-2024`
- `openai-gpt4-turbo`

❌ **错误示例**:
- `Apple Vision Pro Apps` (有空格、大写)
- `特斯拉卡车` (中文)
- `iphone_15` (下划线)

**规则**: 只能包含小写字母、数字和连字符 (-)

### 草稿功能

- **草稿** (`draft: true`): 不显示在网站上
- **已发布** (`draft: false`): 显示在网站上

---

## 🆘 遇到问题？

### 无法登录？

1. 检查 OAuth App callback URL: `https://api.netlify.com/auth/done`
2. 检查 Vercel 环境变量是否正确
3. 确认已重新部署 Vercel

### 文章没有显示？

1. 检查 `draft` 是否为 `false`
2. 等待 2-3 分钟让 Vercel 完成部署
3. 清除浏览器缓存

### 多语言版本没有关联？

检查三个版本的 `translationKey` 是否**完全相同**

---

## 📚 详细文档

更多详细信息，请查看: [SVELTIA_CMS_SETUP.md](./SVELTIA_CMS_SETUP.md)

---

**配置完成！祝使用愉快！** 🎉

