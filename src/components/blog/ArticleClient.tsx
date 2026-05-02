'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, Calendar, Share2, Edit3 } from 'lucide-react';

interface ArticleClientProps {
  article: any;
  isAdmin: boolean;
}

export default function ArticleClient({ article, isAdmin }: ArticleClientProps) {
  // Formatting Parser for Bold Text (**bold**)
  const parseFormatting = (text: string) => {
    if (!text) return '';
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  return (
    <div className="min-h-screen pt-0 pb-24 bg-background relative">
      {/* Admin Quick Edit Shortcut */}
      {isAdmin && (
        <div className="fixed bottom-10 right-10 z-[100]">
          <Link 
            href={`/admin/blogs/${article._id}`}
            className="flex items-center gap-3 px-6 py-4 bg-primary text-primary-foreground rounded-2xl font-black text-xs uppercase tracking-widest shadow-[0_20px_40px_-10px_rgba(var(--primary),0.5)] hover:scale-110 active:scale-95 transition-all border border-white/10 group"
          >
            <Edit3 className="w-4 h-4 group-hover:rotate-12 transition-transform" /> Edit This Article
          </Link>
        </div>
      )}

      <article className="container mx-auto px-4 max-w-4xl">
        
        {/* Breadcrumb Navigation */}
        <Link href="/blogs" className="inline-flex items-center text-sm font-bold text-muted-foreground hover:text-primary transition-colors mb-12">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Legal Ledger
        </Link>
        
        {/* Header Elements */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest rounded-full">{article.tag}</span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium uppercase tracking-wide"><Clock className="w-3.5 h-3.5"/> {article.readTime}</span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium uppercase tracking-wide"><Calendar className="w-3.5 h-3.5"/> {article.date}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 text-foreground tracking-tight leading-tight" dangerouslySetInnerHTML={{ __html: parseFormatting(article.title) }} />

          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12 border-l-4 border-primary/50 pl-6 italic" dangerouslySetInnerHTML={{ __html: parseFormatting(article.desc) }} />
        </motion.div>

        {/* Cinematic Cover Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full aspect-[21/9] rounded-3xl overflow-hidden mb-16 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border border-border/50 relative"
        >
          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10" />
          <Image 
            src={article.image} 
            alt={article.title} 
            fill 
            className="object-cover" 
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
          />
        </motion.div>

        {/* Content Body Layout */}
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Main Prose */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
            className="md:w-3/4 space-y-8 text-lg font-medium text-muted-foreground leading-loose"
          >
            {article.content.map((block: any, i: number) => {
              if (block.type === 'h2') {
                return <h2 key={i} className="text-3xl font-bold text-foreground mt-12 mb-6" dangerouslySetInnerHTML={{ __html: parseFormatting(block.text) }} />;
              }
              if (block.type === 'h3') {
                return <h3 key={i} className="text-2xl font-bold text-foreground mt-8 mb-4 opacity-90" dangerouslySetInnerHTML={{ __html: parseFormatting(block.text) }} />;
              }
              if (block.type === 'image') {
                return (
                  <div key={i} className="relative w-full aspect-video rounded-2xl border border-border/50 my-8 shadow-lg overflow-hidden">
                    <Image 
                      src={block.url} 
                      alt="" 
                      fill 
                      className="object-cover" 
                      sizes="(max-width: 768px) 100vw, 672px"
                    />
                  </div>
                );
              }
              if (block.type === 'ul' || block.type === 'list') {
                return (
                  <ul key={i} className="space-y-4 my-8 list-none">
                    {block.items?.map((item: string, idx: number) => (
                      <li key={idx} className="flex gap-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-3 flex-shrink-0" />
                        <span dangerouslySetInnerHTML={{ __html: parseFormatting(item) }} />
                      </li>
                    ))}
                  </ul>
                );
              }
              if (block.type === 'ol') {
                return (
                  <ol key={i} className="space-y-4 my-8 list-none counter-reset-item">
                    {block.items?.map((item: string, idx: number) => (
                      <li key={idx} className="flex gap-4">
                        <span className="text-primary font-black min-w-[1.5rem] tracking-tighter">{idx + 1}.</span>
                        <span dangerouslySetInnerHTML={{ __html: parseFormatting(item) }} />
                      </li>
                    ))}
                  </ol>
                );
              }
              return <p key={i} className="mb-6" dangerouslySetInnerHTML={{ __html: parseFormatting(block.text) }} />;
            })}
          </motion.div>

          {/* Social Share Sidebar */}
          <div className="md:w-1/4">
            <div className="sticky top-32 flex flex-col items-start gap-4">
              <span className="text-sm font-bold text-foreground uppercase tracking-widest mb-2 flex items-center gap-2"><Share2 className="w-4 h-4"/> Share Article</span>
              <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl bg-card border border-border/50 hover:bg-[#1DA1F2]/10 hover:border-[#1DA1F2]/50 hover:text-[#1DA1F2] transition-colors text-muted-foreground font-semibold text-sm">
                Share on Twitter
              </button>
              <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl bg-card border border-border/50 hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/50 hover:text-[#0A66C2] transition-colors text-muted-foreground font-semibold text-sm">
                Share on LinkedIn
              </button>
            </div>
          </div>
        </div>

      </article>
    </div>
  );
}
