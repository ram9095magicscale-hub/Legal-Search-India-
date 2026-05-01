'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import BlogEditor from '@/components/admin/BlogEditor';
import { Loader2 } from 'lucide-react';

export default function EditBlogPage() {
  const params = useParams();
  const id = params.id as string;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        if (res.ok) {
          const data = await res.json();
          setBlog(data);
        }
      } catch (err) {
        console.error('Failed to fetch blog', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="text-sm font-black uppercase tracking-widest text-muted-foreground animate-pulse">Retrieving Manuscript...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-xl font-black text-rose-500 italic uppercase">Manuscript Not Found</p>
        <p className="text-muted-foreground">The requested blog article does not exist in our ledger.</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-black text-foreground tracking-tight italic">
          Refine <span className="text-muted-foreground text-2xl not-italic font-bold opacity-50">/ Edit Insight</span>
        </h1>
        <p className="text-muted-foreground mt-2 font-medium">Updating the architectural details of your published knowledge.</p>
      </div>

      <BlogEditor initialData={blog} isEditing={true} />
    </div>
  );
}
