const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cf.shopee.vn',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
      // 新闻媒体图片源
      {
        protocol: 'https',
        hostname: 'cdn.mos.cms.futurecdn.net',
      },
      {
        protocol: 'https',
        hostname: '**.futurecdn.net',
      },
      {
        protocol: 'https',
        hostname: 'coincentral.com',
      },
      {
        protocol: 'https',
        hostname: '**.coincentral.com',
      },
      {
        protocol: 'https',
        hostname: 'www.reuters.com',
      },
      {
        protocol: 'https',
        hostname: '**.reuters.com',
      },
      // 通配符支持更多新闻源
      {
        protocol: 'https',
        hostname: '**.wp.com',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '**.cloudfront.net',
      },
      // The Verge / Vox Media
      {
        protocol: 'https',
        hostname: 'platform.theverge.com',
      },
      {
        protocol: 'https',
        hostname: '**.theverge.com',
      },
      {
        protocol: 'https',
        hostname: '**.vox-cdn.com',
      },
      // 其他主流科技媒体
      {
        protocol: 'https',
        hostname: '**.techcrunch.com',
      },
      {
        protocol: 'https',
        hostname: '**.arstechnica.com',
      },
      {
        protocol: 'https',
        hostname: '**.engadget.com',
      },
      {
        protocol: 'https',
        hostname: '**.wired.com',
      },
      {
        protocol: 'https',
        hostname: '**.cnet.com',
      },
      {
        protocol: 'https',
        hostname: '**.zdnet.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    minimumCacheTTL: 60,
    // 添加自定义 loader 配置，处理防盗链
    unoptimized: false,
    // 添加设备尺寸配置
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // 添加自定义 headers 绕过防盗链
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Referrer-Policy',
            value: 'no-referrer-when-downgrade',
          },
        ],
      },
    ]
  },
  // 重定向根路径到日语
  async redirects() {
    return [
      {
        source: '/',
        destination: '/ja',
        permanent: false,
      },
    ]
  },
}

module.exports = withContentlayer(nextConfig)
