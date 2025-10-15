import { languages, Language } from '@/config/site'

export const ADMIN_CONFIG = {
  // 功能开关
  features: {
    posts: true, // 文章管理（第一阶段）
    media: false, // 图片管理（第二阶段）
    automation: false, // 自动化（第三阶段）
    analytics: true, // 数据分析（GA4 + AdSense）
    monetization: {
      enabled: true, // 盈利功能
      affiliate: true, // 联盟链接
      adsense: true, // AdSense（已集成）
    },
  },

  // 文章配置
  posts: {
    languages: languages as readonly string[],
    defaultLanguage: 'ja' as Language,
    autoSave: true,
    autoSaveInterval: 30000, // 30秒
    contentPath: './content/posts', // MDX 文件存储路径
  },

  // 认证配置
  auth: {
    sessionDuration: 24 * 60 * 60 * 1000, // 24小时（毫秒）
    cookieName: 'admin_token',
  },

  // 图床配置（预留）
  imageHosts: [
    { name: 'Unsplash', url: 'https://images.unsplash.com/' },
    { name: 'Imgur', url: 'https://i.imgur.com/' },
    { name: 'Custom', url: '' },
  ],
} as const

// 后台导航菜单配置
export const ADMIN_MENU = [
  {
    id: 'dashboard',
    label: '仪表板',
    icon: 'LayoutDashboard',
    href: '/admin',
    enabled: true,
  },
  {
    id: 'posts',
    label: '文章管理',
    icon: 'FileText',
    href: '/admin/posts',
    enabled: ADMIN_CONFIG.features.posts,
  },
  {
    id: 'analytics',
    label: '数据分析',
    icon: 'Activity',
    href: '/admin/analytics',
    enabled: ADMIN_CONFIG.features.analytics,
  },
  {
    id: 'media',
    label: '图片管理',
    icon: 'Image',
    href: '/admin/media',
    enabled: ADMIN_CONFIG.features.media,
    badge: '即将上线',
  },
  {
    id: 'automation',
    label: '自动化',
    icon: 'Bot',
    href: '/admin/automation',
    enabled: ADMIN_CONFIG.features.automation,
    badge: '即将上线',
  },
  {
    id: 'monetization',
    label: '盈利管理',
    icon: 'DollarSign',
    href: '/admin/monetization',
    enabled: ADMIN_CONFIG.features.monetization.enabled,
  },
] as const
