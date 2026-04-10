'use client';

import { useState, useEffect } from 'react';
import { CreditCard, ArrowUpRight, ArrowDownLeft, Search, Calendar, Filter, Download, Zap, TrendingUp, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, daily, monthly, yearly

  useEffect(() => {
    fetchTransactions();
  }, [filter]);

  const fetchTransactions = async () => {
    try {
      const res = await fetch(`/api/admin/transactions?filter=${filter}`);
      if (res.ok) {
        const data = await res.json();
        setTransactions(data.transactions);
      }
    } catch (err) {
      console.error('Failed to fetch transactions', err);
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = transactions.reduce((sum, t) => sum + (t.status === 'success' ? t.amount : 0), 0);

  return (
    <div className="space-y-10 pb-20 px-2 lg:px-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-foreground tracking-tight italic flex items-center gap-3">
            <CreditCard className="w-8 h-8 text-primary" /> Transactions <span className="text-muted-foreground text-2xl not-italic font-bold opacity-50">/ Ledger</span>
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">Monitor and audit all fiscal operations.</p>
        </div>
        <div className="flex items-center gap-2 bg-muted/50 border border-border/50 p-2 rounded-2xl shadow-sm">
           {['all', 'daily', 'monthly', 'yearly'].map((f) => (
             <button 
               key={f}
               onClick={() => setFilter(f)}
               className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-muted-foreground hover:text-foreground'}`}
             >
               {f}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: "Total Revenue", val: `₹${totalAmount.toLocaleString()}`, icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { label: "Success Rate", val: "99.2%", icon: Zap, color: "text-amber-500", bg: "bg-amber-500/10" },
          { label: "Avg. Ticket", val: "₹1,240", icon: TrendingUp, color: "text-rose-500", bg: "bg-rose-500/10" },
        ].map((stat, i) => (
          <div key={i} className="bg-card border border-border/50 rounded-[40px] p-8 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
            <div className="flex items-center gap-4 mb-6">
               <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} shadow-inner`}>
                  <stat.icon className="w-6 h-6" />
               </div>
               <span className="text-xs text-muted-foreground font-black uppercase tracking-widest">{stat.label}</span>
            </div>
            <h3 className="text-4xl font-black text-foreground tracking-tighter">{stat.val}</h3>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border/50 rounded-[48px] overflow-hidden shadow-sm">
        <div className="p-10 border-b border-border/30 flex items-center justify-between gap-6">
           <h3 className="text-2xl font-black text-foreground italic flex items-center gap-3">
             <Calendar className="w-6 h-6 text-primary" /> Registry Log
           </h3>
           <button className="flex items-center gap-3 px-8 py-4 bg-foreground text-background font-black uppercase tracking-widest text-[10px] rounded-2xl hover:scale-105 transition-all shadow-sm">
              <Download className="w-4 h-4" /> Export Ledger
           </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/10 border-b border-border/30 text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-black">
                <th className="px-10 py-6">Transaction ID</th>
                <th className="px-10 py-6">Client Identity</th>
                <th className="px-10 py-6">Amount</th>
                <th className="px-10 py-6">Status</th>
                <th className="px-10 py-6 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20 text-sm font-medium">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={5} className="px-10 py-8 h-24 bg-muted/5 shadow-inner" />
                  </tr>
                ))
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-10 py-32 text-center text-muted-foreground font-bold italic underline decoration-primary/20">NO FISCAL LOGS DETECTED IN CURRENT BUFFER</td>
                </tr>
              ) : (
                transactions.map((t) => (
                  <tr key={t._id} className="hover:bg-muted/10 transition-colors group">
                    <td className="px-10 py-7">
                      <p className="font-mono text-xs opacity-60">TXN-{t.transactionId.toUpperCase()}</p>
                    </td>
                    <td className="px-10 py-7">
                      <p className="font-bold text-foreground">{t.clientId?.name || 'Unknown'}</p>
                      <p className="text-[10px] opacity-50 uppercase font-black">{t.clientId?.email}</p>
                    </td>
                    <td className="px-10 py-7">
                      <p className="text-lg font-black text-foreground">₹{t.amount.toLocaleString()}</p>
                    </td>
                    <td className="px-10 py-7">
                      <span className={`text-[9px] font-black px-4 py-2 rounded-full uppercase border shadow-sm ${t.status === 'success' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'}`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="px-10 py-7 text-right">
                       <p className="text-[10px] text-muted-foreground font-bold">{new Date(t.createdAt).toLocaleDateString()}</p>
                       <p className="text-[10px] text-muted-foreground/40">{new Date(t.createdAt).toLocaleTimeString()}</p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

