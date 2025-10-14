'use client'

import { PriceInfo } from '@/lib/types'
import AffiliateLink from './AffiliateLink'

interface PriceComparisonProps {
  prices: PriceInfo[]
  productName: string
}

export default function PriceComparison({ prices, productName }: PriceComparisonProps) {
  const sortedPrices = [...prices].sort((a, b) => {
    const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ''))
    const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ''))
    return priceA - priceB
  })

  const platformNames = {
    shopee: 'Shopee',
    amazon: 'Amazon',
    lazada: 'Lazada',
    rakuten: '楽天',
  }

  return (
    <div className="my-6 rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-gray-100">
        💰 So sánh giá / 価格比較
      </h3>
      <div className="space-y-3">
        {sortedPrices.map((priceInfo, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 rounded-lg border border-gray-100 p-3 transition-shadow hover:shadow-md dark:border-gray-700 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex-1">
              <div className="mb-1 flex items-center gap-2">
                <span className="text-base font-semibold text-gray-900 dark:text-gray-100">
                  {platformNames[priceInfo.platform]}
                </span>
                {index === 0 && (
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                    Giá tốt nhất / 最安値
                  </span>
                )}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                  {priceInfo.price}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {priceInfo.currency}
                </span>
              </div>
              <div className="mt-1">
                {priceInfo.inStock ? (
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    ✓ Còn hàng / 在庫あり
                  </span>
                ) : (
                  <span className="text-xs font-medium text-rose-600 dark:text-rose-400">
                    ✗ Hết hàng / 在庫切れ
                  </span>
                )}
              </div>
            </div>
            <div>
              <AffiliateLink
                href={priceInfo.url}
                platform={priceInfo.platform}
                className="whitespace-nowrap"
              >
                Xem ngay / 今すぐ見る
              </AffiliateLink>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        * Giá có thể thay đổi. Vui lòng kiểm tra trên trang bán hàng.
        <br />* 価格は変動する場合があります。販売ページでご確認ください。
      </p>
    </div>
  )
}
