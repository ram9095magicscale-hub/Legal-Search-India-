'use client';

import { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  CreditCard, 
  Download, 
  ExternalLink, 
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'payments'>('orders');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ orders: [], transactions: [] });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        const res = await fetch('/api/billing');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error('Failed to fetch billing data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBillingData();
  }, []);

  const filteredOrders = data.orders.filter((order: any) => 
    order.orderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.orderId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTransactions = data.transactions.filter((tx: any) => 
    tx.transactionId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-20 px-4 md:px-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-foreground tracking-tight">Orders & Billing</h1>
          <p className="text-muted-foreground font-medium mt-1">Manage your active filings and payment history</p>
        </div>
        
        <div className="flex bg-card/40 backdrop-blur-xl border border-white/5 p-1 rounded-2xl">
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'orders' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Orders
          </button>
          <button 
            onClick={() => setActiveTab('payments')}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'payments' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Payments
          </button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input 
          type="text"
          placeholder={`Search ${activeTab}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-14 pr-6 py-5 bg-card/40 backdrop-blur-xl border border-white/5 rounded-[24px] focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium text-foreground transition-all"
        />
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'orders' ? (
          <motion.div 
            key="orders"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid gap-4"
          >
            {loading ? (
              <div className="py-20 text-center">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground font-medium">Fetching orders...</p>
              </div>
            ) : filteredOrders.length > 0 ? (
              filteredOrders.map((order: any) => (
                <div key={order._id} className="bg-card/40 backdrop-blur-xl border border-white/5 rounded-[30px] p-6 md:p-8 hover:border-primary/20 transition-all group overflow-hidden relative">
                   <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-primary/10 rounded-[20px] flex items-center justify-center text-primary shrink-0">
                          <ShoppingBag className="w-8 h-8" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-background/50 border border-white/5 rounded-full text-muted-foreground">
                              {order.orderId}
                            </span>
                            {order.status === 'completed' ? (
                              <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500">
                                Completed
                              </span>
                            ) : (
                              <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary">
                                In Progress
                              </span>
                            )}
                          </div>
                          <h3 className="text-xl font-black text-foreground">{order.orderName}</h3>
                          <p className="text-xs text-muted-foreground font-medium mt-1 italic">
                            Updated on {new Date(order.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 w-full md:w-auto">
                         <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-background/50 hover:bg-primary/10 hover:text-primary rounded-2xl border border-white/5 font-black text-[10px] uppercase tracking-widest transition-all">
                            <FileText className="w-4 h-4" />
                            Invoice
                         </button>
                         <button className="w-14 h-14 flex items-center justify-center bg-primary text-white rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                            <ExternalLink className="w-5 h-5" />
                         </button>
                      </div>
                   </div>
                   
                   {/* Progress Visualizer in the order card */}
                   <div className="mt-8 pt-8 border-t border-white/5">
                      <div className="flex justify-between items-end mb-4">
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Processing Strength</span>
                        <span className="text-sm font-black text-primary">{order.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-1000"
                          style={{ width: `${order.progress}%` }}
                        />
                      </div>
                   </div>

                   <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
                </div>
              ))
            ) : (
              <div className="py-20 text-center bg-card/20 rounded-[40px] border border-dashed border-white/10">
                <ShoppingBag className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground">No orders found</h3>
                <p className="text-muted-foreground mt-2 px-10">You haven't initiated any filings yet. Start your legal journey today.</p>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            key="payments"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
             <div className="bg-card/40 backdrop-blur-xl border border-white/5 rounded-[40px] overflow-hidden">
                <div className="p-8 border-b border-white/5 bg-white/[0.02]">
                   <h3 className="font-black text-xs uppercase tracking-widest text-muted-foreground">Transaction History</h3>
                </div>
                
                <div className="overflow-x-auto">
                   <table className="w-full text-left">
                      <thead>
                         <tr className="border-b border-white/5 bg-white/[0.01]">
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Tx ID</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Date</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Method</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Status</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">Amount</th>
                         </tr>
                      </thead>
                      <tbody>
                         {loading ? (
                           <tr>
                              <td colSpan={5} className="px-8 py-10 text-center text-muted-foreground italic font-medium">Loading payments...</td>
                           </tr>
                         ) : filteredTransactions.length > 0 ? (
                           filteredTransactions.map((tx: any) => (
                             <tr key={tx._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                                <td className="px-8 py-6">
                                   <div className="flex items-center gap-3">
                                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${tx.status === 'success' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                         <CreditCard className="w-4 h-4" />
                                      </div>
                                      <span className="font-mono text-xs font-bold text-foreground">{tx.transactionId}</span>
                                   </div>
                                </td>
                                <td className="px-8 py-6 text-sm text-muted-foreground font-medium">
                                   {new Date(tx.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-8 py-6 text-sm text-muted-foreground font-bold">
                                   {tx.paymentMethod || 'Razorpay'}
                                </td>
                                <td className="px-8 py-6">
                                   <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                      tx.status === 'success' ? 'bg-emerald-500/10 text-emerald-500' : 
                                      tx.status === 'failed' ? 'bg-rose-500/10 text-rose-500' : 
                                      'bg-amber-500/10 text-amber-500'
                                   }`}>
                                      {tx.status === 'success' ? <CheckCircle2 className="w-3 h-3" /> : tx.status === 'failed' ? <AlertCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                      {tx.status}
                                   </div>
                                </td>
                                <td className="px-8 py-6 text-right">
                                   <span className="text-base font-black text-foreground italic">₹{tx.amount.toLocaleString()}</span>
                                </td>
                             </tr>
                           ))
                         ) : (
                           <tr>
                              <td colSpan={5} className="px-8 py-20 text-center text-muted-foreground italic font-medium">No transactions recorded yet.</td>
                           </tr>
                         )}
                      </tbody>
                   </table>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
