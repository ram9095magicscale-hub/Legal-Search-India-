import JobEditor from '@/components/admin/JobEditor';

export default function NewJobPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-black text-foreground tracking-tight italic">
          New <span className="text-indigo-500">Opening</span>
        </h1>
        <p className="text-muted-foreground mt-2 font-medium">Define a new mission and scout the next legal innovator.</p>
      </div>

      <JobEditor />
    </div>
  );
}
