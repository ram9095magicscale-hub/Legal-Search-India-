import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import { User } from '@/models/User';
import { OTP } from '@/models/OTP';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-development';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { name, email, password, otp, businessName, phone } = await req.json();

    if (!name || !email || !password || !otp) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Verify OTP
    const validOtp = await OTP.findOne({ email, otp });
    if (!validOtp) {
      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Determine Role (first user is admin, rest are clients)
    const userCount = await User.countDocuments();
    const role = userCount === 0 ? 'admin' : 'client';

    // Create User
    const newUser = await User.create({
      name,
      email,
      passwordHash,
      businessName,
      phone,
      role,
      isVerified: true,
    });

    // Clean up OTP
    await OTP.deleteOne({ _id: validOtp._id });

    // Generate JWT
    const token = jwt.sign({ userId: newUser._id, email: newUser.email, role: newUser.role }, JWT_SECRET, {
      expiresIn: '7d',
    });

    const response = NextResponse.json({ 
      message: 'User registered successfully!',
      user: { name: newUser.name, email: newUser.email, role: newUser.role }
    });

    // Set persistence cookies
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    response.cookies.set('user-role', newUser.role, {
      httpOnly: false, // Accessible for client-side routing if needed
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    // Set session cookie for middleware
    response.cookies.set('session', 'true', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    response.cookies.set('user-name', newUser.name, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Register Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
