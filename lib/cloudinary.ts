/**
 * Cloudinary 配置和工具函数
 *
 * 用于图片上传、优化和 URL 生成
 */

import { v2 as cloudinary } from 'cloudinary'

// 配置 Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export default cloudinary

/**
 * 获取优化后的图片 URL
 *
 * @param publicId - Cloudinary 图片的 public ID
 * @param options - 优化选项
 * @returns 优化后的图片 URL
 *
 * @example
 * ```typescript
 * // 基础用法
 * const url = getOptimizedImageUrl('sample')
 *
 * // 指定宽度和质量
 * const url = getOptimizedImageUrl('sample', { width: 800, quality: 80 })
 *
 * // 响应式图片
 * const url = getOptimizedImageUrl('sample', { width: 1200, format: 'webp' })
 * ```
 */
export function getOptimizedImageUrl(
  publicId: string,
  options: {
    width?: number
    height?: number
    quality?: number | 'auto'
    format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png'
    crop?: 'fill' | 'fit' | 'scale' | 'limit' | 'pad'
    gravity?: 'auto' | 'center' | 'face' | 'faces'
  } = {}
): string {
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'limit',
    gravity = 'auto',
  } = options

  const transformations: string[] = []

  // 尺寸和裁剪
  if (width) transformations.push(`w_${width}`)
  if (height) transformations.push(`h_${height}`)
  transformations.push(`c_${crop}`)
  if (gravity) transformations.push(`g_${gravity}`)

  // 质量和格式
  transformations.push(`q_${quality}`)
  transformations.push(`f_${format}`)

  // 构建 URL
  const baseUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`
  const transformationString = transformations.join(',')

  return `${baseUrl}/${transformationString}/${publicId}`
}

/**
 * 生成响应式图片 srcset
 *
 * @param publicId - Cloudinary 图片的 public ID
 * @param widths - 需要生成的宽度数组
 * @returns srcset 字符串
 *
 * @example
 * ```typescript
 * const srcset = getResponsiveSrcSet('sample', [400, 800, 1200])
 * // 返回: "url-400 400w, url-800 800w, url-1200 1200w"
 * ```
 */
export function getResponsiveSrcSet(
  publicId: string,
  widths: number[] = [400, 800, 1200, 1600]
): string {
  return widths
    .map((width) => {
      const url = getOptimizedImageUrl(publicId, { width, format: 'auto' })
      return `${url} ${width}w`
    })
    .join(', ')
}

/**
 * 从 Cloudinary URL 提取 public ID
 *
 * @param url - Cloudinary 图片 URL
 * @returns public ID
 *
 * @example
 * ```typescript
 * const publicId = extractPublicId('https://res.cloudinary.com/demo/image/upload/sample.jpg')
 * // 返回: "sample"
 * ```
 */
export function extractPublicId(url: string): string {
  // 匹配 Cloudinary URL 模式
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/)
  return match ? match[1] : url
}

/**
 * 获取图片缩略图 URL
 *
 * @param publicId - Cloudinary 图片的 public ID
 * @param size - 缩略图尺寸（正方形）
 * @returns 缩略图 URL
 */
export function getThumbnailUrl(publicId: string, size: number = 200): string {
  return getOptimizedImageUrl(publicId, {
    width: size,
    height: size,
    crop: 'fill',
    gravity: 'auto',
  })
}

/**
 * 获取 OpenGraph 图片 URL
 *
 * @param publicId - Cloudinary 图片的 public ID
 * @returns OG 图片 URL (1200x630)
 */
export function getOGImageUrl(publicId: string): string {
  return getOptimizedImageUrl(publicId, {
    width: 1200,
    height: 630,
    crop: 'fill',
    gravity: 'auto',
    format: 'jpg',
    quality: 80,
  })
}
