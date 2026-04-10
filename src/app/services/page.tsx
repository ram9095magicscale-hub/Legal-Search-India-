'use client';

import { motion } from 'framer-motion';
import { Building2, FileCheck2, ShieldCheck, Calculator, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
  const allServices = [
    {
      title: "GST Registration",
      description: "Quick and hassle-free Goods and Services Tax (GST) registration for your business, fully remote.",
      icon: Calculator,
      href: "/services/gst-registration",
    },
    {
      title: "FSSAI Registration",
      description: "Obtain your Food Safety and Standards Authority of India (FSSAI) license securely and rapidly with our expert help.",
      icon: Building2,
      href: "/services/fssai-registration",
    },
    {
      title: "Trademark Registration",
      description: "Protect your brand identity and secure exclusive rights to your logo, slogans, and business name.",
      icon: ShieldCheck,
      href: "/services/trademark",
    },
    {
      title: "GST Return Filing",
      description: "Timely and accurate GST return filing services by our expert corporate tax consultants.",
      icon: FileCheck2,
      href: "/services/gst-filing",
    },
    {
      title: "Company Incorporations",
      description: "Register your Private Limited Company, LLP, or OPC with comprehensive legal drafting support.",
      icon: Building2,
      href: "/services/incorporation",
    },
    {
      title: "ISO Certification",
      description: "Achieve globally recognized ISO certifications to build trust and standard-grade quality assurance.",
      icon: ShieldCheck,
      href: "/services/iso",
    }
  ];

  return (
    <div className="min-h-screen pt-0 pb-24">
      {/* Header */}
      <section className="container mx-auto px-4 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6 border border-primary/20">
            Our Offerings
          </div>
          <h1 className="text-5xl font-black mb-6 text-foreground tracking-tight">
            Premium Legal <span className="text-primary">Services</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            From seamless tax registrations to bulletproof trademarking, discover our comprehensive suite of digital legal solutions tailored for the modern Indian business.
          </p>
        </motion.div>
      </section>

      {/* Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allServices.map((service, i) => (
            <Link href={service.href} key={i} className="block group">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="relative bg-card border border-border/50 rounded-3xl p-8 hover:shadow-2xl hover:border-primary/50 transition-all duration-300 overflow-hidden flex flex-col h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-[0_0_20px_-5px_rgba(var(--primary),0.3)]">
                    <service.icon className="w-7 h-7" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground mb-8 line-clamp-3">{service.description}</p>
                  
                  <div className="mt-auto">
                    <div className="inline-flex items-center text-sm font-bold text-primary group-hover:text-foreground transition-colors">
                      Explore Details <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
