'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Search, Trash2, Edit3, Plus, Calendar, Tag, ExternalLink, AlertOctagon, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function BlogsManagementPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs');
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      }
    } catch (err) {
      console.error('Failed to fetch blogs', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/blogs/${deleteId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setSuccess(true);
        setBlogs(blogs.filter(b => b._id !== deleteId));
        setTimeout(() => {
          setDeleteId(null);
          setSuccess(false);
          setIsDeleting(false);
        }, 1500);
      }
    } catch (err) {
      console.error('Failed to delete blog', err);
      setIsDeleting(false);
    }
  };

  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10 pb-20 px-2 lg:px-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-foreground tracking-tight italic flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-primary" /> Blog <span className="text-muted-foreground text-2xl not-italic font-bold opacity-50">/ Management</span>
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">Create and manage insights, news, and legal guides.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative w-full md:w-80 group">
            <Search className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <input 
              type="text" 
              placeholder="Search blogs..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card border border-border/50 rounded-[28px] pl-14 pr-6 py-4 text-sm text-foreground focus:outline-none focus:border-primary/50 shadow-sm transition-all"
            />
          </div>
          
          <Link 
            href="/admin/blogs/new"
            className="bg-primary text-primary-foreground px-6 py-4 rounded-[28px] font-bold text-sm flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
          >
            <Plus className="w-5 h-5" /> <span className="hidden md:inline">Create Blog</span>
          </Link>
        </div>
      </div>

      <div className="bg-card border border-border/50 rounded-[48px] overflow-hidden shadow-sm transition-all">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/10 border-b border-border/30 text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-black">
                <th className="px-10 py-6">Article Identity</th>
                <th className="px-10 py-6">Category / Tag</th>
                <th className="px-10 py-6">Context</th>
                <th className="px-10 py-6">Published</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={5} className="px-10 py-8 h-24 bg-muted/5 shadow-inner" />
                  </tr>
                ))
              ) : filteredBlogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-10 py-32 text-center text-muted-foreground font-bold italic underline decoration-primary/20">
                    {searchQuery ? 'NO MATCHING BLOGS FOUND IN DATABASE' : 'NO BLOG ARTICLES PUBLISHED YET'}
                  </td>
                </tr>
              ) : (
                filteredBlogs.map((b) => (
                  <tr key={b._id} className="hover:bg-muted/10 transition-colors group">
                    <td className="px-10 py-7">
                      <div className="flex items-center gap-6">
                        <div className="w-20 aspect-video rounded-xl overflow-hidden bg-muted flex-shrink-0 border border-border/50 relative">
                          <img src={b.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="max-w-xs">
                          <p className="font-bold text-foreground text-base tracking-tight truncate">{b.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-50">/{b.slug}</span>
                            <Link href={`/blogs/${b.slug}`} target="_blank" className="text-primary hover:text-primary/70">
                              <ExternalLink className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-7">
                      <div className="flex items-center gap-2">
                        <Tag className="w-3.5 h-3.5 text-orange-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-orange-500 bg-orange-500/5 px-2 py-0.5 rounded-md">
                          {b.tag}
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-7">
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed max-w-[250px]">
                        {b.desc}
                      </p>
                    </td>
                    <td className="px-10 py-7">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                        <Calendar className="w-3.5 h-3.5 opacity-40" />
                        {b.date}
                      </div>
                    </td>
                    <td className="px-10 py-7 text-right">
                       <div className="flex flex-col items-end gap-2">
                        <Link 
                          href={`/admin/blogs/${b._id}`}
                          className="px-4 py-2 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 group/btn border border-primary/20"
                        >
                           <Edit3 className="w-3 h-3 group-hover/btn:scale-110 transition-transform" /> Modify Content
                        </Link>
                        <button 
                          onClick={() => setDeleteId(b._id)}
                          className="px-4 py-2 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 group/del border border-rose-500/20"
                        >
                           <Trash2 className="w-3 h-3 group-hover/del:scale-110 transition-transform" /> Delete Article
                        </button>
                       </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isDeleting && setDeleteId(null)}
              className="absolute inset-0 bg-background/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              className="relative w-full max-w-md bg-card border border-border shadow-2xl rounded-[40px] overflow-hidden text-center"
            >
              <div className="p-10 space-y-6">
                 <div className="w-20 h-20 bg-rose-500/10 rounded-[32px] flex items-center justify-center mx-auto mb-6">
                    {success ? (
                      <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                    ) : (
                      <AlertOctagon className="w-10 h-10 text-rose-500" />
                    )}
                 </div>
                 
                 <h2 className="text-3xl font-black text-foreground italic">
                    {success ? "Purged" : "Discard Insight?"}
                 </h2>
                 <p className="text-muted-foreground font-medium">
                    {success 
                      ? "The blog article has been successfully removed from the digital ecosystem." 
                      : "Deleting this blog will permanently remove it from the public Ledger. This action cannot be undone."}
                 </p>

                 {!success && (
                   <div className="flex gap-4 mt-8">
                      <button 
                        onClick={() => setDeleteId(null)}
                        disabled={isDeleting}
                        className="flex-1 py-5 bg-muted text-muted-foreground font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-muted/80 transition-all"
                      >
                         Cancel
                      </button>
                      <button 
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="flex-1 py-5 bg-rose-500 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-lg shadow-rose-500/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
                      >
                         {isDeleting ? "Shredding..." : "Confirm Delete"}
                      </button>
                   </div>
                 )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
