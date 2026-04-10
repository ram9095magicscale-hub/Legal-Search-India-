'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { notFound, useParams, useRouter } from 'next/navigation';
import { 
  Building2, FileCheck2, Calculator, ArrowRight, ShieldCheck, 
  CheckCircle2, Clock, MapPin, Receipt, Factory, Utensils
} from 'lucide-react';
import Link from 'next/link';

// Mocked extracted content structure representing premium insights
const servicesData: Record<string, any> = {
  "gst-registration": {
    title: "GST Registration Online",
    subtitle: "Get your GSTIN number in just 3 Days with complete expert assistance.",
    icon: Calculator,
    heroDesc: "Mandatory for businesses crossing the threshold limit or engaged in e-commerce. Let our CA-assisted portal handle the complex documentation and swift GSTIN generation for you.",
    benefits: [
      "Legal recognition as valid supplier of goods/services.",
      "Input Tax Credit (ITC) mechanism to reduce tax liability.",
      "Legally permitted to collect tax from buyers.",
      "Ease of doing inter-state business.",
    ],
    documents: [
      "PAN Card and Aadhaar Card of founders.",
      "Proof of business registration or incorporation certificate.",
      "Identity and Address Proof.",
      "Bank Account Statement / Cancelled Check.",
      "Digital Signature (if applicable)."
    ],
    sidebarImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800"
  },
  "fssai-registration": {
    title: "FSSAI Registration & License",
    subtitle: "Basic, State, or Central Food License procured effortlessly.",
    icon: Utensils,
    heroDesc: "Every Food Business Operator (FBO) in India requires an active FSSAI License. Whether you run a cloud kitchen, a manufacturing plant, or a tiny food stall, we ensure 100% compliance.",
    benefits: [
      "Consumer Awareness & Built Trust.",
      "Legal Advantage when dealing with government inspections.",
      "Use of the FSSAI Logo for branding and packaging.",
      "Business Expansion opportunities (Zomato/Swiggy integration).",
    ],
    documents: [
      "Photo Identity of Promoters (PAN/Aadhaar/Voter ID).",
      "Utility bills of business premises.",
      "List of food products manufactured/processed.",
      "Food safety management system plan (For Central).",
      "NOCs from municipality (conditional)."
    ],
    sidebarImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800"
  },
  "gst-filing": {
    title: "GST Return Filing",
    subtitle: "Error-free monthly & annual GST Returns filed by certified experts.",
    icon: FileCheck2,
    heroDesc: "Filing GST returns strictly on time avoids heavy penalties and interest. Our tax specialists audit your ledgers and smoothly bridge the gap between sales invoices and compliance.",
    benefits: [
      "Eliminate late fees (up to ₹200/day).",
      "Maintain a high GST compliance rating.",
      "Claim maximum Input Tax Credit (ITC) without matching warnings.",
      "Secure banking confidence for corporate loans.",
    ],
    documents: [
      "Sales invoices (B2B and B2C splits).",
      "Purchase invoices for ITC matching.",
      "GSTR-1, GSTR-2A reports.",
      "Bank statements corresponding to specific periods.",
      "Challan copies for taxes previously paid."
    ],
    sidebarImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
  },
  "trademark": {
    title: "Trademark Registration",
    subtitle: "", // Trigger coming soon mode
    icon: ShieldCheck,
    comingSoon: true,
  }
};

export default function ServiceDetail() {
  const params = useParams();
  const slug = params.slug as string;
  
  const fallbackService = {
    title: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    comingSoon: true,
    icon: ShieldCheck
  };
  
  const service = servicesData[slug] || fallbackService;
  const IconComponent = service.icon || ShieldCheck;

  if (service.comingSoon) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 pb-20 bg-background text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 blur-[120px] pointer-events-none" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col items-center"
        >
          <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-8 shadow-[0_0_30px_-5px_rgba(var(--primary),0.3)]">
            <IconComponent className="w-12 h-12" />
          </div>
          <h1 className="text-5xl font-black mb-4">{service.title}</h1>
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-indigo-500/10 text-indigo-500 text-sm font-bold uppercase tracking-widest border border-indigo-500/20 mb-6">
            Coming Soon
          </div>
          <p className="text-xl text-muted-foreground max-w-lg mb-8 leading-relaxed">
            We are actively finalized integration steps for this specific service. Please check back next week to apply directly via our portal!
          </p>
          <Link href="/services" className="px-8 py-3 bg-muted hover:bg-muted/80 text-foreground rounded-full font-bold transition-all">
            Back to Services
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-0 pb-24 bg-background">
      {/* Master 2-Column Layout */}
      <div className="container mx-auto px-4 relative pt-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Left Column: Hero & Body */}
          <div className="lg:w-2/3 space-y-16 lg:space-y-24">
            
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <Link href="/services" className="inline-flex items-center text-sm font-bold text-muted-foreground hover:text-primary transition-colors mb-10">
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Back to all services
              </Link>
              
              <div className="flex items-start gap-6">
                <div className="hidden sm:flex w-20 h-20 bg-primary/10 rounded-2xl items-center justify-center text-primary flex-shrink-0 shadow-[0_0_30px_-5px_rgba(var(--primary),0.3)] mt-2">
                  <service.icon className="w-10 h-10" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-foreground tracking-tight leading-tight">
                    {service.title}
                  </h1>
                  <p className="text-xl md:text-2xl font-bold text-primary mb-6">{service.subtitle}</p>
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                    {service.heroDesc}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Key Advantages */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <ShieldCheck className="text-primary w-8 h-8" /> Core Advantages
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.benefits.map((ben: string, i: number) => (
                  <div key={i} className="flex gap-4 p-5 bg-card border border-border/50 rounded-2xl hover:border-primary/30 transition-colors">
                    <CheckCircle2 className="text-primary w-6 h-6 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground font-medium">{ben}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Documents Required */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <FileCheck2 className="text-primary w-8 h-8" /> Documents Required
              </h2>
              <ul className="space-y-4 bg-muted/20 border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
                {service.documents.map((doc: string, i: number) => (
                  <li key={i} className="flex items-center gap-4 text-lg text-foreground border-b border-border/50 pb-4 last:border-0 last:pb-0">
                    <div className="w-2 h-2 rounded-full bg-primary" /> {doc}
                  </li>
                ))}
              </ul>
            </motion.div>

          </div>

          {/* Right Floating Banner positioned beside Hero natively */}
          <div className="lg:w-1/3 relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
              className="sticky top-28 bg-card border border-border/50 rounded-3xl p-8 text-center shadow-2xl overflow-hidden mt-6"
            >
              <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
              {service.sidebarImage && (
                <div className="w-full h-48 mb-6 rounded-2xl overflow-hidden relative shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]">
                  <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 hover:bg-transparent transition-colors duration-500" />
                  <img src={service.sidebarImage} alt={service.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                </div>
              )}
              <h3 className="text-2xl font-bold mb-4 relative z-10">Ready to File?</h3>
              <p className="text-muted-foreground mb-8 relative z-10">Skip the bureaucratic queue. Connect directly with our dashboard and initiate your {service.title} today.</p>
              
              <OrderInitiator serviceName={service.title} />
              
              <Link href="/contact" className="flex items-center justify-center w-full px-6 py-4 bg-transparent border border-border text-foreground font-bold rounded-xl hover:bg-muted transition-all relative z-10">
                Talk to an Expert
              </Link>
              
              <p className="text-xs text-muted-foreground mt-6 flex items-center justify-center gap-2 relative z-10">
                <Clock className="w-4 h-4 text-primary"/> Approx 3-5 Working Days
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}

function OrderInitiator({ serviceName }: { serviceName: string }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsLoggedIn(document.cookie.includes('session=true'));
  }, []);

  const handleStart = async () => {
    if (!isLoggedIn) {
      router.push('/signup');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderName: serviceName }),
      });

      if (res.ok) {
        router.push('/dashboard');
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to initiate order');
      }
    } catch (err) {
      console.error('Order creation error', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleStart}
      disabled={loading}
      className="flex items-center justify-center w-full px-6 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-[0_10px_20px_-10px_hsl(var(--primary)/0.6)] group mb-4 relative z-10 disabled:opacity-50"
    >
      {loading ? "Processing..." : (
        <>
          Start Process <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </>
      )}
    </button>
  );
}
