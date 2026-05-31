# MediSeen Content Engine

This blog can scan Nigerian healthcare news signals and create reviewable draft posts in `content/drafts`.

## Run Manually

```bash
npm run content:scan
```

With AI writing enabled:

```bash
OPENAI_API_KEY=your_key npm run content:scan
```

On Windows, if Node reports `UNABLE_TO_VERIFY_LEAF_SIGNATURE` while reading RSS feeds, run with the system certificate store:

```powershell
$env:NODE_OPTIONS="--use-system-ca"; npm run content:scan
```

Optional settings:

```bash
BLOG_WRITER_MODEL=gpt-4.1-mini
HEALTH_TOPIC_MAX_ITEMS=8
HEALTH_TOPIC_RSS_URLS="https://news.google.com/rss/search?q=Nigeria%20healthcare%20when%3A7d&hl=en-NG&gl=NG&ceid=NG:en"
```

## Cron Example

Run every weekday at 7:30 AM server time:

```cron
30 7 * * 1-5 cd /path/to/mediseen-blog && /usr/bin/npm run content:scan >> /var/log/mediseen-content.log 2>&1
```

## Publishing Workflow

1. Review the new markdown file in `content/drafts`.
2. Verify every statistic and source link.
3. Rewrite any sensitive medical claim as operational guidance, not treatment advice.
4. Move the file from `content/drafts` to `content/posts`.
5. Build and deploy the blog.

## Source Strategy

The default feed uses Google News RSS for Nigerian healthcare terms. Add newspaper RSS feeds, NCDC feeds, Ministry of Health updates, or manually curated social-monitoring RSS bridges through `HEALTH_TOPIC_RSS_URLS`.

Social platforms often block scraping or require paid APIs. For X/Twitter, Facebook, LinkedIn, or Instagram, prefer official APIs, approved social listening tools, or a manual feed of verified post URLs. The writer prompt treats social posts as leads that must be verified before publication.
