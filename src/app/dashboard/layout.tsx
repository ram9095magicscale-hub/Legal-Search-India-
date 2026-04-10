'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, UploadCloud, CreditCard, Settings, LogOut, HelpCircle, User, ChevronDown, ShieldCheck, Menu, X, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState({ name: 'User', role: 'client' });

  useEffect(() => {
    const cookies = document.cookie.split('; ');
    const name = cookies.find(r => r.startsWith('user-name='))?.split('=')[1] || 'Guest';
    const role = cookies.find(r => r.startsWith('user-role='))?.split('=')[1] || 'client';
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
    { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { href: '/dashboard/track-order', label: 'Track Order', icon: FileText },
    { href: '/dashboard/documents', label: 'Vault', icon: UploadCloud },
    { href: '/dashboard/billing', label: 'Billing & Orders', icon: CreditCard },
    { href: '/dashboard/profile', label: 'Profile', icon: User },
  ];

  const bottomLinks = [
    { href: '/dashboard/support', label: 'Help Center', icon: HelpCircle },
  ];

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col md:flex-row overflow-x-hidden">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-card/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-[60]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-black text-white text-xs">LS</div>
          <h2 className="font-extrabold text-lg text-foreground tracking-tight">Portal</h2>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 -mr-2 text-foreground hover:bg-muted rounded-xl transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[70] md:hidden"
            />
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 right-0 bg-background border-b border-border z-[80] md:hidden flex flex-col p-6 pt-20 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-b-[40px]"
            >
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/50">
                 <h1 className="text-xl font-black text-primary italic uppercase tracking-tighter">Client Portal</h1>
                 <button onClick={() => setIsMenuOpen(false)} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <X className="w-5 h-5 text-primary" />
                 </button>
              </div>

              <nav className="space-y-1 mb-6">
                {navLinks.map((link) => {
                   const Icon = link.icon;
                   const isActive = pathname === link.href;
                   return (
                     <Link
                       key={link.href}
                       href={link.href}
                       className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold tracking-tight ${isActive ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground hover:bg-muted'
                        }`}
                     >
                       <Icon className="w-5 h-5" /> {link.label}
                     </Link>
                   );
                })}
              </nav>

              <nav className="space-y-1 mb-8">
                {bottomLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-4 px-6 py-4 rounded-2xl text-muted-foreground hover:bg-muted font-bold transition-all"
                    >
                      <Icon className="w-5 h-5" /> {link.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-6 border-t border-border flex flex-col gap-3">
                <Link
                  href="/"
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-muted-foreground bg-muted/30 hover:bg-muted font-bold transition-all group"
                >
                  <Home className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" /> Exit Portal
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-destructive bg-destructive/5 hover:bg-destructive/10 font-bold transition-all group"
                >
                   <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Sign Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar - Fixed to Left */}
      <aside className="hidden md:flex w-72 flex-col bg-card/80 backdrop-blur-xl border-r border-border/40 h-screen fixed left-0 top-0 shadow-[10px_0_50px_-20px_rgba(0,0,0,0.1)] dark:shadow-none overflow-hidden z-40">
        <div className="p-8 pb-6 bg-card/40 backdrop-blur-md border-b border-border/10 z-20">
          <Link href="/" className="group flex items-center justify-center">
            <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] font-black text-center group-hover:text-primary transition-colors italic">Client Portal</p>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto p-6 pt-6 no-scrollbar">
          <nav className="space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${isActive ? 'bg-primary/10 text-primary shadow-inner border border-primary/20' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent'
                    }`}
                >
                  <Icon className="w-5 h-5" /> {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-8 border-t border-border/50 space-y-2 mt-auto">
            {bottomLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-4 px-4 py-3 rounded-2xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all group"
                >
                  <Icon className="w-5 h-5 group-hover:text-primary transition-colors" /> {link.label}
                </Link>
              );
            })}
            <div className="flex flex-col gap-2 pt-2">
                <Link 
                    href="/" 
                    className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all group font-bold"
                >
                  <Home className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" /> Exit Portal
                </Link>
                <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-destructive hover:bg-destructive/10 font-black transition-all group uppercase tracking-widest text-[10px]">
                  <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" /> Sign Out
                </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Sandbox Area - Offset for fixed sidebar */}
      <main className="flex-1 min-w-0 flex flex-col md:ml-72 relative bg-background/50 dark:bg-background">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 blur-[100px] pointer-events-none rounded-full" />

        {/* Responsive Content Area */}
        <div className="flex-1 px-4 py-8 md:px-10 md:py-12 relative z-10 w-full overflow-x-hidden">
          {children}
        </div>
      </main>

    </div>
  );
}

