'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Menu, X, ChevronDown, LogOut, User, Settings } from 'lucide-react';
import { useTheme } from 'next-themes';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'Career', href: '/career' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('client');
  const [userName, setUserName] = useState('');
  const pathname = usePathname();

  // Premium: Hide main navbar when inside dashboads to avoid interface noise
  const isDashboard = pathname.startsWith('/admin') || pathname.startsWith('/staff') || pathname.startsWith('/dashboard');

  const handleLogout = () => {
    document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "user-role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "user-name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = '/';
  };

  useEffect(() => {
    setMounted(true);
    // Check for existing session cookies
    const cookies = document.cookie.split('; ');
    const session = cookies.find(row => row.startsWith('session='));
    const role = cookies.find(row => row.startsWith('user-role='));
    const name = cookies.find(row => row.startsWith('user-name='));
    
    if (session?.split('=')[1] === 'true') {
      setIsLoggedIn(true);
      if (role) setUserRole(role.split('=')[1]);
      if (name) setUserName(decodeURIComponent(name.split('=')[1]));
    }
  }, [pathname]);

  const isDark = mounted && resolvedTheme === 'dark';

  if (!mounted || isDashboard) return null;

  return (
    <nav 
      suppressHydrationWarning
      className="fixed top-0 left-0 right-0 z-[1000] bg-background/80 backdrop-blur-md border-b border-border/50 transition-all duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-1">
            <Link href="/" className="group flex items-center gap-1">
              {/* Light mode logo (blue) */}
              <Image
                src="/images/logo-v2-light.png"
                alt="Legal Search India Logo"
                width={70}
                height={70}
                className={`object-contain transition-all duration-300 -mr-4 md:-mr-6 md:w-[90px] md:h-[90px] ${isDark ? 'hidden' : 'block'}`}
                priority
              />
              {/* Dark mode logo (white) */}
              <Image
                src="/images/logo-v2-dark.png"
                alt="Legal Search India Logo"
                width={70}
                height={70}
                className={`object-contain transition-all duration-300 -mr-4 md:-mr-6 md:w-[90px] md:h-[90px] ${isDark ? 'block' : 'hidden'}`}
                priority
              />
              <span className="font-bold text-lg sm:text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400 max-w-[150px] sm:max-w-none truncate">
                Legal Search India
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Login / Signup / Profile */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <div 
                  className="relative flex items-center bg-primary/10 border border-primary/20 rounded-full shadow-lg group/nav"
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <Link
                    href={userRole === 'admin' ? '/admin' : userRole === 'staff' ? '/staff' : '/dashboard'}
                    className="pl-5 pr-2 py-2.5 text-xs font-black text-primary hover:text-white hover:bg-primary transition-all rounded-l-full uppercase tracking-tight border-r border-primary/20"
                  >
                    Dashboard:
                  </Link>
                  <button 
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="pl-2 pr-5 py-2.5 text-xs font-black text-primary hover:bg-primary/5 transition-all rounded-r-full uppercase tracking-tight flex items-center gap-2"
                  >
                    <span className="max-w-[100px] truncate">{userName.split(' ')[0]}</span>
                    <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {showDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                        className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-[1100] p-1.5"
                      >
                         <div className="px-4 py-3 border-b border-border/50 mb-1">
                            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Signed in as</p>
                            <p className="text-xs font-bold truncate text-foreground">{userName}</p>
                         </div>
                         <Link 
                           href={userRole === 'admin' ? '/admin' : userRole === 'staff' ? '/staff/profile' : '/dashboard/profile'} 
                           onClick={() => setShowDropdown(false)}
                           className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all text-xs font-bold text-muted-foreground hover:px-4"
                         >
                            <User className="w-4 h-4" /> Profile View
                         </Link>
                         <Link 
                           href="/dashboard/settings" 
                           onClick={() => setShowDropdown(false)}
                           className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all text-xs font-bold text-muted-foreground hover:px-4"
                         >
                            <Settings className="w-4 h-4" /> Account Setting
                         </Link>
                         <div className="h-[1px] bg-border/50 my-1" />
                         <button 
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-destructive/10 text-destructive transition-all text-xs font-bold hover:px-4"
                         >
                            <LogOut className="w-4 h-4" /> Logout
                         </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button 
                  onClick={handleLogout}
                  className="p-2.5 bg-destructive/10 text-destructive rounded-full hover:bg-destructive hover:text-white transition-all border border-destructive/20 group"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="text-sm font-semibold bg-primary text-primary-foreground px-5 py-2 rounded-full hover:bg-primary/90 transition-all shadow-[0_0_15px_hsl(var(--primary)/0.5)]"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary transition-colors focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border absolute w-full"
        >
          <div className="px-4 pt-2 pb-6 space-y-4 shadow-xl">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-muted transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 flex flex-col space-y-3">
              {isLoggedIn ? (
                <div className="flex flex-col gap-3">
                  <Link
                    href={userRole === 'admin' ? '/admin' : userRole === 'staff' ? '/staff' : '/dashboard'}
                    className="block text-center text-sm font-bold bg-primary text-white py-4 rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    Go to Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 text-sm font-bold text-destructive py-4 rounded-xl border border-destructive/20 bg-destructive/5 hover:bg-destructive hover:text-white transition-all"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block text-center text-sm font-semibold text-foreground border border-border py-2 rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    className="block text-center text-sm font-semibold bg-primary text-primary-foreground py-2 rounded-lg shadow-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
