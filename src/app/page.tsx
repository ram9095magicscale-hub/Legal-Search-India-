import type { Metadata } from 'next';
import HomeClient from '@/components/home/HomeClient';

export const metadata: Metadata = {
  title: "Legal Search India | Start, Protect & Grow Your Business Legally",
  description: "One-stop platform for GST, FSSAI, and Trademark registration. Expert CA/CS assistance for all your business compliance needs in India.",
  openGraph: {
    title: "Legal Search India | Start, Protect & Grow Your Business Legally",
    description: "One-stop platform for GST, FSSAI, and Trademark registration. Expert CA/CS assistance for all your business compliance needs in India.",
    images: ["/og-image.png"],
  },
};

export default function Home() {
  return <HomeClient />;
}
