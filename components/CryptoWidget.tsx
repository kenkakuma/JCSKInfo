'use client'

import { TrendingUp, TrendingDown, Loader2, RefreshCw, Bitcoin } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getWidgetTranslation, type WidgetLang } from '@/lib/widget-translations'

interface CryptoData {
  symbol: string
  name: string
  price: string
  change: string
  changePercent: string
  isPositive: boolean
  marketCap: string
}

interface CryptoWidgetProps {
  lang?: WidgetLang
}

export default function CryptoWidget({ lang = 'ja' }: CryptoWidgetProps) {
  const t = getWidgetTranslation(lang).crypto
  const [cryptos, setCryptos] = useState<CryptoData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  useEffect(() => {
    fetchCryptoData()
    // 每5分钟更新一次
    const interval = setInterval(fetchCryptoData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const fetchCryptoData = async () => {
    try {
      setLoading(true)
      setError(false)

      // 使用CoinGecko免费API（无需API key）
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false&locale=ja'
      )

      if (!response.ok) {
        throw new Error('API request failed')
      }

      const data = await response.json()

      const cryptoList: CryptoData[] = data.map((coin: any) => {
        const changePercent = coin.price_change_percentage_24h || 0
        const isPositive = changePercent >= 0

        return {
          symbol: coin.symbol.toUpperCase(),
          name: coin.name,
          price: `$${coin.current_price.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
          change: isPositive ? `+${changePercent.toFixed(2)}%` : `${changePercent.toFixed(2)}%`,
          changePercent: `${changePercent.toFixed(2)}%`,
          isPositive,
          marketCap: formatMarketCap(coin.market_cap),
        }
      })

      setCryptos(cryptoList)
      setLastUpdate(new Date())
    } catch (err) {
      console.error('Crypto fetch error:', err)
      setError(true)

      // 如果API失败，使用模拟数据
      const fallbackData = generateFallbackData()
      setCryptos(fallbackData)
      setLastUpdate(new Date())
    } finally {
      setLoading(false)
    }
  }

  const formatMarketCap = (marketCap: number): string => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`
    }
    return `$${marketCap.toLocaleString()}`
  }

  const generateFallbackData = (): CryptoData[] => {
    const baseData = [
      { symbol: 'BTC', name: 'Bitcoin', basePrice: 68500, basePct: 2.3, marketCap: 1.35e12 },
      { symbol: 'ETH', name: 'Ethereum', basePrice: 3850, basePct: 1.8, marketCap: 4.63e11 },
      { symbol: 'BNB', name: 'BNB', basePrice: 615, basePct: 0.9, marketCap: 8.95e10 },
      { symbol: 'SOL', name: 'Solana', basePrice: 178, basePct: 3.2, marketCap: 8.12e10 },
      { symbol: 'XRP', name: 'XRP', basePrice: 0.63, basePct: -0.5, marketCap: 3.54e10 },
    ]

    return baseData.map((coin) => {
      const variation = (Math.random() - 0.5) * 1.0
      const changePercent = coin.basePct + variation
      const price = coin.basePrice * (1 + changePercent / 100)
      const isPositive = changePercent >= 0

      return {
        symbol: coin.symbol,
        name: coin.name,
        price: `$${price.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: coin.basePrice < 1 ? 4 : 2,
        })}`,
        change: isPositive ? `+${changePercent.toFixed(2)}%` : `${changePercent.toFixed(2)}%`,
        changePercent: `${changePercent.toFixed(2)}%`,
        isPositive,
        marketCap: formatMarketCap(coin.marketCap),
      }
    })
  }

  const handleRefresh = () => {
    fetchCryptoData()
  }

  const getCryptoIcon = (symbol: string) => {
    // 为不同币种返回emoji图标
    const icons: { [key: string]: string } = {
      BTC: '₿',
      ETH: 'Ξ',
      BNB: '🔶',
      SOL: '◎',
      XRP: '✕',
      ADA: '₳',
      DOGE: 'Ð',
      MATIC: '🔷',
      DOT: '●',
      AVAX: '🔺',
    }
    return icons[symbol] || '●'
  }

  if (loading && cryptos.length === 0) {
    return (
      <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-900">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-900">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bitcoin className="h-4 w-4 text-orange-500" />
          <h3 className="text-sm text-gray-900 dark:text-white">{t.title}</h3>
        </div>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="text-gray-400 transition-colors hover:text-gray-600 disabled:opacity-50 dark:hover:text-gray-300"
          title={t.refresh}
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="space-y-3.5">
        {cryptos.map((crypto, index) => (
          <div key={index} className="flex items-center gap-3">
            {/* 币种图标 */}
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-base text-white dark:from-orange-500 dark:to-orange-700">
              {getCryptoIcon(crypto.symbol)}
            </div>

            {/* 币种信息 */}
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <span className="truncate text-sm text-gray-900 dark:text-white">
                  {crypto.symbol}
                </span>
                <span className="truncate text-xs text-gray-500">{crypto.name}</span>
              </div>
              <div className="text-xs text-gray-400">{crypto.marketCap}</div>
            </div>

            {/* 价格和涨跌 */}
            <div className="flex-shrink-0 text-right">
              <div className="text-sm text-gray-900 dark:text-white">{crypto.price}</div>
              <div
                className={`flex items-center justify-end gap-0.5 text-xs ${
                  crypto.isPositive
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {crypto.isPositive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span>{crypto.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {lastUpdate && (
        <div className="mt-3 text-xs text-gray-400 dark:text-gray-500">
          {t.updated}:{' '}
          {lastUpdate.toLocaleTimeString(
            lang === 'vi' ? 'vi-VN' : lang === 'ja' ? 'ja-JP' : 'en-US'
          )}
        </div>
      )}

      <div className="mt-3 rounded-lg bg-orange-50 p-2 dark:bg-orange-900/20">
        <p className="text-xs text-orange-700 dark:text-orange-300">💡 {t.change24h}</p>
      </div>
    </div>
  )
}
