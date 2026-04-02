export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <span className="text-6xl mb-6 block">🔍</span>
      <h1 className="text-4xl font-black text-gray-900 mb-4">Page Not Found</h1>
      <p className="text-xl text-gray-500 mb-8">
        The article you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <a href="/"
         className="inline-flex items-center gap-2 bg-green-800 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Articles
      </a>
    </div>
  );
}
