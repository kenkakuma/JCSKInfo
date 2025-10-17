/**
 * RSS Feed Sources Configuration
 * JetCode·SKI Content Collector
 *
 * @description Curated list of tech news RSS feeds for multi-language content
 */

export const RSS_FEEDS = {
  // 日语科技新闻源
  ja: [
    {
      url: 'https://japan.cnet.com/rss/news/',
      name: 'CNET Japan',
      category: 'tech-news',
      priority: 'high'
    },
    {
      url: 'https://www.gizmodo.jp/index.xml',
      name: 'Gizmodo Japan',
      category: 'tech-gadgets',
      priority: 'medium'
    }
  ],

  // 越南语科技新闻源
  vi: [
    {
      url: 'https://genk.vn/rss/trang-chu.rss',
      name: 'Genk.vn',
      category: 'tech-news',
      priority: 'high'
    }
  ],

  // 英语科技新闻源
  en: [
    {
      url: 'https://techcrunch.com/feed/',
      name: 'TechCrunch',
      category: 'tech-news',
      priority: 'high'
    },
    {
      url: 'https://www.theverge.com/rss/index.xml',
      name: 'The Verge',
      category: 'tech-news',
      priority: 'high'
    }
  ]
};

/**
 * Collector Configuration
 */
export const COLLECTOR_CONFIG = {
  // Maximum articles to collect per feed per run
  maxArticlesPerFeed: 3,

  // Minimum content length (characters) - Lowered for testing
  minContentLength: 100,

  // Maximum title length for slug generation
  maxSlugLength: 60,

  // Draft mode (always true for collected content)
  draftMode: true,

  // Content validation
  validation: {
    requireTitle: true,
    requireContent: true,
    requireDate: true
  }
};

export default { RSS_FEEDS, COLLECTOR_CONFIG };
