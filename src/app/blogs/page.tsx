'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function BlogsPage() {
  const articles = [
    { 
      slug: "important-changes-gst-deadline-2026",
      tag: "Compliance", 
      title: "Important Changes to GST Filing Deadlines in 2026", 
      desc: "Ensure your business is fully compliant with the latest government directives regarding late fees and updated tax brackets.",
      date: "April 2, 2026",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800"
    },
    { 
      slug: "fssai-mandatory-cloud-kitchens",
      tag: "Business Growth", 
      title: "Why FSSAI Registration is Mandatory for Home Kitchens", 
      desc: "A detailed breakdown of the new policies affecting cloud kitchens, online food deliveries, and independent bakers.",
      date: "March 28, 2026",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=800"
    },
    { 
      slug: "trademarking-saas-logo",
      tag: "IP Protection", 
      title: "The Ultimate Guide to Trademarking Your SaaS Logo", 
      desc: "Protecting digital assets in the modern Indian tech ecosystem requires more than just a copyright. Learn the exact IP steps.",
      date: "March 15, 2026",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=800"
    },
    { 
      slug: "navigating-interstate-eway-bills",
      tag: "Taxation", 
      title: "Navigating Interstate E-Way Bill Mechanics", 
      desc: "Everything transport agencies and drop-shippers need to know regarding digital e-way bills cross state borders.",
      date: "March 01, 2026",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800"
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
            Insights & Guides
          </div>
          <h1 className="text-5xl font-black mb-6 text-foreground tracking-tight">
            The Legal <span className="text-primary">Ledger</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Expert analysis, compliance updates, and practical guides designed to help you navigate India's corporate legal landscape safely.
          </p>
        </motion.div>
      </section>

      {/* Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {articles.map((article, i) => (
            <Link href={`/blogs/${article.slug}`} key={i} className="block group cursor-pointer flex flex-col md:flex-row gap-6 bg-card border border-border/50 rounded-3xl p-4 hover:shadow-[0_20px_50px_-20px_rgba(var(--primary),0.3)] hover:border-primary/50 transition-all duration-300">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="w-full flex flex-col md:flex-row gap-6 h-full"
              >
                <div className="w-full md:w-2/5 aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden relative flex-shrink-0">
                  <div className="absolute inset-0 bg-primary/20 mix-blend-overlay group-hover:bg-transparent transition-all z-10" />
                  <div 
                    className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                    style={{ backgroundImage: `url('${article.image}')` }}
                  />
                </div>
                
                <div className="w-full md:w-3/5 flex flex-col justify-center pr-4 pb-4 md:pb-0">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full">{article.tag}</span>
                    <span className="text-xs text-muted-foreground">{article.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl lg:text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-2">{article.desc}</p>
                  
                  <span className="text-xs font-bold text-muted-foreground mt-auto flex items-center gap-2">
                    {article.date} <ArrowRight className="w-4 h-4 ml-auto opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
