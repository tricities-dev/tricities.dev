import { Handler } from '@netlify/functions';
import fetch, { Response } from 'node-fetch';

export const handler: Handler = async (event) => {
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
    console.log('Feed URLs:', feedUrls);

    if (feedUrls.length === 0) {
      throw new Error('No RSS feeds configured. Check RSS_FEEDS environment variable.');
    }

    const feedPromises = feedUrls.map(url => fetch(url).then((res: Response) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
      }
      return res.text();
    }));
    
    const feeds = await Promise.all(feedPromises);
    console.log('Successfully fetched', feeds.length, 'feeds');

    // Extract namespaces from all feeds
    const namespaceSet = new Set<string>();
    feeds.forEach(feed => {
      const rssTagMatch = feed.match(/<rss[^>]+>/);
      if (rssTagMatch) {
        const nsMatches = rssTagMatch[0].matchAll(/xmlns:([^=]+)="([^"]+)"/g);
        for (const match of nsMatches) {
          namespaceSet.add(`xmlns:${match[1]}="${match[2]}"`);
        }
      }
    });

    // Combine all unique namespaces
    const namespaceStr = Array.from(namespaceSet).join(' ');

    // Extract items from each feed
    const extractItems = (feed: string) => {
      const itemsMatch = feed.match(/<item>[\s\S]*?<\/item>/g) || [];
      return itemsMatch;
    };

    // Combine all feeds into one XML document with collected namespaces
    const combinedFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" ${namespaceStr}>
  <channel>
    <title>TriDev Member Feeds</title>
    <description>Combined RSS feeds from TriDev members</description>
    <link>https://tricities.dev</link>
    ${feeds.map(feed => {
      const items = extractItems(feed);
      return items.join('\n');
    }).join('\n')}
  </channel>
</rss>`;

    return {
      statusCode: 200,
      headers,
      body: combinedFeed,
    };
  } catch (error) {
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