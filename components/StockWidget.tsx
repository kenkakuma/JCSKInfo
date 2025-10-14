'use client'

import { TrendingUp, TrendingDown, Loader2, RefreshCw, LineChart, Building2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getWidgetTranslation, type WidgetLang } from '@/lib/widget-translations'

interface StockData {
  symbol: string
  name: string
  price: string
  change: string
  changePercent: string
  isPositive: boolean
}

interface StockWidgetProps {
  lang?: WidgetLang
}

export default function StockWidget({ lang = 'ja' }: StockWidgetProps) {
  const t = getWidgetTranslation(lang).stock
  const [marketIndices, setMarketIndices] = useState<StockData[]>([])
  const [companies, setCompanies] = useState<StockData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  useEffect(() => {
    fetchStockData()
    // 每10分钟更新一次，避免API限流
    const interval = setInterval(fetchStockData, 10 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const fetchStockData = async () => {
    try {
      setLoading(true)
      setError(false)

      // 使用免费的Finnhub API (需要注册获取免费key)
      // 或使用模拟数据作为备用
      const USE_REAL_API = false // 设置为true使用真实API

      if (USE_REAL_API) {
        // TODO: 替换为你的Finnhub API key
        const FINNHUB_API_KEY = 'your_api_key_here'

        // 使用Finnhub API获取实时数据
        const fetchFinnhubQuote = async (symbol: string) => {
          const response = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
          )
          return await response.json()
        }

        // 获取股票数据...
      } else {
        // 使用模拟实时数据（带随机波动）
        const generateRealtimeData = () => {
          const baseData = {
            indices: [
              { symbol: '日経平均', name: '日経平均', basePrice: 38000, basePct: 0.5 },
              { symbol: '上証指数', name: '上証指数', basePrice: 3200, basePct: 0.3 },
              { symbol: 'ハンセン', name: 'ハンセン指数', basePrice: 18000, basePct: -0.2 },
              { symbol: 'S&P 500', name: 'S&P 500', basePrice: 5100, basePct: 0.3 },
              { symbol: 'NASDAQ', name: 'NASDAQ', basePrice: 16000, basePct: 0.4 },
            ],
            companies: [
              { symbol: 'AAPL', name: 'Apple', basePrice: 178.5, basePct: 0.8 },
              { symbol: 'MSFT', name: 'Microsoft', basePrice: 425.3, basePct: 0.6 },
              { symbol: 'GOOGL', name: 'Google', basePrice: 142.8, basePct: -0.3 },
              { symbol: 'TSLA', name: 'Tesla', basePrice: 245.6, basePct: 1.2 },
              { symbol: 'NVDA', name: 'NVIDIA', basePrice: 890.4, basePct: 1.5 },
            ],
          }

          // 添加小幅随机波动（±0.5%）
          const addVariation = (base: number, basePct: number) => {
            const variation = (Math.random() - 0.5) * 0.5
            const pct = basePct + variation
            const price = base * (1 + pct / 100)
            const change = price - base
            return {
              price,
              change,
              changePercent: pct,
              isPositive: change >= 0,
            }
          }

          const indices = baseData.indices.map((item) => {
            const data = addVariation(item.basePrice, item.basePct)
            return {
              symbol: item.symbol,
              name: item.name,
              price: data.price.toLocaleString('ja-JP', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }),
              change: data.change >= 0 ? `+${data.change.toFixed(2)}` : data.change.toFixed(2),
              changePercent:
                data.changePercent >= 0
                  ? `+${data.changePercent.toFixed(2)}%`
                  : `${data.changePercent.toFixed(2)}%`,
              isPositive: data.isPositive,
            }
          })

          const companies = baseData.companies.map((item) => {
            const data = addVariation(item.basePrice, item.basePct)
            return {
              symbol: item.symbol,
              name: item.name,
              price: `$${data.price.toFixed(2)}`,
              change:
                data.changePercent >= 0
                  ? `+${data.changePercent.toFixed(2)}%`
                  : `${data.changePercent.toFixed(2)}%`,
              changePercent: '',
              isPositive: data.isPositive,
            }
          })

          return { indices, companies }
        }

        const data = generateRealtimeData()
        setMarketIndices(data.indices)
        setCompanies(data.companies)
        setLastUpdate(new Date())
      }
    } catch (err) {
      console.error('Stock fetch error:', err)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = () => {
    fetchStockData()
  }

  if (loading && marketIndices.length === 0) {
    return (
      <div className="space-y-4">
        <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-900">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
          </div>
        </div>
      </div>
    )
  }

  if (error && marketIndices.length === 0) {
    return (
      <div className="space-y-4">
        <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-900">
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">{t.error}</p>
            <button
              onClick={handleRefresh}
              className="mt-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              {t.retry}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* 市场指数 */}
      {marketIndices.length > 0 && (
        <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-900">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LineChart className="h-4 w-4 text-blue-500" />
              <h3 className="text-sm text-gray-500 dark:text-gray-400">{t.marketOutlook}</h3>
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
          <div className="space-y-4">
            {marketIndices.map((stock, index) => (
              <div key={index} className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-0.5 text-base text-gray-900 dark:text-white">
                    {stock.symbol}
                  </div>
                  <div className="text-xs text-gray-500">{stock.name}</div>
                </div>
                <div className="text-right">
                  <div className="mb-0.5 text-base text-gray-900 dark:text-white">
                    {stock.price}
                  </div>
                  <div
                    className={`flex items-center justify-end gap-1 text-xs ${
                      stock.isPositive
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {stock.isPositive ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    <span>{stock.changePercent}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {lastUpdate && (
            <div className="mt-3 text-xs text-gray-400 dark:text-gray-500">
              更新: {lastUpdate.toLocaleTimeString('ja-JP')}
            </div>
          )}
        </div>
      )}

      {/* 热门公司 */}
      {companies.length > 0 && (
        <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-900">
          <div className="mb-4 flex items-center gap-2">
            <Building2 className="h-4 w-4 text-purple-500" />
            <h3 className="text-sm text-gray-500 dark:text-gray-400">{t.popularCompanies}</h3>
          </div>
          <div className="space-y-3.5">
            {companies.map((company, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                  {company.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm text-gray-900 dark:text-white">
                    {company.symbol}
                  </div>
                  <div className="truncate text-xs text-gray-500">{company.name}</div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="text-sm text-gray-900 dark:text-white">{company.price}</div>
                  <div
                    className={`text-xs ${
                      company.isPositive
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {company.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
