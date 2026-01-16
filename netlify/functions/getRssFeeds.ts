import type { Handler } from '@netlify/functions';
import fetch from 'node-fetch';
import type { Response } from 'node-fetch';
import { feedsConfig } from './feeds-config';

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
    let feedUrls: string[] = [];
    
    // Load feeds from imported configuration
    try {
      feedUrls = feedsConfig.feeds.map((feed: any) => feed.url);
      console.log('Loaded feeds from configuration file:', feedUrls);
    } catch (configError) {
      console.warn('Could not read feeds configuration file:', configError);
      // Fallback to environment variable if config file fails
      feedUrls = process.env.RSS_FEEDS?.split(',') || [];
      console.log('Loaded feeds from environment variable:', feedUrls);
    }

    if (feedUrls.length === 0) {
      throw new Error('No RSS feeds configured. Add feeds to src/config/feeds.json or set RSS_FEEDS environment variable.');
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

    // Extract items from each feed and inject author info
    const extractItemsWithAuthor = (feed: string, feedConfig: typeof feedsConfig.feeds[0]) => {
      const itemsMatch = feed.match(/<item>[\s\S]*?<\/item>/g) || [];
      return itemsMatch.map(item => {
        // Inject author info as custom elements before closing </item>
        const authorInfo = `
    <tridev:author>${feedConfig.name}</tridev:author>
    <tridev:authorWebsite>${feedConfig.website}</tridev:authorWebsite>
    ${feedConfig.twitter ? `<tridev:authorTwitter>${feedConfig.twitter}</tridev:authorTwitter>` : ''}`;
        return item.replace('</item>', `${authorInfo}</item>`);
      });
    };

    // Combine all feeds into one XML document with collected namespaces
    const combinedFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" ${namespaceStr} xmlns:tridev="https://tricities.dev/ns/feeds">
  <channel>
    <title>TriDev Member Feeds</title>
    <description>Combined RSS feeds from TriDev members</description>
    <link>https://tricities.dev</link>
    ${feeds.map((feed, index) => {
      const items = extractItemsWithAuthor(feed, feedsConfig.feeds[index]);
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