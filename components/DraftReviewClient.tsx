'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import type { Post } from '../lib/posts';

const repoUrl = 'https://github.com/XeniaXi/mediseen-blog';
const reviewPassword = '1965';

export default function DraftReviewClient({ drafts }: { drafts: Post[] }) {
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState('');
  const [copiedFilename, setCopiedFilename] = useState<string | null>(null);

  useEffect(() => {
    setUnlocked(window.sessionStorage.getItem('mediseen-blog-drafts-unlocked') === 'true');
  }, []);

  const unlock = () => {
    if (password.trim() !== reviewPassword) {
      setError('Incorrect password.');
      return;
    }

    window.sessionStorage.setItem('mediseen-blog-drafts-unlocked', 'true');
    setUnlocked(true);
    setError('');
  };

  const approveDraft = async (filename?: string) => {
    if (!filename) return;

    try {
      await navigator.clipboard.writeText(filename);
      setCopiedFilename(filename);
      setTimeout(() => setCopiedFilename(null), 3000);
    } catch {
      setCopiedFilename(filename);
    }

    window.open(`${repoUrl}/actions/workflows/publish-blog-draft.yml`, '_blank', 'noopener,noreferrer');
  };

  if (!unlocked) {
    return (
      <main className="mx-auto flex min-h-[65vh] max-w-md items-center px-4 py-12">
        <div className="w-full rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-green-700">Private review area</p>
          <h1 className="mt-2 text-2xl font-black text-gray-900">Enter Review Password</h1>
          <p className="mt-2 text-sm text-gray-500">
            This protects unpublished MediSeen blog drafts from casual visitors.
          </p>
          <input
            type="password"
            inputMode="numeric"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') unlock();
            }}
            className="mt-5 w-full rounded-xl border border-gray-200 px-4 py-3 text-lg outline-none ring-green-200 focus:ring-4"
            placeholder="Password"
            autoFocus
          />
          {error && <p className="mt-2 text-sm font-semibold text-red-600">{error}</p>}
          <button
            type="button"
            onClick={unlock}
            className="mt-4 w-full rounded-xl bg-green-800 px-5 py-3 font-bold text-white hover:bg-green-700"
          >
            View Drafts
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8 rounded-2xl border border-green-100 bg-green-50 p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-green-700">Private review area</p>
        <h1 className="mt-2 text-3xl font-black text-gray-900">Blog Drafts</h1>
        <p className="mt-2 text-gray-600">
          Read drafts here before they are published. This page is hidden from search engines and the public navigation.
        </p>
        <div className="mt-4 grid gap-2 text-sm text-gray-700">
          <p><strong>To edit:</strong> tap <strong>Edit</strong>, make changes in GitHub, then commit.</p>
          <p><strong>To publish:</strong> tap <strong>Approve & Publish</strong>. The filename will be copied for the GitHub workflow.</p>
        </div>
      </div>

      {drafts.length === 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center">
          <p className="text-lg font-bold text-gray-900">No drafts waiting right now.</p>
          <p className="mt-2 text-gray-500">Daily generated drafts will appear here after the automation creates them.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {drafts.map(draft => (
            <article key={draft.slug} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 border-b border-gray-100 pb-5 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-green-700">{draft.category}</p>
                  <h2 className="mt-2 text-2xl font-black text-gray-900">{draft.title}</h2>
                  <p className="mt-2 text-gray-500">{draft.excerpt}</p>
                  <p className="mt-3 text-xs text-gray-400">
                    {draft.filename} - {draft.author} - {draft.readTime}
                  </p>
                  {copiedFilename === draft.filename && (
                    <p className="mt-2 text-sm font-semibold text-green-700">
                      Filename copied. Paste it into the workflow field and tap Run workflow.
                    </p>
                  )}
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <a
                    href={`${repoUrl}/edit/main/content/drafts/${draft.filename}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50"
                  >
                    Edit
                  </a>
                  <button
                    type="button"
                    onClick={() => approveDraft(draft.filename)}
                    className="rounded-lg bg-green-800 px-4 py-2 text-sm font-bold text-white hover:bg-green-700"
                  >
                    Approve & Publish
                  </button>
                </div>
              </div>
              {draft.keywords.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {draft.keywords.slice(0, 10).map(keyword => (
                    <span key={keyword} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                      {keyword}
                    </span>
                  ))}
                </div>
              )}
              <div className="prose prose-green mt-6 max-w-none">
                <ReactMarkdown>{draft.content}</ReactMarkdown>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
