/**
 * RSS Feed Sources Configuration
 * JetCode·SKI Content Collector
 *
 * @description Curated list of tech news RSS feeds for multi-language content
 */

export const RSS_FEEDS = {
  // 英语科技新闻源 - Engadget only
  en: [
    {
      url: 'https://www.engadget.com/rss.xml',
      name: 'Engadget',
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
