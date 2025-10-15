import { Language } from '@/config/site'
import { getDictionary } from '@/lib/dictionary'
import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { lang: Language }
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang)

  return {
    title: dict.nav.about,
    description: dict.seo.defaultDescription,
  }
}

export default async function AboutPage({ params }: { params: { lang: Language } }) {
  const dict = await getDictionary(params.lang)

  const content: Record<
    Language,
    {
      title: string
      description: string[]
      techStack: string
      techStackItems: string[]
    }
  > = {
    vi: {
      title: 'Về JetCode·SKI',
      description: [
        'Đây là một nền tảng tổng hợp nội dung được xây dựng hoàn toàn bởi AI, tuyển chọn những tin tức và quan điểm mà tôi cho là đáng đọc. Từ lựa chọn công nghệ, thiết kế kiến trúc đến từng dòng code, tất cả đều do Claude phát triển độc lập. Đây vừa là một thí nghiệm công nghệ, vừa là một tín hiệu: khi AI trở thành đối tác phát triển của bạn, rào cản xây dựng ứng dụng nhẹ đã được viết lại hoàn toàn.',
        '',
        'Xin cảm ơn cộng đồng mã nguồn mở và vô số lập trình viên, nhờ sự tích lũy và cải tiến công nghệ của họ mà thời đại này mới có thể thành hiện thực.',
      ],
      techStack: '🛠️ Công Nghệ Sử Dụng',
      techStackItems: [
        'Next.js 13 (App Router) - React framework',
        'TypeScript - Type safety',
        'Tailwind CSS - Styling',
        'Contentlayer - MDX content management',
        'Cloudinary - Image hosting & optimization',
        'Sveltia CMS - Headless CMS',
        'GitHub OAuth - Authentication',
        'Google Analytics & AdSense - Analytics & monetization',
        'Vercel - Deployment & hosting',
      ],
    },
    ja: {
      title: 'JetCode·SKIについて',
      description: [
        'これは完全にAIによって構築されたコンテンツ集約プラットフォームで、私が読む価値があると考えるニュースや見解を収録しています。技術選定、アーキテクチャ設計から全てのコードに至るまで、Claudeが単独で開発しました。これは技術実験であると同時に、一つのシグナルでもあります：AIが開発パートナーとなる時代、軽量アプリケーション構築の敷居は根本的に書き換えられたのです。',
        '',
        'オープンソースコミュニティと無数の開発者たちの技術蓄積と反復があったからこそ、今の時代が実現しました。感謝します。',
      ],
      techStack: '🛠️ 使用技術',
      techStackItems: [
        'Next.js 13 (App Router) - Reactフレームワーク',
        'TypeScript - 型安全性',
        'Tailwind CSS - スタイリング',
        'Contentlayer - MDXコンテンツ管理',
        'Cloudinary - 画像ホスティング・最適化',
        'Sveltia CMS - ヘッドレスCMS',
        'GitHub OAuth - 認証',
        'Google Analytics & AdSense - 分析・収益化',
        'Vercel - デプロイ・ホスティング',
      ],
    },
    en: {
      title: 'About JetCode·SKI',
      description: [
        'This is a content aggregation platform entirely built by AI, curating news and insights I find worth reading. From technical decisions and architecture design to every line of code, it was independently developed by Claude. This is both a technical experiment and a signal: when AI becomes your development partner, the barrier to building lightweight applications has been fundamentally rewritten.',
        '',
        'Thanks to the open-source community and countless developers whose technical accumulation and iteration have made this era possible.',
      ],
      techStack: '🛠️ Tech Stack',
      techStackItems: [
        'Next.js 13 (App Router) - React framework',
        'TypeScript - Type safety',
        'Tailwind CSS - Styling',
        'Contentlayer - MDX content management',
        'Cloudinary - Image hosting & optimization',
        'Sveltia CMS - Headless CMS',
        'GitHub OAuth - Authentication',
        'Google Analytics & AdSense - Analytics & monetization',
        'Vercel - Deployment & hosting',
      ],
    },
  }

  const text = content[params.lang]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-12 text-center text-5xl font-thin text-gray-900 dark:text-gray-100">
          {text.title}
        </h1>

        <div className="space-y-8">
          {/* 描述 */}
          <div className="rounded-2xl bg-gradient-to-br from-primary-50 to-blue-50 p-8 dark:from-gray-800 dark:to-gray-900">
            {text.description.map((line, index) => (
              <p
                key={index}
                className={`text-lg leading-relaxed ${line === '' ? 'mb-4' : 'mb-2'} ${
                  index === 0
                    ? 'text-gray-900 dark:text-gray-100'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {line}
              </p>
            ))}
          </div>

          {/* 技术栈 */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {text.techStack}
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {text.techStackItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                >
                  <span className="mt-1 text-primary-600 dark:text-primary-400">▹</span>
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
