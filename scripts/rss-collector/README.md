# RSS Content Collector

> 自动化RSS内容采集系统 for JetCode·SKI

## 快速开始

```bash
# 安装依赖
npm install

# 运行采集器
npm run collect
```

## 功能特性

- ✅ 自动采集科技新闻(日语/英语/越南语)
- ✅ HTML → Markdown转换
- ✅ 智能去重机制
- ✅ 生成MDX草稿文件
- ✅ GitHub Actions自动化

## 配置

编辑 `feeds.config.js` 添加/修改RSS源:

```javascript
export const RSS_FEEDS = {
  ja: [
    { url: '...', name: '...', priority: 'high' }
  ]
};
```

## 详细文档

请查看: [完整使用指南](../../docs/RSS_COLLECTOR_GUIDE.md)

## 目录结构

```
rss-collector/
├── index.js          # 主程序入口
├── parser.js         # RSS解析器
├── generator.js      # MDX生成器
├── utils.js          # 工具函数
├── feeds.config.js   # RSS源配置
└── package.json      # 依赖配置
```

## 命令

```bash
npm run collect       # 运行采集器
npm run test          # 运行测试
```

## GitHub Actions

自动化配置: `.github/workflows/rss-collector.yml`
- 每6小时自动运行
- 手动触发支持

## 许可证

MIT License - JetCode·SKI Team
