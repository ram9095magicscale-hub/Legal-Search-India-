'use client';

import { useState, useEffect } from 'react';
import { FileText, Search, Clock, CheckCircle2, AlertCircle, ChevronRight, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TrackOrderPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders/list');
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders);
      }
    } catch (err) {
      console.error('Failed to fetch orders', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return { color: 'text-emerald-500', bg: 'bg-emerald-500/10', icon: CheckCircle2, progress: 100 };
      case 'pending':
        return { color: 'text-amber-500', bg: 'bg-amber-500/10', icon: Clock, progress: 20 };
      case 'in-progress':
        return { color: 'text-blue-500', bg: 'bg-blue-500/10', icon: Clock, progress: 60 };
      case 'cancelled':
        return { color: 'text-rose-500', bg: 'bg-rose-500/10', icon: AlertCircle, progress: 0 };
      default:
        return { color: 'text-muted-foreground', bg: 'bg-muted', icon: Clock, progress: 10 };
    }
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-foreground tracking-tight italic flex items-center gap-3">
             Track <span className="text-primary text-2xl not-italic font-bold ml-1 opacity-50">/ Orders</span>
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">Real-time update on your legal applications.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-card border border-border/50 p-2 rounded-2xl shadow-sm">
           {['all', 'pending', 'completed'].map((f) => (
             <button 
               key={f}
               onClick={() => setFilter(f)}
               className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-muted-foreground hover:text-foreground'}`}
             >
               {f}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="h-48 bg-card animate-pulse rounded-[32px] border border-border/50 shadow-sm" />
          ))
        ) : orders.length === 0 ? (
          <div className="p-20 bg-card border border-border/50 rounded-[48px] text-center">
             <div className="w-20 h-20 bg-muted/50 rounded-[32px] flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-muted-foreground opacity-20" />
             </div>
             <h3 className="text-2xl font-black text-foreground italic uppercase">No Orders Found</h3>
             <p className="text-muted-foreground mt-2 font-medium">You haven't initiated any legal services yet.</p>
          </div>
        ) : orders.map((order, i) => {
          const config = getStatusConfig(order.status);
          const Icon = config.icon;
          
          return (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={order._id}
              className="bg-card border border-border/50 rounded-[40px] p-8 md:p-10 shadow-sm transition-all hover:border-primary/20 flex flex-col md:flex-row gap-8 items-start md:items-center group"
            >
              <div className="flex-1 space-y-4 w-full">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 shadow-sm">
                    {order.orderId || `ORD-${order._id.slice(-6).toUpperCase()}`}
                  </span>
                  <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border ${config.bg} ${config.color} shadow-sm`}>
                    <Icon className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{order.status}</span>
                  </div>
                </div>

                <h2 className="text-3xl font-black text-foreground tracking-tight italic group-hover:text-primary transition-colors">
                  {order.serviceName}
                </h2>

                <div className="flex flex-wrap items-center gap-8 pt-2">
                   <div className="space-y-1">
                      <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest opacity-60">Initiated On</p>
                      <p className="text-sm font-bold text-foreground">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest opacity-60">Assigned To</p>
                      <p className="text-sm font-bold text-foreground">{order.assignedStaff ? 'Legal Expert' : 'Awaiting Assignment'}</p>
                   </div>
                </div>
              </div>

              <div className="w-full md:w-64 space-y-4">
                 <div className="flex justify-between items-end mb-2">
                    <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Progress</span>
                    <span className={`text-[11px] font-black ${config.color}`}>{config.progress}%</span>
                 </div>
                 <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden shadow-inner">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${config.progress}%` }}
                      className={`h-full ${config.color.replace('text', 'bg')} shadow-lg`}
                    />
                 </div>
                 <button className="w-full mt-4 flex items-center justify-between px-6 py-4 bg-muted/30 border border-border/50 rounded-[24px] group-hover:bg-primary group-hover:text-white transition-all group-hover:border-primary">
                    <span className="text-[10px] font-black uppercase tracking-widest">View Details</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
