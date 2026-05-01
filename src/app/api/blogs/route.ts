import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Blog } from '@/models/Blog';

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return NextResponse.json(blogs);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    
    // Check if slug exists
    const existing = await Blog.findOne({ slug: data.slug });
    if (existing) {
      return NextResponse.json({ error: 'A blog with this slug already exists' }, { status: 400 });
    }

    const blog = await Blog.create(data);
    return NextResponse.json(blog, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
