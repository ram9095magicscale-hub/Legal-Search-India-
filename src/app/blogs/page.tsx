import type { Metadata } from 'next';
import BlogsPageClient from '@/components/blog/BlogsPageClient';

export const metadata: Metadata = {
  title: "The Legal Ledger | Insights & Guides",
  description: "Expert analysis, compliance updates, and practical guides designed to help you navigate India's corporate legal landscape safely.",
  openGraph: {
    title: "The Legal Ledger | Insights & Guides",
    description: "Expert analysis, compliance updates, and practical guides designed to help you navigate India's corporate legal landscape safely.",
    images: ["/og-image.png"],
  },
};

export default function BlogsPage() {
  return <BlogsPageClient />;
}
