'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Home, 
  Users, 
  UserCheck, 
  BarChart3, 
  ShieldCheck, 
  ClipboardList, 
  LogOut, 
  Settings, 
  Menu, 
  X, 
  IndianRupee,
  LayoutDashboard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState({ name: 'Admin', role: 'admin' });

  useEffect(() => {
    const cookies = document.cookie.split('; ');
    const name = cookies.find(r => r.startsWith('user-name='))?.split('=')[1] || 'Admin';
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
    { href: '/admin', label: 'Overview Dashboard', icon: LayoutDashboard, color: 'text-rose-500' },
    { href: '/admin/users', label: 'User Directory', icon: Users, color: 'text-blue-500' },
    { href: '/admin/clients', label: 'Active Clients', icon: UserCheck, color: 'text-emerald-500' },
    { href: '/admin/revenue', label: 'Revenue & Accounts', icon: IndianRupee, color: 'text-amber-500' },
    { href: '/admin/staff', label: 'Staff Control', icon: ShieldCheck, color: 'text-primary' },
    { href: '/admin/tasks', label: 'Task Tracker', icon: ClipboardList, color: 'text-purple-500' },
  ];

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row relative selection:bg-primary/30 overflow-x-hidden">
      {/* Admin Accent Bar */}
      <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-primary/50 via-primary to-primary/50 z-[100] transition-colors" />

      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-background border-b border-border sticky top-0 z-[60]">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-rose-500 rounded-xl flex items-center justify-center shadow-lg shadow-rose-500/20">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest leading-none mb-0.5 italic">Administrator</span>
            <span className="text-xs font-bold text-foreground">Control Panel</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-muted rounded-xl transition-all active:scale-90"
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
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 right-0 bg-background border-b border-border z-[80] md:hidden flex flex-col p-6 pt-20 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-b-[40px]"
            >
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/50">
                 <h1 className="text-xl font-black text-rose-500 italic uppercase">Administrator</h1>
                 <button onClick={() => setIsMenuOpen(false)} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <X className="w-5 h-5" />
                 </button>
              </div>

              <nav className="space-y-1 mb-8">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold tracking-tight ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'
                        }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : link.color}`} /> {link.label}
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
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-rose-500 bg-rose-500/5 hover:bg-rose-500/10 font-bold transition-all group"
                >
                  <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Logout Session
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar - Fixed to Left */}
      <aside className="hidden md:flex w-80 flex-col bg-card border-r border-border h-screen fixed left-0 top-0 shadow-sm overflow-hidden z-40">
        <div className="p-10 pb-6 bg-card/40 backdrop-blur-md border-b border-border/50 z-20 text-center">
            <p className="text-[11px] text-rose-500 uppercase font-black tracking-[0.4em] italic drop-shadow-[0_0_10px_rgba(244,63,94,0.3)]">Admin Dashboard</p>
        </div>

        <div className="flex-1 overflow-y-auto p-8 pt-8 no-scrollbar">
          <nav className="space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-4 px-6 py-4 rounded-[22px] transition-all border ${isActive ? 'bg-primary/5 text-primary font-black border-primary/20 shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted font-bold border-transparent'
                    }`}
                >
                  <Icon className={`w-5 h-5 ${link.color}`} /> {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-8 border-t border-border space-y-3 mt-auto">
            <Link
              href="/"
              className="w-full flex items-center gap-4 px-6 py-4 rounded-[24px] text-muted-foreground hover:bg-muted font-black transition-all group uppercase tracking-widest text-[10px]"
            >
              <Home className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" /> Exit Portal
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-6 py-4 rounded-[24px] text-rose-500 hover:bg-rose-500/10 font-black transition-all group uppercase tracking-widest text-[10px]"
            >
              <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Logout Session
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

