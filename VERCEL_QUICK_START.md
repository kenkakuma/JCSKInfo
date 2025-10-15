# ⚡ Vercel 快速部署卡片

## 🚀 3 分钟部署指南

### 1️⃣ 访问 Vercel
```
https://vercel.com
```
- 使用 GitHub 登录
- 点击 "Add New..." → "Project"

### 2️⃣ 导入项目
- 选择仓库: `kenkakuma/JCSKInfo`
- 点击 "Import"

### 3️⃣ 配置环境变量

复制以下内容到 Vercel 环境变量配置：

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=EU3XMAjltnzbj3T60e7JWg==
JWT_SECRET=2e857a3300f45bf06b306577fe9738194a031d1ec7d9aeff991ac1f311514581
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

**注意**: 
- 部署后记得更新 `NEXT_PUBLIC_SITE_URL` 为实际域名
- 建议修改 `ADMIN_PASSWORD` 为更强的密码

### 4️⃣ 部署
- 点击 "Deploy" 按钮
- 等待 2-3 分钟完成构建

### 5️⃣ 验证
- 访问 Vercel 提供的域名
- 测试后台登录: `https://your-domain.vercel.app/admin/login`

---

## 📱 测试清单

- [ ] 主页正常显示
- [ ] 日语/越南语/英语切换正常
- [ ] 文章列表和详情页正常
- [ ] 后台可以登录
- [ ] 文章管理功能正常

---

## 🔄 后续更新

每次更新代码后，只需：

```bash
git add .
git commit -m "你的更新说明"
git push origin main
```

Vercel 会自动检测并重新部署！

---

**需要详细指南？** 查看 [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

