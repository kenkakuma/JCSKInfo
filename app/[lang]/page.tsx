import { allPosts } from 'contentlayer/generated'
import { Language } from '@/config/site'
import MasonryNewsCard from '@/components/MasonryNewsCard'
import HeroCarousel from '@/components/HeroCarousel'
import WeatherWidget from '@/components/WeatherWidget'
import StockWidget from '@/components/StockWidget'
import CryptoWidget from '@/components/CryptoWidget'
import TrendingPosts from '@/components/TrendingPosts'

export default async function HomePage({ params }: { params: { lang: Language } }) {
  // 获取当前语言的文章并按日期排序
  const posts = allPosts
    .filter((post) => post.lang === params.lang)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // 分配文章到不同的布局
  const displayPosts = posts.slice(3, 20) // 前3篇用于轮播，显示接下来的17篇文章

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* 左侧主内容区 */}
          <div className="flex-1">
            {/* 特色文章 - 轮播展示前3篇 */}
            {posts.length > 0 && <HeroCarousel posts={posts} autoPlayInterval={8000} />}

            {/* 瀑布流网格 - 3小1大循环模式 */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {displayPosts.map((post, index) => {
                // 3小1大循环模式：0,1,2=小卡片，3=大卡片（占3列）
                // 然后4,5,6=小卡片，7=大卡片反向（占3列）
                let variant: 'large' | 'large-reverse' | 'small' = 'small'
                let colSpan = ''

                const cyclePosition = index % 8 // 8个为一个完整循环（3小+1大+3小+1大反向）

                if (cyclePosition === 3) {
                  // 第4个位置：大卡片（图片左，文字右）
                  variant = 'large'
                  colSpan = 'lg:col-span-3'
                } else if (cyclePosition === 7) {
                  // 第8个位置：大卡片反向（图片右，文字左）
                  variant = 'large-reverse'
                  colSpan = 'lg:col-span-3'
                }
                // 其他位置（0,1,2,4,5,6）都是小卡片

                return (
                  <MasonryNewsCard key={post._id} post={post} variant={variant} colSpan={colSpan} />
                )
              })}
            </div>
          </div>

          {/* 右侧边栏 */}
          <aside className="hidden w-[340px] flex-shrink-0 space-y-4 lg:block">
            {/* 天气组件 */}
            <div className="sticky top-6 space-y-4">
              <WeatherWidget lang={params.lang} />
              {/* 股票信息组件 */}
              <StockWidget lang={params.lang} />
              {/* 加密货币组件 */}
              <CryptoWidget lang={params.lang} />
              {/* 人气新闻排行榜 */}
              <TrendingPosts allPosts={posts} limit={10} lang={params.lang} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
