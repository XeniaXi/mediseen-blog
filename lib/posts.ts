import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'content/posts');

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  image?: string;
  content: string;
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
      content,
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts();
  return posts.find(p => p.slug === slug) || null;
}
