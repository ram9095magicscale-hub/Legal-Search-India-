'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import JobEditor from '@/components/admin/JobEditor';
import { Loader2 } from 'lucide-react';

export default function EditJobPage() {
  const params = useParams();
  const id = params.id as string;
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        if (res.ok) {
          const data = await res.json();
          setJob(data);
        }
      } catch (err) {
        console.error('Failed to fetch job', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary opacity-50" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-muted-foreground">Opening Not Found</h2>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-black text-foreground tracking-tight italic">
          Modify <span className="text-indigo-500">Position</span>
        </h1>
        <p className="text-muted-foreground mt-2 font-medium">Fine-tune the requirements and scale your workforce.</p>
      </div>

      <JobEditor initialData={job} isEditing />
    </div>
  );
}
