#!/usr/bin/env node

/**
 * 生成 PWA 图标占位符
 * 这是一个临时脚本，用于生成基本的 PNG 图标
 * 生产环境建议使用专业设计的图标
 */

const fs = require('fs')
const path = require('path')

// 创建简单的 PNG 数据 (1x1 透明像素)
// 实际使用中，这应该是真实的图标
const createPlaceholderIcon = (size) => {
  const svg = `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0ea5e9;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.15}" fill="url(#grad)"/>
  <text x="${size / 2}" y="${size * 0.58}" font-family="monospace" font-size="${size * 0.35}" font-weight="800" font-style="italic" fill="white" text-anchor="middle">JC</text>
  <text x="${size / 2}" y="${size * 0.75}" font-family="sans-serif" font-size="${size * 0.12}" font-weight="100" font-style="italic" fill="white" opacity="0.9" text-anchor="middle">SKI</text>
</svg>`
  return svg
}

// 保存 SVG 文件
const publicDir = path.join(__dirname, '..', 'public')

;['192', '512'].forEach((size) => {
  const svg = createPlaceholderIcon(parseInt(size))
  const filename = `icon-${size}.svg`
  fs.writeFileSync(path.join(publicDir, filename), svg)
  console.log(`✅ 生成: ${filename}`)
})

console.log(`
⚠️  注意：当前使用的是 SVG 格式的占位符图标
   PWA 通常推荐使用 PNG 格式以获得更好的兼容性

📝 建议：
   1. 使用设计工具（如 Figma, Canva）设计专业图标
   2. 导出为 192x192 和 512x512 的 PNG 格式
   3. 替换 public/icon-192.svg 和 public/icon-512.svg

💡 临时解决方案：
   可以访问 https://realfavicongenerator.net/ 
   上传您的 logo 快速生成所有尺寸的图标
`)
