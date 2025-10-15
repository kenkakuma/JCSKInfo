import { NextRequest, NextResponse } from 'next/server'
import cloudinary from '@/lib/cloudinary'

/**
 * 图片上传 API
 *
 * 接收图片文件并上传到 Cloudinary
 *
 * POST /api/upload/image
 * Content-Type: multipart/form-data
 * Body: { file: File }
 *
 * Response:
 * {
 *   success: true,
 *   url: string,
 *   publicId: string,
 *   width: number,
 *   height: number,
 *   format: string,
 *   size: number
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // 获取上传的文件
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 })
    }

    // 验证文件类型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid file type. Only JPG, PNG, GIF, and WebP are allowed.',
        },
        { status: 400 }
      )
    }

    // 验证文件大小 (最大 20MB)
    const maxSize = 20 * 1024 * 1024 // 20MB in bytes
    if (file.size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          error: 'File too large. Maximum size is 20MB.',
        },
        { status: 400 }
      )
    }

    // 将 File 转换为 Buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // 上传到 Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'jcski-posts', // 存储在 jcski-posts 文件夹
          resource_type: 'image',
          // 自动优化配置
          transformation: [{ quality: 'auto', fetch_format: 'auto' }],
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      )

      uploadStream.end(buffer)
    })

    const uploadResult = result as any

    // 返回上传结果
    return NextResponse.json({
      success: true,
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      width: uploadResult.width,
      height: uploadResult.height,
      format: uploadResult.format,
      size: uploadResult.bytes,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed',
      },
      { status: 500 }
    )
  }
}

/**
 * 获取上传配置信息
 *
 * GET /api/upload/image
 *
 * Response:
 * {
 *   cloudName: string,
 *   maxFileSize: number,
 *   allowedFormats: string[]
 * }
 */
export async function GET() {
  return NextResponse.json({
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    maxFileSize: 20 * 1024 * 1024, // 20MB
    allowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
  })
}
