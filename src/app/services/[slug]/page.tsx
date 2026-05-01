import { Metadata } from 'next';
import ServiceClient from '@/components/services/ServiceClient';
import { 
  Calculator, FileCheck2, ShieldCheck, Utensils
} from 'lucide-react';

const servicesData: Record<string, any> = {
  "gst-registration": {
    title: "GST Registration Online",
    subtitle: "Get your GSTIN number in just 3 Days with complete expert assistance.",
    icon: Calculator,
    heroDesc: "Mandatory for businesses crossing the threshold limit or engaged in e-commerce. Let our CA-assisted portal handle the complex documentation and swift GSTIN generation for you.",
    benefits: [
      "Legal recognition as valid supplier of goods/services.",
      "Input Tax Credit (ITC) mechanism to reduce tax liability.",
      "Legally permitted to collect tax from buyers.",
      "Ease of doing inter-state business.",
    ],
    documents: [
      "PAN Card and Aadhaar Card of founders.",
      "Proof of business registration or incorporation certificate.",
      "Identity and Address Proof.",
      "Bank Account Statement / Cancelled Check.",
      "Digital Signature (if applicable)."
    ],
    sidebarImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800"
  },
  "fssai-registration": {
    title: "FSSAI Registration & License",
    subtitle: "Basic, State, or Central Food License procured effortlessly.",
    icon: Utensils,
    heroDesc: "Every Food Business Operator (FBO) in India requires an active FSSAI License. Whether you run a cloud kitchen, a manufacturing plant, or a tiny food stall, we ensure 100% compliance.",
    benefits: [
      "Consumer Awareness & Built Trust.",
      "Legal Advantage when dealing with government inspections.",
      "Use of the FSSAI Logo for branding and packaging.",
      "Business Expansion opportunities (Zomato/Swiggy integration).",
    ],
    documents: [
      "Photo Identity of Promoters (PAN/Aadhaar/Voter ID).",
      "Utility bills of business premises.",
      "List of food products manufactured/processed.",
      "Food safety management system plan (For Central).",
      "NOCs from municipality (conditional)."
    ],
    sidebarImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800"
  },
  "gst-filing": {
    title: "GST Return Filing",
    subtitle: "Error-free monthly & annual GST Returns filed by certified experts.",
    icon: FileCheck2,
    heroDesc: "Filing GST returns strictly on time avoids heavy penalties and interest. Our tax specialists audit your ledgers and smoothly bridge the gap between sales invoices and compliance.",
    benefits: [
      "Eliminate late fees (up to ₹200/day).",
      "Maintain a high GST compliance rating.",
      "Claim maximum Input Tax Credit (ITC) without matching warnings.",
      "Secure banking confidence for corporate loans.",
    ],
    documents: [
      "Sales invoices (B2B and B2C splits).",
      "Purchase invoices for ITC matching.",
      "GSTR-1, GSTR-2A reports.",
      "Bank statements corresponding to specific periods.",
      "Challan copies for taxes previously paid."
    ],
    sidebarImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
  },
  "trademark": {
    title: "Trademark Registration",
    subtitle: "", // Trigger coming soon mode
    icon: ShieldCheck,
    comingSoon: true,
  }
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) {
    const title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return {
      title: `${title} Services`,
      description: `Expert assistance for ${title} in India.`,
    };
  }

  return {
    title: service.title,
    description: service.heroDesc,
    openGraph: {
      title: service.title,
      description: service.heroDesc,
      images: [service.sidebarImage || "/og-image.png"],
    },
    alternates: {
      canonical: `/services/${slug}`,
    },
  };
}

export default async function ServiceDetail({ params }: Props) {
  const { slug } = await params;
  
  const fallbackService = {
    title: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    comingSoon: true,
    icon: ShieldCheck,
    benefits: [],
    documents: []
  };
  
  const service = servicesData[slug] || fallbackService;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": service.title,
            "description": service.heroDesc,
            "provider": {
              "@type": "Organization",
              "name": "Legal Search India"
            },
            "areaServed": "IN",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Legal Services",
              "itemListElement": service.benefits.map((benefit: string, index: number) => ({
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": benefit
                }
              }))
            }
          })
        }}
      />
      <ServiceClient service={service} slug={slug} />
    </>
  );
}
