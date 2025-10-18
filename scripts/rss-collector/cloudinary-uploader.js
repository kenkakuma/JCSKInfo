/**
 * Cloudinary Uploader Module
 * JetCode·SKI Content Collector
 *
 * Uploads images to Cloudinary CDN with automatic optimization
 */

import { v2 as cloudinary } from 'cloudinary';
import { promises as fs } from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
const envPath = path.resolve(__dirname, '../../.env.local');
dotenv.config({ path: envPath });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Verify Cloudinary configuration
 * @returns {boolean} True if configured
 */
function verifyConfig() {
  const { cloud_name, api_key, api_secret } = cloudinary.config();

  if (!cloud_name || !api_key || !api_secret) {
    console.error('❌ Cloudinary not configured. Please check .env.local:');
    console.error('   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME');
    console.error('   CLOUDINARY_API_KEY');
    console.error('   CLOUDINARY_API_SECRET');
    return false;
  }

  return true;
}

/**
 * Upload image to Cloudinary
 * @param {string} filePath - Local file path
 * @param {Object} options - Upload options
 * @returns {Promise<Object>} Upload result with CDN URL
 */
export async function uploadToCloudinary(filePath, options = {}) {
  if (!verifyConfig()) {
    return { success: false, error: 'Cloudinary not configured' };
  }

  try {
    // Check if file exists
    await fs.access(filePath);

    // Extract filename without extension for public_id
    const filename = path.basename(filePath, path.extname(filePath));

    // Upload options
    const uploadOptions = {
      folder: 'jcski-posts', // Store in jcski-posts folder
      resource_type: 'image',
      public_id: options.public_id || filename,
      overwrite: false, // Don't overwrite existing files
      transformation: [
        { quality: 'auto', fetch_format: 'auto' } // Auto optimization
      ],
      ...options
    };

    console.log(`☁️  Uploading to Cloudinary: ${path.basename(filePath)}`);

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(filePath, uploadOptions);

    console.log(`✓ Uploaded: ${result.public_id}`);
    console.log(`  URL: ${result.secure_url}`);
    console.log(`  Size: ${(result.bytes / 1024).toFixed(2)} KB`);

    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      size: result.bytes,
      originalFilename: path.basename(filePath)
    };

  } catch (error) {
    if (error.http_code === 400 && error.message.includes('already exists')) {
      // File already exists, return existing URL
      const publicId = `jcski-posts/${options.public_id || path.basename(filePath, path.extname(filePath))}`;
      const url = cloudinary.url(publicId, { secure: true });

      console.log(`✓ Already exists: ${publicId}`);

      return {
        success: true,
        url,
        publicId,
        alreadyExists: true
      };
    }

    console.error(`✗ Upload failed: ${error.message}`);
    return {
      success: false,
      error: error.message,
      originalFilename: path.basename(filePath)
    };
  }
}

/**
 * Upload multiple images to Cloudinary
 * @param {Array} filePaths - Array of file paths
 * @param {Object} options - Upload options
 * @returns {Promise<Object[]>} Array of upload results
 */
export async function uploadMultipleToCloudinary(filePaths, options = {}) {
  const results = [];

  for (const filePath of filePaths) {
    const result = await uploadToCloudinary(filePath, options);
    results.push(result);
  }

  return results;
}

/**
 * Generate optimized Cloudinary URL
 * @param {string} publicId - Cloudinary public ID
 * @param {Object} options - Transformation options
 * @returns {string} Optimized URL
 */
export function getOptimizedUrl(publicId, options = {}) {
  const {
    width = 1200,
    quality = 'auto',
    format = 'auto'
  } = options;

  return cloudinary.url(publicId, {
    secure: true,
    transformation: [
      { width, quality, fetch_format: format, crop: 'limit' }
    ]
  });
}

/**
 * Delete image from Cloudinary
 * @param {string} publicId - Cloudinary public ID
 * @returns {Promise<Object>} Deletion result
 */
export async function deleteFromCloudinary(publicId) {
  if (!verifyConfig()) {
    return { success: false, error: 'Cloudinary not configured' };
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === 'ok') {
      console.log(`✓ Deleted: ${publicId}`);
      return { success: true, publicId };
    } else {
      console.log(`⚠ Not found: ${publicId}`);
      return { success: false, error: 'Not found', publicId };
    }
  } catch (error) {
    console.error(`✗ Delete failed: ${error.message}`);
    return { success: false, error: error.message, publicId };
  }
}

export default {
  uploadToCloudinary,
  uploadMultipleToCloudinary,
  getOptimizedUrl,
  deleteFromCloudinary,
  verifyConfig
};
