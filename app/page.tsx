import { getAllPosts } from '../lib/posts';
import BlogCard from '../components/BlogCard';
import NewsletterForm from '../components/NewsletterForm';

export default function HomePage() {
  const posts = getAllPosts();
  const categories = [...new Set(posts.map(p => p.category))];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-16 animate-fade-in">
        <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
          🏥 Hospital Management Insights
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
          Running a Better Hospital<br className="hidden sm:block" /> in Nigeria
        </h1>
        <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Practical guides on patient management, NHIS billing, digital records, and growing your clinic — from the team behind MediSeen HMS.
        </p>
        <div className="mt-8 flex gap-4 justify-center flex-wrap">
          <a href="https://app.mediseenhms.com/register"
             className="bg-green-800 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 hover:scale-105 transition-all shadow-lg">
            Try MediSeen Free
          </a>
          <a href="#articles"
             className="text-green-800 px-6 py-3 rounded-xl font-bold hover:bg-green-50 transition border border-green-200">
            Read Articles ↓
          </a>
        </div>
      </div>

      {/* Categories */}
      <div id="articles" className="mb-8 animate-fade-in-delay-1">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
            <p className="text-gray-500 text-sm mt-1">{posts.length} articles across {categories.length} categories</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <span key={cat} className="text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="animate-fade-in-delay-2">
        {posts.length === 0 ? (
          <p className="text-center text-gray-400 py-20">Articles coming soon...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => <BlogCard key={post.slug} post={post} />)}
          </div>
        )}
      </div>

      {/* Newsletter */}
      <NewsletterForm />
    </div>
  );
}
