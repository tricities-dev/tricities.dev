"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const handler = async (event) => {
    // Set CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/xml',
    };
    // Handle preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: '',
        };
    }
    try {
        const feedUrls = process.env.RSS_FEEDS?.split(',') || [];
        console.log('Feed URLs:', feedUrls); // Debug log
        if (feedUrls.length === 0) {
            throw new Error('No RSS feeds configured. Check RSS_FEEDS environment variable.');
        }
        const feedPromises = feedUrls.map(url => (0, node_fetch_1.default)(url).then((res) => {
            if (!res.ok) {
                throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
            }
            return res.text();
        }));
        const feeds = await Promise.all(feedPromises);
        console.log('Successfully fetched', feeds.length, 'feeds'); // Debug log
        // Combine all feeds into one XML document
        const combinedFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>TriDev Member Feeds</title>
    <description>Combined RSS feeds from TriDev members</description>
    <link>https://tricities.dev</link>
    ${feeds.map(feed => {
            // Extract items from each feed
            const itemsMatch = feed.match(/<item>[\s\S]*?<\/item>/g) || [];
            console.log('Found', itemsMatch.length, 'items in feed'); // Debug log
            return itemsMatch.join('\n');
        }).join('\n')}
  </channel>
</rss>`;
        return {
            statusCode: 200,
            headers,
            body: combinedFeed,
        };
    }
    catch (error) {
        console.error('Error fetching RSS feeds:', error);
        return {
            statusCode: 500,
            headers: {
                ...headers,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                error: error instanceof Error ? error.message : 'Failed to fetch RSS feeds',
                stack: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.stack : undefined : undefined
            }),
        };
    }
};
exports.handler = handler;
