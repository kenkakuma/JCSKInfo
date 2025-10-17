/**
 * RSS Parser Module
 * JetCode·SKI Content Collector
 */

import Parser from 'rss-parser';
import {
  generateSlug,
  generateContentHash,
  extractSummary,
  extractFirstImage,
  htmlToMarkdown,
  extractTags,
  formatDate
} from './utils.js';

const parser = new Parser({
  customFields: {
    item: [
      ['content:encoded', 'contentEncoded'],
      ['description', 'description'],
      ['media:content', 'mediaContent'],
      ['enclosure', 'enclosure']
    ]
  },
  timeout: 10000 // 10 second timeout
});

/**
 * Parse single RSS feed
 * @param {string} feedUrl - RSS feed URL
 * @param {string} feedName - Feed name for logging
 * @returns {Promise<Array>} Array of parsed articles
 */
export async function parseFeed(feedUrl, feedName = 'Unknown') {
  try {
    console.log(`📡 Fetching feed: ${feedName}`);
    const feed = await parser.parseURL(feedUrl);

    console.log(`✅ Found ${feed.items.length} items in ${feedName}`);
    return feed.items;
  } catch (error) {
    console.error(`❌ Error parsing ${feedName}:`, error.message);
    return [];
  }
}

/**
 * Extract content from RSS item (try multiple sources)
 * @param {Object} item - RSS item
 * @returns {string} Content in Markdown format
 */
function extractContent(item) {
  // Priority order: contentEncoded > content > description
  let htmlContent = item.contentEncoded || item.content || item.description || '';

  // Convert HTML to Markdown
  const markdown = htmlToMarkdown(htmlContent);

  return markdown;
}

/**
 * Extract image from RSS item
 * @param {Object} item - RSS item
 * @returns {string|null} Image URL
 */
function extractImage(item) {
  // Try enclosure
  if (item.enclosure && item.enclosure.url) {
    return item.enclosure.url;
  }

  // Try media:content
  if (item.mediaContent && item.mediaContent.url) {
    return item.mediaContent.url;
  }

  // Try content
  const content = item.contentEncoded || item.content || item.description || '';
  return extractFirstImage(content);
}

/**
 * Transform RSS item to article object
 * @param {Object} item - RSS item
 * @param {string} lang - Language code
 * @param {string} sourceName - Source feed name
 * @returns {Object} Article object
 */
export function transformToArticle(item, lang, sourceName) {
  const content = extractContent(item);
  const title = item.title?.trim() || 'Untitled';
  const translationKey = generateSlug(title);

  const article = {
    // Required fields
    title,
    date: formatDate(item.pubDate || item.isoDate || new Date()),
    lang,
    translationKey,

    // Content
    summary: extractSummary(content),
    body: content,

    // Optional fields
    tags: extractTags(item),
    image: extractImage(item),

    // Metadata
    sourceUrl: item.link || '',
    sourceName,
    collectedAt: new Date().toISOString(),

    // Always draft for manual review
    draft: true,

    // Hash for duplicate detection
    _hash: generateContentHash(title, content)
  };

  return article;
}

/**
 * Parse multiple feeds for a language
 * @param {Array} feeds - Array of feed configs
 * @param {string} lang - Language code
 * @param {number} maxPerFeed - Maximum articles per feed
 * @returns {Promise<Array>} Array of articles
 */
export async function parseFeeds(feeds, lang, maxPerFeed = 3) {
  const allArticles = [];

  for (const feedConfig of feeds) {
    const items = await parseFeed(feedConfig.url, feedConfig.name);

    // Transform items to articles (limit per feed)
    const articles = items
      .slice(0, maxPerFeed)
      .map(item => transformToArticle(item, lang, feedConfig.name));

    allArticles.push(...articles);
  }

  console.log(`📝 Parsed ${allArticles.length} articles for language: ${lang}`);
  return allArticles;
}

export default {
  parseFeed,
  parseFeeds,
  transformToArticle
};
