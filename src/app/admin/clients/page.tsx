'use client';

import { useState, useEffect } from 'react';
import { UserCheck, Search, Filter, Mail, Phone, Briefcase, ChevronRight, Globe, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ClientsPage() {
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    // Fetch clients who have active orders
    const fetchClients = async () => {
      try {
        const res = await fetch('/api/admin/users?hasOrders=true');
        if (res.ok) {
          const data = await res.json();
          setClients(data.users);
        }
      } catch (err) {
        console.error('Failed to fetch clients');
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-foreground tracking-tight italic flex items-center gap-3 text-emerald-500">
            <UserCheck className="w-10 h-10" /> Active <span className="text-muted-foreground text-2xl not-italic font-bold opacity-50">/ Clients</span>
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">Verified partners with active service subscriptions.</p>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                placeholder="Search clients..." 
                className="pl-11 pr-6 py-3 bg-card border border-border rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none w-64 transition-all"
              />
           </div>
           <button className="p-3 bg-card border border-border rounded-xl hover:bg-muted text-muted-foreground transition-all">
              <Filter className="w-5 h-5" />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-card animate-pulse rounded-[32px] border border-border" />
          ))
        ) : clients.length > 0 ? (
          clients.map((client) => (
            <motion.div 
              key={client._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-[32px] p-8 shadow-sm hover:border-emerald-500/30 transition-all group relative overflow-hidden"
            >
               <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 p-1 mb-4 relative">
                     {client.photo ? (
                        <img src={client.photo} className="w-full h-full object-cover rounded-full" alt="" />
                     ) : (
                        <div className="w-full h-full flex items-center justify-center text-emerald-500 text-2xl font-black">{client.name[0]}</div>
                     )}
                     <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-lg border-4 border-card flex items-center justify-center">
                        <UserCheck className="w-3 h-3 text-white" />
                     </div>
                  </div>
                  <h3 className="text-xl font-black text-foreground group-hover:text-emerald-500 transition-colors">{client.name}</h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mt-1">{client.businessName || 'Individual Entity'}</p>
               </div>

               <div className="mt-8 pt-6 border-t border-border/50 space-y-4">
                  <div className="flex items-center gap-4">
                     <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                        <Mail className="w-4 h-4" />
                     </div>
                     <span className="text-xs font-bold text-foreground opacity-70 truncate">{client.email}</span>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                        <Phone className="w-4 h-4" />
                     </div>
                     <span className="text-xs font-bold text-foreground opacity-70">{client.phone}</span>
                  </div>
               </div>

               <button className="w-full mt-8 py-4 bg-muted hover:bg-emerald-500 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                  View Dossier <ChevronRight className="w-4 h-4" />
               </button>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-20 bg-card border border-border border-dashed rounded-[40px] flex flex-col items-center justify-center text-center opacity-50 italic">
             <AlertCircle className="w-12 h-12 mb-4 text-emerald-500/40" />
             <p className="text-lg">No active service clients found in the registry.</p>
          </div>
        )}
      </div>
    </div>
  );
}
