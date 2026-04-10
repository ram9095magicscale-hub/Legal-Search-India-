'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full border border-border/50 bg-background/50 flex items-center justify-center">
        <div className="w-5 h-5 rounded-full bg-muted animate-pulse" />
      </div>
    );
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-full border border-border/50 bg-background/50 hover:bg-accent hover:text-accent-foreground transition-all duration-300 flex items-center justify-center focus:outline-none group overflow-hidden"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: 20, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -20, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="flex items-center justify-center"
        >
          {theme === 'dark' ? (
            <Moon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
          ) : (
            <Sun className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
          )}
        </motion.div>
      </AnimatePresence>
      
      {/* Decorative glow effect */}
      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
    </button>
  );
}
