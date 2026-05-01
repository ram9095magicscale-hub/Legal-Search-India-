import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import { Blog } from '@/models/Blog';
import ArticleClient from '@/components/blog/ArticleClient';
import { cookies } from 'next/headers';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const article = await Blog.findOne({ slug });

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: article.title,
    description: article.desc,
    openGraph: {
      title: article.title,
      description: article.desc,
      images: [article.image],
      type: 'article',
      publishedTime: article.createdAt?.toISOString(),
      authors: ['Legal Search India'],
      tags: [article.tag],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.desc,
      images: [article.image],
    },
    alternates: {
      canonical: `/blogs/${slug}`,
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  
  await connectDB();
  const article = await Blog.findOne({ slug }).lean();

  if (!article) {
    notFound();
  }

  // Admin Check (Server Side)
  const cookieStore = await cookies();
  const role = cookieStore.get('user-role')?.value;
  const isAdmin = role === 'admin' || role === 'staff';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": article.title,
            "description": article.desc,
            "image": article.image,
            "datePublished": article.createdAt?.toISOString(),
            "dateModified": article.updatedAt?.toISOString() || article.createdAt?.toISOString(),
            "author": {
              "@type": "Organization",
              "name": "Legal Search India"
            }
          })
        }}
      />
      <ArticleClient article={JSON.parse(JSON.stringify(article))} isAdmin={isAdmin} />
    </>
  );
}
