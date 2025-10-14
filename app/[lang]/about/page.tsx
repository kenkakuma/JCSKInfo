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
      coverage: string
      coverageItems: string
      audience: string
      audienceItems: string
    }
  > = {
    vi: {
      title: 'Về JetCode·SKI',
      description: [
        'JetCode·SKI là nền tảng thông tin chuyên nghiệp',
        'tập trung vào công nghệ tiên tiến và tài chính.',
        '',
        'Chúng tôi theo dõi đột phá AI, động thái các công ty công nghệ,',
        'và xu hướng đổi mới tài chính, mang đến góc nhìn chất lượng cao',
        'cho các chuyên gia công nghệ và nhà đổi mới.',
      ],
      coverage: '🎯 Nội Dung Chính:',
      coverageItems:
        'Trí Tuệ Nhân Tạo | Công Nghệ Tiên Tiến | Tin Công Ty Tech | Fintech | Thị Trường Châu Á',
      audience: '💡 Dành Cho:',
      audienceItems: 'Chuyên Gia Tech • Doanh Nhân • Nhà Đầu Tư • Phân Tích Ngành • Nhà Đổi Mới',
    },
    ja: {
      title: 'JetCode·SKIについて',
      description: [
        'JetCode·SKIは、先端テクノロジーと金融分野に特化した',
        'プロフェッショナル情報プラットフォームです。',
        '',
        'AI技術の突破、テック企業の動向、金融イノベーションのトレンドを追跡し、',
        '技術従事者とイノベーターに質の高い業界洞察を提供します。',
      ],
      coverage: '🎯 コアコンテンツ：',
      coverageItems: '人工知能 | 先端技術 | テック企業動向 | フィンテック | アジア市場',
      audience: '💡 対象：',
      audienceItems: '技術従事者 • 起業家 • 投資家 • 業界アナリスト • イノベーター',
    },
    en: {
      title: 'About JetCode·SKI',
      description: [
        'JetCode·SKI is a professional intelligence platform',
        'focused on cutting-edge technology and finance.',
        '',
        'We track AI breakthroughs, tech company developments,',
        'and financial innovation trends, delivering high-quality',
        'industry insights for tech professionals and innovators.',
      ],
      coverage: '🎯 Core Coverage:',
      coverageItems:
        'Artificial Intelligence | Cutting-Edge Tech | Tech Companies | Fintech | Asian Markets',
      audience: '💡 For:',
      audienceItems:
        'Tech Professionals • Entrepreneurs • Investors • Industry Analysts • Innovators',
    },
  }

  const text = content[params.lang]

  return (
    <div className="container mx-auto px-4 py-12 font-mono">
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
                className={`text-xl font-thin ${line === '' ? 'mb-4' : ''} ${
                  index === 0 || index === 1
                    ? 'text-gray-900 dark:text-gray-100'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {line}
              </p>
            ))}
          </div>

          {/* 核心内容 */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-thin text-gray-900 dark:text-gray-100">
              {text.coverage}
            </h2>
            <p className="text-lg font-thin leading-relaxed text-gray-700 dark:text-gray-300">
              {text.coverageItems}
            </p>
          </div>

          {/* 目标受众 */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-thin text-gray-900 dark:text-gray-100">
              {text.audience}
            </h2>
            <p className="text-lg font-thin leading-relaxed text-gray-700 dark:text-gray-300">
              {text.audienceItems}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
