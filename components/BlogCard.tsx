import { Post } from '@/lib/posts';
import Link from 'next/link';

const categoryColors: Record<string, string> = {
  'Hospital Management': 'bg-green-100 text-green-800',
  'Billing & Finance': 'bg-yellow-100 text-yellow-800',
  'Technology': 'bg-blue-100 text-blue-800',
  'NHIS & Insurance': 'bg-purple-100 text-purple-800',
  'Staff Management': 'bg-orange-100 text-orange-800',
};

export default function BlogCard({ post }: { post: Post }) {
  const colorClass = categoryColors[post.category] || 'bg-gray-100 text-gray-800';
  return (
    <Link href={`/blog/${post.slug}`} className="group block bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="h-2 bg-gradient-to-r from-green-700 to-green-500" />
      <div className="p-6">
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${colorClass}`}>{post.category}</span>
        <h2 className="mt-3 text-xl font-bold text-gray-900 group-hover:text-green-700 transition line-clamp-2">{post.title}</h2>
        <p className="mt-2 text-gray-500 text-sm line-clamp-3">{post.excerpt}</p>
        <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
          <span>{post.author}</span>
          <span>{post.readTime}</span>
        </div>
        <div className="mt-1 text-xs text-gray-400">{new Date(post.date).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
      </div>
    </Link>
  );
}
