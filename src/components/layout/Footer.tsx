'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (pathname?.startsWith('/dashboard') || pathname?.startsWith('/admin') || pathname?.startsWith('/staff')) return null;

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <footer className="bg-muted/30 border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-1 mb-4">
              {/* Light mode logo (blue) */}
              <Image
                src="/images/logo-v2-light.png"
                alt="Legal Search India Logo"
                width={86}
                height={86}
                className={`object-contain transition-all duration-300 -mr-6 ${isDark ? 'hidden' : 'block'}`}
              />
              {/* Dark mode logo (white) */}
              <Image
                src="/images/logo-v2-dark.png"
                alt="Legal Search India Logo"
                width={86}
                height={86}
                className={`object-contain transition-all duration-300 -mr-6 ${isDark ? 'block' : 'hidden'}`}
              />
              <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400">
                Legal Search India
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Your one-stop premium platform for GST, FSSAI, and Trademark registrations. Simplifying your corporate compliances.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/services/gst-registration" className="hover:text-primary transition-colors">GST Registration</Link></li>
              <li><Link href="/services/fssai-registration" className="hover:text-primary transition-colors">FSSAI Registration</Link></li>
              <li><Link href="/services/trademark" className="hover:text-primary transition-colors">Trademark Registration</Link></li>
              <li><Link href="/services/gst-filing" className="hover:text-primary transition-colors">GST Return Filing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/blogs" className="hover:text-primary transition-colors">Blogs</Link></li>
              <li><Link href="/career" className="hover:text-primary transition-colors">Career</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/refund-policy" className="hover:text-primary transition-colors">Refund Policy</Link></li>
              <li><Link href="/sitemap" className="hover:text-primary transition-colors">Sitemap</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Legal Search India. All rights reserved.
          </p>
          <div className="flex gap-4">
             {/* Social links placeholder */}
             <div className="w-8 h-8 rounded-full bg-border flex items-center justify-center hover:bg-primary transition-colors cursor-pointer text-muted-foreground hover:text-primary-foreground">
                <span className="sr-only">Twitter</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
             </div>
             <div className="w-8 h-8 rounded-full bg-border flex items-center justify-center hover:bg-primary transition-colors cursor-pointer text-muted-foreground hover:text-primary-foreground">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"></path></svg>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
