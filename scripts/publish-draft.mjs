import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const draftsDir = path.join(root, 'content', 'drafts');
const postsDir = path.join(root, 'content', 'posts');

function usage() {
  console.error('Usage: npm run content:publish -- <draft-filename.md>');
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function publishContent(raw) {
  const currentDate = today();
  let content = raw;

  if (/^---\s*[\s\S]*?\s*---/.test(content)) {
    content = content.replace(/^---\s*([\s\S]*?)\s*---/, (_match, frontmatter) => {
      let updated = String(frontmatter)
        .split('\n')
        .filter(line => !/^draft:\s*/i.test(line.trim()))
        .map(line => (/^date:\s*/i.test(line.trim()) ? `date: "${currentDate}"` : line))
        .join('\n')
        .trim();

      if (!/^date:\s*/im.test(updated)) {
        updated += `\ndate: "${currentDate}"`;
      }

      return `---\n${updated}\n---`;
    });
  }

  return content.trim() + '\n';
}

async function main() {
  const filename = process.argv[2];
  if (!filename || filename.includes('/') || filename.includes('\\') || !/\.mdx?$/.test(filename)) {
    usage();
    process.exit(1);
  }

  const source = path.join(draftsDir, filename);
  const target = path.join(postsDir, filename);

  try {
    await fs.access(source);
  } catch {
    console.error(`Draft not found: content/drafts/${filename}`);
    process.exit(1);
  }

  try {
    await fs.access(target);
    console.error(`Published post already exists: content/posts/${filename}`);
    process.exit(1);
  } catch {
    // Target does not exist, which is what we want.
  }

  await fs.mkdir(postsDir, { recursive: true });
  const raw = await fs.readFile(source, 'utf8');
  await fs.writeFile(target, publishContent(raw), 'utf8');
  await fs.unlink(source);

  console.log(`Published content/posts/${filename}`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
