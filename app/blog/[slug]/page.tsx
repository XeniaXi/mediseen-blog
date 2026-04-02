import { getAllPosts, getPostBySlug } from '../../../lib/posts';
import CTABanner from '../../../components/CTABanner';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | MediSeen Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">{post.category}</span>
        <h1 className="mt-4 text-3xl md:text-4xl font-black text-gray-900 leading-tight">{post.title}</h1>
        <p className="mt-3 text-xl text-gray-500">{post.excerpt}</p>
        <div className="mt-4 flex items-center gap-4 text-sm text-gray-400 border-b pb-4">
          <span>By {post.author}</span>
          <span>·</span>
          <span>{new Date(post.date).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>
      </div>

      <div className="prose prose-green max-w-none prose-headings:font-black prose-a:text-green-700 prose-strong:text-gray-900">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      <CTABanner />
    </article>
  );
}
