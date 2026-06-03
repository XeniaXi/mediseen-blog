import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'content/posts');
const draftsDir = path.join(process.cwd(), 'content/drafts');

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  image?: string;
  keywords: string[];
  content: string;
  draft?: boolean;
  filename?: string;
}

function normalizeKeywords(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  if (typeof value === 'string') return value.split(',').map(k => k.trim()).filter(Boolean);
  return [];
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDir)) return [];
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  return files.map(filename => {
    const slug = filename.replace(/\.mdx?$/, '');
    const raw = fs.readFileSync(path.join(postsDir, filename), 'utf-8');
    const { data, content } = matter(raw);
    return {
      slug,
      title: data.title || 'Untitled',
      excerpt: data.excerpt || '',
      date: data.date || new Date().toISOString(),
      author: data.author || 'MediSeen Team',
      category: data.category || 'Hospital Management',
      readTime: data.readTime || '5 min read',
      image: data.image,
      keywords: normalizeKeywords(data.keywords),
      content,
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllDrafts(): Post[] {
  if (!fs.existsSync(draftsDir)) return [];
  const files = fs.readdirSync(draftsDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  return files.map(filename => {
    const slug = filename.replace(/\.mdx?$/, '');
    const raw = fs.readFileSync(path.join(draftsDir, filename), 'utf-8');
    const { data, content } = matter(raw);
    return {
      slug,
      filename,
      title: data.title || 'Untitled draft',
      excerpt: data.excerpt || '',
      date: data.date || new Date().toISOString(),
      author: data.author || 'MediSeen Team',
      category: data.category || 'Hospital Management',
      readTime: data.readTime || '5 min read',
      image: data.image,
      keywords: normalizeKeywords(data.keywords),
      content,
      draft: data.draft !== false,
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts();
  return posts.find(p => p.slug === slug) || null;
}

export function getRelatedPosts(slug: string, limit = 3): Post[] {
  const posts = getAllPosts();
  const current = posts.find(p => p.slug === slug);
  if (!current) return [];

  const currentKeywords = new Set(current.keywords.map(k => k.toLowerCase()));

  return posts
    .filter(post => post.slug !== slug)
    .map(post => {
      const keywordScore = post.keywords.filter(k => currentKeywords.has(k.toLowerCase())).length;
      const categoryScore = post.category === current.category ? 2 : 0;
      return { post, score: keywordScore + categoryScore };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score || new Date(b.post.date).getTime() - new Date(a.post.date).getTime())
    .slice(0, limit)
    .map(item => item.post);
}
