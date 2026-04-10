'use client';

import { useState, useEffect } from 'react';
import { Briefcase, Eye, CheckCircle2, MessageSquare, Clock, FileText, ChevronRight, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StaffTasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [remark, setRemark] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/staff/tasks');
      if (res.ok) {
        const data = await res.json();
        setTasks(data.tasks);
      }
    } catch (err) {
      console.error('Failed to fetch tasks', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (status: string) => {
    if (!remark) {
      alert('Please add a remark before updating.');
      return;
    }
    setUpdating(true);
    try {
      const res = await fetch('/api/staff/tasks/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          orderId: selectedTask.orderId, 
          status, 
          remark,
          progress: status === 'completed' ? 100 : selectedTask.progress
        }),
      });

      if (res.ok) {
        fetchTasks();
        setShowDetail(false);
        setRemark('');
      }
    } catch (err) {
      console.error('Failed to update task', err);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-emerald-600 italic">Workload Stream</h1>
          <p className="text-zinc-500 mt-1">Execute and monitor your assigned legal protocols.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          [...Array(4)].map((_, i) => (
             <div key={i} className="h-24 bg-card/20 animate-pulse rounded-3xl border border-emerald-500/5" />
          ))
        ) : tasks.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-card/20 rounded-[40px] border border-dashed border-emerald-500/20">
             <Briefcase className="w-12 h-12 text-emerald-500/30 mx-auto" />
             <h3 className="text-xl font-bold text-muted-foreground">Queue Empty</h3>
             <p className="text-sm text-muted-foreground/60">No pending assignments found in your buffer.</p>
          </div>
        ) : (
          tasks.map((task) => (
            <motion.div 
              layout
              key={task._id}
              className="group bg-card/40 backdrop-blur-xl border border-white/5 rounded-[30px] p-6 hover:border-emerald-500/20 transition-all flex flex-col md:flex-row items-center justify-between gap-6"
            >
               <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-600">
                     <Briefcase className="w-7 h-7" />
                  </div>
                  <div>
                     <h3 className="text-lg font-black text-foreground">{task.orderName}</h3>
                     <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] text-zinc-500 font-mono">ID: {task.orderId}</span>
                        <span className="w-1 h-1 rounded-full bg-zinc-700" />
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">Client: {task.clientId?.name}</span>
                     </div>
                  </div>
               </div>

               <div className="flex items-center gap-8 w-full md:w-auto">
                  <div className="hidden lg:block text-right">
                     <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Status</p>
                     <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase border ${task.status === 'completed' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 'bg-amber-500/10 text-amber-600 border-amber-500/20'}`}>
                        {task.status}
                     </span>
                  </div>
                  <div className="flex-1 md:flex-none">
                     <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-2 text-center md:text-right">Execution</p>
                     <div className="w-32 h-2 bg-muted rounded-full overflow-hidden mx-auto md:ml-auto">
                        <div className="h-full bg-emerald-500" style={{ width: `${task.progress}%` }} />
                     </div>
                  </div>
                  <button 
                    onClick={() => { setSelectedTask(task); setShowDetail(true); }}
                    className="p-4 bg-emerald-500 text-white rounded-2xl hover:scale-110 active:scale-95 transition-all shadow-lg shadow-emerald-500/20"
                  >
                     <ChevronRight className="w-5 h-5" />
                  </button>
               </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Task Detail Modal */}
      <AnimatePresence>
        {showDetail && selectedTask && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setShowDetail(false)}
               className="absolute inset-0 bg-background/80 backdrop-blur-md"
             />
             <motion.div 
               initial={{ scale: 0.9, opacity: 0, y: 20 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.9, opacity: 0, y: 20 }}
               className="relative w-full max-w-3xl bg-card border border-emerald-500/10 rounded-[40px] shadow-2xl overflow-hidden"
             >
                <div className="p-8 border-b border-emerald-500/5 bg-emerald-500/[0.02] flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                         <FileText className="w-6 h-6" />
                      </div>
                      <div>
                         <h2 className="text-2xl font-black text-foreground italic">Task Execution</h2>
                         <p className="text-xs text-muted-foreground font-bold">{selectedTask.orderId} / {selectedTask.orderName}</p>
                      </div>
                   </div>
                   <button onClick={() => setShowDetail(false)} className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground">
                      <X className="w-6 h-6" />
                   </button>
                </div>

                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div className="space-y-8">
                      <div className="space-y-4">
                         <h3 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600 italic">Client Assets</h3>
                         <div className="space-y-3">
                            {selectedTask.clientId?.documents?.length > 0 ? selectedTask.clientId.documents.map((doc: any, i: number) => (
                               <a key={i} href={doc.fileUrl} target="_blank" className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl border border-transparent hover:border-emerald-500/20 transition-all group">
                                  <div className="flex items-center gap-3">
                                     <FileText className="w-4 h-4 text-muted-foreground group-hover:text-emerald-500" />
                                     <span className="text-xs font-bold text-foreground">{doc.fileName}</span>
                                  </div>
                                  <Eye className="w-4 h-4 text-muted-foreground group-hover:text-emerald-500" />
                               </a>
                            )) : (
                               <p className="text-xs text-muted-foreground italic">No assets uploaded by client.</p>
                            )}
                         </div>
                      </div>

                      <div className="space-y-4">
                         <h3 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600 italic">Audit Log</h3>
                         <div className="space-y-4 max-h-40 overflow-y-auto pr-2 no-scrollbar">
                            {selectedTask.remarks?.map((r: any, i: number) => (
                               <div key={i} className="p-4 bg-muted/20 rounded-2xl">
                                  <p className="text-xs text-foreground font-medium">{r.text}</p>
                                  <div className="flex justify-between items-center mt-2">
                                     <span className="text-[9px] text-muted-foreground uppercase font-black tracking-tighter">Updated by node</span>
                                     <span className="text-[9px] text-muted-foreground font-mono">{new Date(r.updatedAt).toLocaleTimeString()}</span>
                                  </div>
                               </div>
                            ))}
                         </div>
                      </div>
                   </div>

                   <div className="space-y-8">
                      <div className="space-y-4">
                         <h3 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600 italic">System Remark</h3>
                         <textarea 
                           placeholder="Type operational remark here..."
                           value={remark}
                           onChange={(e) => setRemark(e.target.value)}
                           className="w-full h-32 bg-muted/30 border border-emerald-500/10 rounded-3xl p-5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all resize-none font-medium"
                         />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                         <button 
                           onClick={() => handleUpdateStatus('in-progress')}
                           disabled={updating}
                           className="py-4 bg-amber-500/10 text-amber-600 font-black uppercase tracking-widest text-[10px] rounded-2xl border border-amber-500/20 hover:bg-amber-500 hover:text-white transition-all disabled:opacity-50"
                         >
                            Set In-Progress
                         </button>
                         <button 
                           onClick={() => handleUpdateStatus('completed')}
                           disabled={updating}
                           className="py-4 bg-emerald-500 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                         >
                            Mark Complete
                         </button>
                      </div>
                   </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
