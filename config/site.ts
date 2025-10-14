export const languages = ['vi', 'ja', 'en'] as const
export type Language = (typeof languages)[number]

export const defaultLanguage: Language = 'ja'

export const siteConfig = {
  vi: {
    name: 'JetCode·SKI',
    description: 'Theo Dõi Đổi Mới, Cung Cấp Thông Tin',
    url: 'https://jcski.com',
    ogImage: 'https://jcski.com/og-vi.jpg',
    links: {
      twitter: 'https://twitter.com/yourusername',
      facebook: 'https://facebook.com/yourpage',
    },
    author: {
      name: 'JetCode·SKI Team',
      email: 'contact@jcski.com',
    },
  },
  ja: {
    name: 'JetCode·SKI',
    description: 'イノベーションを追跡し、洞察を提供',
    url: 'https://jcski.com',
    ogImage: 'https://jcski.com/og-ja.jpg',
    links: {
      twitter: 'https://twitter.com/yourusername',
      facebook: 'https://facebook.com/yourpage',
    },
    author: {
      name: 'JetCode·SKI チーム',
      email: 'contact@jcski.com',
    },
  },
  en: {
    name: 'JetCode·SKI',
    description: 'Tracking Innovation, Delivering Insights',
    url: 'https://jcski.com',
    ogImage: 'https://jcski.com/og-en.jpg',
    links: {
      twitter: 'https://twitter.com/yourusername',
      facebook: 'https://facebook.com/yourpage',
    },
    author: {
      name: 'JetCode·SKI Team',
      email: 'contact@jcski.com',
    },
  },
}

export const navLinks = {
  vi: [
    { href: '/vi', label: 'Trang chủ' },
    { href: '/vi/posts', label: 'Bài viết' },
    { href: '/vi/about', label: 'Giới thiệu' },
  ],
  ja: [
    { href: '/ja', label: 'ホーム' },
    { href: '/ja/posts', label: '記事' },
    { href: '/ja/about', label: '概要' },
  ],
  en: [
    { href: '/en', label: 'Home' },
    { href: '/en/posts', label: 'Posts' },
    { href: '/en/about', label: 'About' },
  ],
}
