# 🚀 Vercel 部署指南

## 📋 部署前准备

### ✅ 已完成

- [x] 代码已推送到 GitHub: `https://github.com/kenkakuma/JCSKInfo.git`
- [x] 项目构建测试通过 (本地)
- [x] 版本标签: `v0.1.0-beta`

---

## 🎯 Vercel 部署步骤

### 第一步: 访问 Vercel

1. 打开 https://vercel.com
2. 使用 GitHub 账号登录
3. 点击 "Add New..." → "Project"

### 第二步: 导入 GitHub 项目

1. 在项目列表中找到 `kenkakuma/JCSKInfo`
2. 点击 "Import"
3. 配置项目设置

### 第三步: 项目配置

#### Framework Preset

- 自动检测: **Next.js**
- Build Command: `npm run build` (默认)
- Output Directory: `.next` (默认)
- Install Command: `npm install` (默认)

#### Root Directory

- 保持默认: `./` (项目根目录)

### 第四步: 环境变量配置

点击 "Environment Variables"，添加以下变量：

| Key                    | Value                                         | Environment |
| ---------------------- | --------------------------------------------- | ----------- |
| `ADMIN_USERNAME`       | `admin`                                       | All         |
| `ADMIN_PASSWORD`       | `your_secure_password_123!`                   | All         |
| `JWT_SECRET`           | `your-super-secret-jwt-key-min-32-chars-long` | All         |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app`              | Production  |

**重要提示**:

- 🔒 请设置**强密码**作为 `ADMIN_PASSWORD`
- 🔑 JWT_SECRET 应该是随机生成的长字符串（至少 32 字符）
- 🌐 部署后，将 `NEXT_PUBLIC_SITE_URL` 更新为实际的 Vercel 域名

**生成强密钥的方法**:

```bash
# 在终端运行以下命令生成随机密钥
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 第五步: 开始部署

1. 点击 "Deploy" 按钮
2. 等待构建和部署完成 (通常 2-3 分钟)
3. 部署成功后会显示预览链接

---

## 🎉 部署后操作

### 1. 验证部署

访问你的 Vercel 域名，测试：

- ✅ 主页: `https://your-project.vercel.app`
- ✅ 日语页面: `https://your-project.vercel.app/ja`
- ✅ 越南语页面: `https://your-project.vercel.app/vi`
- ✅ 英语页面: `https://your-project.vercel.app/en`
- ✅ 文章列表: `https://your-project.vercel.app/ja/posts`
- ✅ 后台登录: `https://your-project.vercel.app/admin/login`

### 2. 登录后台管理系统

1. 访问 `https://your-project.vercel.app/admin/login`
2. 使用在环境变量中设置的用户名和密码登录
3. 测试文章管理功能

### 3. 更新环境变量 (重要!)

部署完成后，获取实际的 Vercel 域名（例如 `jetcode-ski.vercel.app`）:

1. 在 Vercel Dashboard → Project Settings → Environment Variables
2. 更新 `NEXT_PUBLIC_SITE_URL` 为: `https://jetcode-ski.vercel.app`
3. 点击 "Save"
4. 触发重新部署: Deployments → 最新部署 → "..." → "Redeploy"

---

## 🔧 自定义域名 (可选)

### 步骤

1. 在 Vercel Dashboard → Project Settings → Domains
2. 点击 "Add Domain"
3. 输入你的域名: `jcski.com`
4. 按照指引配置 DNS 记录:
   - **A Record**: `76.76.21.21` (指向 Vercel)
   - **CNAME**: `cname.vercel-dns.com`
5. 等待 DNS 生效 (可能需要几分钟到几小时)

### 配置 SSL

- ✅ Vercel 自动提供免费 SSL 证书
- ✅ 自动 HTTP → HTTPS 重定向

---

## 🔄 自动部署 (CI/CD)

### Git Push 触发部署

现在每次推送代码到 GitHub，Vercel 都会自动构建和部署：

```bash
# 本地开发完成后
git add .
git commit -m "feat: 添加新功能"
git push origin main

# Vercel 会自动:
# 1. 检测到代码更新
# 2. 自动构建
# 3. 自动部署到生产环境
# 4. 发送部署通知
```

### 预览部署

创建 Pull Request 时，Vercel 会自动创建预览环境：

- 每个 PR 都有独立的预览 URL
- 方便在合并前测试功能
- 预览环境使用与生产环境相同的配置

---

## 📊 Vercel Dashboard 功能

### Analytics (分析)

- 实时访问统计
- 性能监控
- Web Vitals 指标

### Logs (日志)

- 实时查看构建日志
- 运行时日志
- 错误追踪

### Deployments (部署历史)

- 查看所有部署记录
- 一键回滚到之前的版本
- 比较不同版本的差异

### Settings (设置)

- 环境变量管理
- 自定义域名
- 构建配置
- 团队协作

---

## 🐛 常见问题

### 1. 构建失败

**问题**: Build failed with exit code 1

**解决方案**:

- 检查本地是否能成功构建: `npm run build`
- 查看 Vercel 构建日志中的错误信息
- 确认所有依赖已在 `package.json` 中声明

### 2. 环境变量不生效

**问题**: 后台登录失败或功能异常

**解决方案**:

- 确认在 Vercel Dashboard 中正确设置了所有环境变量
- 修改环境变量后需要重新部署
- 检查环境变量名称是否完全匹配（大小写敏感）

### 3. 404 错误

**问题**: 访问某些页面显示 404

**解决方案**:

- 确认 Next.js 的路由配置正确
- 检查 `middleware.ts` 中的路由规则
- 清除 Vercel 缓存后重新部署

### 4. API 路由错误

**问题**: 后台管理 API 返回 500 错误

**解决方案**:

- 检查 Vercel Functions 日志
- 确认 JWT_SECRET 等敏感变量已正确配置
- 验证 API 路由代码没有使用 Node.js 文件系统写入操作

---

## 📚 相关资源

### Vercel 文档

- 官方文档: https://vercel.com/docs
- Next.js 部署: https://nextjs.org/docs/deployment
- 环境变量: https://vercel.com/docs/concepts/projects/environment-variables

### 项目文档

- [README.md](./README.md) - 项目介绍
- [DOCUMENTATION.md](./DOCUMENTATION.md) - 开发文档
- [ADMIN.md](./ADMIN.md) - 后台管理系统文档

---

## ✅ 部署检查清单

部署前:

- [ ] 本地构建成功 (`npm run build`)
- [ ] 代码已推送到 GitHub
- [ ] 准备好管理员密码和 JWT 密钥

Vercel 配置:

- [ ] 导入 GitHub 项目
- [ ] 设置所有必需的环境变量
- [ ] Framework 自动识别为 Next.js

部署后验证:

- [ ] 网站可以正常访问
- [ ] 多语言切换正常
- [ ] 文章页面正常显示
- [ ] 后台管理系统可以登录
- [ ] 文章管理功能正常
- [ ] 更新 `NEXT_PUBLIC_SITE_URL` 为实际域名

---

## 🎯 下一步优化 (可选)

1. **配置自定义域名**
   - 将 `jcski.com` 指向 Vercel

2. **设置 Analytics**
   - 启用 Vercel Analytics
   - 或集成 Google Analytics

3. **性能优化**
   - 启用 Image Optimization
   - 配置 CDN 缓存策略

4. **监控和告警**
   - 配置部署通知 (Slack/Email)
   - 设置错误监控 (Sentry)

---

**部署状态**: 🟢 就绪  
**最后更新**: 2025-10-15  
**版本**: v0.1.0-beta

🎉 祝部署顺利！如有问题，请查看 Vercel 的构建日志。
