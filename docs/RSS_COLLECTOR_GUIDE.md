# 📡 RSS内容采集系统 - 使用指南

> JetCode·SKI 自动化内容采集系统
> 版本: 1.0.0 | 更新日期: 2025-10-17

---

## 📋 目录

1. [系统概述](#系统概述)
2. [快速开始](#快速开始)
3. [配置RSS源](#配置rss源)
4. [本地运行](#本地运行)
5. [GitHub Actions自动化](#github-actions自动化)
6. [内容审核流程](#内容审核流程)
7. [常见问题](#常见问题)
8. [技术架构](#技术架构)

---

## 🎯 系统概述

### 功能特性

✅ **自动采集**: 定时从配置的RSS源采集最新科技新闻
✅ **智能去重**: MD5 hash防止重复采集
✅ **格式转换**: HTML自动转换为Markdown
✅ **多语言支持**: 日语、英语、越南语
✅ **草稿模式**: 所有采集内容默认草稿状态
✅ **人工审核**: 通过Sveltia CMS编辑和发布

### 工作流程

```
RSS源 → GitHub Actions(每6小时) → 解析内容 → 生成MDX草稿 →
提交到GitHub → Sveltia CMS审核 → 发布 → Vercel自动部署
```

---

## 🚀 快速开始

### 前置要求

- Node.js 18+
- GitHub账号(用于Actions)
- Sveltia CMS访问权限

### 安装依赖

```bash
# 进入项目目录
cd /path/to/JCSKInfo

# 安装RSS采集器依赖
cd scripts/rss-collector
npm install
cd ../..
```

### 首次运行测试

```bash
# 从项目根目录运行
node scripts/rss-collector/index.js
```

**预期输出:**
```
🚀 JetCode·SKI RSS Content Collector
⏰ Started at: 2025-10-17 20:00:00

📚 Collecting content for: JA
📡 Fetching feed: Gizmodo Japan
✅ Found 25 items in Gizmodo Japan
✅ Saved: ja/article-slug.mdx

📊 COLLECTION SUMMARY
✅ Saved:   9
⏭️  Skipped: 0
📝 Total:   9

🎉 New content collected successfully!
```

---

## ⚙️ 配置RSS源

### 编辑配置文件

**文件位置**: `scripts/rss-collector/feeds.config.js`

```javascript
export const RSS_FEEDS = {
  // 日语科技新闻源
  ja: [
    {
      url: 'https://www.gizmodo.jp/index.xml',
      name: 'Gizmodo Japan',
      category: 'tech-gadgets',
      priority: 'high'
    },
    // 添加更多日语源...
  ],

  // 英语科技新闻源
  en: [
    {
      url: 'https://techcrunch.com/feed/',
      name: 'TechCrunch',
      category: 'tech-news',
      priority: 'high'
    },
    // 添加更多英语源...
  ],

  // 越南语科技新闻源
  vi: [
    {
      url: 'https://genk.vn/rss/trang-chu.rss',
      name: 'Genk.vn',
      category: 'tech-news',
      priority: 'high'
    }
  ]
};
```

### 推荐RSS源

#### 日语科技新闻
- **Gizmodo Japan**: `https://www.gizmodo.jp/index.xml`
- **ITmedia**: `https://www.itmedia.co.jp/rss/2.0/news_bursts.xml`
- **Engadget Japan**: `https://japanese.engadget.com/rss.xml`
- **ASCII.jp**: `https://ascii.jp/rss.xml`

#### 英语科技新闻
- **TechCrunch**: `https://techcrunch.com/feed/`
- **The Verge**: `https://www.theverge.com/rss/index.xml`
- **Ars Technica**: `https://feeds.arstechnica.com/arstechnica/index`
- **Wired**: `https://www.wired.com/feed/rss`

#### 越南语科技新闻
- **Genk.vn**: `https://genk.vn/rss/trang-chu.rss`
- **VnExpress Tech**: `https://vnexpress.net/rss/so-hoa.rss`

### 采集器配置

```javascript
export const COLLECTOR_CONFIG = {
  // 每个源每次采集的最大文章数
  maxArticlesPerFeed: 3,

  // 最小内容长度(字符)
  minContentLength: 100,

  // Slug最大长度
  maxSlugLength: 60,

  // 草稿模式(建议保持true)
  draftMode: true,

  // 内容验证规则
  validation: {
    requireTitle: true,
    requireContent: true,
    requireDate: true
  }
};
```

---

## 💻 本地运行

### 基础命令

```bash
# 1. 运行采集器(从项目根目录)
node scripts/rss-collector/index.js

# 2. 查看帮助
node scripts/rss-collector/index.js --help

# 3. 清空去重缓存(重新采集所有文章)
rm scripts/rss-collector/.collected-hashes.json
```

### 测试单个语言

编辑 `feeds.config.js`,临时注释其他语言:

```javascript
export const RSS_FEEDS = {
  ja: [...],  // 保留
  // vi: [...],  // 注释
  // en: [...]   // 注释
};
```

### 调试模式

编辑 `scripts/rss-collector/test-debug.js` 进行单文章测试:

```bash
node scripts/rss-collector/test-debug.js
```

---

## 🤖 GitHub Actions自动化

### 自动运行配置

**文件位置**: `.github/workflows/rss-collector.yml`

**运行频率**: 每6小时自动执行

```yaml
schedule:
  - cron: '0 */6 * * *'  # 每6小时运行
```

### Cron表达式参考

| 表达式 | 说明 |
|--------|------|
| `0 */4 * * *` | 每4小时 |
| `0 */6 * * *` | 每6小时(默认) |
| `0 */12 * * *` | 每12小时 |
| `0 0 * * *` | 每天午夜 |
| `0 8,20 * * *` | 每天8:00和20:00 |

### 手动触发

1. 访问GitHub仓库
2. 点击 **Actions** 标签页
3. 选择 **RSS Content Collector** workflow
4. 点击 **Run workflow** 按钮
5. 选择分支(通常是`main`)
6. 点击绿色 **Run workflow** 按钮

![GitHub Actions Manual Run](https://docs.github.com/assets/images/help/actions/workflow-dispatch-event.png)

### 查看运行日志

1. **Actions** → **RSS Content Collector**
2. 点击最新的运行记录
3. 展开 **Run RSS collector** 步骤查看详细日志

### Dry Run模式(测试不提交)

```bash
# 在手动触发时选择:
# dry_run: true
```

---

## 📝 内容审核流程

### 1. 访问Sveltia CMS

**URL**: `https://jcski.com/admin/posts`

**登录方式**:
- 使用后台管理员账号登录
- 使用GitHub Token登录

### 2. 查看草稿文章

**筛选草稿**:
1. 在文章列表中
2. 筛选条件: `draft: true`
3. 或搜索 `sourceName: TechCrunch` 等

### 3. 审核内容

检查以下内容:

#### ✅ 标题优化
- **原标题**: `Meta previews new parental controls for its AI experiences`
- **优化建议**: 添加中文翻译或更吸引人的标题
- **SEO**: 包含关键词,10-60字符

#### ✅ 摘要检查
- 长度: 50-160字符
- 包含关键信息
- 吸引读者点击

#### ✅ 标签审核
```yaml
tags:
  - AI        # ✅ 保留
  - Social    # ✅ 保留
  - Meta      # ⚠️ 可能需要统一为"Facebook"
  - 家长控制   # ➕ 添加中文标签
```

#### ✅ 特色图片
- 检查图片是否加载正常
- 如果缺失或质量差,从以下来源替换:
  - Unsplash: `https://unsplash.com/s/photos/ai`
  - Pexels: `https://www.pexels.com/search/technology/`
  - 自己上传到Cloudinary

#### ✅ 内容完整性
- 检查是否有截断
- 段落格式是否正确
- 链接是否有效

#### ✅ 元数据检查
```yaml
sourceUrl: https://techcrunch.com/2025/10/17/...  # 保留原文链接
sourceName: TechCrunch  # 来源名称
collectedAt: 2025-10-17T11:11:32.496Z  # 采集时间
```

### 4. 发布文章

**发布步骤**:
1. 完成所有审核和编辑
2. 将 `draft: false`
3. 点击 **Save** 按钮
4. Sveltia CMS自动提交到GitHub
5. GitHub触发Vercel自动部署
6. 2-3分钟后网站更新

### 5. 验证发布

访问对应URL验证:
- 日语: `https://jcski.com/ja/posts/article-slug`
- 英语: `https://jcski.com/en/posts/article-slug`

---

## ❓ 常见问题

### Q1: 采集器运行失败怎么办?

**检查步骤**:
```bash
# 1. 检查依赖
cd scripts/rss-collector && npm install

# 2. 测试RSS源是否可访问
curl -I https://www.gizmodo.jp/index.xml

# 3. 查看详细错误日志
node scripts/rss-collector/index.js 2>&1 | tee collector.log
```

**常见错误**:
- `Status code 404/500`: RSS源失效,移除或替换
- `ENOTFOUND`: 网络问题,检查DNS
- `validation_failed`: 检查 `COLLECTOR_CONFIG` 验证规则

### Q2: 为什么有些文章被跳过?

**原因**:
1. **已采集**: Hash已存在于 `.collected-hashes.json`
2. **内容太短**: 少于100字符
3. **缺少必填字段**: 标题、日期或内容为空

**解决方案**:
```bash
# 清空去重缓存重新采集
rm scripts/rss-collector/.collected-hashes.json

# 或降低minContentLength
# 编辑 feeds.config.js:
# minContentLength: 50
```

### Q3: 如何修改采集频率?

编辑 `.github/workflows/rss-collector.yml`:

```yaml
schedule:
  - cron: '0 */4 * * *'  # 改为每4小时
```

### Q4: GitHub Actions没有运行?

**检查清单**:
1. ✅ Workflow文件路径正确: `.github/workflows/rss-collector.yml`
2. ✅ 已推送到GitHub
3. ✅ Actions已启用: Settings → Actions → General → Allow all actions
4. ✅ Workflow权限: Settings → Actions → Workflow permissions → Read and write permissions

### Q5: 内容格式乱码怎么办?

**HTML转Markdown问题**:

编辑 `parser.js` 增强转换:
```javascript
import TurndownService from 'turndown';

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  emDelimiter: '*',  // 添加
  bulletListMarker: '-'  // 添加
});
```

### Q6: 如何添加图片?

**方法1: 自动提取**
系统自动从RSS提取 `<enclosure>` 或 `<media:content>`

**方法2: 人工添加**
在Sveltia CMS中:
1. 点击 **Featured Image**
2. 上传或输入URL
3. 保存

### Q7: 采集的文章质量不好?

**优化策略**:

1. **提高内容长度阈值**:
```javascript
// feeds.config.js
minContentLength: 300  // 提高到300
```

2. **筛选RSS源**:
   - 移除低质量源
   - 添加权威媒体源

3. **添加关键词过滤**:
编辑 `utils.js` 添加黑名单:
```javascript
const BLACKLIST_KEYWORDS = ['广告', 'sponsored', 'ad:'];

export function validateContent(article, config) {
  // 检查黑名单
  if (BLACKLIST_KEYWORDS.some(kw =>
    article.title.toLowerCase().includes(kw.toLowerCase())
  )) {
    return false;
  }
  // ... 原有验证逻辑
}
```

### Q8: 如何备份采集的文章?

**方法1: Git历史**
所有文章已自动备份在Git历史中

**方法2: 导出MDX**
```bash
# 打包所有草稿
tar -czf drafts-backup-$(date +%Y%m%d).tar.gz \
  content/posts/*/$(grep -l "draft: true" content/posts/*/*.mdx)
```

---

## 🏗️ 技术架构

### 目录结构

```
JCSKInfo/
├── .github/
│   └── workflows/
│       └── rss-collector.yml      # GitHub Actions配置
├── scripts/
│   └── rss-collector/
│       ├── package.json            # 依赖配置
│       ├── feeds.config.js         # RSS源配置
│       ├── utils.js                # 工具函数
│       ├── parser.js               # RSS解析器
│       ├── generator.js            # MDX生成器
│       ├── index.js                # 主程序
│       ├── test-debug.js           # 调试脚本
│       └── .collected-hashes.json  # 去重缓存
└── content/
    └── posts/
        ├── ja/                     # 日语文章
        ├── en/                     # 英语文章
        └── vi/                     # 越南语文章
```

### 核心模块说明

#### 1. `feeds.config.js` - RSS源配置
```javascript
- RSS_FEEDS: RSS源列表
- COLLECTOR_CONFIG: 采集器配置参数
```

#### 2. `utils.js` - 工具函数库
```javascript
- generateSlug(): 生成URL友好的slug
- generateContentHash(): 内容去重hash
- extractSummary(): 提取摘要
- htmlToMarkdown(): HTML转Markdown
- validateContent(): 内容验证
```

#### 3. `parser.js` - RSS解析器
```javascript
- parseFeed(): 解析单个RSS源
- parseFeeds(): 批量解析
- transformToArticle(): 转换为文章对象
```

#### 4. `generator.js` - MDX生成器
```javascript
- generateMDX(): 生成MDX内容
- saveArticle(): 保存单篇文章
- saveArticles(): 批量保存
```

#### 5. `index.js` - 主程序
```javascript
- main(): 主函数
- collectLanguage(): 采集单个语言
- filterDuplicates(): 过滤重复
```

### 数据流图

```
┌──────────────────┐
│   RSS Feed 源    │
└────────┬─────────┘
         │
         ↓
┌──────────────────┐
│  parser.parseFeed│  ← 解析RSS
│  - 提取元数据    │
│  - 转换格式      │
└────────┬─────────┘
         │
         ↓
┌──────────────────┐
│ utils工具函数    │
│  - HTML→MD       │  ← 内容处理
│  - 生成slug      │
│  - 提取摘要      │
└────────┬─────────┘
         │
         ↓
┌──────────────────┐
│  去重检查         │  ← 防止重复
│  (.collected-    │
│   hashes.json)   │
└────────┬─────────┘
         │
         ↓
┌──────────────────┐
│generator.saveMDX │  ← 保存文件
│  - 生成frontmatter│
│  - 写入文件      │
└────────┬─────────┘
         │
         ↓
┌──────────────────┐
│  content/posts/  │  ← MDX草稿
│  [lang]/         │
│  article.mdx     │
└──────────────────┘
```

### 依赖包说明

```json
{
  "rss-parser": "^3.13.0",    // RSS解析
  "gray-matter": "^4.0.3",    // Frontmatter处理
  "turndown": "^7.1.2",       // HTML→Markdown
  "node-fetch": "^3.3.2"      // HTTP请求
}
```

---

## 📊 性能优化建议

### 1. 控制采集频率
```yaml
# 低流量站点
schedule: '0 */12 * * *'  # 每12小时

# 高流量站点
schedule: '0 */4 * * *'   # 每4小时
```

### 2. 限制每源文章数
```javascript
// feeds.config.js
maxArticlesPerFeed: 2  // 降低到2篇
```

### 3. 优化RSS源
- 移除响应慢的源(>5秒)
- 优先使用CDN加速的源
- 定期检查源的可用性

### 4. 去重优化
定期清理旧hash(保留最近1000条):
```bash
# 清理1个月前的hash
node -e "
const fs = require('fs');
const hashes = JSON.parse(fs.readFileSync('scripts/rss-collector/.collected-hashes.json'));
const recent = hashes.slice(-1000);
fs.writeFileSync('scripts/rss-collector/.collected-hashes.json', JSON.stringify(recent, null, 2));
"
```

---

## 🔐 安全注意事项

### 1. 敏感信息
- ❌ 不要在配置文件中硬编码API密钥
- ✅ 使用GitHub Secrets存储敏感信息
- ✅ `.collected-hashes.json` 已在 `.gitignore`

### 2. RSS源验证
- 只添加可信的RSS源
- 定期检查源的有效性
- 防止XSS: HTML会被转换为Markdown

### 3. 内容审核
- 所有内容默认 `draft: true`
- 人工审核后才发布
- 保留 `sourceUrl` 追溯来源

---

## 📞 获取帮助

### 问题反馈
- GitHub Issues: [提交问题](https://github.com/kenkakuma/JCSKInfo/issues)
- 项目文档: `docs/RSS_COLLECTOR_GUIDE.md`

### 相关文档
- [Sveltia CMS文档](docs/SVELTIA_CMS_USAGE.md)
- [项目README](README.md)
- [更新日志](CHANGELOG.md)

---

## 🎉 结语

RSS采集系统已为您的博客提供自动化内容源。记住:

1. ✅ **定期检查**: 每周检查采集质量
2. ✅ **人工审核**: 不要直接发布未审核内容
3. ✅ **优化源**: 持续优化RSS源列表
4. ✅ **监控运行**: 关注GitHub Actions运行状态

**Happy Blogging! 🚀**

---

**文档版本**: 1.0.0
**最后更新**: 2025-10-17
**维护者**: JetCode·SKI Team
