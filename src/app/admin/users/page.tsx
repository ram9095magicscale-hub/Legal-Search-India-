'use client';

import { useState, useEffect } from 'react';
import { Users, Search, Trash2, Mail, Phone, Calendar, Shield, X, AlertOctagon, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function UsersManagementPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users);
      }
    } catch (err) {
      console.error('Failed to fetch users', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: deleteId }),
      });

      if (res.ok) {
        setSuccess(true);
        setUsers(users.filter(u => u._id !== deleteId));
        setTimeout(() => {
          setDeleteId(null);
          setSuccess(false);
          setIsDeleting(false);
        }, 1500);
      }
    } catch (err) {
      console.error('Failed to delete user', err);
      setIsDeleting(false);
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (u.phone && u.phone.includes(searchQuery))
  );

  return (
    <div className="space-y-10 pb-20 px-2 lg:px-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-foreground tracking-tight italic flex items-center gap-3">
            <Users className="w-8 h-8 text-primary" /> User <span className="text-muted-foreground text-2xl not-italic font-bold opacity-50">/ Directory</span>
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">Manage all platform participants and permissions.</p>
        </div>
        <div className="relative w-full md:w-96 group">
          <Search className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
          <input 
            type="text" 
            placeholder="Search users by name, email or phone..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-card border border-border/50 rounded-[28px] pl-14 pr-6 py-4 text-sm text-foreground focus:outline-none focus:border-primary/50 shadow-sm transition-all"
          />
        </div>
      </div>

      <div className="bg-card border border-border/50 rounded-[48px] overflow-hidden shadow-sm transition-all">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/10 border-b border-border/30 text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-black">
                <th className="px-10 py-6">User Identity</th>
                <th className="px-10 py-6">Contact Info</th>
                <th className="px-10 py-6">Access Level</th>
                <th className="px-10 py-6">Joined Date</th>
                <th className="px-10 py-6 text-right">Settings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={5} className="px-10 py-8 h-24 bg-muted/5 shadow-inner" />
                  </tr>
                ))
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-10 py-32 text-center text-muted-foreground font-bold italic underline decoration-primary/20">
                    {searchQuery ? 'NO MATCHING USERS FOUND IN DATABASE' : 'NO REGISTERED USERS DETECTED'}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u._id} className="hover:bg-muted/10 transition-colors group">
                    <td className="px-10 py-7">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner ${
                          u.role === 'admin' ? 'bg-rose-500/10 text-rose-500' : 
                          u.role === 'staff' ? 'bg-emerald-500/10 text-emerald-500' : 
                          'bg-primary/10 text-primary'
                        }`}>
                          {u.name[0]}
                        </div>
                        <div>
                          <p className="font-bold text-foreground text-base tracking-tight">{u.name}</p>
                          <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest opacity-50">{u.businessName || 'Regular User'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-7">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-medium text-foreground">
                          <Mail className="w-3.5 h-3.5 opacity-40" /> {u.email}
                        </div>
                        {u.phone && (
                          <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-bold">
                            <Phone className="w-3.5 h-3.5 opacity-40" /> {u.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-10 py-7">
                      <div className="flex items-center gap-2">
                        <Shield className={`w-3.5 h-3.5 ${
                          u.role === 'admin' ? 'text-rose-500' : 
                          u.role === 'staff' ? 'text-emerald-500' : 
                          'text-primary'
                        }`} />
                        <span className={`text-[10px] font-black uppercase tracking-widest ${
                          u.role === 'admin' ? 'text-rose-500' : 
                          u.role === 'staff' ? 'text-emerald-500' : 
                          'text-primary'
                        }`}>
                          {u.role}
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-7">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                        <Calendar className="w-3.5 h-3.5 opacity-40" />
                        {new Date(u.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-10 py-7 text-right">
                       <button 
                         onClick={() => setDeleteId(u._id)}
                         className="p-3 rounded-2xl bg-muted/50 text-muted-foreground hover:bg-rose-500/10 hover:text-rose-500 transition-all hover:scale-110 active:scale-95"
                         title="Delete User"
                       >
                          <Trash2 className="w-5 h-5" />
                       </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isDeleting && setDeleteId(null)}
              className="absolute inset-0 bg-background/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              className="relative w-full max-w-md bg-card border border-border shadow-2xl rounded-[40px] overflow-hidden text-center"
            >
              <div className="p-10 space-y-6">
                 <div className="w-20 h-20 bg-rose-500/10 rounded-[32px] flex items-center justify-center mx-auto mb-6">
                    {success ? (
                      <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                    ) : (
                      <AlertOctagon className="w-10 h-10 text-rose-500" />
                    )}
                 </div>
                 
                 <h2 className="text-3xl font-black text-foreground italic">
                    {success ? "Removed" : "Discard Unit?"}
                 </h2>
                 <p className="text-muted-foreground font-medium">
                    {success 
                      ? "User profile has been successfully purged from the database." 
                      : "This action is irreversible. All associated data for this user will be permanently archived."}
                 </p>

                 {!success && (
                   <div className="flex gap-4 mt-8">
                      <button 
                        onClick={() => setDeleteId(null)}
                        disabled={isDeleting}
                        className="flex-1 py-5 bg-muted text-muted-foreground font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-muted/80 transition-all"
                      >
                         Cancel
                      </button>
                      <button 
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="flex-1 py-5 bg-rose-500 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-lg shadow-rose-500/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
                      >
                         {isDeleting ? "Purging..." : "Confirm Delete"}
                      </button>
                   </div>
                 )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
