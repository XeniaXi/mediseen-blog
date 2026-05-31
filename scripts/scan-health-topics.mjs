import fs from 'node:fs/promises';
import path from 'node:path';

const DEFAULT_SOURCES = [
  'https://news.google.com/rss/search?q=Nigeria%20healthcare%20OR%20Nigerian%20hospitals%20OR%20NHIS%20OR%20NCDC%20OR%20Lassa%20OR%20cholera%20OR%20doctors%20strike%20when%3A7d&hl=en-NG&gl=NG&ceid=NG:en',
];

const KEYWORDS = [
  'nhis',
  'nhia',
  'reimbursement',
  'claim',
  'hospital',
  'clinic',
  'doctor',
  'nurse',
  'strike',
  'cholera',
  'lassa',
  'malaria',
  'maternal',
  'pharmacy',
  'drug',
  'oxygen',
  'power',
  'outage',
  'lagos',
  'abuja',
  'port harcourt',
  'nigeria',
  'nigerian',
];

const OUTPUT_DIR = path.join(process.cwd(), 'content', 'drafts');
const MODEL = process.env.BLOG_WRITER_MODEL || 'gpt-4.1-mini';

function getSourceUrls() {
  const configured = process.env.HEALTH_TOPIC_RSS_URLS;
  if (!configured) return DEFAULT_SOURCES;
  return configured
    .split(',')
    .map(url => url.trim())
    .filter(Boolean);
}

function decodeXml(value = '') {
  const decoded = value
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([a-f0-9]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  return decoded
    .replace(/\u2018|\u2019|\u00e2\u20ac\u2122/g, "'")
    .replace(/\u201c|\u201d|\u00e2\u20ac\u0153|\u00e2\u20ac\ufffd/g, '"')
    .replace(/\u2013|\u2014|\u00e2\u20ac\u201c|\u00e2\u20ac\u009d/g, '-')
    .replace(/\u2026|\u00e2\u20ac\u00a6/g, '...')
    .replace(/\u00a0|\u00c2/g, ' ');
}

function tagValue(item, tag) {
  const match = item.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return decodeXml(match?.[1] || '');
}

function parseFeed(xml, feedUrl) {
  const itemMatches = xml.match(/<item[\s\S]*?<\/item>/gi) || [];
  return itemMatches.map(item => ({
    title: tagValue(item, 'title'),
    link: tagValue(item, 'link'),
    date: tagValue(item, 'pubDate'),
    summary: tagValue(item, 'description'),
    feedUrl,
  })).filter(item => item.title && item.link);
}

function scoreItem(item) {
  const haystack = `${item.title} ${item.summary}`.toLowerCase();
  return KEYWORDS.reduce((score, keyword) => (
    haystack.includes(keyword) ? score + (keyword.includes(' ') ? 3 : 1) : score
  ), 0);
}

function dedupeItems(items) {
  const seen = new Set();
  return items.filter(item => {
    const key = item.link || item.title.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 72);
}

function chooseAngle(items) {
  const titles = items.map(item => item.title.toLowerCase()).join(' ');
  if (titles.includes('nhis') || titles.includes('nhia') || titles.includes('claim')) {
    return 'NHIS reimbursement delays and revenue leakage in Nigerian hospitals';
  }
  if (titles.includes('strike') || titles.includes('doctor') || titles.includes('nurse')) {
    return 'staffing pressure, workflow overload, and hospital operations in Nigeria';
  }
  if (titles.includes('cholera') || titles.includes('lassa') || titles.includes('outbreak')) {
    return 'outbreak readiness, patient tracking, and operational response for Nigerian hospitals';
  }
  if (titles.includes('drug') || titles.includes('pharmacy')) {
    return 'pharmacy stock control, drug availability, and revenue protection in Nigerian clinics';
  }
  return 'current Nigerian healthcare pressures and practical hospital management responses';
}

function buildReferenceBlock(items) {
  return items.map((item, index) => {
    const date = item.date ? ` (${item.date})` : '';
    return `${index + 1}. ${item.title}${date}\n   ${item.link}`;
  }).join('\n');
}

function fallbackDraft(angle, items) {
  const today = new Date().toISOString().slice(0, 10);
  const references = buildReferenceBlock(items);

  return `---\ntitle: \"Draft: ${angle}\"\nexcerpt: \"A sourced draft brief on ${angle}, with practical lessons for Nigerian hospitals and clinics.\"\ndate: \"${today}\"\nauthor: \"MediSeen Research Team\"\ncategory: \"Hospital Management\"\nreadTime: \"6 min read\"\ndraft: true\n---\n\n## Editorial angle\n\n${angle}\n\n## Why it matters\n\nRecent Nigerian healthcare stories point to operational pressure that hospital leaders cannot solve with clinical effort alone. Delayed claims, weak visibility, manual records, stock gaps, and power or internet interruptions all create avoidable strain on care delivery and revenue.\n\n## Suggested MediSeen position\n\nUse the sourced stories below to explain the operational problem, then connect the lesson to MediSeen HMS: offline-first hospital workflows, patient records, billing, pharmacy, laboratory, inventory, and management reporting in one system built for Nigerian realities.\n\n## Source leads\n\n${references}\n\n## Writer notes\n\n- Verify every statistic before publishing.\n- Link to original reporting in the body where claims depend on a source.\n- Keep clinical advice general; focus on hospital operations, workflow, revenue, patient tracking, and accountability.\n- Do not publish this draft without human review.\n`;
}

async function writeWithOpenAI(angle, items) {
  if (!process.env.OPENAI_API_KEY) return null;

  const references = buildReferenceBlock(items);
  const prompt = `Write a 700-900 word MediSeen Blog article for Nigerian hospital owners and administrators.

Topic angle: ${angle}

Use these source leads as references and cite them naturally with markdown links where relevant:
${references}

Requirements:
- Use markdown with ## subheadings.
- Focus on Nigerian healthcare operations, not clinical treatment advice.
- Include practical steps hospital managers can take.
- Mention newspapers or social posts only as sourced signals, not as unquestioned truth.
- Position MediSeen HMS as the practical solution in the final two paragraphs.
- Mention MediSeen HMS naturally, not aggressively.
- End with a soft CTA.
- Return a complete markdown file with frontmatter: title, excerpt, date, author, category, readTime, draft: true.
- Do not include analysis, planning notes, or the prompt.`;

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      input: prompt,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OpenAI request failed (${response.status}): ${text}`);
  }

  const data = await response.json();
  return data.output_text || data.output?.flatMap(part => part.content || []).map(part => part.text || '').join('\n') || null;
}

async function main() {
  const feeds = getSourceUrls();
  const fetched = await Promise.all(feeds.map(async feedUrl => {
    const response = await fetch(feedUrl, {
      headers: { 'User-Agent': 'MediSeenBlogScanner/1.0' },
    });
    if (!response.ok) throw new Error(`Failed to fetch ${feedUrl}: ${response.status}`);
    return parseFeed(await response.text(), feedUrl);
  }));

  const ranked = dedupeItems(fetched.flat())
    .map(item => ({ ...item, score: scoreItem(item) }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, Number(process.env.HEALTH_TOPIC_MAX_ITEMS || 8));

  if (ranked.length === 0) {
    console.log('No relevant healthcare topics found.');
    return;
  }

  const angle = chooseAngle(ranked);
  const generated = await writeWithOpenAI(angle, ranked);
  const draft = generated || fallbackDraft(angle, ranked);
  const today = new Date().toISOString().slice(0, 10);
  const filename = `${today}-${slugify(angle)}.md`;

  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.writeFile(path.join(OUTPUT_DIR, filename), draft.trim() + '\n', 'utf8');

  console.log(`Draft created: content/drafts/${filename}`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
