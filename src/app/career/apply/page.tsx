'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { Briefcase, MapPin, UploadCloud, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

function ApplicationContent() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get('id');
  
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const openAppDefault = {
    role: "Open Application",
    department: "General",
    type: "Flexible",
    location: "Anywhere",
    desc: "We are always looking for exceptional talent. If you have unique skills that would accelerate Legal Search India, pitch us!",
    requirements: [
      "A relentless drive to build something impactful.",
      "Strong problem-solving skills.",
      "Ability to adapt in a fast-paced legal-tech environment.",
      "A clear vision of how you can contribute."
    ]
  };

  useEffect(() => {
    const fetchJob = async () => {
      if (!jobId) {
        setJob(openAppDefault);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/jobs/${jobId}`);
        if (res.ok) {
          const data = await res.json();
          setJob(data);
        } else {
          setJob(openAppDefault);
        }
      } catch (err) {
        console.error('Failed to fetch job details', err);
        setJob(openAppDefault);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  if (loading) {
    return (
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 animate-pulse">
        <div className="lg:w-5/12 space-y-8">
           <div className="h-4 w-32 bg-muted rounded-md mb-8" />
           <div className="h-6 w-24 bg-primary/10 rounded-full mb-4" />
           <div className="h-12 w-full bg-muted rounded-xl mb-6" />
           <div className="h-24 w-full bg-muted rounded-xl mb-12" />
           <div className="space-y-4">
              <div className="h-8 w-1/2 bg-muted rounded-md" />
              {[...Array(4)].map((_, i) => <div key={i} className="h-4 w-full bg-muted rounded-md" />)}
           </div>
        </div>
        <div className="lg:w-7/12 h-[600px] bg-card/50 border border-border/30 rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
      
      {/* Left side - Job Description */}
      <div className="lg:w-5/12 space-y-8">
        <Link href="/career" className="inline-flex items-center text-sm font-bold text-muted-foreground hover:text-primary transition-colors mb-4">
          <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Back to Careers
        </Link>
        
        <div>
          <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full mb-4 inline-block">{job.department}</span>
          <h1 className="text-4xl md:text-5xl font-black mb-6 text-foreground tracking-tight leading-tight">
            {job.role}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-foreground font-medium uppercase tracking-wide mb-8">
            <span className="flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary"/> {job.type}</span>
            <span className="flex items-center gap-2"><MapPin className="w-5 h-5 text-primary"/> {job.location}</span>
          </div>

          <div className="w-full h-px bg-border/50 mb-8" />
          
          <h3 className="text-xl font-bold mb-4 text-foreground">Role Overview</h3>
          <p className="text-muted-foreground leading-relaxed mb-8">
            {job.desc}
          </p>

          <h3 className="text-xl font-bold mb-4 text-foreground">Key Requirements</h3>
          <ul className="space-y-4">
            {job.requirements?.map((req: string, i: number) => (
              <li key={i} className="flex gap-3 text-muted-foreground">
                <CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right side - Application Form */}
      <div className="lg:w-7/12">
        <div className="bg-card border border-border/50 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
          
          <h2 className="text-3xl font-bold mb-2 relative z-10">Submit Application</h2>
          <p className="text-muted-foreground mb-8 relative z-10">Please fill out the form below carefully.</p>

          <form className="relative z-10 space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Application Submitted Successfully!"); }}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">First Name *</label>
                <input required type="text" className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="John" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Last Name *</label>
                <input required type="text" className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="Doe" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Email Address *</label>
                <input required type="email" className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Phone Number *</label>
                <input required type="tel" className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="+91 98765 43210" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">LinkedIn / Portfolio URL</label>
              <input type="url" className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="https://linkedin.com/in/..." />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Cover Letter / Pitch</label>
              <textarea rows={4} className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none" placeholder="Tell us why you are a perfect fit..." />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Resume / CV *</label>
              <label className="w-full border-2 border-dashed border-border/60 rounded-xl p-8 flex flex-col items-center justify-center bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer group">
                <UploadCloud className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors mb-3" />
                <p className="text-sm font-medium text-foreground">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground mt-1">PDF, DOCX up to 5MB</p>
                <input required type="file" className="hidden" accept=".pdf,.doc,.docx" />
              </label>
            </div>

            <button type="submit" className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-[0_10px_20px_-10px_hsl(var(--primary)/0.6)]">
              Submit Application
            </button>
            <p className="text-xs text-center text-muted-foreground">
              By submitting, you agree to our Privacy Policy regarding candidate data.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <div className="min-h-screen pt-0 pb-24 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <Suspense fallback={
          <div className="flex justify-center items-center h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        }>
          <ApplicationContent />
        </Suspense>
      </div>
    </div>
  );
}
