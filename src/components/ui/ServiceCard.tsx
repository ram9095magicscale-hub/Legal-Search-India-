'use client';

import { motion } from 'framer-motion';
import { LucideIcon, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  delay?: number;
}

export default function ServiceCard({ title, description, icon: Icon, href, delay = 0 }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
    >
      <Link href={href} className="group relative block h-full">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-indigo-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500" />
        <div className="relative bg-card border border-border rounded-2xl p-8 h-full flex flex-col hover:border-primary/50 transition-colors duration-300">
          <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-[0_0_20px_-5px_rgba(var(--primary),0.3)]">
            <Icon className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-muted-foreground text-sm flex-grow mb-6">{description}</p>
          
          <div className="inline-flex items-center text-sm font-semibold text-primary group-hover:text-indigo-400 transition-colors mt-auto">
            Learn More
            <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
