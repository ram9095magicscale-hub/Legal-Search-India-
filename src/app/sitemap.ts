import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import connectDB from '@/lib/mongodb';
import { Blog } from '@/models/Blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;

  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/blogs',
    '/contact',
    '/career',
    '/privacy-policy',
    '/terms-of-service',
    '/refund-policy',
    '/support',
    '/login',
    '/signup',
    '/services/gst-registration',
    '/services/fssai-registration',
    '/services/trademark',
    '/services/gst-filing',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic blog routes
  let blogRoutes: any[] = [];
  try {
    await connectDB();
    const blogs = await Blog.find({}, 'slug updatedAt').lean();
    blogRoutes = blogs.map((blog: any) => ({
      url: `${baseUrl}/blogs/${blog.slug}`,
      lastModified: blog.updatedAt || new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error('Sitemap: Failed to fetch blogs', error);
  }

  return [...staticRoutes, ...blogRoutes];
}
