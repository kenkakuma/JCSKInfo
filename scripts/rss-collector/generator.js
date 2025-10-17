/**
 * MDX Generator Module
 * JetCode·SKI Content Collector
 */

import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileExists, validateContent } from './utils.js';

/**
 * Generate MDX file from article
 * @param {Object} article - Article object
 * @returns {string} MDX content with frontmatter
 */
export function generateMDX(article) {
  // Prepare frontmatter data
  const frontmatter = {
    title: article.title,
    date: article.date,
    lang: article.lang,
    translationKey: article.translationKey,
    tags: article.tags || [],
    summary: article.summary,
    draft: article.draft,
  };

  // Add optional fields
  if (article.image) {
    frontmatter.image = article.image;
  }

  if (article.sourceUrl) {
    frontmatter.sourceUrl = article.sourceUrl;
  }

  if (article.sourceName) {
    frontmatter.sourceName = article.sourceName;
  }

  if (article.collectedAt) {
    frontmatter.collectedAt = article.collectedAt;
  }

  // Generate MDX content
  const mdxContent = matter.stringify(article.body, frontmatter);

  return mdxContent;
}

/**
 * Get file path for article
 * @param {Object} article - Article object
 * @param {string} contentDir - Content directory base path
 * @returns {string} Full file path
 */
export function getArticleFilePath(article) {
  // Get the project root (2 levels up from scripts/rss-collector)
  const projectRoot = path.resolve(process.cwd());
  const contentDir = path.join(projectRoot, 'content', 'posts', article.lang);
  const fileName = `${article.translationKey}.mdx`;

  return path.join(contentDir, fileName);
}

/**
 * Save article as MDX file
 * @param {Object} article - Article object
 * @param {Object} config - Validation config
 * @returns {Promise<Object>} Result object
 */
export async function saveArticle(article, config = {}) {
  // Validate content
  if (!validateContent(article, config)) {
    return {
      success: false,
      reason: 'validation_failed',
      article: article.title
    };
  }

  const filePath = getArticleFilePath(article);

  // Check if already exists
  if (await fileExists(filePath)) {
    return {
      success: false,
      reason: 'already_exists',
      article: article.title
    };
  }

  try {
    // Ensure directory exists
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });

    // Generate and write MDX
    const mdxContent = generateMDX(article);
    await fs.writeFile(filePath, mdxContent, 'utf-8');

    console.log(`✅ Saved: ${article.lang}/${article.translationKey}.mdx`);

    return {
      success: true,
      article: article.title,
      filePath
    };
  } catch (error) {
    console.error(`❌ Error saving ${article.title}:`, error.message);
    console.error(`   File path: ${filePath}`);
    console.error(`   Stack:`, error.stack);
    return {
      success: false,
      reason: 'write_error',
      article: article.title,
      error: error.message
    };
  }
}

/**
 * Batch save articles
 * @param {Array} articles - Array of article objects
 * @param {Object} config - Validation config
 * @returns {Promise<Object>} Statistics object
 */
export async function saveArticles(articles, config = {}) {
  const results = {
    total: articles.length,
    saved: 0,
    skipped: 0,
    failed: 0,
    details: []
  };

  for (const article of articles) {
    const result = await saveArticle(article, config);
    results.details.push(result);

    if (result.success) {
      results.saved++;
    } else if (result.reason === 'already_exists') {
      results.skipped++;
    } else {
      results.failed++;
    }
  }

  return results;
}

export default {
  generateMDX,
  getArticleFilePath,
  saveArticle,
  saveArticles
};
