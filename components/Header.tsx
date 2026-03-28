export default function Header() {
  return (
    <header className="bg-green-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-green-900 font-black text-sm">M</div>
          <span className="font-bold text-lg">MediSeen Blog</span>
        </a>
        <nav className="flex items-center gap-6 text-sm">
          <a href="/" className="text-green-200 hover:text-white transition">Articles</a>
          <a href="https://mediseenhms.com" className="text-green-200 hover:text-white transition">About MediSeen</a>
          <a href="https://app.mediseenhms.com/register"
             className="bg-yellow-400 text-green-900 px-4 py-2 rounded-lg font-bold hover:bg-yellow-300 transition text-sm">
            Free Trial
          </a>
        </nav>
      </div>
    </header>
  );
}
