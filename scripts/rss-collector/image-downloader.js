/**
 * Image Downloader Module
 * JetCode·SKI Content Collector
 *
 * Downloads images from URLs to temporary directory
 */

import https from 'https';
import http from 'http';
import { promises as fs } from 'fs';
import fsSync from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Temporary directory for downloaded images
const TEMP_DIR = path.join(__dirname, 'temp-images');

/**
 * Ensure temp directory exists
 * @returns {Promise<void>}
 */
async function ensureTempDir() {
  try {
    await fs.mkdir(TEMP_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating temp directory:', error.message);
  }
}

/**
 * Generate unique filename from URL
 * @param {string} url - Image URL
 * @returns {string} Unique filename with extension
 */
function generateFilename(url) {
  const hash = crypto.createHash('md5').update(url).digest('hex').substring(0, 8);
  const ext = path.extname(new URL(url).pathname) || '.jpg';
  return `image-${hash}${ext}`;
}

/**
 * Download image from URL
 * @param {string} imageUrl - Image URL to download
 * @returns {Promise<Object>} Download result with file path
 */
export async function downloadImage(imageUrl) {
  if (!imageUrl) {
    return { success: false, error: 'No image URL provided' };
  }

  try {
    // Ensure temp directory exists
    await ensureTempDir();

    // Generate unique filename
    const filename = generateFilename(imageUrl);
    const filePath = path.join(TEMP_DIR, filename);

    // Check if already downloaded
    try {
      await fs.access(filePath);
      console.log(`✓ Image already cached: ${filename}`);
      return { success: true, filePath, filename, cached: true };
    } catch {
      // File doesn't exist, proceed with download
    }

    // Download image
    const protocol = imageUrl.startsWith('https') ? https : http;

    return new Promise((resolve, reject) => {
      const request = protocol.get(imageUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; JCSKIBot/1.0)',
          'Accept': 'image/*'
        },
        timeout: 30000 // 30 second timeout
      }, (response) => {
        // Handle redirects
        if (response.statusCode === 301 || response.statusCode === 302) {
          const redirectUrl = response.headers.location;
          console.log(`↪ Redirecting to: ${redirectUrl}`);
          downloadImage(redirectUrl).then(resolve).catch(reject);
          return;
        }

        // Check status code
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download: HTTP ${response.statusCode}`));
          return;
        }

        // Check content type
        const contentType = response.headers['content-type'];
        if (!contentType || !contentType.startsWith('image/')) {
          reject(new Error(`Invalid content type: ${contentType}`));
          return;
        }

        // Write to file
        const fileStream = fsSync.createWriteStream(filePath);
        response.pipe(fileStream);

        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`✓ Downloaded: ${filename}`);
          resolve({ success: true, filePath, filename, cached: false });
        });

        fileStream.on('error', (error) => {
          fs.unlink(filePath).catch(() => {}); // Clean up partial file
          reject(error);
        });
      });

      request.on('error', (error) => {
        reject(error);
      });

      request.on('timeout', () => {
        request.destroy();
        reject(new Error('Download timeout'));
      });
    });

  } catch (error) {
    console.error(`✗ Failed to download image: ${error.message}`);
    return { success: false, error: error.message };
  }
}

/**
 * Download multiple images
 * @param {string[]} imageUrls - Array of image URLs
 * @returns {Promise<Object[]>} Array of download results
 */
export async function downloadImages(imageUrls) {
  const results = [];

  for (const url of imageUrls) {
    const result = await downloadImage(url);
    results.push({ url, ...result });
  }

  return results;
}

/**
 * Clean up temporary directory
 * @returns {Promise<void>}
 */
export async function cleanupTempImages() {
  try {
    const files = await fs.readdir(TEMP_DIR);
    for (const file of files) {
      await fs.unlink(path.join(TEMP_DIR, file));
    }
    console.log(`✓ Cleaned up ${files.length} temporary images`);
  } catch (error) {
    console.error('Error cleaning temp directory:', error.message);
  }
}

/**
 * Get temp directory path
 * @returns {string} Temp directory path
 */
export function getTempDir() {
  return TEMP_DIR;
}

export default {
  downloadImage,
  downloadImages,
  cleanupTempImages,
  getTempDir
};
