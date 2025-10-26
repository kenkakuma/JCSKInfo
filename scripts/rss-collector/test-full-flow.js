#!/usr/bin/env node

/**
 * Full Integration Test for Tag Detection Fix
 * Simulates the complete RSS collection and tag detection flow
 */

import { extractTags } from './utils.js';
import { transformToArticle } from './parser.js';

// Simulate RSS feed items without categories (the original problem)
const mockFeedItems = [
  {
    title: 'OpenAI Announces GPT-4.5 with Revolutionary Performance',
    description: 'OpenAI reveals GPT-4.5 with improved reasoning and capabilities',
    contentEncoded: 'The new GPT-4.5 model demonstrates significant improvements in machine learning tasks...',
    pubDate: new Date().toISOString(),
    link: 'https://example.com/article1',
    categories: [] // Empty categories - this was the original problem!
  },
  {
    title: 'React 19 Released with Concurrent Features',
    description: 'New React framework version brings concurrent rendering and server components',
    contentEncoded: 'React 19 represents a major milestone in JavaScript web development...',
    pubDate: new Date().toISOString(),
    link: 'https://example.com/article2',
    categories: null // No categories
  },
  {
    title: 'AI Integration in Microsoft Copilot Suite',
    description: 'Microsoft expands AI capabilities across Office with new Copilot features',
    contentEncoded: 'The generative AI features powered by large language models...',
    pubDate: new Date().toISOString(),
    link: 'https://example.com/article3',
    categories: undefined // Undefined categories
  }
];

async function testFullFlow() {
  console.log('\n🧪 Full Integration Test - RSS Collection with Tag Detection\n');
  console.log('='.repeat(70));
  console.log('Scenario: Articles from RSS feeds with NO predefined categories');
  console.log('Expected: Tags should be auto-detected from content\n');

  let aiArticlesCount = 0;

  for (let i = 0; i < mockFeedItems.length; i++) {
    const item = mockFeedItems[i];
    console.log(`\n📰 Test Item ${i + 1}: "${item.title}"`);
    console.log('-'.repeat(70));

    // Step 1: Extract tags from RSS item
    const tags = extractTags(item);
    console.log(`  📌 Extracted tags: ${tags.length > 0 ? tags.join(', ') : '(none)'}`);

    // Step 2: Simulate article transformation (what happens during collection)
    const article = await transformToArticle(
      item,
      'vi', // Vietnamese
      'Test Feed',
      false // Don't process images
    );

    console.log(`  📄 Article tags: ${article.tags.length > 0 ? article.tags.join(', ') : '(none)'}`);

    // Step 3: Check if article would appear in AICarousel
    // This mimics the filter logic in AICarousel.tsx:33
    const hasAITag = article.tags?.some((tag) => tag.toLowerCase().includes('ai'));
    if (hasAITag) {
      console.log(`  ✅ WOULD SHOW in AICarousel (has AI-related tag)`);
      aiArticlesCount++;
    } else {
      console.log(`  ❌ Would NOT show in AICarousel (no AI-related tag)`);
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log(`📊 Results: ${aiArticlesCount}/${mockFeedItems.length} articles have AI tags`);
  console.log('='.repeat(70));

  if (aiArticlesCount > 0) {
    console.log('\n✨ SUCCESS! Articles without predefined categories now have auto-detected tags!');
    console.log('   The AICarousel component will now display these articles properly.');
  } else {
    console.log('\n❌ FAILURE: No AI tags were detected. The issue persists.');
  }

  console.log('\n');
}

testFullFlow().catch(console.error);
