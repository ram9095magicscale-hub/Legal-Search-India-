'use client';

import { motion } from 'framer-motion';

export default function RefundPolicy() {
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
          <h1 className="text-4xl lg:text-6xl font-black mb-6 text-foreground tracking-tight">Refund Policy</h1>
          <p className="text-lg text-muted-foreground mb-12">Last Updated: April 2026</p>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">1. General Policy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Legal Search India strives to provide an impeccably fast and transparent registration experience. Since processing professional legal work involves labor, consultations, and non-refundable government fees, our refund matrix is strictly deterministic.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">2. Non-Refundable Government Challans</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Any fees paid explicitly to the Government of India via Challan generation (such as Trademark application fees or Central FSSAI license tariffs) are 100% non-refundable under any circumstances, even if your application is formally rejected by the issuing department. 
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">3. Professional Fee Returns</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Refunds for our professional platform fees are solely applicable if:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>You instantly cancel the service request within 2 hours of payment, strictly before any dashboard processing is initiated by our experts.</li>
                <li>An explicit technical failure on our platform structurally prevents your application from routing to the government.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                If eligible, the refund shall be credited back perfectly to the original API payment method (Stripe/Razorpay) within 5-7 business working days.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
