'use client';

import { motion } from 'framer-motion';
import { CONTACT_DETAILS, SITE_CONFIG } from '@/lib/constants';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-24 pb-24 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6 border border-primary/20">
            Legal Compliance
          </div>
          <h1 className="text-4xl lg:text-6xl font-black mb-6 text-foreground tracking-tight">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground mb-12">Last Updated: April 2026</p>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                At {SITE_CONFIG.name}, we are committed to actively protecting your digital privacy. This Privacy Policy outlines how we securely collect, use, process, and safeguard your personal and sensitive corporate data across our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">2. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When utilizing our SaaS registration platform, we may collect the following data points to legally process your applications:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Personal Identifiers: Name, Email Address, Phone Number, PAN/Aadhaar.</li>
                <li>Business Data: Incorporation details, Financial statements, Trade secrets (for Trademark use).</li>
                <li>Technical Data: IP addresses, encrypted browser tokens, session activity securely routed via our servers.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">3. How We Secure Your Data</h2>
              <p className="text-muted-foreground leading-relaxed mb-4 flex flex-col gap-4">
                <span>All documents uploaded to {SITE_CONFIG.name} are protected via AES-256 military-grade encryption at rest. Network transit is locked down using strict TLS 1.3 cryptographic protocols.</span>
                <span>We do completely automated wiping of non-regulatory residual data per Indian IT ACT directives. Third-party contractors are strictly vetted and legally prohibited from replicating your digital assets.</span>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">4. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have concerns or queries regarding your digital footprint, you may instantly escalate a ticket via your dashboard or email our Data Protection Officer at <a href={`mailto:${CONTACT_DETAILS.privacyEmail}`} className="text-primary hover:underline">{CONTACT_DETAILS.privacyEmail}</a>.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
