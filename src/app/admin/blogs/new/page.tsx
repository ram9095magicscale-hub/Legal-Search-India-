import BlogEditor from '@/components/admin/BlogEditor';

export default function NewBlogPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-black text-foreground tracking-tight italic">
          Draft <span className="text-muted-foreground text-2xl not-italic font-bold opacity-50">/ New Insight</span>
        </h1>
        <p className="text-muted-foreground mt-2 font-medium">Capture your expertise and prepare it for the digital ledger.</p>
      </div>

      <BlogEditor />
    </div>
  );
}
