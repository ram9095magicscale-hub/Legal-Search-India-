'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Briefcase, CheckCircle2, Clock, FileText, LayoutDashboard, LogOut, Menu, User, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState({ name: 'Staff', role: 'staff' });

  useEffect(() => {
    const cookies = document.cookie.split('; ');
    const name = cookies.find(r => r.startsWith('user-name='))?.split('=')[1] || 'Staff User';
    const role = cookies.find(r => r.startsWith('user-role='))?.split('=')[1] || 'staff';
    setUserData({ name: decodeURIComponent(name), role });
  }, []);

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
    { href: '/staff', label: 'Overview', icon: LayoutDashboard },
    { href: '/staff/tasks', label: 'My Tasks', icon: Briefcase },
    { href: '/staff/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-emerald-50/10 dark:bg-background flex flex-col md:flex-row overflow-x-hidden">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-card/80 backdrop-blur-md border-b border-emerald-500/10 sticky top-0 z-[60]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center font-black text-white text-xs">ST</div>
          <h2 className="font-extrabold text-lg text-foreground tracking-tight">Staff Panel</h2>
        </div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 -mr-2 text-foreground hover:bg-emerald-500/10 rounded-xl transition-colors"
        >
          {isMenuOpen ? <X className="w-6 h-6 text-emerald-500" /> : <Menu className="w-6 h-6 text-emerald-500" />}
        </button>
      </div>

      {/* Mobile Menu */}
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
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-card border-l border-emerald-500/20 z-[80] md:hidden flex flex-col p-6 pt-20"
            >
              <nav className="flex-1 space-y-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-bold ${isActive ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' : 'text-muted-foreground hover:bg-muted'
                        }`}
                    >
                      <Icon className="w-6 h-6" /> {link.label}
                    </Link>
                  );
                })}
              </nav>
              <button onClick={handleLogout} className="w-full flex items-center gap-4 px-5 py-5 rounded-2xl text-rose-500 hover:bg-rose-500/10 font-bold transition-all mt-4">
                <LogOut className="w-6 h-6" /> Terminate Session
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 flex-col bg-card/60 backdrop-blur-xl border-r border-emerald-500/10 h-[calc(100vh-80px)] fixed left-0 top-20 z-40">
        <div className="p-8 pb-6 border-b border-emerald-500/5">
          <p className="text-xs text-emerald-600 uppercase tracking-[0.2em] font-black text-center italic">Operations Hub</p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all border ${isActive ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border-transparent'
                  }`}
              >
                <Icon className="w-5 h-5" /> {link.label}
              </Link>
            );
          })}
        </div>

        <div className="p-6 border-t border-emerald-500/5 mt-auto">
          <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-rose-500 hover:bg-rose-500/10 font-bold transition-all group">
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Exit Hub
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 min-w-0 flex flex-col md:ml-72 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] pointer-events-none rounded-full" />
        <div className="flex-1 px-4 py-8 md:px-10 md:py-12 relative z-10 w-full overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
