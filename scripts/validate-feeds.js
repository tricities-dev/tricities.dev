#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the expected schema
const requiredFields = ['name', 'description', 'url', 'website'];
const optionalFields = ['twitter'];
const metaRequiredFields = ['description', 'lastUpdated', 'howToContribute'];

function validateFeedsConfig() {
  const configPath = path.join(__dirname, '..', 'src', 'config', 'feeds.json');
  
  if (!fs.existsSync(configPath)) {
    console.error('❌ feeds.json not found at:', configPath);
    process.exit(1);
  }

  let config;
  try {
    const configContent = fs.readFileSync(configPath, 'utf-8');
    config = JSON.parse(configContent);
  } catch (error) {
    console.error('❌ Invalid JSON in feeds.json:', error.message);
    process.exit(1);
  }

  // Validate top-level structure
  if (!config.feeds || !Array.isArray(config.feeds)) {
    console.error('❌ Missing or invalid "feeds" array');
    process.exit(1);
  }

  if (!config.meta || typeof config.meta !== 'object') {
    console.error('❌ Missing or invalid "meta" object');
    process.exit(1);
  }

  // Validate meta section
  for (const field of metaRequiredFields) {
    if (!config.meta[field]) {
      console.error(`❌ Missing required meta field: ${field}`);
      process.exit(1);
    }
  }

  // Validate feeds
  for (let i = 0; i < config.feeds.length; i++) {
    const feed = config.feeds[i];
    
    // Check required fields
    for (const field of requiredFields) {
      if (!feed[field] || typeof feed[field] !== 'string' || feed[field].trim() === '') {
        console.error(`❌ Feed ${i + 1}: Missing or empty required field "${field}"`);
        process.exit(1);
      }
    }

    // Validate URL format
    try {
      new URL(feed.url);
    } catch {
      console.error(`❌ Feed ${i + 1}: Invalid RSS URL "${feed.url}"`);
      process.exit(1);
    }

    try {
      new URL(feed.website);
    } catch {
      console.error(`❌ Feed ${i + 1}: Invalid website URL "${feed.website}"`);
      process.exit(1);
    }

    // Validate twitter format if provided
    if (feed.twitter && !feed.twitter.startsWith('@')) {
      console.error(`❌ Feed ${i + 1}: Twitter handle should start with @ (got "${feed.twitter}")`);
      process.exit(1);
    }

    // Check for unknown fields
    const allFields = [...requiredFields, ...optionalFields];
    for (const field of Object.keys(feed)) {
      if (!allFields.includes(field)) {
        console.warn(`⚠️  Feed ${i + 1}: Unknown field "${field}" (will be ignored)`);
      }
    }
  }

  // Check for duplicate URLs
  const urls = config.feeds.map(feed => feed.url.toLowerCase());
  const duplicateUrls = urls.filter((url, index) => urls.indexOf(url) !== index);
  if (duplicateUrls.length > 0) {
    console.error(`❌ Duplicate RSS URLs found: ${duplicateUrls.join(', ')}`);
    process.exit(1);
  }

  // Check for duplicate names
  const names = config.feeds.map(feed => feed.name.toLowerCase());
  const duplicateNames = names.filter((name, index) => names.indexOf(name) !== index);
  if (duplicateNames.length > 0) {
    console.error(`❌ Duplicate names found: ${duplicateNames.join(', ')}`);
    process.exit(1);
  }

  console.log('✅ feeds.json is valid!');
  console.log(`📊 Found ${config.feeds.length} feeds:`);
  config.feeds.forEach((feed, i) => {
    console.log(`   ${i + 1}. ${feed.name} - ${feed.url}`);
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  validateFeedsConfig();
}

export { validateFeedsConfig }; 