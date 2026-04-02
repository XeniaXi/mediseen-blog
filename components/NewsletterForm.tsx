'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <div className="mt-16 bg-white border border-gray-200 rounded-2xl p-8 md:p-10 text-center shadow-sm">
      <span className="text-2xl mb-2 block">📬</span>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Stay Updated</h3>
      <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
        Get hospital management tips, NHIS guides, and MediSeen updates delivered to your inbox.
      </p>
      {submitted ? (
        <div className="bg-green-50 text-green-700 rounded-xl px-6 py-4 inline-block font-medium">
          ✅ Thanks! We&apos;ll keep you posted.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto flex-col sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none text-sm"
          />
          <button type="submit"
                  className="bg-green-800 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition text-sm whitespace-nowrap">
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
}
