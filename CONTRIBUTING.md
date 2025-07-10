# Contributing to TriDev

Thank you for your interest in contributing to the TriDev community website! 

## Adding Your RSS Feed

We welcome TriDev community members to add their personal development blogs to our member feed. This helps share knowledge and keeps the community connected.

### Requirements

- Your blog should focus on software development, technology, or topics relevant to the TriDev community
- Your RSS feed should be publicly accessible
- Your blog should be actively maintained (posts within the last 6 months)

### How to Add Your Feed

1. **Fork this repository**

2. **Edit the feeds configuration file**: `src/config/feeds.json`

3. **Add your feed information** to the `feeds` array:
   ```json
   {
     "name": "Your Name",
     "description": "Brief description of your blog/expertise",
     "url": "https://yourblog.com/feed",
     "website": "https://yourblog.com",
     "twitter": "@yourtwitterhandle"
   }
   ```

4. **Update the lastUpdated field** in the `meta` section to today's date (YYYY-MM-DD format)

5. **Validate your feed configuration**:
   ```bash
   npm run validate-feeds
   ```

6. **Test your feed** by running the project locally:
   ```bash
   npm install
   npm run dev
   ```

7. **Submit a pull request** with:
   - A clear title: "Add [Your Name] RSS feed"
   - A brief description of your blog
   - Any relevant links

**Note**: The validation script (`npm run validate-feeds`) will automatically check your feed configuration for common issues like invalid URLs, duplicate feeds, and missing required fields.

### Feed Guidelines

- **Feed URL**: Should be your RSS/Atom feed URL (usually `/feed`, `/rss`, or `/atom.xml`)
- **Name**: Your full name or the name you'd like displayed
- **Description**: 1-2 sentence description of your blog's focus
- **Website**: Your main blog/website URL
- **Twitter**: (Optional) Your Twitter handle including the @

### Example Entry

```json
{
  "name": "Jane Developer",
  "description": "Full-stack developer writing about React, Node.js, and modern web development",
  "url": "https://janedev.blog/feed",
  "website": "https://janedev.blog",
  "twitter": "@janedev"
}
```

### Questions?

If you have questions about contributing or need help with your RSS feed, feel free to:
- Open an issue on this repository
- Ask in our Discord server
- Reach out at our monthly meetup

Thank you for helping grow the TriDev community! 🚀 