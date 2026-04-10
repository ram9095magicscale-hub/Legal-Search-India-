'use client';

import { useState, useEffect } from 'react';
import { UserPlus, Mail, Shield, Trash2, CheckCircle2, X, Plus, Camera, AlertTriangle, Edit2, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StaffManagementPage() {
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'staff',
    photo: '',
  });

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const res = await fetch('/api/admin/staff');
      if (res.ok) {
        const data = await res.json();
        setStaff(data.staff);
      }
    } catch (err) {
      console.error('Failed to fetch staff', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const url = '/api/admin/staff';
      const method = isEditing ? 'PATCH' : 'POST';
      const payload = isEditing ? { ...formData, userId: editingId } : formData;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', password: '', phone: '', role: 'staff', photo: '' });
        setIsEditing(false);
        setEditingId(null);
        fetchStaff();
        setTimeout(() => {
          setSuccess(false);
          setShowForm(false);
        }, 2000);
      } else {
        setError(data.error || 'Operation failed');
      }
    } catch (err) {
      setError('Connection failure during execution');
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (member: any) => {
    setFormData({
      name: member.name,
      email: member.email,
      password: '', // Don't show password
      phone: member.phone || '',
      role: member.role,
      photo: member.photo || '',
    });
    setEditingId(member._id);
    setIsEditing(true);
    setShowForm(true);
  };

  return (
    <div className="space-y-10 pb-20 px-2 lg:px-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-foreground tracking-tight italic flex items-center gap-3">
            <Shield className="w-8 h-8 text-rose-500" /> Staff <span className="text-muted-foreground text-2xl not-italic font-bold opacity-50">/ Control</span>
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">Manage the operational staff.</p>
        </div>
        <button
          onClick={() => {
            setIsEditing(false);
            setFormData({ name: '', email: '', password: '', phone: '', role: 'staff', photo: '' });
            setShowForm(true);
          }}
          className="flex items-center gap-3 px-8 py-4 bg-foreground text-background font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-sm hover:scale-105 active:scale-95 transition-all"
        >
          <UserPlus className="w-5 h-5" /> Add Staff
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {loading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-card animate-pulse rounded-[40px] border border-border/50 shadow-sm" />
            ))
          ) : staff.map((member) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              key={member._id}
              className="bg-card border border-border/50 rounded-[40px] p-8 shadow-sm relative overflow-hidden group hover:border-rose-500/30 transition-all duration-500"
            >
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <button
                  onClick={() => startEdit(member)}
                  className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-rose-500 transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-3xl bg-rose-500/10 flex items-center justify-center text-rose-500 border border-rose-500/20 text-3xl font-black shadow-inner">
                  {member.name[0]}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-foreground">{member.name}</h3>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest opacity-60 mt-1">{member.role}</p>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-border/30">
                <div className="flex items-center gap-4 text-muted-foreground">
                  <Mail className="w-4 h-4 text-rose-500 opacity-60" />
                  <span className="text-sm font-medium">{member.email}</span>
                </div>
                {/* Status Section - Simplified */}
                <div className="flex justify-between items-center pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">Active</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modern Creation Modal */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowForm(false)}
              className="absolute inset-0 bg-background/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              className="relative w-full max-w-lg bg-card border border-border shadow-2xl rounded-[48px] overflow-hidden"
            >
              <div className="p-10 border-b border-border/30 flex items-center justify-between">
                <h2 className="text-3xl font-black text-foreground italic">{isEditing ? 'Update Details' : 'Add Staff'}</h2>
                <button onClick={() => setShowForm(false)} className="w-12 h-12 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-10 space-y-5">
                {error && (
                  <div className="bg-rose-500/10 border border-rose-500/20 p-5 rounded-3xl flex items-center gap-4 text-rose-500 text-[11px] font-black uppercase tracking-tight">
                    <AlertTriangle className="w-5 h-5 flex-shrink-0" /> {error}
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[10px] text-muted-foreground uppercase font-black tracking-widest ml-4">Name</label>
                  <input
                    type="text" required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-muted/30 border border-border/50 rounded-3xl py-4 px-8 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-all font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-muted-foreground uppercase font-black tracking-widest ml-4">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-muted/30 border border-border/50 rounded-3xl py-4 px-8 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-all font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-muted-foreground uppercase font-black tracking-widest ml-4">Email</label>
                  <input
                    type="email" required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-muted/30 border border-border/50 rounded-3xl py-4 px-8 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-all font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-muted-foreground uppercase font-black tracking-widest ml-4">Password</label>
                  <input
                    type="password" required={!isEditing}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-muted/30 border border-border/50 rounded-3xl py-4 px-8 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-all font-bold"
                    placeholder={isEditing ? '•••••••• (Leave blank to keep current)' : '••••••••'}
                  />
                </div>

                <button
                  disabled={loading}
                  type="submit"
                  className="w-full py-5 bg-foreground text-background font-black uppercase tracking-[0.3em] rounded-3xl hover:bg-zinc-800 transition-all mt-4 disabled:opacity-50"
                >
                  {loading ? 'PROCESSING...' : 'Submit'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
