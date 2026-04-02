import { getAllPosts } from '../lib/posts';
import BlogCard from '../components/BlogCard';

export default function HomePage() {
  const posts = getAllPosts();
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <span className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full">Hospital Management Insights</span>
        <h1 className="mt-4 text-4xl md:text-5xl font-black text-gray-900 leading-tight">
          Running a Better Hospital<br />in Nigeria
        </h1>
        <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
          Practical guides on patient management, NHIS billing, digital records, and growing your clinic — from the team behind MediSeen HMS.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <a href="https://app.mediseenhms.com/register" className="bg-green-800 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition">
            Try MediSeen Free
          </a>
          <a href="#articles" className="text-green-800 px-6 py-3 rounded-lg font-bold hover:underline">
            Read Articles ↓
          </a>
        </div>
      </div>

      {/* Articles Grid */}
      <div id="articles">
        {posts.length === 0 ? (
          <p className="text-center text-gray-400 py-20">Articles coming soon...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => <BlogCard key={post.slug} post={post} />)}
          </div>
        )}
      </div>
    </div>
  );
}
