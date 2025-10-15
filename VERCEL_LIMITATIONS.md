# ⚠️ Vercel 部署限制说明

**项目**: JetCode·SKI  
**更新时间**: 2025-10-15

---

## 🚨 重要限制

### 文件系统只读

在 Vercel 的 Serverless 环境中，**文件系统是只读的**。

这意味着：

- ❌ 无法通过后台编辑现有文章
- ❌ 无法通过后台删除文章
- ❌ 无法通过后台创建新文章
- ✅ 只能读取和显示内容

### 错误示例

```
EROFS: read-only file system, unlink '/var/task/content/posts/ja/test-article.mdx'
```

---

## 💡 解决方案

### 🎯 推荐方案：本地编辑 + GitHub 自动部署

#### 工作流程

1. **在本地运行开发服务器**

   ```bash
   cd /Users/eric/WebstormProjects/JCSKInfo
   npm run dev
   ```

2. **访问本地后台管理**
   - URL: http://localhost:3000/admin/login
   - 用户名: admin
   - 密码: [您在 Vercel 设置的密码]

3. **编辑文章**
   - 创建新文章
   - 编辑现有文章
   - 删除文章
   - 所有操作都会直接修改本地 MDX 文件

4. **推送到 GitHub**

   ```bash
   git add content/posts/
   git commit -m "feat: 更新文章内容"
   git push origin main
   ```

5. **自动部署**
   - Vercel 自动检测 GitHub 更新
   - 自动构建和部署（2-3 分钟）
   - 新内容自动上线

---

## 🔄 其他解决方案（供参考）

### 方案 A: 集成 GitHub API

**原理**: 后台通过 GitHub API 直接修改仓库文件

**优点**:

- 可以在线编辑
- 自动触发部署
- 有版本历史

**缺点**:

- 需要开发集成
- 每次编辑需要等待部署
- 需要 GitHub Token

**实施步骤**:

1. 创建 GitHub Personal Access Token
2. 添加到 Vercel 环境变量
3. 修改后台 API 使用 GitHub API
4. 文章编辑 → API 推送到 GitHub → 自动部署

---

### 方案 B: 使用数据库

**原理**: 将文章存储在数据库中，不使用 MDX 文件

**优点**:

- 实时更新，不需要重新部署
- 支持复杂查询
- 更适合大量内容

**缺点**:

- 需要完全重构
- 需要数据库服务（成本）
- 失去 MDX 的优势

**数据库选择**:

- Vercel Postgres
- Supabase (免费)
- MongoDB Atlas (免费)
- PlanetScale (免费)

---

### 方案 C: 使用 Headless CMS

**原理**: 使用第三方 CMS 管理内容

**流行选择**:

- **Contentful**: 专业 CMS，免费额度
- **Sanity**: 灵活强大，免费额度
- **Strapi**: 开源，可自托管
- **Ghost**: 博客专用

**优点**:

- 专业的管理界面
- 图片管理
- 多人协作
- API 驱动

**缺点**:

- 需要重构集成
- 可能有成本
- 依赖第三方服务

---

## 📝 当前推荐流程

### 日常使用（简单可靠）

```bash
# 1. 启动本地服务器
npm run dev

# 2. 在浏览器中编辑
# http://localhost:3000/admin

# 3. 提交更改
git add content/posts/
git commit -m "feat: 添加新文章"
git push origin main

# 4. 等待 Vercel 自动部署（2-3分钟）
# 完成！
```

### 快速命令

```bash
# 一键启动本地后台
npm run dev

# 一键推送并部署
git add . && git commit -m "content: update articles" && git push
```

---

## 🎯 未来优化建议

### 短期（1-2周）

- [ ] 创建快速部署脚本
- [ ] 添加部署状态监控
- [ ] 优化本地开发体验

### 中期（1-2月）

- [ ] 集成 GitHub API
- [ ] 实现在线编辑（通过 GitHub）
- [ ] 添加部署队列提示

### 长期（3-6月）

- [ ] 考虑迁移到数据库方案
- [ ] 或集成 Headless CMS
- [ ] 实现多人协作功能

---

## 🔍 技术细节

### 为什么 Vercel 是只读的？

Vercel 使用 **Serverless Functions**，每个请求都在临时容器中运行：

- 容器是临时的，请求结束后销毁
- 文件系统是只读的，确保一致性
- 状态不能持久化到文件系统
- 这是所有 Serverless 平台的共同限制

### 其他 Serverless 平台

类似限制也存在于：

- AWS Lambda
- Netlify Functions
- Cloudflare Workers
- Azure Functions

---

## 📚 相关文档

- [Vercel 文件系统限制](https://vercel.com/docs/concepts/limits/overview#file-system)
- [Next.js 内容管理最佳实践](https://nextjs.org/docs/basic-features/data-fetching)
- [GitHub API 文档](https://docs.github.com/en/rest)

---

## 💡 小贴士

1. **备份重要内容**: 定期备份 `content/posts/` 目录
2. **使用版本控制**: Git 提供完整的版本历史
3. **测试后再推送**: 在本地测试确认后再推送
4. **使用 .env**: 敏感信息使用环境变量

---

**总结**: Vercel 非常适合静态网站和 API，但不适合需要写入文件系统的应用。对于博客内容管理，推荐使用 Git 工作流或集成 CMS。

**当前状态**: ✅ 使用本地编辑 + Git 推送的方式正常工作
