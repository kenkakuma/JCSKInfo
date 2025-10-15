export const languages = ['vi', 'ja', 'en'] as const
export type Language = (typeof languages)[number]

export const defaultLanguage: Language = 'ja'

export const siteConfig = {
  vi: {
    name: 'JetCode·SKI',
    description:
      'Nền tảng nội dung do AI xây dựng, tuyển chọn tin tức và quan điểm có giá trị. Claude phát triển hoàn toàn từ kiến trúc đến code. Minh chứng cho việc AI đang viết lại rào cản phát triển ứng dụng. Cảm ơn cộng đồng mã nguồn mở đã tạo nên thời đại này.',
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
    description:
      'AIが構築したコンテンツプラットフォーム。アーキテクチャからコードまで、全てClaudeが開発しました。AIが開発パートナーとなり、アプリ構築の敷居を書き換える時代の証です。この時代を実現したオープンソースコミュニティに感謝します。',
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
    description:
      'An AI-built content platform curating news and insights I find valuable. Fully developed by Claude from architecture to code. This demonstrates how AI partners are rewriting the barrier to app development. Thanks to the open-source community for making this era possible.',
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
