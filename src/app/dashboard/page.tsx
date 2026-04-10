'use client';

import { useState, useRef, useEffect } from 'react';
import { FileCheck, AlertCircle, UploadCloud, Clock, CheckCircle2, ArrowUpRight, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ClientDashboardPage() {
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeFiles: 0,
    documents: 0,
    completedOrders: 0,
    progress: 0,
    recentOrder: null as any,
    assignedAgent: null as any,
    recentDocuments: [] as any[]
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/dashboard/stats');
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error('Failed to fetch stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setSuccess(false);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', 'Other');

    try {
      const res = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
      
      // Update stats count
      setStats(prev => ({ ...prev, documents: prev.documents + 1 }));
    } catch (err) {
      alert('Upload failed. Please ensure you are logged in.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6 pb-20 px-4 md:px-0">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept=".pdf,.jpg,.jpeg,.png,.docx"
      />
      
      {/* HUD Metrics - More Compact & Professional */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Compliance Gauge - Smaller & Cleaner */}
        <div className="bg-card/40 backdrop-blur-xl border border-white/5 rounded-[32px] p-6 shadow-xl relative overflow-hidden flex items-center gap-6 group">
          <div className="relative w-20 h-20 shrink-0">
             <svg className="w-full h-full rotate-[-90deg]">
                <circle cx="40" cy="40" r="35" className="stroke-muted-foreground/10 fill-none" strokeWidth="6" />
                <circle cx="40" cy="40" r="35" className="stroke-primary fill-none shadow-glow transition-all duration-1000" strokeWidth="6" strokeDasharray="220" strokeDashoffset={220 - (220 * stats.progress / 100)} strokeLinecap="round" />
             </svg>
             <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-black text-foreground">{stats.progress}%</span>
             </div>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Compliance</p>
            <h3 className="text-sm font-bold text-foreground mt-1">Status Score</h3>
          </div>
        </div>

        {/* Regular Metric Cards - Smaller & Professional */}
        {[
          { label: "Active Files", val: stats.activeFiles.toString().padStart(2, '0'), icon: FileCheck, color: "text-primary", bg: "bg-primary/10" },
          { label: "Vaulted Docs", val: stats.documents.toString().padStart(2, '0'), icon: UploadCloud, color: "text-indigo-500", bg: "bg-indigo-500/10" },
          { 
            label: "Agent Assigned", 
            val: stats.assignedAgent?.name || "None", 
            sub: stats.assignedAgent?.phone || "Awaiting Admin",
            icon: Headphones, 
            color: "text-emerald-500", 
            bg: "bg-emerald-500/10" 
          },
        ].map((stat, i) => (
          <div key={i} className="bg-card/40 backdrop-blur-md border border-white/5 rounded-[32px] p-6 shadow-lg relative overflow-hidden group hover:border-primary/20 transition-all duration-300 flex items-center gap-5">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform shrink-0`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black truncate">{stat.label}</p>
              <h3 className="text-lg font-black text-foreground truncate">{stat.val}</h3>
              {stat.sub && <p className="text-[10px] text-muted-foreground font-bold mt-0.5">{stat.sub}</p>}
            </div>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Tracking Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-black text-foreground flex items-center gap-3">
              <span className="w-1.5 h-6 bg-primary rounded-full" /> LIVE TRACKING
            </h3>
          </div>

          <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} className="bg-card/60 backdrop-blur-2xl border border-white/10 rounded-[40px] p-6 md:p-10 shadow-2xl relative overflow-hidden">
             {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
               <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-4 py-1 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest rounded-lg">
                       {stats.recentOrder?.orderId || "NO-ORDERS"}
                    </span>
                    {stats.recentOrder?.status === 'pending' && (
                       <span className="px-4 py-1 bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase tracking-widest rounded-lg border border-amber-500/20">Action Pending</span>
                    )}
                  </div>
                  <h4 className="text-2xl md:text-3xl font-black text-foreground">
                     {stats.recentOrder?.orderName || "Start Your Filing"}
                  </h4>
                  <p className="text-muted-foreground mt-1 flex items-center gap-2 text-xs font-medium">
                    <Clock className="w-3.5 h-3.5 text-primary"/> Updated: {stats.recentOrder ? new Date(stats.recentOrder.updatedAt).toLocaleDateString() : "--"}
                  </p>
               </div>
               <div className="bg-background/40 p-4 rounded-2xl border border-white/5 text-center min-w-[120px]">
                  <div className="text-3xl font-black text-primary tracking-tighter">{stats.progress}%</div>
                  <div className="text-[10px] text-muted-foreground uppercase font-bold">Progress</div>
               </div>
             </div>

             {/* Modern Stepper - Responsive layout */}
             <div className="relative py-8">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted -translate-y-1/2 hidden md:block" />
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0 relative">
                   {[
                     { name: "Initiated", done: stats.progress >= 0 && !!stats.recentOrder },
                     { name: "Processing", done: stats.progress > 30 },
                     { name: "Verification", done: stats.progress > 70 },
                     { name: "Delivered", done: stats.progress === 100 || stats.recentOrder?.status === 'completed' },
                   ].map((step, i) => (
                      <div key={i} className="flex md:flex-col items-center gap-4 md:gap-0 z-10 w-full md:w-auto">
                         <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-700 shadow-xl ${step.done ? "bg-primary text-white scale-110" : "bg-card border-2 border-muted text-muted-foreground"}`}>
                            {step.done ? <CheckCircle2 className="w-6 h-6" /> : <div className="w-2.5 h-2.5 rounded-full bg-muted" />}
                         </div>
                         <span className={`text-[10px] uppercase tracking-widest font-black md:mt-4 transition-colors ${step.done ? "text-primary" : "text-muted-foreground"}`}>{step.name}</span>
                         {/* Vertical line for mobile */}
                         {i < 3 && <div className="md:hidden absolute left-5 top-10 w-0.5 h-8 bg-muted" />}
                      </div>
                   ))}
                </div>
             </div>

             {/* Action Banner */}
             <div className="mt-10 p-6 md:p-8 bg-gradient-to-br from-primary/5 to-transparent border border-white/10 rounded-[32px] flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex gap-4 items-center">
                   <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 shrink-0">
                      <AlertCircle className="w-7 h-7" />
                   </div>
                   <div>
                      <h5 className="text-lg font-black text-foreground leading-none">
                        {success ? "Filing Sync Complete!" : "Required Action"}
                      </h5>
                      <p className="text-xs text-muted-foreground font-medium mt-2">
                        {success ? "Documents added to your secure vault." : "Upload identity proof to accelerate processing."}
                      </p>
                   </div>
                </div>
                <button 
                  onClick={handleUploadClick}
                  disabled={uploading}
                  className={`w-full sm:w-auto px-8 py-4 font-black text-[10px] rounded-xl shadow-xl hover:scale-105 active:scale-95 transition-all uppercase tracking-[0.2em] ${success ? "bg-emerald-500 text-white" : "bg-foreground text-background"}`}
                >
                   {uploading ? "Uploading..." : success ? "Task Success ✓" : "Launch Vault →"}
                </button>
             </div>
          </motion.div>
        </div>

        {/* Document Vault Preview */}
        <div className="space-y-6">
           <h3 className="text-xl font-black text-foreground flex items-center gap-3">
              <span className="w-1.5 h-6 bg-primary rounded-full" /> VAULT
           </h3>
           <div className="grid grid-cols-1 gap-4">
              {stats.recentDocuments && stats.recentDocuments.length > 0 ? (
                stats.recentDocuments.map((doc: any, i: number) => (
                  <div key={doc._id} className="p-5 bg-card/60 backdrop-blur-xl border border-white/5 rounded-[24px] transition-all group cursor-pointer hover:border-primary/40">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-muted/30 rounded-lg flex items-center justify-center text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                             <FileCheck className="w-5 h-5" />
                          </div>
                          <div className="max-w-[120px] md:max-w-full">
                             <h5 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors truncate">{doc.fileName}</h5>
                             <p className="text-[9px] text-muted-foreground uppercase font-black mt-0.5">
                               {new Date(doc.createdAt).toLocaleDateString()}
                             </p>
                          </div>
                        </div>
                        <Link href="/dashboard/documents" className="w-8 h-8 rounded-full border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
                        </Link>
                     </div>
                  </div>
                ))
              ) : (
                <div className="p-10 text-center border border-dashed border-border rounded-[32px] bg-card/10">
                   <p className="text-xs text-muted-foreground italic">Vault is currently empty.</p>
                </div>
              )}
              <Link href="/dashboard/documents" className="w-full py-4 rounded-xl border border-dashed border-primary/30 text-primary font-black text-[10px] uppercase tracking-widest text-center hover:bg-primary/5 transition-colors mt-2">
                 Access Entire Vault
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
}
