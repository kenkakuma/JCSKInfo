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
import { downloadImage } from './image-downloader.js';
import { uploadToCloudinary } from './cloudinary-uploader.js';

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
 * Process image: download and upload to Cloudinary
 * @param {string} imageUrl - Original image URL
 * @param {string} articleSlug - Article slug for naming
 * @returns {Promise<string|null>} Cloudinary URL or null
 */
async function processImage(imageUrl, articleSlug) {
  if (!imageUrl) {
    console.log('  ⚠ No image found');
    return null;
  }

  try {
    console.log(`  📸 Processing image...`);

    // Step 1: Download image
    const downloadResult = await downloadImage(imageUrl);

    if (!downloadResult.success) {
      console.log(`  ✗ Download failed: ${downloadResult.error}`);
      return null;
    }

    // Step 2: Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(downloadResult.filePath, {
      public_id: `${articleSlug}-featured`
    });

    if (!uploadResult.success) {
      console.log(`  ✗ Upload failed: ${uploadResult.error}`);
      return null;
    }

    console.log(`  ✓ Image uploaded to Cloudinary`);
    return uploadResult.url;

  } catch (error) {
    console.error(`  ✗ Image processing error: ${error.message}`);
    return null;
  }
}

/**
 * Transform RSS item to article object with image processing
 * @param {Object} item - RSS item
 * @param {string} lang - Language code
 * @param {string} sourceName - Source feed name
 * @param {boolean} processImages - Whether to download and upload images to Cloudinary
 * @returns {Promise<Object>} Article object
 */
export async function transformToArticle(item, lang, sourceName, processImages = true) {
  const content = extractContent(item);
  const title = item.title?.trim() || 'Untitled';
  const translationKey = generateSlug(title);

  // Extract original image URL
  const originalImageUrl = extractImage(item);

  // Process image if enabled
  let imageUrl = originalImageUrl;
  if (processImages && originalImageUrl) {
    const cloudinaryUrl = await processImage(originalImageUrl, translationKey);
    if (cloudinaryUrl) {
      imageUrl = cloudinaryUrl;
    }
  }

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
    image: imageUrl,

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
 * @param {boolean} processImages - Whether to download and upload images
 * @returns {Promise<Array>} Array of articles
 */
export async function parseFeeds(feeds, lang, maxPerFeed = 3, processImages = true) {
  const allArticles = [];

  for (const feedConfig of feeds) {
    const items = await parseFeed(feedConfig.url, feedConfig.name);

    // Transform items to articles (limit per feed)
    // Process sequentially to avoid overwhelming Cloudinary API
    for (const item of items.slice(0, maxPerFeed)) {
      const article = await transformToArticle(item, lang, feedConfig.name, processImages);
      allArticles.push(article);
    }
  }

  console.log(`📝 Parsed ${allArticles.length} articles for language: ${lang}`);
  return allArticles;
}

export default {
  parseFeed,
  parseFeeds,
  transformToArticle
};
