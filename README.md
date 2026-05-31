# MediSeen Blog

Next.js blog for MediSeen HMS at `https://blog.mediseenhms.com`.

## Common Commands

Install dependencies:

```powershell
npm install
```

Run the blog locally:

```powershell
npm run dev
```

Open:

```text
http://localhost:3000
```

Build for production:

```powershell
npm run build
```

Start the production server:

```powershell
npm run start
```

## Generate Blog Drafts

Create a new healthcare topic draft from Nigerian news/RSS signals:

```powershell
$env:NODE_OPTIONS="--use-system-ca"; npm run content:scan
```

If you have an OpenAI API key, enable full article generation:

```powershell
$env:NODE_OPTIONS="--use-system-ca"
$env:OPENAI_API_KEY="your_key_here"
npm run content:scan
```

Generated drafts are saved in:

```text
content\drafts
```

## Review And Publish

1. Open the new `.md` file in `content\drafts`.
2. Verify source links, dates, and claims.
3. Edit the draft until it is publish-ready.
4. Move the file from `content\drafts` to `content\posts`.
5. Build and deploy the blog.

Live posts are stored in:

```text
content\posts
```

More details are in:

```text
docs\content-engine.md
```
