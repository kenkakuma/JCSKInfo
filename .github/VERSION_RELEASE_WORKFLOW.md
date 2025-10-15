# 📦 版本发布工作流

> JetCode·SKI 项目版本发布标准流程

---

## 🎯 发布前检查清单

### 代码质量
- [ ] 所有功能已完成并测试
- [ ] 修复所有已知的严重 Bug
- [ ] 代码已通过 lint 检查
- [ ] 本地测试通过
- [ ] Vercel 预览部署测试通过

### 文档准备
- [ ] 更新 `CHANGELOG.md`
- [ ] 创建 `RELEASE_vX.X.X.md`（如果是重要版本）
- [ ] 更新 `README.md`（如有必要）
- [ ] 更新相关技术文档

### 环境配置
- [ ] 检查 Vercel 环境变量配置
- [ ] 确认域名配置正常
- [ ] 测试生产环境功能

---

## 📝 版本发布步骤

### 步骤 1: 确定版本号

根据变更类型确定版本号：

```
格式: 主版本号.次版本号.修订号[-预发布标识]
```

**规则**:
- **主版本号**: 重大架构变更或不兼容的修改 (0 → 1, 1 → 2)
- **次版本号**: 新增功能，向下兼容 (0.1 → 0.2, 1.0 → 1.1)
- **修订号**: Bug 修复，向下兼容 (0.1.0 → 0.1.1)
- **预发布**: `alpha`, `beta`, `rc` (0.2.0-beta, 1.0.0-rc.1)

**示例**:
- `0.1.0-beta` → `0.2.0-beta`: 新增功能（CMS）
- `0.2.0-beta` → `0.2.1-beta`: Bug 修复
- `0.2.0-beta` → `1.0.0`: 正式发布

---

### 步骤 2: 更新 CHANGELOG.md

在 `CHANGELOG.md` 文件顶部添加新版本信息：

```markdown
## [X.X.X] - YYYY-MM-DD

### 🎉 重大更新
- 重要的新功能或架构变更

### ✨ 新增功能
- 新增的功能列表

### 🔧 技术改进
- 技术优化和改进

### 📚 文档更新
- 文档的更新

### 🗑️ 移除功能
- 移除的功能

### 🐛 问题修复
- 修复的 Bug

### 🔒 安全增强
- 安全相关改进

### 📊 性能优化
- 性能提升

### ⚠️ 已知限制
- 当前版本的限制

### 🔮 下一步计划
- 后续版本规划
```

---

### 步骤 3: 创建发布说明（可选）

对于重要版本（如 0.2.0, 1.0.0），创建详细的发布说明：

```bash
# 创建发布说明文件
touch RELEASE_vX.X.X.md
```

**内容包括**:
- 版本概览
- 主要新功能
- 技术改进
- 使用指南
- 升级指南
- 已知限制
- 版本对比

参考: `RELEASE_v0.2.0.md`

---

### 步骤 4: 提交文档更新

```bash
# 提交更新日志
git add CHANGELOG.md RELEASE_vX.X.X.md
git commit -m "docs: update changelog for vX.X.X"

# 推送到 GitHub
git push origin main
```

---

### 步骤 5: 创建 Git 标签

```bash
# 创建带注释的标签
git tag -a vX.X.X -m "Release vX.X.X: [简短描述]"

# 查看标签
git tag

# 推送标签到 GitHub
git push origin vX.X.X

# 或推送所有标签
git push origin --tags
```

**标签命名规范**:
- ✅ `v0.2.0-beta`
- ✅ `v1.0.0`
- ✅ `v1.0.0-rc.1`
- ❌ `0.2.0` (缺少 v 前缀)
- ❌ `version-0.2.0` (格式错误)

---

### 步骤 6: 创建 GitHub Release

1. **访问 GitHub Releases 页面**:
   ```
   https://github.com/kenkakuma/JCSKInfo/releases
   ```

2. **点击 "Draft a new release"**

3. **填写 Release 信息**:
   - **Tag**: 选择刚创建的标签（如 `v0.2.0-beta`）
   - **Title**: 版本号 + 简短描述（如 `v0.2.0-beta - Content Master`）
   - **Description**: 
     - 复制 `RELEASE_vX.X.X.md` 的内容
     - 或复制 `CHANGELOG.md` 中对应版本的内容
   - **Pre-release**: 如果是测试版，勾选 "This is a pre-release"

4. **点击 "Publish release"**

---

### 步骤 7: 验证部署

1. **检查 Vercel 部署状态**:
   ```
   https://vercel.com/kenkakuma/jcskinfo/deployments
   ```

2. **等待部署完成** (约 2-3 分钟)

3. **测试生产环境**:
   - 访问网站: https://jcski.com
   - 测试新功能
   - 检查多语言页面
   - 测试后台管理
   - 测试 CMS 功能

4. **验证标签**:
   ```bash
   # 查看远程标签
   git ls-remote --tags origin
   ```

---

### 步骤 8: 通知和宣传（可选）

- 📢 发布公告（如果有社交媒体）
- 📧 通知用户（如果有邮件列表）
- 📝 更新项目主页
- 🔗 分享到相关社区

---

## 🔄 快速发布命令

### 完整流程（推荐）

```bash
#!/bin/bash
# 版本号
VERSION="0.2.0-beta"
MESSAGE="Release v${VERSION}: Content Master"

# 1. 确保在 main 分支
git checkout main
git pull origin main

# 2. 提交文档更新
git add CHANGELOG.md RELEASE_v${VERSION}.md
git commit -m "docs: update changelog for v${VERSION}"

# 3. 创建标签
git tag -a v${VERSION} -m "${MESSAGE}"

# 4. 推送到 GitHub
git push origin main
git push origin v${VERSION}

# 5. 打印确认信息
echo "✅ Version v${VERSION} released!"
echo "📍 Check deployment: https://vercel.com/kenkakuma/jcskinfo/deployments"
echo "📍 Create GitHub Release: https://github.com/kenkakuma/JCSKInfo/releases/new"
```

### 快速修订版本（Bug 修复）

```bash
#!/bin/bash
# 修订版本号（只改最后一位）
VERSION="0.2.1-beta"

# 快速发布
git add .
git commit -m "fix: [描述修复的问题]"
git tag -a v${VERSION} -m "Bugfix release v${VERSION}"
git push origin main --tags

echo "✅ Hotfix v${VERSION} released!"
```

---

## 📋 版本号参考表

### 当前版本: v0.2.0-beta

| 下一步操作 | 新版本号 | 说明 |
|-----------|---------|------|
| Bug 修复 | `0.2.1-beta` | 小修复，不影响功能 |
| 小功能 | `0.3.0-beta` | 新增小功能 |
| 重大功能 | `0.4.0-beta` | 新增重要功能 |
| 正式发布 | `1.0.0` | 移除 beta，正式发布 |
| 大版本更新 | `2.0.0` | 重大架构变更 |

### 版本历史

- `v0.1.0-beta` (2025-10-14): 首次发布
- `v0.2.0-beta` (2025-10-15): 集成 CMS
- `v0.X.0-beta` (待定): 下一版本
- `v1.0.0` (待定): 正式发布

---

## 🔧 故障排除

### 标签已存在

```bash
# 删除本地标签
git tag -d v0.2.0-beta

# 删除远程标签
git push origin :refs/tags/v0.2.0-beta

# 重新创建标签
git tag -a v0.2.0-beta -m "Release v0.2.0-beta"
git push origin v0.2.0-beta
```

### 推送失败

```bash
# 拉取最新代码
git pull --rebase origin main

# 重新推送
git push origin main --tags
```

### 部署失败

1. 检查 Vercel 部署日志
2. 检查环境变量配置
3. 本地测试构建: `npm run build`
4. 查看 GitHub Actions（如果配置了）

---

## 📚 参考资源

### 版本管理
- [语义化版本规范](https://semver.org/lang/zh-CN/)
- [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)

### Git 操作
- [Git Tagging](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%89%93%E6%A0%87%E7%AD%BE)
- [GitHub Releases](https://docs.github.com/zh/repositories/releasing-projects-on-github)

### 项目文档
- `CHANGELOG.md`: 版本更新日志
- `RELEASE_vX.X.X.md`: 详细发布说明
- `README.md`: 项目说明

---

## 🎯 版本规划

### v0.3.0 (计划中)
- 图片上传功能（Cloudinary 集成）
- 定时发布功能
- 评论系统（Giscus）

### v0.4.0 (计划中)
- SEO 优化
- 性能优化
- 分析统计

### v1.0.0 (计划中)
- 正式版发布
- 功能完善
- 文档完备

---

## ✅ 发布检查表（打印版）

```
□ 代码功能完成并测试
□ 修复所有严重 Bug
□ 更新 CHANGELOG.md
□ 创建 RELEASE_vX.X.X.md（重要版本）
□ 提交文档更新到 GitHub
□ 创建 Git 标签
□ 推送标签到 GitHub
□ 创建 GitHub Release
□ 验证 Vercel 部署
□ 测试生产环境
□ 更新版本规划（如有必要）
```

---

**版本发布是项目管理的重要环节，遵循标准流程可以确保发布质量！** ✨

