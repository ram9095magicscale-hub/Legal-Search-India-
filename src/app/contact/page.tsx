'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { CONTACT_DETAILS } from '@/lib/constants';

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'GST Registration',
    message: ''
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Something went wrong. Please try again.');
      }

      setFormState('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'GST Registration',
        message: ''
      });
    } catch (err: any) {
      setError(err.message);
      setFormState('idle');
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      value: CONTACT_DETAILS.phone,
      description: "Available from 9am to 6pm",
      href: `tel:${CONTACT_DETAILS.phone.replace(/\s/g, '')}`
    },
    {
      icon: Mail,
      title: "Email Us",
      value: CONTACT_DETAILS.email,
      description: "We'll respond within 24 hours",
      href: `mailto:${CONTACT_DETAILS.email}`
    },
    {
      icon: MapPin,
      title: "Visit Our Office",
      value: CONTACT_DETAILS.address,
      description: "Rajokri, New Delhi",
      href: CONTACT_DETAILS.mapsLink
    },
    {
      icon: Clock,
      title: "Working Hours",
      value: CONTACT_DETAILS.workingHours,
      description: "Closed on Sundays",
      href: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      {/* Background accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Get In Touch
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-black tracking-tight mb-6"
            >
              How can we <br className="hidden md:block" />
              <span className="text-primary italic">help your business?</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Have a question about our services or need expert legal advice? Our team is here to provide the support you need.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Contact Info Grid */}
            <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
              {contactInfo.map((info, idx) => (
                <motion.a
                  key={idx}
                  href={info.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 + 0.3 }}
                  className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/40 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <info.icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{info.title}</h3>
                    <p className="text-sm font-medium text-primary mb-1">{info.value}</p>
                    <p className="text-xs text-muted-foreground">{info.description}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-7 bg-card border border-border/50 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
            >
              {formState === 'success' ? (
                <div className="flex flex-col items-center justify-center text-center py-12 space-y-6">
                  <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={48} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">Thank you for reaching out. Our team will get back to you shortly.</p>
                  </div>
                  <button 
                    onClick={() => setFormState('idle')}
                    className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-2">Send us a message</h2>
                    <p className="text-muted-foreground">Fill out the form below and we'll get right back to you.</p>
                  </div>

                  {error && (
                    <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium rounded-xl">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold ml-1">Full Name</label>
                        <input 
                          required
                          type="text" 
                          placeholder="John Doe" 
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-5 py-4 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold ml-1">Email Address</label>
                        <input 
                          required
                          type="email" 
                          placeholder="john@example.com" 
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-5 py-4 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold ml-1">Phone Number</label>
                        <input 
                          required
                          type="tel" 
                          placeholder="+91 00000 00000" 
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-5 py-4 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold ml-1">Service Interested In</label>
                        <select 
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-5 py-4 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        >
                          <option>GST Registration</option>
                          <option>FSSAI Registration</option>
                          <option>Trademark Registration</option>
                          <option>GST Filing</option>
                          <option>Other Services</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold ml-1">Message</label>
                      <textarea 
                        required
                        rows={4}
                        placeholder="Tell us about your requirements..." 
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-5 py-4 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                      />
                    </div>

                    <button 
                      disabled={formState === 'submitting'}
                      className="w-full group relative px-10 py-5 bg-primary text-primary-foreground font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-[0_20px_40px_-15px_hsl(var(--primary)/0.5)] overflow-hidden flex items-center justify-center gap-2"
                    >
                      {formState === 'submitting' ? (
                        <div className="w-6 h-6 border-4 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}

            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
