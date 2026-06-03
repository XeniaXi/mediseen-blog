import type { Metadata } from 'next';
import { getAllDrafts } from '../../lib/posts';
import DraftReviewClient from '../../components/DraftReviewClient';

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
  return <DraftReviewClient drafts={drafts} />;
}
