import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Job } from '@/models/Job';

// Public GET: Fetch all open jobs
export async function GET() {
  try {
    await connectDB();
    const jobs = await Job.find({ status: { $ne: 'Hidden' } }).sort({ createdAt: -1 });
    return NextResponse.json(jobs);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Admin POST: Create new job
export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    
    // Simple validation
    if (!data.role || !data.department || !data.desc) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const job = await Job.create(data);
    return NextResponse.json(job, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
