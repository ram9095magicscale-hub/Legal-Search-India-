'use client';

import { useState, useEffect } from 'react';
import { Briefcase, Search, Trash2, Edit3, Plus, MapPin, Building2, AlertOctagon, CheckCircle2, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function JobsManagementPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch('/api/jobs');
      if (res.ok) {
        const data = await res.json();
        setJobs(data);
      }
    } catch (err) {
      console.error('Failed to fetch jobs', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/jobs/${deleteId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setSuccess(true);
        setJobs(jobs.filter(j => j._id !== deleteId));
        setTimeout(() => {
          setDeleteId(null);
          setSuccess(false);
          setIsDeleting(false);
        }, 1500);
      }
    } catch (err) {
      console.error('Failed to delete job', err);
      setIsDeleting(false);
    }
  };

  const filteredJobs = jobs.filter(j => 
    j.role.toLowerCase().includes(searchQuery.toLowerCase()) || 
    j.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10 pb-20 px-2 lg:px-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-foreground tracking-tight italic flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-indigo-500" /> Career <span className="text-muted-foreground text-2xl not-italic font-bold opacity-50">/ Hub</span>
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">Post openings, manage applications, and scout legal talent.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative w-full md:w-80 group">
            <Search className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-indigo-500" />
            <input 
              type="text" 
              placeholder="Search roles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card border border-border/50 rounded-[28px] pl-14 pr-6 py-4 text-sm text-foreground focus:outline-none focus:border-indigo-500/50 shadow-sm transition-all"
            />
          </div>
          
          <Link 
            href="/admin/jobs/new"
            className="bg-indigo-600 text-white px-6 py-4 rounded-[28px] font-bold text-sm flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-indigo-500/20"
          >
            <Plus className="w-5 h-5" /> <span className="hidden md:inline">Post Role</span>
          </Link>
        </div>
      </div>

      <div className="bg-card border border-border/50 rounded-[48px] overflow-hidden shadow-sm transition-all">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/10 border-b border-border/30 text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-black">
                <th className="px-10 py-6">Position</th>
                <th className="px-10 py-6">Department</th>
                <th className="px-10 py-6">Location / Type</th>
                <th className="px-10 py-6">Hiring Status</th>
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
              ) : filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-10 py-32 text-center text-muted-foreground font-bold italic underline decoration-indigo-500/20">
                    {searchQuery ? 'NO MATCHING ROLES FOUND' : 'NO ACTIVE JOB OPENINGS'}
                    {!searchQuery && (
                      <div className="mt-4">
                        <Link href="/api/jobs/migrate" className="text-indigo-500 text-xs hover:underline decoration-indigo-500">
                          Click here to migrate initial mock jobs
                        </Link>
                      </div>
                    )}
                  </td>
                </tr>
              ) : (
                filteredJobs.map((j) => (
                  <tr key={j._id} className="hover:bg-muted/10 transition-colors group">
                    <td className="px-10 py-7">
                      <div>
                        <p className="font-bold text-foreground text-base tracking-tight truncate group-hover:text-indigo-500 transition-colors">{j.role}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Link href="/career" target="_blank" className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-indigo-500 font-bold uppercase tracking-widest transition-colors">
                            <ExternalLink className="w-3 h-3" /> View Publicly
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-7">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-3.5 h-3.5 text-indigo-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 bg-indigo-500/5 px-2 py-0.5 rounded-md">
                          {j.department}
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-7">
                      <div className="space-y-1">
                        <p className="text-xs text-foreground font-bold flex items-center gap-1.5"><MapPin className="w-3 h-3 text-muted-foreground"/> {j.location}</p>
                        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">{j.type}</p>
                      </div>
                    </td>
                    <td className="px-10 py-7">
                      <span className={`text-[9px] font-black px-3 py-1.5 rounded-full uppercase border ${
                        j.status === 'Open' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                        j.status === 'Closed' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' :
                        'bg-muted text-muted-foreground border-border/20'
                      }`}>
                        {j.status}
                      </span>
                    </td>
                    <td className="px-10 py-7 text-right">
                       <div className="flex flex-col items-end gap-2">
                        <Link 
                          href={`/admin/jobs/${j._id}`}
                          className="px-4 py-2 rounded-xl bg-indigo-500/10 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 group/btn border border-indigo-500/20"
                        >
                           <Edit3 className="w-3 h-3 group-hover/btn:scale-110 transition-transform" /> Modify Opening
                        </Link>
                        <button 
                          onClick={() => setDeleteId(j._id)}
                          className="px-4 py-2 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 group/del border border-rose-500/20"
                        >
                           <Trash2 className="w-3 h-3 group-hover/del:scale-110 transition-transform" /> Shred Career
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
                    {success ? "Shredded" : "Terminate Opening?"}
                 </h2>
                 <p className="text-muted-foreground font-medium">
                    {success 
                      ? "The position has been successfully removed from the career ledger." 
                      : "Shredding this position will permanently remove it from the career page. This action cannot be reversed."}
                 </p>

                 {!success && (
                   <div className="flex gap-4 mt-8">
                      <button 
                        onClick={() => setDeleteId(null)}
                        disabled={isDeleting}
                        className="flex-1 py-5 bg-muted text-muted-foreground font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-muted/80 transition-all"
                      >
                         Preserve
                      </button>
                      <button 
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="flex-1 py-5 bg-rose-500 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-lg shadow-rose-500/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
                      >
                         {isDeleting ? "Shredding..." : "Confirm Shred"}
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
