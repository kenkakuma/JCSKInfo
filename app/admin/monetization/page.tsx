'use client'

import { DollarSign, TrendingUp, Link as LinkIcon, BarChart3 } from 'lucide-react'

export default function MonetizationPage() {
  return (
    <div className="mx-auto max-w-7xl">
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">盈利管理</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">管理联盟链接和追踪收入数据</p>
      </div>

      {/* 功能卡片 */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* 联盟链接管理 */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/20">
              <LinkIcon className="text-green-600 dark:text-green-400" size={24} />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">联盟链接</h2>
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            管理 Shopee、Amazon、Lazada、Rakuten 等平台的联盟链接
          </p>
          <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <p className="text-sm text-blue-800 dark:text-blue-400">
              💡 提示: 联盟链接功能将在第二阶段实现
            </p>
          </div>
        </div>

        {/* 收入统计 */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/20">
              <TrendingUp className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">收入统计</h2>
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            查看联盟营销收入、点击率和转化数据
          </p>
          <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <p className="text-sm text-blue-800 dark:text-blue-400">
              💡 提示: 统计功能将在第二阶段实现
            </p>
          </div>
        </div>

        {/* AdSense */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900/20">
              <DollarSign className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">AdSense 设置</h2>
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            配置 Google AdSense 广告位和追踪代码
          </p>
          <div className="rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <p className="text-sm text-yellow-800 dark:text-yellow-400">
              ⏳ 待开通: 等待 AdSense 账号审核通过
            </p>
          </div>
        </div>

        {/* 数据分析 */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-full bg-orange-100 p-3 dark:bg-orange-900/20">
              <BarChart3 className="text-orange-600 dark:text-orange-400" size={24} />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">数据分析</h2>
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            深入分析用户行为、流量来源和转化漏斗
          </p>
          <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <p className="text-sm text-blue-800 dark:text-blue-400">
              💡 提示: 分析功能将在第三阶段实现
            </p>
          </div>
        </div>
      </div>

      {/* 当前环境变量配置 */}
      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          环境变量配置
        </h3>
        <div className="space-y-2 text-sm">
          <p className="text-gray-600 dark:text-gray-400">
            请在 <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">.env</code>{' '}
            文件中配置以下变量：
          </p>
          <ul className="ml-4 list-disc space-y-1 text-gray-600 dark:text-gray-400">
            <li>NEXT_PUBLIC_SHOPEE_AFFILIATE_ID</li>
            <li>NEXT_PUBLIC_AMAZON_AFFILIATE_ID</li>
            <li>NEXT_PUBLIC_GA_MEASUREMENT_ID</li>
          </ul>
        </div>
      </div>

      {/* 开发路线图 */}
      <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-900/50 dark:bg-blue-900/20">
        <h3 className="mb-3 font-semibold text-blue-900 dark:text-blue-400">🚀 功能路线图</h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
          <li>
            <strong>第二阶段:</strong>
            <ul className="ml-4 mt-1 list-disc">
              <li>联盟链接管理和追踪</li>
              <li>点击数据统计</li>
              <li>收入报表生成</li>
            </ul>
          </li>
          <li className="mt-2">
            <strong>第三阶段:</strong>
            <ul className="ml-4 mt-1 list-disc">
              <li>高级数据分析</li>
              <li>A/B 测试功能</li>
              <li>自动化推荐</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
}
