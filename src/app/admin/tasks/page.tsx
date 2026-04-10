'use client';

import { useState, useEffect } from 'react';
import { ClipboardList, Clock, CheckCircle2, AlertCircle, PlayCircle, MoreHorizontal, User, Tag, Plus, Filter, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TaskTrackerPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/admin/orders');
      if (res.ok) {
        const data = await res.json();
        setTasks(data.orders);
      }
    } catch (err) {
      console.error('Task fetch failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-foreground tracking-tight italic flex items-center gap-3 text-purple-500">
            <ClipboardList className="w-10 h-10" /> Task <span className="text-muted-foreground text-2xl not-italic font-bold opacity-50">/ Tracker</span>
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">Real-time monitoring and task management.</p>
        </div>
        
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-6 py-4 bg-foreground text-background font-black text-[10px] uppercase tracking-widest rounded-3xl shadow-xl hover:scale-105 active:scale-95 transition-all">
              <Plus className="w-4 h-4" /> New Task
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between mb-2">
               <div className="flex items-center gap-4">
                  <span className="text-xs font-black uppercase text-muted-foreground tracking-widest">Ongoing Tasks</span>
                  <div className="px-3 py-1 bg-purple-500/10 text-purple-500 rounded-full text-[10px] font-black">{tasks.length} Tasks</div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="relative">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                     <input placeholder="Filter tasks..." className="pl-9 pr-4 py-2 bg-card border border-border rounded-xl text-xs w-48 outline-none" />
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
               {loading ? (
                 [...Array(3)].map((_, i) => (
                   <div key={i} className="h-32 bg-card animate-pulse rounded-[28px] border border-border" />
                 ))
               ) : tasks.length > 0 ? (
                 tasks.map((task) => (
                   <motion.div 
                     key={task._id}
                     whileHover={{ x: 10 }}
                     className="bg-card border border-border rounded-[28px] p-6 shadow-sm group hover:border-purple-500/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                   >
                      <div className="flex items-center gap-6">
                         <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${task.status === 'in-progress' ? 'bg-amber-500/10 text-amber-500' : 'bg-muted text-muted-foreground'}`}>
                            {task.status === 'in-progress' ? <PlayCircle className="w-7 h-7 animate-pulse" /> : <Clock className="w-7 h-7" />}
                         </div>
                         <div>
                            <p className="text-[10px] font-black text-purple-500 uppercase tracking-widest mb-1">{task.orderId}</p>
                            <h4 className="text-lg font-black text-foreground">{task.orderName}</h4>
                            <div className="flex items-center gap-3 mt-1">
                               <span className="text-[10px] font-medium text-muted-foreground flex items-center gap-1"><User className="w-3 h-3" /> {task.clientId?.name || 'User'}</span>
                               <span className="text-[10px] font-black uppercase tracking-tighter text-emerald-500 bg-emerald-500/5 px-2 rounded-full">{task.status}</span>
                            </div>
                         </div>
                      </div>

                      <div className="flex items-center gap-8 pl-14 md:pl-0">
                         <div className="text-center min-w-[100px]">
                            <p className="text-[9px] font-black text-muted-foreground uppercase opacity-50">Assignee</p>
                            <p className="text-xs font-bold text-foreground mt-1">{task.staffId?.name || 'Unassigned'}</p>
                         </div>
                         <div className="text-center min-w-[80px]">
                            <p className="text-[9px] font-black text-muted-foreground uppercase opacity-50">Progress</p>
                            <p className="text-xs font-black text-primary mt-1 italic">{task.progress}%</p>
                         </div>
                         <button className="p-3 bg-muted rounded-xl hover:bg-muted-foreground/10 transition-colors">
                            <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                         </button>
                      </div>
                   </motion.div>
                 ))
               ) : (
                 <div className="py-20 bg-card border border-border border-dashed rounded-[32px] text-center opacity-50 italic">
                    All queues are currently clear. No pending tasks.
                 </div>
               )}
            </div>
         </div>

         <div className="space-y-6">
            <h3 className="text-lg font-black text-foreground uppercase tracking-tight italic">System Metrics</h3>
            <div className="bg-card border border-border rounded-[32px] p-6 space-y-6 shadow-sm">
               <div>
                  <div className="flex justify-between items-center mb-2">
                     <span className="text-xs font-black text-muted-foreground uppercase">Task Load</span>
                     <span className="text-xs font-black text-primary">72%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                     <div className="w-[72%] h-full bg-primary" />
                  </div>
               </div>
               
               <div className="space-y-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span className="text-xs font-bold text-muted-foreground">Completed Today</span>
                     </div>
                     <span className="text-xs font-black text-foreground">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <AlertCircle className="w-4 h-4 text-rose-500" />
                        <span className="text-xs font-bold text-muted-foreground">Bottlenecks</span>
                     </div>
                     <span className="text-xs font-black text-rose-500">03</span>
                  </div>
               </div>
            </div>

            <div className="p-8 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-[32px] text-white shadow-xl shadow-purple-500/20 relative overflow-hidden group">
               <div className="relative z-10">
                  <h4 className="text-xl font-black italic">Efficiency Report</h4>
                  <p className="text-xs font-medium opacity-80 mt-2">Team performance is up by 15% this week.</p>
                  <button className="mt-6 px-6 py-3 bg-white text-purple-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-purple-50 transition-all">Download PDF</button>
               </div>
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[50px] rounded-full translate-x-1/2 -translate-y-1/2" />
            </div>
         </div>
      </div>
    </div>
  );
}
