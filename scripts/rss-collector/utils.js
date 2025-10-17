/**
 * Utility Functions for RSS Collector
 * JetCode·SKI
 */

import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';
import TurndownService from 'turndown';

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
});

/**
 * Generate URL-friendly slug from title
 * @param {string} title - Article title
 * @param {number} maxLength - Maximum slug length
 * @returns {string} URL-friendly slug
 */
export function generateSlug(title, maxLength = 60) {
  return title
    .toLowerCase()
    // Remove special characters but keep CJK characters
    .replace(/[^\w\s\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf-]/g, '')
    // Replace spaces with hyphens
    .replace(/\s+/g, '-')
    // Remove multiple consecutive hyphens
    .replace(/-+/g, '-')
    // Trim hyphens from start and end
    .replace(/^-+|-+$/g, '')
    // Limit length
    .substring(0, maxLength);
}

/**
 * Generate content hash for duplicate detection
 * @param {string} title - Article title
 * @param {string} content - Article content
 * @returns {string} MD5 hash
 */
export function generateContentHash(title, content) {
  const text = (title + content.substring(0, 500)).toLowerCase();
  return crypto.createHash('md5').update(text).digest('hex');
}

/**
 * Check if file exists
 * @param {string} filePath - Path to file
 * @returns {Promise<boolean>}
 */
export async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Extract summary from content
 * @param {string} content - Full content
 * @param {number} maxLength - Maximum summary length
 * @returns {string} Summary text
 */
export function extractSummary(content, maxLength = 160) {
  // Remove HTML tags
  const text = content.replace(/<[^>]*>/g, '');
  // Remove extra whitespace
  const cleaned = text.replace(/\s+/g, ' ').trim();
  // Truncate and add ellipsis
  return cleaned.length > maxLength
    ? cleaned.substring(0, maxLength).trim() + '...'
    : cleaned;
}

/**
 * Extract first image URL from content
 * @param {string} content - HTML content
 * @returns {string|null} Image URL or null
 */
export function extractFirstImage(content) {
  if (!content) return null;

  // Try to find img tag
  const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch) return imgMatch[1];

  // Try to find markdown image
  const mdImgMatch = content.match(/!\[.*?\]\(([^)]+)\)/);
  if (mdImgMatch) return mdImgMatch[1];

  return null;
}

/**
 * Clean and format HTML content to Markdown
 * @param {string} html - HTML content
 * @returns {string} Markdown content
 */
export function htmlToMarkdown(html) {
  if (!html) return '';

  try {
    // Convert HTML to Markdown
    let markdown = turndownService.turndown(html);

    // Clean up extra newlines
    markdown = markdown.replace(/\n{3,}/g, '\n\n');

    return markdown.trim();
  } catch (error) {
    console.error('Error converting HTML to Markdown:', error.message);
    // Fallback: strip HTML tags
    return html.replace(/<[^>]*>/g, '').trim();
  }
}

/**
 * Extract and clean tags from RSS item
 * @param {Object} item - RSS item
 * @param {number} maxTags - Maximum number of tags
 * @returns {string[]} Array of tags
 */
export function extractTags(item, maxTags = 5) {
  const tags = [];

  // From RSS categories
  if (item.categories && Array.isArray(item.categories)) {
    tags.push(...item.categories);
  }

  // Clean and deduplicate
  const cleaned = [...new Set(tags)]
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0 && tag.length < 30)
    .slice(0, maxTags);

  return cleaned;
}

/**
 * Validate article content quality
 * @param {Object} article - Article object
 * @param {Object} config - Validation config
 * @returns {boolean} Is valid
 */
export function validateContent(article, config) {
  const { requireTitle, requireContent, requireDate } = config;

  if (requireTitle && !article.title) {
    return false;
  }

  if (requireContent && (!article.body || article.body.length < 100)) {
    return false;
  }

  if (requireDate && !article.date) {
    return false;
  }

  return true;
}

/**
 * Format date to ISO string
 * @param {Date|string} date - Date object or string
 * @returns {string} ISO date string
 */
export function formatDate(date) {
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
      return new Date().toISOString();
    }
    return d.toISOString();
  } catch {
    return new Date().toISOString();
  }
}

/**
 * Load collected hashes for duplicate detection
 * @param {string} hashFile - Path to hash file
 * @returns {Promise<Set>} Set of collected hashes
 */
export async function loadCollectedHashes(hashFile) {
  try {
    const content = await fs.readFile(hashFile, 'utf-8');
    return new Set(JSON.parse(content));
  } catch {
    return new Set();
  }
}

/**
 * Save collected hashes
 * @param {string} hashFile - Path to hash file
 * @param {Set} hashes - Set of hashes
 * @returns {Promise<void>}
 */
export async function saveCollectedHashes(hashFile, hashes) {
  const dir = path.dirname(hashFile);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(hashFile, JSON.stringify([...hashes], null, 2));
}

export default {
  generateSlug,
  generateContentHash,
  fileExists,
  extractSummary,
  extractFirstImage,
  htmlToMarkdown,
  extractTags,
  validateContent,
  formatDate,
  loadCollectedHashes,
  saveCollectedHashes
};
