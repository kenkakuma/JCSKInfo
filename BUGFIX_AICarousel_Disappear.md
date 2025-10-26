# Bug Fix: AI News Carousel Disappearing After RSS Collection

**Date**: 2025-10-26
**Severity**: Critical
**Status**: ✅ Fixed

---

## Problem Description

After publishing articles collected by the RSS collector, the "AI News" large card (AICarousel) on the homepage would disappear, leaving only the regular masonry grid visible.

### Symptoms
- Homepage AICarousel not displaying
- No error messages in console
- Issue occurs immediately after RSS content collection and publishing
- Other page elements display normally

---

## Root Cause Analysis

### The Issue Chain

1. **RSS Feed Configuration Problem**: Most RSS feeds do not include `<category>` tags in their XML
2. **Tag Extraction Logic Flaw**: The `extractTags()` function in `scripts/rss-collector/utils.js` only extracted tags from RSS `categories` field
3. **Empty Tags Result**: Articles collected without categories had empty tag arrays `tags: []`
4. **AICarousel Filter Logic**: The component filters posts by checking:
   ```typescript
   const hasAITag = post.tags?.some((tag) => tag.toLowerCase().includes('ai'))
   ```
5. **No Matching Articles**: With empty tags, no articles matched the AI filter
6. **Component Returns Null**: When `aiPosts.length === 0`, AICarousel returns null, making the component invisible

### Code Trail

**File**: `components/AICarousel.tsx:25-42`
```typescript
const aiPosts = posts.filter((post) => {
  if (heroPostIds.includes(post._id)) return false

  // Problem: Tags are empty after RSS collection
  const hasAITag = post.tags?.some((tag) => tag.toLowerCase().includes('ai'))
  if (!hasAITag) return false // All articles filtered out!

  const postDate = new Date(post.date)
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

  return postDate >= oneWeekAgo
})

// When aiPosts.length === 0, entire component returns null
if (aiPosts.length === 0) return null
```

---

## Solution

### Implementation: Intelligent Tag Detection

Added a new function `detectContentTags()` in `scripts/rss-collector/utils.js` that automatically detects relevant tags by analyzing article titles and descriptions.

**Key Changes**:

1. **New Function**: `detectContentTags(title, content)`
   - Analyzes text content for technology keywords
   - Returns detected tag categories (AI, Blockchain, Web Development, Cloud, Security, Database, Mobile)

2. **Enhanced `extractTags()` Function**
   - Priority 1: Extract from RSS categories (if available)
   - Priority 2: Auto-detect from content (new)
   - Deduplicates and limits to 5 tags

3. **Keyword Categories**:
   - **AI**: GPT, ChatGPT, LLM, machine learning, deep learning, neural networks, etc.
   - **Blockchain**: Bitcoin, Ethereum, Web3, DeFi, smart contracts, etc.
   - **Web Development**: React, Vue, Angular, TypeScript, JavaScript, etc.
   - **Cloud**: AWS, Azure, Docker, Kubernetes, serverless, etc.
   - **Security**: Cybersecurity, encryption, vulnerability, authentication, etc.
   - **Database**: SQL, NoSQL, MongoDB, PostgreSQL, etc.
   - **Mobile**: iOS, Android, Flutter, React Native, etc.

### Code Changes

**File**: `scripts/rss-collector/utils.js`

```javascript
/**
 * Detect content-based tags from title and summary
 */
function detectContentTags(title, content) {
  const textToAnalyze = (title + ' ' + content).toLowerCase();
  const detectedTags = [];

  const aiKeywords = {
    'AI': ['artificial intelligence', 'ai ', 'machine learning', 'deep learning', 'gpt', 'chatgpt', 'llm', ...],
    'Blockchain': ['blockchain', 'crypto', 'bitcoin', 'ethereum', 'web3', ...],
    // ... more categories
  };

  for (const [tag, keywords] of Object.entries(aiKeywords)) {
    if (keywords.some(keyword => textToAnalyze.includes(keyword))) {
      detectedTags.push(tag);
    }
  }

  return detectedTags;
}

/**
 * Enhanced extractTags with intelligent detection
 */
export function extractTags(item, maxTags = 5) {
  const tags = [];

  // Priority 1: RSS categories
  if (item.categories && Array.isArray(item.categories)) {
    tags.push(...item.categories);
  }

  // Priority 2: Auto-detect from content
  const title = item.title || '';
  const description = item.description || item.summary || '';
  const contentTags = detectContentTags(title, description);
  tags.push(...contentTags);

  // Deduplicate and limit
  const cleaned = [...new Set(tags)]
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0 && tag.length < 30)
    .slice(0, maxTags);

  return cleaned;
}
```

---

## Testing & Verification

### Test 1: Tag Detection Test
```bash
node scripts/rss-collector/test-tags.js
```
✅ **Result**: All AI-related articles correctly tagged with "AI"

### Test 2: Full Integration Test
```bash
node scripts/rss-collector/test-full-flow.js
```
✅ **Result**: Articles without predefined categories now have auto-detected tags

### Test 3: Build Verification
```bash
npm run build
```
✅ **Result**: Project builds successfully with no errors

---

## Impact

### Before Fix
- Articles collected from RSS feeds without categories → Empty tags array
- AICarousel filters for articles with "AI" tag → No matches
- Component returns null → Homepage displays no AI carousel
- User sees broken homepage layout

### After Fix
- Articles collected from RSS feeds → Auto-detected relevant tags
- AICarousel finds articles with "AI" tag → Multiple matches
- Component displays properly → Homepage shows AI carousel as expected
- Better categorization for all articles (AI, Blockchain, Web Dev, Cloud, Security, Database, Mobile)

---

## Future Enhancements

1. **Improve keyword matching**: Use fuzzy matching for better detection
2. **Language-specific keywords**: Add keyword detection for non-English content (Japanese, Vietnamese)
3. **Machine learning approach**: Implement simple NLP for more accurate tag detection
4. **User feedback loop**: Allow users to suggest better keywords
5. **Tag hierarchy**: Create tag relationships (e.g., "AI" is parent of "ChatGPT", "LLM")

---

## Files Modified

- `scripts/rss-collector/utils.js` - Enhanced tag detection logic
- `scripts/rss-collector/test-tags.js` - New test file
- `scripts/rss-collector/test-full-flow.js` - New integration test file

---

## Deployment Notes

1. **No Breaking Changes**: All existing functionality preserved
2. **Backward Compatible**: Existing articles with tags remain unchanged
3. **Automatic Migration**: Recollecting articles will apply new tag detection
4. **Zero Downtime**: Can be deployed during normal maintenance window

---

## Rollback Plan

If needed, revert to commit before tag detection changes:
```bash
git revert <commit-hash>
```

The original empty tag behavior will resume (but AI carousel will disappear again).

---

**Status**: ✅ Fixed and Tested
**Deployed**: Ready for production
