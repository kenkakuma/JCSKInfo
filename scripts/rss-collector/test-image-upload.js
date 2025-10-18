#!/usr/bin/env node

/**
 * Test Image Upload Functionality
 * Tests the complete image download + Cloudinary upload flow
 */

import { downloadImage, cleanupTempImages } from './image-downloader.js';
import { uploadToCloudinary } from './cloudinary-uploader.js';

// Test image URL from Engadget
const TEST_IMAGE_URL = 'https://s.yimg.com/os/creatr-uploaded-images/2025-10/a0cb48d0-ab91-11f0-bedf-ac95a3b0c21b';

async function testImageFlow() {
  console.log('🧪 Testing Image Download + Cloudinary Upload Flow\n');

  try {
    // Step 1: Download image
    console.log('📥 Step 1: Downloading test image...');
    const downloadResult = await downloadImage(TEST_IMAGE_URL);

    if (!downloadResult.success) {
      console.error('❌ Download failed:', downloadResult.error);
      return;
    }

    console.log('✅ Download successful!');
    console.log(`   File: ${downloadResult.filename}`);
    console.log(`   Path: ${downloadResult.filePath}\n`);

    // Step 2: Upload to Cloudinary
    console.log('☁️  Step 2: Uploading to Cloudinary...');
    const uploadResult = await uploadToCloudinary(downloadResult.filePath, {
      public_id: 'test-upload-' + Date.now()
    });

    if (!uploadResult.success) {
      console.error('❌ Upload failed:', uploadResult.error);
      return;
    }

    console.log('✅ Upload successful!');
    console.log(`   URL: ${uploadResult.url}`);
    console.log(`   Public ID: ${uploadResult.publicId}`);
    console.log(`   Size: ${(uploadResult.size / 1024).toFixed(2)} KB`);
    console.log(`   Dimensions: ${uploadResult.width}x${uploadResult.height}\n`);

    // Step 3: Cleanup
    console.log('🧹 Step 3: Cleaning up temporary files...');
    await cleanupTempImages();
    console.log('✅ Cleanup complete!\n');

    console.log('🎉 All tests passed!');
    console.log('\n📸 Test image uploaded to:');
    console.log(`   ${uploadResult.url}`);

  } catch (error) {
    console.error('\n💥 Test failed:', error.message);
    console.error(error.stack);

    // Cleanup on error
    try {
      await cleanupTempImages();
    } catch (cleanupError) {
      console.error('Cleanup error:', cleanupError.message);
    }

    process.exit(1);
  }
}

// Run test
testImageFlow();
