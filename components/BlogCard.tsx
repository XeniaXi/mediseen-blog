import Link from 'next/link';

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
}

const categoryConfig: Record<string, { color: string; gradient: string; icon: string }> = {
  'Hospital Management': { color: 'bg-green-100 text-green-800', gradient: 'card-pattern-green', icon: '🏥' },
  'Billing & Finance': { color: 'bg-yellow-100 text-yellow-800', gradient: 'card-pattern-yellow', icon: '💰' },
  'Technology': { color: 'bg-blue-100 text-blue-800', gradient: 'card-pattern-blue', icon: '💻' },
  'NHIS & Insurance': { color: 'bg-purple-100 text-purple-800', gradient: 'card-pattern-purple', icon: '🛡️' },
  'Staff Management': { color: 'bg-orange-100 text-orange-800', gradient: 'card-pattern-orange', icon: '👥' },
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function BlogCard({ post }: { post: Post }) {
  const config = categoryConfig[post.category] || { color: 'bg-gray-100 text-gray-800', gradient: 'card-pattern-green', icon: '📄' };

  return (
    <Link href={`/blog/${post.slug}`}
          className="group block bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1">
      {/* Gradient header with icon */}
      <div className={`${config.gradient} h-32 relative flex items-center justify-center`}>
        <span className="text-5xl opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-300">
          {config.icon}
        </span>
        <div className="absolute top-3 right-3">
          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-gray-700`}>
            {post.category}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h2 className="text-lg font-bold text-gray-900 group-hover:text-green-700 transition leading-snug line-clamp-2">
          {post.title}
        </h2>
        <p className="mt-2 text-gray-500 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>

        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-[10px]">
              {post.author.split(' ').map(w => w[0]).join('').slice(0, 2)}
            </div>
            <span className="font-medium text-gray-600">{post.author}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>{formatDate(post.date)}</span>
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.readTime}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
