'use client';

import { usePathname } from 'next/navigation';

export default function DashboardPaddingWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/admin') || pathname.startsWith('/staff') || pathname.startsWith('/dashboard');
  
  return (
    <main className={`flex-1 ${isDashboard ? 'pt-0' : 'pt-20'}`}>
      {children}
    </main>
  );
}
