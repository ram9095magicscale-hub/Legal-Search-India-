'use client';

import { motion } from 'framer-motion';

export default function TermsOfService() {
  return (
    <div className="min-h-screen pt-0 pb-24 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6 border border-primary/20">
            Legal Compliance
          </div>
          <h1 className="text-4xl lg:text-6xl font-black mb-6 text-foreground tracking-tight">Terms of Service</h1>
          <p className="text-lg text-muted-foreground mb-12">Last Updated: April 2026</p>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                By accessing or using Legal Search India's suite of digital registration tools, you agree strictly to be dynamically bound by these Terms of Service. If you do not agree to these terms, you must immediately halt the use of our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">2. User Obligations & Documents</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                It is absolutely strictly required that all corporate documents (PAN, Aadhaar, Bank Statements) uploaded are authentic, unaltered, and legally valid. Legal Search India utilizes automated verification endpoints. Submitting falsified documents is an immediate breach of platform integrity resulting in instant IP suspension and reporting to government ministries. 
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">3. Service Timelines</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                While Legal Search India promises rapid handling (often within 3 business days), final issuance of GSTINs, FSSAI licenses, and Trademark certificates rests perfectly entirely within the authority of respective Indian Government portals. We are not legally liable for government-side database failures, bureaucratic delays, or external rejections.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">4. System Integrity</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Attempting to scrape, modify, penetrate, or manipulate our 3D interactive user interface or API structures will result in permanent bans and immediate automated legal action under the IT ACT 2000. 
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
