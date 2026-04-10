'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Clock, CheckCircle2, AlertCircle, ArrowRight, Activity, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function StaffDashboard() {
  const [stats, setStats] = useState({
    todayTasks: 0,
    pendingTasks: 0,
    completedTasks: 0,
    efficiency: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/staff/stats');
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

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-foreground italic">Operation Stats</h1>
          <p className="text-muted-foreground mt-1">Real-time overview of your assigned workflows.</p>
        </div>
        <div className="flex items-center gap-3 bg-card border border-emerald-500/10 px-6 py-3 rounded-2xl shadow-sm">
          <Calendar className="w-5 h-5 text-emerald-600" />
          <span className="font-bold text-sm">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Today's Tasks", val: stats.todayTasks, icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
          { label: "Pending Tasks", val: stats.pendingTasks, icon: AlertCircle, color: "text-rose-500", bg: "bg-rose-500/10" },
          { label: "Completed", val: stats.completedTasks, icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { label: "Efficiency", val: `${stats.efficiency}%`, icon: Activity, color: "text-indigo-500", bg: "bg-indigo-500/10" },
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="bg-card/40 backdrop-blur-xl border border-white/5 rounded-[30px] p-8 shadow-xl relative overflow-hidden group hover:border-emerald-500/20 transition-all"
          >
            <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6`}>
              <stat.icon className="w-7 h-7" />
            </div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-black mb-1">{stat.label}</p>
            <h3 className="text-4xl font-black text-foreground">{stat.val}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <h3 className="text-2xl font-black text-foreground italic flex items-center gap-3">
             <Briefcase className="w-6 h-6 text-emerald-600" /> Priority Assignments
          </h3>
          
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="bg-card/40 backdrop-blur-xl border border-white/5 rounded-[30px] p-6 hover:border-emerald-500/20 transition-all group">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-600 font-bold">
                       #ORD-{1000 + i}
                    </div>
                    <div>
                       <h4 className="font-bold text-foreground group-hover:text-emerald-600 transition-colors">ITR Filing - Individual</h4>
                       <p className="text-xs text-muted-foreground font-medium">Assigned to push: Rahul Sharma</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="flex-1 md:flex-none">
                       <span className="px-4 py-1.5 bg-amber-500/10 text-amber-600 text-[10px] font-black uppercase rounded-full border border-amber-500/20">In Progress</span>
                    </div>
                    <Link href="/staff/tasks" className="p-3 bg-muted/50 rounded-xl hover:bg-emerald-500 hover:text-white transition-all">
                       <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
           <h3 className="text-2xl font-black text-foreground italic">Task Breakdown</h3>
           <div className="bg-card/40 backdrop-blur-xl border border-white/5 rounded-[40px] p-8 shadow-xl">
             <div className="space-y-6">
                {[
                  { label: "Taxation", count: 12, color: "bg-emerald-500" },
                  { label: "GST Compliance", count: 8, color: "bg-amber-500" },
                  { label: "IPR / Trademark", count: 4, color: "bg-indigo-500" },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                       <span className="text-foreground">{item.label}</span>
                       <span className="text-muted-foreground">{item.count} Tasks</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                       <div className={`h-full ${item.color}`} style={{ width: `${(item.count/24)*100}%` }} />
                    </div>
                  </div>
                ))}
             </div>
             <div className="mt-10 pt-8 border-t border-white/5 text-center">
                <p className="text-xs text-muted-foreground font-medium">Total workload: <span className="text-foreground font-black">24 Active Files</span></p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
