'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Shield, Camera, Save, CheckCircle2 } from 'lucide-react';

export default function StaffProfilePage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    photo: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/profile');
        if (res.ok) {
          const data = await res.json();
          setFormData(prev => ({ ...prev, ...data.user }));
        }
      } catch (err) {
        console.error('Failed to fetch profile', err);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Failed to update profile', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      <div className="flex flex-col md:flex-row items-center gap-8 bg-card/40 backdrop-blur-xl border border-emerald-500/10 rounded-[40px] p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-3xl rounded-full" />
        
        <div className="relative group">
          <div className="w-32 h-32 rounded-3xl bg-emerald-500/20 flex items-center justify-center border-2 border-emerald-500/20 overflow-hidden shadow-lg">
            {formData.photo ? (
              <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-16 h-16 text-emerald-600" />
            )}
          </div>
          <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <Camera className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-black text-foreground italic flex items-center gap-3">
             <Shield className="w-8 h-8 text-emerald-600" /> Personnel Identity
          </h1>
          <p className="text-muted-foreground mt-2">Maintain your operational credentials and profile details.</p>
          <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-500/20">Authorized Staff</span>
            <span className="px-3 py-1 bg-indigo-500/10 text-indigo-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-indigo-500/20">Active Node</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-card/40 backdrop-blur-xl border border-emerald-500/10 rounded-[40px] p-10 shadow-xl space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Display name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-emerald-500 transition-colors" />
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
                  className="w-full bg-background/50 border border-emerald-500/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-foreground font-medium"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Email endpoint</label>
              <div className="relative group opacity-60">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input 
                  type="email" 
                  value={formData.email}
                  disabled
                  className="w-full bg-background/50 border border-emerald-500/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none cursor-not-allowed text-foreground/70 font-medium"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Signal trace (Phone)</label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-emerald-500 transition-colors" />
                <input 
                  type="text" 
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
                  className="w-full bg-background/50 border border-emerald-500/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-foreground font-medium"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pr-4">
          <button 
            type="submit"
            disabled={loading}
            className="group relative flex items-center gap-3 px-10 py-5 bg-emerald-600 text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl shadow-xl shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 overflow-hidden"
          >
            {loading ? (
              "Synchronizing..."
            ) : success ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-white" /> Node Updated
              </>
            ) : (
              <>
                <Save className="w-5 h-5" /> Push Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
