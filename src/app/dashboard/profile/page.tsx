'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  User as UserIcon, 
  Camera, 
  Mail, 
  Phone, 
  Building2, 
  MapPin, 
  Save, 
  Loader2,
  BadgeCheck,
  Briefcase,
  Edit3
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState<any>({
    name: '',
    phone: '',
    businessName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    photo: ''
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/user/profile');
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        setFormData({
          name: data.name || '',
          phone: data.phone || '',
          businessName: data.businessName || '',
          address: data.address || '',
          city: data.city || '',
          state: data.state || '',
          zipCode: data.zipCode || '',
          photo: data.photo || ''
        });
      }
    } catch (err) {
      console.error('Fetch profile error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);

    try {
      const res = await fetch('/api/user/profile/photo', {
        method: 'POST',
        body: fd
      });
      
      if (res.ok) {
        const data = await res.json();
        setFormData((prev: any) => ({ ...prev, photo: data.photoUrl }));
        setUser((prev: any) => ({ ...prev, photo: data.photoUrl }));
      }
    } catch (err) {
      console.error('Photo upload failed:', err);
      alert('Photo upload failed. Check connection.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setIsEditing(false);
        alert('Profile updated successfully!');
      }
    } catch (err) {
      console.error('Update profile error:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="w-10 h-10 text-primary animate-spin" />
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto px-4 mt-2">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card/40 backdrop-blur-3xl border border-white/5 rounded-[32px] shadow-2xl overflow-hidden relative"
      >
        {/* Compact Banner BG */}
        <div className="h-24 bg-gradient-to-r from-primary/20 via-primary/5 to-indigo-500/10 relative">
          <div className="absolute inset-0 bg-white/[0.01]" />
        </div>

        <div className="px-8 pb-8 -mt-12 relative z-10">
          <div className="flex flex-col items-center">
             <div className="relative group">
                <div className="w-24 h-24 rounded-[28px] bg-background border-[4px] border-card shadow-xl overflow-hidden relative">
                   {formData.photo ? (
                      <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
                   ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/5">
                         <UserIcon className="w-10 h-10 text-primary/40" />
                      </div>
                   )}
                   
                   {uploading && (
                      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center z-20">
                         <Loader2 className="w-8 h-8 text-primary animate-spin" />
                      </div>
                   )}

                   {isEditing && (
                     <button 
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer z-10"
                     >
                        <Camera className="w-6 h-6 mb-1" />
                        <span className="text-[8px] font-black uppercase tracking-widest text-white">Change</span>
                     </button>
                   )}
                </div>
                <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} className="hidden" accept="image/*" />
             </div>

             <div className="mt-4 text-center">
                {isEditing ? (
                  <input 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-background/50 border border-primary/20 text-xl font-black text-foreground text-center px-4 py-1.5 rounded-xl outline-none"
                    placeholder="Full Name"
                    autoFocus
                  />
                ) : (
                  <h2 className="text-2xl font-black text-foreground tracking-tight">{formData.name || 'Set Your Name'}</h2>
                )}
                <div className="flex items-center justify-center gap-2 mt-1">
                   <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded-full border border-emerald-500/20">
                      <BadgeCheck className="w-3 h-3" />
                      <span className="text-[8px] font-black uppercase tracking-widest">Verified</span>
                   </div>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
             {/* Email Field */}
             <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email ID</label>
                <div className="flex items-center gap-3 p-3 bg-background/20 border border-white/5 rounded-xl group min-h-[48px]">
                   <Mail className="w-3.5 h-3.5 text-primary" />
                   <span className="text-xs font-bold text-foreground opacity-60 truncate">{user?.email}</span>
                </div>
             </div>

             {/* Contact No. Field */}
             <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Contact No.</label>
                <div className={`flex items-center gap-3 p-3 bg-background/20 border rounded-xl transition-all min-h-[48px] ${isEditing ? 'border-primary/30 ring-1 ring-primary/5 bg-background/40' : 'border-white/5'}`}>
                   <Phone className="w-3.5 h-3.5 text-primary" />
                   {isEditing ? (
                     <input 
                       name="phone"
                       value={formData.phone}
                       onChange={handleInputChange}
                       className="bg-transparent text-xs font-bold text-foreground w-full outline-none"
                     />
                   ) : (
                     <span className="text-xs font-bold text-foreground">{formData.phone || '--'}</span>
                   )}
                </div>
             </div>

             {/* Business Name Field */}
             <div className="md:col-span-2 space-y-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Business Name</label>
                <div className={`flex items-center gap-3 p-3 bg-background/20 border rounded-xl transition-all min-h-[48px] ${isEditing ? 'border-primary/30 ring-1 ring-primary/5 bg-background/40' : 'border-white/5'}`}>
                   <Briefcase className="w-3.5 h-3.5 text-primary" />
                   {isEditing ? (
                     <input 
                       name="businessName"
                       value={formData.businessName}
                       onChange={handleInputChange}
                       className="bg-transparent text-xs font-bold text-foreground w-full outline-none"
                     />
                   ) : (
                     <span className="text-xs font-bold text-foreground">{formData.businessName || '--'}</span>
                   )}
                </div>
             </div>

             {/* Address Field */}
             <div className="md:col-span-2 space-y-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Address</label>
                <div className={`flex items-start gap-3 p-3 bg-background/20 border rounded-xl transition-all ${isEditing ? 'border-primary/30 ring-1 ring-primary/5 bg-background/40' : 'border-white/5'}`}>
                   <MapPin className="w-3.5 h-3.5 text-primary mt-1 shrink-0" />
                   <div className="flex-1">
                      {isEditing ? (
                        <>
                          <input 
                            name="address"
                            value={formData.address}
                            onChange={(e: any) => handleInputChange(e)}
                            className="bg-transparent text-xs font-bold text-foreground w-full outline-none"
                            placeholder="Address"
                          />
                          <div className="flex gap-3 mt-2 pt-1 border-t border-white/5">
                             <input name="city" value={formData.city} onChange={handleInputChange} className="bg-transparent text-[10px] font-medium text-foreground w-1/3 outline-none" placeholder="City" />
                             <input name="state" value={formData.state} onChange={handleInputChange} className="bg-transparent text-[10px] font-medium text-foreground w-1/3 outline-none" placeholder="State" />
                             <input name="zipCode" value={formData.zipCode} onChange={handleInputChange} className="bg-transparent text-[10px] font-medium text-foreground w-max outline-none" placeholder="Zip" />
                          </div>
                        </>
                      ) : (
                        <div>
                           <p className="text-xs font-bold text-foreground line-clamp-1">{formData.address || '--'}</p>
                           <p className="text-[9px] text-muted-foreground font-black mt-0.5 uppercase tracking-tighter">
                             {formData.city} {formData.state && `• ${formData.state}`} {formData.zipCode && `• ${formData.zipCode}`}
                           </p>
                        </div>
                      )}
                   </div>
                </div>
             </div>
          </div>

          <div className="mt-8 flex justify-center">
             {isEditing ? (
               <div className="flex gap-3 w-full max-w-sm">
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="flex-1 py-3 bg-background border border-white/5 text-muted-foreground font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-muted transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSubmit}
                    disabled={saving}
                    className="flex-[2] py-3 bg-primary text-white font-black text-[10px] uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                    Save
                  </button>
               </div>
             ) : (
               <button 
                onClick={() => setIsEditing(true)}
                className="w-full max-w-sm py-4 bg-foreground text-background font-black text-[10px] uppercase tracking-widest rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
               >
                 <Edit3 className="w-4 h-4" />
                 Edit Profile
               </button>
             )}
          </div>
        </div>
        {/* Glossy Overlay */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] pointer-events-none rounded-full" />
      </motion.div>
    </div>
  );
}

