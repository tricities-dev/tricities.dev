export interface FeedConfig {
  name: string;
  description: string;
  url: string;
  website: string;
  twitter?: string;
}

export interface FeedsConfiguration {
  feeds: FeedConfig[];
  meta: {
    description: string;
    lastUpdated: string;
    howToContribute: string;
  };
} 