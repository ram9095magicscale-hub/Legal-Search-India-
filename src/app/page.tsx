'use client';

import { motion } from 'framer-motion';
import ThreeScene from '@/components/ui/ThreeScene';
import ServiceCard from '@/components/ui/ServiceCard';
import {
  Building2,
  FileCheck2,
  ShieldCheck,
  Calculator,
  CheckCircle2,
  Zap,
  HeadphonesIcon,
  Fingerprint
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const services = [
    {
      title: "GST Registration",
      description: "Quick and hassle-free Goods and Services Tax (GST) registration for your business, fully remote.",
      icon: Calculator,
      href: "/services/gst-registration",
      delay: 0.1
    },
    {
      title: "FSSAI Registration",
      description: "Obtain your Food Safety and Standards Authority of India (FSSAI) license with ease.",
      icon: Building2,
      href: "/services/fssai-registration",
      delay: 0.2
    },
    {
      title: "Trademark Registration",
      description: "Protect your brand identity and secure exclusive rights to your logo and business name.",
      icon: ShieldCheck,
      href: "/services/trademark",
      delay: 0.3
    },
    {
      title: "GST Return Filing",
      description: "Timely and accurate GST return filing services by our expert tax consultants.",
      icon: FileCheck2,
      href: "/services/gst-filing",
      delay: 0.4
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[75vh] pt-6 pb-16 md:pt-14 md:pb-20 overflow-hidden flex flex-col lg:block">
        {/* Background glow effects - structured for the documentation desk layout */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none transition-opacity duration-2000" />

        {/* Responsive 3D Canvas Layer */}
        <div className="relative w-full h-[45vh] lg:h-auto lg:absolute lg:inset-0 order-first lg:order-none z-0">
          <ThreeScene />
        </div>

        <div className="container mx-auto px-4 relative z-10 lg:mt-0 mt-8">
          <div className="max-w-4xl mx-auto lg:mx-0 lg:mr-auto text-center lg:text-left lg:pl-12">

            {/* Super Header / Trust Badge - Delayed to match paper reveal */}
            <motion.div
              initial={{ opacity: 0, lg: { x: -20 }, y: 20 }}
              animate={{ opacity: 1, lg: { x: 0 }, y: 0 }}
              transition={{ duration: 0.8, delay: 3 }}
              className="inline-flex items-center mx-auto lg:mx-0 gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Processing Your Digital Registration
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 3.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.05] text-balance">
                Start, Protect & <br className="hidden md:block" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-indigo-600 to-primary dark:from-sky-300 dark:via-indigo-400 dark:to-sky-300 animate-gradient-x">
                  Grow Your Business
                </span>
                <span className="text-foreground/20 block md:inline md:ml-4">Legally.</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 4, ease: "easeOut" }}
              className="text-lg md:text-2xl text-muted-foreground mb-12 max-w-2xl leading-relaxed"
            >
              Your one-stop premium platform for Company Registration, Trademark, GST, and FSSAI licensing. Let our elite CA/CS experts handle your compliance hassle-free under one roof.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 4.5, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-6"
            >
              <Link
                href="/signup"
                className="group relative px-10 py-5 bg-primary text-primary-foreground font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-[0_20px_40px_-15px_hsl(var(--primary)/0.5)] w-full sm:w-auto text-center overflow-hidden"
              >
                <span className="relative z-10">Get Your Document Now</span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>

          {/* Premium Trust Cards (Full Width Desktop) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 5.5 }}
            className="mt-16 lg:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-10 border-t border-border/10 w-full"
          >
            {[
              { label: "Approval Status", value: "Instant", icon: Zap },
              { label: "Support", value: "Live Agent", icon: HeadphonesIcon },
              { label: "Compliance", value: "100% Legal", icon: ShieldCheck },
              { label: "Delivery", value: "Digital ID", icon: Fingerprint }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 5.5 + (i * 0.1), ease: "easeOut" }}
                whileHover={{ y: -5 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-2xl bg-muted/20 hover:bg-muted/40 border border-white/5 hover:border-primary/30 transition-all duration-300 group backdrop-blur-md shadow-[0_8px_30px_-12px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_-12px_hsl(var(--primary)/0.25)]"
              >
                <div className="flex-shrink-0 p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] transition-all duration-300">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-lg font-bold text-foreground leading-none group-hover:text-primary transition-colors">{stat.value}</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">{stat.label}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* NEW About Us Section (CEO Message) */}
      <section id="about" className="py-24 bg-background z-20 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-5/12 relative w-full flex justify-center py-8"
            >
              {/* Premium Background Accent Frame */}
              <div
                className="absolute w-full max-w-[320px] aspect-[3/4] bg-primary/10 border border-primary/30 rotate-3 translate-x-4 translate-y-4 rounded-[150px_150px_32px_32px] md:rounded-[200px_200px_32px_32px]"
              />

              {/* Premium image container - Elegant Arch without Diagonal Cut */}
              <div className="aspect-[3/4] relative w-full max-w-[320px] overflow-hidden bg-muted border border-border shadow-[0_20px_50px_-20px_rgba(0,0,0,0.3)] z-10 rounded-[150px_150px_32px_32px] md:rounded-[200px_200px_32px_32px]"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent mix-blend-overlay z-10 pointer-events-none" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 z-20 rounded-[inherit]" />
                <div className="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800')" }} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-7/12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6 border border-primary/20">
                About Us
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground leading-tight">A Message from our Founder & CEO</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed italic border-l-4 border-primary/50 pl-6">
                "At Legal Search India, our mission has always been to democratize legal registration. For too long, the process has been clouded by unnecessary complexity, delays, and hidden costs."
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                "We built this platform to completely strip away the friction. Whether you're registering for GST or filing your annual FSSAI compliance, you deserve a system that is transparent, incredibly fast, and 100% reliable. Welcome to the future of digital documentation."
              </p>
              <div>
                <h4 className="text-xl font-bold text-foreground">Akash Verma</h4>
                <p className="text-sm text-primary font-medium mt-1 uppercase tracking-wide">CEO & Founder, Legal Search India</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-6"
            >
              Our Premium Services
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg"
            >
              Expert solutions tailored for your business growth. We handle the paperwork so you can focus on what matters most.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <ServiceCard key={idx} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section id="how-we-work" className="py-24 relative bg-background border-t border-border/50">
        <div className="absolute inset-0 bg-primary/5 blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-foreground tracking-tight">
              How we work?
            </h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full" />
          </div>

          <div className="relative mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-6">
            {/* Horizontal Connector Timeline (Visible only on large devices) */}
            <div className="hidden lg:block absolute top-[50%] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent -translate-y-[50%] z-0 shadow-[0_0_15px_hsl(var(--primary)/0.5)]" />

            {[
              "Fill-up the form & make the payments",
              "Get the call from our filings expert",
              "Upload the documents, details as requested",
              "Experts will take your approval for the filing process",
              "We will execute the entire filing procedure for your business"
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`Relative z-10 bg-card border border-border/50 p-8 flex flex-col justify-center text-center group hover:border-primary/50 hover:shadow-[0_20px_40px_-15px_rgba(var(--primary),0.3)] transition-all duration-500 min-h-[200px] backdrop-blur-xl relative overflow-visible ${
                  i % 2 === 0 
                  ? "rounded-[40px_0_40px_0] lg:-translate-y-6" 
                  : "rounded-[0_40px_0_40px] lg:translate-y-6"
                }`}
              >
                {/* Embedded Node Counter */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black text-lg border-[4px] border-background shadow-xl group-hover:scale-110 transition-transform duration-300 z-20">
                  {i + 1}
                </div>

                {/* Massive Animated Background Watermark */}
                <div className="absolute inset-0 flex items-center justify-center text-[10rem] font-black text-primary/[0.03] select-none pointer-events-none group-hover:text-primary/[0.08] transition-colors duration-500 overflow-hidden">
                  {i + 1}
                </div>
                
                <p className="text-sm font-bold text-foreground leading-relaxed relative z-10 group-hover:text-primary transition-colors">
                  {step}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose" className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-indigo-500 rounded-3xl blur-[50px] opacity-20" />
              <div className="relative bg-card border border-border p-12 rounded-3xl shadow-2xl">
                <ol className="space-y-8">
                  {[
                    { title: "Fill Details", desc: "Simple and intuitive forms." },
                    { title: "Make Payment", desc: "100% secure payment gateway." },
                    { title: "Document Processing", desc: "Our CA/CS experts verify & file." },
                    { title: "Get Certified", desc: "Receive updates directly on dashboard." }
                  ].map((step, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 font-bold">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{step.title}</h4>
                        <p className="text-sm text-muted-foreground">{step.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <h2 className="text-4xl font-bold mb-6 pt-0">Why choose Legal Search India?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                We combine industry-leading expertise with bleeding-edge technology to give you an unparalleled legal registration experience. Speed, accuracy, and support are at the heart of our platform.
              </p>

              <ul className="space-y-4">
                {[
                  "100% Online Process",
                  "Expert Team of Professionals",
                  "Transparent Pricing & No Hidden Fees",
                  "24/7 Dedicated Support"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-primary w-6 h-6" />
                    <span className="text-foreground font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* News & Articles Section */}
      <section id="news" className="py-24 bg-muted/20 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-6">News & Compliance Updates</h2>
            <p className="text-muted-foreground text-lg">Stay updated with the latest in Indian corporate law, tax filing deadlines, and mandatory compliance changes.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { slug: "important-changes-gst-deadline-2026", tag: "Compliance", title: "Important Changes to GST Filing Deadlines in 2026", desc: "Ensure your business is fully compliant with the latest government directives...", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800" },
              { slug: "fssai-mandatory-cloud-kitchens", tag: "Business Growth", title: "Why FSSAI Registration is Mandatory for Home Kitchens", desc: "A detailed breakdown of the new policies affecting cloud kitchens...", image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=800" },
              { slug: "trademarking-saas-logo", tag: "IP Protection", title: "The Ultimate Guide to Trademarking Your SaaS Logo", desc: "Protecting digital assets in the modern Indian tech ecosystem...", image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=800" }
            ].map((article, i) => (
              <Link href={`/blogs/${article.slug}`} key={i} className="block group rounded-2xl border border-border/50 bg-card overflow-hidden hover:shadow-[0_20px_50px_-20px_rgba(var(--primary),0.3)] hover:border-primary/50 transition-all cursor-pointer">
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/20 mix-blend-overlay group-hover:bg-transparent transition-all duration-500 z-10" />
                  <div 
                    className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                    style={{ backgroundImage: `url('${article.image}')` }}
                  />
                </div>
                <div className="p-6">
                  <div className="text-xs text-primary font-bold uppercase tracking-widest mb-3">{article.tag}</div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{article.title}</h3>
                  <p className="text-sm text-muted-foreground">{article.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Get In Touch Section */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto bg-card border border-border/50 rounded-3xl p-8 md:p-16 text-center shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)]">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Our experts are standing by to guide you through your registration process. Drop us a message or call our support line.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/contact" className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/50">
                Contact Our Team
              </Link>
              <Link href="/support" className="px-8 py-4 bg-transparent border border-border hover:border-primary text-foreground font-bold rounded-xl hover:bg-muted transition-all">
                View FAQs
              </Link>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
