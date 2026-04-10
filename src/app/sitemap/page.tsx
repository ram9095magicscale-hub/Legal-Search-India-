'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Sitemap() {
  const routes = [
    {
      group: "Primary Pages",
      links: [
        { name: "Home", href: "/" },
        { name: "Services", href: "/services" },
        { name: "Blogs & Insights", href: "/blogs" },
        { name: "Careers", href: "/career" },
      ]
    },
    {
      group: "Core Services",
      links: [
        { name: "GST Registration", href: "/services/gst-registration" },
        { name: "FSSAI Registration", href: "/services/fssai-registration" },
        { name: "GST Return Filing", href: "/services/gst-filing" },
        { name: "Trademark Registration", href: "/services/trademark" },
        { name: "Company Incorporation", href: "/services/incorporation" },
        { name: "ISO Certification", href: "/services/iso" },
      ]
    },
    {
      group: "Legal & Compliance",
      links: [
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms of Service", href: "/terms-of-service" },
        { name: "Refund Policy", href: "/refund-policy" },
      ]
    },
    {
      group: "Authentication",
      links: [
        { name: "User Login", href: "/login" },
        { name: "Create Account", href: "/signup" },
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-0 pb-24 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6 border border-primary/20">
            Directory
          </div>
          <h1 className="text-4xl lg:text-6xl font-black mb-6 text-foreground tracking-tight">Sitemap</h1>
          <p className="text-lg text-muted-foreground mb-12 border-b border-border/50 pb-8">
            Navigate through the complete digital architecture of Legal Search India.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {routes.map((section, index) => (
              <div key={index} className="bg-card border border-border/50 rounded-3xl p-8 hover:border-primary/20 transition-all">
                <h2 className="text-xl font-bold mb-6 text-foreground border-b border-border/50 pb-4">{section.group}</h2>
                <ul className="space-y-3">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors font-medium relative group inline-flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-3 group-hover:scale-150 transition-all" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </div>
  );
}
