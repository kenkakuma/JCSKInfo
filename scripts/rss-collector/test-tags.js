#!/usr/bin/env node

/**
 * Test Script for Tag Detection
 * Verify that the new tag detection logic works correctly
 */

import { extractTags } from './utils.js';

// Mock RSS items with various AI-related content
const testItems = [
  {
    title: 'OpenAI releases GPT-4 Turbo with improved performance',
    description: 'A new version of GPT-4 with faster processing and better understanding',
    categories: []
  },
  {
    title: 'Machine Learning Guide for Beginners',
    description: 'Learn the basics of machine learning with practical examples',
    categories: ['Tutorial']
  },
  {
    title: 'React 19: New Features and Best Practices',
    description: 'Deep dive into React 19 framework updates',
    categories: null
  },
  {
    title: 'Blockchain Technology: Beyond Cryptocurrency',
    description: 'Exploring smart contracts and decentralized applications',
    categories: []
  },
  {
    title: 'AWS Lambda for Serverless Computing',
    description: 'Building scalable applications without managing servers',
    categories: []
  },
  {
    title: 'Cybersecurity Best Practices for 2024',
    description: 'Essential security measures to protect your data',
    categories: ['Security']
  },
  {
    title: 'iOS App Development with Swift',
    description: 'Create native iOS applications using Swift programming language',
    categories: []
  }
];

console.log('\n🧪 Testing Tag Detection Logic\n');
console.log('='.repeat(60));

testItems.forEach((item, index) => {
  const tags = extractTags(item);
  console.log(`\nTest ${index + 1}:`);
  console.log(`  Title: ${item.title}`);
  console.log(`  Tags: ${tags.length > 0 ? tags.join(', ') : '(none)'}`);

  // Highlight AI-related tags
  const hasAI = tags.some(tag => tag.toLowerCase().includes('ai'));
  if (hasAI) {
    console.log(`  ✅ AI-related tag detected!`);
  }
});

console.log('\n' + '='.repeat(60));
console.log('✨ Tag detection test completed!\n');
