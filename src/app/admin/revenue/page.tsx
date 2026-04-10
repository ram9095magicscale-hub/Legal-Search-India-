'use client';

import { useState, useEffect } from 'react';
import { IndianRupee, TrendingUp, ArrowUpRight, ArrowDownRight, CreditCard, Activity, Calendar, Download, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RevenuePage() {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [stats, setStats] = useState({
    grossRevenue: 0,
    activeSubs: 0,
    pendingDues: 0,
    conversion: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [transRes, statsRes] = await Promise.all([
        fetch('/api/admin/transactions'),
        fetch('/api/admin/stats')
      ]);

      if (transRes.ok && statsRes.ok) {
        const transData = await transRes.json();
        const statsData = await statsRes.json();
        
        setTransactions(transData.transactions);
        setStats({
          grossRevenue: statsData.totalRevenue,
          activeSubs: statsData.totalOrders, // Using orders as subs for now
          pendingDues: 0, // Placeholder
          conversion: 68 // Placeholder
        });
      }
    } catch (err) {
      console.error('Failed to sync revenue data', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-foreground tracking-tight italic flex items-center gap-3 text-amber-500">
            <IndianRupee className="w-10 h-10" /> Revenue <span className="text-muted-foreground text-2xl not-italic font-bold opacity-50">/ Accounts</span>
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">Financial ledger and transaction analytics.</p>
        </div>
        
        <div className="flex items-center gap-4">
           <button className="flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-xl font-bold text-sm hover:bg-muted transition-all">
              <Calendar className="w-4 h-4" /> This Quarter
           </button>
           <button className="flex items-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all">
              <Download className="w-4 h-4" /> Export Ledger
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: "Gross Revenue", val: "₹1,24,500", trend: "+12.4%", up: true, icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
           { label: "Active Services", val: "42", trend: "+5.2%", up: true, icon: Activity, color: "text-blue-500", bg: "bg-blue-500/10" },
           { label: "Pending Dues", val: "₹12,000", trend: "-2.1%", up: false, icon: ArrowDownRight, color: "text-rose-500", bg: "bg-rose-500/10" },
           { label: "Conversion", val: "68%", trend: "+3.8%", up: true, icon: ArrowUpRight, color: "text-amber-500", bg: "bg-amber-500/10" },
         ].map((stat, i) => (
           <motion.div 
             key={i}
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: i * 0.1 }}
             className="bg-card border border-border rounded-[32px] p-6 shadow-sm group hover:border-amber-500/20 transition-all"
           >
              <div className="flex justify-between items-start mb-4">
                 <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6" />
                 </div>
                 <div className={`flex items-center gap-1 text-[10px] font-black ${stat.up ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {stat.trend} {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                 </div>
              </div>
              <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{stat.label}</p>
              <h3 className="text-2xl font-black text-foreground mt-1">{stat.val}</h3>
           </motion.div>
         ))}
      </div>

      <div className="bg-card border border-border rounded-[40px] overflow-hidden shadow-sm">
         <div className="p-8 border-b border-border flex items-center justify-between bg-card/50">
            <h2 className="text-xl font-black text-foreground">Recent Transactions</h2>
            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
               <Filter className="w-5 h-5 text-muted-foreground" />
            </button>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-muted/30">
                     <th className="px-8 py-5 text-[10px] font-black uppercase text-muted-foreground tracking-widest">Client</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase text-muted-foreground tracking-widest">Service</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase text-muted-foreground tracking-widest">Status</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase text-muted-foreground tracking-widest">Amount</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase text-muted-foreground tracking-widest text-right">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-border/50">
                  {transactions.length > 0 ? (
                    transactions.map((t: any) => (
                      <tr key={t._id} className="hover:bg-muted/20 transition-colors group">
                         <td className="px-8 py-6">
                            <p className="font-bold text-foreground">{t.clientId?.name || 'Anonymous'}</p>
                            <p className="text-[10px] text-muted-foreground">{t.clientId?.email || 'No Email'}</p>
                         </td>
                         <td className="px-8 py-6">
                            <span className="px-3 py-1 bg-primary/5 text-primary text-[10px] font-black uppercase rounded-full border border-primary/10">{t.description || 'Service Payment'}</span>
                         </td>
                         <td className="px-8 py-6">
                            <div className="flex items-center gap-2">
                               <div className={`w-1.5 h-1.5 rounded-full ${t.status === 'success' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                               <span className={`text-xs font-bold ${t.status === 'success' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                 {t.status === 'success' ? 'Success' : 'Failed'}
                               </span>
                            </div>
                         </td>
                         <td className="px-8 py-6 font-black text-foreground">₹{t.amount}</td>
                         <td className="px-8 py-6 text-right">
                            <button className="p-3 bg-muted rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-primary/10 hover:text-primary">
                               <Download className="w-4 h-4" />
                            </button>
                         </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                       <td colSpan={5} className="px-8 py-20 text-center text-muted-foreground italic font-medium opacity-50">
                          No transactions found in the current ledger.
                       </td>
                    </tr>
                  )}
               </tbody>
            </table>
         </div>
         <div className="p-8 text-center bg-muted/10 border-t border-border">
            <button className="text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:underline">View Full Statement</button>
         </div>
      </div>
    </div>
  );
}
