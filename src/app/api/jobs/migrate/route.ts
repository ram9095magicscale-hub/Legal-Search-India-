import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Job } from '@/models/Job';

const mockJobs = [
  {
    role: "Senior Corporate Lawyer",
    type: "Full-Time",
    location: "Bengaluru / Remote",
    department: "Legal & Compliance",
    desc: "Lead complex corporate restructuring, handle GST disputes, and manage overarching SaaS compliance matrices.",
    requirements: ["7+ years of PQE", "Expertise in Corporate Law", "Strong negotiation skills", "Experience with SaaS compliance"],
    status: "Open"
  },
  {
    role: "Next.js Frontend Engineer",
    type: "Full-Time",
    location: "Remote",
    department: "Engineering",
    desc: "Build highly performant, accessible, and gorgeous glassmorphic UIs for our core registration dashboard.",
    requirements: ["3+ years Experience with React/Next.js", "Mastery of Framer Motion", "Deep understanding of browser performance", "Portfolio of premium UI designs"],
    status: "Open"
  },
  {
    role: "Tax Consultant (CA)",
    type: "Part-Time",
    location: "Mumbai",
    department: "Finance",
    desc: "Assist clients dynamically with end-of-year tax planning and complex GST return audits.",
    requirements: ["Qualified CA", "Expertise in GST laws", "Financial auditing experience", "Ability to work independently"],
    status: "Open"
  },
  {
    role: "Customer Success Executive",
    type: "Full-Time",
    location: "Remote",
    department: "Support",
    desc: "Act as the first line of defense, guiding users through the FSSAI and Trademark application flows.",
    requirements: ["Excellent communication skills", "Basic understanding of legal registrations", "Patience and Problem-solving mindset", "Experience in SaaS support"],
    status: "Open"
  }
];

export async function GET() {
  try {
    await connectDB();
    
    // Check if jobs already exist to avoid duplicates
    const count = await Job.countDocuments();
    if (count > 0) {
      return NextResponse.json({ message: 'Database already seeded', count });
    }

    const createdJobs = await Job.insertMany(mockJobs);
    return NextResponse.json({ 
      message: 'Migration successful', 
      count: createdJobs.length,
      jobs: createdJobs 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
