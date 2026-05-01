'use client';

import { useState } from 'react';
import { 
  Save, 
  Plus, 
  Trash2, 
  ArrowLeft,
  Loader2,
  CheckCircle2,
  Briefcase,
  MapPin,
  Building2,
  Clock,
  CircleDollarSign
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface JobEditorProps {
  initialData?: any;
  isEditing?: boolean;
}

export default function JobEditor({ initialData, isEditing = false }: JobEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    role: initialData?.role || '',
    department: initialData?.department || 'Legal & Compliance',
    location: initialData?.location || 'Remote',
    type: initialData?.type || 'Full-Time',
    salaryRange: initialData?.salaryRange || 'Competitive',
    status: initialData?.status || 'Open',
    desc: initialData?.desc || '',
  });

  const [requirements, setRequirements] = useState<string[]>(
    initialData?.requirements || ['']
  );

  const addRequirement = () => {
    setRequirements([...requirements, '']);
  };

  const updateRequirement = (index: number, value: string) => {
    const newReqs = [...requirements];
    newReqs[index] = value;
    setRequirements(newReqs);
  };

  const removeRequirement = (index: number) => {
    const newReqs = requirements.filter((_, i) => i !== index);
    setRequirements(newReqs.length ? newReqs : ['']);
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        ...formData,
        requirements: requirements.filter(r => r.trim() !== '')
      };

      const url = isEditing ? `/api/jobs/${initialData._id}` : '/api/jobs';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/admin/jobs');
          router.refresh();
        }, 1500);
      } else {
        const errData = await res.json();
        setError(errData.error || 'Failed to save job');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <button 
          onClick={() => router.back()}
          className="p-3 bg-card border border-border/50 rounded-2xl text-muted-foreground hover:text-foreground transition-all flex items-center gap-2 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back
        </button>
        
        <div className="flex items-center gap-4">
          {error && <p className="text-rose-500 text-sm font-bold animate-pulse">{error}</p>}
          <button 
            onClick={handleSave}
            disabled={loading || success}
            className={`px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg ${
              success ? 'bg-emerald-500 text-white' : 'bg-primary text-primary-foreground hover:scale-105 active:scale-95 shadow-primary/20 disabled:opacity-50'
            }`}
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : success ? <CheckCircle2 className="w-5 h-5" /> : <Save className="w-5 h-5" />}
            {loading ? 'Saving...' : success ? 'Published' : isEditing ? 'Update Position' : 'Create Opening'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Job Details */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-card border border-border/50 rounded-[40px] p-8 shadow-sm space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-primary italic mb-2">Position Metadata</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2"><Building2 className="w-3 h-3"/> Department</label>
                <select 
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  className="w-full bg-muted/30 border border-border/50 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-primary/50"
                >
                  <option value="Legal & Compliance">Legal & Compliance</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Finance">Finance</option>
                  <option value="Support">Support</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Operations">Operations</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2"><MapPin className="w-3 h-3"/> Location</label>
                <input 
                  type="text" 
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="e.g. Remote / Bengaluru"
                  className="w-full bg-muted/30 border border-border/50 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-primary/50"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2"><Clock className="w-3 h-3"/> Employment Type</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full bg-muted/30 border border-border/50 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-primary/50"
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2"><CircleDollarSign className="w-3 h-3"/> Salary Range</label>
                <input 
                  type="text" 
                  value={formData.salaryRange}
                  onChange={(e) => setFormData({...formData, salaryRange: e.target.value})}
                  placeholder="e.g. Competitive / ₹12-18 LPA"
                  className="w-full bg-muted/30 border border-border/50 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-primary/50"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Hiring Status</label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className={`w-full border rounded-2xl px-5 py-3 text-sm font-bold focus:outline-none transition-all ${
                    formData.status === 'Open' ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-500' :
                    formData.status === 'Closed' ? 'bg-rose-500/5 border-rose-500/20 text-rose-500' :
                    'bg-muted border-border/50 text-muted-foreground'
                  }`}
                >
                  <option value="Open">Open (Live)</option>
                  <option value="Closed">Closed</option>
                  <option value="Hidden">Hidden (Draft)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Role Description & Requirements */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-card border border-border/50 rounded-[40px] p-10 shadow-sm min-h-[600px] flex flex-col">
            <h3 className="text-sm font-black uppercase tracking-widest text-primary italic mb-10 border-b border-border/30 pb-4">Job Specification</h3>
            
            <div className="space-y-8 flex-1">
              <textarea 
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                placeholder="Enter Impactful Job Title..."
                className="w-full bg-transparent text-4xl md:text-5xl font-black text-foreground placeholder:opacity-20 focus:outline-none resize-none overflow-hidden h-auto"
                rows={2}
              />
              
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Executive Summary / Description</label>
                <textarea 
                  value={formData.desc}
                  onChange={(e) => setFormData({...formData, desc: e.target.value})}
                  placeholder="Describe the mission and daily responsibilities..."
                  className="w-full bg-muted/20 border border-border/30 rounded-3xl p-6 text-lg text-muted-foreground focus:outline-none focus:border-primary/50 transition-all min-h-[150px]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Key Qualifications & Requirements</label>
                <div className="space-y-3">
                  {requirements.map((req, idx) => (
                    <div key={idx} className="flex items-center gap-3 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-focus-within:bg-primary transition-colors" />
                      <input 
                        type="text"
                        value={req}
                        onChange={(e) => updateRequirement(idx, e.target.value)}
                        placeholder="e.g. 5+ Years experience in Corporate Law"
                        className="flex-1 bg-transparent text-sm text-foreground focus:outline-none border-b border-transparent focus:border-border transition-all py-1"
                      />
                      <button 
                        onClick={() => removeRequirement(idx)}
                        className="opacity-0 group-hover:opacity-100 p-2 text-muted-foreground hover:text-rose-500 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button 
                    onClick={addRequirement}
                    className="flex items-center gap-2 px-4 py-2 mt-4 rounded-xl bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary/20 transition-all border border-primary/20"
                  >
                    <Plus className="w-4 h-4" /> Add Requirement
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
