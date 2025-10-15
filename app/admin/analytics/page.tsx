'use client'

import { useState, useEffect } from 'react'
import { Activity, Users, Eye, Clock, TrendingUp, Globe, Smartphone, Monitor } from 'lucide-react'

/**
 * Google Analytics 数据展示页面
 *
 * 注意：这是一个前端展示页面
 * 实际的 GA4 数据需要通过 Google Analytics Data API 获取
 * 或者直接嵌入 Google Analytics 仪表板
 */

export default function AnalyticsPage() {
  const [gaConnected, setGaConnected] = useState(false)
  const [adsenseConnected, setAdsenseConnected] = useState(false)

  useEffect(() => {
    // 检查是否配置了 GA 和 AdSense
    setGaConnected(!!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID)
    setAdsenseConnected(!!process.env.NEXT_PUBLIC_ADSENSE_ID)
  }, [])

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">数据分析 & 广告管理</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">查看网站访问数据和广告收益</p>
      </div>

      {/* 配置状态 */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Google Analytics 状态 */}
        <div
          className={`rounded-lg border p-6 ${
            gaConnected
              ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
              : 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Google Analytics 4
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {gaConnected ? '✅ 已配置' : '⚠️ 未配置'}
              </p>
            </div>
            <Activity
              className={`h-8 w-8 ${
                gaConnected
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-yellow-600 dark:text-yellow-400'
              }`}
            />
          </div>
          {!gaConnected && (
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              请在环境变量中配置{' '}
              <code className="rounded bg-gray-200 px-2 py-1 dark:bg-gray-700">
                NEXT_PUBLIC_GA_MEASUREMENT_ID
              </code>
            </div>
          )}
        </div>

        {/* Google AdSense 状态 */}
        <div
          className={`rounded-lg border p-6 ${
            adsenseConnected
              ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
              : 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Google AdSense
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {adsenseConnected ? '✅ 已配置' : '⚠️ 未配置'}
              </p>
            </div>
            <TrendingUp
              className={`h-8 w-8 ${
                adsenseConnected
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-yellow-600 dark:text-yellow-400'
              }`}
            />
          </div>
          {!adsenseConnected && (
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              请在环境变量中配置{' '}
              <code className="rounded bg-gray-200 px-2 py-1 dark:bg-gray-700">
                NEXT_PUBLIC_ADSENSE_ID
              </code>
            </div>
          )}
        </div>
      </div>

      {/* 模拟数据展示 - 实际项目中需要接入 GA4 API */}
      {gaConnected && (
        <>
          {/* 快速统计 */}
          <div className="grid gap-4 md:grid-cols-4">
            <StatCard
              icon={<Users className="h-6 w-6" />}
              title="总访问用户"
              value="12,345"
              change="+12.5%"
              isPositive={true}
            />
            <StatCard
              icon={<Eye className="h-6 w-6" />}
              title="页面浏览量"
              value="45,678"
              change="+8.3%"
              isPositive={true}
            />
            <StatCard
              icon={<Clock className="h-6 w-6" />}
              title="平均停留时间"
              value="2:34"
              change="+5.2%"
              isPositive={true}
            />
            <StatCard
              icon={<TrendingUp className="h-6 w-6" />}
              title="跳出率"
              value="42.3%"
              change="-3.1%"
              isPositive={true}
            />
          </div>

          {/* Google Analytics 嵌入 */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              访问数据详情
            </h2>

            <div className="space-y-4">
              {/* 提示信息 */}
              <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                <p className="font-semibold">💡 如何查看完整数据：</p>
                <ol className="ml-4 mt-2 list-decimal space-y-1">
                  <li>
                    访问{' '}
                    <a
                      href="https://analytics.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      Google Analytics
                    </a>
                  </li>
                  <li>选择您的网站资源</li>
                  <li>查看实时数据和报告</li>
                </ol>
              </div>

              {/* 嵌入 GA Dashboard（可选） */}
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-900">
                <Globe className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                <p className="text-gray-600 dark:text-gray-400">
                  您可以嵌入 Google Analytics 仪表板或通过 API 获取实时数据
                </p>
                <a
                  href="https://analytics.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
                >
                  访问 Google Analytics
                </a>
              </div>

              {/* 设备分布 */}
              <div className="grid gap-4 md:grid-cols-3">
                <DeviceCard
                  icon={<Monitor className="h-8 w-8" />}
                  title="桌面设备"
                  percentage="45.2%"
                  count="5,578"
                />
                <DeviceCard
                  icon={<Smartphone className="h-8 w-8" />}
                  title="移动设备"
                  percentage="48.6%"
                  count="6,012"
                />
                <DeviceCard
                  icon={<Monitor className="h-8 w-8" />}
                  title="平板设备"
                  percentage="6.2%"
                  count="767"
                />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Google AdSense 数据 */}
      {adsenseConnected && (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">广告收益</h2>

          <div className="space-y-4">
            {/* 收益统计 */}
            <div className="grid gap-4 md:grid-cols-3">
              <RevenueCard title="今日收益" value="$12.34" change="+15.2%" />
              <RevenueCard title="本月收益" value="$345.67" change="+8.9%" />
              <RevenueCard title="总收益" value="$2,345.89" change="+12.5%" />
            </div>

            {/* 提示信息 */}
            <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
              <p className="font-semibold">💡 如何查看完整收益数据：</p>
              <ol className="ml-4 mt-2 list-decimal space-y-1">
                <li>
                  访问{' '}
                  <a
                    href="https://www.google.com/adsense"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Google AdSense
                  </a>
                </li>
                <li>查看报告和收益详情</li>
                <li>设置付款信息</li>
              </ol>
            </div>

            {/* AdSense 链接 */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-900">
              <TrendingUp className="mx-auto mb-4 h-16 w-16 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400">
                访问 Google AdSense 查看详细的广告效果和收益数据
              </p>
              <a
                href="https://www.google.com/adsense"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block rounded-lg bg-green-600 px-6 py-2 text-white transition-colors hover:bg-green-700"
              >
                访问 Google AdSense
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 配置指南 */}
      {(!gaConnected || !adsenseConnected) && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/20">
          <h2 className="mb-4 text-xl font-semibold text-blue-900 dark:text-blue-100">
            📖 配置指南
          </h2>

          <div className="space-y-4 text-sm text-blue-800 dark:text-blue-200">
            {!gaConnected && (
              <div>
                <h3 className="font-semibold">Google Analytics 4 配置：</h3>
                <ol className="ml-4 mt-2 list-decimal space-y-1">
                  <li>
                    访问{' '}
                    <a
                      href="https://analytics.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      Google Analytics
                    </a>
                  </li>
                  <li>创建新的 GA4 资源</li>
                  <li>获取衡量ID（格式：G-XXXXXXXXXX）</li>
                  <li>
                    在{' '}
                    <code className="rounded bg-blue-100 px-2 py-1 dark:bg-blue-800">
                      .env.local
                    </code>{' '}
                    中设置 <code>NEXT_PUBLIC_GA_MEASUREMENT_ID</code>
                  </li>
                  <li>重启开发服务器</li>
                </ol>
              </div>
            )}

            {!adsenseConnected && (
              <div>
                <h3 className="font-semibold">Google AdSense 配置：</h3>
                <ol className="ml-4 mt-2 list-decimal space-y-1">
                  <li>
                    访问{' '}
                    <a
                      href="https://www.google.com/adsense"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      Google AdSense
                    </a>
                  </li>
                  <li>注册或登录您的账号</li>
                  <li>添加您的网站并等待审核</li>
                  <li>获取发布商ID（格式：ca-pub-XXXXXXXXXXXXXXXX）</li>
                  <li>
                    在{' '}
                    <code className="rounded bg-blue-100 px-2 py-1 dark:bg-blue-800">
                      .env.local
                    </code>{' '}
                    中设置 <code>NEXT_PUBLIC_ADSENSE_ID</code>
                  </li>
                  <li>重启开发服务器</li>
                </ol>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// 统计卡片组件
function StatCard({
  icon,
  title,
  value,
  change,
  isPositive,
}: {
  icon: React.ReactNode
  title: string
  value: string
  change: string
  isPositive: boolean
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <div className="rounded-lg bg-blue-50 p-3 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
          {icon}
        </div>
        <span
          className={`text-sm font-semibold ${
            isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}
        >
          {change}
        </span>
      </div>
      <h3 className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-400">{title}</h3>
      <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
  )
}

// 设备卡片组件
function DeviceCard({
  icon,
  title,
  percentage,
  count,
}: {
  icon: React.ReactNode
  title: string
  percentage: string
  count: string
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center gap-3">
        <div className="text-gray-400">{icon}</div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{percentage}</p>
          <p className="text-xs text-gray-500 dark:text-gray-500">{count} 访问</p>
        </div>
      </div>
    </div>
  )
}

// 收益卡片组件
function RevenueCard({ title, value, change }: { title: string; value: string; change: string }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
      <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
      <p className="mt-1 text-sm font-semibold text-green-600 dark:text-green-400">{change}</p>
    </div>
  )
}
