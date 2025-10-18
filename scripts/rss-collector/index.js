#!/usr/bin/env node

/**
 * RSS Content Collector - Main Entry Point
 * JetCode·SKI Blog Automation
 *
 * @description Collects tech news from RSS feeds and generates MDX drafts
 * @author JetCode·SKI Team
 * @version 1.0.0
 */

import { parseFeeds } from './parser.js';
import { saveArticles } from './generator.js';
import { loadCollectedHashes, saveCollectedHashes } from './utils.js';
import { RSS_FEEDS, COLLECTOR_CONFIG } from './feeds.config.js';
import { cleanupTempImages } from './image-downloader.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Hash file for duplicate detection
const HASH_FILE = path.join(__dirname, '.collected-hashes.json');

/**
 * Filter out duplicate articles based on content hash
 * @param {Array} articles - Array of articles
 * @param {Set} collectedHashes - Set of previously collected hashes
 * @returns {Array} Filtered articles
 */
function filterDuplicates(articles, collectedHashes) {
  const unique = [];
  const newHashes = new Set();

  for (const article of articles) {
    if (!collectedHashes.has(article._hash)) {
      unique.push(article);
      newHashes.add(article._hash);
    }
  }

  return { unique, newHashes };
}

/**
 * Collect content for a single language
 * @param {string} lang - Language code
 * @param {Set} collectedHashes - Set of collected hashes
 * @returns {Promise<Object>} Collection results
 */
async function collectLanguage(lang, collectedHashes) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📚 Collecting content for: ${lang.toUpperCase()}`);
  console.log(`${'='.repeat(60)}\n`);

  const feeds = RSS_FEEDS[lang];
  if (!feeds || feeds.length === 0) {
    console.log(`⚠️  No feeds configured for ${lang}`);
    return { saved: 0, skipped: 0, failed: 0 };
  }

  // Parse RSS feeds (with image processing enabled)
  const articles = await parseFeeds(
    feeds,
    lang,
    COLLECTOR_CONFIG.maxArticlesPerFeed,
    true // Enable automatic image download & Cloudinary upload
  );

  if (articles.length === 0) {
    console.log(`⚠️  No articles found for ${lang}`);
    return { saved: 0, skipped: 0, failed: 0 };
  }

  // Filter duplicates
  const { unique, newHashes } = filterDuplicates(articles, collectedHashes);

  console.log(`🔍 Duplicate check: ${articles.length} total, ${unique.length} unique`);

  if (unique.length === 0) {
    console.log(`ℹ️  All articles already collected for ${lang}`);
    return { saved: 0, skipped: articles.length, failed: 0 };
  }

  // Save articles
  const results = await saveArticles(unique, COLLECTOR_CONFIG.validation);

  // Update collected hashes
  for (const hash of newHashes) {
    collectedHashes.add(hash);
  }

  return results;
}

/**
 * Main collection function
 */
async function main() {
  console.log('\n🚀 JetCode·SKI RSS Content Collector');
  console.log(`⏰ Started at: ${new Date().toLocaleString()}\n`);

  try {
    // Load collected hashes for duplicate detection
    const collectedHashes = await loadCollectedHashes(HASH_FILE);
    console.log(`📦 Loaded ${collectedHashes.size} collected article hashes\n`);

    // Collect content for all configured languages
    const languages = Object.keys(RSS_FEEDS);
    const allResults = {
      total: 0,
      saved: 0,
      skipped: 0,
      failed: 0,
      byLanguage: {}
    };

    for (const lang of languages) {
      const results = await collectLanguage(lang, collectedHashes);
      allResults.byLanguage[lang] = results;
      allResults.total += results.total || 0;
      allResults.saved += results.saved;
      allResults.skipped += results.skipped;
      allResults.failed += results.failed;
    }

    // Save updated hashes
    await saveCollectedHashes(HASH_FILE, collectedHashes);

    // Print summary
    console.log(`\n${'='.repeat(60)}`);
    console.log('📊 COLLECTION SUMMARY');
    console.log(`${'='.repeat(60)}`);
    console.log(`✅ Saved:   ${allResults.saved}`);
    console.log(`⏭️  Skipped: ${allResults.skipped}`);
    console.log(`❌ Failed:  ${allResults.failed}`);
    console.log(`📝 Total:   ${allResults.total}`);
    console.log(`${'='.repeat(60)}\n`);

    // Language breakdown
    console.log('📋 By Language:');
    for (const [lang, results] of Object.entries(allResults.byLanguage)) {
      console.log(`   ${lang}: ${results.saved} saved, ${results.skipped} skipped`);
    }

    console.log(`\n✨ Finished at: ${new Date().toLocaleString()}`);

    // Cleanup temporary images
    console.log('\n🧹 Cleaning up temporary files...');
    await cleanupTempImages();

    // Exit code based on results
    if (allResults.saved > 0) {
      console.log('\n🎉 New content collected successfully!');
      process.exit(0);
    } else if (allResults.failed > 0) {
      console.log('\n⚠️  Some articles failed to collect');
      process.exit(1);
    } else {
      console.log('\nℹ️  No new content to collect');
      process.exit(0);
    }
  } catch (error) {
    console.error('\n💥 Fatal error:', error.message);
    console.error(error.stack);

    // Cleanup temporary images even on error
    console.log('\n🧹 Cleaning up temporary files...');
    try {
      await cleanupTempImages();
    } catch (cleanupError) {
      console.error('Cleanup error:', cleanupError.message);
    }

    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default main;
