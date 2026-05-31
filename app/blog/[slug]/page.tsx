import { getAllPosts, getPostBySlug } from '../../../lib/posts';
import CTABanner from '../../../components/CTABanner';
import ReadingProgress from '../../../components/ReadingProgress';
import ShareButtons from '../../../components/ShareButtons';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `https://blog.mediseenhms.com/blog/${slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [post.category, 'Nigerian hospitals', 'HMS', 'MediSeen', ...post.title.split(' ').filter(w => w.length > 4)],
    authors: [{ name: post.author }],
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url,
      siteName: 'MediSeen Blog',
      locale: 'en_NG',
      publishedTime: post.date,
      authors: [post.author],
      section: post.category,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'MediSeen Health Systems Limited',
      url: 'https://mediseenhms.com',
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://blog.mediseenhms.com/blog/${slug}`,
    },
    articleSection: post.category,
    inLanguage: 'en-NG',
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Blog', item: 'https://blog.mediseenhms.com' },
      { '@type': 'ListItem', position: 2, name: post.title, item: `https://blog.mediseenhms.com/blog/${slug}` },
    ],
  };

  return (
    <>
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <article className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        {/* Back link */}
        <a href="/" className="inline-flex items-center gap-1.5 text-sm text-green-700 hover:text-green-900 font-medium mb-8 transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All articles
        </a>

        {/* Header */}
        <header className="mb-10">
          <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
            {post.category}
          </span>
          <h1 className="mt-4 text-3xl md:text-4xl lg:text-[2.75rem] font-black text-gray-900 leading-[1.15] tracking-tight">
            {post.title}
          </h1>
          <p className="mt-4 text-xl text-gray-500 leading-relaxed">{post.excerpt}</p>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-b border-gray-100 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-sm">
                {post.author.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{post.author}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>{new Date(post.date).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {post.readTime}
                  </span>
                </div>
              </div>
            </div>
            <ShareButtons title={post.title} slug={slug} />
          </div>
        </header>

        {/* Article body */}
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        {/* Bottom share */}
        <div className="mt-10 pt-6 border-t border-gray-200 flex items-center justify-between flex-wrap gap-4">
          <p className="text-sm text-gray-500">Found this useful? Share it with a colleague.</p>
          <ShareButtons title={post.title} slug={slug} />
        </div>

        <CTABanner />
      </article>
    </>
  );
}
