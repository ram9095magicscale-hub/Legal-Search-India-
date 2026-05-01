'use client';

import { motion } from 'framer-motion';
import { HelpCircle, Plus, Minus, Search, MessageCircle, Mail, Phone, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

const faqs = [
  {
    category: "Registration",
    question: "What is GST Registration and do I need it?",
    answer: "GST Registration is a process by which a business becomes registered under the Goods and Services Tax law. Generally, if your business's turnover exceeds ₹40 lakhs (₹20 lakhs for services) in a financial year, you must register. However, certain businesses like e-commerce sellers are required to register regardless of turnover."
  },
  {
    category: "Registration",
    question: "How long does FSSAI registration take?",
    answer: "Basic FSSAI registration typically takes 7-10 working days. For State or Central licenses, it can take 30-60 days depending on the complexity and government review speed. Our experts handle all documentation to ensure the fastest possible processing."
  },
  {
    category: "Trademark",
    question: "Why should I trademark my brand name or logo?",
    answer: "A trademark protects your brand identity from competitors. It gives you exclusive rights to use the mark and allows you to take legal action against anyone who tries to copy your branding. It also builds trust with customers and adds value to your business as a digital asset."
  },
  {
    category: "Documents",
    question: "What documents are required for GST registration?",
    answer: "The primary documents needed are: PAN card of the business/applicant, Aadhaar card, proof of business address (like electricity bill or rent agreement), bank account statement, and photographs of the owners. For companies, certificate of incorporation and MoA/AoA are also required."
  },
  {
    category: "Tracking",
    question: "How can I track the status of my application?",
    answer: "Once you submit your application through Legal Search India, you can track its progress in real-time on your personal dashboard. We also provide email and SMS updates at every major milestone of the filing process."
  },
  {
    category: "Payments",
    question: "Can I get a refund if my application is rejected?",
    answer: "We strive for 100% accuracy. If an application is rejected due to an error on our part, we offer a full refund or re-filing at no extra cost. However, government fees are usually non-refundable by the authorities. Please check our Refund Policy for more details."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      {/* Background accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6"
            >
              <HelpCircle size={14} />
              Support Center
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-black tracking-tight mb-6"
            >
              Frequently Asked <br />
              <span className="text-primary italic">Questions.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              Find answers to common questions about GST, FSSAI, Trademarks, and how our platform helps your business stay compliant.
            </motion.p>

            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative max-w-xl mx-auto group"
            >
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={20} />
              <input 
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-5 rounded-2xl bg-card border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-xl font-medium"
              />
            </motion.div>
          </div>

          {/* FAQ List */}
          <div className="space-y-4 mb-20">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 + 0.4 }}
                  className={`group rounded-3xl border border-border/50 bg-card overflow-hidden transition-all duration-300 ${openIndex === idx ? 'border-primary/40 shadow-lg' : 'hover:border-primary/20 hover:bg-muted/30'}`}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-6 md:p-8 text-left"
                  >
                    <div className="flex items-start gap-4">
                      <span className="hidden md:flex flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary items-center justify-center text-xs font-black">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-1 block">
                          {faq.category}
                        </span>
                        <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors pr-8">
                          {faq.question}
                        </h3>
                      </div>
                    </div>
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${openIndex === idx ? 'bg-primary text-white scale-110' : 'bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary'}`}>
                      {openIndex === idx ? <Minus size={20} /> : <Plus size={20} />}
                    </div>
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="p-6 md:p-8 pt-0 ml-0 md:ml-12 text-muted-foreground leading-relaxed border-t border-border/20">
                      {faq.answer}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20 bg-card/50 rounded-3xl border border-dashed border-border/50">
                <Search size={48} className="mx-auto text-muted-foreground mb-4 opacity-20" />
                <h3 className="text-xl font-bold mb-2">No answers found</h3>
                <p className="text-muted-foreground">Try searching with different keywords or contact our support team.</p>
              </div>
            )}
          </div>

          {/* Still have questions? */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[40px] bg-gradient-to-br from-primary via-indigo-600 to-primary p-1 md:p-1.5 shadow-2xl overflow-hidden"
          >
            <div className="bg-card dark:bg-zinc-950 rounded-[35px] p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">
                Still have <span className="text-primary italic">questions?</span>
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
                We're here to help you 24/7. Our team of legal experts is just a message away.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <a href="mailto:support@legalsearchindia.com" className="group p-6 rounded-3xl border border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-all text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <Mail size={24} />
                  </div>
                  <h4 className="font-bold mb-1">Email Us</h4>
                  <p className="text-xs text-muted-foreground">Response in 24h</p>
                </a>
                <a href="tel:+918826073117" className="group p-6 rounded-3xl border border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-all text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <Phone size={24} />
                  </div>
                  <h4 className="font-bold mb-1">Call Us</h4>
                  <p className="text-xs text-muted-foreground">9am - 7pm IST</p>
                </a>
                <Link href="/contact" className="group p-6 rounded-3xl border border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-all text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <MessageCircle size={24} />
                  </div>
                  <h4 className="font-bold mb-1">Live Chat</h4>
                  <p className="text-xs text-muted-foreground">Instant support</p>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Back Home */}
          <div className="text-center mt-12">
            <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary font-bold transition-colors">
              <ArrowLeft size={16} />
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
