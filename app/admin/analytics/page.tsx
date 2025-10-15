'use client'

import { useState, useEffect } from 'react'
import { Activity, TrendingUp, Globe } from 'lucide-react'

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

      {/* Google Analytics 快捷访问 */}
      {gaConnected && (
        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="text-center">
            <Activity className="mx-auto mb-4 h-16 w-16 text-blue-600 dark:text-blue-400" />
            <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-white">
              Google Analytics 4
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              查看网站的实时访问数据、流量来源、用户行为等详细分析
            </p>
            <a
              href="https://analytics.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-3 text-lg font-medium text-white transition-colors hover:bg-blue-700"
            >
              <Globe className="h-5 w-5" />
              访问 Google Analytics 控制台
            </a>
            <div className="mt-6 grid gap-4 text-left md:grid-cols-2">
              <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                <h3 className="mb-2 font-semibold text-blue-900 dark:text-blue-100">
                  📊 实时数据
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  查看当前访问者、实时页面浏览、活跃用户等
                </p>
              </div>
              <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                <h3 className="mb-2 font-semibold text-blue-900 dark:text-blue-100">
                  📈 流量分析
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  分析流量来源、用户获取渠道、转化路径
                </p>
              </div>
              <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                <h3 className="mb-2 font-semibold text-blue-900 dark:text-blue-100">
                  👥 用户行为
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  了解用户参与度、停留时间、跳出率等指标
                </p>
              </div>
              <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                <h3 className="mb-2 font-semibold text-blue-900 dark:text-blue-100">
                  📱 设备分析
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  查看访问设备分布、浏览器、操作系统等
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Google AdSense 快捷访问 */}
      {adsenseConnected && (
        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="text-center">
            <TrendingUp className="mx-auto mb-4 h-16 w-16 text-green-600 dark:text-green-400" />
            <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-white">
              Google AdSense
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              查看广告收益、广告效果、优化建议等详细数据
            </p>
            <a
              href="https://www.google.com/adsense"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-8 py-3 text-lg font-medium text-white transition-colors hover:bg-green-700"
            >
              <TrendingUp className="h-5 w-5" />
              访问 Google AdSense 控制台
            </a>
            <div className="mt-6 grid gap-4 text-left md:grid-cols-2">
              <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                <h3 className="mb-2 font-semibold text-green-900 dark:text-green-100">
                  💰 收益报告
                </h3>
                <p className="text-sm text-green-800 dark:text-green-200">
                  查看今日、本月、总收益等详细财务数据
                </p>
              </div>
              <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                <h3 className="mb-2 font-semibold text-green-900 dark:text-green-100">
                  📊 广告效果
                </h3>
                <p className="text-sm text-green-800 dark:text-green-200">
                  分析广告点击率、展示次数、每千次展示收益
                </p>
              </div>
              <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                <h3 className="mb-2 font-semibold text-green-900 dark:text-green-100">
                  🎯 优化建议
                </h3>
                <p className="text-sm text-green-800 dark:text-green-200">
                  获取广告位优化建议，提高广告收益
                </p>
              </div>
              <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                <h3 className="mb-2 font-semibold text-green-900 dark:text-green-100">
                  ⚙️ 广告管理
                </h3>
                <p className="text-sm text-green-800 dark:text-green-200">
                  管理广告单元、广告样式、屏蔽控制等
                </p>
              </div>
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

