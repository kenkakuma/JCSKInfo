const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'cf.shopee.vn', 'm.media-amazon.com'],
    formats: ['image/avif', 'image/webp'],
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
