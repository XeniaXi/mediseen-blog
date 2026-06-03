import type { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import { getAllDrafts } from '../../lib/posts';

const repoUrl = 'https://github.com/XeniaXi/mediseen-blog';

export const metadata: Metadata = {
  title: 'Draft Review - MediSeen Blog',
  description: 'Review unpublished MediSeen blog drafts.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DraftReviewPage() {
  const drafts = getAllDrafts();

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8 rounded-2xl border border-green-100 bg-green-50 p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-green-700">Private review area</p>
        <h1 className="mt-2 text-3xl font-black text-gray-900">Blog Drafts</h1>
        <p className="mt-2 text-gray-600">
          Read drafts here before they are published. This page is hidden from search engines and the public navigation.
        </p>
        <div className="mt-4 grid gap-2 text-sm text-gray-700">
          <p><strong>To edit:</strong> open the draft in GitHub, make changes, then commit.</p>
          <p><strong>To publish:</strong> run the "Publish blog draft" action and enter the draft filename.</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={`${repoUrl}/tree/main/content/drafts`}
            className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-green-800 ring-1 ring-green-200 hover:bg-green-100"
          >
            Open drafts in GitHub
          </a>
          <a
            href={`${repoUrl}/actions/workflows/publish-blog-draft.yml`}
            className="rounded-lg bg-green-800 px-4 py-2 text-sm font-bold text-white hover:bg-green-700"
          >
            Publish approved draft
          </a>
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
                    {draft.filename} · {draft.author} · {draft.readTime}
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <a
                    href={`${repoUrl}/edit/main/content/drafts/${draft.filename}`}
                    className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50"
                  >
                    Edit
                  </a>
                  <a
                    href={`${repoUrl}/actions/workflows/publish-blog-draft.yml`}
                    className="rounded-lg bg-green-800 px-3 py-2 text-sm font-bold text-white hover:bg-green-700"
                  >
                    Approve
                  </a>
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
