import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import { User } from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-development';

export async function GET() {
  try {
    await dbConnect();
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    if (decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Find only staff and admins (personnel)
    const staff = await User.find({ role: { $in: ['staff', 'admin'] } }).sort({ createdAt: -1 }).select('-passwordHash');

    return NextResponse.json({ staff });
  } catch (error) {
    console.error('Fetch Staff Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      console.log('Unauthorized: No token found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    if (decoded.role !== 'admin') {
      console.log('Forbidden: User role is', decoded.role);
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    console.log('Incoming Staff Data:', body);

    const { name, email, password, role, photo } = body;

    if (!name || !email || !password) {
      console.log('Validation Failed: Missing name/email/password');
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      console.log('User already exists with email:', email);
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email: email.toLowerCase(),
      passwordHash,
      role: role || 'staff',
      photo,
      isVerified: true
    });

    await user.save();
    console.log('Staff Unit Created:', user._id);

    return NextResponse.json({ message: 'Staff created successfully', userId: user._id });
  } catch (error: any) {
    console.error('Create Staff Error:', error);
    if (error.name === 'ValidationError') {
      return NextResponse.json({ error: 'Database Schema Validation Failed: ' + error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error: ' + error.message }, { status: 500 });
  }
}
