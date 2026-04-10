'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Home, Users, BarChart3, Database, ShieldAlert, LogOut, Settings, ChevronDown, User, ShieldCheck, Menu, X, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState({ name: 'Admin', role: 'admin' });

  useEffect(() => {
    const cookies = document.cookie.split('; ');
    const name = cookies.find(r => r.startsWith('user-name='))?.split('=')[1] || 'Admin Node';
    const role = cookies.find(r => r.startsWith('user-role='))?.split('=')[1] || 'admin';
    setUserData({ name: decodeURIComponent(name), role });
  }, []);

  // Close menu on navigation
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "user-role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "user-name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = '/';
  };

  const navLinks = [
    { href: '/admin', label: 'Overview', icon: Home, highlight: 'text-primary' },
    { href: '/admin/users', label: 'Users Directory', icon: Users, highlight: 'text-indigo-400' },
    { href: '/admin/staff', label: 'Staff Control', icon: ShieldCheck, highlight: 'text-emerald-400' },
    { href: '/admin/transactions', label: 'Fiscal Ledger', icon: CreditCard, highlight: 'text-amber-400' },
  ];

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row relative selection:bg-primary/30 overflow-x-hidden">
      {/* Admin Accent Bar */}
      <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-primary/50 via-primary to-primary/50 z-[100] transition-colors" />

      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-[60]">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-8 h-8 text-primary" />
          <h2 className="font-black text-lg text-foreground tracking-tighter uppercase italic">Control Panel</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 -mr-2 text-foreground hover:bg-primary/10 rounded-xl transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6 text-primary" /> : <Menu className="w-6 h-6 text-primary" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-background/90 backdrop-blur-md z-[70] md:hidden"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-sm:w-full bg-card border-l border-border z-[80] md:hidden flex flex-col p-8 pt-24"
            >
              <h1 className="text-2xl font-black text-foreground italic mb-10 tracking-widest border-b border-primary/20 pb-4 uppercase">Administrator</h1>

              <nav className="flex-1 space-y-4">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-5 px-6 py-5 rounded-3xl transition-all font-bold tracking-tight ${isActive ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm' : 'text-muted-foreground hover:text-primary hover:bg-muted'
                        }`}
                    >
                      <Icon className={`w-6 h-6 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} /> {link.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-8 border-t border-border mt-auto space-y-4">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-5 px-6 py-6 rounded-3xl text-rose-500 hover:bg-rose-500/10 font-black transition-all group"
                >
                  <LogOut className="w-6 h-6 group-hover:-translate-x-1 transition-transform" /> LOGOUT
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar - Fixed to Left */}
      <aside className="hidden md:flex w-80 flex-col bg-card border-r border-border h-[calc(100vh-80px)] fixed left-0 top-20 shadow-sm overflow-hidden z-40">
        <div className="p-10 pb-6 bg-card/40 backdrop-blur-md border-b border-border/50 z-20 text-center">
            <p className="text-[10px] text-primary uppercase font-black tracking-[0.3em] italic">Access: Authorized</p>
        </div>

        <div className="flex-1 overflow-y-auto p-8 pt-8 no-scrollbar">
          <nav className="space-y-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-4 px-6 py-4 rounded-[24px] transition-all border ${isActive ? 'bg-primary/5 text-primary font-black border-primary/20 shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted font-bold border-transparent'
                    }`}
                >
                  <Icon className={`w-5 h-5 ${link.highlight}`} /> {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-8 border-t border-border space-y-2 mt-auto">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-6 py-5 rounded-[24px] text-rose-500 hover:bg-rose-500/10 font-black transition-all mt-6 group uppercase tracking-widest text-[10px]"
            >
              <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Exit Dashboard
            </button>
          </div>
        </div>
      </aside>

      {/* Main Sandbox Area - Offset for fixed sidebar */}
      <main className="flex-1 min-w-0 flex flex-col md:ml-80 relative bg-muted/20 dark:bg-background">
        <div className="flex-1 p-4 md:p-10 relative z-10 w-full overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}

