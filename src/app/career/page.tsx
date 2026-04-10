'use client';

import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';

export default function CareerPage() {
  const jobs = [
    {
      role: "Senior Corporate Lawyer",
      type: "Full-Time",
      location: "Bengaluru / Remote",
      department: "Legal & Compliance",
      desc: "Lead complex corporate restructuring, handle GST disputes, and manage overarching SaaS compliance matrices."
    },
    {
      role: "Next.js Frontend Engineer",
      type: "Full-Time",
      location: "Remote",
      department: "Engineering",
      desc: "Build highly performant, accessible, and gorgeous glassmorphic UIs for our core registration dashboard."
    },
    {
      role: "Tax Consultant (CA)",
      type: "Part-Time",
      location: "Mumbai",
      department: "Finance",
      desc: "Assist clients dynamically with end-of-year tax planning and complex GST return audits."
    },
    {
      role: "Customer Success Executive",
      type: "Full-Time",
      location: "Remote",
      department: "Support",
      desc: "Act as the first line of defense, guiding users through the FSSAI and Trademark application flows."
    }
  ];

  return (
    <div className="min-h-screen pt-0 pb-24 bg-background">
      {/* Header */}
      <section className="container mx-auto px-4 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6 border border-primary/20">
            Join the Mission
          </div>
          <h1 className="text-5xl lg:text-6xl font-black mb-6 text-foreground tracking-tight">
            Build the Future of <br className="hidden md:block"/>
            <span className="text-primary italic">Legal Tech.</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We're searching for relentless innovators who want to rip the complexity out of the Indian legal system and replace it with elegant software.
          </p>
        </motion.div>
      </section>

      {/* Grid */}
      <section className="container mx-auto px-4 max-w-5xl">
        {jobs.length > 0 ? (
          <div className="flex flex-col gap-6">
            {jobs.map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group flex flex-col md:flex-row md:items-center justify-between p-8 bg-card border border-border/50 rounded-3xl hover:shadow-[0_15px_40px_-15px_rgba(var(--primary),0.3)] hover:border-primary/50 transition-all duration-300"
              >
                <div className="md:w-2/3 mb-6 md:mb-0">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full">{job.department}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">{job.role}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{job.desc}</p>
                  <div className="flex items-center gap-6 text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4"/> {job.type}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4"/> {job.location}</span>
                  </div>
                </div>
                
                <div className="md:w-1/3 flex md:justify-end">
                  <Link href={`/career/apply?role=${encodeURIComponent(job.role)}`} className="w-full md:w-auto text-center px-8 py-4 bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold rounded-xl transition-all">
                    Apply Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-card border border-border/50 rounded-3xl p-12 text-center shadow-xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-primary/5 blur-3xl pointer-events-none" />
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6 text-muted-foreground">
              <Briefcase className="w-8 h-8 opacity-50" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4 relative z-10">Currently No Openings</h3>
            <p className="text-muted-foreground max-w-lg mx-auto relative z-10">
              Our team is currently operating at full capacity. We frequently open new positions as we scale, so please check back regularly for updated roles!
            </p>
          </motion.div>
        )}
      </section>

      {/* Values */}
      <section className="container mx-auto px-4 max-w-5xl mt-24 text-center">
        <div className="p-12 rounded-3xl bg-muted/30 border border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-indigo-500/10 blur-3xl" />
          <h2 className="relative z-10 text-3xl font-bold mb-4">Don't see a fit?</h2>
          <p className="relative z-10 text-muted-foreground mb-8">We are always looking for exceptional talent. If you think you'd be a great addition to the team, send us an open application.</p>
          <Link href="/career/apply?role=Open%20Application" className="relative z-10 inline-block px-8 py-4 bg-foreground text-background font-bold rounded-xl hover:bg-primary hover:text-primary-foreground transition-all shadow-xl">
            Submit Open Application
          </Link>
        </div>
      </section>
    </div>
  );
}
