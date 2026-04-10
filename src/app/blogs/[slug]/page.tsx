'use client';

import { motion } from 'framer-motion';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, Share2 } from 'lucide-react';

const mockArticles: Record<string, any> = {
  "important-changes-gst-deadline-2026": {
    tag: "Compliance",
    title: "Important Changes to GST Filing Deadlines in 2026",
    desc: "Ensure your business is fully compliant with the latest government directives regarding late fees and updated tax brackets.",
    date: "April 2, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200",
    content: [
      { type: 'h2', text: 'Executive Summary' },
      { type: 'p', text: 'The Ministry of Finance has recently issued notifications altering the foundational deadlines for GSTR-1 and GSTR-3B filings starting Q2 of 2026. This restructuring is primarily aimed at curbing Input Tax Credit (ITC) discrepancies and accelerating the reconciliation cycle for massive B2B supply chains.' },
      { type: 'p', text: 'In the past, minor delays were often met with leniency or minimal late fees. The digitized framework now automatically aggregates delays across the GSTN portal, applying compound interest thresholds dynamically.' },
      { type: 'h2', text: 'Key Policy Shifts' },
      { type: 'p', text: '1. GSTR-1 Acceleration: Businesses scaling above ₹5 Crore in aggregate turnover are now mandated to lock their outbound supply invoices by the 9th of every month, shifting from the traditional 11th.' },
      { type: 'p', text: '2. Auto-Populated Liabilities: The GSTR-3B will now strictly hard-lock based on the exact figures generated from your outward logistics. Manual overrides exceeding a 5% margin will immediately flag the account for departmental audit.' },
      { type: 'h2', text: 'How to Prepare' },
      { type: 'p', text: 'Switching to automated ERP integrations and partnering with an API-driven filing service (like Legal Search India) is no longer a luxury, but an operational necessity to survive the tightening compliance window.' }
    ]
  },
  "fssai-mandatory-cloud-kitchens": {
    tag: "Business Growth",
    title: "Why FSSAI Registration is Mandatory for Home Kitchens",
    desc: "A detailed breakdown of the new policies affecting cloud kitchens, online food deliveries, and independent bakers.",
    date: "March 28, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=1200",
    content: [
      { type: 'h2', text: 'The Rise of the Home Bakery' },
      { type: 'p', text: 'Post-pandemic, the Indian culinary landscape witnessed an explosion of home-based bakers, cloud kitchens, and micro-delivery networks. However, integrating with platforms like Zomato, Swiggy, or even scaling through Instagram now strictly requires a 14-digit FSSAI registration number.' },
      { type: 'h2', text: 'Legal Repercussions of Non-Compliance' },
      { type: 'p', text: 'Operating without an active FSSAI Basic License (for under ₹12 Lakh annual turnover) can result in an unexpected ₹5,000 to ₹50,000 fine depending on the state authority constraints. Furthermore, any consumer complaint lodged without a valid FSSAI ID immediately defaults liability heavily onto the unregistered proprietor.' },
      { type: 'h2', text: 'The Modern FoSCoS Process' },
      { type: 'p', text: 'Fortunately, the physical paperwork bureaucracy has been entirely replaced by the digital FoSCoS portal. Acquiring a basic license requires minimal documentation—often just an Aadhaar, a utility bill, and a basic hygiene declaration.' }
    ]
  },
  "trademarking-saas-logo": {
    tag: "IP Protection",
    title: "The Ultimate Guide to Trademarking Your SaaS Logo",
    desc: "Protecting digital assets in the modern Indian tech ecosystem requires more than just a copyright. Learn the exact IP steps.",
    date: "March 15, 2026",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=1200",
    content: [
      { type: 'h2', text: 'Copyright vs. Trademark' },
      { type: 'p', text: 'A common pitfall for young Indian tech startups is confusing a copyright with a trademark. While a copyright protects the actual source code or artistic illustration, a Trademark protects the specific commercial application of your Logo in the marketplace so competitors cannot launch confusingly similar branding.' },
      { type: 'h2', text: 'Choosing the Right Class' },
      { type: 'p', text: 'Most software products and SaaS platforms fall distinctly under Class 9 (Computer Software) and Class 42 (Software as a Service). It is crucial to file your application distinctly across the correct Nice Classification sectors to prevent legal loopholes.' },
      { type: 'h2', text: 'The Search Protocol' },
      { type: 'p', text: 'Never finalize your application without executing a comprehensive Public Search on the IP India database. Ensuring linguistic phonetics do not clash with existing conglomerates will save you from painful Objection hearings down the line.' }
    ]
  },
  "navigating-interstate-eway-bills": {
    tag: "Taxation",
    title: "Navigating Interstate E-Way Bill Mechanics",
    desc: "Everything transport agencies and drop-shippers need to know regarding digital e-way bills cross state borders.",
    date: "March 01, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200",
    content: [
      { type: 'h2', text: 'E-Way Bill Fundamentals' },
      { type: 'p', text: 'The implementation of the E-Way Bill under the GST regime radically revolutionized logistics. Any movement of physical goods exceeding ₹50,000 in invoice value strictly mandates the digital generation of this bill prior to vehicle transit.' },
      { type: 'h2', text: 'Validity & Expirations' },
      { type: 'p', text: 'Crucially, an E-way bill is not valid infinitely. The validity dynamically computes based on physical distance—generally 1 day for every 200 kilometers of travel for standard cargo. If a truck breaks down, operators must manually extend the bill window within 8 hours of expiration to avoid confiscation.' }
    ]
  }
};

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug as string;
  const article = mockArticles[slug];

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-0 pb-24 bg-background">
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

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 text-foreground tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12 border-l-4 border-primary/50 pl-6 italic">
            {article.desc}
          </p>
        </motion.div>

        {/* Cinematic Cover Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full aspect-[21/9] rounded-3xl overflow-hidden mb-16 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border border-border/50 relative"
        >
          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10" />
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
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
                return <h2 key={i} className="text-3xl font-bold text-foreground mt-12 mb-6">{block.text}</h2>;
              }
              return <p key={i} className="mb-6">{block.text}</p>;
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
