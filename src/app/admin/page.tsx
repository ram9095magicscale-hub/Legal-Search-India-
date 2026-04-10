'use client';

import { TrendingUp, Users, FileCheck2, AlertTriangle, ArrowUpRight, Search, Home, CreditCard, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalClients: 0,
    totalStaff: 0,
    totalOrders: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/admin/stats');
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

  const metricCards = [
    { label: "Total Revenue", val: `₹${(stats.totalRevenue / 100000).toFixed(1)}L`, trend: "Lifetime Earnings", icon: CreditCard, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Active Orders", val: stats.totalOrders.toString(), trend: "Ongoing processes", icon: FileCheck2, color: "text-rose-500", bg: "bg-rose-500/10" },
    { label: "Registered Clients", val: stats.totalClients.toString(), trend: "Total user base", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Operational Staff", val: stats.totalStaff.toString(), trend: "Active team members", icon: ShieldCheck, color: "text-primary", bg: "bg-primary/10" },
  ];

  return (
    <div className="space-y-10 pb-20">
      
      {/* Header section with minimal title */}
      <div>
        <h1 className="text-4xl font-black text-foreground tracking-tight italic">Dashboard <span className="text-primary text-2xl not-italic font-bold ml-2 opacity-50">/ Overview</span></h1>
        <p className="text-muted-foreground mt-2 font-medium">Global analytics and operational control panel.</p>
      </div>

      {/* Modern Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="bg-card border border-border/50 rounded-[32px] p-8 shadow-sm group hover:border-primary/30 transition-all duration-500 relative overflow-hidden"
          >
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6`}>
              <stat.icon className="w-6 h-6" />
            </div>
            
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-black mb-1">{stat.label}</p>
            <h3 className="text-4xl font-black text-foreground tracking-tighter mb-4">{stat.val}</h3>
            
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-tighter">{stat.trend}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Clean Activity Table */}
        <div className="xl:col-span-2 bg-card border border-border/50 rounded-[40px] overflow-hidden shadow-sm">
          <div className="p-8 border-b border-border/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <h3 className="text-2xl font-black text-foreground italic flex items-center gap-3">
                <TrendingUp className="text-primary w-6 h-6" /> Recent Activity
              </h3>
            </div>
            <div className="relative w-full md:w-80 group">
               <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
               <input type="text" placeholder="Search orders..." className="w-full bg-muted/30 border border-border/50 rounded-2xl pl-12 pr-6 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-all" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/10 border-b border-border/30 text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-black">
                  <th className="px-8 py-5">Client Name</th>
                  <th className="px-8 py-5">Service</th>
                  <th className="px-8 py-5">Workflow Status</th>
                  <th className="px-8 py-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {[
                  { name: "Rahul Sharma", email: "rahul@example.com", service: "FSSAI-Gov", status: "In Progress", tag: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
                  { name: "Priya Desai", email: "priya@corp.in", service: "Trademark", status: "Reviewing", tag: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
                  { name: "Amit Patel", email: "amit.p@gmail.com", service: "GST Filing", status: "Completed", tag: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
                  { name: "Neha Singh", email: "neha@startup.io", service: "Incorporation", status: "Pending", tag: "bg-rose-500/10 text-rose-500 border-rose-500/20" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-muted/10 transition-colors group">
                    <td className="px-8 py-6">
                      <p className="font-bold text-foreground group-hover:text-primary transition-colors">{row.name}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{row.email}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-[11px] font-bold text-muted-foreground">{row.service}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`text-[9px] font-black px-3 py-1.5 rounded-full uppercase border ${row.tag}`}>{row.status}</span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="px-5 py-2.5 bg-foreground text-background font-black text-[10px] uppercase tracking-widest rounded-xl hover:scale-105 transition-all">
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Support & Alerts Column */}
        <div className="space-y-8">
           <div className="bg-primary/5 border border-primary/20 rounded-[40px] p-8 space-y-8 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              
              <h3 className="text-xl font-black text-foreground italic flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-primary" /> Operational Status
              </h3>

              <div className="space-y-6">
                {[
                  { label: "Active Nodes", val: "Online", color: "text-emerald-500" },
                  { label: "System Load", val: "Optimal", color: "text-blue-500" },
                  { label: "Security Trace", val: "Nominal", color: "text-emerald-500" },
                ].map((node, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-background/50 rounded-[24px] border border-border/30">
                    <span className="text-xs font-bold text-muted-foreground uppercase">{node.label}</span>
                    <span className={`text-xs font-black uppercase ${node.color}`}>{node.val}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-border/30">
                 <div className="p-6 bg-rose-500/5 border border-rose-500/10 rounded-3xl">
                    <div className="flex items-center gap-3 mb-3">
                       <AlertTriangle className="w-4 h-4 text-rose-500" />
                       <span className="text-[10px] text-rose-500 font-black uppercase tracking-widest">Maintenance Alert</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed font-medium">Scheduled database optimization starting at 02:00 AM IST. All gateway services will remain active.</p>
                 </div>
              </div>
           </div>
        </div>

      </div>

    </div>
  );
}

