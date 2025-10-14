export const widgetTranslations = {
  vi: {
    // Weather Widget
    weather: {
      loading: 'Đang tải...',
      error: 'Không thể lấy dữ liệu thời tiết.',
      retry: 'Vui lòng kiểm tra quyền vị trí hoặc thử lại sau.',
      today: 'Hôm nay',
      tomorrow: 'Ngày mai',
      days: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    },
    // Stock Widget
    stock: {
      marketOutlook: 'Triển vọng thị trường',
      popularCompanies: 'Công ty phổ biến',
      refresh: 'Cập nhật',
      error: 'Không thể lấy thông tin cổ phiếu',
      retry: 'Thử lại',
    },
    // Crypto Widget
    crypto: {
      title: 'Tiền mã hóa',
      refresh: 'Cập nhật',
      error: 'Không thể lấy thông tin tiền mã hóa',
      retry: 'Thử lại',
      change24h: 'Biến động 24h | CoinGecko',
      updated: 'Cập nhật',
    },
    // Trending Posts
    trending: {
      title: 'Tin tức phổ biến Top 10',
      noData: 'Chưa có tin tức phổ biến',
      likes: 'thích',
    },
  },
  ja: {
    // Weather Widget
    weather: {
      loading: '読み込み中...',
      error: '天気データを取得できませんでした。',
      retry: '位置情報の権限を確認するか、後でもう一度お試しください。',
      today: '今日',
      tomorrow: '明日',
      days: ['日', '月', '火', '水', '木', '金', '土'],
    },
    // Stock Widget
    stock: {
      marketOutlook: '市場前景',
      popularCompanies: '人気銘柄',
      refresh: '更新',
      error: '株価情報を取得できませんでした',
      retry: '再試行',
    },
    // Crypto Widget
    crypto: {
      title: '暗号資産',
      refresh: '更新',
      error: '暗号資産情報を取得できませんでした',
      retry: '再試行',
      change24h: '24時間変動率 | CoinGecko提供',
      updated: '更新',
    },
    // Trending Posts
    trending: {
      title: '人気記事 Top 10',
      noData: 'まだ人気記事がありません',
      likes: 'いいね',
    },
  },
  en: {
    // Weather Widget
    weather: {
      loading: 'Loading...',
      error: 'Unable to fetch weather data.',
      retry: 'Please check location permission or try again later.',
      today: 'Today',
      tomorrow: 'Tomorrow',
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    },
    // Stock Widget
    stock: {
      marketOutlook: 'Market Outlook',
      popularCompanies: 'Popular Companies',
      refresh: 'Refresh',
      error: 'Unable to fetch stock information',
      retry: 'Retry',
    },
    // Crypto Widget
    crypto: {
      title: 'Cryptocurrency',
      refresh: 'Refresh',
      error: 'Unable to fetch cryptocurrency data',
      retry: 'Retry',
      change24h: '24h Change | CoinGecko',
      updated: 'Updated',
    },
    // Trending Posts
    trending: {
      title: 'Trending News Top 10',
      noData: 'No trending news yet',
      likes: 'likes',
    },
  },
}

export type WidgetLang = 'vi' | 'ja' | 'en'

export function getWidgetTranslation(lang: WidgetLang = 'ja') {
  return widgetTranslations[lang] || widgetTranslations.ja
}
