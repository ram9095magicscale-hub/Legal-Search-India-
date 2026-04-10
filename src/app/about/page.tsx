'use client';

import { motion } from 'framer-motion';
import { Target, Flag, Scale, Users, Award, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  const stats = [
    { value: "12K+", label: "Businesses Registered" },
    { value: "99.8%", label: "Application Success Rate" },
    { value: "50+", label: "In-house CA & CS Experts" },
    { value: "24/7", label: "Legal Support Available" }
  ];

  const values = [
    { icon: Target, title: "Uncompromising Precision", desc: "Every GST and FSSAI application is double-audited by senior legal counsel to ensure absolutely zero rejection margins." },
    { icon: Scale, title: "Absolute Transparency", desc: "No hidden government challans. No surprise professional fees. Everything is flawlessly mapped on your dashboard." },
    { icon: ShieldCheck, title: "Military-Grade Security", desc: "Your PAN, Aadhaar, and corporate bank statements are protected via AES-256 encryption at rest." }
  ];

  return (
    <div className="min-h-screen pt-0 pb-24 bg-background overflow-hidden relative">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-primary/5 blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-12 pb-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6 border border-primary/20">
            Our Story
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 text-foreground tracking-tight leading-tight">
            Rewriting the rules of <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-500">Corporate Compliance.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            Legal Search India was forged with a singular mission: to tear down the bureaucratic barriers stopping Indian entrepreneurs from building the future.
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 mb-32 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat, i) => (
            <div key={i} className="bg-card border border-border/50 rounded-3xl p-8 text-center hover:border-primary/30 transition-all hover:-translate-y-1 shadow-lg">
              <h2 className="text-4xl md:text-5xl font-black text-foreground mb-2">{stat.value}</h2>
              <p className="text-sm md:text-base font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* CEO & Founder Details Section */}
      <section className="container mx-auto px-4 mb-32 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="lg:w-1/2 relative flex justify-center perspective-[1000px]"
          >
            {/* Elegant Leaf-Shaped Background Accent matching homepage request */}
            <div 
              className="absolute w-full max-w-[400px] aspect-[4/5] bg-primary/20 rotate-6 translate-x-4 translate-y-6 rounded-[200px_0_200px_0]"
            />
            {/* Profile Image container identical to the premium aesthetic requested */}
            <div className="aspect-[4/5] relative w-full max-w-[400px] overflow-hidden bg-muted shadow-[0_30px_60px_-20px_rgba(var(--primary),0.4)] z-10 rounded-[200px_0_200px_0]">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent mix-blend-overlay z-10 pointer-events-none" />
              <div className="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800')" }} />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <div className="flex items-center gap-3 mb-6">
              <Award className="text-primary w-8 h-8" />
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground">Meet The Visionary</h2>
            </div>
            
            <p className="text-2xl text-muted-foreground font-medium italic mb-8 border-l-4 border-primary pl-6">
              "The Indian enterprise deserves a digital backbone that is as fast and ambitious as the founders building it. We refuse to let brilliant ideas stall in government waiting rooms."
            </p>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed mb-10">
              <p>
                Akash Verma conceptualized Legal Search India after witnessing countless brilliant startups bleed runway capital due to delayed GSTIN allocations and complex FSSAI rejections.
              </p>
              <p>
                Under his leadership, what began as a boutique advisory firm has aggressively pivoted into a full-scale digital SaaS powerhouse, integrating direct API channels with government portals to drastically reduce compliance friction.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-1 bg-primary rounded-full"></div>
              <div>
                <h4 className="text-2xl font-bold text-foreground">Akash Verma</h4>
                <p className="text-primary font-bold uppercase tracking-widest text-sm mt-1">CEO & Founder</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values / Details array */}
      <section className="container mx-auto px-4 mb-32 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Our Fundamental Pillars</h2>
          <p className="text-xl text-muted-foreground">The operational laws we strictly adhere to while processing over ₹500Cr in compliant transactional setups.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-card border border-border/50 rounded-3xl p-10 hover:shadow-2xl hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <val.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">{val.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="container mx-auto px-4">
        <div className="bg-primary border border-primary-foreground/10 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          <h2 className="text-4xl md:text-5xl font-black text-primary-foreground mb-6 relative z-10">Join the Compliant Revolution</h2>
          <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto relative z-10">
            Stop worrying about strict government deadlines. Let our digital architecture safeguard your organization permanently.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <Link href="/services" className="px-8 py-4 bg-background text-foreground font-bold rounded-xl shadow-xl hover:scale-105 transition-transform flex items-center justify-center gap-2">
              Explore Services <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
